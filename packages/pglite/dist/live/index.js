import {
  formatQuery,
  uuid
} from "../chunk-WZKBFYLQ.js";
import {
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/live/index.ts
init_esm_shims();
var MAX_RETRIES = 5;
var setup = async (pg, _emscriptenOpts) => {
  const tableNotifyTriggersAdded = /* @__PURE__ */ new Set();
  const namespaceObj = {
    async query(query, params, callback) {
      let signal;
      if (typeof query !== "string") {
        signal = query.signal;
        params = query.params;
        callback = query.callback;
        query = query.query;
      }
      let callbacks = callback ? [callback] : [];
      const id = uuid().replace(/-/g, "");
      let dead = false;
      let results;
      let tables;
      const init = async () => {
        await pg.transaction(async (tx) => {
          const formattedQuery = await formatQuery(pg, query, params, tx);
          await tx.query(
            `CREATE OR REPLACE TEMP VIEW live_query_${id}_view AS ${formattedQuery}`
          );
          tables = await getTablesForView(tx, `live_query_${id}_view`);
          await addNotifyTriggersToTables(tx, tables, tableNotifyTriggersAdded);
          await tx.exec(`
            PREPARE live_query_${id}_get AS
            SELECT * FROM live_query_${id}_view;
          `);
          results = await tx.query(`EXECUTE live_query_${id}_get;`);
        });
      };
      await init();
      const refresh = async (count = 0) => {
        if (callbacks.length === 0) {
          return;
        }
        try {
          results = await pg.query(`EXECUTE live_query_${id}_get;`);
        } catch (e) {
          const msg = e.message;
          if (msg === `prepared statement "live_query_${id}_get" does not exist`) {
            if (count > MAX_RETRIES) {
              throw e;
            }
            await init();
            refresh(count + 1);
          } else {
            throw e;
          }
        }
        runResultCallbacks(callbacks, results);
      };
      const unsubList = await Promise.all(
        tables.map(
          (table) => pg.listen(
            `table_change__${table.schema_name}__${table.table_name}`,
            async () => {
              refresh();
            }
          )
        )
      );
      const subscribe = (callback2) => {
        if (dead) {
          throw new Error(
            "Live query is no longer active and cannot be subscribed to"
          );
        }
        callbacks.push(callback2);
      };
      const unsubscribe = async (callback2) => {
        if (callback2) {
          callbacks = callbacks.filter((callback3) => callback3 !== callback3);
        } else {
          callbacks = [];
        }
        if (callbacks.length === 0) {
          dead = true;
          await Promise.all(unsubList.map((unsub) => unsub()));
          await pg.exec(`
            DROP VIEW IF EXISTS live_query_${id}_view;
            DEALLOCATE live_query_${id}_get;
          `);
        }
      };
      if (signal?.aborted) {
        await unsubscribe();
      } else {
        signal?.addEventListener(
          "abort",
          () => {
            unsubscribe();
          },
          { once: true }
        );
      }
      runResultCallbacks(callbacks, results);
      return {
        initialResults: results,
        subscribe,
        unsubscribe,
        refresh
      };
    },
    async changes(query, params, key, callback) {
      let signal;
      if (typeof query !== "string") {
        signal = query.signal;
        params = query.params;
        key = query.key;
        callback = query.callback;
        query = query.query;
      }
      if (!key) {
        throw new Error("key is required for changes queries");
      }
      let callbacks = callback ? [callback] : [];
      const id = uuid().replace(/-/g, "");
      let dead = false;
      let tables;
      let stateSwitch = 1;
      let changes;
      const init = async () => {
        await pg.transaction(async (tx) => {
          const formattedQuery = await formatQuery(pg, query, params, tx);
          await tx.query(
            `CREATE OR REPLACE TEMP VIEW live_query_${id}_view AS ${formattedQuery}`
          );
          tables = await getTablesForView(tx, `live_query_${id}_view`);
          await addNotifyTriggersToTables(tx, tables, tableNotifyTriggersAdded);
          const columns = [
            ...(await tx.query(`
                SELECT column_name, data_type, udt_name
                FROM information_schema.columns 
                WHERE table_name = 'live_query_${id}_view'
              `)).rows,
            { column_name: "__after__", data_type: "integer" }
          ];
          await tx.exec(`
            CREATE TEMP TABLE live_query_${id}_state1 (LIKE live_query_${id}_view INCLUDING ALL);
            CREATE TEMP TABLE live_query_${id}_state2 (LIKE live_query_${id}_view INCLUDING ALL);
          `);
          for (const curr of [1, 2]) {
            const prev = curr === 1 ? 2 : 1;
            await tx.exec(`
              PREPARE live_query_${id}_diff${curr} AS
              WITH
                prev AS (SELECT LAG("${key}") OVER () as __after__, * FROM live_query_${id}_state${prev}),
                curr AS (SELECT LAG("${key}") OVER () as __after__, * FROM live_query_${id}_state${curr}),
                data_diff AS (
                  -- INSERT operations: Include all columns
                  SELECT 
                    'INSERT' AS __op__,
                    ${columns.map(
              ({ column_name }) => `curr."${column_name}" AS "${column_name}"`
            ).join(",\n")},
                    ARRAY[]::text[] AS __changed_columns__
                  FROM curr
                  LEFT JOIN prev ON curr.${key} = prev.${key}
                  WHERE prev.${key} IS NULL
                UNION ALL
                  -- DELETE operations: Include only the primary key
                  SELECT 
                    'DELETE' AS __op__,
                    ${columns.map(({ column_name, data_type, udt_name }) => {
              if (column_name === key) {
                return `prev."${column_name}" AS "${column_name}"`;
              } else {
                return `NULL${data_type === "USER-DEFINED" ? `::${udt_name}` : ``} AS "${column_name}"`;
              }
            }).join(",\n")},
                      ARRAY[]::text[] AS __changed_columns__
                  FROM prev
                  LEFT JOIN curr ON prev.${key} = curr.${key}
                  WHERE curr.${key} IS NULL
                UNION ALL
                  -- UPDATE operations: Include only changed columns
                  SELECT 
                    'UPDATE' AS __op__,
                    ${columns.map(
              ({ column_name, data_type, udt_name }) => column_name === key ? `curr."${column_name}" AS "${column_name}"` : `CASE 
                              WHEN curr."${column_name}" IS DISTINCT FROM prev."${column_name}" 
                              THEN curr."${column_name}"
                              ELSE NULL${data_type === "USER-DEFINED" ? `::${udt_name}` : ``}
                              END AS "${column_name}"`
            ).join(",\n")},
                      ARRAY(SELECT unnest FROM unnest(ARRAY[${columns.filter(({ column_name }) => column_name !== key).map(
              ({ column_name }) => `CASE
                              WHEN curr."${column_name}" IS DISTINCT FROM prev."${column_name}" 
                              THEN '${column_name}' 
                              ELSE NULL 
                              END`
            ).join(
              ", "
            )}]) WHERE unnest IS NOT NULL) AS __changed_columns__
                  FROM curr
                  INNER JOIN prev ON curr.${key} = prev.${key}
                  WHERE NOT (curr IS NOT DISTINCT FROM prev)
                )
              SELECT * FROM data_diff;
            `);
          }
        });
      };
      await init();
      const refresh = async () => {
        if (callbacks.length === 0 && changes) {
          return;
        }
        let reset = false;
        for (let i = 0; i < 5; i++) {
          try {
            await pg.transaction(async (tx) => {
              await tx.exec(`
                INSERT INTO live_query_${id}_state${stateSwitch} 
                  SELECT * FROM live_query_${id}_view;
              `);
              changes = await tx.query(
                `EXECUTE live_query_${id}_diff${stateSwitch};`
              );
              stateSwitch = stateSwitch === 1 ? 2 : 1;
              await tx.exec(`
                TRUNCATE live_query_${id}_state${stateSwitch};
              `);
            });
            break;
          } catch (e) {
            const msg = e.message;
            if (msg === `relation "live_query_${id}_state${stateSwitch}" does not exist`) {
              reset = true;
              await init();
              continue;
            } else {
              throw e;
            }
          }
        }
        runChangeCallbacks(callbacks, [
          ...reset ? [
            {
              __op__: "RESET"
            }
          ] : [],
          ...changes.rows
        ]);
      };
      const unsubList = await Promise.all(
        tables.map(
          (table) => pg.listen(
            `table_change__${table.schema_name}__${table.table_name}`,
            async () => refresh()
          )
        )
      );
      const subscribe = (callback2) => {
        if (dead) {
          throw new Error(
            "Live query is no longer active and cannot be subscribed to"
          );
        }
        callbacks.push(callback2);
      };
      const unsubscribe = async (callback2) => {
        if (callback2) {
          callbacks = callbacks.filter((callback3) => callback3 !== callback3);
        } else {
          callbacks = [];
        }
        if (callbacks.length === 0) {
          dead = true;
          await Promise.all(unsubList.map((unsub) => unsub()));
          await pg.exec(`
            DROP VIEW IF EXISTS live_query_${id}_view;
            DROP TABLE IF EXISTS live_query_${id}_state1;
            DROP TABLE IF EXISTS live_query_${id}_state2;
            DEALLOCATE live_query_${id}_diff1;
            DEALLOCATE live_query_${id}_diff2;
          `);
        }
      };
      if (signal?.aborted) {
        await unsubscribe();
      } else {
        signal?.addEventListener(
          "abort",
          () => {
            unsubscribe();
          },
          { once: true }
        );
      }
      await refresh();
      const fields = changes.fields.filter(
        (field) => !["__after__", "__op__", "__changed_columns__"].includes(field.name)
      );
      return {
        fields,
        initialChanges: changes.rows,
        subscribe,
        unsubscribe,
        refresh
      };
    },
    async incrementalQuery(query, params, key, callback) {
      let signal;
      if (typeof query !== "string") {
        signal = query.signal;
        params = query.params;
        key = query.key;
        callback = query.callback;
        query = query.query;
      }
      if (!key) {
        throw new Error("key is required for incremental queries");
      }
      let callbacks = callback ? [callback] : [];
      const rowsMap = /* @__PURE__ */ new Map();
      const afterMap = /* @__PURE__ */ new Map();
      let lastRows = [];
      let firstRun = true;
      const {
        fields,
        unsubscribe: unsubscribeChanges,
        refresh
      } = await namespaceObj.changes(query, params, key, (changes) => {
        for (const change of changes) {
          const {
            __op__: op,
            __changed_columns__: changedColumns,
            ...obj
          } = change;
          switch (op) {
            case "RESET":
              rowsMap.clear();
              afterMap.clear();
              break;
            case "INSERT":
              rowsMap.set(obj[key], obj);
              afterMap.set(obj.__after__, obj[key]);
              break;
            case "DELETE": {
              const oldObj = rowsMap.get(obj[key]);
              rowsMap.delete(obj[key]);
              if (oldObj.__after__ !== null) {
                afterMap.delete(oldObj.__after__);
              }
              break;
            }
            case "UPDATE": {
              const newObj = { ...rowsMap.get(obj[key]) ?? {} };
              for (const columnName of changedColumns) {
                newObj[columnName] = obj[columnName];
                if (columnName === "__after__") {
                  afterMap.set(obj.__after__, obj[key]);
                }
              }
              rowsMap.set(obj[key], newObj);
              break;
            }
          }
        }
        const rows = [];
        let lastKey = null;
        for (let i = 0; i < rowsMap.size; i++) {
          const nextKey = afterMap.get(lastKey);
          const obj = rowsMap.get(nextKey);
          if (!obj) {
            break;
          }
          const cleanObj = { ...obj };
          delete cleanObj.__after__;
          rows.push(cleanObj);
          lastKey = nextKey;
        }
        lastRows = rows;
        if (!firstRun) {
          runResultCallbacks(callbacks, {
            rows,
            fields
          });
        }
      });
      firstRun = false;
      runResultCallbacks(callbacks, {
        rows: lastRows,
        fields
      });
      const subscribe = (callback2) => {
        callbacks.push(callback2);
      };
      const unsubscribe = async (callback2) => {
        if (callback2) {
          callbacks = callbacks.filter((callback3) => callback3 !== callback3);
        } else {
          callbacks = [];
        }
        if (callbacks.length === 0) {
          await unsubscribeChanges();
        }
      };
      if (signal?.aborted) {
        await unsubscribe();
      } else {
        signal?.addEventListener(
          "abort",
          () => {
            unsubscribe();
          },
          { once: true }
        );
      }
      return {
        initialResults: {
          rows: lastRows,
          fields
        },
        subscribe,
        unsubscribe,
        refresh
      };
    }
  };
  return {
    namespaceObj
  };
};
var live = {
  name: "Live Queries",
  setup
};
async function getTablesForView(tx, viewName) {
  const tables = /* @__PURE__ */ new Map();
  async function getTablesRecursive(currentViewName) {
    const result = await tx.query(
      `
        SELECT DISTINCT
          cl.relname AS table_name,
          n.nspname AS schema_name,
          cl.relkind = 'v' AS is_view
        FROM pg_rewrite r
        JOIN pg_depend d ON r.oid = d.objid
        JOIN pg_class cl ON d.refobjid = cl.oid
        JOIN pg_namespace n ON cl.relnamespace = n.oid
        WHERE
        r.ev_class = (
            SELECT oid FROM pg_class WHERE relname = $1 AND relkind = 'v'
        )
        AND d.deptype = 'n';
      `,
      [currentViewName]
    );
    for (const row of result.rows) {
      if (row.table_name !== currentViewName && !row.is_view) {
        const tableKey = `"${row.schema_name}"."${row.table_name}"`;
        if (!tables.has(tableKey)) {
          tables.set(tableKey, {
            table_name: row.table_name,
            schema_name: row.schema_name
          });
        }
      } else if (row.is_view) {
        await getTablesRecursive(row.table_name);
      }
    }
  }
  await getTablesRecursive(viewName);
  return Array.from(tables.values());
}
async function addNotifyTriggersToTables(tx, tables, tableNotifyTriggersAdded) {
  const triggers = tables.filter(
    (table) => !tableNotifyTriggersAdded.has(
      `${table.schema_name}_${table.table_name}`
    )
  ).map((table) => {
    return `
      CREATE OR REPLACE FUNCTION "_notify_${table.schema_name}_${table.table_name}"() RETURNS TRIGGER AS $$
      BEGIN
        PERFORM pg_notify('table_change__${table.schema_name}__${table.table_name}', '');
        RETURN NULL;
      END;
      $$ LANGUAGE plpgsql;
      CREATE OR REPLACE TRIGGER "_notify_trigger_${table.schema_name}_${table.table_name}"
      AFTER INSERT OR UPDATE OR DELETE ON "${table.schema_name}"."${table.table_name}"
      FOR EACH STATEMENT EXECUTE FUNCTION "_notify_${table.schema_name}_${table.table_name}"();
      `;
  }).join("\n");
  if (triggers.trim() !== "") {
    await tx.exec(triggers);
  }
  tables.map(
    (table) => tableNotifyTriggersAdded.add(`${table.schema_name}_${table.table_name}`)
  );
}
var runResultCallbacks = (callbacks, results) => {
  for (const callback of callbacks) {
    callback(results);
  }
};
var runChangeCallbacks = (callbacks, changes) => {
  for (const callback of callbacks) {
    callback(changes);
  }
};
export {
  live
};
//# sourceMappingURL=index.js.map
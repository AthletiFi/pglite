"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});

// src/live/index.ts
var live_exports = {};
__export(live_exports, {
  live: () => live
});
module.exports = __toCommonJS(live_exports);

// ../pg-protocol/src/string-utils.ts
function byteLengthUtf8(str) {
  let byteLength = str.length;
  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i);
    if (code > 127 && code <= 2047) byteLength++;
    else if (code > 2047 && code <= 65535) byteLength += 2;
    if (code >= 56320 && code <= 57343) i--;
  }
  return byteLength;
}

// ../pg-protocol/src/buffer-writer.ts
var _bufferView, _offset, _littleEndian, _encoder, _headerPosition, _Writer_instances, allocateBuffer_fn, ensure_fn, join_fn;
var Writer = class {
  constructor(size = 256) {
    this.size = size;
    __privateAdd(this, _Writer_instances);
    __privateAdd(this, _bufferView);
    __privateAdd(this, _offset, 5);
    __privateAdd(this, _littleEndian, false);
    __privateAdd(this, _encoder, new TextEncoder());
    __privateAdd(this, _headerPosition, 0);
    __privateSet(this, _bufferView, __privateMethod(this, _Writer_instances, allocateBuffer_fn).call(this, size));
  }
  addInt32(num) {
    __privateMethod(this, _Writer_instances, ensure_fn).call(this, 4);
    __privateGet(this, _bufferView).setInt32(__privateGet(this, _offset), num, __privateGet(this, _littleEndian));
    __privateSet(this, _offset, __privateGet(this, _offset) + 4);
    return this;
  }
  addInt16(num) {
    __privateMethod(this, _Writer_instances, ensure_fn).call(this, 2);
    __privateGet(this, _bufferView).setInt16(__privateGet(this, _offset), num, __privateGet(this, _littleEndian));
    __privateSet(this, _offset, __privateGet(this, _offset) + 2);
    return this;
  }
  addCString(string) {
    if (string) {
      this.addString(string);
    }
    __privateMethod(this, _Writer_instances, ensure_fn).call(this, 1);
    __privateGet(this, _bufferView).setUint8(__privateGet(this, _offset), 0);
    __privateWrapper(this, _offset)._++;
    return this;
  }
  addString(string = "") {
    const length = byteLengthUtf8(string);
    __privateMethod(this, _Writer_instances, ensure_fn).call(this, length);
    __privateGet(this, _encoder).encodeInto(
      string,
      new Uint8Array(__privateGet(this, _bufferView).buffer, __privateGet(this, _offset))
    );
    __privateSet(this, _offset, __privateGet(this, _offset) + length);
    return this;
  }
  add(otherBuffer) {
    __privateMethod(this, _Writer_instances, ensure_fn).call(this, otherBuffer.byteLength);
    new Uint8Array(__privateGet(this, _bufferView).buffer).set(
      new Uint8Array(otherBuffer),
      __privateGet(this, _offset)
    );
    __privateSet(this, _offset, __privateGet(this, _offset) + otherBuffer.byteLength);
    return this;
  }
  flush(code) {
    const result = __privateMethod(this, _Writer_instances, join_fn).call(this, code);
    __privateSet(this, _offset, 5);
    __privateSet(this, _bufferView, __privateMethod(this, _Writer_instances, allocateBuffer_fn).call(this, this.size));
    return new Uint8Array(result);
  }
};
_bufferView = new WeakMap();
_offset = new WeakMap();
_littleEndian = new WeakMap();
_encoder = new WeakMap();
_headerPosition = new WeakMap();
_Writer_instances = new WeakSet();
allocateBuffer_fn = function(size) {
  return new DataView(new ArrayBuffer(size));
};
ensure_fn = function(size) {
  const remaining = __privateGet(this, _bufferView).byteLength - __privateGet(this, _offset);
  if (remaining < size) {
    const oldBuffer = __privateGet(this, _bufferView).buffer;
    const newSize = oldBuffer.byteLength + (oldBuffer.byteLength >> 1) + size;
    __privateSet(this, _bufferView, __privateMethod(this, _Writer_instances, allocateBuffer_fn).call(this, newSize));
    new Uint8Array(__privateGet(this, _bufferView).buffer).set(new Uint8Array(oldBuffer));
  }
};
join_fn = function(code) {
  if (code) {
    __privateGet(this, _bufferView).setUint8(__privateGet(this, _headerPosition), code);
    const length = __privateGet(this, _offset) - (__privateGet(this, _headerPosition) + 1);
    __privateGet(this, _bufferView).setInt32(
      __privateGet(this, _headerPosition) + 1,
      length,
      __privateGet(this, _littleEndian)
    );
  }
  return __privateGet(this, _bufferView).buffer.slice(code ? 0 : 5, __privateGet(this, _offset));
};

// ../pg-protocol/src/serializer.ts
var writer = new Writer();
var startup = (opts) => {
  writer.addInt16(3).addInt16(0);
  for (const key of Object.keys(opts)) {
    writer.addCString(key).addCString(opts[key]);
  }
  writer.addCString("client_encoding").addCString("UTF8");
  const bodyBuffer = writer.addCString("").flush();
  const length = bodyBuffer.byteLength + 4;
  return new Writer().addInt32(length).add(bodyBuffer).flush();
};
var requestSsl = () => {
  const bufferView = new DataView(new ArrayBuffer(8));
  bufferView.setInt32(0, 8, false);
  bufferView.setInt32(4, 80877103, false);
  return new Uint8Array(bufferView.buffer);
};
var password = (password2) => {
  return writer.addCString(password2).flush(112 /* startup */);
};
var sendSASLInitialResponseMessage = (mechanism, initialResponse) => {
  writer.addCString(mechanism).addInt32(byteLengthUtf8(initialResponse)).addString(initialResponse);
  return writer.flush(112 /* startup */);
};
var sendSCRAMClientFinalMessage = (additionalData) => {
  return writer.addString(additionalData).flush(112 /* startup */);
};
var query = (text) => {
  return writer.addCString(text).flush(81 /* query */);
};
var emptyValueArray = [];
var parse = (query2) => {
  const name = query2.name ?? "";
  if (name.length > 63) {
    console.error(
      "Warning! Postgres only supports 63 characters for query names."
    );
    console.error("You supplied %s (%s)", name, name.length);
    console.error(
      "This can cause conflicts and silent errors executing queries"
    );
  }
  const buffer = writer.addCString(name).addCString(query2.text).addInt16(query2.types?.length ?? 0);
  query2.types?.forEach((type) => buffer.addInt32(type));
  return writer.flush(80 /* parse */);
};
var paramWriter = new Writer();
var writeValues = (values, valueMapper) => {
  for (let i = 0; i < values.length; i++) {
    const mappedVal = valueMapper ? valueMapper(values[i], i) : values[i];
    if (mappedVal === null) {
      writer.addInt16(0 /* STRING */);
      paramWriter.addInt32(-1);
    } else if (mappedVal instanceof ArrayBuffer || ArrayBuffer.isView(mappedVal)) {
      const buffer = ArrayBuffer.isView(mappedVal) ? mappedVal.buffer.slice(
        mappedVal.byteOffset,
        mappedVal.byteOffset + mappedVal.byteLength
      ) : mappedVal;
      writer.addInt16(1 /* BINARY */);
      paramWriter.addInt32(buffer.byteLength);
      paramWriter.add(buffer);
    } else {
      writer.addInt16(0 /* STRING */);
      paramWriter.addInt32(byteLengthUtf8(mappedVal));
      paramWriter.addString(mappedVal);
    }
  }
};
var bind = (config = {}) => {
  const portal = config.portal ?? "";
  const statement = config.statement ?? "";
  const binary = config.binary ?? false;
  const values = config.values ?? emptyValueArray;
  const len = values.length;
  writer.addCString(portal).addCString(statement);
  writer.addInt16(len);
  writeValues(values, config.valueMapper);
  writer.addInt16(len);
  writer.add(paramWriter.flush());
  writer.addInt16(binary ? 1 /* BINARY */ : 0 /* STRING */);
  return writer.flush(66 /* bind */);
};
var emptyExecute = new Uint8Array([
  69 /* execute */,
  0,
  0,
  0,
  9,
  0,
  0,
  0,
  0,
  0
]);
var execute = (config) => {
  if (!config || !config.portal && !config.rows) {
    return emptyExecute;
  }
  const portal = config.portal ?? "";
  const rows = config.rows ?? 0;
  const portalLength = byteLengthUtf8(portal);
  const len = 4 + portalLength + 1 + 4;
  const bufferView = new DataView(new ArrayBuffer(1 + len));
  bufferView.setUint8(0, 69 /* execute */);
  bufferView.setInt32(1, len, false);
  new TextEncoder().encodeInto(portal, new Uint8Array(bufferView.buffer, 5));
  bufferView.setUint8(portalLength + 5, 0);
  bufferView.setUint32(bufferView.byteLength - 4, rows, false);
  return new Uint8Array(bufferView.buffer);
};
var cancel = (processID, secretKey) => {
  const bufferView = new DataView(new ArrayBuffer(16));
  bufferView.setInt32(0, 16, false);
  bufferView.setInt16(4, 1234, false);
  bufferView.setInt16(6, 5678, false);
  bufferView.setInt32(8, processID, false);
  bufferView.setInt32(12, secretKey, false);
  return new Uint8Array(bufferView.buffer);
};
var cstringMessage = (code, string) => {
  const writer2 = new Writer();
  writer2.addCString(string);
  return writer2.flush(code);
};
var emptyDescribePortal = writer.addCString("P").flush(68 /* describe */);
var emptyDescribeStatement = writer.addCString("S").flush(68 /* describe */);
var describe = (msg) => {
  return msg.name ? cstringMessage(68 /* describe */, `${msg.type}${msg.name ?? ""}`) : msg.type === "P" ? emptyDescribePortal : emptyDescribeStatement;
};
var close = (msg) => {
  const text = `${msg.type}${msg.name ?? ""}`;
  return cstringMessage(67 /* close */, text);
};
var copyData = (chunk) => {
  return writer.add(chunk).flush(100 /* copyFromChunk */);
};
var copyFail = (message) => {
  return cstringMessage(102 /* copyFail */, message);
};
var codeOnlyBuffer = (code) => new Uint8Array([code, 0, 0, 0, 4]);
var flushBuffer = codeOnlyBuffer(72 /* flush */);
var syncBuffer = codeOnlyBuffer(83 /* sync */);
var endBuffer = codeOnlyBuffer(88 /* end */);
var copyDoneBuffer = codeOnlyBuffer(99 /* copyDone */);
var serialize = {
  startup,
  password,
  requestSsl,
  sendSASLInitialResponseMessage,
  sendSCRAMClientFinalMessage,
  query,
  parse,
  bind,
  execute,
  describe,
  close,
  flush: () => flushBuffer,
  sync: () => syncBuffer,
  end: () => endBuffer,
  copyData,
  copyDone: () => copyDoneBuffer,
  copyFail,
  cancel
};

// ../pg-protocol/src/buffer-reader.ts
var emptyBuffer = new ArrayBuffer(0);

// ../pg-protocol/src/parser.ts
var CODE_LENGTH = 1;
var LEN_LENGTH = 4;
var HEADER_LENGTH = CODE_LENGTH + LEN_LENGTH;
var emptyBuffer2 = new ArrayBuffer(0);

// src/types.ts
var JSON_parse = globalThis.JSON.parse;
var JSON_stringify = globalThis.JSON.stringify;
var BOOL = 16;
var BYTEA = 17;
var INT8 = 20;
var INT2 = 21;
var INT4 = 23;
var TEXT = 25;
var OID = 26;
var JSON = 114;
var FLOAT4 = 700;
var FLOAT8 = 701;
var BPCHAR = 1042;
var VARCHAR = 1043;
var DATE = 1082;
var TIMESTAMP = 1114;
var TIMESTAMPTZ = 1184;
var JSONB = 3802;
var types = {
  string: {
    to: TEXT,
    from: [TEXT, VARCHAR, BPCHAR],
    serialize: (x) => {
      if (typeof x === "string") {
        return x;
      } else if (typeof x === "number") {
        return x.toString();
      } else {
        throw new Error("Invalid input for string type");
      }
    },
    parse: (x) => x
  },
  number: {
    to: 0,
    from: [INT2, INT4, OID, FLOAT4, FLOAT8],
    serialize: (x) => x.toString(),
    parse: (x) => +x
  },
  bigint: {
    to: INT8,
    from: [INT8],
    serialize: (x) => x.toString(),
    parse: (x) => {
      const n = BigInt(x);
      if (n < Number.MIN_SAFE_INTEGER || n > Number.MAX_SAFE_INTEGER) {
        return n;
      } else {
        return Number(n);
      }
    }
  },
  json: {
    to: JSON,
    from: [JSON, JSONB],
    serialize: (x) => {
      if (typeof x === "string") {
        return x;
      } else {
        return JSON_stringify(x);
      }
    },
    parse: (x) => JSON_parse(x)
  },
  boolean: {
    to: BOOL,
    from: [BOOL],
    serialize: (x) => {
      if (typeof x !== "boolean") {
        throw new Error("Invalid input for boolean type");
      }
      return x ? "t" : "f";
    },
    parse: (x) => x === "t"
  },
  date: {
    to: TIMESTAMPTZ,
    from: [DATE, TIMESTAMP, TIMESTAMPTZ],
    serialize: (x) => {
      if (typeof x === "string") {
        return x;
      } else if (typeof x === "number") {
        return new Date(x).toISOString();
      } else if (x instanceof Date) {
        return x.toISOString();
      } else {
        throw new Error("Invalid input for date type");
      }
    },
    parse: (x) => new Date(x)
  },
  bytea: {
    to: BYTEA,
    from: [BYTEA],
    serialize: (x) => {
      if (!(x instanceof Uint8Array)) {
        throw new Error("Invalid input for bytea type");
      }
      return "\\x" + Array.from(x).map((byte) => byte.toString(16).padStart(2, "0")).join("");
    },
    parse: (x) => {
      const hexString = x.slice(2);
      return Uint8Array.from(
        { length: hexString.length / 2 },
        (_, idx) => parseInt(hexString.substring(idx * 2, (idx + 1) * 2), 16)
      );
    }
  }
};
var defaultHandlers = typeHandlers(types);
var parsers = defaultHandlers.parsers;
var serializers = defaultHandlers.serializers;
function typeHandlers(types2) {
  return Object.keys(types2).reduce(
    ({ parsers: parsers2, serializers: serializers2 }, k) => {
      const { to, from, serialize: serialize2, parse: parse2 } = types2[k];
      serializers2[to] = serialize2;
      serializers2[k] = serialize2;
      parsers2[k] = parse2;
      if (Array.isArray(from)) {
        from.forEach((f) => {
          parsers2[f] = parse2;
          serializers2[f] = serialize2;
        });
      } else {
        parsers2[from] = parse2;
        serializers2[from] = serialize2;
      }
      return { parsers: parsers2, serializers: serializers2 };
    },
    {
      parsers: {},
      serializers: {}
    }
  );
}

// src/parse.ts
function parseDescribeStatementResults(messages) {
  const message = messages.find(
    (msg) => msg.name === "parameterDescription"
  );
  if (message) {
    return message.dataTypeIDs;
  }
  return [];
}

// src/utils.ts
var IN_NODE = typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node === "string";
var uuid = () => {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }
  const bytes = new Uint8Array(16);
  if (globalThis.crypto?.getRandomValues) {
    globalThis.crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  bytes[6] = bytes[6] & 15 | 64;
  bytes[8] = bytes[8] & 63 | 128;
  const hexValues = [];
  bytes.forEach((byte) => {
    hexValues.push(byte.toString(16).padStart(2, "0"));
  });
  return hexValues.slice(0, 4).join("") + "-" + hexValues.slice(4, 6).join("") + "-" + hexValues.slice(6, 8).join("") + "-" + hexValues.slice(8, 10).join("") + "-" + hexValues.slice(10).join("");
};
async function formatQuery(pg, query2, params, tx) {
  if (!params || params.length === 0) {
    return query2;
  }
  tx = tx ?? pg;
  let dataTypeIDs;
  try {
    await pg.execProtocol(serialize.parse({ text: query2 }), {
      syncToFs: false
    });
    dataTypeIDs = parseDescribeStatementResults(
      (await pg.execProtocol(serialize.describe({ type: "S" }), {
        syncToFs: false
      })).messages
    );
  } finally {
    await pg.execProtocol(serialize.sync(), { syncToFs: false });
  }
  const subbedQuery = query2.replace(/\$([0-9]+)/g, (_, num) => {
    return "%" + num + "L";
  });
  const ret = await tx.query(
    `SELECT format($1, ${params.map((_, i) => `$${i + 2}`).join(", ")}) as query`,
    [subbedQuery, ...params],
    { paramTypes: [TEXT, ...dataTypeIDs] }
  );
  return ret.rows[0].query;
}

// src/live/index.ts
var MAX_RETRIES = 5;
var setup = async (pg, _emscriptenOpts) => {
  const tableNotifyTriggersAdded = /* @__PURE__ */ new Set();
  const namespaceObj = {
    async query(query2, params, callback) {
      let signal;
      if (typeof query2 !== "string") {
        signal = query2.signal;
        params = query2.params;
        callback = query2.callback;
        query2 = query2.query;
      }
      let callbacks = callback ? [callback] : [];
      const id = uuid().replace(/-/g, "");
      let dead = false;
      let results;
      let tables;
      const init = async () => {
        await pg.transaction(async (tx) => {
          const formattedQuery = await formatQuery(pg, query2, params, tx);
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
    async changes(query2, params, key, callback) {
      let signal;
      if (typeof query2 !== "string") {
        signal = query2.signal;
        params = query2.params;
        key = query2.key;
        callback = query2.callback;
        query2 = query2.query;
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
          const formattedQuery = await formatQuery(pg, query2, params, tx);
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
    async incrementalQuery(query2, params, key, callback) {
      let signal;
      if (typeof query2 !== "string") {
        signal = query2.signal;
        params = query2.params;
        key = query2.key;
        callback = query2.callback;
        query2 = query2.query;
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
      } = await namespaceObj.changes(query2, params, key, (changes) => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  live
});
//# sourceMappingURL=index.cjs.map
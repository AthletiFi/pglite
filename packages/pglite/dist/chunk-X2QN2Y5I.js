import {
  arrayParser,
  arraySerializer,
  parseDescribeStatementResults,
  parseResults,
  parsers,
  serialize,
  serializers
} from "./chunk-WZKBFYLQ.js";
import {
  query
} from "./chunk-BYSS5RHE.js";
import {
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet,
  init_esm_shims
} from "./chunk-ASR247EI.js";

// src/base.ts
init_esm_shims();
var _arrayTypesInitialized, _inTransaction, _BasePGlite_instances, execProtocolNoSync_fn, runQuery_fn, runExec_fn, log_fn;
var BasePGlite = class {
  constructor() {
    __privateAdd(this, _BasePGlite_instances);
    this.serializers = { ...serializers };
    this.parsers = { ...parsers };
    __privateAdd(this, _arrayTypesInitialized, false);
    // # Private properties:
    __privateAdd(this, _inTransaction, false);
  }
  // # Concrete implementations:
  /**
   * Initialize the array types
   * The oid if the type of an element and the typarray is the oid of the type of the
   * array.
   * We extract these from the databaes then create the serializers/parsers for
   * each type.
   * This should be called at the end of #init() in the implementing class.
   */
  async _initArrayTypes() {
    if (__privateGet(this, _arrayTypesInitialized)) return;
    __privateSet(this, _arrayTypesInitialized, true);
    const types = await this.query(`
      SELECT b.oid, b.typarray
      FROM pg_catalog.pg_type a
      LEFT JOIN pg_catalog.pg_type b ON b.oid = a.typelem
      WHERE a.typcategory = 'A'
      GROUP BY b.oid, b.typarray
      ORDER BY b.oid
    `);
    for (const type of types.rows) {
      this.serializers[type.typarray] = (x) => arraySerializer(x, this.serializers[type.oid], type.typarray);
      this.parsers[type.typarray] = (x) => arrayParser(x, this.parsers[type.oid], type.typarray);
    }
  }
  /**
   * Execute a single SQL statement
   * This uses the "Extended Query" postgres wire protocol message.
   * @param query The query to execute
   * @param params Optional parameters for the query
   * @returns The result of the query
   */
  async query(query2, params, options) {
    await this._checkReady();
    return await this._runExclusiveTransaction(async () => {
      return await __privateMethod(this, _BasePGlite_instances, runQuery_fn).call(this, query2, params, options);
    });
  }
  /**
   * Execute a single SQL statement like with {@link PGlite.query}, but with a
   * templated statement where template values will be treated as parameters.
   *
   * You can use helpers from `/template` to further format the query with
   * identifiers, raw SQL, and nested statements.
   *
   * This uses the "Extended Query" postgres wire protocol message.
   *
   * @param query The query to execute with parameters as template values
   * @returns The result of the query
   *
   * @example
   * ```ts
   * const results = await db.sql`SELECT * FROM ${identifier`foo`} WHERE id = ${id}`
   * ```
   */
  async sql(sqlStrings, ...params) {
    const { query: query2, params: actualParams } = query(sqlStrings, ...params);
    return await this.query(query2, actualParams);
  }
  /**
   * Execute a SQL query, this can have multiple statements.
   * This uses the "Simple Query" postgres wire protocol message.
   * @param query The query to execute
   * @returns The result of the query
   */
  async exec(query2, options) {
    await this._checkReady();
    return await this._runExclusiveTransaction(async () => {
      return await __privateMethod(this, _BasePGlite_instances, runExec_fn).call(this, query2, options);
    });
  }
  /**
   * Execute a transaction
   * @param callback A callback function that takes a transaction object
   * @returns The result of the transaction
   */
  async transaction(callback) {
    await this._checkReady();
    return await this._runExclusiveTransaction(async () => {
      await __privateMethod(this, _BasePGlite_instances, runExec_fn).call(this, "BEGIN");
      __privateSet(this, _inTransaction, true);
      let closed = false;
      const checkClosed = () => {
        if (closed) {
          throw new Error("Transaction is closed");
        }
      };
      const tx = {
        query: async (query2, params, options) => {
          checkClosed();
          return await __privateMethod(this, _BasePGlite_instances, runQuery_fn).call(this, query2, params, options);
        },
        sql: async (sqlStrings, ...params) => {
          const { query: query2, params: actualParams } = query(
            sqlStrings,
            ...params
          );
          return await __privateMethod(this, _BasePGlite_instances, runQuery_fn).call(this, query2, actualParams);
        },
        exec: async (query2, options) => {
          checkClosed();
          return await __privateMethod(this, _BasePGlite_instances, runExec_fn).call(this, query2, options);
        },
        rollback: async () => {
          checkClosed();
          await __privateMethod(this, _BasePGlite_instances, runExec_fn).call(this, "ROLLBACK");
          closed = true;
        },
        get closed() {
          return closed;
        }
      };
      try {
        const result = await callback(tx);
        if (!closed) {
          closed = true;
          await __privateMethod(this, _BasePGlite_instances, runExec_fn).call(this, "COMMIT");
        }
        __privateSet(this, _inTransaction, false);
        return result;
      } catch (e) {
        if (!closed) {
          await __privateMethod(this, _BasePGlite_instances, runExec_fn).call(this, "ROLLBACK");
        }
        __privateSet(this, _inTransaction, false);
        throw e;
      }
    });
  }
};
_arrayTypesInitialized = new WeakMap();
_inTransaction = new WeakMap();
_BasePGlite_instances = new WeakSet();
execProtocolNoSync_fn = async function(message, options = {}) {
  return await this.execProtocol(message, { ...options, syncToFs: false });
};
runQuery_fn = async function(query2, params = [], options) {
  return await this._runExclusiveQuery(async () => {
    __privateMethod(this, _BasePGlite_instances, log_fn).call(this, "runQuery", query2, params, options);
    await this._handleBlob(options?.blob);
    let results;
    try {
      const { messages: parseResults2 } = await __privateMethod(this, _BasePGlite_instances, execProtocolNoSync_fn).call(this, serialize.parse({ text: query2, types: options?.paramTypes }), options);
      const dataTypeIDs = parseDescribeStatementResults(
        (await __privateMethod(this, _BasePGlite_instances, execProtocolNoSync_fn).call(this, serialize.describe({ type: "S" }), options)).messages
      );
      const values = params.map((param, i) => {
        const oid = dataTypeIDs[i];
        if (param === null || param === void 0) {
          return null;
        }
        const serialize2 = this.serializers[oid];
        if (serialize2) {
          return serialize2(param);
        } else {
          return param.toString();
        }
      });
      results = [
        ...parseResults2,
        ...(await __privateMethod(this, _BasePGlite_instances, execProtocolNoSync_fn).call(this, serialize.bind({
          values
        }), options)).messages,
        ...(await __privateMethod(this, _BasePGlite_instances, execProtocolNoSync_fn).call(this, serialize.describe({ type: "P" }), options)).messages,
        ...(await __privateMethod(this, _BasePGlite_instances, execProtocolNoSync_fn).call(this, serialize.execute({}), options)).messages
      ];
    } finally {
      await __privateMethod(this, _BasePGlite_instances, execProtocolNoSync_fn).call(this, serialize.sync(), options);
    }
    await this._cleanupBlob();
    if (!__privateGet(this, _inTransaction)) {
      await this.syncToFs();
    }
    const blob = await this._getWrittenBlob();
    return parseResults(results, this.parsers, options, blob)[0];
  });
};
runExec_fn = async function(query2, options) {
  return await this._runExclusiveQuery(async () => {
    __privateMethod(this, _BasePGlite_instances, log_fn).call(this, "runExec", query2, options);
    await this._handleBlob(options?.blob);
    let results;
    try {
      results = (await __privateMethod(this, _BasePGlite_instances, execProtocolNoSync_fn).call(this, serialize.query(query2), options)).messages;
    } finally {
      await __privateMethod(this, _BasePGlite_instances, execProtocolNoSync_fn).call(this, serialize.sync(), options);
    }
    this._cleanupBlob();
    if (!__privateGet(this, _inTransaction)) {
      await this.syncToFs();
    }
    const blob = await this._getWrittenBlob();
    return parseResults(
      results,
      this.parsers,
      options,
      blob
    );
  });
};
/**
 * Internal log function
 */
log_fn = function(...args) {
  if (this.debug > 0) {
    console.log(...args);
  }
};

export {
  BasePGlite
};
//# sourceMappingURL=chunk-X2QN2Y5I.js.map
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

// src/worker/index.ts
var worker_exports = {};
__export(worker_exports, {
  LeaderChangedError: () => LeaderChangedError,
  PGliteWorker: () => PGliteWorker,
  worker: () => worker
});
module.exports = __toCommonJS(worker_exports);

// ../../node_modules/.pnpm/tsup@8.3.0_@microsoft+api-extractor@7.47.7_@types+node@20.16.11__postcss@8.4.47_tsx@4.19.1_typescript@5.6.3/node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl = () => typeof document === "undefined" ? new URL(`file:${__filename}`).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();

// src/templating.ts
var TemplateType = {
  part: "part",
  container: "container"
};
function addToLastAndPushWithSuffix(arr, suffix, ...values) {
  const lastArrIdx = arr.length - 1;
  const lastValIdx = values.length - 1;
  if (lastValIdx === -1) return;
  if (lastValIdx === 0) {
    arr[lastArrIdx] = arr[lastArrIdx] + values[0] + suffix;
    return;
  }
  arr[lastArrIdx] = arr[lastArrIdx] + values[0];
  arr.push(...values.slice(1, lastValIdx));
  arr.push(values[lastValIdx] + suffix);
}
function sql(strings, ...values) {
  const parsedStrings = [strings[0]];
  parsedStrings.raw = [strings.raw[0]];
  const parsedValues = [];
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    const nextStringIdx = i + 1;
    if (value?._templateType === TemplateType.part) {
      addToLastAndPushWithSuffix(
        parsedStrings,
        strings[nextStringIdx],
        value.str
      );
      addToLastAndPushWithSuffix(
        parsedStrings.raw,
        strings.raw[nextStringIdx],
        value.str
      );
      continue;
    }
    if (value?._templateType === TemplateType.container) {
      addToLastAndPushWithSuffix(
        parsedStrings,
        strings[nextStringIdx],
        ...value.strings
      );
      addToLastAndPushWithSuffix(
        parsedStrings.raw,
        strings.raw[nextStringIdx],
        ...value.strings.raw
      );
      parsedValues.push(...value.values);
      continue;
    }
    parsedStrings.push(strings[nextStringIdx]);
    parsedStrings.raw.push(strings.raw[nextStringIdx]);
    parsedValues.push(value);
  }
  return {
    _templateType: "container",
    strings: parsedStrings,
    values: parsedValues
  };
}
function query(strings, ...values) {
  const { strings: queryStringParts, values: params } = sql(strings, ...values);
  return {
    query: [
      queryStringParts[0],
      ...params.flatMap((_, idx) => [`$${idx + 1}`, queryStringParts[idx + 1]])
    ].join(""),
    params
  };
}

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
function parseType(x, type, parsers2) {
  if (x === null) {
    return null;
  }
  const handler = parsers2?.[type] ?? defaultHandlers.parsers[type];
  if (handler) {
    return handler(x, type);
  } else {
    return x;
  }
}
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
var escapeBackslash = /\\/g;
var escapeQuote = /"/g;
function arrayEscape(x) {
  return x.replace(escapeBackslash, "\\\\").replace(escapeQuote, '\\"');
}
function arraySerializer(xs, serializer, typarray) {
  if (Array.isArray(xs) === false) return xs;
  if (!xs.length) return "{}";
  const first = xs[0];
  const delimiter = typarray === 1020 ? ";" : ",";
  if (Array.isArray(first)) {
    return `{${xs.map((x) => arraySerializer(x, serializer, typarray)).join(delimiter)}}`;
  } else {
    return `{${xs.map((x) => {
      if (x === void 0) {
        x = null;
      }
      return x === null ? "null" : '"' + arrayEscape(serializer ? serializer(x) : x.toString()) + '"';
    }).join(delimiter)}}`;
  }
}
var arrayParserState = {
  i: 0,
  char: null,
  str: "",
  quoted: false,
  last: 0,
  p: null
};
function arrayParser(x, parser, typarray) {
  arrayParserState.i = arrayParserState.last = 0;
  return arrayParserLoop(arrayParserState, x, parser, typarray)[0];
}
function arrayParserLoop(s, x, parser, typarray) {
  const xs = [];
  const delimiter = typarray === 1020 ? ";" : ",";
  for (; s.i < x.length; s.i++) {
    s.char = x[s.i];
    if (s.quoted) {
      if (s.char === "\\") {
        s.str += x[++s.i];
      } else if (s.char === '"') {
        xs.push(parser ? parser(s.str) : s.str);
        s.str = "";
        s.quoted = x[s.i + 1] === '"';
        s.last = s.i + 2;
      } else {
        s.str += s.char;
      }
    } else if (s.char === '"') {
      s.quoted = true;
    } else if (s.char === "{") {
      s.last = ++s.i;
      xs.push(arrayParserLoop(s, x, parser, typarray));
    } else if (s.char === "}") {
      s.quoted = false;
      s.last < s.i && xs.push(parser ? parser(x.slice(s.last, s.i)) : x.slice(s.last, s.i));
      s.last = s.i + 1;
      break;
    } else if (s.char === delimiter && s.p !== "}" && s.p !== '"') {
      xs.push(parser ? parser(x.slice(s.last, s.i)) : x.slice(s.last, s.i));
      s.last = s.i + 1;
    }
    s.p = s.char;
  }
  s.last < s.i && xs.push(
    parser ? parser(x.slice(s.last, s.i + 1)) : x.slice(s.last, s.i + 1)
  );
  return xs;
}

// src/parse.ts
function parseResults(messages, defaultParsers, options, blob) {
  const resultSets = [];
  let currentResultSet = { rows: [], fields: [] };
  let affectedRows = 0;
  const parsers2 = { ...defaultParsers, ...options?.parsers };
  const filteredMessages = messages.filter(
    (msg) => msg.name === "rowDescription" || msg.name === "dataRow" || msg.name === "commandComplete"
  );
  filteredMessages.forEach((message, index) => {
    if (message.name === "rowDescription") {
      const msg = message;
      currentResultSet.fields = msg.fields.map((field) => ({
        name: field.name,
        dataTypeID: field.dataTypeID
      }));
    } else if (message.name === "dataRow" && currentResultSet) {
      const msg = message;
      if (options?.rowMode === "array") {
        currentResultSet.rows.push(
          msg.fields.map(
            (field, i) => parseType(field, currentResultSet.fields[i].dataTypeID, parsers2)
          )
        );
      } else {
        currentResultSet.rows.push(
          Object.fromEntries(
            msg.fields.map((field, i) => [
              currentResultSet.fields[i].name,
              parseType(field, currentResultSet.fields[i].dataTypeID, parsers2)
            ])
          )
        );
      }
    } else if (message.name === "commandComplete") {
      const msg = message;
      affectedRows += retrieveRowCount(msg);
      if (index === filteredMessages.length - 1)
        resultSets.push({
          ...currentResultSet,
          affectedRows,
          ...blob ? { blob } : {}
        });
      else resultSets.push(currentResultSet);
      currentResultSet = { rows: [], fields: [] };
    }
  });
  if (resultSets.length === 0) {
    resultSets.push({
      rows: [],
      fields: []
    });
  }
  return resultSets;
}
function retrieveRowCount(msg) {
  const parts = msg.text.split(" ");
  switch (parts[0]) {
    case "INSERT":
      return parseInt(parts[2], 10);
    case "UPDATE":
    case "DELETE":
      return parseInt(parts[1], 10);
    default:
      return 0;
  }
}
function parseDescribeStatementResults(messages) {
  const message = messages.find(
    (msg) => msg.name === "parameterDescription"
  );
  if (message) {
    return message.dataTypeIDs;
  }
  return [];
}

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
var query2 = (text) => {
  return writer.addCString(text).flush(81 /* query */);
};
var emptyValueArray = [];
var parse = (query3) => {
  const name = query3.name ?? "";
  if (name.length > 63) {
    console.error(
      "Warning! Postgres only supports 63 characters for query names."
    );
    console.error("You supplied %s (%s)", name, name.length);
    console.error(
      "This can cause conflicts and silent errors executing queries"
    );
  }
  const buffer = writer.addCString(name).addCString(query3.text).addInt16(query3.types?.length ?? 0);
  query3.types?.forEach((type) => buffer.addInt32(type));
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
  query: query2,
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

// src/base.ts
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
    const types2 = await this.query(`
      SELECT b.oid, b.typarray
      FROM pg_catalog.pg_type a
      LEFT JOIN pg_catalog.pg_type b ON b.oid = a.typelem
      WHERE a.typcategory = 'A'
      GROUP BY b.oid, b.typarray
      ORDER BY b.oid
    `);
    for (const type of types2.rows) {
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
  async query(query3, params, options) {
    await this._checkReady();
    return await this._runExclusiveTransaction(async () => {
      return await __privateMethod(this, _BasePGlite_instances, runQuery_fn).call(this, query3, params, options);
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
    const { query: query3, params: actualParams } = query(sqlStrings, ...params);
    return await this.query(query3, actualParams);
  }
  /**
   * Execute a SQL query, this can have multiple statements.
   * This uses the "Simple Query" postgres wire protocol message.
   * @param query The query to execute
   * @returns The result of the query
   */
  async exec(query3, options) {
    await this._checkReady();
    return await this._runExclusiveTransaction(async () => {
      return await __privateMethod(this, _BasePGlite_instances, runExec_fn).call(this, query3, options);
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
        query: async (query3, params, options) => {
          checkClosed();
          return await __privateMethod(this, _BasePGlite_instances, runQuery_fn).call(this, query3, params, options);
        },
        sql: async (sqlStrings, ...params) => {
          const { query: query3, params: actualParams } = query(
            sqlStrings,
            ...params
          );
          return await __privateMethod(this, _BasePGlite_instances, runQuery_fn).call(this, query3, actualParams);
        },
        exec: async (query3, options) => {
          checkClosed();
          return await __privateMethod(this, _BasePGlite_instances, runExec_fn).call(this, query3, options);
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
runQuery_fn = async function(query3, params = [], options) {
  return await this._runExclusiveQuery(async () => {
    __privateMethod(this, _BasePGlite_instances, log_fn).call(this, "runQuery", query3, params, options);
    await this._handleBlob(options?.blob);
    let results;
    try {
      const { messages: parseResults2 } = await __privateMethod(this, _BasePGlite_instances, execProtocolNoSync_fn).call(this, serialize.parse({ text: query3, types: options?.paramTypes }), options);
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
runExec_fn = async function(query3, options) {
  return await this._runExclusiveQuery(async () => {
    __privateMethod(this, _BasePGlite_instances, log_fn).call(this, "runExec", query3, options);
    await this._handleBlob(options?.blob);
    let results;
    try {
      results = (await __privateMethod(this, _BasePGlite_instances, execProtocolNoSync_fn).call(this, serialize.query(query3), options)).messages;
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

// src/worker/index.ts
var _initPromise, _debug, _ready, _closed, _isLeader, _eventTarget, _tabId, _connected, _workerProcess, _workerID, _workerHerePromise, _workerReadyPromise, _broadcastChannel, _tabChannel, _releaseTabCloseLock, _notifyListeners, _globalNotifyListeners, _extensions, _extensionsClose, _PGliteWorker_instances, init_fn, leaderNotifyLoop_fn, rpc_fn, receiveNotification_fn;
var _PGliteWorker = class _PGliteWorker extends BasePGlite {
  constructor(worker2, options) {
    super();
    __privateAdd(this, _PGliteWorker_instances);
    __privateAdd(this, _initPromise);
    __privateAdd(this, _debug, 0);
    __privateAdd(this, _ready, false);
    __privateAdd(this, _closed, false);
    __privateAdd(this, _isLeader, false);
    __privateAdd(this, _eventTarget, new EventTarget());
    __privateAdd(this, _tabId);
    __privateAdd(this, _connected, false);
    __privateAdd(this, _workerProcess);
    __privateAdd(this, _workerID);
    __privateAdd(this, _workerHerePromise);
    __privateAdd(this, _workerReadyPromise);
    __privateAdd(this, _broadcastChannel);
    __privateAdd(this, _tabChannel);
    __privateAdd(this, _releaseTabCloseLock);
    __privateAdd(this, _notifyListeners, /* @__PURE__ */ new Map());
    __privateAdd(this, _globalNotifyListeners, /* @__PURE__ */ new Set());
    __privateAdd(this, _extensions);
    __privateAdd(this, _extensionsClose, []);
    __privateSet(this, _workerProcess, worker2);
    __privateSet(this, _tabId, uuid());
    __privateSet(this, _extensions, options?.extensions ?? {});
    __privateSet(this, _workerHerePromise, new Promise((resolve) => {
      __privateGet(this, _workerProcess).addEventListener(
        "message",
        (event) => {
          if (event.data.type === "here") {
            resolve();
          } else {
            throw new Error("Invalid message");
          }
        },
        { once: true }
      );
    }));
    __privateSet(this, _workerReadyPromise, new Promise((resolve) => {
      const callback = (event) => {
        if (event.data.type === "ready") {
          __privateSet(this, _workerID, event.data.id);
          __privateGet(this, _workerProcess).removeEventListener("message", callback);
          resolve();
        }
      };
      __privateGet(this, _workerProcess).addEventListener("message", callback);
    }));
    __privateSet(this, _initPromise, __privateMethod(this, _PGliteWorker_instances, init_fn).call(this, options));
  }
  /**
   * Create a new PGlite instance with extensions on the Typescript interface
   * This also awaits the instance to be ready before resolving
   * (The main constructor does enable extensions, however due to the limitations
   * of Typescript, the extensions are not available on the instance interface)
   * @param worker The worker to use
   * @param options Optional options
   * @returns A promise that resolves to the PGlite instance when it's ready.
   */
  static async create(worker2, options) {
    const pg = new _PGliteWorker(worker2, options);
    await __privateGet(pg, _initPromise);
    return pg;
  }
  get waitReady() {
    return new Promise((resolve) => {
      __privateGet(this, _initPromise).then(() => {
        if (!__privateGet(this, _connected)) {
          resolve(
            new Promise((resolve2) => {
              __privateGet(this, _eventTarget).addEventListener("connected", () => {
                resolve2();
              });
            })
          );
        } else {
          resolve();
        }
      });
    });
  }
  get debug() {
    return __privateGet(this, _debug);
  }
  /**
   * The ready state of the database
   */
  get ready() {
    return __privateGet(this, _ready);
  }
  /**
   * The closed state of the database
   */
  get closed() {
    return __privateGet(this, _closed);
  }
  /**
   * The leader state of this tab
   */
  get isLeader() {
    return __privateGet(this, _isLeader);
  }
  /**
   * Close the database
   * @returns Promise that resolves when the connection to shared PGlite is closed
   */
  async close() {
    var _a;
    if (__privateGet(this, _closed)) {
      return;
    }
    __privateSet(this, _closed, true);
    __privateGet(this, _broadcastChannel)?.close();
    __privateGet(this, _tabChannel)?.close();
    (_a = __privateGet(this, _releaseTabCloseLock)) == null ? void 0 : _a.call(this);
    __privateGet(this, _workerProcess).terminate();
  }
  /**
   * Close the database when the object exits scope
   * Stage 3 ECMAScript Explicit Resource Management
   * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#using-declarations-and-explicit-resource-management
   */
  async [Symbol.asyncDispose]() {
    await this.close();
  }
  /**
   * Execute a postgres wire protocol message directly without wrapping the response.
   * Only use if `execProtocol()` doesn't suite your needs.
   *
   * **Warning:** This bypasses PGlite's protocol wrappers that manage error/notice messages,
   * transactions, and notification listeners. Only use if you need to bypass these wrappers and
   * don't intend to use the above features.
   *
   * @param message The postgres wire protocol message to execute
   * @returns The direct message data response produced by Postgres
   */
  async execProtocolRaw(message) {
    return await __privateMethod(this, _PGliteWorker_instances, rpc_fn).call(this, "execProtocolRaw", message);
  }
  /**
   * Execute a postgres wire protocol message
   * @param message The postgres wire protocol message to execute
   * @returns The result of the query
   */
  async execProtocol(message) {
    return await __privateMethod(this, _PGliteWorker_instances, rpc_fn).call(this, "execProtocol", message);
  }
  /**
   * Sync the database to the filesystem
   * @returns Promise that resolves when the database is synced to the filesystem
   */
  async syncToFs() {
    await __privateMethod(this, _PGliteWorker_instances, rpc_fn).call(this, "syncToFs");
  }
  /**
   * Listen for a notification
   * @param channel The channel to listen on
   * @param callback The callback to call when a notification is received
   */
  async listen(channel, callback) {
    await this.waitReady;
    if (!__privateGet(this, _notifyListeners).has(channel)) {
      __privateGet(this, _notifyListeners).set(channel, /* @__PURE__ */ new Set());
    }
    __privateGet(this, _notifyListeners).get(channel)?.add(callback);
    await this.exec(`LISTEN ${channel}`);
    return async () => {
      await this.unlisten(channel, callback);
    };
  }
  /**
   * Stop listening for a notification
   * @param channel The channel to stop listening on
   * @param callback The callback to remove
   */
  async unlisten(channel, callback) {
    await this.waitReady;
    if (callback) {
      __privateGet(this, _notifyListeners).get(channel)?.delete(callback);
    } else {
      __privateGet(this, _notifyListeners).delete(channel);
    }
    if (__privateGet(this, _notifyListeners).get(channel)?.size === 0) {
      await this.exec(`UNLISTEN ${channel}`);
    }
  }
  /**
   * Listen to notifications
   * @param callback The callback to call when a notification is received
   */
  onNotification(callback) {
    __privateGet(this, _globalNotifyListeners).add(callback);
    return () => {
      __privateGet(this, _globalNotifyListeners).delete(callback);
    };
  }
  /**
   * Stop listening to notifications
   * @param callback The callback to remove
   */
  offNotification(callback) {
    __privateGet(this, _globalNotifyListeners).delete(callback);
  }
  async dumpDataDir() {
    return await __privateMethod(this, _PGliteWorker_instances, rpc_fn).call(this, "dumpDataDir");
  }
  onLeaderChange(callback) {
    __privateGet(this, _eventTarget).addEventListener("leader-change", callback);
    return () => {
      __privateGet(this, _eventTarget).removeEventListener("leader-change", callback);
    };
  }
  offLeaderChange(callback) {
    __privateGet(this, _eventTarget).removeEventListener("leader-change", callback);
  }
  async _handleBlob(blob) {
    await __privateMethod(this, _PGliteWorker_instances, rpc_fn).call(this, "_handleBlob", blob);
  }
  async _getWrittenBlob() {
    return await __privateMethod(this, _PGliteWorker_instances, rpc_fn).call(this, "_getWrittenBlob");
  }
  async _cleanupBlob() {
    await __privateMethod(this, _PGliteWorker_instances, rpc_fn).call(this, "_cleanupBlob");
  }
  async _checkReady() {
    await this.waitReady;
  }
  async _runExclusiveQuery(fn) {
    await __privateMethod(this, _PGliteWorker_instances, rpc_fn).call(this, "_acquireQueryLock");
    try {
      return await fn();
    } finally {
      await __privateMethod(this, _PGliteWorker_instances, rpc_fn).call(this, "_releaseQueryLock");
    }
  }
  async _runExclusiveTransaction(fn) {
    await __privateMethod(this, _PGliteWorker_instances, rpc_fn).call(this, "_acquireTransactionLock");
    try {
      return await fn();
    } finally {
      await __privateMethod(this, _PGliteWorker_instances, rpc_fn).call(this, "_releaseTransactionLock");
    }
  }
};
_initPromise = new WeakMap();
_debug = new WeakMap();
_ready = new WeakMap();
_closed = new WeakMap();
_isLeader = new WeakMap();
_eventTarget = new WeakMap();
_tabId = new WeakMap();
_connected = new WeakMap();
_workerProcess = new WeakMap();
_workerID = new WeakMap();
_workerHerePromise = new WeakMap();
_workerReadyPromise = new WeakMap();
_broadcastChannel = new WeakMap();
_tabChannel = new WeakMap();
_releaseTabCloseLock = new WeakMap();
_notifyListeners = new WeakMap();
_globalNotifyListeners = new WeakMap();
_extensions = new WeakMap();
_extensionsClose = new WeakMap();
_PGliteWorker_instances = new WeakSet();
init_fn = async function(options = {}) {
  for (const [extName, ext] of Object.entries(__privateGet(this, _extensions))) {
    if (ext instanceof URL) {
      throw new Error(
        "URL extensions are not supported on the client side of a worker"
      );
    } else {
      const extRet = await ext.setup(this, {}, true);
      if (extRet.emscriptenOpts) {
        console.warn(
          `PGlite extension ${extName} returned emscriptenOpts, these are not supported on the client side of a worker`
        );
      }
      if (extRet.namespaceObj) {
        const instance = this;
        instance[extName] = extRet.namespaceObj;
      }
      if (extRet.bundlePath) {
        console.warn(
          `PGlite extension ${extName} returned bundlePath, this is not supported on the client side of a worker`
        );
      }
      if (extRet.init) {
        await extRet.init();
      }
      if (extRet.close) {
        __privateGet(this, _extensionsClose).push(extRet.close);
      }
    }
  }
  await __privateGet(this, _workerHerePromise);
  const { extensions: _, ...workerOptions } = options;
  __privateGet(this, _workerProcess).postMessage({
    type: "init",
    options: workerOptions
  });
  await __privateGet(this, _workerReadyPromise);
  const tabCloseLockId = `pglite-tab-close:${__privateGet(this, _tabId)}`;
  __privateSet(this, _releaseTabCloseLock, await acquireLock(tabCloseLockId));
  const broadcastChannelId = `pglite-broadcast:${__privateGet(this, _workerID)}`;
  __privateSet(this, _broadcastChannel, new BroadcastChannel(broadcastChannelId));
  const tabChannelId = `pglite-tab:${__privateGet(this, _tabId)}`;
  __privateSet(this, _tabChannel, new BroadcastChannel(tabChannelId));
  __privateGet(this, _broadcastChannel).addEventListener("message", async (event) => {
    if (event.data.type === "leader-here") {
      __privateSet(this, _connected, false);
      __privateGet(this, _eventTarget).dispatchEvent(new Event("leader-change"));
      __privateMethod(this, _PGliteWorker_instances, leaderNotifyLoop_fn).call(this);
    } else if (event.data.type === "notify") {
      __privateMethod(this, _PGliteWorker_instances, receiveNotification_fn).call(this, event.data.channel, event.data.payload);
    }
  });
  __privateGet(this, _tabChannel).addEventListener("message", async (event) => {
    if (event.data.type === "connected") {
      __privateSet(this, _connected, true);
      __privateGet(this, _eventTarget).dispatchEvent(new Event("connected"));
      __privateSet(this, _debug, await __privateMethod(this, _PGliteWorker_instances, rpc_fn).call(this, "getDebugLevel"));
      __privateSet(this, _ready, true);
    }
  });
  __privateGet(this, _workerProcess).addEventListener("message", async (event) => {
    if (event.data.type === "leader-now") {
      __privateSet(this, _isLeader, true);
      __privateGet(this, _eventTarget).dispatchEvent(new Event("leader-change"));
    }
  });
  __privateMethod(this, _PGliteWorker_instances, leaderNotifyLoop_fn).call(this);
  this._initArrayTypes();
};
leaderNotifyLoop_fn = async function() {
  if (!__privateGet(this, _connected)) {
    __privateGet(this, _broadcastChannel).postMessage({
      type: "tab-here",
      id: __privateGet(this, _tabId)
    });
    setTimeout(() => __privateMethod(this, _PGliteWorker_instances, leaderNotifyLoop_fn).call(this), 16);
  }
};
rpc_fn = async function(method, ...args) {
  const callId = uuid();
  const message = {
    type: "rpc-call",
    callId,
    method,
    args
  };
  __privateGet(this, _tabChannel).postMessage(message);
  return await new Promise(
    (resolve, reject) => {
      const listener = (event) => {
        if (event.data.callId !== callId) return;
        cleanup();
        const message2 = event.data;
        if (message2.type === "rpc-return") {
          resolve(message2.result);
        } else if (message2.type === "rpc-error") {
          const error = new Error(message2.error.message);
          Object.assign(error, message2.error);
          reject(error);
        } else {
          reject(new Error("Invalid message"));
        }
      };
      const leaderChangeListener = () => {
        cleanup();
        reject(new LeaderChangedError());
      };
      const cleanup = () => {
        __privateGet(this, _tabChannel).removeEventListener("message", listener);
        __privateGet(this, _eventTarget).removeEventListener(
          "leader-change",
          leaderChangeListener
        );
      };
      __privateGet(this, _eventTarget).addEventListener(
        "leader-change",
        leaderChangeListener
      );
      __privateGet(this, _tabChannel).addEventListener("message", listener);
    }
  );
};
receiveNotification_fn = function(channel, payload) {
  const listeners = __privateGet(this, _notifyListeners).get(channel);
  if (listeners) {
    for (const listener of listeners) {
      queueMicrotask(() => listener(payload));
    }
  }
  for (const listener of __privateGet(this, _globalNotifyListeners)) {
    queueMicrotask(() => listener(channel, payload));
  }
};
var PGliteWorker = _PGliteWorker;
async function worker({ init }) {
  postMessage({ type: "here" });
  const options = await new Promise(
    (resolve) => {
      addEventListener(
        "message",
        (event) => {
          if (event.data.type === "init") {
            resolve(event.data.options);
          }
        },
        { once: true }
      );
    }
  );
  const id = options.id ?? `${importMetaUrl}:${options.dataDir ?? ""}`;
  postMessage({ type: "ready", id });
  const electionLockId = `pglite-election-lock:${id}`;
  const broadcastChannelId = `pglite-broadcast:${id}`;
  const broadcastChannel = new BroadcastChannel(broadcastChannelId);
  const connectedTabs = /* @__PURE__ */ new Set();
  await acquireLock(electionLockId);
  const dbPromise = init(options);
  broadcastChannel.onmessage = async (event) => {
    const msg = event.data;
    switch (msg.type) {
      case "tab-here":
        connectTab(msg.id, await dbPromise, connectedTabs);
        break;
    }
  };
  broadcastChannel.postMessage({ type: "leader-here", id });
  postMessage({ type: "leader-now" });
  const db = await dbPromise;
  db.onNotification((channel, payload) => {
    broadcastChannel.postMessage({ type: "notify", channel, payload });
  });
}
function connectTab(tabId, pg, connectedTabs) {
  if (connectedTabs.has(tabId)) {
    return;
  }
  connectedTabs.add(tabId);
  const tabChannelId = `pglite-tab:${tabId}`;
  const tabCloseLockId = `pglite-tab-close:${tabId}`;
  const tabChannel = new BroadcastChannel(tabChannelId);
  navigator.locks.request(tabCloseLockId, () => {
    return new Promise((resolve) => {
      tabChannel.close();
      connectedTabs.delete(tabId);
      resolve();
    });
  });
  const api = makeWorkerApi(tabId, pg);
  tabChannel.addEventListener("message", async (event) => {
    const msg = event.data;
    switch (msg.type) {
      case "rpc-call": {
        await pg.waitReady;
        const { callId, method, args } = msg;
        try {
          const result = await api[method](...args);
          tabChannel.postMessage({
            type: "rpc-return",
            callId,
            result
          });
        } catch (error) {
          console.error(error);
          tabChannel.postMessage({
            type: "rpc-error",
            callId,
            error: { message: error.message }
          });
        }
        break;
      }
    }
  });
  tabChannel.postMessage({ type: "connected" });
}
function makeWorkerApi(tabId, db) {
  let queryLockRelease = null;
  let transactionLockRelease = null;
  const tabCloseLockId = `pglite-tab-close:${tabId}`;
  acquireLock(tabCloseLockId).then(() => {
    if (transactionLockRelease) {
      db.exec("ROLLBACK");
    }
    queryLockRelease?.();
    transactionLockRelease?.();
  });
  return {
    async getDebugLevel() {
      return db.debug;
    },
    async close() {
      await db.close();
    },
    async execProtocol(message) {
      const { messages, data } = await db.execProtocol(message);
      if (data.byteLength !== data.buffer.byteLength) {
        const buffer = new ArrayBuffer(data.byteLength);
        const dataCopy = new Uint8Array(buffer);
        dataCopy.set(data);
        return { messages, data: dataCopy };
      } else {
        return { messages, data };
      }
    },
    async execProtocolRaw(message) {
      const result = await db.execProtocolRaw(message);
      if (result.byteLength !== result.buffer.byteLength) {
        const buffer = new ArrayBuffer(result.byteLength);
        const resultCopy = new Uint8Array(buffer);
        resultCopy.set(result);
        return resultCopy;
      } else {
        return result;
      }
    },
    async dumpDataDir() {
      return await db.dumpDataDir();
    },
    async syncToFs() {
      return await db.syncToFs();
    },
    async _handleBlob(blob) {
      return await db._handleBlob(blob);
    },
    async _getWrittenBlob() {
      return await db._getWrittenBlob();
    },
    async _cleanupBlob() {
      return await db._cleanupBlob();
    },
    async _checkReady() {
      return await db._checkReady();
    },
    async _acquireQueryLock() {
      return new Promise((resolve) => {
        db._runExclusiveQuery(() => {
          return new Promise((release) => {
            queryLockRelease = release;
            resolve();
          });
        });
      });
    },
    async _releaseQueryLock() {
      queryLockRelease?.();
      queryLockRelease = null;
    },
    async _acquireTransactionLock() {
      return new Promise((resolve) => {
        db._runExclusiveTransaction(() => {
          return new Promise((release) => {
            transactionLockRelease = release;
            resolve();
          });
        });
      });
    },
    async _releaseTransactionLock() {
      transactionLockRelease?.();
      transactionLockRelease = null;
    }
  };
}
var LeaderChangedError = class extends Error {
  constructor() {
    super("Leader changed, pending operation in indeterminate state");
  }
};
async function acquireLock(lockId) {
  let release;
  await new Promise((resolve) => {
    navigator.locks.request(lockId, () => {
      return new Promise((releaseCallback) => {
        release = releaseCallback;
        resolve();
      });
    });
  });
  return release;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LeaderChangedError,
  PGliteWorker,
  worker
});
//# sourceMappingURL=index.cjs.map
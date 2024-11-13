import {
  __export,
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet,
  __privateWrapper,
  init_esm_shims
} from "./chunk-ASR247EI.js";

// ../pg-protocol/src/messages.ts
var messages_exports = {};
__export(messages_exports, {
  AuthenticationCleartextPassword: () => AuthenticationCleartextPassword,
  AuthenticationMD5Password: () => AuthenticationMD5Password,
  AuthenticationOk: () => AuthenticationOk,
  AuthenticationSASL: () => AuthenticationSASL,
  AuthenticationSASLContinue: () => AuthenticationSASLContinue,
  AuthenticationSASLFinal: () => AuthenticationSASLFinal,
  BackendKeyDataMessage: () => BackendKeyDataMessage,
  CommandCompleteMessage: () => CommandCompleteMessage,
  CopyDataMessage: () => CopyDataMessage,
  CopyResponse: () => CopyResponse,
  DataRowMessage: () => DataRowMessage,
  DatabaseError: () => DatabaseError,
  Field: () => Field,
  NoticeMessage: () => NoticeMessage,
  NotificationResponseMessage: () => NotificationResponseMessage,
  ParameterDescriptionMessage: () => ParameterDescriptionMessage,
  ParameterStatusMessage: () => ParameterStatusMessage,
  ReadyForQueryMessage: () => ReadyForQueryMessage,
  RowDescriptionMessage: () => RowDescriptionMessage,
  bindComplete: () => bindComplete,
  closeComplete: () => closeComplete,
  copyDone: () => copyDone,
  emptyQuery: () => emptyQuery,
  noData: () => noData,
  parseComplete: () => parseComplete,
  portalSuspended: () => portalSuspended,
  replicationStart: () => replicationStart
});
init_esm_shims();
var parseComplete = {
  name: "parseComplete",
  length: 5
};
var bindComplete = {
  name: "bindComplete",
  length: 5
};
var closeComplete = {
  name: "closeComplete",
  length: 5
};
var noData = {
  name: "noData",
  length: 5
};
var portalSuspended = {
  name: "portalSuspended",
  length: 5
};
var replicationStart = {
  name: "replicationStart",
  length: 4
};
var emptyQuery = {
  name: "emptyQuery",
  length: 4
};
var copyDone = {
  name: "copyDone",
  length: 4
};
var AuthenticationOk = class {
  constructor(length) {
    this.length = length;
    this.name = "authenticationOk";
  }
};
var AuthenticationCleartextPassword = class {
  constructor(length) {
    this.length = length;
    this.name = "authenticationCleartextPassword";
  }
};
var AuthenticationMD5Password = class {
  constructor(length, salt) {
    this.length = length;
    this.salt = salt;
    this.name = "authenticationMD5Password";
  }
};
var AuthenticationSASL = class {
  constructor(length, mechanisms) {
    this.length = length;
    this.mechanisms = mechanisms;
    this.name = "authenticationSASL";
  }
};
var AuthenticationSASLContinue = class {
  constructor(length, data) {
    this.length = length;
    this.data = data;
    this.name = "authenticationSASLContinue";
  }
};
var AuthenticationSASLFinal = class {
  constructor(length, data) {
    this.length = length;
    this.data = data;
    this.name = "authenticationSASLFinal";
  }
};
var DatabaseError = class extends Error {
  constructor(message, length, name) {
    super(message);
    this.length = length;
    this.name = name;
  }
};
var CopyDataMessage = class {
  constructor(length, chunk) {
    this.length = length;
    this.chunk = chunk;
    this.name = "copyData";
  }
};
var CopyResponse = class {
  constructor(length, name, binary, columnCount) {
    this.length = length;
    this.name = name;
    this.binary = binary;
    this.columnTypes = new Array(columnCount);
  }
};
var Field = class {
  constructor(name, tableID, columnID, dataTypeID, dataTypeSize, dataTypeModifier, format) {
    this.name = name;
    this.tableID = tableID;
    this.columnID = columnID;
    this.dataTypeID = dataTypeID;
    this.dataTypeSize = dataTypeSize;
    this.dataTypeModifier = dataTypeModifier;
    this.format = format;
  }
};
var RowDescriptionMessage = class {
  constructor(length, fieldCount) {
    this.length = length;
    this.fieldCount = fieldCount;
    this.name = "rowDescription";
    this.fields = new Array(this.fieldCount);
  }
};
var ParameterDescriptionMessage = class {
  constructor(length, parameterCount) {
    this.length = length;
    this.parameterCount = parameterCount;
    this.name = "parameterDescription";
    this.dataTypeIDs = new Array(this.parameterCount);
  }
};
var ParameterStatusMessage = class {
  constructor(length, parameterName, parameterValue) {
    this.length = length;
    this.parameterName = parameterName;
    this.parameterValue = parameterValue;
    this.name = "parameterStatus";
  }
};
var BackendKeyDataMessage = class {
  constructor(length, processID, secretKey) {
    this.length = length;
    this.processID = processID;
    this.secretKey = secretKey;
    this.name = "backendKeyData";
  }
};
var NotificationResponseMessage = class {
  constructor(length, processId, channel, payload) {
    this.length = length;
    this.processId = processId;
    this.channel = channel;
    this.payload = payload;
    this.name = "notification";
  }
};
var ReadyForQueryMessage = class {
  constructor(length, status) {
    this.length = length;
    this.status = status;
    this.name = "readyForQuery";
  }
};
var CommandCompleteMessage = class {
  constructor(length, text) {
    this.length = length;
    this.text = text;
    this.name = "commandComplete";
  }
};
var DataRowMessage = class {
  constructor(length, fields) {
    this.length = length;
    this.fields = fields;
    this.name = "dataRow";
    this.fieldCount = fields.length;
  }
};
var NoticeMessage = class {
  constructor(length, message) {
    this.length = length;
    this.message = message;
    this.name = "notice";
  }
};

// ../pg-protocol/src/index.ts
var src_exports = {};
__export(src_exports, {
  Parser: () => Parser,
  messages: () => messages_exports,
  serialize: () => serialize
});
init_esm_shims();

// ../pg-protocol/src/serializer.ts
init_esm_shims();

// ../pg-protocol/src/buffer-writer.ts
init_esm_shims();

// ../pg-protocol/src/string-utils.ts
init_esm_shims();
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

// ../pg-protocol/src/parser.ts
init_esm_shims();

// ../pg-protocol/src/types.ts
init_esm_shims();
var Modes = {
  text: 0,
  binary: 1
};

// ../pg-protocol/src/buffer-reader.ts
init_esm_shims();
var emptyBuffer = new ArrayBuffer(0);
var _bufferView2, _offset2, _encoding, _decoder, _littleEndian2;
var BufferReader = class {
  constructor(offset = 0) {
    __privateAdd(this, _bufferView2, new DataView(emptyBuffer));
    __privateAdd(this, _offset2);
    // TODO(bmc): support non-utf8 encoding?
    __privateAdd(this, _encoding, "utf-8");
    __privateAdd(this, _decoder, new TextDecoder(__privateGet(this, _encoding)));
    __privateAdd(this, _littleEndian2, false);
    __privateSet(this, _offset2, offset);
  }
  setBuffer(offset, buffer) {
    __privateSet(this, _offset2, offset);
    __privateSet(this, _bufferView2, new DataView(buffer));
  }
  int16() {
    const result = __privateGet(this, _bufferView2).getInt16(__privateGet(this, _offset2), __privateGet(this, _littleEndian2));
    __privateSet(this, _offset2, __privateGet(this, _offset2) + 2);
    return result;
  }
  byte() {
    const result = __privateGet(this, _bufferView2).getUint8(__privateGet(this, _offset2));
    __privateWrapper(this, _offset2)._++;
    return result;
  }
  int32() {
    const result = __privateGet(this, _bufferView2).getInt32(__privateGet(this, _offset2), __privateGet(this, _littleEndian2));
    __privateSet(this, _offset2, __privateGet(this, _offset2) + 4);
    return result;
  }
  string(length) {
    const result = __privateGet(this, _decoder).decode(this.bytes(length));
    return result;
  }
  cstring() {
    const start = __privateGet(this, _offset2);
    let end = start;
    while (__privateGet(this, _bufferView2).getUint8(end++) !== 0) {
    }
    const result = this.string(end - start - 1);
    __privateSet(this, _offset2, end);
    return result;
  }
  bytes(length) {
    const result = __privateGet(this, _bufferView2).buffer.slice(
      __privateGet(this, _offset2),
      __privateGet(this, _offset2) + length
    );
    __privateSet(this, _offset2, __privateGet(this, _offset2) + length);
    return new Uint8Array(result);
  }
};
_bufferView2 = new WeakMap();
_offset2 = new WeakMap();
_encoding = new WeakMap();
_decoder = new WeakMap();
_littleEndian2 = new WeakMap();

// ../pg-protocol/src/parser.ts
var CODE_LENGTH = 1;
var LEN_LENGTH = 4;
var HEADER_LENGTH = CODE_LENGTH + LEN_LENGTH;
var emptyBuffer2 = new ArrayBuffer(0);
var _bufferView3, _bufferRemainingLength, _bufferOffset, _reader, _Parser_instances, mergeBuffer_fn, handlePacket_fn, parseReadyForQueryMessage_fn, parseCommandCompleteMessage_fn, parseCopyData_fn, parseCopyInMessage_fn, parseCopyOutMessage_fn, parseCopyMessage_fn, parseNotificationMessage_fn, parseRowDescriptionMessage_fn, parseField_fn, parseParameterDescriptionMessage_fn, parseDataRowMessage_fn, parseParameterStatusMessage_fn, parseBackendKeyData_fn, parseAuthenticationResponse_fn, parseErrorMessage_fn;
var Parser = class {
  constructor() {
    __privateAdd(this, _Parser_instances);
    __privateAdd(this, _bufferView3, new DataView(emptyBuffer2));
    __privateAdd(this, _bufferRemainingLength, 0);
    __privateAdd(this, _bufferOffset, 0);
    __privateAdd(this, _reader, new BufferReader());
  }
  parse(buffer, callback) {
    __privateMethod(this, _Parser_instances, mergeBuffer_fn).call(this, ArrayBuffer.isView(buffer) ? buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength
    ) : buffer);
    const bufferFullLength = __privateGet(this, _bufferOffset) + __privateGet(this, _bufferRemainingLength);
    let offset = __privateGet(this, _bufferOffset);
    while (offset + HEADER_LENGTH <= bufferFullLength) {
      const code = __privateGet(this, _bufferView3).getUint8(offset);
      const length = __privateGet(this, _bufferView3).getUint32(offset + CODE_LENGTH, false);
      const fullMessageLength = CODE_LENGTH + length;
      if (fullMessageLength + offset <= bufferFullLength) {
        const message = __privateMethod(this, _Parser_instances, handlePacket_fn).call(this, offset + HEADER_LENGTH, code, length, __privateGet(this, _bufferView3).buffer);
        callback(message);
        offset += fullMessageLength;
      } else {
        break;
      }
    }
    if (offset === bufferFullLength) {
      __privateSet(this, _bufferView3, new DataView(emptyBuffer2));
      __privateSet(this, _bufferRemainingLength, 0);
      __privateSet(this, _bufferOffset, 0);
    } else {
      __privateSet(this, _bufferRemainingLength, bufferFullLength - offset);
      __privateSet(this, _bufferOffset, offset);
    }
  }
};
_bufferView3 = new WeakMap();
_bufferRemainingLength = new WeakMap();
_bufferOffset = new WeakMap();
_reader = new WeakMap();
_Parser_instances = new WeakSet();
mergeBuffer_fn = function(buffer) {
  if (__privateGet(this, _bufferRemainingLength) > 0) {
    const newLength = __privateGet(this, _bufferRemainingLength) + buffer.byteLength;
    const newFullLength = newLength + __privateGet(this, _bufferOffset);
    if (newFullLength > __privateGet(this, _bufferView3).byteLength) {
      let newBuffer;
      if (newLength <= __privateGet(this, _bufferView3).byteLength && __privateGet(this, _bufferOffset) >= __privateGet(this, _bufferRemainingLength)) {
        newBuffer = __privateGet(this, _bufferView3).buffer;
      } else {
        let newBufferLength = __privateGet(this, _bufferView3).byteLength * 2;
        while (newLength >= newBufferLength) {
          newBufferLength *= 2;
        }
        newBuffer = new ArrayBuffer(newBufferLength);
      }
      new Uint8Array(newBuffer).set(
        new Uint8Array(
          __privateGet(this, _bufferView3).buffer,
          __privateGet(this, _bufferOffset),
          __privateGet(this, _bufferRemainingLength)
        )
      );
      __privateSet(this, _bufferView3, new DataView(newBuffer));
      __privateSet(this, _bufferOffset, 0);
    }
    new Uint8Array(__privateGet(this, _bufferView3).buffer).set(
      new Uint8Array(buffer),
      __privateGet(this, _bufferOffset) + __privateGet(this, _bufferRemainingLength)
    );
    __privateSet(this, _bufferRemainingLength, newLength);
  } else {
    __privateSet(this, _bufferView3, new DataView(buffer));
    __privateSet(this, _bufferOffset, 0);
    __privateSet(this, _bufferRemainingLength, buffer.byteLength);
  }
};
handlePacket_fn = function(offset, code, length, bytes) {
  switch (code) {
    case 50 /* BindComplete */:
      return bindComplete;
    case 49 /* ParseComplete */:
      return parseComplete;
    case 51 /* CloseComplete */:
      return closeComplete;
    case 110 /* NoData */:
      return noData;
    case 115 /* PortalSuspended */:
      return portalSuspended;
    case 99 /* CopyDone */:
      return copyDone;
    case 87 /* ReplicationStart */:
      return replicationStart;
    case 73 /* EmptyQuery */:
      return emptyQuery;
    case 68 /* DataRow */:
      return __privateMethod(this, _Parser_instances, parseDataRowMessage_fn).call(this, offset, length, bytes);
    case 67 /* CommandComplete */:
      return __privateMethod(this, _Parser_instances, parseCommandCompleteMessage_fn).call(this, offset, length, bytes);
    case 90 /* ReadyForQuery */:
      return __privateMethod(this, _Parser_instances, parseReadyForQueryMessage_fn).call(this, offset, length, bytes);
    case 65 /* NotificationResponse */:
      return __privateMethod(this, _Parser_instances, parseNotificationMessage_fn).call(this, offset, length, bytes);
    case 82 /* AuthenticationResponse */:
      return __privateMethod(this, _Parser_instances, parseAuthenticationResponse_fn).call(this, offset, length, bytes);
    case 83 /* ParameterStatus */:
      return __privateMethod(this, _Parser_instances, parseParameterStatusMessage_fn).call(this, offset, length, bytes);
    case 75 /* BackendKeyData */:
      return __privateMethod(this, _Parser_instances, parseBackendKeyData_fn).call(this, offset, length, bytes);
    case 69 /* ErrorMessage */:
      return __privateMethod(this, _Parser_instances, parseErrorMessage_fn).call(this, offset, length, bytes, "error");
    case 78 /* NoticeMessage */:
      return __privateMethod(this, _Parser_instances, parseErrorMessage_fn).call(this, offset, length, bytes, "notice");
    case 84 /* RowDescriptionMessage */:
      return __privateMethod(this, _Parser_instances, parseRowDescriptionMessage_fn).call(this, offset, length, bytes);
    case 116 /* ParameterDescriptionMessage */:
      return __privateMethod(this, _Parser_instances, parseParameterDescriptionMessage_fn).call(this, offset, length, bytes);
    case 71 /* CopyIn */:
      return __privateMethod(this, _Parser_instances, parseCopyInMessage_fn).call(this, offset, length, bytes);
    case 72 /* CopyOut */:
      return __privateMethod(this, _Parser_instances, parseCopyOutMessage_fn).call(this, offset, length, bytes);
    case 100 /* CopyData */:
      return __privateMethod(this, _Parser_instances, parseCopyData_fn).call(this, offset, length, bytes);
    default:
      return new DatabaseError(
        "received invalid response: " + code.toString(16),
        length,
        "error"
      );
  }
};
parseReadyForQueryMessage_fn = function(offset, length, bytes) {
  __privateGet(this, _reader).setBuffer(offset, bytes);
  const status = __privateGet(this, _reader).string(1);
  return new ReadyForQueryMessage(length, status);
};
parseCommandCompleteMessage_fn = function(offset, length, bytes) {
  __privateGet(this, _reader).setBuffer(offset, bytes);
  const text = __privateGet(this, _reader).cstring();
  return new CommandCompleteMessage(length, text);
};
parseCopyData_fn = function(offset, length, bytes) {
  const chunk = bytes.slice(offset, offset + (length - 4));
  return new CopyDataMessage(length, new Uint8Array(chunk));
};
parseCopyInMessage_fn = function(offset, length, bytes) {
  return __privateMethod(this, _Parser_instances, parseCopyMessage_fn).call(this, offset, length, bytes, "copyInResponse");
};
parseCopyOutMessage_fn = function(offset, length, bytes) {
  return __privateMethod(this, _Parser_instances, parseCopyMessage_fn).call(this, offset, length, bytes, "copyOutResponse");
};
parseCopyMessage_fn = function(offset, length, bytes, messageName) {
  __privateGet(this, _reader).setBuffer(offset, bytes);
  const isBinary = __privateGet(this, _reader).byte() !== 0;
  const columnCount = __privateGet(this, _reader).int16();
  const message = new CopyResponse(length, messageName, isBinary, columnCount);
  for (let i = 0; i < columnCount; i++) {
    message.columnTypes[i] = __privateGet(this, _reader).int16();
  }
  return message;
};
parseNotificationMessage_fn = function(offset, length, bytes) {
  __privateGet(this, _reader).setBuffer(offset, bytes);
  const processId = __privateGet(this, _reader).int32();
  const channel = __privateGet(this, _reader).cstring();
  const payload = __privateGet(this, _reader).cstring();
  return new NotificationResponseMessage(length, processId, channel, payload);
};
parseRowDescriptionMessage_fn = function(offset, length, bytes) {
  __privateGet(this, _reader).setBuffer(offset, bytes);
  const fieldCount = __privateGet(this, _reader).int16();
  const message = new RowDescriptionMessage(length, fieldCount);
  for (let i = 0; i < fieldCount; i++) {
    message.fields[i] = __privateMethod(this, _Parser_instances, parseField_fn).call(this);
  }
  return message;
};
parseField_fn = function() {
  const name = __privateGet(this, _reader).cstring();
  const tableID = __privateGet(this, _reader).int32();
  const columnID = __privateGet(this, _reader).int16();
  const dataTypeID = __privateGet(this, _reader).int32();
  const dataTypeSize = __privateGet(this, _reader).int16();
  const dataTypeModifier = __privateGet(this, _reader).int32();
  const mode = __privateGet(this, _reader).int16() === 0 ? Modes.text : Modes.binary;
  return new Field(
    name,
    tableID,
    columnID,
    dataTypeID,
    dataTypeSize,
    dataTypeModifier,
    mode
  );
};
parseParameterDescriptionMessage_fn = function(offset, length, bytes) {
  __privateGet(this, _reader).setBuffer(offset, bytes);
  const parameterCount = __privateGet(this, _reader).int16();
  const message = new ParameterDescriptionMessage(length, parameterCount);
  for (let i = 0; i < parameterCount; i++) {
    message.dataTypeIDs[i] = __privateGet(this, _reader).int32();
  }
  return message;
};
parseDataRowMessage_fn = function(offset, length, bytes) {
  __privateGet(this, _reader).setBuffer(offset, bytes);
  const fieldCount = __privateGet(this, _reader).int16();
  const fields = new Array(fieldCount);
  for (let i = 0; i < fieldCount; i++) {
    const len = __privateGet(this, _reader).int32();
    fields[i] = len === -1 ? null : __privateGet(this, _reader).string(len);
  }
  return new DataRowMessage(length, fields);
};
parseParameterStatusMessage_fn = function(offset, length, bytes) {
  __privateGet(this, _reader).setBuffer(offset, bytes);
  const name = __privateGet(this, _reader).cstring();
  const value = __privateGet(this, _reader).cstring();
  return new ParameterStatusMessage(length, name, value);
};
parseBackendKeyData_fn = function(offset, length, bytes) {
  __privateGet(this, _reader).setBuffer(offset, bytes);
  const processID = __privateGet(this, _reader).int32();
  const secretKey = __privateGet(this, _reader).int32();
  return new BackendKeyDataMessage(length, processID, secretKey);
};
parseAuthenticationResponse_fn = function(offset, length, bytes) {
  __privateGet(this, _reader).setBuffer(offset, bytes);
  const code = __privateGet(this, _reader).int32();
  switch (code) {
    case 0:
      return new AuthenticationOk(length);
    case 3:
      return new AuthenticationCleartextPassword(length);
    case 5:
      return new AuthenticationMD5Password(length, __privateGet(this, _reader).bytes(4));
    case 10: {
      const mechanisms = [];
      while (true) {
        const mechanism = __privateGet(this, _reader).cstring();
        if (mechanism.length === 0) {
          return new AuthenticationSASL(length, mechanisms);
        }
        mechanisms.push(mechanism);
      }
    }
    case 11:
      return new AuthenticationSASLContinue(
        length,
        __privateGet(this, _reader).string(length - 8)
      );
    case 12:
      return new AuthenticationSASLFinal(
        length,
        __privateGet(this, _reader).string(length - 8)
      );
    default:
      throw new Error("Unknown authenticationOk message type " + code);
  }
};
parseErrorMessage_fn = function(offset, length, bytes, name) {
  __privateGet(this, _reader).setBuffer(offset, bytes);
  const fields = {};
  let fieldType = __privateGet(this, _reader).string(1);
  while (fieldType !== "\0") {
    fields[fieldType] = __privateGet(this, _reader).cstring();
    fieldType = __privateGet(this, _reader).string(1);
  }
  const messageValue = fields.M;
  const message = name === "notice" ? new NoticeMessage(length, messageValue) : new DatabaseError(messageValue, length, name);
  message.severity = fields.S;
  message.code = fields.C;
  message.detail = fields.D;
  message.hint = fields.H;
  message.position = fields.P;
  message.internalPosition = fields.p;
  message.internalQuery = fields.q;
  message.where = fields.W;
  message.schema = fields.s;
  message.table = fields.t;
  message.column = fields.c;
  message.dataType = fields.d;
  message.constraint = fields.n;
  message.file = fields.F;
  message.line = fields.L;
  message.routine = fields.R;
  return message;
};

// src/types.ts
var types_exports = {};
__export(types_exports, {
  ABSTIME: () => ABSTIME,
  ACLITEM: () => ACLITEM,
  BIT: () => BIT,
  BOOL: () => BOOL,
  BPCHAR: () => BPCHAR,
  BYTEA: () => BYTEA,
  CHAR: () => CHAR,
  CID: () => CID,
  CIDR: () => CIDR,
  CIRCLE: () => CIRCLE,
  DATE: () => DATE,
  FLOAT4: () => FLOAT4,
  FLOAT8: () => FLOAT8,
  GTSVECTOR: () => GTSVECTOR,
  INET: () => INET,
  INT2: () => INT2,
  INT4: () => INT4,
  INT8: () => INT8,
  INTERVAL: () => INTERVAL,
  JSON: () => JSON,
  JSONB: () => JSONB,
  MACADDR: () => MACADDR,
  MACADDR8: () => MACADDR8,
  MONEY: () => MONEY,
  NUMERIC: () => NUMERIC,
  OID: () => OID,
  PATH: () => PATH,
  PG_DEPENDENCIES: () => PG_DEPENDENCIES,
  PG_LSN: () => PG_LSN,
  PG_NDISTINCT: () => PG_NDISTINCT,
  PG_NODE_TREE: () => PG_NODE_TREE,
  POLYGON: () => POLYGON,
  REFCURSOR: () => REFCURSOR,
  REGCLASS: () => REGCLASS,
  REGCONFIG: () => REGCONFIG,
  REGDICTIONARY: () => REGDICTIONARY,
  REGNAMESPACE: () => REGNAMESPACE,
  REGOPER: () => REGOPER,
  REGOPERATOR: () => REGOPERATOR,
  REGPROC: () => REGPROC,
  REGPROCEDURE: () => REGPROCEDURE,
  REGROLE: () => REGROLE,
  REGTYPE: () => REGTYPE,
  RELTIME: () => RELTIME,
  SMGR: () => SMGR,
  TEXT: () => TEXT,
  TID: () => TID,
  TIME: () => TIME,
  TIMESTAMP: () => TIMESTAMP,
  TIMESTAMPTZ: () => TIMESTAMPTZ,
  TIMETZ: () => TIMETZ,
  TINTERVAL: () => TINTERVAL,
  TSQUERY: () => TSQUERY,
  TSVECTOR: () => TSVECTOR,
  TXID_SNAPSHOT: () => TXID_SNAPSHOT,
  UUID: () => UUID,
  VARBIT: () => VARBIT,
  VARCHAR: () => VARCHAR,
  XID: () => XID,
  XML: () => XML,
  arrayParser: () => arrayParser,
  arraySerializer: () => arraySerializer,
  parseType: () => parseType,
  parsers: () => parsers,
  serializers: () => serializers,
  types: () => types
});
init_esm_shims();
var JSON_parse = globalThis.JSON.parse;
var JSON_stringify = globalThis.JSON.stringify;
var BOOL = 16;
var BYTEA = 17;
var CHAR = 18;
var INT8 = 20;
var INT2 = 21;
var INT4 = 23;
var REGPROC = 24;
var TEXT = 25;
var OID = 26;
var TID = 27;
var XID = 28;
var CID = 29;
var JSON = 114;
var XML = 142;
var PG_NODE_TREE = 194;
var SMGR = 210;
var PATH = 602;
var POLYGON = 604;
var CIDR = 650;
var FLOAT4 = 700;
var FLOAT8 = 701;
var ABSTIME = 702;
var RELTIME = 703;
var TINTERVAL = 704;
var CIRCLE = 718;
var MACADDR8 = 774;
var MONEY = 790;
var MACADDR = 829;
var INET = 869;
var ACLITEM = 1033;
var BPCHAR = 1042;
var VARCHAR = 1043;
var DATE = 1082;
var TIME = 1083;
var TIMESTAMP = 1114;
var TIMESTAMPTZ = 1184;
var INTERVAL = 1186;
var TIMETZ = 1266;
var BIT = 1560;
var VARBIT = 1562;
var NUMERIC = 1700;
var REFCURSOR = 1790;
var REGPROCEDURE = 2202;
var REGOPER = 2203;
var REGOPERATOR = 2204;
var REGCLASS = 2205;
var REGTYPE = 2206;
var UUID = 2950;
var TXID_SNAPSHOT = 2970;
var PG_LSN = 3220;
var PG_NDISTINCT = 3361;
var PG_DEPENDENCIES = 3402;
var TSVECTOR = 3614;
var TSQUERY = 3615;
var GTSVECTOR = 3642;
var REGCONFIG = 3734;
var REGDICTIONARY = 3769;
var JSONB = 3802;
var REGNAMESPACE = 4089;
var REGROLE = 4096;
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
var parse_exports = {};
__export(parse_exports, {
  parseDescribeStatementResults: () => parseDescribeStatementResults,
  parseResults: () => parseResults
});
init_esm_shims();
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

// src/utils.ts
init_esm_shims();
var IN_NODE = typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node === "string";
var wasmDownloadPromise;
async function startWasmDownload() {
  if (IN_NODE || wasmDownloadPromise) {
    return;
  }
  const moduleUrl = new URL("../release/postgres.wasm", import.meta.url);
  wasmDownloadPromise = fetch(moduleUrl);
}
var cachedWasmModule;
async function instantiateWasm(imports, module) {
  if (module || cachedWasmModule) {
    WebAssembly.instantiate(module || cachedWasmModule, imports);
    return {
      instance: await WebAssembly.instantiate(
        module || cachedWasmModule,
        imports
      ),
      module: module || cachedWasmModule
    };
  }
  const moduleUrl = new URL("../release/postgres.wasm", import.meta.url);
  if (IN_NODE) {
    const fs = await import("fs/promises");
    const buffer = await fs.readFile(moduleUrl);
    const { module: newModule, instance } = await WebAssembly.instantiate(
      buffer,
      imports
    );
    cachedWasmModule = newModule;
    return {
      instance,
      module: newModule
    };
  } else {
    if (!wasmDownloadPromise) {
      wasmDownloadPromise = fetch(moduleUrl);
    }
    const response = await wasmDownloadPromise;
    const { module: newModule, instance } = await WebAssembly.instantiateStreaming(response, imports);
    cachedWasmModule = newModule;
    return {
      instance,
      module: newModule
    };
  }
}
async function getFsBundle() {
  const fsBundleUrl = new URL("../release/postgres.data", import.meta.url);
  if (IN_NODE) {
    const fs = await import("fs/promises");
    const fileData = await fs.readFile(fsBundleUrl);
    return fileData.buffer;
  } else {
    const response = await fetch(fsBundleUrl);
    return response.arrayBuffer();
  }
}
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

export {
  serialize,
  DatabaseError,
  NotificationResponseMessage,
  CommandCompleteMessage,
  NoticeMessage,
  messages_exports,
  Parser,
  src_exports,
  parsers,
  serializers,
  arraySerializer,
  arrayParser,
  types_exports,
  parseResults,
  parseDescribeStatementResults,
  parse_exports,
  IN_NODE,
  startWasmDownload,
  instantiateWasm,
  getFsBundle,
  uuid,
  formatQuery
};
//# sourceMappingURL=chunk-WZKBFYLQ.js.map
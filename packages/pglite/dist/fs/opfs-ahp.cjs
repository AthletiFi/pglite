"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// ../../node_modules/.pnpm/tsup@8.3.0_@microsoft+api-extractor@7.47.7_@types+node@20.16.11__postcss@8.4.47_tsx@4.19.1_typescript@5.6.3/node_modules/tsup/assets/cjs_shims.js
var init_cjs_shims = __esm({
  "../../node_modules/.pnpm/tsup@8.3.0_@microsoft+api-extractor@7.47.7_@types+node@20.16.11__postcss@8.4.47_tsx@4.19.1_typescript@5.6.3/node_modules/tsup/assets/cjs_shims.js"() {
    "use strict";
  }
});

// ../../node_modules/.pnpm/tinytar@0.1.0/node_modules/tinytar/lib/utils.js
var require_utils = __commonJS({
  "../../node_modules/.pnpm/tinytar@0.1.0/node_modules/tinytar/lib/utils.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var MAX_SAFE_INTEGER = 9007199254740991;
    var undefined2 = /* @__PURE__ */ function(undefined3) {
      return undefined3;
    }();
    function isUndefined(value) {
      return value === undefined2;
    }
    function isString(value) {
      return typeof value == "string" || Object.prototype.toString.call(value) == "[object String]";
    }
    function isDateTime(value) {
      return Object.prototype.toString.call(value) == "[object Date]";
    }
    function isObject(value) {
      return value !== null && typeof value == "object";
    }
    function isFunction(value) {
      return typeof value == "function";
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isArray(value) {
      return Object.prototype.toString.call(value) == "[object Array]";
    }
    function isArrayLike(value) {
      return isObject(value) && !isFunction(value) && isLength(value.length);
    }
    function isArrayBuffer(value) {
      return Object.prototype.toString.call(value) == "[object ArrayBuffer]";
    }
    function map(array, iteratee) {
      return Array.prototype.map.call(array, iteratee);
    }
    function find(array, iteratee) {
      var result = undefined2;
      if (isFunction(iteratee)) {
        Array.prototype.every.call(array, function(item, index, array2) {
          var found = iteratee(item, index, array2);
          if (found) {
            result = item;
          }
          return !found;
        });
      }
      return result;
    }
    function extend(target) {
      return Object.assign.apply(null, arguments);
    }
    function toUint8Array(value) {
      var i;
      var length;
      var result;
      if (isString(value)) {
        length = value.length;
        result = new Uint8Array(length);
        for (i = 0; i < length; i++) {
          result[i] = value.charCodeAt(i) & 255;
        }
        return result;
      }
      if (isArrayBuffer(value)) {
        return new Uint8Array(value);
      }
      if (isObject(value) && isArrayBuffer(value.buffer)) {
        return new Uint8Array(value.buffer);
      }
      if (isArrayLike(value)) {
        return new Uint8Array(value);
      }
      if (isObject(value) && isFunction(value.toString)) {
        return toUint8Array(value.toString());
      }
      return new Uint8Array();
    }
    module2.exports.MAX_SAFE_INTEGER = MAX_SAFE_INTEGER;
    module2.exports.isUndefined = isUndefined;
    module2.exports.isString = isString;
    module2.exports.isObject = isObject;
    module2.exports.isDateTime = isDateTime;
    module2.exports.isFunction = isFunction;
    module2.exports.isArray = isArray;
    module2.exports.isArrayLike = isArrayLike;
    module2.exports.isArrayBuffer = isArrayBuffer;
    module2.exports.map = map;
    module2.exports.find = find;
    module2.exports.extend = extend;
    module2.exports.toUint8Array = toUint8Array;
  }
});

// ../../node_modules/.pnpm/tinytar@0.1.0/node_modules/tinytar/lib/constants.js
var require_constants = __commonJS({
  "../../node_modules/.pnpm/tinytar@0.1.0/node_modules/tinytar/lib/constants.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var NULL_CHAR = "\0";
    module2.exports = {
      /* eslint-disable key-spacing */
      NULL_CHAR,
      TMAGIC: "ustar" + NULL_CHAR + "00",
      // 'ustar', NULL, '00'
      OLDGNU_MAGIC: "ustar  " + NULL_CHAR,
      // 'ustar  ', NULL
      // Values used in typeflag field.
      REGTYPE: 0,
      // regular file
      LNKTYPE: 1,
      // link
      SYMTYPE: 2,
      // reserved
      CHRTYPE: 3,
      // character special
      BLKTYPE: 4,
      // block special
      DIRTYPE: 5,
      // directory
      FIFOTYPE: 6,
      // FIFO special
      CONTTYPE: 7,
      // reserved
      // Bits used in the mode field, values in octal.
      TSUID: parseInt("4000", 8),
      // set UID on execution
      TSGID: parseInt("2000", 8),
      // set GID on execution
      TSVTX: parseInt("1000", 8),
      // reserved
      // file permissions
      TUREAD: parseInt("0400", 8),
      // read by owner
      TUWRITE: parseInt("0200", 8),
      // write by owner
      TUEXEC: parseInt("0100", 8),
      // execute/search by owner
      TGREAD: parseInt("0040", 8),
      // read by group
      TGWRITE: parseInt("0020", 8),
      // write by group
      TGEXEC: parseInt("0010", 8),
      // execute/search by group
      TOREAD: parseInt("0004", 8),
      // read by other
      TOWRITE: parseInt("0002", 8),
      // write by other
      TOEXEC: parseInt("0001", 8),
      // execute/search by other
      TPERMALL: parseInt("0777", 8),
      // rwxrwxrwx
      TPERMMASK: parseInt("0777", 8)
      // permissions bitmask
      /* eslint-enable key-spacing */
    };
  }
});

// ../../node_modules/.pnpm/tinytar@0.1.0/node_modules/tinytar/lib/types.js
var require_types = __commonJS({
  "../../node_modules/.pnpm/tinytar@0.1.0/node_modules/tinytar/lib/types.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var utils = require_utils();
    var constants = require_constants();
    var recordSize = 512;
    var defaultFileMode = constants.TPERMALL;
    var defaultUid = 0;
    var defaultGid = 0;
    var posixHeader = [
      // <field name>, <size>, <offset>, <used>, <format>, <parse>, [ <check> ]
      ["name", 100, 0, function(file, field) {
        return formatTarString(file[field[0]], field[1]);
      }, function(buffer, offset, field) {
        return parseTarString(buffer.slice(offset, offset + field[1]));
      }],
      ["mode", 8, 100, function(file, field) {
        var mode = file[field[0]] || defaultFileMode;
        mode = mode & constants.TPERMMASK;
        return formatTarNumber(mode, field[1], defaultFileMode);
      }, function(buffer, offset, field) {
        var result = parseTarNumber(buffer.slice(offset, offset + field[1]));
        result &= constants.TPERMMASK;
        return result;
      }],
      ["uid", 8, 108, function(file, field) {
        return formatTarNumber(file[field[0]], field[1], defaultUid);
      }, function(buffer, offset, field) {
        return parseTarNumber(buffer.slice(offset, offset + field[1]));
      }],
      ["gid", 8, 116, function(file, field) {
        return formatTarNumber(file[field[0]], field[1], defaultGid);
      }, function(buffer, offset, field) {
        return parseTarNumber(buffer.slice(offset, offset + field[1]));
      }],
      ["size", 12, 124, function(file, field) {
        return formatTarNumber(file.data.length, field[1]);
      }, function(buffer, offset, field) {
        return parseTarNumber(buffer.slice(offset, offset + field[1]));
      }],
      ["modifyTime", 12, 136, function(file, field) {
        return formatTarDateTime(file[field[0]], field[1]);
      }, function(buffer, offset, field) {
        return parseTarDateTime(buffer.slice(offset, offset + field[1]));
      }],
      ["checksum", 8, 148, function(file, field) {
        return "        ";
      }, function(buffer, offset, field) {
        return parseTarNumber(buffer.slice(offset, offset + field[1]));
      }],
      ["type", 1, 156, function(file, field) {
        return "" + (parseInt(file[field[0]], 10) || 0) % 8;
      }, function(buffer, offset, field) {
        return (parseInt(String.fromCharCode(buffer[offset]), 10) || 0) % 8;
      }],
      ["linkName", 100, 157, function(file, field) {
        return "";
      }, function(buffer, offset, field) {
        return parseTarString(buffer.slice(offset, offset + field[1]));
      }],
      ["ustar", 8, 257, function(file, field) {
        return constants.TMAGIC;
      }, function(buffer, offset, field) {
        return fixUstarMagic(
          parseTarString(buffer.slice(offset, offset + field[1]), true)
        );
      }, function(file, field) {
        return file[field[0]] == constants.TMAGIC || file[field[0]] == constants.OLDGNU_MAGIC;
      }],
      ["owner", 32, 265, function(file, field) {
        return formatTarString(file[field[0]], field[1]);
      }, function(buffer, offset, field) {
        return parseTarString(buffer.slice(offset, offset + field[1]));
      }],
      ["group", 32, 297, function(file, field) {
        return formatTarString(file[field[0]], field[1]);
      }, function(buffer, offset, field) {
        return parseTarString(buffer.slice(offset, offset + field[1]));
      }],
      ["majorNumber", 8, 329, function(file, field) {
        return "";
      }, function(buffer, offset, field) {
        return parseTarNumber(buffer.slice(offset, offset + field[1]));
      }],
      ["minorNumber", 8, 337, function(file, field) {
        return "";
      }, function(buffer, offset, field) {
        return parseTarNumber(buffer.slice(offset, offset + field[1]));
      }],
      ["prefix", 131, 345, function(file, field) {
        return formatTarString(file[field[0]], field[1]);
      }, function(buffer, offset, field) {
        return parseTarString(buffer.slice(offset, offset + field[1]));
      }],
      ["accessTime", 12, 476, function(file, field) {
        return formatTarDateTime(file[field[0]], field[1]);
      }, function(buffer, offset, field) {
        return parseTarDateTime(buffer.slice(offset, offset + field[1]));
      }],
      ["createTime", 12, 488, function(file, field) {
        return formatTarDateTime(file[field[0]], field[1]);
      }, function(buffer, offset, field) {
        return parseTarDateTime(buffer.slice(offset, offset + field[1]));
      }]
    ];
    var effectiveHeaderSize = function(header) {
      var last = header[header.length - 1];
      return last[2] + last[1];
    }(posixHeader);
    function fixUstarMagic(value) {
      if (value.length == 8) {
        var chars = value.split("");
        if (chars[5] == constants.NULL_CHAR) {
          if (chars[6] == " " || chars[6] == constants.NULL_CHAR) {
            chars[6] = "0";
          }
          if (chars[7] == " " || chars[7] == constants.NULL_CHAR) {
            chars[7] = "0";
          }
          chars = chars.join("");
          return chars == constants.TMAGIC ? chars : value;
        } else if (chars[7] == constants.NULL_CHAR) {
          if (chars[5] == constants.NULL_CHAR) {
            chars[5] = " ";
          }
          if (chars[6] == constants.NULL_CHAR) {
            chars[6] = " ";
          }
          return chars == constants.OLDGNU_MAGIC ? chars : value;
        }
      }
      return value;
    }
    function formatTarString(value, length) {
      length -= 1;
      if (utils.isUndefined(value)) {
        value = "";
      }
      value = ("" + value).substr(0, length);
      return value + constants.NULL_CHAR;
    }
    function formatTarNumber(value, length, defaultValue) {
      defaultValue = parseInt(defaultValue) || 0;
      length -= 1;
      value = (parseInt(value) || defaultValue).toString(8).substr(-length, length);
      while (value.length < length) {
        value = "0" + value;
      }
      return value + constants.NULL_CHAR;
    }
    function formatTarDateTime(value, length) {
      if (utils.isDateTime(value)) {
        value = Math.floor(1 * value / 1e3);
      } else {
        value = parseInt(value, 10);
        if (isFinite(value)) {
          if (value <= 0) {
            return "";
          }
        } else {
          value = Math.floor(1 * /* @__PURE__ */ new Date() / 1e3);
        }
      }
      return formatTarNumber(value, length, 0);
    }
    function parseTarString(bytes, returnUnprocessed) {
      var result = String.fromCharCode.apply(null, bytes);
      if (returnUnprocessed) {
        return result;
      }
      var index = result.indexOf(constants.NULL_CHAR);
      return index >= 0 ? result.substr(0, index) : result;
    }
    function parseTarNumber(bytes) {
      var result = String.fromCharCode.apply(null, bytes);
      return parseInt(result.replace(/^0+$/g, ""), 8) || 0;
    }
    function parseTarDateTime(bytes) {
      if (bytes.length == 0 || bytes[0] == 0) {
        return null;
      }
      return new Date(1e3 * parseTarNumber(bytes));
    }
    function calculateChecksum(buffer, offset, skipChecksum) {
      var from = parseInt(offset, 10) || 0;
      var to = Math.min(from + effectiveHeaderSize, buffer.length);
      var result = 0;
      var skipFrom = 0;
      var skipTo = 0;
      if (skipChecksum) {
        posixHeader.every(function(field) {
          if (field[0] == "checksum") {
            skipFrom = from + field[2];
            skipTo = skipFrom + field[1];
            return false;
          }
          return true;
        });
      }
      var whitespace = " ".charCodeAt(0);
      for (var i = from; i < to; i++) {
        var byte = i >= skipFrom && i < skipTo ? whitespace : buffer[i];
        result = (result + byte) % 262144;
      }
      return result;
    }
    module2.exports.recordSize = recordSize;
    module2.exports.defaultFileMode = defaultFileMode;
    module2.exports.defaultUid = defaultUid;
    module2.exports.defaultGid = defaultGid;
    module2.exports.posixHeader = posixHeader;
    module2.exports.effectiveHeaderSize = effectiveHeaderSize;
    module2.exports.calculateChecksum = calculateChecksum;
    module2.exports.formatTarString = formatTarString;
    module2.exports.formatTarNumber = formatTarNumber;
    module2.exports.formatTarDateTime = formatTarDateTime;
    module2.exports.parseTarString = parseTarString;
    module2.exports.parseTarNumber = parseTarNumber;
    module2.exports.parseTarDateTime = parseTarDateTime;
  }
});

// ../../node_modules/.pnpm/tinytar@0.1.0/node_modules/tinytar/lib/tar.js
var require_tar = __commonJS({
  "../../node_modules/.pnpm/tinytar@0.1.0/node_modules/tinytar/lib/tar.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var constants = require_constants();
    var utils = require_utils();
    var types = require_types();
    function headerSize(file) {
      return types.recordSize;
    }
    function dataSize(file) {
      return Math.ceil(file.data.length / types.recordSize) * types.recordSize;
    }
    function allocateBuffer(files) {
      var totalSize = 0;
      files.forEach(function(file) {
        totalSize += headerSize(file) + dataSize(file);
      });
      totalSize += types.recordSize * 2;
      return new Uint8Array(totalSize);
    }
    function writeHeader(buffer, file, offset) {
      offset = parseInt(offset) || 0;
      var currentOffset = offset;
      types.posixHeader.forEach(function(field2) {
        var value2 = field2[3](file, field2);
        var length = value2.length;
        for (var i2 = 0; i2 < length; i2 += 1) {
          buffer[currentOffset + i2] = value2.charCodeAt(i2) & 255;
        }
        currentOffset += field2[1];
      });
      var field = utils.find(types.posixHeader, function(field2) {
        return field2[0] == "checksum";
      });
      if (field) {
        var checksum = types.calculateChecksum(buffer, offset, true);
        var value = types.formatTarNumber(checksum, field[1] - 2) + constants.NULL_CHAR + " ";
        currentOffset = offset + field[2];
        for (var i = 0; i < value.length; i += 1) {
          buffer[currentOffset] = value.charCodeAt(i) & 255;
          currentOffset++;
        }
      }
      return offset + headerSize(file);
    }
    function writeData(buffer, file, offset) {
      offset = parseInt(offset, 10) || 0;
      buffer.set(file.data, offset);
      return offset + dataSize(file);
    }
    function tar2(files) {
      files = utils.map(files, function(file) {
        return utils.extend({}, file, {
          data: utils.toUint8Array(file.data)
        });
      });
      var buffer = allocateBuffer(files);
      var offset = 0;
      files.forEach(function(file) {
        offset = writeHeader(buffer, file, offset);
        offset = writeData(buffer, file, offset);
      });
      return buffer;
    }
    module2.exports.tar = tar2;
  }
});

// ../../node_modules/.pnpm/tinytar@0.1.0/node_modules/tinytar/lib/untar.js
var require_untar = __commonJS({
  "../../node_modules/.pnpm/tinytar@0.1.0/node_modules/tinytar/lib/untar.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var constants = require_constants();
    var utils = require_utils();
    var types = require_types();
    var defaultOptions = {
      extractData: true,
      checkHeader: true,
      checkChecksum: true,
      checkFileSize: true
    };
    var excludeFields = {
      size: true,
      checksum: true,
      ustar: true
    };
    var messages = {
      unexpectedEndOfFile: "Unexpected end of file.",
      fileCorrupted: "File is corrupted.",
      checksumCheckFailed: "Checksum check failed."
    };
    function headerSize(header) {
      return types.recordSize;
    }
    function dataSize(size) {
      return Math.ceil(size / types.recordSize) * types.recordSize;
    }
    function isEndOfFile(buffer, offset) {
      var from = offset;
      var to = Math.min(buffer.length, offset + types.recordSize * 2);
      for (var i = from; i < to; i++) {
        if (buffer[i] != 0) {
          return false;
        }
      }
      return true;
    }
    function readHeader(buffer, offset, options) {
      if (buffer.length - offset < types.recordSize) {
        if (options.checkFileSize) {
          throw new Error(messages.unexpectedEndOfFile);
        }
        return null;
      }
      offset = parseInt(offset) || 0;
      var result = {};
      var currentOffset = offset;
      types.posixHeader.forEach(function(field) {
        result[field[0]] = field[4](buffer, currentOffset, field);
        currentOffset += field[1];
      });
      if (result.type != 0) {
        result.size = 0;
      }
      if (options.checkHeader) {
        types.posixHeader.forEach(function(field) {
          if (utils.isFunction(field[5]) && !field[5](result, field)) {
            var error2 = new Error(messages.fileCorrupted);
            error2.data = {
              offset: offset + field[2],
              field: field[0]
            };
            throw error2;
          }
        });
      }
      if (options.checkChecksum) {
        var checksum = types.calculateChecksum(buffer, offset, true);
        if (checksum != result.checksum) {
          var error = new Error(messages.checksumCheckFailed);
          error.data = {
            offset,
            header: result,
            checksum
          };
          throw error;
        }
      }
      return result;
    }
    function readData(buffer, offset, header, options) {
      if (!options.extractData) {
        return null;
      }
      if (header.size <= 0) {
        return new Uint8Array();
      }
      return buffer.slice(offset, offset + header.size);
    }
    function createFile(header, data) {
      var result = {};
      types.posixHeader.forEach(function(field) {
        var name = field[0];
        if (!excludeFields[name]) {
          result[name] = header[name];
        }
      });
      result.isOldGNUFormat = header.ustar == constants.OLDGNU_MAGIC;
      if (data) {
        result.data = data;
      }
      return result;
    }
    function untar2(buffer, options) {
      options = utils.extend({}, defaultOptions, options);
      var result = [];
      var offset = 0;
      var size = buffer.length;
      while (size - offset >= types.recordSize) {
        buffer = utils.toUint8Array(buffer);
        var header = readHeader(buffer, offset, options);
        if (!header) {
          break;
        }
        offset += headerSize(header);
        var data = readData(buffer, offset, header, options);
        result.push(createFile(header, data));
        offset += dataSize(header.size);
        if (isEndOfFile(buffer, offset)) {
          break;
        }
      }
      return result;
    }
    module2.exports.untar = untar2;
  }
});

// ../../node_modules/.pnpm/tinytar@0.1.0/node_modules/tinytar/index.js
var require_tinytar = __commonJS({
  "../../node_modules/.pnpm/tinytar@0.1.0/node_modules/tinytar/index.js"(exports2, module2) {
    "use strict";
    init_cjs_shims();
    var utils = require_utils();
    var constants = require_constants();
    var tar2 = require_tar();
    var untar2 = require_untar();
    utils.extend(module2.exports, tar2, untar2, constants);
  }
});

// src/fs/opfs-ahp.ts
var opfs_ahp_exports = {};
__export(opfs_ahp_exports, {
  OpfsAhpFS: () => OpfsAhpFS
});
module.exports = __toCommonJS(opfs_ahp_exports);
init_cjs_shims();

// src/fs/base.ts
init_cjs_shims();

// src/fs/tarUtils.ts
init_cjs_shims();
var import_tinytar = __toESM(require_tinytar(), 1);
async function dumpTar(FS, pgDataDir, dbname = "pgdata", compression = "auto") {
  const tarball = createTarball(FS, pgDataDir);
  const [compressed, zipped] = await maybeZip(tarball, compression);
  const filename = dbname + (zipped ? ".tar.gz" : ".tar");
  const type = zipped ? "application/x-gzip" : "application/x-tar";
  if (typeof File !== "undefined") {
    return new File([compressed], filename, {
      type
    });
  } else {
    return new Blob([compressed], {
      type
    });
  }
}
function readDirectory(FS, path) {
  const files = [];
  const traverseDirectory = (currentPath) => {
    const entries = FS.readdir(currentPath);
    entries.forEach((entry) => {
      if (entry === "." || entry === "..") {
        return;
      }
      const fullPath = currentPath + "/" + entry;
      const stats = FS.stat(fullPath);
      const data = FS.isFile(stats.mode) ? FS.readFile(fullPath, { encoding: "binary" }) : new Uint8Array(0);
      files.push({
        name: fullPath.substring(path.length),
        // remove the root path
        mode: stats.mode,
        size: stats.size,
        type: FS.isFile(stats.mode) ? import_tinytar.REGTYPE : import_tinytar.DIRTYPE,
        modifyTime: stats.mtime,
        data
      });
      if (FS.isDir(stats.mode)) {
        traverseDirectory(fullPath);
      }
    });
  };
  traverseDirectory(path);
  return files;
}
function createTarball(FS, directoryPath) {
  const files = readDirectory(FS, directoryPath);
  const tarball = (0, import_tinytar.tar)(files);
  return tarball;
}
async function maybeZip(file, compression = "auto") {
  if (compression === "none") {
    return [file, false];
  } else if (typeof CompressionStream !== "undefined") {
    return [await zipBrowser(file), true];
  } else if (typeof process !== "undefined" && process.versions && process.versions.node) {
    return [await zipNode(file), true];
  } else if (compression === "auto") {
    return [file, false];
  } else {
    throw new Error("Compression not supported in this environment");
  }
}
async function zipBrowser(file) {
  const cs = new CompressionStream("gzip");
  const writer = cs.writable.getWriter();
  const reader = cs.readable.getReader();
  writer.write(file);
  writer.close();
  const chunks = [];
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }
  const compressed = new Uint8Array(
    chunks.reduce((acc, chunk) => acc + chunk.length, 0)
  );
  let offset = 0;
  chunks.forEach((chunk) => {
    compressed.set(chunk, offset);
    offset += chunk.length;
  });
  return compressed;
}
async function zipNode(file) {
  const { promisify } = await import("util");
  const { gzip } = await import("zlib");
  const gzipPromise = promisify(gzip);
  return await gzipPromise(file);
}

// src/fs/base.ts
var WASM_PREFIX = "/tmp/pglite";
var PGDATA = WASM_PREFIX + "/base";
var BaseFilesystem = class {
  constructor(dataDir, { debug = false } = {}) {
    this.dataDir = dataDir;
    this.debug = debug;
  }
  async syncToFs(_relaxedDurability) {
  }
  async initialSyncFs() {
  }
  async closeFs() {
  }
  async dumpTar(dbname, compression) {
    return dumpTar(this.pg.Module.FS, PGDATA, dbname, compression);
  }
  async init(pg, emscriptenOptions) {
    this.pg = pg;
    const options = {
      ...emscriptenOptions,
      preRun: [
        ...emscriptenOptions.preRun || [],
        (mod) => {
          const EMFS = createEmscriptenFS(mod, this);
          mod.FS.mkdir(PGDATA);
          mod.FS.mount(EMFS, {}, PGDATA);
        }
      ]
    };
    return { emscriptenOpts: options };
  }
};
var ERRNO_CODES = {
  EBADF: 8,
  EBADFD: 127,
  EEXIST: 20,
  EINVAL: 28,
  EISDIR: 31,
  ENODEV: 43,
  ENOENT: 44,
  ENOTDIR: 54,
  ENOTEMPTY: 55
};
var createEmscriptenFS = (Module, baseFS) => {
  const FS = Module.FS;
  const log = baseFS.debug ? console.log : null;
  const EMFS = {
    tryFSOperation(f) {
      try {
        return f();
      } catch (e) {
        if (!e.code) throw e;
        if (e.code === "UNKNOWN") throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        throw new FS.ErrnoError(e.code);
      }
    },
    mount(_mount) {
      return EMFS.createNode(null, "/", 16384 | 511, 0);
    },
    syncfs(_mount, _populate, _done) {
    },
    createNode(parent, name, mode, _dev) {
      if (!FS.isDir(mode) && !FS.isFile(mode)) {
        throw new FS.ErrnoError(28);
      }
      const node = FS.createNode(parent, name, mode);
      node.node_ops = EMFS.node_ops;
      node.stream_ops = EMFS.stream_ops;
      return node;
    },
    getMode: function(path) {
      log?.("getMode", path);
      return EMFS.tryFSOperation(() => {
        const stats = baseFS.lstat(path);
        return stats.mode;
      });
    },
    realPath: function(node) {
      const parts = [];
      while (node.parent !== node) {
        parts.push(node.name);
        node = node.parent;
      }
      parts.push(node.mount.opts.root);
      parts.reverse();
      return parts.join("/");
    },
    node_ops: {
      getattr(node) {
        log?.("getattr", EMFS.realPath(node));
        const path = EMFS.realPath(node);
        return EMFS.tryFSOperation(() => {
          const stats = baseFS.lstat(path);
          return {
            ...stats,
            dev: 0,
            ino: node.id,
            nlink: 1,
            rdev: node.rdev,
            atime: new Date(stats.atime),
            mtime: new Date(stats.mtime),
            ctime: new Date(stats.ctime)
          };
        });
      },
      setattr(node, attr) {
        log?.("setattr", EMFS.realPath(node), attr);
        const path = EMFS.realPath(node);
        EMFS.tryFSOperation(() => {
          if (attr.mode !== void 0) {
            baseFS.chmod(path, attr.mode);
          }
          if (attr.size !== void 0) {
            baseFS.truncate(path, attr.size);
          }
          if (attr.timestamp !== void 0) {
            baseFS.utimes(path, attr.timestamp, attr.timestamp);
          }
          if (attr.size !== void 0) {
            baseFS.truncate(path, attr.size);
          }
        });
      },
      lookup(parent, name) {
        log?.("lookup", EMFS.realPath(parent), name);
        const path = [EMFS.realPath(parent), name].join("/");
        const mode = EMFS.getMode(path);
        return EMFS.createNode(parent, name, mode);
      },
      mknod(parent, name, mode, dev) {
        log?.("mknod", EMFS.realPath(parent), name, mode, dev);
        const node = EMFS.createNode(parent, name, mode, dev);
        const path = EMFS.realPath(node);
        return EMFS.tryFSOperation(() => {
          if (FS.isDir(node.mode)) {
            baseFS.mkdir(path, { mode });
          } else {
            baseFS.writeFile(path, "", { mode });
          }
          return node;
        });
      },
      rename(oldNode, newDir, newName) {
        log?.("rename", EMFS.realPath(oldNode), EMFS.realPath(newDir), newName);
        const oldPath = EMFS.realPath(oldNode);
        const newPath = [EMFS.realPath(newDir), newName].join("/");
        EMFS.tryFSOperation(() => {
          baseFS.rename(oldPath, newPath);
        });
        oldNode.name = newName;
      },
      unlink(parent, name) {
        log?.("unlink", EMFS.realPath(parent), name);
        const path = [EMFS.realPath(parent), name].join("/");
        try {
          baseFS.unlink(path);
        } catch (e) {
        }
      },
      rmdir(parent, name) {
        log?.("rmdir", EMFS.realPath(parent), name);
        const path = [EMFS.realPath(parent), name].join("/");
        return EMFS.tryFSOperation(() => {
          baseFS.rmdir(path);
        });
      },
      readdir(node) {
        log?.("readdir", EMFS.realPath(node));
        const path = EMFS.realPath(node);
        return EMFS.tryFSOperation(() => {
          return baseFS.readdir(path);
        });
      },
      symlink(parent, newName, oldPath) {
        log?.("symlink", EMFS.realPath(parent), newName, oldPath);
        throw new FS.ErrnoError(63);
      },
      readlink(node) {
        log?.("readlink", EMFS.realPath(node));
        throw new FS.ErrnoError(63);
      }
    },
    stream_ops: {
      open(stream) {
        log?.("open stream", EMFS.realPath(stream.node));
        const path = EMFS.realPath(stream.node);
        return EMFS.tryFSOperation(() => {
          if (FS.isFile(stream.node.mode)) {
            stream.shared.refcount = 1;
            stream.nfd = baseFS.open(path);
          }
        });
      },
      close(stream) {
        log?.("close stream", EMFS.realPath(stream.node));
        return EMFS.tryFSOperation(() => {
          if (FS.isFile(stream.node.mode) && stream.nfd && --stream.shared.refcount === 0) {
            baseFS.close(stream.nfd);
          }
        });
      },
      dup(stream) {
        log?.("dup stream", EMFS.realPath(stream.node));
        stream.shared.refcount++;
      },
      read(stream, buffer, offset, length, position) {
        log?.(
          "read stream",
          EMFS.realPath(stream.node),
          offset,
          length,
          position
        );
        if (length === 0) return 0;
        const ret = EMFS.tryFSOperation(
          () => baseFS.read(
            stream.nfd,
            buffer,
            offset,
            length,
            position
          )
        );
        return ret;
      },
      write(stream, buffer, offset, length, position) {
        log?.(
          "write stream",
          EMFS.realPath(stream.node),
          offset,
          length,
          position
        );
        return EMFS.tryFSOperation(
          () => baseFS.write(
            stream.nfd,
            buffer.buffer,
            offset,
            length,
            position
          )
        );
      },
      llseek(stream, offset, whence) {
        log?.("llseek stream", EMFS.realPath(stream.node), offset, whence);
        let position = offset;
        if (whence === 1) {
          position += stream.position;
        } else if (whence === 2) {
          if (FS.isFile(stream.node.mode)) {
            EMFS.tryFSOperation(() => {
              const stat = baseFS.fstat(stream.nfd);
              position += stat.size;
            });
          }
        }
        if (position < 0) {
          throw new FS.ErrnoError(28);
        }
        return position;
      },
      mmap(stream, length, position, prot, flags) {
        log?.(
          "mmap stream",
          EMFS.realPath(stream.node),
          length,
          position,
          prot,
          flags
        );
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        const ptr = Module.mmapAlloc(length);
        EMFS.stream_ops.read(
          stream,
          Module.HEAP8,
          ptr,
          length,
          position
        );
        return { ptr, allocated: true };
      },
      msync(stream, buffer, offset, length, mmapFlags) {
        log?.(
          "msync stream",
          EMFS.realPath(stream.node),
          offset,
          length,
          mmapFlags
        );
        EMFS.stream_ops.write(stream, buffer, 0, length, offset);
        return 0;
      }
    }
  };
  return EMFS;
};

// src/fs/opfs-ahp.ts
var STATE_FILE = "state.txt";
var DATA_DIR = "data";
var INITIAL_MODE = {
  DIR: 16384,
  FILE: 32768
};
var _opfsRootAh, _rootAh, _dataDirAh, _stateFH, _stateSH, _fh, _sh, _handleIdCounter, _openHandlePaths, _openHandleIds, _unsyncedSH, _OpfsAhpFS_instances, init_fn, tryWithWAL_fn, logWAL_fn, pathParts_fn, resolvePath_fn, getPathFromFd_fn, nextHandleId_fn, resolveOpfsDirectory_fn;
var OpfsAhpFS = class extends BaseFilesystem {
  constructor(dataDir, {
    initialPoolSize = 1e3,
    maintainedPoolSize = 100,
    debug = false
  } = {}) {
    super(dataDir, { debug });
    __privateAdd(this, _OpfsAhpFS_instances);
    __privateAdd(this, _opfsRootAh);
    __privateAdd(this, _rootAh);
    __privateAdd(this, _dataDirAh);
    __privateAdd(this, _stateFH);
    __privateAdd(this, _stateSH);
    __privateAdd(this, _fh, /* @__PURE__ */ new Map());
    __privateAdd(this, _sh, /* @__PURE__ */ new Map());
    __privateAdd(this, _handleIdCounter, 0);
    __privateAdd(this, _openHandlePaths, /* @__PURE__ */ new Map());
    __privateAdd(this, _openHandleIds, /* @__PURE__ */ new Map());
    this.lastCheckpoint = 0;
    this.checkpointInterval = 1e3 * 60;
    // 1 minute
    this.poolCounter = 0;
    __privateAdd(this, _unsyncedSH, /* @__PURE__ */ new Set());
    this.initialPoolSize = initialPoolSize;
    this.maintainedPoolSize = maintainedPoolSize;
  }
  async init(pg, opts) {
    await __privateMethod(this, _OpfsAhpFS_instances, init_fn).call(this);
    return super.init(pg, opts);
  }
  async syncToFs(relaxedDurability = false) {
    await this.maybeCheckpointState();
    await this.maintainPool();
    if (!relaxedDurability) {
      this.flush();
    }
  }
  async closeFs() {
    for (const sh of __privateGet(this, _sh).values()) {
      sh.close();
    }
    __privateGet(this, _stateSH).flush();
    __privateGet(this, _stateSH).close();
    this.pg.Module.FS.quit();
  }
  async maintainPool(size) {
    size = size || this.maintainedPoolSize;
    const change = size - this.state.pool.length;
    const promises = [];
    for (let i = 0; i < change; i++) {
      promises.push(
        // eslint-disable-next-line no-async-promise-executor
        new Promise(async (resolve) => {
          ++this.poolCounter;
          const filename = `${(Date.now() - 1704063600).toString(16).padStart(8, "0")}-${this.poolCounter.toString(16).padStart(8, "0")}`;
          const fh = await __privateGet(this, _dataDirAh).getFileHandle(filename, {
            create: true
          });
          const sh = await fh.createSyncAccessHandle();
          __privateGet(this, _fh).set(filename, fh);
          __privateGet(this, _sh).set(filename, sh);
          __privateMethod(this, _OpfsAhpFS_instances, logWAL_fn).call(this, {
            opp: "createPoolFile",
            args: [filename]
          });
          this.state.pool.push(filename);
          resolve();
        })
      );
    }
    for (let i = 0; i > change; i--) {
      promises.push(
        // eslint-disable-next-line no-async-promise-executor
        new Promise(async (resolve) => {
          const filename = this.state.pool.pop();
          __privateMethod(this, _OpfsAhpFS_instances, logWAL_fn).call(this, {
            opp: "deletePoolFile",
            args: [filename]
          });
          const fh = __privateGet(this, _fh).get(filename);
          const sh = __privateGet(this, _sh).get(filename);
          sh?.close();
          await __privateGet(this, _dataDirAh).removeEntry(fh.name);
          __privateGet(this, _fh).delete(filename);
          __privateGet(this, _sh).delete(filename);
          resolve();
        })
      );
    }
    await Promise.all(promises);
  }
  _createPoolFileState(filename) {
    this.state.pool.push(filename);
  }
  _deletePoolFileState(filename) {
    const index = this.state.pool.indexOf(filename);
    if (index > -1) {
      this.state.pool.splice(index, 1);
    }
  }
  async maybeCheckpointState() {
    if (Date.now() - this.lastCheckpoint > this.checkpointInterval) {
      await this.checkpointState();
    }
  }
  async checkpointState() {
    const stateAB = new TextEncoder().encode(JSON.stringify(this.state));
    __privateGet(this, _stateSH).truncate(0);
    __privateGet(this, _stateSH).write(stateAB, { at: 0 });
    __privateGet(this, _stateSH).flush();
    this.lastCheckpoint = Date.now();
  }
  flush() {
    for (const sh of __privateGet(this, _unsyncedSH)) {
      try {
        sh.flush();
      } catch (e) {
      }
    }
    __privateGet(this, _unsyncedSH).clear();
  }
  // Filesystem API:
  chmod(path, mode) {
    __privateMethod(this, _OpfsAhpFS_instances, tryWithWAL_fn).call(this, { opp: "chmod", args: [path, mode] }, () => {
      this._chmodState(path, mode);
    });
  }
  _chmodState(path, mode) {
    const node = __privateMethod(this, _OpfsAhpFS_instances, resolvePath_fn).call(this, path);
    node.mode = mode;
  }
  close(fd) {
    const path = __privateMethod(this, _OpfsAhpFS_instances, getPathFromFd_fn).call(this, fd);
    __privateGet(this, _openHandlePaths).delete(fd);
    __privateGet(this, _openHandleIds).delete(path);
  }
  fstat(fd) {
    const path = __privateMethod(this, _OpfsAhpFS_instances, getPathFromFd_fn).call(this, fd);
    return this.lstat(path);
  }
  lstat(path) {
    const node = __privateMethod(this, _OpfsAhpFS_instances, resolvePath_fn).call(this, path);
    const size = node.type === "file" ? __privateGet(this, _sh).get(node.backingFilename).getSize() : 0;
    const blksize = 4096;
    return {
      dev: 0,
      ino: 0,
      mode: node.mode,
      nlink: 1,
      uid: 0,
      gid: 0,
      rdev: 0,
      size,
      blksize,
      blocks: Math.ceil(size / blksize),
      atime: node.lastModified,
      mtime: node.lastModified,
      ctime: node.lastModified
    };
  }
  mkdir(path, options) {
    __privateMethod(this, _OpfsAhpFS_instances, tryWithWAL_fn).call(this, { opp: "mkdir", args: [path, options] }, () => {
      this._mkdirState(path, options);
    });
  }
  _mkdirState(path, options) {
    const parts = __privateMethod(this, _OpfsAhpFS_instances, pathParts_fn).call(this, path);
    const newDirName = parts.pop();
    const currentPath = [];
    let node = this.state.root;
    for (const part of parts) {
      currentPath.push(path);
      if (!Object.prototype.hasOwnProperty.call(node.children, part)) {
        if (options?.recursive) {
          this.mkdir(currentPath.join("/"));
        } else {
          throw new FsError("ENOENT", "No such file or directory");
        }
      }
      if (node.children[part].type !== "directory") {
        throw new FsError("ENOTDIR", "Not a directory");
      }
      node = node.children[part];
    }
    if (Object.prototype.hasOwnProperty.call(node.children, newDirName)) {
      throw new FsError("EEXIST", "File exists");
    }
    const newDir = {
      type: "directory",
      lastModified: Date.now(),
      mode: options?.mode || INITIAL_MODE.DIR,
      children: {}
    };
    node.children[newDirName] = newDir;
  }
  open(path, _flags, _mode) {
    const node = __privateMethod(this, _OpfsAhpFS_instances, resolvePath_fn).call(this, path);
    if (node.type !== "file") {
      throw new FsError("EISDIR", "Is a directory");
    }
    const handleId = __privateMethod(this, _OpfsAhpFS_instances, nextHandleId_fn).call(this);
    __privateGet(this, _openHandlePaths).set(handleId, path);
    __privateGet(this, _openHandleIds).set(path, handleId);
    return handleId;
  }
  readdir(path) {
    const node = __privateMethod(this, _OpfsAhpFS_instances, resolvePath_fn).call(this, path);
    if (node.type !== "directory") {
      throw new FsError("ENOTDIR", "Not a directory");
    }
    return Object.keys(node.children);
  }
  read(fd, buffer, offset, length, position) {
    const path = __privateMethod(this, _OpfsAhpFS_instances, getPathFromFd_fn).call(this, fd);
    const node = __privateMethod(this, _OpfsAhpFS_instances, resolvePath_fn).call(this, path);
    if (node.type !== "file") {
      throw new FsError("EISDIR", "Is a directory");
    }
    const sh = __privateGet(this, _sh).get(node.backingFilename);
    return sh.read(new Uint8Array(buffer.buffer, offset, length), {
      at: position
    });
  }
  rename(oldPath, newPath) {
    __privateMethod(this, _OpfsAhpFS_instances, tryWithWAL_fn).call(this, { opp: "rename", args: [oldPath, newPath] }, () => {
      this._renameState(oldPath, newPath, true);
    });
  }
  _renameState(oldPath, newPath, doFileOps = false) {
    const oldPathParts = __privateMethod(this, _OpfsAhpFS_instances, pathParts_fn).call(this, oldPath);
    const oldFilename = oldPathParts.pop();
    const oldParent = __privateMethod(this, _OpfsAhpFS_instances, resolvePath_fn).call(this, oldPathParts.join("/"));
    if (!Object.prototype.hasOwnProperty.call(oldParent.children, oldFilename)) {
      throw new FsError("ENOENT", "No such file or directory");
    }
    const newPathParts = __privateMethod(this, _OpfsAhpFS_instances, pathParts_fn).call(this, newPath);
    const newFilename = newPathParts.pop();
    const newParent = __privateMethod(this, _OpfsAhpFS_instances, resolvePath_fn).call(this, newPathParts.join("/"));
    if (doFileOps && Object.prototype.hasOwnProperty.call(newParent.children, newFilename)) {
      const node = newParent.children[newFilename];
      const sh = __privateGet(this, _sh).get(node.backingFilename);
      sh.truncate(0);
      this.state.pool.push(node.backingFilename);
    }
    newParent.children[newFilename] = oldParent.children[oldFilename];
    delete oldParent.children[oldFilename];
  }
  rmdir(path) {
    __privateMethod(this, _OpfsAhpFS_instances, tryWithWAL_fn).call(this, { opp: "rmdir", args: [path] }, () => {
      this._rmdirState(path);
    });
  }
  _rmdirState(path) {
    const pathParts = __privateMethod(this, _OpfsAhpFS_instances, pathParts_fn).call(this, path);
    const dirName = pathParts.pop();
    const parent = __privateMethod(this, _OpfsAhpFS_instances, resolvePath_fn).call(this, pathParts.join("/"));
    if (!Object.prototype.hasOwnProperty.call(parent.children, dirName)) {
      throw new FsError("ENOENT", "No such file or directory");
    }
    const node = parent.children[dirName];
    if (node.type !== "directory") {
      throw new FsError("ENOTDIR", "Not a directory");
    }
    if (Object.keys(node.children).length > 0) {
      throw new FsError("ENOTEMPTY", "Directory not empty");
    }
    delete parent.children[dirName];
  }
  truncate(path, len = 0) {
    const node = __privateMethod(this, _OpfsAhpFS_instances, resolvePath_fn).call(this, path);
    if (node.type !== "file") {
      throw new FsError("EISDIR", "Is a directory");
    }
    const sh = __privateGet(this, _sh).get(node.backingFilename);
    if (!sh) {
      throw new FsError("ENOENT", "No such file or directory");
    }
    sh.truncate(len);
    __privateGet(this, _unsyncedSH).add(sh);
  }
  unlink(path) {
    __privateMethod(this, _OpfsAhpFS_instances, tryWithWAL_fn).call(this, { opp: "unlink", args: [path] }, () => {
      this._unlinkState(path, true);
    });
  }
  _unlinkState(path, doFileOps = false) {
    const pathParts = __privateMethod(this, _OpfsAhpFS_instances, pathParts_fn).call(this, path);
    const filename = pathParts.pop();
    const dir = __privateMethod(this, _OpfsAhpFS_instances, resolvePath_fn).call(this, pathParts.join("/"));
    if (!Object.prototype.hasOwnProperty.call(dir.children, filename)) {
      throw new FsError("ENOENT", "No such file or directory");
    }
    const node = dir.children[filename];
    if (node.type !== "file") {
      throw new FsError("EISDIR", "Is a directory");
    }
    delete dir.children[filename];
    if (doFileOps) {
      const sh = __privateGet(this, _sh).get(node.backingFilename);
      sh?.truncate(0);
      __privateGet(this, _unsyncedSH).add(sh);
      if (__privateGet(this, _openHandleIds).has(path)) {
        __privateGet(this, _openHandlePaths).delete(__privateGet(this, _openHandleIds).get(path));
        __privateGet(this, _openHandleIds).delete(path);
      }
    }
    this.state.pool.push(node.backingFilename);
  }
  utimes(path, atime, mtime) {
    __privateMethod(this, _OpfsAhpFS_instances, tryWithWAL_fn).call(this, { opp: "utimes", args: [path, atime, mtime] }, () => {
      this._utimesState(path, atime, mtime);
    });
  }
  _utimesState(path, _atime, mtime) {
    const node = __privateMethod(this, _OpfsAhpFS_instances, resolvePath_fn).call(this, path);
    node.lastModified = mtime;
  }
  writeFile(path, data, options) {
    const pathParts = __privateMethod(this, _OpfsAhpFS_instances, pathParts_fn).call(this, path);
    const filename = pathParts.pop();
    const parent = __privateMethod(this, _OpfsAhpFS_instances, resolvePath_fn).call(this, pathParts.join("/"));
    if (!Object.prototype.hasOwnProperty.call(parent.children, filename)) {
      if (this.state.pool.length === 0) {
        throw new Error("No more file handles available in the pool");
      }
      const node2 = {
        type: "file",
        lastModified: Date.now(),
        mode: options?.mode || INITIAL_MODE.FILE,
        backingFilename: this.state.pool.pop()
      };
      parent.children[filename] = node2;
      __privateMethod(this, _OpfsAhpFS_instances, logWAL_fn).call(this, {
        opp: "createFileNode",
        args: [path, node2]
      });
    } else {
      const node2 = parent.children[filename];
      node2.lastModified = Date.now();
      __privateMethod(this, _OpfsAhpFS_instances, logWAL_fn).call(this, {
        opp: "setLastModified",
        args: [path, node2.lastModified]
      });
    }
    const node = parent.children[filename];
    const sh = __privateGet(this, _sh).get(node.backingFilename);
    if (data.length > 0) {
      sh.write(
        typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data),
        { at: 0 }
      );
      if (path.startsWith("/pg_wal")) {
        __privateGet(this, _unsyncedSH).add(sh);
      }
    }
  }
  _createFileNodeState(path, node) {
    const pathParts = __privateMethod(this, _OpfsAhpFS_instances, pathParts_fn).call(this, path);
    const filename = pathParts.pop();
    const parent = __privateMethod(this, _OpfsAhpFS_instances, resolvePath_fn).call(this, pathParts.join("/"));
    parent.children[filename] = node;
    const index = this.state.pool.indexOf(node.backingFilename);
    if (index > -1) {
      this.state.pool.splice(index, 1);
    }
    return node;
  }
  _setLastModifiedState(path, lastModified) {
    const node = __privateMethod(this, _OpfsAhpFS_instances, resolvePath_fn).call(this, path);
    node.lastModified = lastModified;
  }
  write(fd, buffer, offset, length, position) {
    const path = __privateMethod(this, _OpfsAhpFS_instances, getPathFromFd_fn).call(this, fd);
    const node = __privateMethod(this, _OpfsAhpFS_instances, resolvePath_fn).call(this, path);
    if (node.type !== "file") {
      throw new FsError("EISDIR", "Is a directory");
    }
    const sh = __privateGet(this, _sh).get(node.backingFilename);
    if (!sh) {
      throw new FsError("EBADF", "Bad file descriptor");
    }
    const ret = sh.write(new Uint8Array(buffer, offset, length), {
      at: position
    });
    if (path.startsWith("/pg_wal")) {
      __privateGet(this, _unsyncedSH).add(sh);
    }
    return ret;
  }
};
_opfsRootAh = new WeakMap();
_rootAh = new WeakMap();
_dataDirAh = new WeakMap();
_stateFH = new WeakMap();
_stateSH = new WeakMap();
_fh = new WeakMap();
_sh = new WeakMap();
_handleIdCounter = new WeakMap();
_openHandlePaths = new WeakMap();
_openHandleIds = new WeakMap();
_unsyncedSH = new WeakMap();
_OpfsAhpFS_instances = new WeakSet();
init_fn = async function() {
  __privateSet(this, _opfsRootAh, await navigator.storage.getDirectory());
  __privateSet(this, _rootAh, await __privateMethod(this, _OpfsAhpFS_instances, resolveOpfsDirectory_fn).call(this, this.dataDir, {
    create: true
  }));
  __privateSet(this, _dataDirAh, await __privateMethod(this, _OpfsAhpFS_instances, resolveOpfsDirectory_fn).call(this, DATA_DIR, {
    from: __privateGet(this, _rootAh),
    create: true
  }));
  __privateSet(this, _stateFH, await __privateGet(this, _rootAh).getFileHandle(STATE_FILE, {
    create: true
  }));
  __privateSet(this, _stateSH, await __privateGet(this, _stateFH).createSyncAccessHandle());
  const stateAB = new ArrayBuffer(__privateGet(this, _stateSH).getSize());
  __privateGet(this, _stateSH).read(stateAB, { at: 0 });
  let state;
  const stateLines = new TextDecoder().decode(stateAB).split("\n");
  let isNewState = false;
  try {
    state = JSON.parse(stateLines[0]);
  } catch (e) {
    state = {
      root: {
        type: "directory",
        lastModified: Date.now(),
        mode: INITIAL_MODE.DIR,
        children: {}
      },
      pool: []
    };
    __privateGet(this, _stateSH).truncate(0);
    __privateGet(this, _stateSH).write(new TextEncoder().encode(JSON.stringify(state)), {
      at: 0
    });
    isNewState = true;
  }
  this.state = state;
  const wal = stateLines.slice(1).filter(Boolean).map((line) => JSON.parse(line));
  for (const entry of wal) {
    const methodName = `_${entry.opp}State`;
    if (typeof this[methodName] === "function") {
      try {
        const method = this[methodName];
        method.bind(this)(...entry.args);
      } catch (e) {
        console.warn("Error applying OPFS AHP WAL entry", entry, e);
      }
    }
  }
  const walkPromises = [];
  const walk = async (node) => {
    if (node.type === "file") {
      try {
        const fh = await __privateGet(this, _dataDirAh).getFileHandle(node.backingFilename);
        const sh = await fh.createSyncAccessHandle();
        __privateGet(this, _fh).set(node.backingFilename, fh);
        __privateGet(this, _sh).set(node.backingFilename, sh);
      } catch (e) {
        console.error("Error opening file handle for node", node, e);
      }
    } else {
      for (const child of Object.values(node.children)) {
        walkPromises.push(walk(child));
      }
    }
  };
  await walk(this.state.root);
  const poolPromises = [];
  for (const filename of this.state.pool) {
    poolPromises.push(
      // eslint-disable-next-line no-async-promise-executor
      new Promise(async (resolve) => {
        if (__privateGet(this, _fh).has(filename)) {
          console.warn("File handle already exists for pool file", filename);
        }
        const fh = await __privateGet(this, _dataDirAh).getFileHandle(filename);
        const sh = await fh.createSyncAccessHandle();
        __privateGet(this, _fh).set(filename, fh);
        __privateGet(this, _sh).set(filename, sh);
        resolve();
      })
    );
  }
  await Promise.all([...walkPromises, ...poolPromises]);
  await this.maintainPool(
    isNewState ? this.initialPoolSize : this.maintainedPoolSize
  );
};
// Internal methods:
tryWithWAL_fn = function(entry, fn) {
  const offset = __privateMethod(this, _OpfsAhpFS_instances, logWAL_fn).call(this, entry);
  try {
    fn();
  } catch (e) {
    __privateGet(this, _stateSH).truncate(offset);
    throw e;
  }
};
logWAL_fn = function(entry) {
  const entryJSON = JSON.stringify(entry);
  const stateAB = new TextEncoder().encode(`
${entryJSON}`);
  const offset = __privateGet(this, _stateSH).getSize();
  __privateGet(this, _stateSH).write(stateAB, { at: offset });
  __privateGet(this, _unsyncedSH).add(__privateGet(this, _stateSH));
  return offset;
};
pathParts_fn = function(path) {
  return path.split("/").filter(Boolean);
};
resolvePath_fn = function(path, from) {
  const parts = __privateMethod(this, _OpfsAhpFS_instances, pathParts_fn).call(this, path);
  let node = from || this.state.root;
  for (const part of parts) {
    if (node.type !== "directory") {
      throw new FsError("ENOTDIR", "Not a directory");
    }
    if (!Object.prototype.hasOwnProperty.call(node.children, part)) {
      throw new FsError("ENOENT", "No such file or directory");
    }
    node = node.children[part];
  }
  return node;
};
getPathFromFd_fn = function(fd) {
  const path = __privateGet(this, _openHandlePaths).get(fd);
  if (!path) {
    throw new FsError("EBADF", "Bad file descriptor");
  }
  return path;
};
nextHandleId_fn = function() {
  const id = ++__privateWrapper(this, _handleIdCounter)._;
  while (__privateGet(this, _openHandlePaths).has(id)) {
    __privateWrapper(this, _handleIdCounter)._++;
  }
  return id;
};
resolveOpfsDirectory_fn = async function(path, options) {
  const parts = __privateMethod(this, _OpfsAhpFS_instances, pathParts_fn).call(this, path);
  let ah = options?.from || __privateGet(this, _opfsRootAh);
  for (const part of parts) {
    ah = await ah.getDirectoryHandle(part, { create: options?.create });
  }
  return ah;
};
var FsError = class extends Error {
  constructor(code, message) {
    super(message);
    if (typeof code === "number") {
      this.code = code;
    } else if (typeof code === "string") {
      this.code = ERRNO_CODES[code];
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OpfsAhpFS
});
//# sourceMappingURL=opfs-ahp.cjs.map
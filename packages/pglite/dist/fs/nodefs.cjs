"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/fs/nodefs.ts
var nodefs_exports = {};
__export(nodefs_exports, {
  NodeFS: () => NodeFS
});
module.exports = __toCommonJS(nodefs_exports);
init_cjs_shims();
var fs = __toESM(require("fs"), 1);
var path = __toESM(require("path"), 1);

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
function readDirectory(FS, path2) {
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
        name: fullPath.substring(path2.length),
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
  traverseDirectory(path2);
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
var EmscriptenBuiltinFilesystem = class {
  constructor(dataDir) {
    this.dataDir = dataDir;
  }
  async init(pg, emscriptenOptions) {
    this.pg = pg;
    return { emscriptenOpts: emscriptenOptions };
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
};

// src/fs/nodefs.ts
var NodeFS = class extends EmscriptenBuiltinFilesystem {
  constructor(dataDir) {
    super(dataDir);
    this.rootDir = path.resolve(dataDir);
    if (!fs.existsSync(path.join(this.rootDir))) {
      fs.mkdirSync(this.rootDir);
    }
  }
  async init(pg, opts) {
    this.pg = pg;
    const options = {
      ...opts,
      preRun: [
        ...opts.preRun || [],
        (mod) => {
          const nodefs = mod.FS.filesystems.NODEFS;
          mod.FS.mkdir(PGDATA);
          mod.FS.mount(nodefs, { root: this.rootDir }, PGDATA);
        }
      ]
    };
    return { emscriptenOpts: options };
  }
  async closeFs() {
    this.pg.Module.FS.quit();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NodeFS
});
//# sourceMappingURL=nodefs.cjs.map
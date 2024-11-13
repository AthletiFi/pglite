import {
  __commonJS,
  __toESM,
  init_esm_shims
} from "./chunk-ASR247EI.js";

// ../../node_modules/.pnpm/tinytar@0.1.0/node_modules/tinytar/lib/utils.js
var require_utils = __commonJS({
  "../../node_modules/.pnpm/tinytar@0.1.0/node_modules/tinytar/lib/utils.js"(exports, module) {
    "use strict";
    init_esm_shims();
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
    module.exports.MAX_SAFE_INTEGER = MAX_SAFE_INTEGER;
    module.exports.isUndefined = isUndefined;
    module.exports.isString = isString;
    module.exports.isObject = isObject;
    module.exports.isDateTime = isDateTime;
    module.exports.isFunction = isFunction;
    module.exports.isArray = isArray;
    module.exports.isArrayLike = isArrayLike;
    module.exports.isArrayBuffer = isArrayBuffer;
    module.exports.map = map;
    module.exports.find = find;
    module.exports.extend = extend;
    module.exports.toUint8Array = toUint8Array;
  }
});

// ../../node_modules/.pnpm/tinytar@0.1.0/node_modules/tinytar/lib/constants.js
var require_constants = __commonJS({
  "../../node_modules/.pnpm/tinytar@0.1.0/node_modules/tinytar/lib/constants.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var NULL_CHAR = "\0";
    module.exports = {
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
  "../../node_modules/.pnpm/tinytar@0.1.0/node_modules/tinytar/lib/types.js"(exports, module) {
    "use strict";
    init_esm_shims();
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
    module.exports.recordSize = recordSize;
    module.exports.defaultFileMode = defaultFileMode;
    module.exports.defaultUid = defaultUid;
    module.exports.defaultGid = defaultGid;
    module.exports.posixHeader = posixHeader;
    module.exports.effectiveHeaderSize = effectiveHeaderSize;
    module.exports.calculateChecksum = calculateChecksum;
    module.exports.formatTarString = formatTarString;
    module.exports.formatTarNumber = formatTarNumber;
    module.exports.formatTarDateTime = formatTarDateTime;
    module.exports.parseTarString = parseTarString;
    module.exports.parseTarNumber = parseTarNumber;
    module.exports.parseTarDateTime = parseTarDateTime;
  }
});

// ../../node_modules/.pnpm/tinytar@0.1.0/node_modules/tinytar/lib/tar.js
var require_tar = __commonJS({
  "../../node_modules/.pnpm/tinytar@0.1.0/node_modules/tinytar/lib/tar.js"(exports, module) {
    "use strict";
    init_esm_shims();
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
    module.exports.tar = tar2;
  }
});

// ../../node_modules/.pnpm/tinytar@0.1.0/node_modules/tinytar/lib/untar.js
var require_untar = __commonJS({
  "../../node_modules/.pnpm/tinytar@0.1.0/node_modules/tinytar/lib/untar.js"(exports, module) {
    "use strict";
    init_esm_shims();
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
    module.exports.untar = untar2;
  }
});

// ../../node_modules/.pnpm/tinytar@0.1.0/node_modules/tinytar/index.js
var require_tinytar = __commonJS({
  "../../node_modules/.pnpm/tinytar@0.1.0/node_modules/tinytar/index.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var utils = require_utils();
    var constants = require_constants();
    var tar2 = require_tar();
    var untar2 = require_untar();
    utils.extend(module.exports, tar2, untar2, constants);
  }
});

// src/fs/base.ts
init_esm_shims();

// src/fs/tarUtils.ts
init_esm_shims();
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
var compressedMimeTypes = [
  "application/x-gtar",
  "application/x-tar+gzip",
  "application/x-gzip",
  "application/gzip"
];
async function loadTar(FS, file, pgDataDir) {
  let tarball = new Uint8Array(await file.arrayBuffer());
  const filename = typeof File !== "undefined" && file instanceof File ? file.name : void 0;
  const compressed = compressedMimeTypes.includes(file.type) || filename?.endsWith(".tgz") || filename?.endsWith(".tar.gz");
  if (compressed) {
    tarball = await unzip(tarball);
  }
  const files = (0, import_tinytar.untar)(tarball);
  for (const file2 of files) {
    const filePath = pgDataDir + file2.name;
    const dirPath = filePath.split("/").slice(0, -1);
    for (let i = 1; i <= dirPath.length; i++) {
      const dir = dirPath.slice(0, i).join("/");
      if (!FS.analyzePath(dir).exists) {
        FS.mkdir(dir);
      }
    }
    if (file2.type === import_tinytar.REGTYPE) {
      FS.writeFile(filePath, file2.data);
      FS.utime(
        filePath,
        dateToUnixTimestamp(file2.modifyTime),
        dateToUnixTimestamp(file2.modifyTime)
      );
    } else if (file2.type === import_tinytar.DIRTYPE) {
      FS.mkdir(filePath);
    }
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
async function unzip(file) {
  if (typeof CompressionStream !== "undefined") {
    return await unzipBrowser(file);
  } else if (typeof process !== "undefined" && process.versions && process.versions.node) {
    return await unzipNode(file);
  } else {
    throw new Error("Unsupported environment for decompression");
  }
}
async function unzipBrowser(file) {
  const ds = new DecompressionStream("gzip");
  const writer = ds.writable.getWriter();
  const reader = ds.readable.getReader();
  writer.write(file);
  writer.close();
  const chunks = [];
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }
  const decompressed = new Uint8Array(
    chunks.reduce((acc, chunk) => acc + chunk.length, 0)
  );
  let offset = 0;
  chunks.forEach((chunk) => {
    decompressed.set(chunk, offset);
    offset += chunk.length;
  });
  return decompressed;
}
async function unzipNode(file) {
  const { promisify } = await import("util");
  const { gunzip } = await import("zlib");
  const gunzipPromise = promisify(gunzip);
  return await gunzipPromise(file);
}
function dateToUnixTimestamp(date) {
  if (!date) {
    return Math.floor(Date.now() / 1e3);
  } else {
    return typeof date === "number" ? date : Math.floor(date.getTime() / 1e3);
  }
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

export {
  require_tinytar,
  loadTar,
  WASM_PREFIX,
  PGDATA,
  EmscriptenBuiltinFilesystem,
  BaseFilesystem,
  ERRNO_CODES
};
//# sourceMappingURL=chunk-6CYKV6EZ.js.map
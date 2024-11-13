import {
  BaseFilesystem,
  ERRNO_CODES
} from "../chunk-6CYKV6EZ.js";
import {
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet,
  __privateWrapper,
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/fs/opfs-ahp.ts
init_esm_shims();
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
export {
  OpfsAhpFS
};
//# sourceMappingURL=opfs-ahp.js.map
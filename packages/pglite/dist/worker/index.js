import {
  BasePGlite
} from "../chunk-X2QN2Y5I.js";
import {
  uuid
} from "../chunk-WZKBFYLQ.js";
import "../chunk-BYSS5RHE.js";
import {
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet,
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/worker/index.ts
init_esm_shims();
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
  const id = options.id ?? `${import.meta.url}:${options.dataDir ?? ""}`;
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
export {
  LeaderChangedError,
  PGliteWorker,
  worker
};
//# sourceMappingURL=index.js.map
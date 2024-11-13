import {
  EmscriptenBuiltinFilesystem,
  PGDATA
} from "../chunk-6CYKV6EZ.js";
import {
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/fs/nodefs.ts
init_esm_shims();
import * as fs from "fs";
import * as path from "path";
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
export {
  NodeFS
};
//# sourceMappingURL=nodefs.js.map
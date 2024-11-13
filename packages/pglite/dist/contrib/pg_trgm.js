import {
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/contrib/pg_trgm.ts
init_esm_shims();
var setup = async (_pg, _emscriptenOpts) => {
  return {
    bundlePath: new URL("../../release/pg_trgm.tar.gz", import.meta.url)
  };
};
var pg_trgm = {
  name: "pg_trgm",
  setup
};
export {
  pg_trgm
};
//# sourceMappingURL=pg_trgm.js.map
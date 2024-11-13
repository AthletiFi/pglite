import {
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/vector/index.ts
init_esm_shims();
var setup = async (_pg, emscriptenOpts) => {
  return {
    emscriptenOpts,
    bundlePath: new URL("../../release/vector.tar.gz", import.meta.url)
  };
};
var vector = {
  name: "pgvector",
  setup
};
export {
  vector
};
//# sourceMappingURL=index.js.map
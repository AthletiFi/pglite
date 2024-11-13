import {
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/contrib/adminpack.ts
init_esm_shims();
var setup = async (_pg, _emscriptenOpts) => {
  return {
    bundlePath: new URL("../../release/adminpack.tar.gz", import.meta.url)
  };
};
var adminpack = {
  name: "adminpack",
  setup
};
export {
  adminpack
};
//# sourceMappingURL=adminpack.js.map
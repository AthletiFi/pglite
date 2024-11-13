import {
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/contrib/bloom.ts
init_esm_shims();
var setup = async (_pg, _emscriptenOpts) => {
  return {
    bundlePath: new URL("../../release/bloom.tar.gz", import.meta.url)
  };
};
var bloom = {
  name: "bloom",
  setup
};
export {
  bloom
};
//# sourceMappingURL=bloom.js.map
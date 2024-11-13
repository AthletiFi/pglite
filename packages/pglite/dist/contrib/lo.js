import {
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/contrib/lo.ts
init_esm_shims();
var setup = async (_pg, _emscriptenOpts) => {
  return {
    bundlePath: new URL("../../release/lo.tar.gz", import.meta.url)
  };
};
var lo = {
  name: "lo",
  setup
};
export {
  lo
};
//# sourceMappingURL=lo.js.map
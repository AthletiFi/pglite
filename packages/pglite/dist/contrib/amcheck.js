import {
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/contrib/amcheck.ts
init_esm_shims();
var setup = async (_pg, _emscriptenOpts) => {
  return {
    bundlePath: new URL("../../release/amcheck.tar.gz", import.meta.url)
  };
};
var amcheck = {
  name: "amcheck",
  setup
};
export {
  amcheck
};
//# sourceMappingURL=amcheck.js.map
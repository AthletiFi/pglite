import {
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/contrib/isn.ts
init_esm_shims();
var setup = async (_pg, _emscriptenOpts) => {
  return {
    bundlePath: new URL("../../release/isn.tar.gz", import.meta.url)
  };
};
var isn = {
  name: "isn",
  setup
};
export {
  isn
};
//# sourceMappingURL=isn.js.map
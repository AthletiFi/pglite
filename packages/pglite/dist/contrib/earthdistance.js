import {
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/contrib/earthdistance.ts
init_esm_shims();
var setup = async (_pg, _emscriptenOpts) => {
  return {
    bundlePath: new URL("../../release/earthdistance.tar.gz", import.meta.url)
  };
};
var earthdistance = {
  name: "earthdistance",
  setup
};
export {
  earthdistance
};
//# sourceMappingURL=earthdistance.js.map
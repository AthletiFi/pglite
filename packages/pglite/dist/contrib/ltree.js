import {
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/contrib/ltree.ts
init_esm_shims();
var setup = async (_pg, _emscriptenOpts) => {
  return {
    bundlePath: new URL("../../release/ltree.tar.gz", import.meta.url)
  };
};
var ltree = {
  name: "ltree",
  setup
};
export {
  ltree
};
//# sourceMappingURL=ltree.js.map
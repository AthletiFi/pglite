import {
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/contrib/btree_gin.ts
init_esm_shims();
var setup = async (_pg, _emscriptenOpts) => {
  return {
    bundlePath: new URL("../../release/btree_gin.tar.gz", import.meta.url)
  };
};
var btree_gin = {
  name: "btree_gin",
  setup
};
export {
  btree_gin
};
//# sourceMappingURL=btree_gin.js.map
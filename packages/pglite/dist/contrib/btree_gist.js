import {
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/contrib/btree_gist.ts
init_esm_shims();
var setup = async (_pg, _emscriptenOpts) => {
  return {
    bundlePath: new URL("../../release/btree_gist.tar.gz", import.meta.url)
  };
};
var btree_gist = {
  name: "btree_gist",
  setup
};
export {
  btree_gist
};
//# sourceMappingURL=btree_gist.js.map
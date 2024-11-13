import {
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/contrib/seg.ts
init_esm_shims();
var setup = async (_pg, _emscriptenOpts) => {
  return {
    bundlePath: new URL("../../release/seg.tar.gz", import.meta.url)
  };
};
var seg = {
  name: "seg",
  setup
};
export {
  seg
};
//# sourceMappingURL=seg.js.map
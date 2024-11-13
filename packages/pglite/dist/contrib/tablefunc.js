import {
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/contrib/tablefunc.ts
init_esm_shims();
var setup = async (_pg, _emscriptenOpts) => {
  return {
    bundlePath: new URL("../../release/tablefunc.tar.gz", import.meta.url)
  };
};
var tablefunc = {
  name: "tablefunc",
  setup
};
export {
  tablefunc
};
//# sourceMappingURL=tablefunc.js.map
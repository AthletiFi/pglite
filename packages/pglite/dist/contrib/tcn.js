import {
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/contrib/tcn.ts
init_esm_shims();
var setup = async (_pg, _emscriptenOpts) => {
  return {
    bundlePath: new URL("../../release/tcn.tar.gz", import.meta.url)
  };
};
var tcn = {
  name: "tcn",
  setup
};
export {
  tcn
};
//# sourceMappingURL=tcn.js.map
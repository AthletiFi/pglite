import {
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/contrib/auto_explain.ts
init_esm_shims();
var setup = async (_pg, _emscriptenOpts) => {
  return {
    bundlePath: new URL("../../release/auto_explain.tar.gz", import.meta.url)
  };
};
var auto_explain = {
  name: "auto_explain",
  setup
};
export {
  auto_explain
};
//# sourceMappingURL=auto_explain.js.map
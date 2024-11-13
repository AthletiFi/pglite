import {
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/contrib/citext.ts
init_esm_shims();
var setup = async (_pg, _emscriptenOpts) => {
  return {
    bundlePath: new URL("../../release/citext.tar.gz", import.meta.url)
  };
};
var citext = {
  name: "citext",
  setup
};
export {
  citext
};
//# sourceMappingURL=citext.js.map
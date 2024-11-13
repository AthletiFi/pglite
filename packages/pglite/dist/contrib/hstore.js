import {
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/contrib/hstore.ts
init_esm_shims();
var setup = async (_pg, _emscriptenOpts) => {
  return {
    bundlePath: new URL("../../release/hstore.tar.gz", import.meta.url)
  };
};
var hstore = {
  name: "hstore",
  setup
};
export {
  hstore
};
//# sourceMappingURL=hstore.js.map
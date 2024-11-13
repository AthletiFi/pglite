import {
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/contrib/fuzzystrmatch.ts
init_esm_shims();
var setup = async (_pg, _emscriptenOpts) => {
  return {
    bundlePath: new URL("../../release/fuzzystrmatch.tar.gz", import.meta.url)
  };
};
var fuzzystrmatch = {
  name: "fuzzystrmatch",
  setup
};
export {
  fuzzystrmatch
};
//# sourceMappingURL=fuzzystrmatch.js.map
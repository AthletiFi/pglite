import {
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/contrib/cube.ts
init_esm_shims();
var setup = async (_pg, _emscriptenOpts) => {
  return {
    bundlePath: new URL("../../release/cube.tar.gz", import.meta.url)
  };
};
var cube = {
  name: "cube",
  setup
};
export {
  cube
};
//# sourceMappingURL=cube.js.map
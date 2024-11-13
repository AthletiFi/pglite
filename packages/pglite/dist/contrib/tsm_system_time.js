import {
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/contrib/tsm_system_time.ts
init_esm_shims();
var setup = async (_pg, _emscriptenOpts) => {
  return {
    bundlePath: new URL(
      "../../release/tsm_system_time.tar.gz",
      import.meta.url
    )
  };
};
var tsm_system_time = {
  name: "tsm_system_time",
  setup
};
export {
  tsm_system_time
};
//# sourceMappingURL=tsm_system_time.js.map
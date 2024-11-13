import {
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/contrib/tsm_system_rows.ts
init_esm_shims();
var setup = async (_pg, _emscriptenOpts) => {
  return {
    bundlePath: new URL(
      "../../release/tsm_system_rows.tar.gz",
      import.meta.url
    )
  };
};
var tsm_system_rows = {
  name: "tsm_system_rows",
  setup
};
export {
  tsm_system_rows
};
//# sourceMappingURL=tsm_system_rows.js.map
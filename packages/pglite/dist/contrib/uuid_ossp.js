import {
  init_esm_shims
} from "../chunk-ASR247EI.js";

// src/contrib/uuid_ossp.ts
init_esm_shims();
var setup = async (_pg, _emscriptenOpts) => {
  return {
    bundlePath: new URL("../../release/uuid-ossp.tar.gz", import.meta.url)
  };
};
var uuid_ossp = {
  name: "uuid-ossp",
  setup
};
export {
  uuid_ossp
};
//# sourceMappingURL=uuid_ossp.js.map
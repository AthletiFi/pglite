"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/contrib/auto_explain.ts
var auto_explain_exports = {};
__export(auto_explain_exports, {
  auto_explain: () => auto_explain
});
module.exports = __toCommonJS(auto_explain_exports);

// ../../node_modules/.pnpm/tsup@8.3.0_@microsoft+api-extractor@7.47.7_@types+node@20.16.11__postcss@8.4.47_tsx@4.19.1_typescript@5.6.3/node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl = () => typeof document === "undefined" ? new URL(`file:${__filename}`).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();

// src/contrib/auto_explain.ts
var setup = async (_pg, _emscriptenOpts) => {
  return {
    bundlePath: new URL("../../release/auto_explain.tar.gz", importMetaUrl)
  };
};
var auto_explain = {
  name: "auto_explain",
  setup
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  auto_explain
});
//# sourceMappingURL=auto_explain.cjs.map
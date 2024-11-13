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

// src/templating.ts
var templating_exports = {};
__export(templating_exports, {
  identifier: () => identifier,
  query: () => query,
  raw: () => raw,
  sql: () => sql
});
module.exports = __toCommonJS(templating_exports);
var TemplateType = {
  part: "part",
  container: "container"
};
function addToLastAndPushWithSuffix(arr, suffix, ...values) {
  const lastArrIdx = arr.length - 1;
  const lastValIdx = values.length - 1;
  if (lastValIdx === -1) return;
  if (lastValIdx === 0) {
    arr[lastArrIdx] = arr[lastArrIdx] + values[0] + suffix;
    return;
  }
  arr[lastArrIdx] = arr[lastArrIdx] + values[0];
  arr.push(...values.slice(1, lastValIdx));
  arr.push(values[lastValIdx] + suffix);
}
function sql(strings, ...values) {
  const parsedStrings = [strings[0]];
  parsedStrings.raw = [strings.raw[0]];
  const parsedValues = [];
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    const nextStringIdx = i + 1;
    if (value?._templateType === TemplateType.part) {
      addToLastAndPushWithSuffix(
        parsedStrings,
        strings[nextStringIdx],
        value.str
      );
      addToLastAndPushWithSuffix(
        parsedStrings.raw,
        strings.raw[nextStringIdx],
        value.str
      );
      continue;
    }
    if (value?._templateType === TemplateType.container) {
      addToLastAndPushWithSuffix(
        parsedStrings,
        strings[nextStringIdx],
        ...value.strings
      );
      addToLastAndPushWithSuffix(
        parsedStrings.raw,
        strings.raw[nextStringIdx],
        ...value.strings.raw
      );
      parsedValues.push(...value.values);
      continue;
    }
    parsedStrings.push(strings[nextStringIdx]);
    parsedStrings.raw.push(strings.raw[nextStringIdx]);
    parsedValues.push(value);
  }
  return {
    _templateType: "container",
    strings: parsedStrings,
    values: parsedValues
  };
}
function identifier(strings, ...values) {
  return {
    _templateType: "part",
    str: `"${String.raw(strings, ...values)}"`
  };
}
function raw(strings, ...values) {
  return {
    _templateType: "part",
    str: String.raw(strings, ...values)
  };
}
function query(strings, ...values) {
  const { strings: queryStringParts, values: params } = sql(strings, ...values);
  return {
    query: [
      queryStringParts[0],
      ...params.flatMap((_, idx) => [`$${idx + 1}`, queryStringParts[idx + 1]])
    ].join(""),
    params
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  identifier,
  query,
  raw,
  sql
});
//# sourceMappingURL=templating.cjs.map
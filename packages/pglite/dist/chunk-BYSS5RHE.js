import {
  init_esm_shims
} from "./chunk-ASR247EI.js";

// src/templating.ts
init_esm_shims();
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

export {
  sql,
  identifier,
  raw,
  query
};
//# sourceMappingURL=chunk-BYSS5RHE.js.map
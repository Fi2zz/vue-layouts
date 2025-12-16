export function isNumber(value: any): value is number {
  // NaN + 0 === NaN -> false
  // 0 + 0 === 0 -> true
  // Infinity + 0 === Infinity -> true
  // -Infinity + 0 === -Infinity -> true
  // "0" + 0 === 0 -> false
  return typeof value === "number" && value + 0 === value;
}

export function isUndefined(value: any): value is undefined {
  return typeof value === "undefined";
}

export function pick<T extends object, K extends keyof T>(
  object: T,
  paths: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  if (object == null) {
    return result;
  }
  for (const path of paths) {
    if (path in object) {
      result[path] = object[path];
    }
  }
  return result;
}

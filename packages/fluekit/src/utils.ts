export function isNumber(value: any): value is number {
  return typeof value === "number" && value + 0 === value;
}

export function isUndefined(value: any): value is undefined {
  return typeof value === "undefined";
}

export function isSymbol(value: any): value is symbol {
  return typeof value === "symbol";
}

const PURE_NUMBER_REGEX = /^[+-]?(?:\d+\.?\d*|\.\d+)$/;
const NUMBER_PX_REGEX = /^[+-]?(?:\d+\.?\d*|\.\d+)px$/;

export function isPureNumber(value: string): boolean {
  return PURE_NUMBER_REGEX.test(value);
}

export function isNumberPx(value: string): boolean {
  return NUMBER_PX_REGEX.test(value);
}

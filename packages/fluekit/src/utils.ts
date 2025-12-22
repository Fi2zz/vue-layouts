export function isNumber(value: any): value is number {
  return typeof value === "number" && value + 0 === value;
}

export function isUndefined(value: any): value is undefined {
  return typeof value === "undefined";
}

export function isSymbol(value: any): value is symbol {
  return typeof value === "symbol";
}

/**
 * 通用验证函数，仅在开发环境下执行验证逻辑
 * @param validator 验证函数
 * @param args 验证函数的参数
 */

export function validateInDev<T extends (...args: any[]) => any>(
  validator: T,
  ...args: Parameters<T>
): ReturnType<T> | void {
  // 只在开发环境下执行验证
  //@ts-ignore
  if (import.meta.env.DEV) {
    validator(...args);
  }
}

const PURE_NUMBER_REGEX = /^[+-]?(?:\d+\.?\d*|\.\d+)$/;
const NUMBER_PX_REGEX = /^[+-]?(?:\d+\.?\d*|\.\d+)px$/;

export function isPureNumber(value: string): boolean {
  return PURE_NUMBER_REGEX.test(value);
}

export function isNumberPx(value: string): boolean {
  return NUMBER_PX_REGEX.test(value);
}

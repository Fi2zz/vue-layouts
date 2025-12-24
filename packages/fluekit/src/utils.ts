import { type VNode } from "vue";

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

export function isDefined<T>(value: T): value is NonNullable<T> {
  return typeof value !== "undefined" && value !== null;
}

export function isPlainObject<T>(value: T) {
  return Object.prototype.toLocaleString.call(value) == "[object Object]";
}

export function isHtmlTag(vnode: VNode): boolean {
  return typeof vnode.type === "string";
}

export function isComponent(vnode: VNode): boolean {
  const type = vnode.type;
  return typeof type === "object" || typeof type === "function";
}

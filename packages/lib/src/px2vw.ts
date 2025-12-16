let DEFAULT_VW = 750;

/**
 * 正则表达式工具函数
 * 支持检测正负纯数字和纯数字+px格式
 */

// 检测正负纯数字的正则表达式（支持小数）
// 匹配：123, -123, +123, 0, -0, +0, 12.5, -12.5, +12.5, .5, -.5
const PURE_NUMBER_REGEX = /^[+-]?(?:\d+\.?\d*|\.\d+)$/;

// 检测纯数字+px的正则表达式（支持小数）
// 匹配：123px, -123px, +123px, 0px, 12.5px, -12.5px, .5px
const NUMBER_PX_REGEX = /^[+-]?(?:\d+\.?\d*|\.\d+)px$/;

/**
 * 检测是否为纯数字（正负数）
 * @param {string} value - 要检测的值
 * @returns {boolean} - 是否为纯数字
 */
function isPureNumber(value: string): boolean {
  return PURE_NUMBER_REGEX.test(value);
}

/**
 * 检测是否为数字+px格式
 * @param {string} value - 要检测的值
 * @returns {boolean} - 是否为数字+px格式
 */
function isNumberPx(value: string): boolean {
  return NUMBER_PX_REGEX.test(value);
}
export function px2vw(
  px: string | number | undefined | null,
  designWidth = DEFAULT_VW
): string {
  //@ts-ignore
  if (typeof px == "undefined" || px == null) return;
  if (px == "0px" || px === "0" || px === 0) return "0";
  if (typeof px == "string") {
    let value = px;
    if (isNumberPx(px)) px = px.replace(/px/, "").trim(); //  123vw -> 123vw  123px -> 123 123.1px ->123.1
    if (!isPureNumber(px)) return value;
  }
  px = Number(px);
  if (px == 0) return "0";
  designWidth = designWidth / 100;
  const vw = `${Math.round((px / designWidth) * 100000) / 100000}vw`;
  return vw;
}
export function vw2px(input: string, designWidth = DEFAULT_VW) {
  let vw = Number(input.replace("vw", "").trim()) as unknown as number;
  designWidth = designWidth / 100;
  vw *= designWidth;
  vw * 10000;
  return vw;
}

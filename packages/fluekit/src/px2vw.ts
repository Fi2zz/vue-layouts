import { isNumberPx, isPureNumber } from "./utils";

let DEFAULT_VW = 750;
let canTransform = true;

export function setTransform(value: boolean) {
  canTransform = value;
}
export function setDefaultVW(value: number) {
  if (!isPureNumber(`${value}`)) throw new Error("defaultVW must be a number");
  if (value <= 0) throw new Error("defaultVW must be greater than 0");

  DEFAULT_VW = value;
}
const EXCLUDED_VALUES = ["0px", "0", "+0", "-0", "0%", "+0%", "-0%", "-0px", "+0px"];

const nonTransform = (px: string) =>
  px.endsWith("vw") || px.endsWith("%") || EXCLUDED_VALUES.includes(px);

export function px2vw(px: string | number | undefined | null, designWidth = DEFAULT_VW): string {
  //@ts-ignore
  if (!canTransform) {
    return isPureNumber(`${px}`) ? `${px}px` : (px as string);
  }
  if (typeof px == "undefined" || px == null || (typeof px === "number" && !Number.isFinite(px)))
    return undefined as unknown as string;
  if (px === 0) return "0";
  if (typeof px == "string") {
    px = px.trim();
    if (px == "") return undefined as unknown as string;
    if (nonTransform(px)) return px;
    const original = px;
    if (isNumberPx(px)) px = px.slice(0, -2);
    if (!isPureNumber(px)) return original;
  }
  px = Number(px);
  designWidth = designWidth / 100;
  return `${Math.round((px / designWidth) * 100000) / 100000}vw`;
}

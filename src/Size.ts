import { px2vw } from "./px2vw";

export interface Size {
  width?: number | string;
  height?: number | string;
}
export function Size(value: Size | string | number): Size | undefined {
  if (!value) return undefined;
  if (typeof value === "number" || typeof value === "string")
    return { width: value, height: value };
  const { width, height } = value;
  return { width, height };
}

export function sizeToStyle(size?: Size) {
  if (!size) return;
  const { width, height } = size;
  return {
    width: width !== "auto" ? px2vw(width) : width,
    height: height !== "auto" ? px2vw(height) : height,
  };
}

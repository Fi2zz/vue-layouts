import { px2vw } from "./px2vw";

export interface SizeType {
  width?: number | string;
  height?: number | string;
}

export type Size = SizeType;

export function Size(value: SizeType | string | number): SizeType | undefined {
  if (!value) return undefined;
  if (typeof value === "number" || typeof value === "string")
    return { width: value, height: value };
  const { width, height } = value;
  return { width, height };
}

export function sizeToStyle(size?: SizeType) {
  if (!size) return;
  const { width, height } = size;
  return {
    width: px2vw(width),
    height: px2vw(height),
  };
}

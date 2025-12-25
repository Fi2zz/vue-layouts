import { px2vw } from "./px2vw";

export interface SizeType {
  width?: number | string;
  height?: number | string;
}

export type Size = SizeType;

export function Size(props: SizeType): SizeType {
  const { width, height } = props;
  return { width, height };
}

// Static methods for Flutter-like API
Size.square = (dimension: number) => Size({ width: dimension, height: dimension });
Size.zero = Size({ width: 0, height: 0 });
Size.infinite = Size({ width: Infinity, height: Infinity });
Size.fromHeight = (height: number) => Size({ width: Infinity, height });
Size.fromWidth = (width: number) => Size({ width, height: Infinity });

export function sizeToStyle(size?: SizeType) {
  if (!size) return;
  const { width, height } = size;
  return {
    width: px2vw(width),
    height: px2vw(height),
  };
}

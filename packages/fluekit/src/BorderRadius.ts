import { px2vw } from "./px2vw";

import { CSSProperties } from "vue";
export type BorderRadiusValue = number | string;

export interface BorderRadiusProps {
  topLeft?: BorderRadiusValue;
  bottom?: BorderRadiusValue; // Deprecated or incorrect in previous implementation? Usually bottom implies bottom-left/right or similar?
  // Actually, standard BorderRadius has topLeft, topRight, bottomLeft, bottomRight.
  // 'bottom' is not standard. But I will keep what was there except 'all'.
  // Wait, let's look at previous implementation.
  // previous had: topLeft, bottom, topRight, bottomLeft, bottomRight, all.
  // 'bottom' seems weird for BorderRadius unless it meant 'bottomLeft' and 'bottomRight'.
  // But standard is TL, TR, BL, BR.
  // Let's stick to strict Flutter-like: TL, TR, BL, BR.
  topRight?: BorderRadiusValue;
  bottomLeft?: BorderRadiusValue;
  bottomRight?: BorderRadiusValue;
}

// 定义唯一符号标记
const BORDER_RADIUS_SYMBOL = Symbol("borderRadius");

export type BorderRadius = BorderRadiusProps & {
  [BORDER_RADIUS_SYMBOL]?: true;
};

export type BorderRadiusType = BorderRadius;

export function BorderRadius(borderRadius: BorderRadiusProps): BorderRadius {
  const { topLeft, topRight, bottomLeft, bottomRight } = borderRadius;
  return {
    topLeft: topLeft || 0,
    topRight: topRight || 0,
    bottomLeft: bottomLeft || 0,
    bottomRight: bottomRight || 0,
    [BORDER_RADIUS_SYMBOL]: true as const,
  };
}

// Static methods for Flutter-like API
BorderRadius.all = (radius: BorderRadiusValue) => {
  return {
    topLeft: radius,
    topRight: radius,
    bottomLeft: radius,
    bottomRight: radius,
    [BORDER_RADIUS_SYMBOL]: true as const,
  };
};

BorderRadius.circular = (radius: BorderRadiusValue) => BorderRadius.all(radius);

BorderRadius.only = ({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
}: {
  topLeft?: BorderRadiusValue;
  topRight?: BorderRadiusValue;
  bottomLeft?: BorderRadiusValue;
  bottomRight?: BorderRadiusValue;
}) => BorderRadius({ topLeft, topRight, bottomLeft, bottomRight });

BorderRadius.zero = BorderRadius({});

/**
 * 类型守卫：检查对象是否通过 BorderRadius 构造函数创建
 */
export function isBorderRadius(value: any): value is BorderRadius {
  return typeof value === "object" && value !== null && BORDER_RADIUS_SYMBOL in value;
}

export function borderRadiusToStyle(props?: BorderRadiusProps) {
  if (!props) return {};
  const { topLeft, topRight, bottomLeft, bottomRight } = props;

  const css: CSSProperties = {};
  if (bottomLeft) css.borderBottomLeftRadius = px2vw(bottomLeft);
  if (bottomRight) css.borderBottomRightRadius = px2vw(bottomRight);
  if (topLeft) css.borderTopLeftRadius = px2vw(topLeft);
  if (topRight) css.borderTopRightRadius = px2vw(topRight);
  return css;
}

import { px2vw } from "./px2vw";

import { CSSProperties } from "vue";
export type BorderRadiusValue = number | string;

export type BorderRadiusType =
  | BorderRadiusValue
  | {
      topLeft?: BorderRadiusValue;
      bottom?: BorderRadiusValue;
      topRight?: BorderRadiusValue;
      bottomLeft?: BorderRadiusValue;
      bottomRight?: BorderRadiusValue;
      all?: BorderRadiusValue;
    };

export function BorderRadius(borderRadius: BorderRadiusType): BorderRadiusType {
  if (typeof borderRadius === "string" || typeof borderRadius === "number") {
    return { all: borderRadius };
  }

  const { topLeft, topRight, bottomLeft, bottomRight, all } = borderRadius;
  return {
    topLeft: topLeft || all || 0,
    topRight: topRight || all || 0,
    bottomLeft: bottomLeft || all || 0,
    bottomRight: bottomRight || all || 0,
  };
}

export function borderRadiusToStyle(props?: BorderRadiusType) {
  if (!props) return {};
  if (typeof props === "string" || typeof props === "number")
    return { borderRadius: px2vw(props) };
  const { topLeft, topRight, bottomLeft, bottomRight, all } = props;
  if (all) return { borderRadius: px2vw(all) };
  const css: CSSProperties = {};
  if (bottomLeft) css.borderBottomLeftRadius = px2vw(bottomLeft);
  if (bottomRight) css.borderBottomRightRadius = px2vw(bottomRight);
  if (topLeft) css.borderTopLeftRadius = px2vw(topLeft);
  if (topRight) css.borderTopRightRadius = px2vw(topRight);
  return css;
}

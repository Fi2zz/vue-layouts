import { px2vw } from "./px2vw";
export interface EdgeInsets {
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  all?: number | string;
  horizontal?: number | string;
  vertical?: number | string;
}

export function EdgeInsets(edgeInsets: EdgeInsets): EdgeInsets {
  if (edgeInsets.all !== undefined) {
    return {
      top: edgeInsets.all,
      right: edgeInsets.all,
      bottom: edgeInsets.all,
      left: edgeInsets.all,
    };
  }
  const { top, right, bottom, left, horizontal, vertical } = edgeInsets;
  return {
    top: top ?? vertical ?? 0,
    right: right ?? horizontal ?? 0,
    bottom: bottom ?? vertical ?? 0,
    left: left ?? horizontal ?? 0,
  };
}

export function edgeInsetsToStyle(type: "margin" | "padding", edgeInsets: EdgeInsets | undefined) {
  if (!edgeInsets) return {};
  const { top, right, bottom, left } = EdgeInsets(edgeInsets);
  return {
    [`${type}Top`]: px2vw(top),
    [`${type}Right`]: px2vw(right),
    [`${type}Bottom`]: px2vw(bottom),
    [`${type}Left`]: px2vw(left),
  };
}

export const paddingToStyle = (value?: EdgeInsets) => edgeInsetsToStyle("padding", value);
export const marginToStyle = (value?: EdgeInsets) => edgeInsetsToStyle("margin", value);

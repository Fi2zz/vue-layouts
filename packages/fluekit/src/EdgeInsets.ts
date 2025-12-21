import { px2vw } from "./px2vw";

export interface EdgeInsetsProps {
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  all?: number | string;
  horizontal?: number | string;
  vertical?: number | string;
}

export type EdgeInsets = EdgeInsetsProps;

export function EdgeInsets(edgeInsets: EdgeInsetsProps): EdgeInsetsProps {
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

export function edgeInsetsToStyle(
  type: "margin" | "padding",
  edgeInsets: EdgeInsetsProps | undefined,
) {
  if (!edgeInsets) return {};
  const { top, right, bottom, left } = EdgeInsets(edgeInsets);
  return {
    [`${type}Top`]: px2vw(top),
    [`${type}Right`]: px2vw(right),
    [`${type}Bottom`]: px2vw(bottom),
    [`${type}Left`]: px2vw(left),
  };
}

export const paddingToStyle = (value?: EdgeInsetsProps) => edgeInsetsToStyle("padding", value);
export const marginToStyle = (value?: EdgeInsetsProps) => edgeInsetsToStyle("margin", value);

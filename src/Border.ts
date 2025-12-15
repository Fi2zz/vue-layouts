import { px2vw } from "./px2vw";
import { CSSProperties } from "vue";
export type BorderStyleType = "none" | "solid" | "dashed" | "dotted" | "double";
export type BorderSide = {
  width?: number | string;
  color?: string;
  style?: BorderStyleType;
};

export function Border(side: BorderSide): BorderSide {
  return {
    width: side.width ? side.width : 1,
    color: side.color || "#000",
    style: side.style || "solid",
  };
}

function borderSideToString(side?: BorderSide) {
  if (!side) return;
  const parts = [];
  const { width, color, style } = side;
  if (width) parts.push((width as number) > 1 ? px2vw(width) : width + "px");
  if (color) parts.push(color);
  if (style) parts.push(style);
  return `${parts.join(" ")}`;
}

export interface Borders extends BorderSide {
  all?: BorderSide;
  left?: BorderSide;
  top?: BorderSide;
  right?: BorderSide;
  bottom?: BorderSide;
}
export function borderToStyle(border: Borders): CSSProperties {
  if (!border) return {} as CSSProperties;
  if (
    ["width", "color", "style"].every((key) =>
      Boolean((border as unknown as BorderSide)[key as keyof BorderSide])
    )
  )
    return { border: borderSideToString(border) };
  if (border.all) return { border: borderSideToString(border.all) };
  return {
    borderLeft: borderSideToString(border.left),
    borderTop: borderSideToString(border.top),
    borderRight: borderSideToString(border.right),
    borderBottom: borderSideToString(border.bottom),
  };
}

import { px2vw } from "./px2vw";
import { CSSProperties } from "vue";
import { isPlainObject } from "./utils";
export type BorderStyleType = "none" | "solid" | "dashed" | "dotted" | "double";

// 定义唯一符号标记
const BORDER_SIDE_SYMBOL = Symbol("borderSide");
const BORDERS_SYMBOL = Symbol("borders");

export type BorderSide = {
  width?: number | string;
  color?: string;
  style?: BorderStyleType;
  [BORDER_SIDE_SYMBOL]?: true;
};

export interface Borders {
  left?: BorderSide;
  top?: BorderSide;
  right?: BorderSide;
  bottom?: BorderSide;
  [BORDERS_SYMBOL]?: true;
}

export function BorderSide(side: Omit<BorderSide, typeof BORDER_SIDE_SYMBOL>): BorderSide {
  return {
    width: side.width ? side.width : 1,
    color: side.color || "#000",
    style: side.style || "solid",
    [BORDER_SIDE_SYMBOL]: true as const,
  };
}

// Alias for compatibility if needed, but BorderSide is more accurate for a single side
export const Border = BorderSide;

// Static methods for Flutter-like API
// @ts-ignore
Border.all = ({
  color,
  width,
  style,
}: {
  color?: string;
  width?: number | string;
  style?: BorderStyleType;
} = {}) => {
  const side = Border({ color, width, style });
  return {
    top: side,
    bottom: side,
    left: side,
    right: side,
    [BORDERS_SYMBOL]: true as const,
  };
};

/**
 * 类型守卫：检查对象是否通过 Border 构造函数创建（单个边框边）
 */
export function isBorderSide(value: any): value is BorderSide {
  if (!isPlainObject(value)) return false;
  return BORDER_SIDE_SYMBOL in value;
}

/**
 * 类型守卫：检查对象是否通过 Border.all 创建（完整边框）
 */
export function isBorders(value: any): value is Borders {
  if (!isPlainObject(value)) return false;
  return BORDERS_SYMBOL in value;
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

export interface Borders {
  left?: BorderSide;
  top?: BorderSide;
  right?: BorderSide;
  bottom?: BorderSide;
}

export function borderSideToStyle(side?: BorderSide): CSSProperties {
  if (!side) return {};
  const borderStr = borderSideToString(side);
  return borderStr ? { border: borderStr } : {};
}

export function borderToStyle(border: Borders): CSSProperties {
  if (!border) return undefined as unknown as CSSProperties;

  // Strict mode: Only accept explicit side properties.
  // Legacy single-side usage and 'all' property are no longer supported.

  return {
    borderLeft: borderSideToString(border.left),
    borderTop: borderSideToString(border.top),
    borderRight: borderSideToString(border.right),
    borderBottom: borderSideToString(border.bottom),
  };
}

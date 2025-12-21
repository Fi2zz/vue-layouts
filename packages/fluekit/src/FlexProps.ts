import { BoxConstraintsProps } from "./BoxConstraints";

// ==========================================================================================
// Alignment
// ==========================================================================================

export type Alignment = keyof typeof Alignment;

/**
 * FlexAlignment 定义
 * 对应 Flutter 的 Alignment 常量
 * 用于 Container 等组件的 alignment 属性
 */
export const Alignment = {
  center: { justifyContent: "center", alignItems: "center" },
  topLeft: { justifyContent: "flex-start", alignItems: "flex-start" },
  topCenter: { justifyContent: "center", alignItems: "flex-start" },
  topRight: { justifyContent: "flex-end", alignItems: "flex-start" },
  centerLeft: { justifyContent: "flex-start", alignItems: "center" },
  centerRight: { justifyContent: "flex-end", alignItems: "center" },
  bottomLeft: { justifyContent: "flex-start", alignItems: "flex-end" },
  bottomCenter: { justifyContent: "center", alignItems: "flex-end" },
  bottomRight: { justifyContent: "flex-end", alignItems: "flex-end" },
} as const;

export function alignmentToStyle(alignment: Alignment, direction: "row" | "column" = "row") {
  const style = Alignment[alignment];
  if (!style) return {};

  if (direction === "row") return style;

  return {
    justifyContent: style.alignItems,
    alignItems: style.justifyContent,
  };
}

export function alignmentToOrigin(alignment: Alignment) {
  const map: Record<string, string> = {
    center: "center center",
    topLeft: "left top",
    topCenter: "center top",
    topRight: "right top",
    centerLeft: "left center",
    centerRight: "right center",
    bottomLeft: "left bottom",
    bottomCenter: "center bottom",
    bottomRight: "right bottom",
  };
  return map[alignment];
}

// ==========================================================================================
// Flex Logic
// ==========================================================================================

type Valueof<T> = T[keyof T];

/**
 * CrossAxisAlignment
 * 对应 CSS alignItems
 */
export const CrossAxisAlignment = {
  start: "start",
  end: "end",
  center: "center",
  stretch: "stretch",
  baseline: "baseline",
} as const;

export type CrossAxisAlignment = Valueof<typeof CrossAxisAlignment> | string;

/**
 * MainAxisAlignment
 * 对应 CSS justifyContent
 * 注意：这里的值对应的是简写，由 FlexBoxJustifyMap 转换为 CSS 值
 */
export const MainAxisAlignment = {
  start: "start",
  end: "end",
  center: "center",
  spaceBetween: "space-between",
  spaceAround: "space-around",
  spaceEvenly: "space-evenly",
} as const;

export type MainAxisAlignment = Valueof<typeof MainAxisAlignment> | string;

export type FlexBoxProps = {
  // 主轴方向 (类似 Flutter 的 Axis)
  direction?: "row" | "column" | "row-reverse" | "column-reverse" | string;
  mainAxisAlignment?: MainAxisAlignment;
  crossAxisAlignment?: CrossAxisAlignment;
  // 是否换行
  wrap?: boolean;
  // 间距
  gap?: number | string;
  // 是否填充可用空间
  expanded?: boolean;
  as?: string;
  constraints?: BoxConstraintsProps;
};

type Preset = Record<string, string>;

// 主轴对齐映射: 简写 -> CSS Value
export const FlexBoxJustifyMap: Preset = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  "space-between": "space-between",
  "space-around": "space-around",
  "space-evenly": "space-evenly",
};

// 交叉轴对齐映射: 简写 -> CSS Value
export const FlexBoxAlignMap: Preset = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  stretch: "stretch",
  baseline: "baseline",
};

/**
 * StackFit
 * 对应 Flutter 的 StackFit
 */
export const StackFit = {
  loose: "loose",
  expand: "expand",
  passthrough: "passthrough",
} as const;

export type StackFit = Valueof<typeof StackFit>;

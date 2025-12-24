import { BoxConstraintsProps } from "./BoxConstraints";
export { Alignment, alignmentToStyle, alignmentToOrigin, alignmentToFlex } from "./Alignment";

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
  gap?: number;
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

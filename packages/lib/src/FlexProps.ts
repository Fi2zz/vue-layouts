import { BoxConstraints } from "./BoxConstraints";
export type FlexAlignment = keyof typeof FlexAlignment;
// 对齐
const FlexAlignment = {
  center: { justifyContent: "center", alignItems: "center" },
  topLeft: { justifyContent: "flex-start", alignItems: "flex-start" },
  topCenter: { justifyContent: "center", alignItems: "flex-start" },
  topRight: { justifyContent: "flex-end", alignItems: "flex-start" },
  centerTop: { justifyContent: "flex-start", alignItems: "center" },
  centerLeft: { justifyContent: "flex-start", alignItems: "center" },
  centerRight: { justifyContent: "flex-end", alignItems: "center" },
  bottomLeft: { justifyContent: "flex-start", alignItems: "flex-end" },
  bottomCenter: { justifyContent: "center", alignItems: "flex-end" },
  bottomRight: { justifyContent: "flex-end", alignItems: "flex-end" },
} as const;
export function flexAlignmentToStyle(alignment: FlexAlignment) {
  return FlexAlignment[alignment];
}
type Valueof<T> = T[keyof T];
export type CrossAxisAlignment = Valueof<typeof CrossAxisAlignment> | string;
export const CrossAxisAlignment = {
  start: "start",
  end: "end",
  center: "center",
  stretch: "stretch",
  baseline: "baseline",
} as const;

export type MainAxisAlignment = Valueof<typeof MainAxisAlignment> | string;
export const MainAxisAlignment = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  spaceBetween: "space-between",
  spaceAround: "space-around",
  spaceEvenly: "space-evenly",
} as const;

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
  constraints?: BoxConstraints;
};

type Preset = Record<string, string>;
// 主轴对齐
export const FlexBoxJustifyMap: Preset = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  "space-between": "space-between",
  "space-around": "space-around",
  "space-evenly": "space-evenly",
};
// 交叉轴对齐
export const FlexBoxAlignMap: Preset = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  stretch: "stretch",
  baseline: "baseline",
};

import { px2vw } from "./px2vw";

// 定义唯一符号标记
const EDGE_INSETS_SYMBOL = Symbol("edgeInsets");

export interface EdgeInsetsProps {
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  horizontal?: number | string;
  vertical?: number | string;
}

export type EdgeInsets = EdgeInsetsProps & {
  [EDGE_INSETS_SYMBOL]?: true;
};

export function EdgeInsets(edgeInsets: EdgeInsetsProps): EdgeInsets {
  const { top, right, bottom, left, horizontal, vertical } = edgeInsets;
  return {
    top: top ?? vertical ?? 0,
    right: right ?? horizontal ?? 0,
    bottom: bottom ?? vertical ?? 0,
    left: left ?? horizontal ?? 0,
    [EDGE_INSETS_SYMBOL]: true as const,
  };
}

// Static methods for Flutter-like API
EdgeInsets.all = (value: number | string) => {
  return {
    top: value,
    right: value,
    bottom: value,
    left: value,
    [EDGE_INSETS_SYMBOL]: true as const,
  };
};

EdgeInsets.symmetric = ({
  vertical,
  horizontal,
}: {
  vertical?: number | string;
  horizontal?: number | string;
}) => EdgeInsets({ vertical, horizontal });

EdgeInsets.only = ({
  top,
  right,
  bottom,
  left,
}: {
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
}) => EdgeInsets({ top, right, bottom, left });

EdgeInsets.zero = EdgeInsets({});

/**
 * 类型守卫：检查对象是否通过 EdgeInsets 创建
 */
export function isEdgeInsets(value: any): value is EdgeInsets {
  return typeof value === "object" && value !== null && EDGE_INSETS_SYMBOL in value;
}

export function edgeInsetsToStyle(
  type: "margin" | "padding",
  edgeInsets: EdgeInsetsProps | undefined,
) {
  if (!edgeInsets) return {};

  // Re-normalize just in case it's a raw object from props that bypassed the factory
  const normalized = EdgeInsets(edgeInsets);

  return {
    [`${type}Top`]: px2vw(normalized.top),
    [`${type}Right`]: px2vw(normalized.right),
    [`${type}Bottom`]: px2vw(normalized.bottom),
    [`${type}Left`]: px2vw(normalized.left),
  };
}

export const paddingToStyle = (value?: EdgeInsetsProps) => edgeInsetsToStyle("padding", value);
export const marginToStyle = (value?: EdgeInsetsProps) => edgeInsetsToStyle("margin", value);

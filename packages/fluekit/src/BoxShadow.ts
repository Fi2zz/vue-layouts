import { px2vw } from "./px2vw";

export interface Offset {
  x: number;
  y: number;
}

export enum BlurStyle {
  normal = "normal",
  solid = "solid",
  outer = "outer",
  inner = "inner",
}

export interface BoxShadowProps {
  color?: string;
  offset?: Offset;
  blurRadius?: number;
  spreadRadius?: number;
  blurStyle?: BlurStyle;
}

// 定义唯一符号标记
const BOX_SHADOW_SYMBOL = Symbol("boxShadow");

export type BoxShadow = BoxShadowProps & {
  [BOX_SHADOW_SYMBOL]?: true;
};

export function BoxShadow(props: BoxShadowProps = {}): BoxShadow {
  return {
    color: props.color || "rgba(0, 0, 0, 0.2)",
    offset: props.offset || { x: 0, y: 0 },
    blurRadius: props.blurRadius || 0.0,
    spreadRadius: props.spreadRadius || 0.0,
    blurStyle: props.blurStyle || BlurStyle.normal,
    [BOX_SHADOW_SYMBOL]: true as const,
  };
}

/**
 * 类型守卫：检查对象是否通过 BoxShadow 构造函数创建
 */
export function isBoxShadow(value: any): value is BoxShadow {
  return typeof value === "object" && value !== null && BOX_SHADOW_SYMBOL in value;
}

export function boxShadowToCSS(shadow: BoxShadowProps): string {
  const x = px2vw(shadow.offset?.x || 0);
  const y = px2vw(shadow.offset?.y || 0);
  const blur = px2vw(shadow.blurRadius || 0);
  const spread = px2vw(shadow.spreadRadius || 0);
  const color = shadow.color || "rgba(0,0,0,0.2)";

  // CSS box-shadow doesn't fully support all Flutter BlurStyles (like solid/outer) directly in the same way.
  // 'inner' maps to 'inset'.
  // 'normal' is default.
  // 'solid' and 'outer' are not standard CSS box-shadow values.
  // For now, we map 'inner' to 'inset' and ignore others or treat as normal.
  const inset = shadow.blurStyle === BlurStyle.inner ? "inset" : "";

  return `${x} ${y} ${blur} ${spread} ${color} ${inset}`.trim();
}

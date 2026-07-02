import { CSSProperties } from "vue";
import { Alignment, alignmentToFlex } from "./Alignment";
import { BorderSide, borderSideToStyle } from "./Border";
import { BorderRadius, borderRadiusToStyle } from "./BorderRadius";
import { EdgeInsets, paddingToStyle } from "./EdgeInsets";
import { SizeType, sizeToStyle } from "./Size";
import { px2vw } from "./px2vw";
import { TextAlign, TextStyle, textStyleToStyle } from "./TextStyle";
import { Color } from "./Color";
import { resolveColor } from "./resolveColor";
import { createCopyWith, PropsWithCopyWith } from "./utils";

const STYLE_SYMBOL = Symbol("ButtonStyle");

export interface ButtonStyleProps {
  textStyle?: TextStyle;
  backgroundColor?: string | Color;
  color?: string | Color;
  foregroundColor?: string | Color; // 文本颜色
  overlayColor?: string | Color; // 暂未实现水波纹，保留接口
  shadowColor?: string | Color;
  elevation?: number;
  padding?: EdgeInsets;
  minimumSize?: SizeType;
  maximumSize?: SizeType;
  fixedSize?: SizeType;
  side?: BorderSide;
  shape?: BorderRadius; // 简化 shape 为圆角
  alignment?: Alignment;
  opacity?: number;
  flex?: number | string;
  textAlign?: TextAlign;
}

export interface ButtonStyle extends PropsWithCopyWith<ButtonStyle>, ButtonStyleProps {
  [STYLE_SYMBOL]: true;
}
export function ButtonStyle(style: ButtonStyleProps): ButtonStyle {
  return {
    ...(style || {}),
    [STYLE_SYMBOL]: true,
    copyWith: createCopyWith<ButtonStyle>((style || {}) as unknown as ButtonStyle),
  };
}
export function buttonStyleToStyle(style?: Omit<ButtonStyle, "copyWith">): CSSProperties {
  if (!style) return {};

  const css: CSSProperties = {};
  if (style.opacity !== undefined) css.opacity = style.opacity;
  if (style.textStyle) Object.assign(css, textStyleToStyle(style.textStyle));
  if (style.textAlign) css.textAlign = style.textAlign;
  if (style.backgroundColor) css.backgroundColor = resolveColor(style.backgroundColor);
  if (style.color) css.color = resolveColor(style.color);
  if (style.foregroundColor) css.color = resolveColor(style.foregroundColor);
  if (style.padding) Object.assign(css, paddingToStyle(style.padding));
  if (style.minimumSize) {
    const { width, height } = sizeToStyle(style.minimumSize) || {};
    if (width) css.minWidth = width;
    if (height) css.minHeight = height;
  }
  if (style.maximumSize) {
    const { width, height } = sizeToStyle(style.maximumSize) || {};
    if (width) css.maxWidth = width;
    if (height) css.maxHeight = height;
  }

  if (style.fixedSize) {
    const { width, height } = sizeToStyle(style.fixedSize) || {};
    if (width) {
      css.width = width;
      css.minWidth = width;
      css.maxWidth = width;
    }
    if (height) {
      css.height = height;
      css.minHeight = height;
      css.maxHeight = height;
    }
  }

  if (style.side) Object.assign(css, borderSideToStyle(style.side));
  if (style.shape) Object.assign(css, borderRadiusToStyle(style.shape));

  if (style.elevation) {
    css.boxShadow = `0px ${px2vw(style.elevation)} ${px2vw(style.elevation * 2)} ${resolveColor(style.shadowColor) || "rgba(0,0,0,0.2)"}`;
  }
  if (typeof style.flex == "undefined" || style.flex == null) {
    if (style.alignment) {
      css.display = "flex";
      css.flexDirection = "column"; // 默认垂直，但 Button 内部通常是单行，这里为了对齐需要谨慎
      // Button 内部默认是 flex 居中
      Object.assign(css, alignmentToFlex(style.alignment, "column"));
    }
  } else {
    css.display = "flex";
    Object.assign(css, alignmentToFlex(style.alignment!, "row"));
    css.flex = style.flex;
  }
  return css;
}

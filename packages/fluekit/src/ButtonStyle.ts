import { CSSProperties } from "vue";
import { Alignment, alignmentToFlex } from "./Alignment";
import { BorderSide, borderSideToStyle } from "./Border";
import { BorderRadius, borderRadiusToStyle } from "./BorderRadius";
import { EdgeInsets, paddingToStyle } from "./EdgeInsets";
import { SizeType, sizeToStyle } from "./Size";
import { px2vw } from "./px2vw";
import { TextStyle, toCSSStyle as textStyleToCSS } from "./TextStyle";

export interface ButtonStyle {
  textStyle?: TextStyle;
  backgroundColor?: string;
  foregroundColor?: string; // 文本颜色
  overlayColor?: string; // 暂未实现水波纹，保留接口
  shadowColor?: string;
  elevation?: number;
  padding?: EdgeInsets;
  minimumSize?: SizeType;
  maximumSize?: SizeType;
  fixedSize?: SizeType;
  side?: BorderSide;
  shape?: BorderRadius; // 简化 shape 为圆角
  alignment?: Alignment;
  opacity?: number;
}

export const ButtonStyle = (style: ButtonStyle): ButtonStyle => style;

export function buttonStyleToStyle(style?: ButtonStyle): CSSProperties {
  if (!style) return {};

  const css: CSSProperties = {};

  if (style.opacity !== undefined) css.opacity = style.opacity;

  if (style.textStyle) Object.assign(css, textStyleToCSS(style.textStyle));

  if (style.backgroundColor) css.backgroundColor = style.backgroundColor;
  if (style.foregroundColor) css.color = style.foregroundColor;

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
    css.boxShadow = `0px ${px2vw(style.elevation)} ${px2vw(style.elevation * 2)} ${style.shadowColor || "rgba(0,0,0,0.2)"}`;
  }

  if (style.alignment) {
    css.display = "flex";
    css.flexDirection = "column"; // 默认垂直，但 Button 内部通常是单行，这里为了对齐需要谨慎
    // Button 内部默认是 flex 居中
    Object.assign(css, alignmentToFlex(style.alignment, "column"));
  }

  return css;
}

/**
 * Flutter 风格的文本样式系统
 * 提供与 Flutter TextStyle 类似的样式配置选项
 */

import { CSSProperties } from "vue";
import { px2vw } from "./px2vw";
// import { build } from "vite";
/**
 * 字体粗细枚举，对应 Flutter 的 FontWeight
 */
export enum FontWeight {
  w100 = "100",
  w200 = "200",
  w300 = "300",
  w400 = "400", // normal
  w500 = "500",
  w600 = "600",
  w700 = "700", // bold
  w800 = "800",
  w900 = "900",
  normal = "400",
  bold = "bold",
  bolder = "bolder",
}

/**
 * 字体样式枚举，对应 Flutter 的 FontStyle
 */
export enum FontStyle {
  normal = "normal",
  italic = "italic",
}

/**
 * 文本装饰枚举，对应 Flutter 的 TextDecoration
 */
export enum TextDecoration {
  none = "none",
  underline = "underline",
  overline = "overline",
  lineThrough = "line-through",
}

/**
 * 文本装饰样式枚举
 */
export enum TextDecorationStyle {
  solid = "solid",
  double = "double",
  dotted = "dotted",
  dashed = "dashed",
  wavy = "wavy",
}

/**
 * 文本对齐方式枚举，对应 Flutter 的 TextAlign
 */
export enum TextAlign {
  left = "left",
  right = "right",
  center = "center",
  justify = "justify",
  start = "start",
  end = "end",
}

/**
 * 文本溢出处理方式枚举，对应 Flutter 的 TextOverflow
 */
export enum TextOverflow {
  clip = "clip",
  fade = "fade",
  ellipsis = "ellipsis",
  visible = "visible",
}

/**
 * 文本基线枚举
 */
export enum TextBaseline {
  alphabetic = "alphabetic",
  ideographic = "ideographic",
}

/**
 * 文本阴影配置接口
 */
export interface TextShadow {
  /** 阴影颜色 */
  color?: string;
  /** 水平偏移 */
  offsetX?: number;
  /** 垂直偏移 */
  offsetY?: number;
  /** 模糊半径 */
  blurRadius?: number;
}

import type { Size } from "./Size";
import { BoxConstraints } from "./BoxConstraints";

/**
 * Flutter 风格的文本样式接口
 * 提供丰富的文本样式配置选项
 */
export type TextStyle = Partial<Omit<CSSProperties, "textAlign">> &
  Size &
  Omit<BoxConstraints, "maxWidth" | "maxHeight" | "minHeight" | "minWidth"> & {
    /** 字体颜色 */
    color?: string;

    /** 背景颜色 */
    // backgroundColor?: string;

    /** 字体大小（像素） */
    fontSize?: number | string;

    /** 字体粗细 */
    fontWeight?: FontWeight | number | string;

    /** 字体样式（正常/斜体） */
    fontStyle?: FontStyle;

    /** 字体族 */
    fontFamily?: string;

    /** 字母间距 */
    letterSpacing?: number | string;

    /** 单词间距 */
    wordSpacing?: number;

    /** 行高 */
    lineHeight?: number | string;

    /** 文本装饰 */
    decoration?: TextDecoration;

    /** 文本装饰颜色 */
    decorationColor?: string;

    /** 文本装饰样式 */
    decorationStyle?: TextDecorationStyle;

    /** 文本装饰厚度 */
    decorationThickness?: number;

    /** 文本阴影 */
    shadows?: TextShadow[];
    /** 文本对齐 */
    textAlign?: TextAlign;

    /** 文本溢出处理 */
    overflow?: TextOverflow;

    userSelect?: boolean;
    maxWidth?: number | string;
    maxHeight?: number | string;
    minHeight?: number | string;
    minWidth?: number | string;

    background?: string;
    backgroundClip?: string;
    textFillColor?: string;
  };

export function toCSSStyle(props: TextStyle): CSSProperties {
  const cssStyle: CSSProperties = {};
  if (props.color) cssStyle.color = props.color;

  if (props.fontSize) {
    cssStyle.fontSize =
      typeof props.fontSize === "number"
        ? px2vw(props.fontSize)
        : props.fontSize;
  }

  if (props.fontWeight) {
    cssStyle.fontWeight = props.fontWeight.toString();
  }

  if (props.fontStyle) {
    cssStyle.fontStyle = props.fontStyle;
  }

  if (props.fontFamily) {
    cssStyle.fontFamily = props.fontFamily;
  }

  if (props.letterSpacing) {
    cssStyle.letterSpacing = px2vw(props.letterSpacing);
  }

  if (props.wordSpacing) {
    cssStyle.wordSpacing = px2vw(props.wordSpacing);
  }

  if (props.lineHeight) {
    cssStyle.lineHeight = props.lineHeight.toString();
  }

  if (props.decoration) {
    cssStyle.textDecoration = props.decoration;
  }

  if (props.decorationColor) {
    cssStyle.textDecorationColor = props.decorationColor;
  }

  if (props.decorationStyle) {
    cssStyle.textDecorationStyle = props.decorationStyle;
  }

  if (props.decorationThickness) {
    cssStyle.textDecorationThickness = px2vw(props.decorationThickness);
  }

  if (props.textAlign) {
    cssStyle.textAlign = props.textAlign;
  }

  if (props.overflow) {
    switch (props.overflow) {
      case TextOverflow.ellipsis:
        cssStyle.overflow = "hidden";
        cssStyle.textOverflow = "ellipsis";
        cssStyle.whiteSpace = "nowrap";
        break;
      case TextOverflow.clip:
        cssStyle.overflow = "hidden";
        break;
      case TextOverflow.visible:
        cssStyle.overflow = "visible";
        break;
    }
  }

  if (props.shadows && props.shadows.length > 0) {
    const shadowStrings = props.shadows.map((shadow) => {
      const offsetX = shadow.offsetX || 0;
      const offsetY = shadow.offsetY || 0;
      const blurRadius = shadow.blurRadius || 0;
      const color = shadow.color || "rgba(0,0,0,0.5)";
      return `${px2vw(offsetX)} ${px2vw(offsetY)} ${px2vw(blurRadius)} ${color}`;
    });
    cssStyle.textShadow = shadowStrings.join(", ");
  }

  return cssStyle;
}

export function TextStyle(
  initial: TextStyle = {},
  cloned: TextStyle = {}
): TextStyle {
  return {
    ...cloned,
    ...initial,
  } as TextStyle;
}

export function textStyleToStyle(props: TextStyle = {}): CSSProperties {
  const css: CSSProperties = {};
  if (props.color) css.color = props.color;
  if (props.fontSize) css.fontSize = px2vw(props.fontSize);
  if (props.fontWeight) css.fontWeight = props.fontWeight.toString();
  if (props.fontStyle) css.fontStyle = props.fontStyle;
  if (props.fontFamily) css.fontFamily = props.fontFamily;
  if (props.letterSpacing) css.letterSpacing = px2vw(props.letterSpacing);
  if (props.maxHeight) css.maxHeight = props.maxHeight;
  if (props.maxWidth) css.maxWidth = props.maxWidth;
  if (props.minHeight) css.minHeight = props.minHeight;
  if (props.minWidth) css.minWidth = props.minWidth;
  if (props.width) css.width = props.width;
  if (props.height) css.height = props.height;
  if (props.background) css.background = props.background;
  if (props.backgroundClip) css.backgroundClip = props.backgroundClip;
  if (props.textFillColor) {
    css.WebkitTextFillColor = props.textFillColor;
    //@ts-ignore
    css.textFillColor = props.textFillColor;
    //@ts-ignore
    css["text-fill-color"] = props.textFillColor;
  }

  if (props.wordSpacing) {
    css.wordSpacing = px2vw(props.wordSpacing);
  }

  if (props.lineHeight) {
    css.lineHeight = props.lineHeight.toString();
  }

  if (props.decoration) {
    css.textDecoration = props.decoration;
  }

  if (props.decorationColor) {
    css.textDecorationColor = props.decorationColor;
  }

  if (props.decorationStyle) {
    css.textDecorationStyle = props.decorationStyle;
  }

  if (props.decorationThickness) {
    css.textDecorationThickness = px2vw(props.decorationThickness);
  }

  if (props.textAlign) {
    css.textAlign = props.textAlign;
  }

  if (props.overflow) {
    switch (props.overflow) {
      case TextOverflow.ellipsis:
        css.overflow = "hidden";
        css.textOverflow = "ellipsis";
        css.whiteSpace = "nowrap";
        break;
      case TextOverflow.clip:
        css.overflow = "hidden";
        break;

      case TextOverflow.fade:
        css.overflow = "hidden";
        css.whiteSpace = "nowrap";
        css.maskImage =
          "linear-gradient(to right, black 80%, transparent 100%)";
        break;
      case TextOverflow.visible:
        css.overflow = "visible";
        break;
    }
  }

  if (props.shadows && props.shadows.length > 0) {
    const shadowStrings = props.shadows.map((shadow) => {
      const offsetX = shadow.offsetX || 0;
      const offsetY = shadow.offsetY || 0;
      const blurRadius = shadow.blurRadius || 0;
      const color = shadow.color || "rgba(0,0,0,0.5)";
      return `${px2vw(offsetX)} ${px2vw(offsetY)} ${px2vw(blurRadius)} ${color}`;
    });
    css.textShadow = shadowStrings.join(", ");
  }

  return css;
}

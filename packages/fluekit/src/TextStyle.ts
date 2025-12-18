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
  normal = "normal",
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
/**
 * 文本方向枚举，对应 Flutter 的 TextDirection
 */
export enum TextDirection {
  rtl = "rtl",
  ltr = "ltr",
}

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

export interface TextStyle {
  inherit?: boolean;
  color?: string;
  backgroundColor?: string;
  fontSize?: number | string;
  fontWeight?: FontWeight | number | string;
  fontStyle?: FontStyle;
  letterSpacing?: number | string;
  wordSpacing?: number;
  textBaseline?: TextBaseline;
  height?: number | string; // 对应 CSS lineHeight
  leadingDistribution?: any; // Web 暂无直接对应，保留占位
  locale?: any; // Web 暂无直接对应，保留占位
  foreground?: CSSProperties; // 对应 Paint，这里简化为 CSSProperties
  background?: CSSProperties; // 对应 Paint，这里简化为 CSSProperties
  shadows?: TextShadow[];
  fontFeatures?: any; // 对应 font-feature-settings
  fontVariations?: any; // 对应 font-variation-settings
  decoration?: TextDecoration;
  decorationColor?: string;
  decorationStyle?: TextDecorationStyle;
  decorationThickness?: number;
  debugLabel?: string;
  fontFamily?: string;
  fontFamilyFallback?: string[];
  package?: string; // 用于构建 fontFamily
  overflow?: TextOverflow;
}

const _kColorForegroundWarning =
  "Cannot provide both a color and a foreground\n" +
  'The color argument is just a shorthand for "foreground: Paint()..color = color".';

const _kColorBackgroundWarning =
  "Cannot provide both a backgroundColor and a background\n" +
  'The backgroundColor argument is just a shorthand for "background: Paint()..color = backgroundColor".';

/**
 * 验证 TextStyle 属性冲突
 */
function validateTextStyle(style: TextStyle) {
  if (style.color && style.foreground) {
    console.warn(_kColorForegroundWarning);
  }
  if (style.backgroundColor && style.background) {
    console.warn(_kColorBackgroundWarning);
  }
}

/**
 * 辅助函数：构建 fontFamily
 */
function buildFontFamily(
  fontFamily?: string,
  pkg?: string,
  fontFamilyFallback?: string[],
): string | undefined {
  let family = fontFamily;
  if (pkg && family) {
    // 模拟 Flutter 的 package 字体路径逻辑，Web 中可能需要调整
    // 这里暂时保留原样，但在 Web 中通常直接使用 fontFamily 名称
    family = `packages/${pkg}/${family}`;
  }
  if (fontFamilyFallback && fontFamilyFallback.length > 0) {
    return [family, ...fontFamilyFallback].filter(Boolean).join(", ");
  }
  return family;
}

export function toCSSStyle(props: TextStyle = {}): CSSProperties {
  validateTextStyle(props);

  const cssStyle: CSSProperties = {};

  // 基础重置
  cssStyle.margin = 0;
  cssStyle.padding = 0;
  cssStyle.border = "none";
  // cssStyle.backgroundColor = "transparent"; // 移除默认 transparent，避免覆盖
  cssStyle.fontSmooth = "antialiased";
  cssStyle.MozOsxFontSmoothing = "grayscale";
  cssStyle.textRendering = "optimizeLegibility";
  cssStyle.wordBreak = "break-word";
  cssStyle.overflowWrap = "break-word";
  cssStyle.transition = "all 0.2s ease-in-out";

  // 1. Color / Foreground
  if (props.foreground) {
    // 优先使用 foreground (Paint -> CSS)
    Object.assign(cssStyle, props.foreground);
  } else if (props.color) {
    cssStyle.color = props.color;
  }

  // 2. BackgroundColor / Background
  if (props.background) {
    // 优先使用 background (Paint -> CSS)
    Object.assign(cssStyle, props.background);
  } else if (props.backgroundColor) {
    cssStyle.backgroundColor = props.backgroundColor;
  }

  // 3. Font Attributes
  if (props.fontSize) {
    cssStyle.fontSize = typeof props.fontSize === "number" ? px2vw(props.fontSize) : props.fontSize;
  }

  if (props.fontWeight) {
    cssStyle.fontWeight = props.fontWeight.toString();
  }

  if (props.fontStyle) {
    cssStyle.fontStyle = props.fontStyle;
  }

  // 4. FontFamily & Fallback & Package
  const fontFamily = buildFontFamily(props.fontFamily, props.package, props.fontFamilyFallback);
  if (fontFamily) {
    cssStyle.fontFamily = fontFamily;
  }

  // 5. Spacing
  if (props.letterSpacing) {
    cssStyle.letterSpacing = px2vw(props.letterSpacing);
  }

  if (props.wordSpacing) {
    cssStyle.wordSpacing = px2vw(props.wordSpacing);
  }

  // 6. LineHeight (Flutter height is a multiplier of fontSize if no unit, but here we simplify)
  if (props.height) {
    // Flutter's height is a multiplier, Web's lineHeight can be unitless (multiplier) or length
    // Assume number is multiplier (unitless)
    cssStyle.lineHeight = props.height.toString();
  }

  // 7. Decoration
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

  // 8. Overflow
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
      case TextOverflow.fade:
        // 保留之前的 fade 实现
        cssStyle.overflow = "hidden";
        cssStyle.whiteSpace = "nowrap";
        cssStyle.maskImage = "linear-gradient(to right, black 80%, transparent 100%)";
        break;
    }
  }

  // 9. Shadows
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

  // 10. Font Features / Variations (Basic support)
  if (props.fontFeatures) {
    cssStyle.fontFeatureSettings = JSON.stringify(props.fontFeatures); // 简化处理
  }
  if (props.fontVariations) {
    cssStyle.fontVariationSettings = JSON.stringify(props.fontVariations); // 简化处理
  }

  return cssStyle;
}

export function TextStyle(initial: TextStyle = {}, cloned: TextStyle = {}): TextStyle {
  const merged = {
    ...cloned,
    ...initial,
  };

  // 模拟构造函数中的初始化逻辑
  // : fontFamily = package == null ? fontFamily : 'packages/$package/$fontFamily'
  // 注意：这里只是构建数据对象，真正的样式转换在 toCSSStyle 中

  validateTextStyle(merged);
  return merged;
}

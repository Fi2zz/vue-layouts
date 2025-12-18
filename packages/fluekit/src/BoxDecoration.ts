import { borderRadiusToStyle, BorderRadiusType } from "./BorderRadius";
import { CSSProperties } from "vue";
import { px2vw } from "./px2vw";
import { borderToStyle, type Borders } from "./Border";

type Valueof<T> = T[keyof T];

// ==========================================================================================
// BoxFit & ImageFit
// ==========================================================================================

export type BoxFit = Valueof<typeof BoxFit>;
export const BoxFit = {
  fitWidth: "fitWidth",
  fitHeight: "fitHeight",
  fill: "fill",
  contain: "contain",
  cover: "cover",
  none: "none",
  scaleDown: "scaleDown",
} as const;

export type ImageRepeat = "repeat" | "repeat-x" | "repeat-y" | "no-repeat";

// 内部使用的 CSS background-size 映射
const ImageFitMap: Record<string, string> = {
  fill: "100% 100%",
  contain: "contain",
  cover: "cover",
  none: "auto", // background-size: auto 是默认值，对应 none
  scaleDown: "contain", // scale-down 行为复杂，CSS background-size 不直接支持，通常近似为 contain 或 auto
  fitWidth: "100% auto",
  fitHeight: "auto 100%",
};

export type BorderRadiusValue = number | string;
export type BorderRadius = BorderRadiusType;
export type Overflow = "none" | "visible" | "hidden" | "scroll" | "auto";

// ==========================================================================================
// Alignment
// ==========================================================================================

const cssPoisitions: Record<string, string> = {
  top: "top",
  bottom: "bottom",
  left: "left",
  right: "right",
  center: "center",
};

export type BoxAlignment = keyof typeof BoxAlignment | string;
export const BoxAlignment = {
  center: "center",
  top: "top",
  bottom: "bottom",
  left: "left",
  right: "right",
  topLeft: "left top",
  topCenter: "center top",
  topRight: "right top",
  centerLeft: "left center",
  centerRight: "right center",
  bottomLeft: "left bottom",
  bottomCenter: "center bottom",
  bottomRight: "right bottom",
} as const;

// ==========================================================================================
// URL Normalization
// ==========================================================================================

let _baseUrl = "";

// 尝试安全地获取 VITE_BASE_URL
try {
  // @ts-expect-error
  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_BASE_URL) {
    // @ts-expect-error
    _baseUrl = import.meta.env.VITE_BASE_URL;
  }
} catch {
  // ignore
}

export function setBaseUrl(url: string) {
  _baseUrl = url;
}

export function normalizeSrc(src: string) {
  if (!src) return "";

  // 1. 绝对路径或特殊协议直接返回
  if (/^(https?:|file:|blob:|data:|\/\/)/i.test(src)) {
    return src;
  }

  // 1.1 CSS Gradient 不处理
  if (/^(linear|radial|conic|repeating-linear|repeating-radial)-gradient\(/.test(src)) {
    return src;
  }

  // 2. 如果没有 base，直接返回
  if (!_baseUrl || _baseUrl === "/") return src;

  // 3. 移除 base 结尾的 slash 和 src 开头的 slash，统一拼接
  const cleanBase = _baseUrl.endsWith("/") ? _baseUrl.slice(0, -1) : _baseUrl;

  if (src.startsWith(cleanBase)) {
    return src;
  }

  const cleanSrc = src.startsWith("/") ? src.slice(1) : src;

  return `${cleanBase}/${cleanSrc}`;
}

export type ImageProvider = string;

export const NetworkImage = (url: string) => url;
export const AssetImage = (url: string) => url;

export interface DecorationImage {
  image: ImageProvider;
  fit?: BoxFit;
  alignment?: BoxAlignment;
  repeat?: ImageRepeat;
  blendMode?: string;
  attachment?: string;
  clip?: string;
  origin?: string;
}

export function DecorationImage(props: DecorationImage): DecorationImage {
  return props as DecorationImage;
}

/**
 * BoxDecoration接口定义
 */
export type BoxDecoration = {
  color?: string;
  border?: Borders;
  borderRadius?: BorderRadius;
  boxShadow?: BoxShadow | BoxShadow[];
  gradient?: string;
  image?: DecorationImage;
  overflow?: Overflow;
  opacity?: number | string;
};

// 简单的 BoxShadow 接口定义，之前缺失
export interface BoxShadow {
  color?: string;
  offset?: { x: number; y: number };
  blurRadius?: number;
  spreadRadius?: number;
  inset?: boolean;
}

const isGradient = (url: string) =>
  /^(linear|radial|conic|repeating-linear|repeating-radial)-gradient\(/.test(url);

export function decorationImageToStyle(di: DecorationImage): CSSProperties {
  if (!di) return {};
  const css: CSSProperties = {};
  const image = normalizeSrc(di.image);
  css.backgroundImage = isGradient(image) ? image : `url(${image})`;

  if (di.fit) {
    // 优先使用映射
    css.backgroundSize = ImageFitMap[di.fit] || di.fit;
  }

  css.backgroundAttachment = di.attachment;
  css.backgroundBlendMode = di.blendMode;
  css.backgroundClip = di.clip;
  css.backgroundOrigin = di.origin;
  css.backgroundRepeat = di.repeat ?? "no-repeat";

  if (di.alignment) {
    // 尝试直接映射常量
    const alignment = BoxAlignment[di.alignment as keyof typeof BoxAlignment];
    if (alignment) {
      css.backgroundPosition = alignment;
    } else {
      // 处理自定义字符串，如 "10px 20px"
      const alignmentStr = (di.alignment as string) || "";
      let [x, y] = alignmentStr.split(" ");

      // 如果不是关键字且存在值，尝试转换单位
      if (x && !cssPoisitions[x]) x = px2vw(x);
      if (y && !cssPoisitions[y]) y = px2vw(y);

      // 如果只有一个值，background-position 标准行为是 y 默认为 center
      if (x && !y) y = "center";

      css.backgroundPosition = `${x} ${y}`;
    }
  }
  return css;
}

export function boxDecorationToStyle(decoration?: BoxDecoration): CSSProperties {
  if (!decoration) return {};
  const { color, border, borderRadius, boxShadow, gradient, image, overflow, opacity } = decoration;

  const style: CSSProperties = {};

  if (color) style.backgroundColor = color;
  if (opacity !== undefined) style.opacity = opacity;
  if (overflow) style.overflow = overflow;

  if (gradient) style.backgroundImage = gradient;

  // image 可能会覆盖 gradient，如果两者共存，CSS通常支持多背景，但这里简化处理
  if (image) {
    Object.assign(style, decorationImageToStyle(image));
  }

  if (border) Object.assign(style, borderToStyle(border));
  if (borderRadius) Object.assign(style, borderRadiusToStyle(borderRadius));

  if (boxShadow) {
    const shadows = Array.isArray(boxShadow) ? boxShadow : [boxShadow];
    style.boxShadow = shadows
      .map((s) => {
        const x = px2vw(s.offset?.x || 0);
        const y = px2vw(s.offset?.y || 0);
        const blur = px2vw(s.blurRadius || 0);
        const spread = px2vw(s.spreadRadius || 0);
        const color = s.color || "rgba(0,0,0,0.2)";
        const inset = s.inset ? "inset" : "";
        return `${x} ${y} ${blur} ${spread} ${color} ${inset}`.trim();
      })
      .join(", ");
  }

  return style;
}

export function BoxDecoration(props?: BoxDecoration): BoxDecoration {
  return props as BoxDecoration;
}

// 简单的辅助函数，实际使用可能更复杂
export function LinearGradient(direction: string, ...colors: string[]) {
  return `linear-gradient(${direction}, ${colors.join(", ")})`;
}

/**
 * Clip
 * 对应 Flutter 的 Clip
 */
export const Clip = {
  none: "none",
  hardEdge: "hardEdge",
  antiAlias: "antiAlias",
  antiAliasWithSaveLayer: "antiAliasWithSaveLayer",
} as const;

export type Clip = keyof typeof Clip;

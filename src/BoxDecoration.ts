import { borderRadiusToStyle, BorderRadiusType } from "./BorderRadius";
import { CSSProperties } from "vue";
import { px2vw } from "./px2vw";
import { borderToStyle, type Borders } from "./Border";
type Valueof<T> = T[keyof T];
export type BoxFit = Valueof<typeof BoxFit>;
export const BoxFit = {
  fitWidth: "fit-width",
  fitHeight: "fit-height",
  fill: "fill",
  contain: "contain",
  cover: "cover",
  none: "none",
  scaleDown: "scale-down",
};
export type ImageRepeat = "repeat" | "repeat-x" | "repeat-y" | "no-repeat";
enum ImageFit {
  fill = "100% 100%",
  contain = "contain",
  cover = "cover",
  none = "none",
  scaleDown = "scale-down",
  fitWidth = "auto 100%",
  fitHeight = "100% auto",
}
export type BorderRadiusValue = number | string;
export type BorderRadius = BorderRadiusType;
export type Overflow = "none" | "visible" | "hidden" | "scroll" | "auto";
const cssPoisitions = {
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
  "top center": "center top",
  topCenter: "center top",
  "top left": "left top",
  topLeft: "left top",
  "top right": "right top",
  topRight: "right top",
  "bottom left": "left bottom",
  bottomLeft: "left bottom",
  "bottom right": "right bottom",
  bottomRight: "right bottom",
  "bottom center": "center bottom",
  bottomCenter: "center bottom",
};

//@ts-ignore
const base = import.meta.env.VITE_BASE_URL;
export function normalizeSrc(src: string) {
  //base 64 的不用管
  if (src.startsWith("data:image/")) return src;
  if (src && !src.startsWith("http")) {
    if (!src.startsWith(base)) {
      if (src.startsWith("/")) src = base + src;
      else src = base + "/" + src;
    }
  }
  return src;
}

export interface DecorationImage {
  image: string;
  fit?: BoxFit;
  alignment?: BoxAlignment;
  repeat?: ImageRepeat;
  position?: string;
  size?: string;
  blendMode?: string;
  attachment?: string;
  clip?: string;
  origin?: string;
}
type DecorationImageWithoutImage = Omit<DecorationImage, "image"> & {
  image?: string;
  src?: string;
};

export function DecorationImage(
  props: DecorationImageWithoutImage = {},
  cloned: DecorationImageWithoutImage = {}
): DecorationImage {
  return {
    ...cloned,
    ...props,
    image: normalizeSrc(props.image || props.src || ""),
  };
}

/**
 * BoxDecoration接口定义
 */
export type BoxDecoration = {
  color?: string;
  border?: Borders;
  borderRadius?: BorderRadius;
  boxShadow?: BoxShadow;
  gradient?: string;
  image?: DecorationImage;
  overflow?: Overflow;
  opacity?: number | string;
};

const REBackgroundSize = /\d+(%|px|vw)?(\s)?(\d+(%|px|vw))?/;
export function decorationImageToStyle(di: DecorationImage): CSSProperties {
  if (!di) return {};
  const css: CSSProperties = {};
  css.backgroundImage = `url(${di.image})`;
  if (di.size) {
    if (REBackgroundSize.test(di.size)) {
      const [x, y] = di.size.split(" ");
      if (x && y) css.backgroundSize = `${px2vw(x) ?? x} ${px2vw(y) ?? y}`;
    } else {
      css.backgroundSize = di.size;
    }
  } else if (di.fit) {
    switch (di.fit) {
      case BoxFit.cover:
        css.backgroundSize = ImageFit.cover;
        break;
      case BoxFit.contain:
        css.backgroundSize = ImageFit.contain;
        break;
      case BoxFit.fill:
        css.backgroundSize = ImageFit.fill;
        break;
      case BoxFit.none:
        css.backgroundSize = ImageFit.none;
        break;
      case BoxFit.fitHeight:
        css.backgroundSize = ImageFit.fitHeight;
        break;
      case BoxFit.fitWidth:
        css.backgroundSize = ImageFit.fitWidth;
        break;
      case BoxFit.scaleDown:
        css.backgroundSize = ImageFit.scaleDown;
        break;
    }
  }
  css.backgroundAttachment = di.attachment;
  css.backgroundBlendMode = di.blendMode;
  css.backgroundClip = di.clip;
  css.backgroundOrigin = di.origin;
  css.backgroundRepeat = di.repeat ?? "no-repeat";
  if (di.position || di.alignment) {
    //@ts-ignore
    let alignment: string = BoxAlignment[di.alignment];
    if (alignment) {
      css.backgroundPosition = alignment;
    } else {
      let alignment = di.position || di.alignment || "";

      let pos = "";
      let [x, y] = alignment.split(" ");
      //@ts-ignore
      if (!cssPoisitions[x] && x) x = px2vw(x);
      //@ts-ignore
      if (!cssPoisitions[y] && y) y = px2vw(y);
      pos = `${x} ${y}`;
      css.backgroundPosition = pos;
    }
  }
  return css;
}

export function BoxDecoration(
  props: BoxDecoration = {},
  cloned: BoxDecoration = {}
): BoxDecoration {
  return { ...cloned, ...props } as BoxDecoration;
}
export function LinearGradient(direction: string, ...colors: string[]) {
  return `linear-gradient(${direction}, ${colors.join(", ")})`;
}

export function RadialGradient(shape: string, ...colors: string[]) {
  return `radial-gradient(${shape}, ${colors.join(", ")})`;
}

interface BoxShadow {
  offsetX?: number;
  offsetY?: number;
  blurRadius?: number;
  spreadRadius?: number;
  color?: string;
}

export function BoxShadow(boxShadow: BoxShadow = {}): BoxShadow {
  const {
    offsetX = 0,
    offsetY = 2,
    blurRadius = 4,
    spreadRadius = 0,
    color = "rgba(0, 0, 0, 0.1)",
  } = boxShadow;
  return { offsetX, offsetY, blurRadius, spreadRadius, color };
}

function boxShadowToStyle(boxShadow?: BoxShadow) {
  if (!boxShadow) return;

  const {
    offsetX = 0,
    offsetY = 2,
    blurRadius = 4,
    spreadRadius = 0,
    color = "rgba(0, 0, 0, 0.1)",
  } = boxShadow;
  return {
    boxShadow: `${px2vw(offsetX)} ${px2vw(offsetY)} ${px2vw(blurRadius)} ${px2vw(spreadRadius)} ${color}`,
  };
}

export function boxDecorationToStyle(decoration?: BoxDecoration) {
  if (!decoration) return;
  const style: CSSProperties = {};
  style.backgroundColor = decoration.color;
  Object.assign(style, boxShadowToStyle(decoration.boxShadow));
  //@ts-ignore
  Object.assign(style, borderToStyle(decoration.border));
  Object.assign(style, borderRadiusToStyle(decoration.borderRadius));
  //@ts-ignore
  Object.assign(style, decorationImageToStyle(decoration.image));
  // 背景优先级：gradient > DecorationImage
  if (decoration.gradient) style.backgroundImage = decoration.gradient;
  style.opacity = clampOpacity(decoration.opacity);
  return style;
}

function clampOpacity(opacity?: number | string) {
  if (typeof opacity == "undefined" || opacity == null) return undefined;
  return Math.max(0, Math.min(1, opacity as unknown as number));
}

<template>
  <component :is="tag" :style="computedStyle" v-bind="_events">
    <slot> {{ data }} </slot>
  </component>
</template>

<script setup lang="ts">
import { computed, CSSProperties, type ComputedRef } from "vue";
import {
  TextAlign,
  TextDirection,
  TextOverflow,
  TextStyle,
  toCSSStyle,
  isTextStyle,
} from "./TextStyle";
import { isUndefined, validateInDev } from "./utils";

defineOptions({ inheritAttrs: false });

interface Props {
  /** 文本内容 */
  data?: string | number;
  /** 文本样式 */
  style?: TextStyle;
  /** 文本对齐方式 */
  textAlign?: TextAlign;
  /** 文本方向 */
  textDirection?: TextDirection;
  /** 是否自动换行 */
  softWrap?: boolean;
  /** 溢出处理 */
  overflow?: TextOverflow;
  /** 最大行数 */
  maxLines?: number;
  /** 语义标签 */
  semanticsLabel?: string;
  /** 渲染标签 (Web 特有) */
  tag?: string;
}

import { useStyles } from "./StyleProvider";
import { useGestureStyle, useGestureEvents } from "./useGesture";

const _styles = useStyles() as unknown as ComputedRef<CSSProperties>;

const props = withDefaults(defineProps<Props>(), {
  tag: "span",
  softWrap: true,
});
// 注入手势上下文
const events = useGestureEvents();

const _events = computed(() => {
  if ((_styles.value as unknown as CSSProperties).pointerEvents == "none") {
    return {};
  }

  return events || {};
});

const data = computed(() => {
  const text = props.data;
  if (!isUndefined(text) && text != null) return text.toString();
  return "";
});

// 校验 Text 属性
const validateProps = () => {
  // 1. assert(style must be created using TextStyle constructor)
  if (props.style && !isTextStyle(props.style)) {
    console.warn(
      "[Text] style must be created using TextStyle constructor.\nExample: style=\"TextStyle({ color: \'red\', fontSize: 16 })\".",
    );
  }
};

validateInDev(validateProps);

// 合并手势样式
const gestureStyle = useGestureStyle();

const computedStyle = computed(() => {
  // 1. Convert TextStyle to CSS
  const css: CSSProperties = props.style ? toCSSStyle(props.style) : {};

  // 2. Apply Text Props (Override TextStyle)

  // TextAlign
  if (props.textAlign) {
    css.textAlign = props.textAlign;
  }

  // TextDirection
  if (props.textDirection) {
    css.direction = props.textDirection;
  }

  // SoftWrap & Overflow logic
  if (props.softWrap === false) {
    css.whiteSpace = "nowrap";
  }

  // Overflow
  const effectiveOverflow = props.overflow ?? props.style?.overflow;
  if (effectiveOverflow) {
    switch (effectiveOverflow) {
      case TextOverflow.ellipsis:
        css.textOverflow = "ellipsis";
        css.overflow = "hidden";
        if (props.softWrap === false) {
          css.whiteSpace = "nowrap";
        }
        break;
      case TextOverflow.clip:
        css.overflow = "hidden";
        css.textOverflow = "clip";
        break;
      case TextOverflow.visible:
        css.overflow = "visible";
        break;
      case TextOverflow.fade:
        css.overflow = "hidden";
        css.whiteSpace = "nowrap";
        css.maskImage = "linear-gradient(to right, black 80%, transparent 100%)";
        css.WebkitMaskImage = "linear-gradient(to right, black 80%, transparent 100%)";
        break;
    }
  }

  // MaxLines (Webkit line clamp)
  if (props.maxLines && props.maxLines > 0) {
    css.overflow = "hidden";
    css.display = "-webkit-box";
    css.WebkitBoxOrient = "vertical";
    css.WebkitLineClamp = props.maxLines.toString();
    // Ensure wrapping is enabled for multi-line clamp to work
    // If softWrap is false, line clamp won't work as expected for single line,
    // but usually maxLines > 1 implies wrapping.
    if (props.softWrap !== false) {
      css.whiteSpace = "normal";
    }
  } else {
    // Default display for Text
    if (!css.display) {
      css.display = props.tag === "span" ? "inline-block" : "block";
    }
  }

  // 处理 behavior
  Object.assign(css, gestureStyle);

  return css;
});
</script>

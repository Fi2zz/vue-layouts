<template>
  <button :style="computedStyle" :disabled="disabled" :type="type" v-bind="events">
    <slot>{{ props.text }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed, ref, type CSSProperties } from "vue";
import { BorderRadius } from "./BorderRadius";
import { ButtonStyle, buttonStyleToStyle } from "./ButtonStyle";
import { Color } from "./Color";
import { resolveColor } from "./resolveColor";
import { EdgeInsets } from "./EdgeInsets";
import { useStyles } from "./StyleProvider";
import { events as EventTypes, useGestures, type Behavior } from "./useGesture";
defineOptions({ inheritAttrs: false });
interface Props {
  // 交互属性
  disabled?: boolean;
  behavior?: Behavior;
  text?: string;
  // 样式属性
  style?: ButtonStyle;
  // iOS 风格属性
  color?: string | Color; // 背景色快捷方式 (仅对 variant='ios' 生效或作为默认背景)
  disabledColor?: string | Color;
  pressedOpacity?: number;
  padding?: EdgeInsets;
  borderRadius?: BorderRadius;
  type?: HTMLButtonElement["type"];
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  behavior: "opaque",
  pressedOpacity: 0.4,
  disabledColor: "rgba(0, 0, 0, 0.2)",
});
const emit = defineEmits(EventTypes);

const doEmit = (type: string, ...args: any[]) => {
  if (type === "pan-start") isPressed.value = true;
  if (type === "pan-end" || type === "pan-cancel") isPressed.value = false;
  emit(type, ...args);
};
//@ts-expect-error conflict
const events = useGestures({ emit: doEmit });
const _styles = useStyles();
const isPressed = ref(false);

const css: CSSProperties = {
  position: "relative",
  appearance: "none",
  border: "0",
  outline: "0",
  background: "transparent",
  padding: "0",
  margin: "0",
  cursor: "pointer",
  userSelect: "none",
  WebkitTapHighlightColor: "transparent",
  fontFamily: "inherit",
  fontSize: "inherit",
  lineHeight: "inherit",
  color: "inherit",
  textAlign: "inherit",
  boxSizing: "border-box",
};
const computedStyle = computed(() => {
  Object.assign(css, _styles.value);
  Object.assign(css, buttonStyleToStyle(props.style));
  if (props.disabled) {
    css.pointerEvents = "none";
    css.cursor = "default";
    if (css.backgroundColor || props.disabledColor) {
      css.backgroundColor = resolveColor(props.disabledColor || props.color);
    }
  }
  if (isPressed.value) {
    css.opacity = props.pressedOpacity;
  }
  return css;
});
</script>

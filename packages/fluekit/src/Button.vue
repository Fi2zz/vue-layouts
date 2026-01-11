<template>
  <GestureDetector
    :behavior="behavior"
    @tap="handleTap"
    @long-press="handleLongPress"
    @tap-down="handleTapDown"
    @tap-up="handleTapUp"
    @tap-cancel="handleTapCancel"
  >
    <button
      class="fluekit-button"
      :class="attrs.class"
      :style="computedStyle"
      :disabled="disabled"
      v-bind="mixedAttrs"
    >
      <slot />
    </button>
  </GestureDetector>
</template>

<script setup lang="ts">
import { computed, useAttrs, type CSSProperties, ref } from "vue";
import { ButtonStyle, buttonStyleToStyle } from "./ButtonStyle";
import GestureDetector from "./GestureDetector.vue";
import { useStyles } from "./StyleProvider";
import { useGestureEvents, useGestureStyle, type Behavior } from "./useGesture";
import { useSafeAttrs } from "./useSafeAttrs";
import { EdgeInsets } from "./EdgeInsets";
import { BorderRadius } from "./BorderRadius";

defineOptions({ inheritAttrs: false });

interface Props {
  // 交互属性
  disabled?: boolean;
  behavior?: Behavior;
  // 样式属性
  style?: ButtonStyle;

  // iOS 风格属性
  variant?: "ios" | "raw"; // 默认为 raw (无样式)
  color?: string; // 背景色快捷方式 (仅对 variant='ios' 生效或作为默认背景)
  disabledColor?: string;
  pressedOpacity?: number;
  padding?: EdgeInsets;
  borderRadius?: BorderRadius;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  behavior: "opaque",
  pressedOpacity: 0.4,
  disabledColor: "rgba(0, 0, 0, 0.2)",
});

const emit = defineEmits<{
  (e: "pressed"): void;
  (e: "long-press"): void;
  (e: "tap-down", payload: any): void;
  (e: "tap-up", payload: any): void;
  (e: "tap-cancel", payload: any): void;
}>();

const attrs = useAttrs();
const _styles = useStyles();
const safeAttrs = useSafeAttrs();
const events = useGestureEvents();
const isPressed = ref(false);

const mixedAttrs = computed(() => {
  //@ts-ignore
  if ((_styles.value as unknown as CSSProperties).pointerEvents == "none") {
    return safeAttrs.value;
  }
  return { ...safeAttrs.value, ...(events || {}) };
});

const gestureStyle = useGestureStyle(props.behavior);

// 样式计算逻辑
const computedStyle = computed(() => {
  const css: CSSProperties = {
    position: "relative",
  };

  // 1. 基础样式 (来自 variant)
  let variantStyle: ButtonStyle = {};
  if (props.variant === "ios") {
    variantStyle = {
      padding: props.padding || EdgeInsets.symmetric({ vertical: 14, horizontal: 16 }),
      shape: props.borderRadius || BorderRadius.all(8),
      backgroundColor: props.disabled ? props.disabledColor : props.color || "transparent",
      opacity: isPressed.value ? props.pressedOpacity : 1.0,
    };
  }

  Object.assign(css, _styles.value);
  Object.assign(css, buttonStyleToStyle(variantStyle));
  Object.assign(css, buttonStyleToStyle(props.style));
  Object.assign(css, gestureStyle);

  return css;
});

// 事件处理
const handleTapDown = (e: any) => {
  if (!props.disabled) {
    if (props.variant === "ios") {
      isPressed.value = true;
    }
    emit("tap-down", e);
  }
};

const handleTapUp = (e: any) => {
  isPressed.value = false;
  emit("tap-up", e);
};

const handleTapCancel = (e: any) => {
  isPressed.value = false;
  emit("tap-cancel", e);
};

const handleTap = () => {
  if (!props.disabled) {
    emit("pressed");
  }
};

const handleLongPress = () => {
  if (!props.disabled) {
    emit("long-press");
  }
};
</script>

<style scoped>
.fluekit-button {
  appearance: none;
  border: 0;
  outline: 0;
  background: transparent;
  padding: 0;
  margin: 0;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
  text-align: inherit;
  box-sizing: border-box;
  /* 确保 padding 包含在 width/height 内 */
}

.fluekit-button:disabled {
  cursor: default;
}
</style>

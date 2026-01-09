<template>
  <GestureDetector :behavior="behavior" @tap="handleTap" @long-press="handleLongPress">
    <button class="fluekit-button" :style="computedStyle" :disabled="disabled" v-bind="mixedAttrs">
      <slot />
    </button>
  </GestureDetector>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { ButtonStyle, buttonStyleToStyle } from "./ButtonStyle";
import GestureDetector from "./GestureDetector.vue";
import { useStyles } from "./StyleProvider";
import { useGestureEvents, useGestureStyle, type Behavior } from "./useGesture";
import { useSafeAttrs } from "./useSafeAttrs";

defineOptions({ inheritAttrs: false });

interface Props {
  // 交互属性
  disabled?: boolean;
  behavior?: Behavior;
  // 样式属性
  style?: ButtonStyle;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  behavior: "opaque",
});

const emit = defineEmits<{
  (e: "pressed"): void;
  (e: "long-press"): void;
}>();

const _styles = useStyles();
const safeAttrs = useSafeAttrs();
const events = useGestureEvents();

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

  Object.assign(css, _styles.value);
  Object.assign(css, buttonStyleToStyle(props.style));
  Object.assign(css, gestureStyle);

  return css;
});

// 事件处理
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

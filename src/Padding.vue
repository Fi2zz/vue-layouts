<template>
  <div :class="['padding-container', { disabled }]" :style="computedStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { px2vw } from "@/px2vw";
import { computed } from "vue";
import type { EdgeInsets } from "./EdgeInsets";
import { edgeInsetsToStyle } from "./EdgeInsets";
interface Props {
  padding?: EdgeInsets;
  /** 所有边的内边距（快捷方式） */
  all?: number | string;
  /** 水平内边距（快捷方式） */
  horizontal?: number | string;
  /** 垂直内边距（快捷方式） */
  vertical?: number | string;
  /** 上边距 */
  top?: number | string;
  /** 右边距 */
  right?: number | string;
  /** 下边距 */
  bottom?: number | string;
  /** 左边距 */
  left?: number | string;
  width?: number | string;
  height?: number | string;

  /** 是否禁用 */
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

// 计算最终样式
const computedStyle = computed(() => {
  let baseStyle: Record<string, any> = {};

  baseStyle = edgeInsetsToStyle(
    props.padding || (props as unknown as EdgeInsets),
    "padding"
  );
  if (props.width !== undefined) baseStyle.width = px2vw(props.width);
  if (props.height !== undefined) baseStyle.height = px2vw(props.height);
  if (props.disabled) {
    baseStyle.opacity = 0.6;
    baseStyle.pointerEvents = "none";
  }
  return baseStyle;
});
</script>

<style scoped>
.padding-container {
  display: block;
  position: relative;
  box-sizing: border-box;
}
.padding-container.disabled {
  pointer-events: none;
  opacity: 0.6;
}
</style>

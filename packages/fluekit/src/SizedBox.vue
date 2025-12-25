<template>
  <div class="sized-box" :style="computedStyle" v-bind="safeAttrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots, type CSSProperties } from "vue";
import { sizeToStyle } from "./Size";
import { useSafeAttrs } from "./useSafeAttrs";
defineOptions({ inheritAttrs: false });
interface Props {
  width?: number | string;
  height?: number | string;
}
const props = defineProps<Props>();
const safeAttrs = useSafeAttrs();
const slots = useSlots();
const computedStyle = computed(() => {
  const style: CSSProperties = {
    boxSizing: "border-box",
    position: "relative",
  };
  Object.assign(style, sizeToStyle(props));

  // 如果没有子元素，SizedBox 通常用于占位，不需要 flex
  // 但如果包裹了子元素，通常希望它作为一个容器
  // 为了与 Flutter 行为一致（紧约束），我们使用 flex 来确保子元素受到约束
  if (slots.default) {
    style.display = "flex";
    style.flexDirection = "column";
    style.flexShrink = 0; // 防止在 Flex 布局中被压缩
  }

  return style;
});
</script>

<template>
  <div class="fluekit-opacity" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { provideOpacity } from "./useOpacity";

defineOptions({
  name: "Opacity",
  inheritAttrs: false,
});

interface Props {
  /**
   * 透明度值，范围 0.0 到 1.0
   * 0.0 表示完全透明（不可见）
   * 1.0 表示完全不透明（完全可见）
   * @default 1.0
   */
  opacity?: number;
}

const props = withDefaults(defineProps<Props>(), {
  opacity: 1.0,
});

// 限制 opacity 在 0-1 之间
const clampedOpacity = computed(() => Math.max(0, Math.min(1, props.opacity)));

// 注入逻辑透明度（用于子组件感知或 Canvas 绘制）
provideOpacity(clampedOpacity);

// 应用视觉透明度
const style = computed<CSSProperties>(() => ({
  opacity: clampedOpacity.value,
}));
</script>

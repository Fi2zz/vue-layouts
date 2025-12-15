<template>
  <div :style="opacityStyle" class="flutter-opacity">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { computed, CSSProperties, type ComputedRef } from "vue";

/**
 * Opacity 组件的属性接口
 * 模仿 Flutter Opacity widget 的 API 设计
 */
interface OpacityProps {
  /**
   * 透明度值，范围 0.0 到 1.0
   * 0.0 表示完全透明（不可见）
   * 1.0 表示完全不透明（完全可见）
   * @default 1.0
   */
  opacity?: number;
}
// 定义组件属性，使用 withDefaults 提供默认值
const props = withDefaults(defineProps<OpacityProps>(), { opacity: 1.0 });

/**
 * 计算透明度样式
 * 确保 opacity 值在有效范围内 (0.0 - 1.0)
 */
const opacityStyle: ComputedRef<CSSProperties> = computed(() => {
  // 限制 opacity 值在 0.0 到 1.0 之间
  const clampedOpacity = Math.max(0, Math.min(1, props.opacity));
  return {
    opacity: clampedOpacity,
    transition: "opacity 0.2s ease-in-out",
    pointerEvents: clampedOpacity === 0 ? "none" : undefined,
  };
});
</script>

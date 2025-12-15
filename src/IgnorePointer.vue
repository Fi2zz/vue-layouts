<template>
  <div
    :class="[{ 'ignore-pointer--ignoring': ignoring }]"
    :style="computedStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, type ComputedRef, type CSSProperties } from "vue";

/**
 * IgnorePointer 组件的属性接口
 * 模仿 Flutter IgnorePointer widget 的 API 设计
 */
interface IgnorePointerProps {
  /**
   * 是否忽略指针事件
   * 当为 true 时，该组件及其子组件将不会接收任何指针事件
   * 当为 false 时，指针事件正常传递
   * @default false
   */
  ignoring?: boolean;

  /**
   * 是否忽略语义化事件（如键盘导航、屏幕阅读器等）
   * 当为 true 时，组件对辅助功能不可见
   * 当为 false 时，组件仍然可以被辅助功能访问
   * @default false
   */
  ignoringSemantics?: boolean;
}

// 定义组件属性，使用 withDefaults 提供默认值
const props = withDefaults(defineProps<IgnorePointerProps>(), {
  ignoring: false,
  ignoringSemantics: false,
});

/**
 * 计算组件样式
 */
const computedStyle: ComputedRef<CSSProperties> = computed(() => {
  const properties: CSSProperties = {};
  // 当 ignoring 为 true 时，设置 pointer-events: none
  if (props.ignoring) {
    properties.pointerEvents = "none";
  }

  if (props.ignoringSemantics) {
    properties.userSelect = "none";
    properties.WebkitUserSelect = "none";
    properties.MozUserSelect = "none";
    properties.msUserSelect = "none";
  }

  // 合并自定义样式
  return properties;
});
</script>

<style scoped>
/* 确保子元素也被忽略 */
.ignore-pointer--ignoring * {
  pointer-events: none !important;
  user-select: none !important;
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
}
.ignore-pointer--ignoring[aria-hidden="true"] {
  /* 对屏幕阅读器隐藏 */
  visibility: hidden;
}
</style>

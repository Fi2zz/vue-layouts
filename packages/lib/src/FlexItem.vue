<template>
  <div class="flex-item" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, CSSProperties } from "vue";
import { px2vw } from "./px2vw";

// 定义 Props 接口
interface Props {
  // flex 值 (类似 Flutter 的 flex 属性)
  flex?: number;
  // 是否扩展填充可用空间 (类似 Flutter 的 Expanded)
  expanded?: boolean;
  // 是否灵活调整大小 (类似 Flutter 的 Flexible)
  flexible?: boolean;
  // 对齐方式 (覆盖父容器的 crossAxisAlignment)
  alignSelf?: "auto" | "start" | "end" | "center" | "stretch" | "baseline";
  // 最小宽度/高度
  minSize?: number | string;
  // 最大宽度/高度
  maxSize?: number | string;
}

// 设置默认值
const props = withDefaults(defineProps<Props>(), {
  flex: 0,
  expanded: false,
  flexible: false,
  alignSelf: "auto",
});

// 计算 CSS 样式
const style = computed(() => {
  const styles: CSSProperties = {};

  // 设置 flex 属性
  if (props.expanded) {
    styles.flex = "1";
  } else if (props.flexible) {
    styles.flex = `1 1 0`;
  } else if (props.flex > 0) {
    styles.flex = `${props.flex} 0 0`;
  }
  // 对齐方式
  if (props.alignSelf !== "auto") {
    const alignSelfMap = {
      start: "flex-start",
      end: "flex-end",
      center: "center",
      stretch: "stretch",
      baseline: "baseline",
    };
    styles.alignSelf =
      alignSelfMap[props.alignSelf as keyof typeof alignSelfMap];
  }

  // 最小尺寸
  if (props.minSize) {
    const min = px2vw(props.minSize);
    styles.minWidth = min;
    styles.minHeight = min;
  }
  // 最大尺寸
  if (props.maxSize) {
    const max = px2vw(props.maxSize);
    styles.maxWidth = max;
    styles.maxHeight = max;
  }

  return styles;
});
</script>

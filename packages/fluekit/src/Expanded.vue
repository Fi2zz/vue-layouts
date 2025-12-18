<template>
  <FlexItem :flex="flex" expanded :align-self="alignSelf" :min-size="minSize" :max-size="maxSize">
    <slot />
  </FlexItem>
</template>

<script setup lang="ts">
import FlexItem from "./FlexItem.vue";

defineOptions({ inheritAttrs: false });

// 定义 Props 接口
interface Props {
  // flex 值 (类似 Flutter 的 flex 属性)
  flex?: number;
  // 对齐方式 (覆盖父容器的 crossAxisAlignment)
  alignSelf?: "auto" | "start" | "end" | "center" | "stretch" | "baseline";
  // 最小宽度/高度
  minSize?: number | string;
  // 最大宽度/高度
  maxSize?: number | string;
}

// 设置默认值
withDefaults(defineProps<Props>(), {
  flex: 1,
  alignSelf: "auto",
});
</script>

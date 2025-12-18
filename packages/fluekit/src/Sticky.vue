<template>
  <div class="flutter-sticky" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { usePositionStyle, type Props } from "./usePosition";
defineOptions({ inheritAttrs: false });
// Sticky 也可以支持 width/height，虽然不如 absolute 常用
const props = withDefaults(defineProps<Props>(), {
  zIndex: 10, // Sticky 元素通常需要高于普通内容
});
const style = usePositionStyle(props, "sticky");
</script>

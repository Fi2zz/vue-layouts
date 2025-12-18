<template>
  <div class="flutter-fixed" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { usePositionStyle, type Props } from "./usePosition";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
  zIndex: 100, // Fixed 元素通常需要较高的层级
});
const style = usePositionStyle(props, "fixed");
</script>

<style scoped>
/* Fixed 元素默认不参与文档流布局 */
</style>

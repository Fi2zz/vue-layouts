<template>
  <div class="positioned" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, warn } from "vue";
import { usePositionStyle, type Props } from "./usePosition";
import { useStackContext } from "./useStack";
const props = defineProps<Props>();
defineOptions({ inheritAttrs: false });
const stackContext = useStackContext();
onMounted(() => {
  if (!stackContext) warn("[Positioned] Positioned widget must be a descendant of a Stack. ");
});
const style = usePositionStyle(props, "absolute");
</script>

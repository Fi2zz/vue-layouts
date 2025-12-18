<template>
  <div class="animated-opacity" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, CSSProperties } from "vue";
import { provideOpacity } from "./useOpacity";

defineOptions({ inheritAttrs: false });

interface Props {
  opacity: number;
  duration?: number; // ms
  curve?: string;
}

const props = withDefaults(defineProps<Props>(), {
  duration: 300,
  curve: "linear",
});

provideOpacity(computed(() => props.opacity));

const style = computed(() => {
  return {
    opacity: props.opacity,
    transition: `opacity ${props.duration}ms ${props.curve}`,
  } as CSSProperties;
});
</script>

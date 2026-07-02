<template>
  <Container v-bind="q"> <slot></slot> </Container>
</template>
<script setup lang="ts">
defineOptions({ inheritAttrs: false });
import { computed } from "vue";
import Container from "./Container.vue";
import { provideTransiationStyle } from "./Animated";
import { ContainerProps } from "./ContainerProps";
interface Props extends ContainerProps {
  duration?: number;
  curve?: string;
}

const props = withDefaults(defineProps<Props>(), {
  duration: 300,
  curve: "linear",
});

const q = computed(() => {
  const { duration, curve, ...other } = props;
  return other;
});
const transition = computed(() => ({ transition: `all ${props.duration}ms ${props.curve}` }));
provideTransiationStyle(transition);
</script>

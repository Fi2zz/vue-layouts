<template>
  <GestureDetector @tap="toggle">
    <Container :width="18" :height="18" :decoration="decoration" alignment="center">
      <Container v-if="value" :width="10" :height="10" color="white" :transform="'scale(1)'" />
      <!-- SVG Checkmark simulation or simple square -->
    </Container>
  </GestureDetector>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Container from "./Container.vue";
import GestureDetector from "./GestureDetector.vue";
import { BoxDecoration } from "./BoxDecoration";
import { BorderRadius } from "./BorderRadius";
import { Border } from "./Border";

interface Props {
  value: boolean;
  onChanged?: (value: boolean) => void;
  activeColor?: string;
  checkColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  activeColor: "#2196F3",
  checkColor: "#FFFFFF",
});

const emit = defineEmits<{
  (e: "update:value", value: boolean): void;
  (e: "change", value: boolean): void;
}>();

const toggle = () => {
  const newValue = !props.value;
  emit("change", newValue);
  emit("update:value", newValue);
};

const decoration = computed(() => {
  return BoxDecoration({
    color: props.value ? props.activeColor : "transparent",
    border: props.value
      ? undefined
      : Border.all({
          color: "rgba(0,0,0,0.54)",
          width: 2,
          style: "solid",
        }),
    borderRadius: BorderRadius.circular(2),
  });
});
</script>

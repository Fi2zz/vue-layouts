<template>
  <div :style="style" @mouseleave="handleMouseLeave">
    <div
      v-for="index in max"
      :key="index"
      :style="itemStyle"
      @click="handleClick(index, $event)"
      @mousemove="handleMouseMove(index, $event)"
    >
      <Icon :icon="getIcon(index)" :size="size" :color="getColor(index)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type CSSProperties } from "vue";
import { Icons } from "./Icons";
import Icon from "./Icon.vue";
import { Color } from "./Color";
import { resolveColor } from "./resolveColor";

interface Props {
  modelValue: number;
  max?: number;
  size?: number | string;
  color?: string | Color;
  unselectedColor?: string | Color;
  allowHalfRating?: boolean;
  readonly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  max: 5,
  size: 24,
  color: "#FFC107", // Amber 500
  unselectedColor: "#E0E0E0", // Grey 300
  allowHalfRating: false,
  readonly: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const hoverValue = ref<number | null>(null);

const style = computed<CSSProperties>(() => {
  return {
    display: "inline-flex",
    alignItems: "center",
    cursor: props.readonly ? "default" : "pointer",
    userSelect: "none",
  };
});

const itemStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const getIcon = (index: number) => {
  const value = hoverValue.value !== null ? hoverValue.value : props.modelValue;
  if (value >= index) {
    return Icons.star;
  } else if (value >= index - 0.5) {
    return Icons.starHalf;
  } else {
    return Icons.starBorder;
  }
};

const getColor = (index: number) => {
  const value = hoverValue.value !== null ? hoverValue.value : props.modelValue;
  if (value >= index - 0.5) {
    return resolveColor(props.color);
  } else {
    return resolveColor(props.unselectedColor);
  }
};

const handleClick = (index: number, event: MouseEvent) => {
  if (props.readonly) return;
  const rating = calculateRatingValue(index, event);
  emit("update:modelValue", rating);
};

const handleMouseMove = (index: number, event: MouseEvent) => {
  if (props.readonly) return;
  hoverValue.value = calculateRatingValue(index, event);
};

const handleMouseLeave = () => {
  if (props.readonly) return;
  hoverValue.value = null;
};

const calculateRatingValue = (index: number, event: MouseEvent): number => {
  if (!props.allowHalfRating) {
    return index;
  }

  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const x = event.clientX - rect.left;

  // If clicked on left half
  if (x < rect.width / 2) {
    return index - 0.5;
  } else {
    return index;
  }
};
</script>

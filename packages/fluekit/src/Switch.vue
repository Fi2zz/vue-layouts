<template>
  <GestureDetector @tap="toggle">
    <Container
      :width="trackWidth"
      :height="trackHeight"
      :padding="EdgeInsets.all(2)"
      :decoration="trackDecoration"
    >
      <AnimatedContainer
        :duration="200"
        :width="thumbSize"
        :height="thumbSize"
        :margin="thumbMargin"
        :decoration="thumbDecoration"
      />
    </Container>
  </GestureDetector>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Container from "./Container.vue";
import AnimatedContainer from "./AnimatedContainer.vue";
import GestureDetector from "./GestureDetector.vue";
import { BoxDecoration, BoxShape } from "./BoxDecoration";
import { BorderRadius } from "./BorderRadius";
import { EdgeInsets } from "./EdgeInsets";

interface Props {
  value: boolean;
  onChanged?: (value: boolean) => void;
  activeColor?: string;
  activeTrackColor?: string;
  inactiveThumbColor?: string;
  inactiveTrackColor?: string;
  variant?: "material" | "ios";
}

const props = withDefaults(defineProps<Props>(), {
  activeColor: "#34C759", // iOS Green
  activeTrackColor: "#34C759",
  inactiveThumbColor: "#FFFFFF",
  inactiveTrackColor: "#E9E9EA", // iOS Gray
  variant: "ios",
});

const emit = defineEmits<{
  (e: "update:value", value: boolean): void;
  (e: "change", value: boolean): void;
}>();

const toggle = () => {
  if (props.onChanged) {
    props.onChanged(!props.value);
  }
  emit("update:value", !props.value);
};

const isIOS = computed(() => props.variant === "ios");

const trackWidth = computed(() => (isIOS.value ? 51 : 36));
const trackHeight = computed(() => (isIOS.value ? 31 : 20)); // iOS height 31
const thumbSize = computed(() => (isIOS.value ? 27 : 16));

const trackDecoration = computed(() => {
  const color = props.value
    ? isIOS.value
      ? props.activeColor
      : props.activeTrackColor
    : props.inactiveTrackColor;

  return BoxDecoration({
    color: color,
    borderRadius: BorderRadius.circular(isIOS.value ? 100 : 10), // Pill shape for iOS
  });
});

const thumbDecoration = computed(() => {
  return BoxDecoration({
    color: isIOS.value ? "#FFFFFF" : props.value ? props.activeColor : props.inactiveThumbColor,
    shape: BoxShape.circle,
    boxShadow: [
      {
        color: "rgba(0,0,0,0.3)",
        blurRadius: isIOS.value ? 3 : 1,
        offset: { x: 0, y: isIOS.value ? 2 : 1 },
      },
    ],
  });
});

const thumbMargin = computed(() => {
  // Simple approximation of sliding
  // iOS padding: 2px
  const padding = 2;
  const slideDistance = trackWidth.value - thumbSize.value - padding * 2;

  return EdgeInsets.only({ left: props.value ? slideDistance : 0 });
});
</script>

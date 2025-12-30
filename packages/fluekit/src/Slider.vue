<template>
  <div class="slider-container" ref="trackRef">
    <GestureDetector @pan-start="handleDrag" @pan-update="handleDrag" @tap-down="handleDrag">
      <Container :height="40" alignment="centerLeft">
        <!-- Track -->
        <Stack alignment="centerLeft">
          <!-- Inactive Track -->
          <Container
            :width="'100%'"
            :height="4"
            :color="inactiveColor"
            :border-radius="BorderRadius.circular(2)"
          />
          <!-- Active Track -->
          <Container
            :width="`${percent}%`"
            :height="4"
            :color="activeColor"
            :border-radius="BorderRadius.circular(2)"
          />
          <!-- Thumb -->
          <Container :style="{ marginLeft: thumbLeft }" :transform="'translate(-50%, 0)'">
            <Container :width="20" :height="20" :decoration="thumbDecoration" />
          </Container>
        </Stack>
      </Container>
    </GestureDetector>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Container from "./Container.vue";
import Stack from "./Stack.vue";
import GestureDetector from "./GestureDetector.vue";
import { BoxDecoration, BoxShape } from "./BoxDecoration";
import { BorderRadius } from "./BorderRadius";
import { BoxShadow } from "./BoxShadow";

interface Props {
  value: number;
  min?: number;
  max?: number;
  onChanged?: (value: number) => void;
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  activeColor: "#2196F3",
  inactiveColor: "#BBDEFB",
  thumbColor: "#2196F3",
});

const emit = defineEmits<{
  (e: "update:value", value: number): void;
  (e: "change", value: number): void;
}>();

const trackRef = ref<HTMLElement>();

const percent = computed(() => {
  const range = props.max - props.min;
  if (range <= 0) return 0;
  return ((props.value - props.min) / range) * 100;
});

const thumbLeft = computed(() => {
  return `${percent.value}%`;
});

const handleDrag = (e: any) => {
  if (!trackRef.value) return;

  // Need global coordinates to calculate relative position
  const rect = trackRef.value.getBoundingClientRect();
  let x = 0;

  if (e.clientX !== undefined) {
    x = e.clientX;
  } else if (e.globalPosition) {
    x = e.globalPosition.x;
  } else if (e.detail?.globalPosition) {
    x = e.detail.globalPosition.x;
  } else if (e.touches && e.touches[0]) {
    x = e.touches[0].clientX;
  }

  const clientX = x;
  let newPercent = (clientX - rect.left) / rect.width;
  newPercent = Math.max(0, Math.min(1, newPercent));

  const newValue = props.min + newPercent * (props.max - props.min);

  if (props.onChanged) {
    props.onChanged(newValue);
  }
  emit("change", newValue);
  emit("update:value", newValue);
};

const thumbDecoration = computed(() => {
  return BoxDecoration({
    color: props.thumbColor,
    shape: BoxShape.circle,
    boxShadow: [BoxShadow({ color: "rgba(0,0,0,0.2)", blurRadius: 2, offset: { x: 0, y: 1 } })],
  });
});
</script>

<style scoped>
.slider-container {
  width: 100%;
  position: relative;
}
</style>

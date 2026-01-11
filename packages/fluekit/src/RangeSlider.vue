<template>
  <div class="range-slider-container" ref="trackRef">
    <GestureDetector @pan-start="onPanStart" @pan-update="onPanUpdate">
      <Container :height="40" alignment="centerLeft">
        <!-- Track -->
        <Stack alignment="centerLeft" :fit="StackFit.expand">
          <!-- Inactive Track -->
          <Container
            :width="'100%'"
            :height="trackHeight"
            :decoration="
              BoxDecoration({
                color: inactiveColor,
                borderRadius: BorderRadius.circular(trackHeight / 2),
              })
            "
          />
          <!-- Active Track -->
          <!-- 左侧边距是 startPercent，宽度是 endPercent - startPercent -->
          <Positioned
            :left="`${startPercent}%`"
            :width="`${endPercent - startPercent}%`"
            :height="trackHeight"
          >
            <Container
              :width="'100%'"
              :height="'100%'"
              :decoration="
                BoxDecoration({
                  color: activeColor,
                  borderRadius: BorderRadius.circular(trackHeight / 2),
                })
              "
            />
          </Positioned>

          <!-- Thumb Start -->
          <Positioned :left="`${startPercent}%`" :top="0" :bottom="0">
            <Container :height="'100%'" :transform="'translate(-50%, 0)'" alignment="center">
              <Container :width="thumbSize" :height="thumbSize" :decoration="thumbDecoration" />
            </Container>
          </Positioned>

          <!-- Thumb End -->
          <Positioned :left="`${endPercent}%`" :top="0" :bottom="0">
            <Container :height="'100%'" :transform="'translate(-50%, 0)'" alignment="center">
              <Container :width="thumbSize" :height="thumbSize" :decoration="thumbDecoration" />
            </Container>
          </Positioned>
        </Stack>
      </Container>
    </GestureDetector>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Container from "./Container.vue";
import Stack from "./Stack.vue";
import Positioned from "./Positioned.vue";
import GestureDetector from "./GestureDetector.vue";
import { BoxDecoration, BoxShape } from "./BoxDecoration";
import { BorderRadius } from "./BorderRadius";
import { BoxShadow } from "./BoxShadow";
import { GestureDetail } from "./useGesture";
import { StackFit } from "./FlexProps";

export interface RangeValues {
  start: number;
  end: number;
}

interface Props {
  value: RangeValues;
  min?: number;
  max?: number;
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
  variant?: "material" | "ios";
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  activeColor: "#007AFF",
  inactiveColor: "#E5E5EA",
  thumbColor: "#FFFFFF",
  variant: "ios",
});

const emit = defineEmits<{
  (e: "update:value", value: RangeValues): void;
  (e: "change", value: RangeValues): void;
}>();

const trackRef = ref<HTMLElement>();
const dragOffset = ref(0);
const draggingThumb = ref<"start" | "end" | null>(null);

const isIos = computed(() => props.variant === "ios");
const trackHeight = computed(() => (isIos.value ? 3 : 4));
const thumbSize = computed(() => (isIos.value ? 28 : 20));

const startPercent = computed(() => {
  const range = props.max - props.min;
  if (range <= 0) return 0;
  return ((props.value.start - props.min) / range) * 100;
});

const endPercent = computed(() => {
  const range = props.max - props.min;
  if (range <= 0) return 0;
  return ((props.value.end - props.min) / range) * 100;
});

const thumbDecoration = computed(() => {
  return BoxDecoration({
    color: props.thumbColor,
    shape: BoxShape.circle,
    boxShadow: isIos.value
      ? [
          BoxShadow({
            color: "rgba(0,0,0,0.15)",
            blurRadius: 4,
            offset: { x: 0, y: 3 },
          }),
          BoxShadow({
            color: "rgba(0,0,0,0.08)",
            blurRadius: 1,
            offset: { x: 0, y: 0 },
          }),
        ]
      : [BoxShadow({ color: "rgba(0,0,0,0.2)", blurRadius: 2, offset: { x: 0, y: 1 } })],
  });
});

const getPercentFromX = (x: number, rect: DOMRect) => {
  const p = (x - rect.left) / rect.width;
  return Math.max(0, Math.min(1, p));
};

const getValueFromPercent = (percent: number) => {
  return props.min + percent * (props.max - props.min);
};

const updateValue = (thumb: "start" | "end", newValue: number) => {
  let newStart = props.value.start;
  let newEnd = props.value.end;

  if (thumb === "start") {
    newStart = Math.min(newValue, newEnd);
  } else {
    newEnd = Math.max(newValue, newStart);
  }

  const newRange = { start: newStart, end: newEnd };
  emit("update:value", newRange);
  emit("change", newRange);
};

const onPanStart = (e: GestureDetail) => {
  if (!trackRef.value) return;
  const rect = trackRef.value.getBoundingClientRect();
  const x = e.globalPosition.x;

  // Calculate pixel positions of thumbs
  const startX = rect.left + rect.width * (startPercent.value / 100);
  const endX = rect.left + rect.width * (endPercent.value / 100);

  const distStart = Math.abs(x - startX);
  const distEnd = Math.abs(x - endX);

  // Check if hitting any thumb (threshold 20px)
  const threshold = 20;
  let target: "start" | "end" | null = null;

  if (distStart <= threshold && distEnd <= threshold) {
    // Both close, pick the closer one. If equal, maybe prefer moving the one that moves away from the other?
    // Simple logic: closer
    if (distStart < distEnd) target = "start";
    else target = "end";
  } else if (distStart <= threshold) {
    target = "start";
  } else if (distEnd <= threshold) {
    target = "end";
  }

  if (target) {
    draggingThumb.value = target;
    const currentThumbX = target === "start" ? startX : endX;
    dragOffset.value = x - currentThumbX;
  } else {
    // Clicked on track. Move the closest thumb to that position
    if (distStart < distEnd) {
      draggingThumb.value = "start";
      const p = getPercentFromX(x, rect);
      updateValue("start", getValueFromPercent(p));
    } else {
      draggingThumb.value = "end";
      const p = getPercentFromX(x, rect);
      updateValue("end", getValueFromPercent(p));
    }
    dragOffset.value = 0;
  }
};

const onPanUpdate = (e: Required<GestureDetail>) => {
  if (!trackRef.value || !draggingThumb.value) return;
  const rect = trackRef.value.getBoundingClientRect();
  const x = e.globalPosition.x;

  const targetX = x - dragOffset.value;
  const p = getPercentFromX(targetX, rect);
  const val = getValueFromPercent(p);

  updateValue(draggingThumb.value, val);
};
</script>

<style scoped>
.range-slider-container {
  width: 100%;
  position: relative;
}
</style>

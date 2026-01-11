<template>
  <div class="slider-container" ref="trackRef">
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
          <Container
            :width="`${percent}%`"
            :height="trackHeight"
            :decoration="
              BoxDecoration({
                color: activeColor,
                borderRadius: BorderRadius.circular(trackHeight / 2),
              })
            "
          />
          <!-- Thumb -->
          <Positioned :left="thumbLeft" :top="0" :bottom="0">
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

interface Props {
  value: number;
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
  (e: "update:value", value: number): void;
  (e: "change", value: number): void;
}>();

const trackRef = ref<HTMLElement>();
const dragOffset = ref(0);

const isIos = computed(() => props.variant === "ios");
const trackHeight = computed(() => (isIos.value ? 3 : 4));
const thumbSize = computed(() => (isIos.value ? 28 : 20));

const percent = computed(() => {
  const range = props.max - props.min;
  if (range <= 0) return 0;
  return ((props.value - props.min) / range) * 100;
});

const thumbLeft = computed(() => {
  return `${percent.value}%`;
});

const updatePosition = (targetX: number, rect: DOMRect) => {
  let newPercent = (targetX - rect.left) / rect.width;
  newPercent = Math.max(0, Math.min(1, newPercent));

  const newValue = props.min + newPercent * (props.max - props.min);

  emit("change", newValue);
  emit("update:value", newValue);
};

const onPanStart = (e: GestureDetail) => {
  if (!trackRef.value) return;
  const rect = trackRef.value.getBoundingClientRect();
  const x = e.globalPosition.x;

  // 计算当前 Thumb 的中心位置
  const currentThumbX = rect.left + rect.width * (percent.value / 100);

  // 检查是否点击在 Thumb 上 (Thumb 宽 20px, 给 +/- 15px 的响应区)
  if (Math.abs(x - currentThumbX) <= 15) {
    dragOffset.value = x - currentThumbX;
  } else {
    dragOffset.value = 0;
    // 如果点击的是轨道，立即更新位置
    updatePosition(x, rect);
  }
};

const onPanUpdate = (e: Required<GestureDetail>) => {
  if (!trackRef.value) return;
  const rect = trackRef.value.getBoundingClientRect();
  const x = e.globalPosition.x;

  // 减去初始偏移量，保持滑块相对于鼠标的相对位置不变
  updatePosition(x - dragOffset.value, rect);
};

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
</script>

<style scoped>
.slider-container {
  width: 100%;
  position: relative;
}
</style>

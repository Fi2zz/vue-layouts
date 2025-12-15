<template>
  <div
    class="turntable-root"
    style="overflow: hidden; width: 100%"
    :style="{ height: containerStyle.height }">
    <div
      :style="containerStyle"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @touchcancel="handleTouchEnd"
      class="turntable-container">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="circle-btn"
        :style="buildItemStyle(index, item)"
        @click="handleBtnClick(index)">
        <slot
          name="item"
          :index="index"
          :active="index == activeIndex"
          :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { px2vw } from "@/px2vw";
import { Size, sizeToStyle } from "@/Size";
import {
  computed,
  CSSProperties,
  nextTick,
  onUnmounted,
  PropType,
  ref,
  watch,
} from "vue";

export interface TurntableItem {
  index: number;
  [key: string]: any;
}

type Item = {
  index: number;
  active: boolean;
  item: TurntableItem;
};

const props = defineProps({
  items: {
    type: Array as PropType<TurntableItem[]>,
    required: true,
    default: () => [],
  },
  containerSize: {
    type: Number,
    default: screen.width,
  },
  itemScale: {
    type: Function as PropType<(data: Item) => string | number>,
    default: () => 1,
  },
  itemStyle: {
    type: Function as PropType<(data: Item) => CSSProperties>,
    default: () => ({}),
  },
});

const emit = defineEmits(["change"]);
const radius = computed(() => props.containerSize / 2);
const angle = computed(() =>
  props.items.length ? 360 / props.items.length : 0
);
const activeIndex = defineModel({ type: Number, required: true, default: 0 });

const rotateAngle = ref(0);
const isDragging = ref(false);
const isAnimating = ref(false);
let startX = 0;
let startAngle = 0;
let lastX = 0;
let lastTime = 0;
let velocity = 0;
let animationFrameId = 0;

const transition = computed(() =>
  isDragging.value || isAnimating.value
    ? "none"
    : "transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)"
);

const containerStyle = computed(() => {
  return {
    ...sizeToStyle(Size(props.containerSize)),
    transformOrigin: "center",
    position: "relative",
    transform: `rotate(${rotateAngle.value}deg)`,
    transition: transition.value,
  } as CSSProperties;
});

watch(
  activeIndex,
  (val) => {
    if (!isDragging.value) {
      rotateAngle.value = val * angle.value;
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});

const handleTouchStart = (e: TouchEvent) => {
  if (e.touches.length !== 1) return;
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = 0;
  }
  isAnimating.value = false;
  isDragging.value = true;
  startX = e.touches[0]!.clientX;
  startAngle = rotateAngle.value;
  lastX = startX;
  lastTime = Date.now();
  velocity = 0;
};

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value || e.touches.length !== 1) return;
  const currentX = e.touches[0]!.clientX;
  const deltaX = currentX - startX;
  const now = Date.now();
  const dt = now - lastTime;
  if (dt > 0) {
    velocity = (currentX - lastX) / dt;
  }
  lastX = currentX;
  lastTime = now;
  const factor = 0.5;
  rotateAngle.value = startAngle - deltaX * factor;
};

const handleTouchEnd = () => {
  isDragging.value = false;
  startInertia();
};

const startInertia = () => {
  isAnimating.value = true;
  const friction = 0.95;
  const stopThreshold = 0.05;
  const step = () => {
    if (Math.abs(velocity) > stopThreshold) {
      rotateAngle.value -= velocity * 15;
      velocity *= friction;
      animationFrameId = requestAnimationFrame(step);
    } else {
      snapToNearest();
    }
  };
  step();
};

const snapToNearest = () => {
  isAnimating.value = false;
  const rawIndex = Math.round(rotateAngle.value / angle.value);

  // 找对应旋转方向最近的 Index，支持循环
  const count = props.items.length;
  let targetIndex = 0;
  if (count > 0) {
    targetIndex = ((rawIndex % count) + count) % count;
  }

  if (activeIndex.value !== targetIndex) {
    const currentItem = props.items[activeIndex.value];
    const targetItem = props.items[targetIndex];
    if (currentItem && targetItem && currentItem.index === targetItem.index) {
      // 虽然 index 变了，但业务逻辑上是同一个 item，只更新内部状态，不 emit change
      // 此时我们需要更新 activeIndex 以保持 UI 同步，但不触发路由跳转
      activeIndex.value = targetIndex;
    } else {
      activeIndex.value = targetIndex;
      nextTick(() => {
        emit("change", props.items[targetIndex]);
      });
    }
  } else {
    // 如果 index 没变，手动重置角度以触发吸附动画
    rotateAngle.value = targetIndex * angle.value;
  }
};

const handleBtnClick = (rawIndex: number) => {
  activeIndex.value = rawIndex;
  emit("change", props.items[rawIndex]);
};

function buildItemStyle(index: number, item: TurntableItem) {
  const visualIndex = Math.round(rotateAngle.value / angle.value);
  const active = index === visualIndex;
  const rotated = (index * angle.value * Math.PI) / 180;
  const left = radius.value + radius.value * Math.sin(rotated);
  const top = radius.value + radius.value * Math.cos(rotated);
  const transform = [`translate(-50%, -50%) rotate(${-rotateAngle.value}deg)`];
  const scale = props.itemScale({ index, active, item });
  if (typeof scale != "undefined") transform.push(`scale(${scale})`);
  let styles: CSSProperties = props.itemStyle({ index, active, item });
  return {
    position: "absolute",
    left: px2vw(left),
    top: px2vw(top),
    transform: transform.join(" "),
    transformOrigin: "center",
    transition: transition.value,
    ...styles,
  } as CSSProperties;
}
</script>

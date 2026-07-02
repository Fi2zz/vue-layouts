<template>
  <div :style="containerStyle">
    <div
      v-for="i in 12"
      :key="i"
      :ref="(el) => (bladeRefs[i - 1] = el as HTMLElement)"
      :style="bladeStyle(i - 1)"
    >
      <div :style="visualStyle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties, onMounted, ref, watch, onBeforeUnmount } from "vue";
import { CupertinoColors } from "./CupertinoColors";
import { Color } from "./Color";
import { resolveColor } from "./resolveColor";

interface Props {
  /**
   * Whether the activity indicator is running its animation.
   * Default: true
   */
  animating?: boolean;
  /**
   * The color of the activity indicator.
   */
  color?: string | Color;
  /**
   * The radius of the activity indicator.
   * Default: 10.0
   */
  radius?: number;
}

const props = withDefaults(defineProps<Props>(), {
  animating: true,
  color: () => CupertinoColors.systemGrey, // iOS default is usually gray
  radius: 10,
});

const bladeRefs = ref<HTMLElement[]>([]);
const animations: Animation[] = [];

const resolvedColor = computed(() => resolveColor(props.color));

const containerStyle = computed<CSSProperties>(() => ({
  width: `${props.radius * 2}px`,
  height: `${props.radius * 2}px`,
  position: "relative",
  display: "inline-block",
}));

const bladeStyle = (index: number): CSSProperties => {
  const bladeWidth = props.radius / 3.5; // Heuristic based on radius
  return {
    position: "absolute",
    top: "0",
    left: `calc(50% - ${bladeWidth / 2}px)`,
    width: `${bladeWidth}px`,
    height: "100%",
    transform: `rotate(${index * 30}deg)`,
  };
};

const visualStyle = computed<CSSProperties>(() => ({
  display: "block",
  width: "100%",
  height: "25%",
  backgroundColor: resolvedColor.value,
  borderRadius: "10px",
}));

const startAnimation = () => {
  // Clear existing animations
  animations.forEach((a) => a.cancel());
  animations.length = 0;

  bladeRefs.value.forEach((el, index) => {
    if (!el) return;
    const animation = el.animate([{ opacity: 1 }, { opacity: 0.3 }], {
      duration: 1000,
      iterations: Infinity,
      // Calculate delay to match the staggered effect
      // CSS: nth-child(1) -> -1s, nth-child(12) -> -0.0833s
      // delay = -1000 + (index / 12) * 1000
      delay: -1000 + (index / 12) * 1000,
      easing: "linear",
    });
    if (!props.animating) {
      animation.pause();
    }
    animations.push(animation);
  });
};

watch(
  () => props.animating,
  (val) => {
    animations.forEach((a) => {
      if (val) a.play();
      else a.pause();
    });
  },
);

watch(
  () => props.radius,
  () => {
    // Re-run if radius changes? Actually animation is independent of radius.
    // But DOM might update.
  },
);

onMounted(() => {
  startAnimation();
});

onBeforeUnmount(() => {
  animations.forEach((a) => a.cancel());
});
</script>

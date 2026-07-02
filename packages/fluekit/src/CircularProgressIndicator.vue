<template>
  <div :style="containerStyle">
    <svg viewBox="0 0 40 40" :style="svgStyle" ref="svgRef">
      <circle
        cx="20"
        cy="20"
        :r="radius"
        fill="none"
        :stroke="resolveColor(backgroundColor) || 'transparent'"
        :stroke-width="strokeWidth"
      />
      <circle
        cx="20"
        cy="20"
        :r="radius"
        fill="none"
        :stroke="resolveColor(color)"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
        :style="circleStyle"
        ref="circleRef"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties, onMounted, ref, watch, onBeforeUnmount } from "vue";
import { Colors } from "./Colors";
import { Color } from "./Color";
import { resolveColor } from "./resolveColor";

interface Props {
  /**
   * The value of the progress indicator, from 0.0 to 1.0.
   * If null, the progress indicator is indeterminate.
   */
  value?: number | null;
  /**
   * The progress indicator's color.
   */
  color?: string | Color;
  /**
   * The background color of the progress indicator track.
   */
  backgroundColor?: string | Color;
  /**
   * The width of the line used to draw the circle.
   * Default: 4.0
   */
  strokeWidth?: number;
  /**
   * The size of the progress indicator.
   * Default: 36.0
   */
  size?: number;
}

const props = withDefaults(defineProps<Props>(), {
  value: null,
  color: () => Colors.blue,
  strokeWidth: 4,
  size: 36,
});

const svgRef = ref<SVGElement | null>(null);
const circleRef = ref<SVGElement | null>(null);
let rotateAnim: Animation | null = null;
let dashAnim: Animation | null = null;

const radius = 18; // 20 - strokeWidth/2 roughly, kept constant for viewBox 0 0 40 40
const circumference = 2 * Math.PI * radius;

const containerStyle = computed<CSSProperties>(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  display: "inline-block",
}));

const svgStyle = computed<CSSProperties>(() => {
  if (props.value === null) {
    return {
      transformOrigin: "center center",
      width: "100%",
      height: "100%",
    };
  }
  return {
    transform: "rotate(-90deg)", // Start from top
    width: "100%",
    height: "100%",
  };
});

const dashArray = computed(() => {
  if (props.value === null) {
    // Indeterminate animation handles dashArray, but we need initial value?
    // Actually WAAPI overrides it.
    return undefined;
  }
  return `${circumference} ${circumference}`;
});

const dashOffset = computed(() => {
  if (props.value === null) {
    return undefined; // Handled by animation
  }
  const percentage = Math.min(Math.max(props.value || 0, 0), 1);
  return circumference - percentage * circumference;
});

const circleStyle = computed<CSSProperties>(() => {
  if (props.value === null) {
    return {};
  }
  return {
    transition: "stroke-dashoffset 0.3s linear",
  };
});

const startIndeterminateAnimation = () => {
  if (svgRef.value && !rotateAnim) {
    rotateAnim = svgRef.value.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
      {
        duration: 1400,
        iterations: Infinity,
        easing: "linear",
      },
    );
  } else if (rotateAnim) {
    rotateAnim.play();
  }

  if (circleRef.value && !dashAnim) {
    dashAnim = circleRef.value.animate(
      [
        { strokeDasharray: "1, 200", strokeDashoffset: 0 },
        { strokeDasharray: "89, 200", strokeDashoffset: -35 },
        { strokeDasharray: "89, 200", strokeDashoffset: -124 },
      ],
      {
        duration: 1400,
        iterations: Infinity,
        easing: "ease-in-out",
      },
    );
  } else if (dashAnim) {
    dashAnim.play();
  }
};

const stopIndeterminateAnimation = () => {
  rotateAnim?.cancel();
  dashAnim?.cancel();
  rotateAnim = null;
  dashAnim = null;
};

watch(
  () => props.value,
  (val) => {
    if (val === null) {
      startIndeterminateAnimation();
    } else {
      stopIndeterminateAnimation();
    }
  },
  { immediate: true, flush: "post" },
);

onMounted(() => {
  if (props.value === null) {
    startIndeterminateAnimation();
  }
});

onBeforeUnmount(() => {
  stopIndeterminateAnimation();
});
</script>

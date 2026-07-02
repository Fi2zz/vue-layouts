<template>
  <div :style="containerStyle">
    <div :style="barStyle" ref="barRef"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties, onMounted, ref, watch, onBeforeUnmount } from "vue";
import { Colors } from "./Colors";
import { Color } from "./Color";
import { resolveColor } from "./resolveColor";
import { BorderRadius, borderRadiusToStyle, isBorderRadius } from "./BorderRadius";

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
   * The background color of the progress indicator.
   */
  backgroundColor?: string | Color;
  /**
   * The height of the progress indicator.
   * Default: 4.0
   */
  minHeight?: number;
  /**
   * The border radius of the progress indicator.
   */
  borderRadius?: number | BorderRadius;
}

const props = withDefaults(defineProps<Props>(), {
  value: null,
  color: () => Colors.blue,
  backgroundColor: () => Colors.blue.withOpacity(0.2),
  minHeight: 4,
});

const barRef = ref<HTMLElement | null>(null);
let animation: Animation | null = null;

const containerStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    height: `${props.minHeight}px`,
    backgroundColor: resolveColor(props.backgroundColor),
    overflow: "hidden",
    position: "relative",
    width: "100%",
  };

  if (props.borderRadius) {
    if (typeof props.borderRadius === "number") {
      Object.assign(style, borderRadiusToStyle(BorderRadius.circular(props.borderRadius)));
    } else if (isBorderRadius(props.borderRadius)) {
      Object.assign(style, borderRadiusToStyle(props.borderRadius));
    }
  }

  return style;
});

const barStyle = computed<CSSProperties>(() => {
  const isIndeterminate = props.value === null;
  const colorStr = resolveColor(props.color);

  if (!isIndeterminate) {
    // Determinate
    const percentage = Math.min(Math.max((props.value || 0) * 100, 0), 100);
    return {
      backgroundColor: colorStr,
      width: `${percentage}%`,
      height: "100%",
      transition: "width 0.2s linear",
    };
  } else {
    // Indeterminate
    return {
      backgroundColor: colorStr,
      height: "100%",
      width: "100%",
      transformOrigin: "0% 50%",
    };
  }
});

const startIndeterminateAnimation = () => {
  if (barRef.value && !animation) {
    animation = barRef.value.animate(
      [
        { transform: "translateX(0) scaleX(0)" },
        { transform: "translateX(0) scaleX(0.4)", offset: 0.4 },
        { transform: "translateX(100%) scaleX(0.5)" },
      ],
      {
        duration: 1800,
        iterations: Infinity,
        easing: "linear",
      },
    );
  } else if (animation) {
    animation.play();
  }
};

const stopIndeterminateAnimation = () => {
  animation?.cancel();
  animation = null;
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

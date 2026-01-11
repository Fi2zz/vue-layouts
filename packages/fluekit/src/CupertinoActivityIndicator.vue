<template>
  <Container :width="radius * 2" :height="radius * 2" alignment="center">
    <div class="cupertino-activity-indicator" :style="containerStyle">
      <div
        v-for="i in 12"
        :key="i"
        class="cupertino-activity-indicator-tick"
        :style="getTickStyle(i - 1)"
      ></div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import Container from "./Container.vue";

interface Props {
  radius?: number;
  color?: string;
  animating?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  radius: 10,
  color: "#999999",
  animating: true,
});

const containerStyle = computed<CSSProperties>(() => ({
  width: `${props.radius * 2}px`,
  height: `${props.radius * 2}px`,
  position: "relative",
  animation: props.animating ? "cupertino-activity-indicator-rotate 1s steps(12) infinite" : "none",
}));

const getTickStyle = (index: number): CSSProperties => {
  const angle = index * 30;
  return {
    position: "absolute",
    top: "0",
    left: "50%",
    width: `${props.radius * 0.25}px`, // Thickness relative to radius
    height: `${props.radius * 0.6}px`, // Length relative to radius
    backgroundColor: props.color,
    borderRadius: `${props.radius * 0.125}px`,
    transformOrigin: `center ${props.radius}px`,
    transform: `translateX(-50%) rotate(${angle}deg)`,
    opacity: 1 - (index / 12) * 0.7, // Fade opacity for static look (if needed) but animation handles it
    // Actually for iOS spinner, the opacity is fixed per tick in static state,
    // but the whole wheel rotates. Wait, CSS steps() rotation is one way.
    // Another way is to animate opacity of each tick.
    // Flutter implementation rotates the whole thing with steps.
  };
};
</script>

<style>
@keyframes cupertino-activity-indicator-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.cupertino-activity-indicator-tick {
  /* Ensure ticks are centered properly before rotation */
}
</style>

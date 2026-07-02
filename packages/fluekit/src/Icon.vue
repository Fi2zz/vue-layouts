<template>
  <div :style="iconStyle" role="img" :aria-label="semanticLabel" v-bind="$attrs">
    <!-- 1. Slot: Allow direct SVG injection -->
    <slot>
      <!-- 2. Component: Render Vue component (e.g. imported SVG) -->
      <component
        v-if="isComponent"
        :is="icon"
        :width="size"
        :height="size"
        :fill="resolveColor(color)"
        :style="svgStyle"
      />

      <!-- 3. Path String: Render simple path -->
      <svg
        v-else-if="isPathString"
        :width="size"
        :height="size"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        :style="svgStyle"
      >
        <path :d="icon as string" />
      </svg>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed, type Component, type CSSProperties } from "vue";
import { px2vw } from "./px2vw";
import { Color } from "./Color";
import { resolveColor } from "./resolveColor";

defineOptions({ inheritAttrs: false });

interface Props {
  /**
   * The icon to display. Can be:
   * - A Vue Component (e.g. imported from .svg)
   * - A string containing SVG path data (d attribute)
   */
  icon?: string | Component;

  /**
   * The size of the icon in logical pixels.
   * Defaults to 24.
   */
  size?: number | string;

  /**
   * The color to use when drawing the icon.
   * Defaults to the current text color.
   */
  color?: string | Color;

  /**
   * Semantic label for accessibility.
   */
  semanticLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
});

const isComponent = computed(() => {
  return typeof props.icon === "object" || typeof props.icon === "function";
});

const isPathString = computed(() => {
  return typeof props.icon === "string" && props.icon.trim().length > 0;
});

const iconStyle = computed(() => {
  const s = px2vw(props.size);
  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: s,
    height: s,
    fontSize: s, // For font-based icons if slot is used
    color: resolveColor(props.color) || "inherit",
    lineHeight: 1,
    verticalAlign: "middle",
    userSelect: "none",
    pointerEvents: "none",
  };
  return style;
});

const svgStyle: CSSProperties = {
  display: "block",
  width: "100%",
  height: "100%",
  fill: "currentColor",
};
</script>

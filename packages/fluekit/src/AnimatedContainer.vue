<template>
  <div class="animated-container" :style="computedStyle" v-bind="mixedAttrs">
    <slot />
    <div v-if="props.foregroundDecoration" :style="foregroundStyle" />
  </div>
</template>

<script setup lang="ts">
import { computed, CSSProperties } from "vue";
import type { BoxConstraints } from "./BoxConstraints";
import { boxConstraintsToStyle } from "./BoxConstraints";
import type { BoxDecoration } from "./BoxDecoration";
import { boxDecorationToStyle } from "./BoxDecoration";
import type { EdgeInsets } from "./EdgeInsets";
import { marginToStyle, paddingToStyle } from "./EdgeInsets";
import { alignmentToOrigin, alignmentToStyle, type Alignment } from "./FlexProps";
import { sizeToStyle } from "./Size";
import { useGestureEvents, useGestureStyle } from "./useGesture";
import { useSafeAttrs } from "./useSafeAttrs";
import { useStyles } from "./StyleProvider";
defineOptions({ inheritAttrs: false });

interface Props {
  width?: number | string;
  height?: number | string;
  padding?: EdgeInsets;
  margin?: EdgeInsets;
  decoration?: BoxDecoration;
  foregroundDecoration?: BoxDecoration;
  color?: string;
  alignment?: Alignment | string;
  clipBehavior?: "none" | "hardEdge" | "antiAlias" | string;
  transform?: string;
  transformAlignment?: Alignment | string;
  constraints?: BoxConstraints;
  duration?: number;
  curve?: string;
}

const _styles = useStyles();

const safeAttrs = useSafeAttrs();
const events = useGestureEvents();
const mixedAttrs = computed(() => {
  if ((_styles.value as unknown as CSSProperties).pointerEvents == "none") {
    return safeAttrs.value;
  }
  return { ...safeAttrs.value, ...(events || {}) };
});
const gestureStyle = useGestureStyle();

const props = withDefaults(defineProps<Props>(), {
  clipBehavior: "none",
  duration: 300,
  curve: "linear",
});

const transitionStyle = computed(() => {
  return `all ${props.duration}ms ${props.curve}`;
});

const computedStyle = computed(() => {
  const baseStyle: any = {
    ...sizeToStyle(props),
    ...paddingToStyle(props.padding),
    ...marginToStyle(props.margin),
    ...boxDecorationToStyle(props.decoration),
    ...alignmentToStyle(props.alignment as Alignment, "column"),
    ...boxConstraintsToStyle(props.constraints),
    ...gestureStyle,
    transition: transitionStyle.value,
  };

  if (props.color && !props.decoration) {
    baseStyle.backgroundColor = props.color;
  }

  if (props.transform) {
    baseStyle.transform = props.transform;
    if (props.transformAlignment) {
      baseStyle.transformOrigin = alignmentToOrigin(props.transformAlignment as Alignment);
    }
  }

  if (props.clipBehavior !== "none") {
    switch (props.clipBehavior) {
      case "hardEdge":
        baseStyle.overflow = "hidden";
        break;
      case "antiAlias":
        baseStyle.overflow = "hidden";
        // baseStyle.borderRadius could be handled by decoration
        break;
      default:
        break;
    }
  }

  return {
    ...baseStyle,
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    boxSizing: "border-box",
    position: "relative",
  } as CSSProperties;
});

const foregroundStyle = computed(() => {
  return {
    ...boxDecorationToStyle(props.foregroundDecoration),
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
    transition: transitionStyle.value,
  } as CSSProperties;
});
</script>

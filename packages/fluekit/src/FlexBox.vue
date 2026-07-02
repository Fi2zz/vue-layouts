<template>
  <component :is="as" :class="flexClasses" :style="flexStyles">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { boxConstraintsToStyle } from "./BoxConstraints";
import { FlexBoxProps, flexBoxToStyle, MainAxisSize } from "./FlexProps";
import { useStyles } from "./StyleProvider";
defineOptions({ name: "FlexBox", inheritAttrs: false });
const props = withDefaults(defineProps<FlexBoxProps>(), {
  direction: "row",
  mainAxisSize: MainAxisSize.max,
  wrap: false,
  expanded: false,
  as: "div",
});
const _styles = useStyles();
// 计算 CSS 类名
const flexClasses = computed(() => {
  const classes = ["flex-box", `flex-box-${props.direction}`];
  if (props.expanded) classes.push("flex-expanded");
  if (props.mainAxisSize === MainAxisSize.min) classes.push("main-axis-min");
  return classes.join(" ");
});

// 计算 CSS 样式
const flexStyles = computed(() => {
  const styles = flexBoxToStyle(props);
  const isRow = props.direction?.includes("row");
  const isCol = props.direction?.includes("column");
  // Handle MainAxisSize
  if (props.mainAxisSize === MainAxisSize.min) {
    if (isRow) styles.width = "fit-content";
    if (isCol) styles.height = "fit-content";
  } else {
    // max (default)
    if (isRow) styles.width = "100%";
    if (isCol) styles.height = "100%";
  }
  if (props.expanded) {
    styles.flex = "1";
    styles.width = "100%";
    styles.height = "100%";
  }

  if (props.constraints) Object.assign(styles, boxConstraintsToStyle(props.constraints));
  if (_styles) Object.assign(styles, _styles.value);

  return styles;
});
</script>

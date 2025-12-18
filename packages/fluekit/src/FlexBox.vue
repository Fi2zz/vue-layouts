<template>
  <component :is="as" :class="flexClasses" :style="flexStyles" v-bind="safeAttrs">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, CSSProperties } from "vue";
import { boxConstraintsToStyle } from "./BoxConstraints";
import {
  CrossAxisAlignment,
  FlexBoxAlignMap,
  FlexBoxJustifyMap,
  FlexBoxProps,
  MainAxisAlignment,
} from "./FlexProps";
import { px2vw } from "./px2vw";
import { useSafeAttrs } from "./useSafeAttrs";

defineOptions({
  name: "FlexBox",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<FlexBoxProps>(), {
  direction: "row",
  mainAxisAlignment: MainAxisAlignment.start,
  crossAxisAlignment: CrossAxisAlignment.start,
  wrap: false,
  gap: 0,
  expanded: false,
  as: "div",
});
const safeAttrs = useSafeAttrs();
// 计算 CSS 类名
const flexClasses = computed(() => {
  const classes = ["flex-box", `flex-box-${props.direction}`];
  if (props.expanded) classes.push("flex-expanded");
  return classes.join(" ");
});

// 计算 CSS 样式
const flexStyles = computed(() => {
  const mainAxisAlignment = props.mainAxisAlignment as unknown as string;
  const crossAxisAlignment = props.crossAxisAlignment as unknown as string;
  const styles: CSSProperties = {
    display: "flex",
    flexDirection: props.direction as CSSProperties["flexDirection"],
    flexWrap: props.wrap ? "wrap" : "nowrap",
  };

  styles.justifyContent = FlexBoxJustifyMap[mainAxisAlignment] || mainAxisAlignment;
  styles.alignItems = FlexBoxAlignMap[crossAxisAlignment] || crossAxisAlignment;
  styles.gap = px2vw(props.gap);
  if (props.expanded) {
    styles.flex = "1";
    styles.width = "100%";
    styles.height = "100%";
  }

  if (props.constraints) Object.assign(styles, boxConstraintsToStyle(props.constraints));
  return styles;
});
</script>

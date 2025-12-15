<template>
  <component :is="as" :class="flexClasses" :style="flexStyles">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { px2vw } from "@/px2vw";
import { computed, CSSProperties } from "vue";
import {
  MainAxisAlignment,
  FlexBoxProps,
  FlexBoxAlignMap,
  FlexBoxJustifyMap,
} from "@/Flex";
import { CrossAxisAlignment } from "@/Flex";
import { sizeToStyle } from "@/Size";
import { useAttrs } from "vue";
import { boxConstraintsToStyle } from "@/BoxConstraints";

const attrs = useAttrs();
const props = withDefaults(defineProps<FlexBoxProps>(), {
  direction: "row",
  mainAxisAlignment: MainAxisAlignment.start,
  crossAxisAlignment: CrossAxisAlignment.start,
  wrap: false,
  gap: 0,
  expanded: false,
  as: "div",
});
// 计算 CSS 类名
const flexClasses = computed(() => {
  const classes = ["flex-box", `flex-box-${props.direction}`, attrs.class];
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

  if (attrs.style) Object.assign(styles, attrs.style);

  styles.justifyContent = FlexBoxJustifyMap[mainAxisAlignment];
  styles.alignItems = FlexBoxAlignMap[crossAxisAlignment];
  styles.gap = px2vw(props.gap);
  if (props.expanded) {
    styles.flex = "1";
    styles.width = "100%";
    styles.height = "100%";
  } else if (props.size) Object.assign(styles, sizeToStyle(props.size));

  if (props.constraints)
    Object.assign(styles, boxConstraintsToStyle(props.constraints));
  return styles;
});
</script>

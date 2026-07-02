<template>
  <StyleProvider :style="_style">
    <FlexBox
      :direction="flexDirection"
      :mainAxisAlignment="alignment"
      :crossAxisAlignment="crossAxisAlignment"
      wrap
      :gap="`${props.runSpacing} ${props.spacing}`"
    >
      <slot />
    </FlexBox>
  </StyleProvider>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { Clip, clipBehaviorToStyle } from "./Clip";
import FlexBox from "./FlexBox.vue";
import {
  CrossAxisAlignment,
  FlexAlignContentMap,
  FlexDirectionMap,
  MainAxisAlignment,
  type AlignContent,
} from "./FlexProps";
import { StyleProvider } from "./StyleProvider";

defineOptions({ inheritAttrs: false });

interface Props {
  direction?: "horizontal" | "vertical";
  alignment?: MainAxisAlignment;
  spacing?: number; // 主轴方向间距
  runAlignment?: AlignContent;
  runSpacing?: number; // 纵轴方向间距 (行间距)
  crossAxisAlignment?: CrossAxisAlignment;
  verticalDirection?: "down" | "up";
  clipBehavior?: Clip;
}
const props = withDefaults(defineProps<Props>(), {
  direction: "horizontal",
  alignment: MainAxisAlignment.start,
  spacing: 0,
  runAlignment: FlexAlignContentMap.start,
  runSpacing: 0,
  crossAxisAlignment: CrossAxisAlignment.start,
  verticalDirection: "down",
  clipBehavior: Clip.none,
});
const flexDirection = computed(() => {
  const down = props.verticalDirection === "down";
  const direction = FlexDirectionMap[props.direction];
  return down ? direction : `${direction}-reverse`;
});
const _style = computed<CSSProperties>(() => {
  return Object.assign({}, clipBehaviorToStyle(props.clipBehavior), {
    alignContent: FlexAlignContentMap[props.runAlignment] || props.runAlignment,
  });
});
</script>

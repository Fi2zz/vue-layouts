<template>
  <FlexBox v-bind="pickProps($props)" class="flex-center-box">
    <slot></slot>
  </FlexBox>
</template>
<script setup lang="ts">
import { BoxConstraints } from "./BoxConstraints";
import { FlexBoxProps } from "./FlexProps";
import { isNumber, pick } from "./utils";
import { Size } from "./Size";
import FlexBox from "./FlexBox.vue";
type Props = Omit<FlexBoxProps, "mainAxisAlignment" | "crossAxisAlignment"> & {
  /** 容器宽度 */
  width?: number | string;
  /** 容器高度 */
  height?: number | string;
  /** 最小宽度 */
  minWidth?: number | string;
  /** 最小高度 */
  minHeight?: number | string;
  /** 最大宽度 */
  maxWidth?: number | string;
  /** 最大高度 */
  maxHeight?: number | string;
  /** 是否占满父容器宽度 */
  widthFactor?: number;
  /** 是否占满父容器高度 */
  heightFactor?: number;
  zIndex?: number | string;
};

withDefaults(defineProps<Props>(), {
  direction: "row",
});

const pickProps = (props: Props) => {
  const {
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    widthFactor,
    heightFactor,
    wrap,
    expanded,
    gap,
    as,
    direction,
  } = props;
  const size = Size(pick(props, ["width", "height"]));
  const constraints: BoxConstraints = props.constraints ?? {};
  // 处理因子
  if (isNumber(widthFactor) && size) size.width = `${widthFactor * 100}%`;
  if (isNumber(heightFactor) && size) size.height = `${heightFactor * 100}%`;

  if (!props.constraints) {
    if (isNumber(minWidth)) constraints.minWidth = minWidth;
    if (isNumber(minHeight)) constraints.minHeight = minHeight;
    if (isNumber(maxWidth)) constraints.maxWidth = maxWidth;
    if (isNumber(maxHeight)) constraints.maxHeight = maxHeight;
  }
  return {
    expanded,
    gap,
    as,
    ...size,
    direction,
    wrap,
    constraints: BoxConstraints(constraints),
    mainAxisAlignment: "center",
    crossAxisAlignment: "center",
  } as FlexBoxProps;
};
</script>
<style scoped>
/* 确保子元素能够正确居中 */
.flex-center-box > * {
  flex-shrink: 0;
}
</style>

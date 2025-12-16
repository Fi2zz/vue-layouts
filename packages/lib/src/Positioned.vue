<template>
  <div class="positioned" :style="positionedStyle" @click="$emit('click')">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// import IgnorePointer from "./IgnorePointer.vue";

import { px2vw } from "./px2vw";
import { PositionProps } from "./Position";
defineEmits(["click"]);

const props = withDefaults(defineProps<PositionProps>(), {
  position: "absolute",
  zIndex: 1,
  ignorePointer: false,
  centered: false,
  centeredX: false,
  centeredY: false,
});

// 计算定位样式
const positionedStyle = computed(() => {
  const style: Record<string, string | number> = {
    position: props.position,
    zIndex: props.zIndex,
    boxSizing: "border-box",
  };

  if (props.ignorePointer) style.pointerEvents = "none";
  // 如果设置了 fill，则填充整个父容器
  if (props.fill) {
    style.top = "0";
    style.left = "0";
    style.right = "0";
    style.bottom = "0";
    return style;
  }
  const widthValue = px2vw(props.width!);
  const heightValue = px2vw(props.height!);

  if (widthValue !== undefined) style.width = widthValue;
  if (heightValue !== undefined) style.height = heightValue;

  if (props.centered) {
    style.top = "50%";
    style.left = "50%";
    style.transform = "translate(-50%, -50%)";

    return style;
  }

  if (props.transform) style.transform = props.transform;
  if (props.centeredX) {
    style.left = "50%";
    if (!style.transform) style.transform = "";
    style.transform += "translateX(-50%)";
  }
  if (props.centeredY) {
    style.top = "50%";
    if (!style.transform) style.transform = "";
    style.transform = "translateY(-50%)";
  }

  // 设置定位属性
  const topValue = px2vw(props.top!);
  const bottomValue = px2vw(props.bottom!);
  const leftValue = px2vw(props.left!);
  const rightValue = px2vw(props.right!);
  const _translateX = px2vw(props.translateX!);
  const _translateY = px2vw(props.translateY!);

  if (topValue !== undefined) style.top = topValue;
  if (bottomValue !== undefined) style.bottom = bottomValue;
  if (leftValue !== undefined) style.left = leftValue;
  if (rightValue !== undefined) style.right = rightValue;

  if (!props.transform) {
    let translateX: string = "",
      translateY: string = "";
    if (_translateX !== undefined) translateX = `translateX(${_translateX})`;
    if (_translateY !== undefined) translateY = `translateY(${_translateY})`;

    if (translateX || translateY) {
      style.transform = "";
      if (translateX) style.transform += translateX;
      if (translateY) style.transform += translateY;
    }
  }

  return style;
});
</script>

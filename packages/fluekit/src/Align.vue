<template>
  <div class="flutter-align" :style="containerStyle">
    <div class="flutter-align-child" :style="childWrapperStyle">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { type Alignment, alignmentToStyle } from "./FlexProps";

defineOptions({ inheritAttrs: false });

interface Props {
  alignment?: Alignment;
  widthFactor?: number;
  heightFactor?: number;
}

const props = withDefaults(defineProps<Props>(), {
  alignment: "center",
});

const containerStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    display: "flex",
    position: "relative",
  };

  // 应用对齐
  Object.assign(style, alignmentToStyle(props.alignment));

  // 应用 Factor
  if (props.widthFactor) {
    style.width = `calc(100% * ${props.widthFactor})`;
  } else {
    // 默认行为：Align 尽量撑满父容器
    style.width = "100%";
  }

  if (props.heightFactor) {
    style.height = `calc(100% * ${props.heightFactor})`;
  } else {
    style.height = "100%";
  }

  return style;
});

const childWrapperStyle = computed<CSSProperties>(() => {
  // 如果有 factor，子元素可能需要缩放或保持原样，这里主要是为了让 flex 生效
  return {
    flexShrink: 0,
  };
});
</script>

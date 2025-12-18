<template>
  <div class="flutter-stack" :style="stackStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { provideStackContext } from "./useStack";

defineOptions({ inheritAttrs: false });

interface StackProps {
  /** 对齐方式 */
  alignment?:
    | "topLeft"
    | "topCenter"
    | "topRight"
    | "centerLeft"
    | "center"
    | "centerRight"
    | "bottomLeft"
    | "bottomCenter"
    | "bottomRight";
  /** 裁剪行为 */
  clipBehavior?: "none" | "hardEdge" | "antiAlias" | "clip";
  /** 文本方向 */
  textDirection?: "ltr" | "rtl";
  /** 堆叠方式 */
  fit?: "loose" | "expand" | "passthrough";

  // 移除 width, height, zIndex, style - 这些应该由 Container 或 SizedBox 控制
}

const props = withDefaults(defineProps<StackProps>(), {
  alignment: "topLeft",
  clipBehavior: "none",
  textDirection: "ltr",
  fit: "loose",
});

const alignmentMap = {
  topLeft: { justifyContent: "flex-start", alignItems: "flex-start" },
  topCenter: { justifyContent: "flex-start", alignItems: "center" },
  topRight: { justifyContent: "flex-start", alignItems: "flex-end" },
  centerLeft: { justifyContent: "center", alignItems: "flex-start" },
  center: { justifyContent: "center", alignItems: "center" },
  centerRight: { justifyContent: "center", alignItems: "flex-end" },
  bottomLeft: { justifyContent: "flex-end", alignItems: "flex-start" },
  bottomCenter: { justifyContent: "flex-end", alignItems: "center" },
  bottomRight: { justifyContent: "flex-end", alignItems: "flex-end" },
};

const clipBehaviorMap = {
  clip: "hidden",
  hardEdge: "hidden",
  antiAlias: "hidden",
  none: "visible",
};

const stackStyle = computed((): CSSProperties => {
  const alignment = alignmentMap[props.alignment];

  const style: CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    ...alignment,
    overflow: clipBehaviorMap[props.clipBehavior],
    direction: props.textDirection,
    boxSizing: "border-box",
  };
  if (props.fit === "expand") {
    style.width = "100%";
    style.height = "100%";
  }
  return style;
});

provideStackContext();
</script>
<style scoped>
.flutter-stack > * {
  flex-shrink: 0;
}
</style>

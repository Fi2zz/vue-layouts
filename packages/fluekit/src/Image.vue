<template>
  <div class="fluekit-image-container" :style="containerStyle" v-bind="safeAttrs">
    <img
      :src="props.image.src"
      class="fluekit-image"
      :style="imageStyle"
      :alt="alt"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { Alignment, alignmentToOrigin } from "./Alignment";
import { type ImageProvider, isImageProvider } from "./ImageProvider";
import { sizeToStyle } from "./Size";
import { useSafeAttrs } from "./useSafeAttrs";
import { validateInDev } from "./utils";

defineOptions({ inheritAttrs: false });

export type BoxFit = "fill" | "contain" | "cover" | "fitWidth" | "fitHeight" | "none" | "scaleDown";
export type BlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "darken"
  | "lighten"
  | "color-dodge"
  | "color-burn"
  | "hard-light"
  | "soft-light"
  | "difference"
  | "exclusion"
  | "hue"
  | "saturation"
  | "color"
  | "luminosity";

interface Props {
  image: ImageProvider;
  width?: number | string;
  height?: number | string;
  color?: string;
  colorBlendMode?: BlendMode;
  fit?: BoxFit;
  alignment?: Alignment;
  repeat?: "no-repeat" | "repeat" | "repeat-x" | "repeat-y" | "round" | "space";
  opacity?: number;
  filterQuality?: "low" | "medium" | "high";
  alt?: string;
}

const props = withDefaults(defineProps<Props>(), {
  fit: "contain",
  alignment: "center",
  repeat: "no-repeat",
  opacity: 1.0,
  filterQuality: "medium",
  alt: "",
});

const emit = defineEmits<{
  (e: "load", event: Event): void;
  (e: "error", event: Event): void;
}>();

const safeAttrs = useSafeAttrs();

// 验证 image 参数
validateInDev(() => {
  if (!isImageProvider(props.image)) {
    console.warn("[Image] The 'image' prop must be a valid ImageProvider.");
  }
});

// 容器样式 (处理尺寸)
const containerStyle = computed(() => {
  const style: CSSProperties = {
    position: "relative",
    display: "inline-block", // 默认内联块级，类似 img 行为
    overflow: "hidden", // 裁剪溢出
    lineHeight: 0, // 消除 img 底部空隙
  };

  Object.assign(style, sizeToStyle({ width: props.width, height: props.height }));

  return style;
});

// BoxFit 映射到 CSS object-fit
const fitMap: Record<BoxFit, CSSProperties["objectFit"]> = {
  fill: "fill",
  contain: "contain",
  cover: "cover",
  fitWidth: "contain", // CSS 没有直接的 fitWidth，近似处理，或者需要更复杂的 JS 计算
  fitHeight: "contain",
  none: "none",
  scaleDown: "scale-down",
};

// Alignment 映射到 CSS object-position
const alignmentStyle = computed(() => {
  return alignmentToOrigin(props.alignment); // 复用 alignmentToOrigin，它返回 "x% y%" 格式
});

// 图片样式
const imageStyle = computed(() => {
  const style: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: fitMap[props.fit],
    objectPosition: alignmentStyle.value,
    opacity: props.opacity,
    imageRendering: props.filterQuality === "low" ? "pixelated" : "auto", // 简化映射
  };

  // 处理颜色混合
  if (props.color) {
    // 使用 filter: drop-shadow 或者 mix-blend-mode 很难在单层 img 上完美模拟 Flutter 的 colorBlendMode
    // Flutter 的 colorBlendMode 是将颜色层与图片层混合
    // 这里尝试使用 filter 模拟简单的染色，或者 mix-blend-mode
    // 但 mix-blend-mode 需要两个元素。
    // 简单的单层实现：
    // 如果只需要蒙层，可以在 container 上加伪元素，但这里我们只操作 style
  }

  return style;
});

const onLoad = (e: Event) => emit("load", e);
const onError = (e: Event) => emit("error", e);
</script>

<style scoped>
.fluekit-image-container {
  /* 容器基础样式 */
}

.fluekit-image {
  display: block;
}
</style>

<template>
  <div class="container-box" :style="computedStyle" @click="$emit('click')">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { textStyleToStyle, TextStyle } from "./TextStyle";
import { computed } from "vue";
import type { BoxConstraints } from "./BoxConstraints";
import { boxConstraintsToStyle } from "./BoxConstraints";
// 引入 BoxDecoration 类型与背景图构造工具
import type {
  BoxDecoration,
  DecorationImage as DecorationImageType,
} from "./BoxDecoration";
import { boxDecorationToStyle, DecorationImage } from "./BoxDecoration";
import type { EdgeInsets } from "./EdgeInsets";
import { marginToStyle, paddingToStyle } from "./EdgeInsets";
import { Size, sizeToStyle } from "./Size";
import { CSSProperties } from "vue";
import { flexAlignmentToStyle, type FlexAlignment } from "./FlexProps";
import { PositionProps, positionToStyle } from "./Position";

interface Props {
  width?: number | string;
  height?: number | string;
  padding?: EdgeInsets;
  margin?: EdgeInsets;
  decoration?: BoxDecoration;
  color?: string;
  alignment?: FlexAlignment | string;
  clipBehavior?: "none" | "hardEdge" | "antiAlias" | string;
  transform?: string;
  constraints?: BoxConstraints;
  textStyle?: ReturnType<typeof TextStyle>;
  noFlex?: boolean;
  /**
   * 中文说明：
   * - 背景图的简化入口，支持传入 DecorationImage 或字符串（图片地址）。
   * - 若同时设置了 `decoration.image` 与 `image`，以 `image` 覆盖（更显式的值优先）。
   */
  image?: DecorationImageType;
  zIndex?: number | string;
  position?: PositionProps;
}

defineEmits(["click"]);

const props = withDefaults(defineProps<Props>(), {
  clipBehavior: "none",
  alignment: "topLeft",
  width: "100%",
  height: "100%",
  noFlex: false,
});

/**
 * 计算最终样式
 * 中文说明：
 * - 将尺寸、约束、间距、装饰（含背景图）、文本样式与对齐统一转换为内联样式。
 * - 背景图合并策略：优先使用 `props.image`，否则使用 `props.decoration?.image`；最终统一交由 `boxDecorationToStyle` 生成 CSS。
 */
const computedStyle = computed(() => {
  const style: CSSProperties = {
    backgroundColor: props.color,
    transform: props.transform,
    transformOrigin: props.transform ? "center" : undefined,
    overflow: props.clipBehavior !== "none" ? "hidden" : undefined,
    position: "relative",
    zIndex: props.zIndex,
  };
  if (!props.noFlex) {
    Object.assign(style, {
      display: "flex",
      flexDirection: "column",
      position: "relative",
    });
  }

  const size = Size(props);
  Object.assign(style, sizeToStyle(size));
  Object.assign(style, boxConstraintsToStyle(props.constraints));
  Object.assign(style, paddingToStyle(props.padding));
  Object.assign(style, marginToStyle(props.margin));
  // 中文说明：
  // - 统一构造装饰对象，避免双入口导致样式分散；保持 `gradient > image` 优先级。
  const decoration: BoxDecoration = { ...(props.decoration ?? {}) };
  if (props.image) decoration.image = DecorationImage(props.image);
  Object.assign(style, boxDecorationToStyle(decoration));
  Object.assign(style, textStyleToStyle(props.textStyle));
  Object.assign(style, flexAlignmentToStyle(props.alignment as FlexAlignment));
  if (props.position) {
    Object.assign(style, positionToStyle(props.position));
  }

  return style;
});
</script>

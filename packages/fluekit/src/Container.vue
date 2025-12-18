<template>
  <div class="container-box" :style="computedStyle" v-bind="mixedAttrs">
    <slot />
    <div v-if="props.foregroundDecoration" :style="foregroundStyle" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSafeAttrs } from "./useSafeAttrs";
import type { BoxConstraints } from "./BoxConstraints";
import { boxConstraintsToStyle } from "./BoxConstraints";
defineOptions({ inheritAttrs: false });
// 引入 BoxDecoration 类型与背景图构造工具
import { CSSProperties } from "vue";
import type { BoxDecoration } from "./BoxDecoration";
import { boxDecorationToStyle } from "./BoxDecoration";
import type { EdgeInsets } from "./EdgeInsets";
import { marginToStyle, paddingToStyle } from "./EdgeInsets";
import { alignmentToStyle, alignmentToOrigin, type FlexAlignment } from "./FlexProps";
import { sizeToStyle } from "./Size";
import { useGestureEvents, useGestureStyle } from "./useGesture";

interface Props {
  width?: number | string;
  height?: number | string;
  padding?: EdgeInsets;
  margin?: EdgeInsets;
  decoration?: BoxDecoration;
  foregroundDecoration?: BoxDecoration;
  color?: string;
  alignment?: FlexAlignment | string;
  clipBehavior?: "none" | "hardEdge" | "antiAlias" | string;
  transform?: string;
  transformAlignment?: FlexAlignment | string;
  constraints?: BoxConstraints;
}
const safeAttrs = useSafeAttrs();
const events = useGestureEvents();
const mixedAttrs = computed(() => {
  return { ...safeAttrs.value, ...(events || {}) };
});
const gestureStyle = useGestureStyle();
const props = withDefaults(defineProps<Props>(), {
  clipBehavior: "none",
});

const isNegative = (val?: string | number) => {
  if (typeof val === "number") return val < 0;
  if (typeof val === "string") return parseFloat(val) < 0;
  return false;
};

// Props 校验与约束逻辑
// 对应 Flutter Container 的 assert 逻辑
const validateProps = () => {
  // 1. assert(margin == null || margin.isNonNegative)
  if (props.margin) {
    const { left, top, right, bottom } = props.margin;
    if (isNegative(left) || isNegative(top) || isNegative(right) || isNegative(bottom)) {
      console.warn("[Container] margin must be non-negative");
    }
  }

  // 2. assert(padding == null || padding.isNonNegative)
  if (props.padding) {
    const { left, top, right, bottom } = props.padding;
    if (isNegative(left) || isNegative(top) || isNegative(right) || isNegative(bottom)) {
      console.warn("[Container] padding must be non-negative");
    }
  }

  // 3. assert(color == null || decoration == null)
  if (props.color && props.decoration) {
    console.warn(
      '[Container] Cannot provide both a color and a decoration\nTo provide both, use "decoration: { color: color }".',
    );
  }

  // 4. assert(decoration != null || clipBehavior == Clip.none)
  if (!props.decoration && props.clipBehavior !== "none") {
    console.warn("[Container] clipBehavior has no effect when decoration is null");
  }
};

validateProps();

/**
 * 计算最终样式
 * 中文说明：
 * - 将尺寸、约束、间距、装饰与对齐统一转换为内联样式。
 */
const computedStyle = computed(() => {
  // 注意：useAttrs() 在 inheritAttrs: true 时，style 和 class 会自动合并到根元素
  // 但我们在这里手动处理 style 是为了确保计算属性的优先级和合并逻辑正确
  // 如果移除了 inheritAttrs: false，Vue 会自动合并 style，我们这里再次合并可能导致重复
  // 但由于我们绑定的是 :style="computedStyle"，Vue 足够智能处理合并
  // 更好的做法是让 attrs.style 参与计算，但不直接依赖 Vue 的自动合并，或者明确分离

  // 然而，为了支持 GestureDetector 的 cloneVNode 注入，我们需要组件根元素能接收 onClick 等事件
  // 默认的 inheritAttrs: true 就能做到这一点（将未定义的 props 如 onClick 透传给根 div）

  // styleProp 已被 useSafeAttrs 过滤，所以我们只使用组件自身的样式逻辑

  // 处理 color vs decoration 冲突：如果 decoration 存在，忽略 props.color
  const effectiveColor = props.decoration ? undefined : props.color;
  const style: CSSProperties = {
    backgroundColor: effectiveColor,
    transform: props.transform,
    transformOrigin: props.transformAlignment
      ? alignmentToOrigin(props.transformAlignment as FlexAlignment)
      : "center",
    overflow: props.clipBehavior !== "none" ? "hidden" : undefined,
    position: "relative",
  };
  if (props.alignment) {
    Object.assign(style, {
      display: "flex",
      flexDirection: "column",
    });
    Object.assign(style, alignmentToStyle(props.alignment as FlexAlignment, "column"));
  }

  Object.assign(style, sizeToStyle(props));

  // 处理 constraints = (width != null || height != null) ? constraints?.tighten(...) : constraints
  // 逻辑：如果设置了 width/height，则覆盖 constraints 中的对应限制
  const constraintsStyle: CSSProperties = boxConstraintsToStyle(props.constraints);
  if (props.width !== undefined && props.width !== null) {
    delete constraintsStyle.minWidth;
    delete constraintsStyle.maxWidth;
  }
  if (props.height !== undefined && props.height !== null) {
    delete constraintsStyle.minHeight;
    delete constraintsStyle.maxHeight;
  }
  Object.assign(style, constraintsStyle);
  Object.assign(style, paddingToStyle(props.padding));
  Object.assign(style, marginToStyle(props.margin));
  Object.assign(style, boxDecorationToStyle(props.decoration));
  Object.assign(style, gestureStyle);

  if (props.clipBehavior === "antiAlias") {
    // 简单的抗锯齿处理，实际可能需要 clip-path
    style.borderRadius = style.borderRadius || "inherit";
  }
  return style;
});

const foregroundStyle = computed(() => {
  const style: CSSProperties = {
    position: "absolute",
    pointerEvents: "none", // 确保不阻挡交互
    zIndex: 1, // 确保在内容之上
    inset: 0, // 填充父容器
  };
  Object.assign(style, boxDecorationToStyle(props.foregroundDecoration));
  return style;
});
</script>

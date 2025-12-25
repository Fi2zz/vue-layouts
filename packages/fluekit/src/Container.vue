<template>
  <div class="container-box" :style="computedStyle" v-bind="mixedAttrs">
    <slot />
    <div v-if="props.foregroundDecoration" :style="foregroundStyle" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { BoxConstraints } from "./BoxConstraints";
import { boxConstraintsToStyle, isBoxConstraints } from "./BoxConstraints";
import { useStyles } from "./StyleProvider";
import { useSafeAttrs } from "./useSafeAttrs";
import { isDefined, validateInDev } from "./utils";
defineOptions({ inheritAttrs: false });
// 引入 BoxDecoration 类型与背景图构造工具
import { CSSProperties } from "vue";
import { Alignment, alignmentToFlex, alignmentToOrigin } from "./Alignment";
import type { BoxDecoration } from "./BoxDecoration";
import { boxDecorationToStyle, isBoxDecoration } from "./BoxDecoration";
import type { EdgeInsets } from "./EdgeInsets";
import { isEdgeInsets, marginToStyle, paddingToStyle } from "./EdgeInsets";
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
  alignment?: Alignment;
  clipBehavior?: "none" | "hardEdge" | "antiAlias" | string;
  transform?: string;
  transformAlignment?: Alignment;
  constraints?: BoxConstraints;
}

const _styles = useStyles();

const safeAttrs = useSafeAttrs();
const events = useGestureEvents();
const mixedAttrs = computed(() => {
  //@ts-ignore
  if ((_styles.value as unknown as CSSProperties).pointerEvents == "none") {
    return safeAttrs.value;
  }

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

  // 5. assert(decoration must be created using BoxDecoration constructor)
  if (props.decoration && !isBoxDecoration(props.decoration)) {
    console.warn(
      "[Container] decoration must be created using BoxDecoration constructor.\nExample: decoration=\"BoxDecoration({ color: 'red' })\"",
    );
  }

  // 6. assert(foregroundDecoration must be created using BoxDecoration constructor)
  if (props.foregroundDecoration && !isBoxDecoration(props.foregroundDecoration)) {
    console.warn(
      "[Container] foregroundDecoration must be created using BoxDecoration constructor.\nExample: foregroundDecoration=\"BoxDecoration({ color: 'red' })\"",
    );
  }

  // 7. assert(padding must be created using EdgeInsets constructor)
  if (props.padding && !isEdgeInsets(props.padding)) {
    console.warn(
      '[Container] padding must be created using EdgeInsets constructor.\nExample: padding="EdgeInsets.all(10)".',
    );
  }

  // 8. assert(margin must be created using EdgeInsets constructor)
  if (props.margin && !isEdgeInsets(props.margin)) {
    console.warn(
      '[Container] margin must be created using EdgeInsets constructor.\nExample: margin="EdgeInsets.symmetric({ vertical: 10 })".',
    );
  }

  // 9. assert(constraints must be created using BoxConstraints constructor)
  if (props.constraints && !isBoxConstraints(props.constraints)) {
    console.warn(
      '[Container] constraints must be created using BoxConstraints constructor.\nExample: constraints="BoxConstraints({ minWidth: 100 })".',
    );
  }
};

validateInDev(validateProps);

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
      ? alignmentToOrigin(props.transformAlignment)
      : "center",
    overflow: props.clipBehavior !== "none" ? "hidden" : undefined,
    position: "relative",
  };

  Object.assign(style, _styles.value);

  if (props.alignment) {
    Object.assign(style, {
      display: "flex",
      flexDirection: "column",
    });
    // Use alignmentToFlex instead of alignmentToStyle (deprecated)
    Object.assign(style, alignmentToFlex(props.alignment, "column"));
  }

  Object.assign(style, sizeToStyle(props));

  // 处理 constraints = (width != null || height != null) ? constraints?.tighten(...) : constraints
  // 逻辑：如果设置了 width/height，则覆盖 constraints 中的对应限制
  const constraintsStyle: CSSProperties = boxConstraintsToStyle(props.constraints);

  if (isDefined(props.width)) {
    delete constraintsStyle.minWidth;
    delete constraintsStyle.maxWidth;
  }
  if (isDefined(props.height)) {
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

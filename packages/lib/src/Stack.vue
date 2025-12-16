<template>
  <div
    ref="stackRef"
    class="flutter-stack"
    :style="stackStyle"
    @click="$emit('click')">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, provide, type CSSProperties } from "vue";
import { px2vw } from "./px2vw";

defineEmits(["click"]);
/**
 * Flutter 风格的 Stack 组件
 * 提供层叠布局功能，支持子组件重叠显示和绝对定位
 */

// 定义组件属性接口
interface StackProps {
  /** 对齐方式，控制未定位子组件的对齐 */
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
  /** 是否裁剪溢出内容 */
  clipBehavior?: "clip" | "hardEdge" | "antiAlias" | "none";
  /** 文本方向 */
  textDirection?: "ltr" | "rtl";
  /** 自定义样式 */
  style?: CSSProperties;
  height?: string | number;
  width?: string | number;
  zIndex?: string | number;
}

// 定义默认属性
const props = withDefaults(defineProps<StackProps>(), {
  alignment: "topLeft",
  clipBehavior: "none",
  textDirection: "ltr",
});

// 模板引用
const stackRef = ref<HTMLElement>();

// 对齐方式映射
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

// 裁剪行为映射
const clipBehaviorMap = {
  clip: "hidden",
  hardEdge: "hidden",
  antiAlias: "hidden",
  none: "visible",
};

// 计算 Stack 容器样式
const stackStyle = computed((): CSSProperties => {
  const alignment = alignmentMap[props.alignment];

  return {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    ...alignment,
    zIndex: props.zIndex,
    overflow: clipBehaviorMap[props.clipBehavior],
    direction: props.textDirection,
    width: px2vw(props.width),
    height: px2vw(props.height),
    boxSizing: "border-box",
    ...props.style,
  };
});

// 提供 Stack 上下文给子组件
provide("stackContext", {
  stackRef,
});

// 暴露组件实例方法
defineExpose({
  /** 获取 Stack 容器元素 */
  getStackElement: () => stackRef.value,
});
</script>

<style scoped>
.flutter-stack > * {
  flex-shrink: 0;
}
</style>

<template>
  <div class="flutter-transform" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { alignmentToOrigin, type Alignment } from "./FlexProps";

defineOptions({ inheritAttrs: false });

interface Props {
  /**
   * CSS 变换字符串
   * 例如: "rotate(45deg)", "scale(1.5)", "translate(10px, 20px)"
   * 对应 Flutter 的 transform (Matrix4)
   */
  transform?: string;

  /**
   * 变换的原点对齐方式
   * 对应 Flutter 的 alignment
   */
  alignment?: Alignment;

  /**
   * 具体的原点偏移 (CSS transform-origin)
   * 如果提供了 alignment，origin 会被忽略或合并（取决于实现，这里优先 alignment）
   */
  origin?: string;
}

const props = withDefaults(defineProps<Props>(), {
  alignment: "center",
});

const style = computed<CSSProperties>(() => {
  const css: CSSProperties = {
    transform: props.transform,
    // 为了不影响布局流，通常 Transform 应该是一个盒子
    // 但 CSS transform 不会改变元素占用的布局空间（layout），只会改变视觉位置（paint）
    // 这与 Flutter 的 Transform 行为一致
    display: "flex", // 保持子元素布局上下文，或者 inline-block
    flexDirection: "column", // 默认行为
    flexShrink: 0,
  };

  if (props.origin) {
    css.transformOrigin = props.origin;
  } else if (props.alignment) {
    css.transformOrigin = alignmentToOrigin(props.alignment);
  }

  return css;
});
</script>

<style scoped>
.flutter-transform {
  box-sizing: border-box;
}
</style>

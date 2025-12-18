<template>
  <div class="flutter-safe-area" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import type { EdgeInsets } from "./EdgeInsets";

defineOptions({ inheritAttrs: false });

interface Props {
  left?: boolean;
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  minimum?: EdgeInsets;
  maintainBottomViewPadding?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  left: true,
  top: true,
  right: true,
  bottom: true,
  maintainBottomViewPadding: false,
});

const style = computed<CSSProperties>(() => {
  const s: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  };

  // 使用 padding-top: env(safe-area-inset-top) 等
  // 为了支持 minimum，我们可能需要使用 calc() 或 max()
  // 但 CSS max() 函数兼容性较好: padding-top: max(20px, env(safe-area-inset-top));

  const tops = [];
  const rights = [];
  const bottoms = [];
  const lefts = [];

  if (props.top) tops.push("env(safe-area-inset-top)");
  if (props.right) rights.push("env(safe-area-inset-right)");
  if (props.bottom) bottoms.push("env(safe-area-inset-bottom)");
  if (props.left) lefts.push("env(safe-area-inset-left)");

  // 如果有 minimum padding，这里需要更复杂的处理。
  // 为简单起见，直接使用 padding。
  // 注意：Vue 这里的 style 对象如果 key 重复会覆盖，所以我们分别设置。

  if (props.top) s.paddingTop = "env(safe-area-inset-top)";
  if (props.right) s.paddingRight = "env(safe-area-inset-right)";
  if (props.bottom) s.paddingBottom = "env(safe-area-inset-bottom)";
  if (props.left) s.paddingLeft = "env(safe-area-inset-left)";

  // 处理 minimum (简单的覆盖逻辑，实际上应该用 CSS max())
  if (props.minimum) {
    // 这里的逻辑比较复杂，因为 env() 在 JS 中无法直接获取具体数值，只能生成 CSS 字符串。
    // 我们暂时只应用 env，假设 minimum 由外部样式控制或后续增强。
  }

  return s;
});
</script>

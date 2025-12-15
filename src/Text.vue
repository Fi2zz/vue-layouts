<template>
  <component
    :is="tag"
    class="flutter-text"
    :style="computedStyle"
    @click="handleClick">
    <slot> {{ text }} </slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { px2vw } from "./px2vw";
import { TextStyle, textStyleToStyle } from "./TextStyle";
import { isUndefined } from "lodash-es";
defineOptions({ inheritAttrs: false });
interface TextProps {
  data?: string | number;
  text?: string | number;
  html?: boolean;
  style?: ReturnType<typeof TextStyle>;
  maxLines?: number;
  tag?: string;
}
const props = withDefaults(defineProps<TextProps>(), { tag: "span" });
const emit = defineEmits<{
  click: [event: MouseEvent];
  tap: [event: MouseEvent];
}>();

const computedStyle = computed(() => {
  const css = textStyleToStyle(props.style) || {};
  css.display = props.tag === "span" ? "inline" : "block";
  if (css.maxHeight) css.maxHeight = px2vw(css.maxHeight);
  if (css.width) css.width = px2vw(css.width);
  if (css.height) css.height = px2vw(css.height);
  if (css.maxWidth) css.maxWidth = px2vw(css.maxWidth);
  if (props.maxLines && props.maxLines > 1) {
    css.overflow = "hidden";
    css.display = "webkit-box";
    //@ts-ignore
    css.webkitBoxOrient = "vertical";
    //@ts-ignore
    css.webkitLineClamp = props.maxLines.toString();
  }

  return css;
});

const text = computed(() => {
  const data = props.data;
  const text = props.text;
  if (!isUndefined(data) && data != null) return data.toString();
  if (!isUndefined(text) && text != null) return text.toString();
  return "";
});

/**
 * 处理点击事件
 */
const handleClick = (event: MouseEvent) => {
  emit("click", event);
  emit("tap", event);
};
</script>

<style scoped>
.flutter-text {
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  /* 字体渲染优化 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  word-break: break-word;
  overflow-wrap: break-word;
  /* 过渡效果 */
  transition: all 0.2s ease-in-out;
}
</style>

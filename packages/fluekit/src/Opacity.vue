<script lang="ts">
import { computed, defineComponent, h } from "vue";
import { StyleProvider } from "./StyleProvider";

export default defineComponent({
  name: "Opacity",
  inheritAttrs: false,
  props: {
    /**
     * 透明度值，范围 0.0 到 1.0
     * 0.0 表示完全透明（不可见）
     * 1.0 表示完全不透明（完全可见）
     * @default 1.0
     */
    opacity: {
      type: Number,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    // 限制 opacity 在 0-1 之间
    const style = computed(() => {
      if (typeof props.opacity == "undefined") return {};
      const opacity = Math.max(0, Math.min(1, props.opacity));
      return { opacity };
    });
    return () => h(StyleProvider, { style: style.value }, slots);
  },
});
</script>

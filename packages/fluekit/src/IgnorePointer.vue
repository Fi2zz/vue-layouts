<script lang="ts">
import { CSSProperties, defineComponent, h, type PropType } from "vue";
import { StyleProvider } from "./StyleProvider";
export default defineComponent({
  name: "IgnorePointer",
  inheritAttrs: false,
  props: {
    /**
     * 是否忽略指针事件
     * 当为 true 时，该组件及其子组件将不会接收任何指针事件
     * 当为 false 时，指针事件正常传递
     * @default false
     */
    ignoring: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    /**
     * 是否忽略语义化事件（如键盘导航、屏幕阅读器等）
     * 当为 true 时，组件对辅助功能不可见
     * 当为 false 时，组件仍然可以被辅助功能访问
     * @default false
     */
    ignoringSemantics: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, { slots }) {
    // 提供忽略状态给子组件
    return () => {
      // 如果没有启用任何忽略功能，直接返回子节点
      if (!props.ignoring && !props.ignoringSemantics) {
        return slots.default?.();
      }
      const style = {
        pointerEvents: props.ignoring ? "none" : undefined,
      } as CSSProperties;
      const attrs = {
        "aria-hidden": props.ignoringSemantics ? "true" : undefined,
      };
      return h(StyleProvider, { style, attrs }, slots);
    };
  },
});
</script>

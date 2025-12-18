<script lang="ts">
import { cloneVNode, defineComponent, type PropType } from "vue";
import { useChild } from "./useChildren";

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
    return () => {
      const child = useChild(slots.default);
      if (!child) return null;
      // 如果没有启用任何忽略功能，直接返回子节点
      if (!props.ignoring && !props.ignoringSemantics) {
        return child;
      }
      const ariaHidden = props.ignoringSemantics ? "true" : undefined;
      const style = {
        pointerEvents: props.ignoring ? "none" : undefined,
      };
      // cloneVNode 会自动合并 props (包括 style 和 class)
      return cloneVNode(child, { style, "aria-hidden": ariaHidden });
    };
  },
});
</script>

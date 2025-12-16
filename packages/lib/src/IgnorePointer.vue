<script lang="ts">
import {
  defineComponent,
  cloneVNode,
  Comment,
  Text,
  type VNode,
  type PropType,
  Fragment,
} from "vue";

export default defineComponent({
  name: "IgnorePointer",
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
      const defaultSlot = slots.default?.();
      if (!defaultSlot) return null;

      // 过滤有效节点（忽略注释和空文本）
      const validNodes = defaultSlot.filter((node) => {
        if (node.type === Comment) return false;
        if (
          node.type === Text &&
          typeof node.children === "string" &&
          !node.children.trim()
        )
          return false;
        // 忽略空的 Fragment
        if (
          node.type === Fragment &&
          Array.isArray(node.children) &&
          node.children.length === 0
        )
          return false;
        return true;
      });

      // 如果没有有效子节点，返回 null
      if (validNodes.length === 0) return null;

      // 如果有多个有效子节点，发出警告并原样返回（无法透传属性）
      if (validNodes.length > 1) {
        console.warn(
          "[IgnorePointer] IgnorePointer widget must have exactly one child. Styles will not be applied."
        );
        return defaultSlot;
      }

      const child = validNodes[0] as VNode;

      // 如果没有启用任何忽略功能，直接返回子节点
      if (!props.ignoring && !props.ignoringSemantics) {
        return child;
      }

      const mergedProps: Record<string, any> = { style: {} };

      if (props.ignoring) {
        // 使用 !important 增强优先级，确保覆盖子组件可能的 pointer-events: auto
        mergedProps.style.pointerEvents = "none !important";
      }

      if (props.ignoringSemantics) {
        mergedProps["aria-hidden"] = "true";
      }

      // cloneVNode 会自动合并 props (包括 style 和 class)
      return cloneVNode(child, mergedProps);
    };
  },
});
</script>

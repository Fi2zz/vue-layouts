<script lang="ts">
import { defineComponent, type PropType, cloneVNode, isVNode, type VNode, Text, h } from "vue";
import { provideIgnoring } from "./useGesture";
import { useChild, useChildren } from "./useChildren";

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
    provideIgnoring(props.ignoring);

    return () => {
      const child = useChildren(slots.default);
      if (!child) return null;

      // 如果没有启用任何忽略功能，直接返回子节点
      if (!props.ignoring && !props.ignoringSemantics) {
        return child;
      }

      // 处理单个子节点
      const processNode = (node: VNode) => {
        // 克隆节点，保留父级传递的所有属性
        const clonedNode = cloneVNode(node);

        // 如果是普通 HTML 标签，设置 pointerEvents
        if (typeof clonedNode.type === "string") {
          // 合并样式
          clonedNode.props = clonedNode.props || {};
          clonedNode.props.style = {
            ...clonedNode.props.style,
            pointerEvents: props.ignoring ? "none" : "auto",
          };
        }

        // 如果是组件或其他类型，递归处理其子节点
        if (clonedNode.children && typeof clonedNode.children === "object") {
          if (Array.isArray(clonedNode.children)) {
            // 处理子节点数组
            clonedNode.children = clonedNode.children.map((childNode: any) => {
              if (isVNode(childNode)) {
                return processNode(childNode);
              }
              return childNode;
            });
          } else if (isVNode(clonedNode.children)) {
            // 处理单个子节点
            clonedNode.children = [processNode(clonedNode.children)];
          }
        }

        return clonedNode;
      };

      // 处理语义化属性
      // if (props.ignoringSemantics) {
      //   return cloneVNode(child, {
      //     "aria-hidden": "true",
      //   });
      // }

      // 处理指针事件
      return child.map((child) => processNode(child));
    };
  },
});
</script>

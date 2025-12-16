<script lang="ts">
import {
  cloneVNode,
  Comment,
  defineComponent,
  Fragment,
  Text,
  type CSSProperties,
  type VNode
} from "vue";
import type { EdgeInsets } from "./EdgeInsets";
import { edgeInsetsToStyle } from "./EdgeInsets";

export default defineComponent({
  name: "Padding",
  props: {
    /** 所有边的内边距（快捷方式） */
    all: [Number, String],
    /** 水平内边距（快捷方式） */
    horizontal: [Number, String],
    /** 垂直内边距（快捷方式） */
    vertical: [Number, String],
    /** 上边距 */
    top: [Number, String],
    /** 右边距 */
    right: [Number, String],
    /** 下边距 */
    bottom: [Number, String],
    /** 左边距 */
    left: [Number, String],
  },
  setup(props, { slots }) {
    return () => {
      const defaultSlot = slots.default?.();
      if (!defaultSlot) return null;

      // 过滤有效节点
      const validNodes = defaultSlot.filter((node) => {
        if (node.type === Comment) return false;
        if (
          node.type === Text &&
          typeof node.children === "string" &&
          !node.children.trim()
        )
          return false;
        if (
          node.type === Fragment &&
          Array.isArray(node.children) &&
          node.children.length === 0
        )
          return false;
        return true;
      });

      if (validNodes.length === 0) return null;
      // 计算样式
      const paddingStyle = edgeInsetsToStyle(
        "padding",
        props as unknown as EdgeInsets
      ) as CSSProperties;
      const mergedProps: Record<string, any> = { style: {} };

      Object.assign(mergedProps.style, paddingStyle);
      // 基础样式
      mergedProps.style.boxSizing = "border-box";
      // 遍历所有有效子节点并应用属性
      return validNodes.map((child) => {
        return cloneVNode(child as VNode, mergedProps);
      });
    };
  },
});
</script>

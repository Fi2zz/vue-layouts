<script lang="ts">
import { cloneVNode, defineComponent, type CSSProperties, type VNode } from "vue";
import type { EdgeInsets } from "./EdgeInsets";
import { edgeInsetsToStyle } from "./EdgeInsets";
import { useChild } from "./useChildren";
type PaddingValue = string | number | undefined;

interface Props {
  all?: PaddingValue;
  horizontal?: PaddingValue;
  vertical?: PaddingValue;
  top?: PaddingValue;
  right?: PaddingValue;
  bottom?: PaddingValue;
}
export default defineComponent<Props>({
  name: "Padding",
  inheritAttrs: false,
  props: {
    all: {
      type: [String, Number],
      default: undefined,
    },
    horizontal: {
      type: [String, Number],
      default: undefined,
    },
    vertical: {
      type: [String, Number],
      default: undefined,
    },
    top: {
      type: [String, Number],
      default: undefined,
    },
    right: {
      type: [String, Number],
      default: undefined,
    },
    bottom: {
      type: [String, Number],
      default: undefined,
    },
  },
  setup(props, { slots }) {
    return () => {
      const child = useChild(slots.default);
      if (!child) return null;
      const insets = props as unknown as EdgeInsets;
      const style = edgeInsetsToStyle("padding", insets) as CSSProperties;
      return cloneVNode(child as VNode, { style: style });
    };
  },
});
</script>

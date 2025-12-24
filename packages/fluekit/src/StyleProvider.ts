import {
  Comment,
  Fragment,
  Text,
  cloneVNode,
  computed,
  defineComponent,
  h,
  inject,
  provide,
  type CSSProperties,
  type ComputedRef,
  type InjectionKey,
  type PropType,
  type VNode,
} from "vue";
import { isHtmlTag } from "./utils";

const StyleInjectionKey: InjectionKey<ComputedRef<CSSProperties>> =
  Symbol("fluekit-style-provider");

const Injector = defineComponent({
  name: "Injector",
  inheritAttrs: false,
  props: {
    style: {
      type: Object as PropType<CSSProperties>,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    provide(
      StyleInjectionKey,
      computed(() => props.style),
    );
    return () => slots.default?.() || null;
  },
});

export function useStyles() {
  return inject(
    StyleInjectionKey,
    computed(() => ({})),
  );
}

export const StyleProvider = defineComponent({
  inheritAttrs: false,
  props: {
    style: {
      type: Object as PropType<CSSProperties>,
      default: () => ({}),
    },
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    return () => {
      const children = slots.default?.() ?? [];
      if (children.length <= 0) return null;

      return cloneAndMergeStyles(children, props.style, props.attrs);
    };
  },
});

function cloneAndMergeStyles(
  nodes: VNode[],
  style: CSSProperties,
  attrs: Record<string, any>,
): VNode[] {
  return nodes.map((node: VNode) => {
    if (!node) return node;

    // Handle Fragment: recurse
    if (node.type === Fragment) {
      if (Array.isArray(node.children)) {
        return h(Fragment, cloneAndMergeStyles(node.children as VNode[], style, attrs));
      }
      return node;
    }

    if (node.type === Comment) return node;
    if (node.type === Text) return node;
    // Handle Element/Component
    if (isHtmlTag(node)) {
      const _style = node.props?.style || {};
      return cloneVNode(node, {
        style: { ..._style, ...style },
      });
    }
    return h(Injector, { ...attrs, style: style }, { default: () => node });
  });
}

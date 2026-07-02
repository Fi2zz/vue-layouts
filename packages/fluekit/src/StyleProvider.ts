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
  getCurrentInstance,
  ComponentInternalInstance,
} from "vue";
import { isHtmlTag } from "./utils";

const StyleInjectionKey: InjectionKey<
  ComputedRef<{
    style: CSSProperties;
    provider: ComponentInternalInstance | null;
  }>
> = Symbol("fluekit-style-provider");

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
    // provide(
    //   StyleInjectionKey,
    //   computed(() => props.style),
    // );
    return () => slots.default?.() || null;
  },
});

export function useStyles() {
  const instance = getCurrentInstance();
  const injected = inject(
    StyleInjectionKey,
    computed(() => ({ provider: null, style: {} })),
  );
  return computed(() => (injected.value?.provider == instance?.parent ? injected.value.style : {}));
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
    const instance = getCurrentInstance();
    provide(
      StyleInjectionKey,
      computed(() => ({ style: props.style ?? {}, provider: instance })),
    );
    return () => slots.default?.() || null;
  },
});

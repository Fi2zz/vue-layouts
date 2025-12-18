<script lang="ts">
import { cloneVNode, defineComponent, h, Text, type PropType, type SetupContext } from "vue";
import { useChild } from "./useChildren";
import { Behavior, events, provideGesture, useGestures } from "./useGesture";

export default defineComponent({
  name: "GestureDetector",
  inheritAttrs: false,
  props: {
    behavior: {
      type: String as PropType<Behavior>,
      default: "deferToChild",
    },
  },
  emits: events,
  setup(props, { slots, emit }) {
    const events = useGestures({ emit } as SetupContext);
    provideGesture(events, props.behavior);
    return () => {
      const child = useChild(slots.default);
      if (!child) return null;
      // <GestureDetector>Hello</GestureDetector>
      if (child.type === Text) return h("span", events, [child]);
      // <GestureDetector><div>World</div></GestureDetector>
      if (typeof child.type === "string") return cloneVNode(child, events);
      return child;
    };
  },
});
</script>

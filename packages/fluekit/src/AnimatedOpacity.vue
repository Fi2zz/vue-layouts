<script lang="ts">
import { computed, defineComponent, h } from "vue";

import { StyleProvider } from "./StyleProvider";
export default defineComponent({
  name: "AnimatedOpacity",
  inheritAttrs: false,
  props: {
    opacity: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      default: 300,
    },
    curve: {
      type: String,
      default: "linear",
    },
  },
  setup(props, { slots }) {
    const style = computed(() => {
      if (typeof props.opacity == "undefined") return {};
      const transition = `opacity ${props.duration}ms ${props.curve}`;
      return { transition, opacity: props.opacity };
    });
    return () => {
      return h(StyleProvider, { style: style.value }, slots);
    };
  },
});
</script>

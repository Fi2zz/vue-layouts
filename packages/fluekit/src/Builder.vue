<script lang="ts">
import { defineComponent, type VNodeChild } from "vue";

export default defineComponent({
  name: "Builder",
  props: {
    /**
     * A function that acts as the `setup` function for this component.
     * It can contain composition API calls (like `inject`, `useMediaQuery`)
     * and should return a render function (returning VNodeChild).
     *
     * Example:
     * ```ts
     * () => {
     *   const mq = useMediaQuery();
     *   return () => h('div', mq.size.width);
     * }
     * ```
     */
    builder: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    // Execute the builder function in the setup scope of this component.
    // This allows inject() and other composition APIs to work and see providers
    // from the immediate parent (e.g. MediaQuery override).
    const result = props.builder();

    // If the result is a function, it's a render function.
    // If it's not, Vue handles it (though for this component we expect a render function).
    return result;
  },
});
</script>

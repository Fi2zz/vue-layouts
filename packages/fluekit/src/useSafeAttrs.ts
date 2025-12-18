import { useAttrs, computed } from "vue";

export function useSafeAttrs() {
  const attrs = useAttrs();
  return computed(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { class: _className, style: _style, ...rest } = attrs;
    return rest;
  });
}

import { computed, inject, provide, type InjectionKey, type Ref, unref } from "vue";
export const OpacityKey: InjectionKey<Ref<number>> = Symbol("fluekit-opacity");
export function useOpacity() {
  return inject(
    OpacityKey,
    computed(() => 1.0),
  );
}
export function provideOpacity(opacity: number | Ref<number>) {
  const parentOpacity = useOpacity();
  const currentOpacity = computed(() => {
    return parentOpacity.value * unref(opacity);
  });
  provide(OpacityKey, currentOpacity);
  return currentOpacity;
}

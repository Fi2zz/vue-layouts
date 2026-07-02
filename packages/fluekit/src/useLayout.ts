import { inject, type InjectionKey, type ShallowRef, shallowRef } from "vue";
import { BoxConstraints } from "./BoxConstraints";

export const LayoutInjectionKey: InjectionKey<ShallowRef<BoxConstraints | null>> =
  Symbol("fluekit-layout");

export function useLayout() {
  return inject(LayoutInjectionKey, shallowRef(null));
}

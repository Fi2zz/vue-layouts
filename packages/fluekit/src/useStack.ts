import { inject, provide } from "vue";

const STACK_CONTEXT_KEY = "stackContext";

export function useStackContext() {
  return inject(STACK_CONTEXT_KEY, {});
}
export const provideStackContext = () => provide(STACK_CONTEXT_KEY, {});

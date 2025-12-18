import { Slot, Fragment, Comment, Text, VNode } from "vue";
export function useChildren<T extends unknown = any>(slot?: Slot<T>): VNode[] {
  if (!slot) return [];
  const children = (slot as unknown as Function)();

  if (!children) return [];
  return children.filter((node: VNode) => {
    if (node.type === Comment) return false;
    if (node.type === Text && typeof node.children === "string" && !node.children.trim())
      return false;
    if (node.type === Fragment && Array.isArray(node.children) && node.children.length === 0)
      return false;
    return true;
  });
}

export function useChild<T extends unknown = any>(slot?: Slot<T>): VNode | null {
  const children = useChildren(slot);
  if (children.length === 0) return null;
  return children[0] as VNode;
}

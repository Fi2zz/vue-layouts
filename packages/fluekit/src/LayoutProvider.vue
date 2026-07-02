<template>
  <div ref="el" class="fluekit-layout-provider" :style="style">
    <slot v-if="constraints" :constraints="constraints" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, shallowRef, CSSProperties, computed, provide } from "vue";
import { BoxConstraints } from "./BoxConstraints";
import { LayoutInjectionKey } from "./useLayout";

const props = defineProps<{
  direction?: "horizontal" | "vertical" | "both" | "none";
}>();

const el = ref<HTMLElement | null>(null);
const constraints = shallowRef<BoxConstraints | null>(null);

provide(LayoutInjectionKey, constraints);

let observer: ResizeObserver | null = null;

const style = computed<CSSProperties>(() => {
  const css: CSSProperties = {
    // We use flex to allow children to layout naturally if they are flex items,
    // but strictly speaking LayoutBuilder just provides constraints.
    // display: block is safer to avoid interfering with child layout models unless specified.
    display: "block",
  };

  const dir = props.direction ?? "both";

  if (dir === "both") {
    css.width = "100%";
    css.height = "100%";
  } else if (dir === "horizontal") {
    css.width = "100%";
  } else if (dir === "vertical") {
    css.height = "100%";
  }

  return css;
});

onMounted(() => {
  if (!el.value) return;

  observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      // Use contentBoxSize if available for better precision, fallback to contentRect
      const width = entry.contentRect.width;
      const height = entry.contentRect.height;

      // We provide "loose" constraints based on the current size,
      // effectively telling the child "you can be anything up to this size".
      // Or should it be tight?
      // In Flutter, LayoutBuilder passes the constraints it received.
      // Since we can't easily access the CSS constraints (min-width etc) directly from parent without computation,
      // and we are already rendered at a specific size (width/height),
      // effectively the constraints are tight to the current rendered size of this div.
      // HOWEVER, typically we use LayoutBuilder to decide what to render based on available space.

      const dir = props.direction ?? "both";

      if (dir === "both") {
        constraints.value = BoxConstraints.tight({ width, height });
      } else if (dir === "horizontal") {
        // Constrained width, unconstrained height
        constraints.value = BoxConstraints({
          minWidth: width,
          maxWidth: width,
          minHeight: 0,
          maxHeight: Infinity,
        });
      } else if (dir === "vertical") {
        // Constrained height, unconstrained width
        constraints.value = BoxConstraints({
          minWidth: 0,
          maxWidth: Infinity,
          minHeight: height,
          maxHeight: height,
        });
      } else {
        // Unconstrained
        constraints.value = BoxConstraints({
          minWidth: 0,
          maxWidth: Infinity,
          minHeight: 0,
          maxHeight: Infinity,
        });
      }
    }
  });

  observer.observe(el.value);
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <div ref="el" class="fluekit-layout-builder" :style="style">
    <slot v-if="constraints" :constraints="constraints" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, shallowRef, CSSProperties } from "vue";
import { BoxConstraints } from "./BoxConstraints";

const el = ref<HTMLElement | null>(null);
const constraints = shallowRef<BoxConstraints | null>(null);
let observer: ResizeObserver | null = null;

const style: CSSProperties = {
  width: "100%",
  height: "100%",
  // We use flex to allow children to layout naturally if they are flex items,
  // but strictly speaking LayoutBuilder just provides constraints.
  // display: block is safer to avoid interfering with child layout models unless specified.
  display: "block",
};

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

      constraints.value = BoxConstraints.tight({ width, height });
    }
  });

  observer.observe(el.value);
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

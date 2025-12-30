<template>
  <Container :margin="margin" :decoration="computedDecoration" :clip-behavior="clipBehavior">
    <slot />
  </Container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Container from "./Container.vue";
import { BoxDecoration } from "./BoxDecoration";
import { BorderRadius } from "./BorderRadius";
import { BoxShadow } from "./BoxShadow";
import { EdgeInsets } from "./EdgeInsets";

interface Props {
  color?: string;
  shadowColor?: string;
  elevation?: number;
  shape?: BorderRadius;
  margin?: EdgeInsets;
  clipBehavior?: "none" | "hardEdge" | "antiAlias" | string;
  borderOnForeground?: boolean; // Not fully implemented in Container yet, but keeping for API compatibility idea
}

const props = withDefaults(defineProps<Props>(), {
  color: "#ffffff",
  shadowColor: "#000000",
  elevation: 1,
  clipBehavior: "none",
  margin: () => EdgeInsets.all(4), // Default margin for Card
});

const computedDecoration = computed(() => {
  // Map elevation to BoxShadow
  // This is a simplified approximation of Material Design elevation
  const shadows: BoxShadow[] = [];

  if (props.elevation > 0) {
    const opacity = 0.2; // Simplified opacity
    const blur = props.elevation * 2;
    const offset = props.elevation;

    shadows.push(
      BoxShadow({
        color: props.shadowColor, // We would need to parse color to add opacity, but for now assuming string
        // In a real implementation we might want to handle color opacity
        offset: { x: 0, y: 1 }, // simplified
        blurRadius: blur,
        spreadRadius: 0,
        // Using a simple shadow strategy for now
      }),
    );

    // A better shadow approximation usually involves multiple shadows
    // But keeping it simple for this 'fluekit'
  }

  return BoxDecoration({
    color: props.color,
    borderRadius: props.shape || BorderRadius.all(4),
    boxShadow: shadows.length > 0 ? shadows : undefined,
  });
});
</script>

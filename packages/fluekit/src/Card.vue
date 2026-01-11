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
  variant?: "material" | "ios";
}

const props = withDefaults(defineProps<Props>(), {
  color: "#ffffff",
  shadowColor: "#000000",
  elevation: 1,
  clipBehavior: "none",
  margin: () => EdgeInsets.all(4), // Default margin for Card
  variant: "ios",
});

const computedDecoration = computed(() => {
  // Map elevation to BoxShadow
  // This is a simplified approximation of Material Design elevation
  const shadows: BoxShadow[] = [];

  if (props.variant === "ios") {
    // iOS style shadow: subtle, larger blur
    shadows.push(
      BoxShadow({
        color: "rgba(0, 0, 0, 0.05)",
        offset: { x: 0, y: 2 },
        blurRadius: 10,
        spreadRadius: 0,
      }),
    );
  } else if (props.elevation > 0) {
    const blur = props.elevation * 2;

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

  const defaultShape = props.variant === "ios" ? BorderRadius.all(12) : BorderRadius.all(4);

  return BoxDecoration({
    color: props.color,
    borderRadius: props.shape || defaultShape,
    boxShadow: shadows.length > 0 ? shadows : undefined,
  });
});
</script>

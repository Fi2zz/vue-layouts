<template>
  <Container
    :width="width"
    :height="height"
    :padding="padding"
    :margin="margin"
    :alignment="alignment"
    :transform="transform"
    :transform-alignment="transformAlignment"
    :constraints="constraints"
    :clip-behavior="clipBehavior"
    :decoration="computedDecoration"
  >
    <slot />
  </Container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Container from "./Container.vue";
import { BoxDecoration, BoxShape } from "./BoxDecoration";
import type { BoxConstraints } from "./BoxConstraints";
import type { Alignment } from "./Alignment";
import type { EdgeInsets } from "./EdgeInsets";
import type { Borders } from "./Border";
import type { BorderRadius } from "./BorderRadius";
import type { BoxShadow } from "./BoxShadow";

interface Props {
  width?: number | string;
  height?: number | string;
  padding?: EdgeInsets;
  margin?: EdgeInsets;
  alignment?: Alignment;
  transform?: string;
  transformAlignment?: Alignment;
  constraints?: BoxConstraints;
  clipBehavior?: "none" | "hardEdge" | "antiAlias" | string;

  // Style props that would normally go into BoxDecoration
  color?: string;
  border?: Borders;
  borderRadius?: BorderRadius;
  boxShadow?: BoxShadow[];
  gradient?: string;
  image?: any; // DecorationImage
  shape?: BoxShape;
}

const props = withDefaults(defineProps<Props>(), {
  clipBehavior: "none",
  shape: BoxShape.rectangle,
});

const computedDecoration = computed(() => {
  // If no decoration props are provided, return undefined to let Container handle default behavior (like just color)
  // However, Container's color prop conflicts with decoration.
  // If we use Box, we construct decoration from these props.

  if (
    !props.color &&
    !props.border &&
    !props.borderRadius &&
    !props.boxShadow &&
    !props.gradient &&
    !props.image &&
    props.shape === "rectangle"
  ) {
    return undefined;
  }

  return BoxDecoration({
    color: props.color,
    border: props.border,
    borderRadius: props.borderRadius,
    boxShadow: props.boxShadow,
    gradient: props.gradient,
    image: props.image,
    shape: props.shape,
  });
});
</script>

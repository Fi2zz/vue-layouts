<template>
  <Container
    class="fluekit-circle-avatar"
    :width="size"
    :height="size"
    :decoration="decoration"
    alignment="center"
    clipBehavior="hardEdge"
  >
    <Image v-if="backgroundImage" :image="image" :fit="BoxFit.cover" />
    <slot v-else>
      <Text v-if="childText" :style="textStyle">{{ childText }}</Text>
    </slot>
  </Container>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";
import { BorderRadius } from "./BorderRadius";
import { BoxDecoration } from "./BoxDecoration";
import { BoxFit } from "./BoxFit";
import { Color } from "./Color";
import { resolveColor } from "./resolveColor";
import Container from "./Container.vue";
import Image from "./Image.vue";
import { ImageProvider } from "./ImageProvider";
import Text from "./Text.vue";
import { FontWeight, TextStyle } from "./TextStyle";

defineOptions({ inheritAttrs: false });

interface Props {
  backgroundImage?: string;
  backgroundColor?: string | Color;
  foregroundColor?: string | Color;
  radius?: number;
  minRadius?: number;
  maxRadius?: number;
}

const props = withDefaults(defineProps<Props>(), {
  backgroundColor: "#BDBDBD", // Colors.grey[400] approx
  foregroundColor: "#FFFFFF",
});

const slots = useSlots();

const radius = computed(() => {
  if (props.radius) return props.radius;
  if (props.minRadius && props.maxRadius) return (props.minRadius + props.maxRadius) / 2;
  return 20; // Default radius
});
const size = computed(() => radius.value * 2);
const image = computed(() => ImageProvider(props.backgroundImage!));
const decoration = computed(() => {
  return BoxDecoration({
    borderRadius: BorderRadius.circular(radius.value),
    color: resolveColor(props.backgroundColor),
  });
});

const textStyle = computed(() => {
  return TextStyle({
    color: props.foregroundColor,
    fontWeight: FontWeight.w500,
  });
});

// Helper to detect if default slot is just text
const childText = computed(() => {
  const defaultSlot = slots.default?.({});
  if (!defaultSlot) return null;
  if (defaultSlot.length < 1 || defaultSlot.length > 1) return null;
  const firstChild = defaultSlot[0]!;
  if (typeof firstChild.children === "string") return firstChild.children;
  return null;
});
</script>

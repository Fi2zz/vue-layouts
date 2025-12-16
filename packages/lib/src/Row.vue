<template>
  <FlexBox
    direction="row"
    :main-axis-alignment="mainAxisAlignment"
    :cross-axis-alignment="crossAxisAlignment"
    :wrap="wrap"
    :gap="gap"
    :as="as"
    :expanded="expanded">
    <slot />
  </FlexBox>
</template>

<script setup lang="ts">
import FlexBox from "./FlexBox.vue";
import { FlexBoxProps } from "./FlexProps";
withDefaults(defineProps<FlexBoxProps>(), {
  mainAxisAlignment: "start",
  crossAxisAlignment: "center",
  wrap: false,
  expanded: false,
});
</script>

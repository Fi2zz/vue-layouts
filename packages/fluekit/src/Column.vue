<template>
  <FlexBox
    direction="column"
    :main-axis-alignment="mainAxisAlignment"
    :cross-axis-alignment="crossAxisAlignment"
    :wrap="wrap"
    :gap="gap"
    :expanded="expanded"
  >
    <slot />
  </FlexBox>
</template>

<script setup lang="ts">
import { FlexBoxProps } from "./FlexProps";
import FlexBox from "./FlexBox.vue";
defineOptions({ inheritAttrs: false });
defineProps<FlexBoxProps>();
</script>

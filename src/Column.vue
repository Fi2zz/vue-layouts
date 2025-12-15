<template>
  <FlexBox
    direction="column"
    :main-axis-alignment="mainAxisAlignment"
    :cross-axis-alignment="crossAxisAlignment"
    :wrap="wrap"
    :gap="gap"
    :expanded="expanded"
    :size="size"
    >
    <slot />
  </FlexBox>
</template>

<script setup lang="ts">
import { FlexBoxProps } from "./Flex";
import FlexBox from "./FlexBox.vue";
defineProps<FlexBoxProps>();
</script>

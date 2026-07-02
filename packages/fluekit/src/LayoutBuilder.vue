<template>
  <LayoutProvider v-bind="$props" class="fluekit-layout-builder">
    <template #default="{ constraints }">
      <slot :constraints="constraints" />
    </template>
  </LayoutProvider>
</template>

<script setup lang="ts">
import LayoutProvider from "./LayoutProvider.vue";

defineProps<{
  direction?: "horizontal" | "vertical" | "both" | "none";
}>();
</script>

<template>
  <slot />
</template>

<script setup lang="ts">
import { provide } from "vue";
import { MediaQueryData, MediaQueryKey } from "./useMediaQuery";
const props = defineProps<{ data: MediaQueryData }>();
provide(MediaQueryKey, props.data);
</script>

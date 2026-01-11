<template>
  <TextField v-bind="$attrs" :max-lines="maxLines" :keyboard-type="'multiline'">
    <!-- Forward slots -->
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <template v-if="$slots.suffix" #suffix>
      <slot name="suffix" />
    </template>
  </TextField>
</template>

<script setup lang="ts">
import TextField from "./TextField.vue";

interface Props {
  maxLines?: number;
}

withDefaults(defineProps<Props>(), {
  maxLines: 4,
});

defineOptions({ inheritAttrs: false });
</script>

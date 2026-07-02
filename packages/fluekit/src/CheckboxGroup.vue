<template>
  <div class="flue-checkbox-group">
    <slot />
  </div>
</template>

<script setup lang="ts" generic="T">
import { provide, toRefs } from "vue";
import { CheckboxGroupKey } from "./CheckboxTypes";

export interface CheckboxGroupProps<T> {
  value?: T[]; // The selected values
  disabled?: boolean;
}

const props = withDefaults(defineProps<CheckboxGroupProps<T>>(), {
  value: () => [],
  disabled: false,
});

const emit = defineEmits<{
  (e: "update:value", value: T[]): void;
  (e: "change", value: T[]): void;
}>();
const updateValue = (val: T) => {
  const newValues = [...props.value];
  const index = newValues.indexOf(val);
  if (index === -1) {
    newValues.push(val);
  } else {
    newValues.splice(index, 1);
  }
  emit("update:value", newValues);
  emit("change", newValues);
};
const { value, disabled } = toRefs(props);
provide(CheckboxGroupKey, { value, disabled, updateValue });
</script>

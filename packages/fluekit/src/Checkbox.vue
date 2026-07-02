<template>
  <GestureDetector @tap="toggle">
    <Row main-axis-size="min" cross-axis-alignment="center" :gap="8">
      <slot v-if="labelPosition === 'left'" />
      <Container
        v-if="!hideIcon"
        :width="18"
        :height="18"
        :decoration="decoration"
        alignment="center"
        flex="none"
      >
        <svg
          v-if="isChecked"
          viewBox="0 0 24 24"
          :width="14"
          :height="14"
          :fill="resolveColor(checkColor)"
          style="display: block"
        >
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      </Container>
      <slot v-if="labelPosition === 'right'" />
    </Row>
  </GestureDetector>
</template>

<script setup lang="ts" generic="T">
import { computed, inject } from "vue";
import Container from "./Container.vue";
import Row from "./Row.vue";
import GestureDetector from "./GestureDetector.vue";
import { BoxDecoration } from "./BoxDecoration";
import { BorderRadius } from "./BorderRadius";
import { Border } from "./Border";
import { CheckboxGroupKey } from "./CheckboxTypes";
import { Color } from "./Color";
import { resolveColor } from "./resolveColor";

export interface CheckboxProps<T> {
  value?: T;
  onChanged?: (value: T) => void;
  activeColor?: string | Color;
  checkColor?: string | Color;
  labelPosition?: "left" | "right";
  hideIcon?: boolean;
}

const props = withDefaults(defineProps<CheckboxProps<T>>(), {
  activeColor: "#2196F3",
  checkColor: "#FFFFFF",
  labelPosition: "right",
  hideIcon: false,
});

const emit = defineEmits<{
  (e: "update:value", value: T): void;
  (e: "change", value: T): void;
}>();

const group = inject(CheckboxGroupKey, null);

const isChecked = computed(() => {
  if (group) {
    return (group.value.value as any[]).includes(props.value);
  }
  return props.value === true;
});

const isDisabled = computed(() => {
  return group?.disabled.value;
});

const toggle = () => {
  if (isDisabled.value) return;

  if (group) {
    group.updateValue(props.value as any);
  } else {
    // Standalone mode: value is treated as boolean
    const newValue = !props.value;
    emit("change", newValue as T);
    emit("update:value", newValue as T);
  }
};

const decoration = computed(() => {
  return BoxDecoration({
    color: isChecked.value ? props.activeColor : "transparent",
    border: isChecked.value
      ? undefined
      : Border.all({
          color: "rgba(0,0,0,0.54)",
          width: 2,
          style: "solid",
        }),
    borderRadius: BorderRadius.circular(2),
  });
});
</script>

<template>
  <Container :decoration="containerDecoration" clip-behavior="hardEdge">
    <Row>
      <GestureDetector v-for="(item, index) in items" :key="index" @tap="handleTap(item.value)">
        <Expanded>
          <Container
            :padding="padding"
            :decoration="getItemDecoration(item.value, index)"
            alignment="center"
          >
            <slot name="label" :item="item" :selected="item.value === modelValue" :index="index">
              <Text :style="getItemTextStyle(item.value)">{{ item.label }}</Text>
            </slot>
          </Container>
        </Expanded>
      </GestureDetector>
    </Row>
  </Container>
</template>

<script setup lang="ts" generic="T extends string | number | boolean">
import { computed } from "vue";
import Container from "./Container.vue";
import Row from "./Row.vue";
import Text from "./Text.vue";
import Expanded from "./Expanded.vue";
import GestureDetector from "./GestureDetector.vue";
import { BoxDecoration } from "./BoxDecoration";
import { Border, BorderSide } from "./Border";
import { EdgeInsets } from "./EdgeInsets";
import { TextStyle } from "./TextStyle";
import { BorderRadius } from "./BorderRadius";

export interface SegmentedControlItem<T> {
  value: T;
  label: string;
}

export interface SegmentedControlProps<T> {
  modelValue: T;
  items: SegmentedControlItem<T>[];
  selectedColor?: string;
  unselectedColor?: string;
  borderColor?: string;
  padding?: EdgeInsets;
  decoration?: BoxDecoration;
  // New customization props
  selectedTextStyle?: TextStyle;
  unselectedTextStyle?: TextStyle;
  borderRadius?: BorderRadius;
}

const props = withDefaults(defineProps<SegmentedControlProps<T>>(), {
  selectedColor: "#007AFF", // iOS default blue
  unselectedColor: "transparent",
  borderColor: "#007AFF",
  padding: () => EdgeInsets.symmetric({ vertical: 8, horizontal: 16 }),
  borderRadius: () => BorderRadius.circular(4),
});

const emit = defineEmits<{
  (e: "update:modelValue", value: T): void;
  (e: "change", value: T): void;
}>();

const handleTap = (value: T) => {
  if (value !== props.modelValue) {
    emit("update:modelValue", value);
    emit("change", value);
  }
};

const containerDecoration = computed(() => {
  if (props.decoration) {
    return props.decoration;
  }
  return BoxDecoration({
    border: Border.all({
      color: props.borderColor,
      width: 1,
    }),
    borderRadius: props.borderRadius,
  });
});

const getItemDecoration = (value: T, index: number) => {
  const isSelected = value === props.modelValue;
  const isLast = index === props.items.length - 1;
  const isFirst = index === 0;

  // Handle rounded corners for first/last items to match container
  let borderRadius = BorderRadius.zero;
  if (isFirst) {
    borderRadius = BorderRadius.only({
      topLeft: props.borderRadius.topLeft,
      bottomLeft: props.borderRadius.bottomLeft,
    });
  } else if (isLast) {
    borderRadius = BorderRadius.only({
      topRight: props.borderRadius.topRight,
      bottomRight: props.borderRadius.bottomRight,
    });
  }

  return BoxDecoration({
    color: isSelected ? props.selectedColor : props.unselectedColor,
    borderRadius,
    border: Border.only({
      right: BorderSide({
        color: !isLast ? props.borderColor : "transparent",
        width: 1,
      }),
    }),
  });
};

const getItemTextStyle = (value: T) => {
  const isSelected = value === props.modelValue;
  const defaultStyle = TextStyle({
    color: isSelected ? "#FFFFFF" : props.borderColor,
    fontSize: 13,
  });

  if (isSelected && props.selectedTextStyle) {
    return { ...defaultStyle, ...props.selectedTextStyle };
  }
  if (!isSelected && props.unselectedTextStyle) {
    return { ...defaultStyle, ...props.unselectedTextStyle };
  }
  return defaultStyle;
};
</script>

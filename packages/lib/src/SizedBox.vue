<template>
  <div
    @click="$emit('click')"
    :class="[
      'sized-box',
      {
        'sized-box--expand': expand,
        'sized-box--shrink': shrink,
        'sized-box--relative': relative,
      },
    ]"
    :style="computedStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { px2vw } from "./px2vw";

interface Props {
  width?: number | string;
  height?: number | string;
  expand?: boolean;
  shrink?: boolean;
  relative?: boolean;
}

defineEmits(["click"]);
const props = withDefaults(defineProps<Props>(), {
  expand: false,
  shrink: false,
  width: "100%",
});

const computedStyle = computed(() => {
  const style: Record<string, string> = {};
  style.width = px2vw(props.width);
  style.height = px2vw(props.height);
  if (props.expand) style.flex = "1";
  if (props.shrink) {
    style.flexShrink = "1";
    style.minWidth = "0";
    style.minHeight = "0";
  }

  style.boxSizing = "border-box";
  style.display = "flex";
  style.position = "relative";
  style.flexDirection = "column";
  return style;
});
</script>

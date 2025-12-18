<template>
  <Align alignment="center" :width-factor="widthFactor" :height-factor="heightFactor">
    <slot></slot>
  </Align>
</template>
<script setup lang="ts">
import Align from "./Align.vue";

defineOptions({ inheritAttrs: false });

interface Props {
  /**
   * 宽度因子
   * 如果非 null，则将其宽度设置为子元素宽度乘以该因子。
   */
  widthFactor?: number;
  /**
   * 高度因子
   * 如果非 null，则将其高度设置为子元素高度乘以该因子。
   */
  heightFactor?: number;
}

defineProps<Props>();
</script>

<template>
  <GestureDetector @tap="() => logBehavior('Text Node Tapped')">
    Click this plain text!
  </GestureDetector>
</template>

<script setup lang="ts">
import { GestureDetector } from "fluekit";

const logBehavior = (type: string) => {
  console.log(type);
  alert(type);
};
</script>

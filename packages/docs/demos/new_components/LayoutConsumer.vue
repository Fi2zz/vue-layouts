<template>
  <Container :color="width > 500 ? 'purple' : 'blue'" alignment="center" width="100%" height="100%">
    <Column main-axis-alignment="center" cross-axis-alignment="center">
      <Text :style="TextStyle({ color: 'white', fontWeight: FontWeight.bold, fontSize: 24 })">
        Provider Width: {{ Math.round(width) }}px
      </Text>
      <Text :style="TextStyle({ color: 'white' })">
        Provider Height: {{ Math.round(height) }}px
      </Text>
      <SizedBox :height="10" />
      <Text :style="TextStyle({ color: 'white' })"> Consumed via useLayout() </Text>
    </Column>
  </Container>
</template>

<script setup lang="ts">
import { useLayout, Container, Column, Text, TextStyle, FontWeight, SizedBox } from "fluekit";
import { computed } from "vue";

const constraints = useLayout();

const width = computed(() => {
  const w = constraints.value?.maxWidth;
  return typeof w === "number" ? w : 0;
});

const height = computed(() => {
  const h = constraints.value?.maxHeight;
  return typeof h === "number" ? h : 0;
});
</script>

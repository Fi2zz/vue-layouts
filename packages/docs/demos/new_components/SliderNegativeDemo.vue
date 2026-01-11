<template>
  <Column :gap="20">
    <Text>Negative Range Slider (-50 to 50)</Text>
    <Container :width="300">
      <Slider v-model:value="value1" :min="-50" :max="50" />
    </Container>
    <Text>Value: {{ value1.toFixed(1) }}</Text>

    <Text>Negative RangeSlider (-100 to -10)</Text>
    <Container :width="300">
      <RangeSlider v-model:value="value2" :min="-100" :max="-10" />
    </Container>
    <Text>Value: {{ value2.start.toFixed(1) }} - {{ value2.end.toFixed(1) }}</Text>
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Slider, RangeSlider, Column, Text, Container } from "fluekit";

const value1 = ref(0);
const value2 = ref({ start: -80, end: -30 });
</script>

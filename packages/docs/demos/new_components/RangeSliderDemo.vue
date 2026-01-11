<template>
  <Column :gap="20">
    <Column :gap="10">
      <Text>RangeSlider: {{ rangeVal.start.toFixed(1) }} - {{ rangeVal.end.toFixed(1) }}</Text>
      <Container :width="300">
        <RangeSlider v-model:value="rangeVal" :min="0" :max="100" />
      </Container>
    </Column>
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Column, Text, RangeSlider, Container } from "fluekit";

const rangeVal = ref({ start: 20, end: 80 });
</script>

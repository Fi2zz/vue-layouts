<template>
  <Column :gap="20">
    <Column :gap="10">
      <Text>Slider: {{ sliderVal.toFixed(1) }}</Text>
      <Container :width="300">
        <Slider v-model:value="sliderVal" :min="0" :max="100" />
      </Container>
    </Column>
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Column, Text, Slider, Container } from "fluekit";

const sliderVal = ref(30);
</script>

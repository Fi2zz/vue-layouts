<template>
  <SizedBox :width="300" :height="200">
    <ListView :padding="EdgeInsets.all(10)">
      <Container
        v-for="i in 10"
        :key="i"
        :width="80"
        :height="80"
        :color="i % 2 === 0 ? 'orange' : 'coral'"
        :margin="EdgeInsets.only({ right: 10 })"
        alignment="center"
      >
        <Text :data="`Item ${i}`" :style="TextStyle({ color: 'white' })" />
      </Container>
    </ListView>
  </SizedBox>
</template>

<script setup lang="ts">
import { Container, ListView, Text, SizedBox, TextStyle, EdgeInsets } from "fluekit";
</script>

<template>
  <Container :width="100" :height="100" color="blue" :margin="EdgeInsets.only({ bottom: 10 })">
    <Text data="Box" :style="TextStyle({ color: 'white' })" />
  </Container>
</template>
<script setup lang="ts">
import { Container, Text, TextStyle, EdgeInsets } from "fluekit";
</script>

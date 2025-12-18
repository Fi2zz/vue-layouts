<template>
  <Container :width="100" :height="100" color="blue" :margin="{ bottom: 10 }">
    <Text data="Box" :style="{ color: 'white' }" />
  </Container>
</template>

<script setup lang="ts">
import { Container, Text } from "fluekit";
</script>

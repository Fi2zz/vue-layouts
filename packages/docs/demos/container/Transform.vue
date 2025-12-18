<template>
  <Container
    :width="100"
    :height="100"
    color="orange"
    transform="rotate(15deg)"
    transformAlignment="center"
    alignment="center"
    :margin="{ all: 20 }"
  >
    <Text data="Rotated" />
  </Container>
</template>

<script setup lang="ts">
import { Container, Text } from "fluekit";
</script>

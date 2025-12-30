<template>
  <Container
    :width="100"
    :height="100"
    color="orange"
    :transform="Matrix4.rotationZ(0.26)"
    transformAlignment="center"
    alignment="center"
    :margin="EdgeInsets.all(20)"
  >
    <Text data="Rotated" />
  </Container>
</template>

<script setup lang="ts">
import { Container, Text, EdgeInsets, Matrix4 } from "fluekit";
</script>

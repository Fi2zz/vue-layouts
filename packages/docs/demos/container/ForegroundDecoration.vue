<template>
  <Container
    :width="120"
    :height="120"
    :foregroundDecoration="{
      border: { all: { color: 'rgba(255,255,255,1)', width: 5 } },
      borderRadius: { all: 10 }, // Circle overlay
      color: 'green',
      opacity: 0.7,
    }"
    alignment="center"
    :decoration="{
      color: 'black',
      borderRadius: { all: 3 },
    }"
  >
    <Text data="Content" :style="{ color: 'white', fontSize: 32 }" />
  </Container>
</template>

<script setup lang="ts">
import { Container, setTransform, Text } from "fluekit";
setTransform(false);
</script>

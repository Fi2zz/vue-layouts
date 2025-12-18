<template>
  <Container
    :width="120"
    :height="120"
    :decoration="{
      gradient: 'linear-gradient(45deg, blue, red)',
      borderRadius: { all: 10 },
    }"
    alignment="center"
  >
    <Text data="Gradient" :style="{ color: 'white' }" />
  </Container>
</template>

<script setup lang="ts">
import { Container, Text } from "fluekit";
</script>

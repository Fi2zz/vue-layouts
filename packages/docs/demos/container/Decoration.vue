<template>
  <Container
    :width="120"
    :height="120"
    :decoration="{
      color: 'white',
      borderRadius: { all: 20 },
      border: { all: { color: 'purple', width: 4 } },
      boxShadow: [
        {
          color: 'rgba(0,0,0,0.5)',
          blurRadius: 10,
          spreadRadius: 5,
          offset: { x: 5, y: 5 },
        },
      ],
    }"
    alignment="center"
  >
    <Text data="Decorated" />
  </Container>
</template>

<script setup lang="ts">
import { Container, Text } from "fluekit";
</script>

<template>
  <Container :width="150" :height="100" color="grey" alignment="center" :margin="{ bottom: 10 }">
    <Container :width="50" :height="50" color="red" />
  </Container>
</template>

<script setup lang="ts">
import { Container } from "fluekit";
</script>

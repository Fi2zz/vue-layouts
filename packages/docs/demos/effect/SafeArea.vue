<template>
  <Container color="#333" :width="300" :height="150">
    <SafeArea :minimum="{ top: 20, left: 10, right: 10, bottom: 20 }">
      <Container color="white" :width="300" :height="150" alignment="center">
        <Text data="Safe Content Area" />
      </Container>
    </SafeArea>
  </Container>
</template>

<script setup lang="ts">
import { Container, SafeArea, Text } from "fluekit";
</script>

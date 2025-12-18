<template>
  <Container color="#f9f9f9" :padding="{ all: 10 }" :width="300">
    <Wrap :spacing="10" :runSpacing="10">
      <Container v-for="i in 8" :key="i" :width="60" :height="40" color="teal" alignment="center">
        <Text :data="i" :style="{ color: 'white' }" />
      </Container>
    </Wrap>
  </Container>
</template>

<script setup lang="ts">
import { Container, Wrap, Text } from "fluekit";
</script>

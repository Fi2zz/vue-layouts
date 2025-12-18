<template>
  <SizedBox width="500" height="100">
    <ListView scrollDirection="horizontal" :padding="{ all: 10 }">
      <Container
        v-for="i in 10"
        :key="i"
        :width="80"
        :height="80"
        :color="i % 2 === 0 ? 'orange' : 'coral'"
        :margin="{ right: 10 }"
        alignment="center"
      >
        <Text :data="`Item ${i}`" :style="{ color: 'white' }" />
      </Container>
    </ListView>
  </SizedBox>
</template>

<script setup lang="ts">
import { Container, ListView, Text, SizedBox } from "fluekit";
</script>

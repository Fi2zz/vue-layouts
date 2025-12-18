<template>
  <Container :width="200" :height="200" color="#ddd">
    <Stack>
      <Container :width="200" :height="200" color="grey" />
      <Positioned :top="20" :left="20">
        <Container :width="50" :height="50" color="red" />
      </Positioned>
      <Positioned :bottom="20" :right="20">
        <Container :width="50" :height="50" color="blue" />
      </Positioned>
      <Center>
        <Text data="Centered in Stack" :style="{ color: 'white' }" />
      </Center>
    </Stack>
  </Container>
</template>

<script setup lang="ts">
import { Container, Stack, Positioned, Center, Text } from "fluekit";
</script>

<template>
  <Container
    color="#f0f0f0"
    :padding="EdgeInsets.all(10)"
    :margin="EdgeInsets.only({ bottom: 20 })"
  >
    <Row gap="10px">
      <Container :width="50" :height="50" color="red" alignment="center">
        <Text data="1" :style="TextStyle({ color: 'white' })" />
      </Container>
      <Container :width="50" :height="50" color="green" alignment="center">
        <Text data="2" :style="TextStyle({ color: 'white' })" />
      </Container>
      <Container :width="50" :height="50" color="blue" alignment="center">
        <Text data="3" :style="TextStyle({ color: 'white' })" />
      </Container>
    </Row>
  </Container>
</template>

<script setup lang="ts">
import { Container, EdgeInsets, Row, Text, TextStyle } from "fluekit";
</script>

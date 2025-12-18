<template>
  <Row :gap="20">
    <Opacity :opacity="1.0">
      <Container :width="60" :height="60" color="blue" alignment="center">
        <Text data="1.0" :style="{ color: 'white' }" />
      </Container>
    </Opacity>
    <Opacity :opacity="0.5">
      <Container :width="60" :height="60" color="blue" alignment="center">
        <Text data="0.5" :style="{ color: 'white' }" />
      </Container>
    </Opacity>
    <Opacity :opacity="0.1">
      <Container :width="60" :height="60" color="blue" alignment="center">
        <Text data="0.1" :style="{ color: 'white' }" />
      </Container>
    </Opacity>
  </Row>
</template>

<script setup lang="ts">
import { Opacity, Row, Container, Text } from "fluekit";
</script>

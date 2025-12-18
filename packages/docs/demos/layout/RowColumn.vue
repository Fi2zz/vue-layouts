<template>
  <Container color="#f0f0f0" :padding="{ all: 10 }" :margin="{ bottom: 20 }">
    <Column mainAxisSize="min">
      <Row mainAxisAlignment="space-between" :margin="{ bottom: 10 }">
        <Container :width="50" :height="50" color="red" alignment="center"
          ><Text data="1" :style="{ color: 'white' }"
        /></Container>
        <Container :width="50" :height="50" color="green" alignment="center"
          ><Text data="2" :style="{ color: 'white' }"
        /></Container>
        <Container :width="50" :height="50" color="blue" alignment="center"
          ><Text data="3" :style="{ color: 'white' }"
        /></Container>
      </Row>
    </Column>
  </Container>
</template>

<script setup lang="ts">
import { Container, Column, Row, Text } from "fluekit";
</script>

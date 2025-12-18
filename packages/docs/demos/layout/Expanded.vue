<template>
  <Container color="#e0e0e0" :height="60" :padding="{ all: 5 }">
    <Row>
      <Container :width="50" color="red" />
      <Expanded :flex="1">
        <Container color="green" alignment="center">
          <Text data="Expanded Flex:1" :style="{ color: 'white', fontSize: 12 }" />
        </Container>
      </Expanded>
      <Expanded :flex="2">
        <Container color="blue" alignment="center">
          <Text data="Expanded Flex:2" :style="{ color: 'white', fontSize: 12 }" />
        </Container>
      </Expanded>
    </Row>
  </Container>
</template>

<script setup lang="ts">
import { Container, Row, Expanded, Text } from "fluekit";
</script>

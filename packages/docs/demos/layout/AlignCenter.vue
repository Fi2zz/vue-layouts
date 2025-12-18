<template>
  <Row :gap="20">
    <Container :width="100" :height="100" color="#ddd">
      <Align alignment="bottomRight">
        <Container :width="30" :height="30" color="red" />
      </Align>
    </Container>
    <Container :width="100" :height="100" color="#ddd">
      <Center>
        <Container :width="30" :height="30" color="blue" />
      </Center>
    </Container>
  </Row>
  <Container :margin="{ top: 5 }">
    <Text data="Align(bottomRight) vs Center" :style="{ fontSize: 12, color: 'grey' }" />
  </Container>
</template>

<script setup lang="ts">
import { Container, Row, Align, Center, Text } from "fluekit";
</script>

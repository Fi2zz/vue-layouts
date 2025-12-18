<template>
  <Row :gap="20">
    <GestureDetector behavior="opaque" @click="$alert('Clicked Normal')">
      <Container :width="100" :height="50" color="green" alignment="center">
        <Text data="Click Me" :style="{ color: 'white' }" />
      </Container>
    </GestureDetector>
    <GestureDetector behavior="opaque" @click="$alert('Clicked ignoring ')">
      <IgnorePointer ignoring>
        <Container :width="100" :height="50" color="red" alignment="center">
          <Text data="Ignored" :style="{ color: 'white' }" />
        </Container>
      </IgnorePointer>
    </GestureDetector>
  </Row>
  <Text data="(Red box ignores clicks)" :style="{ fontSize: 12, color: 'grey' }" />
</template>

<script setup lang="ts">
import { Row, GestureDetector, Container, Text, IgnorePointer } from "fluekit";

const $alert = (msg: string) => {
  window.alert(msg);
};
</script>

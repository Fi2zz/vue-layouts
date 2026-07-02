<template>
  <Column :gap="20">
    <Container color="#f5f5f5" :padding="EdgeInsets.all(20)">
      <Text :style="TextStyle({ fontSize: 20, fontWeight: FontWeight.bold })"
        >LayoutProvider Demo</Text
      >
      <Text>Using LayoutProvider and useLayout hook.</Text>
    </Container>

    <Container :height="300" color="#e0e0e0" :padding="EdgeInsets.all(10)">
      <LayoutProvider>
        <LayoutConsumer />
      </LayoutProvider>
    </Container>

    <Text>Try resizing the browser window or inspecting element to change the width.</Text>
  </Column>
</template>

<script setup lang="ts">
import {
  Column,
  Container,
  Text,
  EdgeInsets,
  LayoutProvider,
  TextStyle,
  FontWeight,
} from "fluekit";
import LayoutConsumer from "./LayoutConsumer.vue";
</script>

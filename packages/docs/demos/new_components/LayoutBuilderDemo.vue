<template>
  <Column :gap="20">
    <Container color="#f5f5f5" :padding="EdgeInsets.all(20)">
      <Text :style="TextStyle({ fontSize: 20, fontWeight: FontWeight.bold })"
        >LayoutBuilder Demo</Text
      >
      <Text>Resize the container below to see how LayoutBuilder responds.</Text>
    </Container>

    <Container :height="300" color="#e0e0e0" :padding="EdgeInsets.all(10)">
      <LayoutBuilder v-slot="{ constraints }">
        <Container
          :color="constraints.maxWidth > 500 ? 'teal' : 'orange'"
          alignment="center"
          width="100%"
          height="100%"
        >
          <Column main-axis-alignment="center" cross-axis-alignment="center">
            <Text :style="TextStyle({ color: 'white', fontWeight: FontWeight.bold, fontSize: 24 })">
              Width: {{ Math.round(constraints.maxWidth) }}px
            </Text>
            <Text :style="TextStyle({ color: 'white' })">
              Height: {{ Math.round(constraints.maxHeight) }}px
            </Text>
            <SizedBox :height="10" />
            <Text :style="TextStyle({ color: 'white' })">
              {{ constraints.maxWidth > 500 ? "Wide Layout (Teal)" : "Narrow Layout (Orange)" }}
            </Text>
          </Column>
        </Container>
      </LayoutBuilder>
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
  LayoutBuilder,
  SizedBox,
  TextStyle,
  FontWeight,
} from "fluekit";
</script>

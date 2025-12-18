<template>
  <div class="scroll-container">
    <ScrollView :height="300">
      <Column>
        <Container :height="100" color="#e0e0e0" alignment="center">
          <Text data="Scroll Down" />
        </Container>

        <Sticky :top="0">
          <Container :height="50" color="blue" alignment="center" :width="Infinity">
            <Text data="Sticky Header" :style="{ color: 'white', fontWeight: 'bold' }" />
          </Container>
        </Sticky>

        <Container :height="100" color="#f0f0f0" alignment="center">
          <Text data="Item 1" />
        </Container>
        <Container :height="100" color="#e0e0e0" alignment="center">
          <Text data="Item 2" />
        </Container>
        <Container :height="100" color="#f0f0f0" alignment="center">
          <Text data="Item 3" />
        </Container>
        <Container :height="100" color="#e0e0e0" alignment="center">
          <Text data="Item 4" />
        </Container>

        <Sticky :bottom="10">
          <Container
            :height="40"
            color="red"
            alignment="center"
            :margin="{ left: 20, right: 20 }"
            :borderRadius="20"
          >
            <Text data="Sticky Bottom" :style="{ color: 'white' }" />
          </Container>
        </Sticky>

        <Container :height="200" color="#f8f8f8" alignment="center">
          <Text data="Footer Area" />
        </Container>
      </Column>
    </ScrollView>
  </div>
</template>

<script setup lang="ts">
import { Sticky, ScrollView, Column, Container, Text } from "fluekit";
</script>

<style scoped>
.scroll-container {
  border: 1px solid #ccc;
}
</style>

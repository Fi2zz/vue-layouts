<template>
  <Container
    :height="300"
    :width="300"
    :decoration="{ border: { all: { color: 'black', width: 1 } } }"
  >
    <ScrollView :padding="{ all: 0 }">
      <Column>
        <Container :height="50" color="lightgrey" alignment="center">
          <Text data="Header" />
        </Container>

        <Sticky :top="0" :zIndex="100">
          <Container :height="40" color="teal" alignment="center" :width="300">
            <Text data="Sticky Header" :style="{ color: 'white', fontWeight: 'bold' }" />
          </Container>
        </Sticky>

        <Container
          v-for="i in 10"
          :key="i"
          :height="60"
          color="lightblue"
          :margin="{ bottom: 10, top: 10, left: 10, right: 10 }"
          alignment="center"
        >
          <Text :data="`Scroll Item ${i}`" />
        </Container>
        <Text data="End of List" :textAlign="TextAlign.center" />
      </Column>
    </ScrollView>
  </Container>
</template>

<script setup lang="ts">
import { Column, Container, ScrollView, Sticky, Text, TextAlign } from "fluekit";
</script>

<template>
  <Container :width="300" :height="100" color="#eee">
    <Center>
      <Text data="Scroll the page to see the Fixed element" />
    </Center>
    <!-- Fixed element is relative to viewport -->
    <Fixed :bottom="20" :right="20" :zIndex="1000">
      <Container :padding="{ all: 10 }" :decoration="{ borderRadius: { all: 20 }, color: 'black' }">
        <Text data="Fixed Badge" :style="{ color: 'white' }" />
      </Container>
    </Fixed>
  </Container>
</template>

<script setup lang="ts">
import { Container, Center, Fixed, Text } from "fluekit";
</script>

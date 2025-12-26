<template>
  <Wrap :spacing="20" :run-spacing="20">
    <Column v-for="fit in fits" :key="fit" cross-axis-alignment="center">
      <Container
        width="150"
        height="100"
        color="#eee"
        :decoration="BoxDecoration({ border: Border.all({ color: '#ccc' }) })"
      >
        <Image :image="NetworkImage('https://picsum.photos/300/300')" :fit="fit" />
      </Container>
      <Text>{{ fit }}</Text>
    </Column>
  </Wrap>
</template>

<script setup lang="ts">
import { Border, BoxDecoration, Column, Container, Image, NetworkImage, Text, Wrap } from "fluekit";

const fits = ["fill", "contain", "cover", "none", "scaleDown"] as const;
</script>

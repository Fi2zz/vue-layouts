<template>
  <SizedBox :height="200">
    <GridView
      :crossAxisCount="3"
      :mainAxisSpacing="10"
      :crossAxisSpacing="10"
      :padding="{ all: 10 }"
    >
      <Container v-for="i in 9" :key="i" :height="80" color="purple" alignment="center">
        <Text :data="`Grid ${i}`" :style="{ color: 'white' }" />
      </Container>
    </GridView>
  </SizedBox>
</template>

<script setup lang="ts">
import { Container, GridView, Text, SizedBox } from "fluekit";
</script>

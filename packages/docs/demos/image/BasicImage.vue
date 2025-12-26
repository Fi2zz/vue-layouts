<template>
  <Column :spacing="20" cross-axis-alignment="start">
    <Text>Network Image:</Text>
    <Image :image="NetworkImage('https://picsum.photos/300/200')" width="300" height="200" />

    <Text>With Custom Opacity (0.5):</Text>
    <Image
      :image="NetworkImage('https://picsum.photos/300/200?random=2')"
      width="300"
      height="200"
      :opacity="0.5"
    />
  </Column>
</template>

<script setup lang="ts">
import { Column, Image, NetworkImage, Text } from "fluekit";
</script>

<template>
  <div class="demo-box">
    <Column :gap="20" alignment="center">
      <Transform transform="rotate(45deg)" alignment="center">
        <Container :width="100" :height="100" color="purple" alignment="center">
          <Text data="Rotated" :style="{ color: 'white' }" />
        </Container>
      </Transform>

      <Transform transform="scale(1.2) skewX(10deg)" alignment="topLeft">
        <Container :width="100" :height="100" color="orange" alignment="center">
          <Text data="Skew & Scale" :style="{ color: 'white' }" />
        </Container>
      </Transform>
    </Column>
  </div>
</template>

<script setup lang="ts">
import { Transform, Container, Column, Text } from "fluekit";
</script>

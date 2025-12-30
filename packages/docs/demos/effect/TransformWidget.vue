<template>
  <div class="demo-box">
    <Column :gap="20" alignment="center">
      <Transform :transform="Matrix4.rotationZ(Math.PI / 4)" alignment="center">
        <Container :width="100" :height="100" color="purple" alignment="center">
          <Text data="Rotated" :style="TextStyle({ color: 'white' })" />
        </Container>
      </Transform>

      <Transform
        :transform="Matrix4.scaling(1.2, 1.2).multiply(Matrix4.skewX(0.17))"
        alignment="topLeft"
      >
        <Container :width="100" :height="100" color="orange" alignment="center">
          <Text data="Skew & Scale" :style="TextStyle({ color: 'white' })" />
        </Container>
      </Transform>
    </Column>
  </div>
</template>

<script setup lang="ts">
import { Transform, Container, Column, Text, TextStyle, Matrix4 } from "fluekit";
</script>

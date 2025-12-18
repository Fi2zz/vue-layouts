<template>
  <GestureDetector
    @tap="handleTap"
    @double-tap="handleDoubleTap"
    @long-press="handleLongPress"
    behavior="opaque"
  >
    <Container
      :width="200"
      :height="100"
      alignment="center"
      :decoration="{ borderRadius: { all: 8 }, color: boxColor }"
    >
      <Column mainAxisAlignment="center">
        <Text data="Tap / Double Tap / Long Press" />
        <Text :data="statusText" :style="{ fontSize: 12 }" />
      </Column>
    </Container>
  </GestureDetector>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { GestureDetector, Container, Column, Text } from "fluekit";

const boxColor = ref("teal");
const statusText = ref("Ready");

const handleTap = () => {
  console.log("tap");
  boxColor.value = "green";
  statusText.value = "Tapped!";
  setTimeout(() => (boxColor.value = "teal"), 200);
};

const handleDoubleTap = () => {
  boxColor.value = "purple";
  statusText.value = "Double Tapped!";
  setTimeout(() => (boxColor.value = "teal"), 500);
};

const handleLongPress = () => {
  boxColor.value = "red";
  statusText.value = "Long Pressed!";
  setTimeout(() => (boxColor.value = "teal"), 500);
};
</script>

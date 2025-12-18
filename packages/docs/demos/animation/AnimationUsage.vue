<template>
  <Column :mainAxisAlignment="'center'" :crossAxisAlignment="'center'">
    <SizedBox :height="20" />
    <Text :style="{ fontSize: 18, fontWeight: 'bold' }">AnimatedContainer</Text>
    <SizedBox :height="20" />

    <GestureDetector @tap="toggleContainer">
      <AnimatedContainer
        :width="selected ? 200 : 100"
        :height="selected ? 100 : 200"
        :alignment="selected ? 'center' : 'topCenter'"
        :duration="1000"
        curve="ease-in-out"
        :decoration="{
          borderRadius: { all: selected ? 20 : 0 },
          color: selected ? 'red' : 'blue',
          boxShadow: selected
            ? {
                color: 'rgba(0,0,0,0.5)',
                blurRadius: 10,
                spreadRadius: 2,
                offset: { x: 0, y: 4 },
              }
            : undefined,
        }"
      >
        <Text :style="{ color: 'white' }">Tap me!</Text>
      </AnimatedContainer>
    </GestureDetector>

    <SizedBox :height="40" />
    <div style="height: 1px; width: 100%; background: #eee" />
    <SizedBox :height="40" />

    <Text :style="{ fontSize: 18, fontWeight: 'bold' }">AnimatedOpacity</Text>
    <SizedBox :height="20" />

    <Column>
      <AnimatedOpacity :opacity="opacityLevel" :duration="500">
        <Container :width="100" :height="100" color="green" alignment="center">
          <Text :style="{ color: 'white' }">Fade</Text>
        </Container>
      </AnimatedOpacity>
      <SizedBox :height="20" />
      <GestureDetector @tap="toggleOpacity">
        <Container :padding="{ all: 10 }" :decoration="{ borderRadius: { all: 4 }, color: '#EEE' }">
          <Text>Tap to fade</Text>
        </Container>
      </GestureDetector>
    </Column>
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  AnimatedContainer,
  AnimatedOpacity,
  Column,
  Text,
  SizedBox,
  GestureDetector,
  Container,
} from "fluekit";

const selected = ref(false);
const toggleContainer = () => {
  selected.value = !selected.value;
};

const opacityLevel = ref(1.0);
const toggleOpacity = () => {
  console.log(opacityLevel.value);

  opacityLevel.value = opacityLevel.value === 1.0 ? 0.0 : 1.0;
};
</script>

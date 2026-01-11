<template>
  <Column :gap="20">
    <Text :style="{ fontWeight: FontWeight.bold }">Default (iOS)</Text>
    <Row :gap="20">
      <Button variant="ios" @pressed="onPressed">
        <Text :style="{ color: '#007AFF' }">Button</Text>
      </Button>
      <Button variant="ios" @pressed="onPressed" disabled>
        <Text :style="{ color: '#007AFF' }">Disabled</Text>
      </Button>
    </Row>

    <Text :style="{ fontWeight: FontWeight.bold }">Filled (iOS)</Text>
    <Row :gap="20">
      <Button variant="ios" color="#007AFF" @pressed="onPressed">
        <Text :style="{ color: 'white' }">Button</Text>
      </Button>
      <Button variant="ios" color="#007AFF" @pressed="onPressed" disabled>
        <Text :style="{ color: 'white' }">Disabled</Text>
      </Button>
    </Row>

    <Text>Count: {{ count }}</Text>
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Column, Row, Text, Button, FontWeight } from "fluekit";

const count = ref(0);
const onPressed = () => {
  count.value++;
};
</script>

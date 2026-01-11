<template>
  <Column :gap="32">
    <!-- iOS Style (Default) -->
    <Column :gap="10">
      <Text :style="{ fontWeight: FontWeight.bold }">iOS Style (Default)</Text>
      <Row :gap="20" cross-axis-alignment="center">
        <Switch v-model:value="iosVal" />
        <Text>Value: {{ iosVal }}</Text>
      </Row>
      <Row :gap="20" cross-axis-alignment="center">
        <Switch v-model:value="iosVal2" active-color="#FF3B30" />
        <Text>Red Color</Text>
      </Row>
    </Column>

    <!-- Material Style -->
    <Column :gap="10">
      <Text :style="{ fontWeight: FontWeight.bold }">Material Style</Text>
      <Row :gap="20" cross-axis-alignment="center">
        <Switch v-model:value="materialVal" variant="material" />
        <Text>Value: {{ materialVal }}</Text>
      </Row>
    </Column>
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Column, Row, Text, Switch, FontWeight } from "fluekit";

const iosVal = ref(true);
const iosVal2 = ref(true);
const materialVal = ref(false);
</script>

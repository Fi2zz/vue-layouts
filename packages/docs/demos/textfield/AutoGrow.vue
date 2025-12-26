<template>
  <Column :gap="20">
    <Text>Auto height TextArea</Text>
    <TextArea
      v-model="content"
      :max-lines="8"
      :decoration="{ labelText: 'Description', border: OutlineInputBorder() }"
    />
    <Text>Length: {{ content.length }}</Text>
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Column, Text, TextArea, OutlineInputBorder } from "fluekit";
const content = ref("");
</script>

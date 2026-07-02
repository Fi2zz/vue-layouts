<template>
  <Column :gap="20">
    <Text>Auto height TextArea</Text>
    <TextField
      v-model="content"
      auto-grow
      :max-lines="8"
      type="multiline"
      :decoration="InputDecoration({ labelText: 'Description', border: OutlineInputBorder() })"
    />
    <Text>Length: {{ content.length }}</Text>
  </Column>
</template>

<script setup lang="ts">
import { Column, InputDecoration, OutlineInputBorder, Text, TextField } from "fluekit";
import { ref } from "vue";
const content = ref("");
</script>

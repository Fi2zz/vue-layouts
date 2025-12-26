<template>
  <Column :gap="20">
    <Text>Outline</Text>
    <TextField
      v-model="outline"
      :decoration="{ labelText: 'Outline', border: OutlineInputBorder() }"
    />

    <Text>Underline</Text>
    <TextField
      v-model="underline"
      :decoration="{ labelText: 'Underline', border: UnderlineInputBorder() }"
    />
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Column, Text, TextField, OutlineInputBorder, UnderlineInputBorder } from "fluekit";
const outline = ref("");
const underline = ref("");
</script>

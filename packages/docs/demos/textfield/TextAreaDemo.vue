<template>
  <Column :gap="20">
    <Text>Using TextArea component:</Text>
    <TextArea
      v-model="bio"
      auto-grow
      :decoration="{
        labelText: 'Biography',
        hintText: 'Tell us about yourself',
        border: OutlineInputBorder(),
      }"
    />

    <Text>Using TextField with maxLines:</Text>
    <TextField
      v-model="notes"
      auto-grow
      :max-lines="3"
      :decoration="{
        labelText: 'Notes',
        border: OutlineInputBorder(),
      }"
    />
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Column, Text, TextArea, TextField, OutlineInputBorder } from "fluekit";

const bio = ref("");
const notes = ref("");
</script>

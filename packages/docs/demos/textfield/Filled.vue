<template>
  <Column :gap="20">
    <TextField
      v-model="name"
      :decoration="{
        labelText: 'Name',
        filled: true,
        fillColor: '#f7f7f7',
        border: OutlineInputBorder(),
      }"
    />
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Column, TextField, OutlineInputBorder } from "fluekit";
const name = ref("");
</script>

<template>
  <Column :gap="20">
    <TextField
      v-model="email"
      :decoration="{
        labelText: 'Email',
        hintText: 'example@domain.com',
        border: UnderlineInputBorder(),
      }"
    >
      <template #prefix>
        <Text style="color: #888">@</Text>
      </template>
      <template #suffix>
        <Text style="color: #888">.com</Text>
      </template>
    </TextField>

    <Text>Value: {{ email }}</Text>
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Column, Text, TextField, UnderlineInputBorder } from "fluekit";
const email = ref("");
</script>

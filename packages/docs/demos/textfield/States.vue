<template>
  <Column :gap="20">
    <TextField
      v-model="readonlyValue"
      read-only
      :decoration="{ labelText: 'ReadOnly', border: OutlineInputBorder() }"
    />

    <TextField
      v-model="disabledValue"
      :enabled="false"
      :decoration="{ labelText: 'Disabled', border: OutlineInputBorder() }"
    />

    <TextField
      v-model="errorValue"
      :decoration="{
        labelText: 'Error',
        errorText: errorValue.length < 3 ? 'Too short' : '',
        border: OutlineInputBorder(),
      }"
    />
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Column, TextField, OutlineInputBorder } from "fluekit";
const readonlyValue = ref("fixed");
const disabledValue = ref("");
const errorValue = ref("");
</script>

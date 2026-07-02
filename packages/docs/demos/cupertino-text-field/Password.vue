<template>
  <CupertinoTextField
    v-model="password"
    placeholder="Password"
    :obscure-text="true"
    prefix="🔒"
    clear-button-mode="whileEditing"
  />
</template>

<script setup lang="ts">
import { CupertinoTextField } from "fluekit";
import { ref } from "vue";

const password = ref("");
</script>

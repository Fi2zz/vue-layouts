<script setup lang="ts">
import { Column, CupertinoTextField, Text } from "fluekit";
import { ref } from "vue";

const value = ref("");
</script>

<template>
  <Column gap="16">
    <CupertinoTextField v-model="value" placeholder="请输入内容" />
    <Text>输入的值: {{ value }}</Text>
  </Column>
</template>

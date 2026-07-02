<script setup lang="ts">
import { ref } from "vue";
import { CupertinoTextField, Column, SizedBox, Text } from "fluekit";

const value1 = ref("禁用状态的值");
const value2 = ref("只读状态的值");
</script>

<template>
  <Column gap="16">
    <div>
      <Text>禁用状态 (disabled)</Text>
      <SizedBox height="8" />
      <CupertinoTextField
        v-model="value1"
        placeholder="禁用状态"
        disabled
      />
    </div>
    
    <div>
      <Text>只读状态 (readOnly)</Text>
      <SizedBox height="8" />
      <CupertinoTextField
        v-model="value2"
        placeholder="只读状态"
        read-only
      />
    </div>
  </Column>
</template>

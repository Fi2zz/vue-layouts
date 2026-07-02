<script setup lang="ts">
import { ref } from "vue";
import { CupertinoTextField, Column, SizedBox, Text } from "fluekit";

const value1 = ref("");
const value2 = ref("");
const value3 = ref("");
</script>

<template>
  <Column gap="16">
    <div>
      <Text>圆角矩形边框 (默认)</Text>
      <SizedBox height="8" />
      <CupertinoTextField
        v-model="value1"
        placeholder="Rounded rect border"
        border-style="roundedRect"
      />
    </div>
    
    <div>
      <Text>底部线条边框</Text>
      <SizedBox height="8" />
      <CupertinoTextField
        v-model="value2"
        placeholder="Line border"
        border-style="line"
      />
    </div>
    
    <div>
      <Text>无边框</Text>
      <SizedBox height="8" />
      <CupertinoTextField
        v-model="value3"
        placeholder="No border"
        border-style="none"
      />
    </div>
  </Column>
</template>

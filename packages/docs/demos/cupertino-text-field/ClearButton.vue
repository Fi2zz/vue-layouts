<script setup lang="ts">
import { ref } from "vue";
import { CupertinoTextField, Column, SizedBox, Text } from "fluekit";

const value1 = ref("可清除的内容");
const value2 = ref("编辑时显示清除按钮");
const value3 = ref("始终显示清除按钮");
</script>

<template>
  <Column gap="16">
    <div>
      <Text>始终显示 (always)</Text>
      <SizedBox height="8" />
      <CupertinoTextField
        v-model="value1"
        placeholder="输入内容"
        clear-button-mode="always"
      />
    </div>
    
    <div>
      <Text>编辑时显示 (whileEditing)</Text>
      <SizedBox height="8" />
      <CupertinoTextField
        v-model="value2"
        placeholder="输入内容"
        clear-button-mode="whileEditing"
      />
    </div>
    
    <div>
      <Text>从不显示 (never) - 默认</Text>
      <SizedBox height="8" />
      <CupertinoTextField
        v-model="value3"
        placeholder="输入内容"
        clear-button-mode="never"
      />
    </div>
  </Column>
</template>

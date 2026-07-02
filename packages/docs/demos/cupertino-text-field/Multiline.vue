<script setup lang="ts">
import { ref } from "vue";
import { CupertinoTextField, Column, SizedBox, Text } from "fluekit";

const value1 = ref("");
const value2 = ref("这是一段多行文本内容。\n可以自动调整高度。\n继续输入更多内容...");
</script>

<template>
  <Column gap="16">
    <div>
      <Text>自动高度的多行输入</Text>
      <SizedBox height="8" />
      <CupertinoTextField
        v-model="value1"
        placeholder="请输入多行内容..."
        :max-lines="null"
        :min-lines="3"
      />
    </div>

    <div>
      <Text>限制最大行数 (最多 5 行)</Text>
      <SizedBox height="8" />
      <CupertinoTextField
        v-model="value2"
        placeholder="请输入内容..."
        :max-lines="5"
        :min-lines="2"
      />
    </div>
  </Column>
</template>

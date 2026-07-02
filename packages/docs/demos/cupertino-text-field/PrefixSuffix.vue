<script setup lang="ts">
import { Column, CupertinoTextField, SizedBox, Text, TextStyle } from "fluekit";
import { ref } from "vue";

const value1 = ref("");
const value2 = ref("");
const value3 = ref("");
const prefix = "$";
const suffix = "kg";

const valueWihHasSuffix = ref("Hello World");
</script>

<template>
  <Column gap="16">
    <div>
      <Text>Prefix Slot</Text>
      <SizedBox height="8" />
      <CupertinoTextField v-model="value1" placeholder="Type something">
        <template #prefix>
          <Text :style="TextStyle({ color: '#8E8E93' })">{{ prefix }}</Text>
        </template>
      </CupertinoTextField>
    </div>
    <div>
      <Text>Suffix Slot (default)</Text>
      <SizedBox height="8" />
      <CupertinoTextField
        v-model="value2"
        placeholder="Type something"
        :style="TextStyle({ fontSize: 32 })"
      >
        <template #suffix>
          <Text :style="TextStyle({ color: '#8E8E93', fontSize: 20 })">{{ suffix }}</Text>
        </template>
      </CupertinoTextField>
    </div>
    <div>
      <Text>Suffix (Suffix Mode: always)</Text>
      <SizedBox height="8" />
      <CupertinoTextField
        v-model="value2"
        placeholder="Type something"
        suffix-mode="always"
        :style="TextStyle({ fontSize: 32 })"
      >
        <template #suffix>
          <Text :style="TextStyle({ color: '#8E8E93', fontSize: 20 })">{{ suffix }}</Text>
        </template>
      </CupertinoTextField>
    </div>
    <div>
      <Text>Suffix (Suffix Mode: editing)</Text>
      <SizedBox height="8" />
      <CupertinoTextField
        v-model="valueWihHasSuffix"
        placeholder="Type something (Suffix Mode: editing)"
        suffix-mode="editing"
        clear-button-mode="editing"
        :style="TextStyle({ fontSize: 32 })"
      >
        <template #suffix>
          <Text :style="TextStyle({ color: '#8E8E93', fontSize: 20 })">{{ suffix }}</Text>
        </template>
      </CupertinoTextField>
      valueWihHasSuffix: {{ valueWihHasSuffix }}
    </div>
    <div>
      <Text>Suffix (Suffix Mode: never)</Text>
      <SizedBox height="8" />
      <CupertinoTextField
        v-model="value2"
        placeholder="Type something"
        suffix-mode="never"
        :style="TextStyle({ fontSize: 32 })"
      >
        <template #suffix>
          <Text :style="TextStyle({ color: '#8E8E93', fontSize: 20 })">{{ suffix }}</Text>
        </template>
      </CupertinoTextField>
    </div>
    <div>
      <Text>Suffix (Suffix Mode: notEditing)</Text>
      <SizedBox height="8" />
      <CupertinoTextField
        v-model="value2"
        suffix-mode="notEditing"
        placeholder="Type something"
        :style="TextStyle({ fontSize: 32 })"
      >
        <template #suffix>
          <Text :style="TextStyle({ color: '#8E8E93', fontSize: 20 })">{{ suffix }}</Text>
        </template>
      </CupertinoTextField>
    </div>
  </Column>
</template>

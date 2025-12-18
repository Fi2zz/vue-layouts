<template>
  <Column crossAxisAlignment="start" :gap="10">
    <Text data="Normal Text" />
    <Text
      data="Bold & Blue"
      :style="{
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 20,
      }"
    />
    <Text
      data="Italic & Red & Underline"
      :style="{
        color: 'red',
        fontStyle: FontStyle.italic,
        decoration: TextDecoration.underline,
        decorationStyle: TextDecorationStyle.wavy,
        decorationColor: 'red',
      }"
    />
    <Text
      data="Shadow Text"
      :style="{
        fontSize: 24,
        color: 'black',
        shadows: [
          {
            color: 'rgba(0,0,0,0.5)',
            blurRadius: 4,
            offsetX: 2,
            offsetY: 2,
          },
        ],
      }"
    />
  </Column>
</template>
<script setup lang="ts">
import { Text, Column, FontStyle, TextDecoration, TextDecorationStyle } from "fluekit";
</script>

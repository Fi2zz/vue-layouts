<template>
  <Column crossAxisAlignment="start" :gap="10">
    <Text data="Normal Text" />
    <Text
      data="Bold & Blue"
      :style="
        TextStyle({
          color: 'blue',
          fontWeight: FontWeight.bold,
          fontSize: 20,
        })
      "
    />
    <Text
      data="Italic & Red & Underline"
      :style="
        TextStyle({
          color: 'red',
          fontStyle: FontStyle.italic,
          decoration: TextDecoration.underline,
          decorationStyle: TextDecorationStyle.wavy,
          decorationColor: 'red',
        })
      "
    />
    <Text
      data="Shadow Text"
      :style="
        TextStyle({
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
        })
      "
    />
    
    <SizedBox :height="20" />
    <Text data="Cupertino Presets" :style="TextStyle({ fontSize: 20, fontWeight: FontWeight.bold })" />
    <SizedBox :height="10" />
    <Text data="Large Title" :style="CupertinoTextStylePreset.largeTitle" />
    <Text data="Title 1" :style="CupertinoTextStylePreset.title1" />
    <Text data="Headline" :style="CupertinoTextStylePreset.headline" />
    <Text data="Body" :style="CupertinoTextStylePreset.body" />
    <Text data="Caption 1" :style="CupertinoTextStylePreset.caption1" />
  </Column>
</template>
<script setup lang="ts">
import { Text, Column, FontStyle, TextDecoration, TextDecorationStyle, TextStyle, FontWeight, SizedBox } from "fluekit";
import { CupertinoTextStylePreset } from "@fluekit/presets";
</script>

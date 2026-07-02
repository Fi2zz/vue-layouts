<template>
  <Column :gap="20">
    <TextField
      v-model="value"
      :decoration="
        InputDecoration({
          labelText: 'Username',
          hintText: 'Enter your username',
          border: OutlineInputBorder(),
        })
      "
    />
    <Text>Username: {{ value }}</Text>

    <TextField
      v-model="password"
      obscure-text
      :decoration="
        InputDecoration({
          labelText: 'Password',
          hintText: 'Enter your password',
          border: OutlineInputBorder(),
          prefixText: '🔒 ',
          floatingLabelBehavior: FloatingLabelBehavior.always,
        })
      "
    />
    <Text>Password: {{ password }}</Text>
    <TextField
      v-model="password"
      obscure-text
      :decoration="
        InputDecoration({
          labelText: 'Password',
          hintText: 'Enter your password',
          border: UnderlineInputBorder(),
          prefixText: '🔒 ',
        })
      "
    />

    <TextField
      v-model.number="number"
      :decoration="
        InputDecoration({
          floatingLabelBehavior: FloatingLabelBehavior.auto,
          hintText: 'Enter a number',
          labelText: 'v-model.number Modifier',
        })
      "
    />
    <Text>Number: {{ number }}</Text
    ><TextField
      v-model.trim="trim"
      :decoration="
        InputDecoration({
          labelText: 'v-model.trim ',
          floatingLabelBehavior: FloatingLabelBehavior.auto,
          border: UnderlineInputBorder(),
        })
      "
    />
    <Text>Trimmed: {{ trim }}</Text>
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Column,
  Text,
  TextField,
  OutlineInputBorder,
  InputDecoration,
  UnderlineInputBorder,
  FloatingLabelBehavior,
} from "fluekit";

const value = ref("");
const password = ref("");
const number = ref(0);
const trim = ref("");
const lazy = ref("");
</script>

<template>
  <Column :gap="20">
    <Card :elevation="2" :margin="EdgeInsets.all(10)">
      <Padding :padding="EdgeInsets.all(16)">
        <Text data="Card with elevation 2" />
      </Padding>
    </Card>

    <Card :elevation="8" color="#f0f0f0">
      <Padding :padding="EdgeInsets.all(16)">
        <Text data="Card with elevation 8" />
      </Padding>
    </Card>
  </Column>
</template>

<script setup lang="ts">
import { Card, Column, Padding, Text, EdgeInsets } from "fluekit";
</script>

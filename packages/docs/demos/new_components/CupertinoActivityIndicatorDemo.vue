<template>
  <Column :gap="40">
    <Row :gap="40" cross-axis-alignment="center">
      <Column :gap="10" cross-axis-alignment="center">
        <CupertinoActivityIndicator />
        <Text>Default</Text>
      </Column>

      <Column :gap="10" cross-axis-alignment="center">
        <CupertinoActivityIndicator :radius="15" />
        <Text>Large</Text>
      </Column>

      <Column :gap="10" cross-axis-alignment="center">
        <CupertinoActivityIndicator color="#FF3B30" />
        <Text>Colored</Text>
      </Column>
    </Row>

    <Row :gap="40" cross-axis-alignment="center">
      <Column :gap="10" cross-axis-alignment="center">
        <CupertinoActivityIndicator :animating="false" />
        <Text>Not Animating</Text>
      </Column>
    </Row>
  </Column>
</template>

<script setup lang="ts">
import { Column, Row, Text, CupertinoActivityIndicator } from "fluekit";
</script>

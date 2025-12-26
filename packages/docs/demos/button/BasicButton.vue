<template>
  <Column :spacing="20" cross-axis-alignment="start">
    <Text>Count: {{ count }}</Text>

    <Row :spacing="20">
      <!-- 默认无样式按钮 -->
      <Button @pressed="count++">
        <Text>Click Me (Unstyled)</Text>
      </Button>

      <!-- 禁用状态 -->
      <Button disabled @pressed="count++">
        <Text style="color: grey">Disabled</Text>
      </Button>
    </Row>
  </Column>
</template>

<script setup lang="ts">
import { Button, Column, Row, Text } from "fluekit";
import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <Column :gap="20">
    <Text :style="TextStyle({ fontWeight: FontWeight.bold })">Cupertino Presets</Text>

    <Text>Plain</Text>
    <Row :gap="20">
      <Button :style="CupertinoButtonStylePreset.plain" @pressed="onPressed"> Button </Button>
      <Button :style="CupertinoButtonStylePreset.plain" @pressed="onPressed" disabled>
        Disabled
      </Button>
    </Row>

    <Text>Filled</Text>
    <Row :gap="20">
      <Button :style="CupertinoButtonStylePreset.filled" @pressed="onPressed"> Button </Button>
      <Button :style="CupertinoButtonStylePreset.filled" @pressed="onPressed" disabled>
        Disabled
      </Button>
    </Row>

    <Text>Tinted</Text>
    <Row :gap="20">
      <Button :style="CupertinoButtonStylePreset.tinted" @pressed="onPressed"> Button </Button>
      <Button :style="CupertinoButtonStylePreset.tinted" @pressed="onPressed" disabled>
        Disabled
      </Button>
    </Row>

    <Text>Destructive</Text>
    <Row :gap="20">
      <Button :style="CupertinoButtonStylePreset.destructive" @pressed="onPressed"> Delete </Button>
      <Button :style="CupertinoButtonStylePreset.destructiveFilled" @pressed="onPressed">
        Delete
      </Button>
    </Row>
    <Text>Count: {{ count }}</Text>
  </Column>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Column, Row, Text, Button, FontWeight, TextStyle } from "fluekit";
import { CupertinoButtonStylePreset } from "@fluekit/presets";

const count = ref(0);
const onPressed = () => {
  count.value++;
};
</script>

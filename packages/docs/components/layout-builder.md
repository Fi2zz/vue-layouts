# LayoutBuilder

Builds a widget tree that can depend on the parent widget's size.

Similar to Flutter's [LayoutBuilder](https://api.flutter.dev/flutter/widgets/LayoutBuilder-class.html), this component allows you to make layout decisions based on the incoming constraints (specifically the available size).

## Usage

```vue
<script setup>
import { LayoutBuilder, Text, TextStyle } from "fluekit";
</script>

<template>
  <LayoutBuilder v-slot="{ constraints }">
    <Text v-if="(constraints.maxWidth ?? 0) > 500" :style="TextStyle({ fontSize: 20 })">
      Wide Layout
    </Text>
    <Text v-else :style="TextStyle({ fontSize: 14 })"> Narrow Layout </Text>
  </LayoutBuilder>
</template>
```

## Demo

<LayoutBuilderDemo />

<script setup>
import LayoutBuilderDemo from '../demos/new_components/LayoutBuilderDemo.vue';
</script>

## API

### Props

None. It takes up 100% of the parent's size.

### Slots

- `default`: Scoped slot that provides `constraints`.

### BoxConstraints

The `constraints` object passed to the slot has the following properties:

```ts
interface BoxConstraints {
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
}
```

In the context of `LayoutBuilder` in this library, `minWidth` equals `maxWidth` (and same for height), representing the current measured size of the container.

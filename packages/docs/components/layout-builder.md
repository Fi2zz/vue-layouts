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

## LayoutProvider & useLayout

You can also use the `provide/inject` pattern to access layout constraints deep in the component tree without passing props.

### Usage

```vue
<script setup>
import { LayoutProvider, useLayout, Text } from "fluekit";
import MyChildComponent from "./MyChildComponent.vue";
</script>

<template>
  <LayoutProvider>
    <MyChildComponent />
  </LayoutProvider>
</template>
```

In `MyChildComponent.vue`:

```vue
<script setup>
import { useLayout } from "fluekit";
const constraints = useLayout();
</script>

<template>
  <div>Width: {{ constraints?.maxWidth }}</div>
</template>
```

### LayoutProvider Demo

<LayoutProviderDemo />

<script setup>
import LayoutBuilderDemo from '../demos/new_components/LayoutBuilderDemo.vue';
import LayoutProviderDemo from '../demos/new_components/LayoutProviderDemo.vue';
</script>

## API

### Props

| Name        | Type                                             | Default  | Description                                                       |
| ----------- | ------------------------------------------------ | -------- | ----------------------------------------------------------------- |
| `direction` | `'horizontal' \| 'vertical' \| 'both' \| 'none'` | `'both'` | Controls the sizing behavior and constraints passed to the child. |

- `both`: The builder takes up 100% width and height. Constraints are tight (fixed size).
- `horizontal`: The builder takes up 100% width. Width constraint is tight, height is loose (0 to Infinity).
- `vertical`: The builder takes up 100% height. Height constraint is tight, width is loose (0 to Infinity).
- `none`: The builder sizes itself to its content. Constraints are loose (0 to Infinity).

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

By default (`direction="both"`), `minWidth` equals `maxWidth` (and same for height), representing the current measured size of the container. If you change the `direction`, some constraints may become loose (0 to Infinity).

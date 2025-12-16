# Flue Library

**Flue** (Fluent Layouts for Vue) is a Vue 3 library that provides Flutter-like layout components.

## Features

*   **Container**: A convenience widget that combines common painting, positioning, and sizing widgets.
*   **Row / Column**: Flex layouts for horizontal and vertical arrangement.
*   **Center**: Centers its child within itself.
*   **Stack / Positioned**: Overlapping elements.
*   **Text**: Advanced text styling using `TextStyle`.
*   **SizedBox**: A box with a specified size.
*   **EdgeInsets**: Padding and margin utilities.
*   **BoxDecoration**: Styling for Container (border, radius, shadow, gradient, image).

## Installation

```bash
pnpm install flue
```

## Usage

```vue
<script setup>
import { Container, Center, Text, TextStyle } from 'flue';
</script>

<template>
  <Container color="blue" width="100px" height="100px">
    <Center>
      <Text text="Hello" :style="TextStyle({ color: 'white' })" />
    </Center>
  </Container>
</template>
```

## Build

```bash
pnpm build
```

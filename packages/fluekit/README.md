# FlueKit

**FlueKit** (Fluent Layouts for Vue) is a Vue 3 library that provides Flutter-like layout components for building complex UIs with ease. It brings the power and simplicity of Flutter's layout model to the web.

## Features

- **Layout Primitives**: `Row`, `Column`, `Stack`, `Positioned`, `Expanded`, `SizedBox`, `Center`, `Align`
- **Container System**: `Container`, `AnimatedContainer`, `Padding`, `ConstrainedBox`
- **Scrolling**: `ListView`, `GridView`, `ScrollView` (SingleChildScrollView)
- **Styling**: `BoxDecoration`, `TextStyle`, `EdgeInsets`, `BorderRadius`
- **Interactions**: `GestureDetector`, `IgnorePointer`, `AbsorbPointer`
- **Animations**: `AnimatedContainer`, `AnimatedOpacity`

## Installation

```bash
npm install fluekit
# or
pnpm add fluekit
# or
yarn add fluekit
```

## Quick Start

```vue
<script setup>
import { Container, Center, Text, Column, SizedBox } from "fluekit";
</script>

<template>
  <Center>
    <Container
      :width="300"
      :height="200"
      color="#2196F3"
      :decoration="{
        borderRadius: { all: 16 },
        boxShadow: [{ color: 'black', blurRadius: 10, offset: { x: 0, y: 4 } }],
      }"
      alignment="center"
    >
      <Column mainAxisAlignment="center">
        <Text :style="{ color: 'white', fontSize: 24, fontWeight: 'bold' }"> Hello FlueKit </Text>
        <SizedBox :height="10" />
        <Text :style="{ color: 'white', fontSize: 16 }"> Flutter-like layouts for Vue 3 </Text>
      </Column>
    </Container>
  </Center>
</template>
```

## Documentation

Visit the [documentation website](https://fitz.github.io/fluekit) for detailed guides and API references.

## License

MIT

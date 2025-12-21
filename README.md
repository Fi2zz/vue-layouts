# FlueKit

<p align="center">
  **FlueKit** (Fluent Layouts for Vue) - A Vue 3 library bringing Flutter's layout paradigm to the web.
</p>

---

## 📖 Introduction

**FlueKit** allows developers to build Vue applications using the intuitive and powerful layout widgets found in Flutter. Say goodbye to complex CSS for basic layouts and hello to declarative, composable widgets like `Container`, `Row`, `Column`, `Stack`, and more.

## 📦 Project Structure

This project is a Monorepo containing:

- **`packages/fluekit`**: The core library source code.
- **`packages/docs`**: The documentation site (VitePress).

## 🚀 Quick Start for Development

### Prerequisites

- Node.js (v20+)
- pnpm (v10+)

### Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    make install
    # or
    pnpm install
    ```

### Common Commands (Makefile)

This project uses a `Makefile` to simplify development workflows.

- **Start Documentation Dev Server**:

  ```bash
  make dev
  ```

  Starts the VitePress dev server for local documentation writing and component testing.

- **Build Project**:

  ```bash
  make build
  ```

  Builds both the library and the documentation.

- **Run Tests**:

  ```bash
  make test
  ```

  Runs unit tests using Vitest.

- **Lint & Format**:
  ```bash
  make lint
  make format
  ```

## 📦 Using FlueKit in Your Project

To use `fluekit` in your own Vue 3 application:

```bash
pnpm add fluekit
```

```vue
<script setup>
import { Container, Center, Text, Column, SizedBox } from "fluekit";
</script>

<template>
  <Center>
    <Container :width="300" :height="200" color="#2196F3" alignment="center">
      <Column mainAxisAlignment="center">
        <Text :style="{ color: 'white', fontSize: 24, fontWeight: 'bold' }"> Hello FlueKit </Text>
      </Column>
    </Container>
  </Center>
</template>
```

## 📚 Documentation

Detailed documentation and examples are available in the `packages/docs` directory or deployed via GitHub Pages.

- **Online Documentation**: [https://fi2zz.github.io/fluekit/](https://fi2zz.github.io/fluekit/)
- **Source Code**: [packages/docs](packages/docs)

## 📄 License

MIT

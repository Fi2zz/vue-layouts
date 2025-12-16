# Flue

<p align="center">
  **Fluent Layouts for Vue** - A comprehensive library bringing Flutter's layout paradigm to Vue 3.
</p>

---

## 📖 Introduction

**Flue** allows developers to build Vue applications using the intuitive and powerful layout widgets found in Flutter. Say goodbye to complex CSS for basic layouts and hello to declarative, composable widgets like `Container`, `Row`, `Column`, `Stack`, and more.

## 📦 Project Structure

This project is a Monorepo containing:

- **`packages/lib`**: The core library (`flue`).
- **`packages/example`**: A demonstration application showcasing the library's capabilities.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16+)
- pnpm

### Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    pnpm install
    ```

### Development

- **Run Example App**:

  ```bash
  pnpm dev:example
  ```

  Opens the demo app with hot-reload.

- **Build Library**:
  ```bash
  pnpm build:lib
  ```
  Compiles the library to `dist/` (ESM & UMD).

## 🛠 Available Widgets

- **Layout**: `Container`, `Center`, `Row`, `Column`, `Stack`, `Positioned`, `SizedBox`, `Expanded`, `Padding`
- **Visual**: `Opacity`, `Text`
- **Helpers**: `EdgeInsets`, `BoxDecoration`, `TextStyle`, `BoxConstraints`

## 📄 License

MIT

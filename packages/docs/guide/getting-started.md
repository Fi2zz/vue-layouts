# Getting Started

## Introduction

FlueKit is a layout UI kit for Vue 3 that brings Flutter's layout concepts to the web. It allows you to build complex layouts with ease using a familiar API.

## Installation

```bash
npm install fluekit
# or
pnpm add fluekit
# or
yarn add fluekit
```

## Basic Usage

```vue
<script setup>
import { Container, Center, Text } from "fluekit";
</script>

<template>
  <Center>
    <Container :width="200" :height="200" color="blue" alignment="center">
      <Text :style="{ color: 'white' }">Hello FlueKit</Text>
    </Container>
  </Center>
</template>
```

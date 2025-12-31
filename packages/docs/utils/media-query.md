# MediaQuery

Establish a subtree in which media queries resolve to the given data.

For example, to learn the size of the current media (e.g., the window containing your app), you can use `useMediaQuery`.

## Usage

```vue
<script setup>
import { useMediaQuery } from "fluekit";

const mediaQuery = useMediaQuery();
</script>

<template>
  <div>Width: {{ mediaQuery.size.width }}</div>
</template>
```

## Demo

<MediaQueryDemo />

<script setup>
import MediaQueryDemo from '../demos/new_components/MediaQueryDemo.vue';
</script>

## API

### useMediaQuery

Returns the current `MediaQueryData`. If called within a `MediaQuery` component, returns the data provided by that component. Otherwise, returns the global window media query data.

```ts
function useMediaQuery(): MediaQueryData;
```

### MediaQuery Component

A widget that establishes a subtree in which media queries resolve to the given data.

#### Props

- `data`: **MediaQueryData**
  - The media query data to provide to descendants.

### MediaQueryData Interface

```ts
enum Orientation {
  portrait = "portrait",
  landscape = "landscape",
}

interface MediaQueryData {
  size: { width: number; height: number };
  devicePixelRatio: number;
  platformBrightness: "light" | "dark";
  orientation: Orientation;
  disableAnimations: boolean;
  highContrast: boolean;
  padding: EdgeInsets;
  viewInsets: EdgeInsets;
}
```

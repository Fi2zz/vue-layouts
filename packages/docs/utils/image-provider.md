# ImageProvider

Identifies an image without committing to the precise final asset. This allows a set of images to be identified and for the precise image to be selected later based on the environment (e.g., device pixel ratio).

## Usage

Used in `Image` component and `BoxDecoration` (for background images).

```vue
<script setup>
import { Image, AssetImage, NetworkImage } from "fluekit";
</script>

<template>
  <!-- Local Asset -->
  <Image :image="AssetImage('logo.png')" />

  <!-- Network Image -->
  <Image :image="NetworkImage('https://example.com/pic.jpg')" />

  <!-- Memory Image (Base64) -->
  <Image :image="MemoryImage('data:image/png;base64,...')" />
</template>
```

## API

### ImageProvider Interface

```typescript
export interface ImageProvider {
  src: string;
}
```

### AssetImage

Creates an object that fetches an image from an asset bundle.

```typescript
function AssetImage(name: string, options?: AssetImageOptions): ImageProvider;
```

**Options:**

- `package`: (Optional) The package name the asset belongs to.
- `bundle`: (Optional) The bundle to use.

### NetworkImage

Creates an object that fetches the image at the given URL.

```typescript
function NetworkImage(url: string): ImageProvider;
```

### MemoryImage

Creates an object that displays an image from a `Base64` string or `Blob` object.

```typescript
function MemoryImage(data: string | Blob): ImageProvider;
```

## Configuration

For configuring base URLs for `AssetImage`, see [Global Configuration](/utils#setassetbaseurl).

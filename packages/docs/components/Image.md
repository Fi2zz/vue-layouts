# Image

A widget that displays an image.

## Basic Usage

Use `NetworkImage` or `AssetImage` to specify the image source.

<script setup>
import BasicImage from '@example/demos/image/BasicImage.vue'
import FitImage from '@example/demos/image/FitImage.vue'
</script>

<div class="demo-box">
  <BasicImage />
</div>

<<< ../demos/image/BasicImage.vue

## Image Fit

The `fit` property controls how the image should be inscribed into the box.

<div class="demo-box">
  <FitImage />
</div>

<<< ../demos/image/FitImage.vue

## API

### Props

| Name            | Type               | Default     | Description                                                       |
| :-------------- | :----------------- | :---------- | :---------------------------------------------------------------- |
| `image`         | `ImageProvider`    | -           | The image provider (e.g., `NetworkImage('url')`).                 |
| `width`         | `number \| string` | -           | The width of the image.                                           |
| `height`        | `number \| string` | -           | The height of the image.                                          |
| `fit`           | `BoxFit`           | `'contain'` | How to inscribe the image into the space allocated during layout. |
| `alignment`     | `Alignment`        | `'center'`  | How to align the image within its bounds.                         |
| `opacity`       | `number`           | `1.0`       | The opacity of the image.                                         |
| `filterQuality` | `FilterQuality`    | `'medium'`  | The rendering quality of the image.                               |
| `alt`           | `string`           | `''`        | Semantic description of the image.                                |

### Events

| Name    | Description                                      | Parameters |
| :------ | :----------------------------------------------- | :--------- |
| `load`  | Triggered when the image is successfully loaded. | `Event`    |
| `error` | Triggered when the image fails to load.          | `Event`    |

### ImageProvider

Functions to create image providers:

- **`NetworkImage(url, options?)`**: Creates an object that fetches the image at the given URL.
- **`AssetImage(name, options?)`**: Creates an object that fetches an image from an asset bundle.

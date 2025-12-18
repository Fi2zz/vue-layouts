# Container

A convenience widget that combines common painting, positioning, and sizing widgets.

## Basic Usage

<script setup>
import Basic from '@example/demos/container/Basic.vue'
import Alignment from '@example/demos/container/Alignment.vue'
import Decoration from '@example/demos/container/Decoration.vue'
import DecorationImage from '@example/demos/container/DecorationImage.vue'
import ForegroundDecoration from '@example/demos/container/ForegroundDecoration.vue'
import Gradient from '@example/demos/container/Gradient.vue'
import Transform from '@example/demos/container/Transform.vue'
</script>

<div class="demo-box">
  <Basic />
</div>

<<< ../demos/container/Basic.vue

## Alignment

Control how the child is aligned within the container.

<div class="demo-box">
  <Alignment />
</div>

<<< ../demos/container/Alignment.vue

## Decoration

Add background color, border, border radius, and box shadow.

<div class="demo-box">
  <Decoration />
</div>

<<< ../demos/container/Decoration.vue

## Decoration Image

Add a background image to the container.

<div class="demo-box">
  <DecorationImage />
</div>

<<< ../demos/container/DecorationImage.vue

## Gradient

Use linear or radial gradients.

<div class="demo-box">
  <Gradient />
</div>

<<< ../demos/container/Gradient.vue

## Transform

Apply transformations like rotation, scaling, and translation.

<div class="demo-box">
  <Transform />
</div>

<<< ../demos/container/Transform.vue

## Foreground Decoration

Draw a decoration in front of the child.

<div class="demo-box">
  <ForegroundDecoration />
</div>

<<< ../demos/container/ForegroundDecoration.vue

## API

### Props

| Name                   | Type                                  | Default  | Description                                                       |
| :--------------------- | :------------------------------------ | :------- | :---------------------------------------------------------------- |
| `width`                | `number \| string`                    | -        | The width of the container.                                       |
| `height`               | `number \| string`                    | -        | The height of the container.                                      |
| `padding`              | `EdgeInsets`                          | -        | Empty space to inscribe inside the decoration.                    |
| `margin`               | `EdgeInsets`                          | -        | Empty space to surround the decoration and child.                 |
| `decoration`           | `BoxDecoration`                       | -        | The decoration to paint behind the child.                         |
| `foregroundDecoration` | `BoxDecoration`                       | -        | The decoration to paint in front of the child.                    |
| `color`                | `string`                              | -        | The color to paint behind the child.                              |
| `alignment`            | `FlexAlignment \| string`             | -        | Align the child within the container.                             |
| `clipBehavior`         | `'none' \| 'hardEdge' \| 'antiAlias'` | `'none'` | The clip behavior when decoration is not null.                    |
| `transform`            | `string`                              | -        | The transformation matrix to apply before painting the container. |
| `transformAlignment`   | `FlexAlignment \| string`             | -        | The alignment of the origin of the coordinate system.             |
| `constraints`          | `BoxConstraints`                      | -        | Additional constraints to apply to the child.                     |

### Slots

| Name      | Description       |
| :-------- | :---------------- |
| `default` | The child widget. |

# Stack, Positioned & Sticky

A widget that positions its children relative to the edges of its box.

## Basic Usage

<script setup>
import StackPositioned from '@example/demos/layout/StackPositioned.vue'
import Sticky from '@example/demos/layout/Sticky.vue'
</script>

<div class="demo-box">
  <StackPositioned />
</div>

<<< ../demos/layout/StackPositioned.vue

## Sticky

A widget that positions its child stickily (like CSS position: sticky).

<div class="demo-box">
  <Sticky />
</div>

<<< ../demos/layout/Sticky.vue

## API

### Stack

#### Props

| Name            | Type                                                                                                                                     | Default     | Description                                                                     |
| :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------- | :---------- | :------------------------------------------------------------------------------ |
| `alignment`     | `'topLeft' \| 'topCenter' \| 'topRight' \| 'centerLeft' \| 'center' \| 'centerRight' \| 'bottomLeft' \| 'bottomCenter' \| 'bottomRight'` | `'topLeft'` | How to align the non-positioned and partially-positioned children in the stack. |
| `clipBehavior`  | `'none' \| 'hardEdge' \| 'antiAlias' \| 'clip'`                                                                                          | `'none'`    | The content will be clipped (or not) according to this option.                  |
| `textDirection` | `'ltr' \| 'rtl'`                                                                                                                         | `'ltr'`     | The direction to use for resolving positioning.                                 |
| `fit`           | `'loose' \| 'expand' \| 'passthrough'`                                                                                                   | `'loose'`   | How to size the non-positioned children in the stack.                           |

#### Slots

| Name      | Description           |
| :-------- | :-------------------- |
| `default` | The children widgets. |

### Positioned

#### Props

| Name     | Type               | Default | Description               |
| :------- | :----------------- | :------ | :------------------------ |
| `top`    | `number \| string` | -       | Distance from the top.    |
| `bottom` | `number \| string` | -       | Distance from the bottom. |
| `left`   | `number \| string` | -       | Distance from the left.   |
| `right`  | `number \| string` | -       | Distance from the right.  |
| `width`  | `number \| string` | -       | Width of the widget.      |
| `height` | `number \| string` | -       | Height of the widget.     |

#### Slots

| Name      | Description       |
| :-------- | :---------------- |
| `default` | The child widget. |

### Sticky

#### Props

| Name     | Type               | Default | Description                |
| :------- | :----------------- | :------ | :------------------------- |
| `top`    | `number \| string` | -       | Distance from the top.     |
| `bottom` | `number \| string` | -       | Distance from the bottom.  |
| `left`   | `number \| string` | -       | Distance from the left.    |
| `right`  | `number \| string` | -       | Distance from the right.   |
| `width`  | `number \| string` | -       | Width of the widget.       |
| `height` | `number \| string` | -       | Height of the widget.      |
| `zIndex` | `number \| string` | `10`    | The z-index of the widget. |

#### Slots

| Name      | Description       |
| :-------- | :---------------- |
| `default` | The child widget. |

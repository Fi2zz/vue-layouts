# Expanded & SizedBox

## Expanded

A widget that expands a child of a Row, Column, or Flex so that the child fills the available space.

<script setup>
import Expanded from '@example/demos/layout/Expanded.vue'
import SizedBoxPadding from '@example/demos/layout/SizedBoxPadding.vue'
</script>

<div class="demo-box">
  <Expanded />
</div>

<<< ../demos/layout/Expanded.vue

## SizedBox & Padding

`SizedBox` is a box with a specified size. `Padding` insets its child by the given padding.

<div class="demo-box">
  <SizedBoxPadding />
</div>

<<< ../demos/layout/SizedBoxPadding.vue

## API

### Expanded

#### Props

| Name        | Type                                                                | Default  | Description                                            |
| :---------- | :------------------------------------------------------------------ | :------- | :----------------------------------------------------- |
| `flex`      | `number`                                                            | `1`      | The flex factor to use for this child.                 |
| `alignSelf` | `'auto' \| 'start' \| 'end' \| 'center' \| 'stretch' \| 'baseline'` | `'auto'` | How this child should be aligned along the cross axis. |
| `minSize`   | `number \| string`                                                  | -        | Minimum size of the widget.                            |
| `maxSize`   | `number \| string`                                                  | -        | Maximum size of the widget.                            |

#### Slots

| Name      | Description       |
| :-------- | :---------------- |
| `default` | The child widget. |

### SizedBox

#### Props

| Name     | Type               | Default | Description           |
| :------- | :----------------- | :------ | :-------------------- |
| `width`  | `number \| string` | -       | Width of the widget.  |
| `height` | `number \| string` | -       | Height of the widget. |

#### Slots

| Name      | Description       |
| :-------- | :---------------- |
| `default` | The child widget. |

### Padding

#### Props

| Name         | Type               | Default | Description                 |
| :----------- | :----------------- | :------ | :-------------------------- |
| `all`        | `number \| string` | -       | Padding for all sides.      |
| `horizontal` | `number \| string` | -       | Padding for left and right. |
| `vertical`   | `number \| string` | -       | Padding for top and bottom. |
| `top`        | `number \| string` | -       | Padding for top.            |
| `bottom`     | `number \| string` | -       | Padding for bottom.         |
| `left`       | `number \| string` | -       | Padding for left.           |
| `right`      | `number \| string` | -       | Padding for right.          |

#### Slots

| Name      | Description       |
| :-------- | :---------------- |
| `default` | The child widget. |

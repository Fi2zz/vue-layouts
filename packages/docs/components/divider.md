# Divider & Spacer

`Divider` is a thin line that groups content in lists and layouts. `Spacer` creates an adjustable, empty spacer that can be used to tune the spacing between widgets in a Flex container, like Row or Column.

## Usage

<script setup>
import DividerSpacerDemo from '@example/demos/new_components/DividerSpacerDemo.vue'
</script>

<div class="demo-box">
  <DividerSpacerDemo />
</div>

<<< ../demos/new_components/DividerSpacerDemo.vue

## Divider API

### Props

| Name        | Type      | Default     | Description                                                                        |
| :---------- | :-------- | :---------- | :--------------------------------------------------------------------------------- |
| `height`    | `number`  | `16`        | Total height of the divider widget (including empty space) for horizontal divider. |
| `thickness` | `number`  | `1`         | Thickness of the line.                                                             |
| `indent`    | `number`  | `0`         | Empty space before the line.                                                       |
| `endIndent` | `number`  | `0`         | Empty space after the line.                                                        |
| `color`     | `string`  | `'#e0e0e0'` | Color of the line.                                                                 |
| `vertical`  | `boolean` | `false`     | If true, draws a vertical line (VerticalDivider).                                  |

## Spacer API

### Props

| Name   | Type     | Default | Description                            |
| :----- | :------- | :------ | :------------------------------------- |
| `flex` | `number` | `1`     | The flex factor to use for the spacer. |

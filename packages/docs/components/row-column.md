# Row & Column

Flex layouts for horizontal and vertical arrangement.

## Basic Usage

<script setup>
import RowColumn from '@example/demos/layout/RowColumn.vue'
import AlignCenter from '@example/demos/layout/AlignCenter.vue'
import Fixed from '@example/demos/layout/Fixed.vue'
import Wrap from '@example/demos/layout/Wrap.vue'
</script>

<div class="demo-box">
  <RowColumn />
</div>

<<< ../demos/layout/RowColumn.vue

## Alignment

Control main axis and cross axis alignment.

<div class="demo-box">
  <AlignCenter />
</div>

<<< ../demos/layout/AlignCenter.vue

## Fixed Size Children

<div class="demo-box">
  <Fixed />
</div>

<<< ../demos/layout/Fixed.vue

## Wrap

A widget that displays its children in multiple horizontal or vertical runs.

<div class="demo-box">
  <Wrap />
</div>

<<< ../demos/layout/Wrap.vue

## API

### Row

#### Props

| Name                 | Type                 | Default    | Description                                             |
| :------------------- | :------------------- | :--------- | :------------------------------------------------------ |
| `mainAxisAlignment`  | `MainAxisAlignment`  | `'start'`  | How the children should be placed along the main axis.  |
| `crossAxisAlignment` | `CrossAxisAlignment` | `'center'` | How the children should be placed along the cross axis. |
| `wrap`               | `boolean`            | `false`    | Whether the children should wrap.                       |
| `gap`                | `number \| string`   | -          | The gap between children.                               |
| `expanded`           | `boolean`            | `false`    | Whether to expand to fill the available space.          |

#### Slots

| Name      | Description           |
| :-------- | :-------------------- |
| `default` | The children widgets. |

### Column

#### Props

| Name                 | Type                 | Default    | Description                                             |
| :------------------- | :------------------- | :--------- | :------------------------------------------------------ |
| `mainAxisAlignment`  | `MainAxisAlignment`  | `'start'`  | How the children should be placed along the main axis.  |
| `crossAxisAlignment` | `CrossAxisAlignment` | `'center'` | How the children should be placed along the cross axis. |
| `wrap`               | `boolean`            | `false`    | Whether the children should wrap.                       |
| `gap`                | `number \| string`   | -          | The gap between children.                               |
| `expanded`           | `boolean`            | `false`    | Whether to expand to fill the available space.          |

#### Slots

| Name      | Description           |
| :-------- | :-------------------- |
| `default` | The children widgets. |

### Align

#### Props

| Name           | Type            | Default    | Description                                                                   |
| :------------- | :-------------- | :--------- | :---------------------------------------------------------------------------- |
| `alignment`    | `FlexAlignment` | `'center'` | How to align the child.                                                       |
| `widthFactor`  | `number`        | -          | If non-null, sets its width to the child's width multiplied by this factor.   |
| `heightFactor` | `number`        | -          | If non-null, sets its height to the child's height multiplied by this factor. |

#### Slots

| Name      | Description       |
| :-------- | :---------------- |
| `default` | The child widget. |

### Center

#### Props

| Name           | Type     | Default | Description                                                                   |
| :------------- | :------- | :------ | :---------------------------------------------------------------------------- |
| `widthFactor`  | `number` | -       | If non-null, sets its width to the child's width multiplied by this factor.   |
| `heightFactor` | `number` | -       | If non-null, sets its height to the child's height multiplied by this factor. |

#### Slots

| Name      | Description       |
| :-------- | :---------------- |
| `default` | The child widget. |

### Fixed

#### Props

| Name     | Type               | Default | Description                |
| :------- | :----------------- | :------ | :------------------------- |
| `top`    | `number \| string` | -       | Distance from the top.     |
| `bottom` | `number \| string` | -       | Distance from the bottom.  |
| `left`   | `number \| string` | -       | Distance from the left.    |
| `right`  | `number \| string` | -       | Distance from the right.   |
| `width`  | `number \| string` | -       | Width of the widget.       |
| `height` | `number \| string` | -       | Height of the widget.      |
| `zIndex` | `number \| string` | `100`   | The z-index of the widget. |

#### Slots

| Name      | Description       |
| :-------- | :---------------- |
| `default` | The child widget. |

### Wrap

#### Props

| Name                 | Type                                                                               | Default        | Description                                                                               |
| :------------------- | :--------------------------------------------------------------------------------- | :------------- | :---------------------------------------------------------------------------------------- |
| `direction`          | `'horizontal' \| 'vertical'`                                                       | `'horizontal'` | The direction to use as the main axis.                                                    |
| `alignment`          | `'start' \| 'end' \| 'center' \| 'spaceBetween' \| 'spaceAround' \| 'spaceEvenly'` | `'start'`      | How the children within a run should be placed in the main axis.                          |
| `spacing`            | `number \| string`                                                                 | `0`            | How much space to place between children in a run in the main axis.                       |
| `runAlignment`       | `'start' \| 'end' \| 'center' \| 'spaceBetween' \| 'spaceAround' \| 'spaceEvenly'` | `'start'`      | How the runs themselves should be placed in the cross axis.                               |
| `runSpacing`         | `number \| string`                                                                 | `0`            | How much space to place between the runs in the cross axis.                               |
| `crossAxisAlignment` | `'start' \| 'end' \| 'center'`                                                     | `'start'`      | How the children within a run should be aligned relative to each other in the cross axis. |
| `verticalDirection`  | `'down' \| 'up'`                                                                   | `'down'`       | The direction to use as the cross axis.                                                   |
| `clipBehavior`       | `'none' \| 'hardEdge' \| 'antiAlias'`                                              | `'none'`       | The content will be clipped (or not) according to this option.                            |

#### Slots

| Name      | Description           |
| :-------- | :-------------------- |
| `default` | The children widgets. |

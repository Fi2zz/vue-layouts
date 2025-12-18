# ListView, GridView & ScrollView

## ListView

A scrollable list of widgets arranged linearly.

<script setup>
import ListView from '@example/demos/scroll/ListView.vue'
import ListViewHorizontal from '@example/demos/scroll/ListViewHorizontal.vue'
import GridView from '@example/demos/scroll/GridView.vue'
import ScrollView from '@example/demos/scroll/ScrollView.vue'

import { setTransform } from 'fluekit'

setTransform(false)
</script>

###### Vertical ListView

<div class="demo-box">
  <ListView />
</div>

<<< ../demos/scroll/ListView.vue

###### Horizontal ListView

<div class="demo-box">

  <ListViewHorizontal />
</div>

<<< ../demos/scroll/ListViewHorizontal.vue

## GridView

A scrollable, 2D array of widgets.

<div class="demo-box">
  <GridView />
</div>

<<< ../demos/scroll/GridView.vue

## ScrollView

A box in which a single widget can be scrolled.

- ScrollView with Sticky Header

<div class="demo-box">
  <ScrollView />
</div>

<<< ../demos/scroll/ScrollView.vue

## API

### ListView

#### Props

| Name              | Type                                              | Default      | Description                                                                                                     |
| :---------------- | :------------------------------------------------ | :----------- | :-------------------------------------------------------------------------------------------------------------- |
| `scrollDirection` | `'vertical' \| 'horizontal'`                      | `'vertical'` | The direction to scroll.                                                                                        |
| `padding`         | `EdgeInsets`                                      | -            | The amount of space by which to inset the child.                                                                |
| `physics`         | `'bouncing' \| 'clamping' \| 'never' \| 'always'` | `'bouncing'` | How the scroll view should respond to user input.                                                               |
| `shrinkWrap`      | `boolean`                                         | `false`      | Whether the extent of the scroll view in the scrollDirection should be determined by the contents being viewed. |
| `itemCount`       | `number`                                          | -            | The number of items in the list.                                                                                |
| `itemExtent`      | `number \| string`                                | -            | If non-null, forces the children to have the given extent in the scroll direction.                              |
| `separator`       | `boolean`                                         | `false`      | Whether to show a separator between items.                                                                      |
| `clipBehavior`    | `'none' \| 'hardEdge' \| 'antiAlias'`             | `'hardEdge'` | The content will be clipped (or not) according to this option.                                                  |

#### Slots

| Name        | Description                                                                   |
| :---------- | :---------------------------------------------------------------------------- |
| `default`   | The content when itemCount is not provided.                                   |
| `item`      | The builder for items when itemCount is provided. Props: `{ index: number }`. |
| `separator` | The builder for separators. Props: `{ index: number }`.                       |

### GridView

#### Props

| Name               | Type                                              | Default      | Description                                                                                                     |
| :----------------- | :------------------------------------------------ | :----------- | :-------------------------------------------------------------------------------------------------------------- |
| `scrollDirection`  | `'vertical' \| 'horizontal'`                      | `'vertical'` | The direction to scroll.                                                                                        |
| `padding`          | `EdgeInsets`                                      | -            | The amount of space by which to inset the child.                                                                |
| `physics`          | `'bouncing' \| 'clamping' \| 'never' \| 'always'` | `'bouncing'` | How the scroll view should respond to user input.                                                               |
| `shrinkWrap`       | `boolean`                                         | `false`      | Whether the extent of the scroll view in the scrollDirection should be determined by the contents being viewed. |
| `clipBehavior`     | `'none' \| 'hardEdge' \| 'antiAlias'`             | `'hardEdge'` | The content will be clipped (or not) according to this option.                                                  |
| `crossAxisCount`   | `number`                                          | `2`          | The number of children in the cross axis.                                                                       |
| `mainAxisSpacing`  | `number \| string`                                | `0`          | The number of logical pixels between each child along the main axis.                                            |
| `crossAxisSpacing` | `number \| string`                                | `0`          | The number of logical pixels between each child along the cross axis.                                           |
| `childAspectRatio` | `number`                                          | `1.0`        | The ratio of the cross-axis to the main-axis extent of each child.                                              |
| `itemCount`        | `number`                                          | -            | The number of items in the grid.                                                                                |

#### Slots

| Name      | Description                                                                   |
| :-------- | :---------------------------------------------------------------------------- |
| `default` | The content when itemCount is not provided.                                   |
| `item`    | The builder for items when itemCount is provided. Props: `{ index: number }`. |

### ScrollView

#### Props

| Name              | Type                                              | Default      | Description                                                    |
| :---------------- | :------------------------------------------------ | :----------- | :------------------------------------------------------------- |
| `scrollDirection` | `'vertical' \| 'horizontal'`                      | `'vertical'` | The direction to scroll.                                       |
| `padding`         | `EdgeInsets`                                      | -            | The amount of space by which to inset the child.               |
| `physics`         | `'bouncing' \| 'clamping' \| 'never' \| 'always'` | `'bouncing'` | How the scroll view should respond to user input.              |
| `clipBehavior`    | `'none' \| 'hardEdge' \| 'antiAlias'`             | `'hardEdge'` | The content will be clipped (or not) according to this option. |
| `reverse`         | `boolean`                                         | `false`      | Whether the scroll view scrolls in the reading direction.      |

#### Slots

| Name      | Description       |
| :-------- | :---------------- |
| `default` | The child widget. |

#### Events

| Name          | Description                                                                              |
| :------------ | :--------------------------------------------------------------------------------------- |
| `scroll`      | Emitted when scrolling. Payload: `{ scrollTop, scrollLeft, scrollHeight, scrollWidth }`. |
| `scrollStart` | Emitted when scrolling starts.                                                           |
| `scrollEnd`   | Emitted when scrolling ends.                                                             |

#### Exposes

| Name        | Description                                |
| :---------- | :----------------------------------------- |
| `scrollTo`  | Function to scroll to a specific position. |
| `scrollRef` | The ref of the scroll container.           |

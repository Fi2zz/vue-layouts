# ListTile

A single fixed-height row that typically contains some text as well as a leading or trailing icon.

## Usage

<script setup>
import ListTileDemo from '@example/demos/new_components/ListTileDemo.vue'
</script>

<div class="demo-box">
  <ListTileDemo />
</div>

<<< ../demos/new_components/ListTileDemo.vue

## API

### Props

| Name             | Type         | Default                      | Description                                                                        |
| :--------------- | :----------- | :--------------------------- | :--------------------------------------------------------------------------------- |
| `leading`        | `any`        | -                            | A widget to display before the title.                                              |
| `title`          | `string`     | -                            | The primary content of the list tile.                                              |
| `subtitle`       | `string`     | -                            | Additional content displayed below the title.                                      |
| `trailing`       | `any`        | -                            | A widget to display after the title.                                               |
| `enabled`        | `boolean`    | `true`                       | Whether this list tile is interactive.                                             |
| `selected`       | `boolean`    | `false`                      | If this tile is also enabled then icons and text are rendered with the same color. |
| `tileColor`      | `string`     | -                            | Defines the background color of ListTile when selected is false.                   |
| `selectedColor`  | `string`     | `'rgba(33, 150, 243, 0.12)'` | The color to use for the tile's background when the tile is selected.              |
| `iconColor`      | `string`     | -                            | The default color for the leading and trailing icons.                              |
| `textColor`      | `string`     | -                            | The color for the title and subtitle.                                              |
| `contentPadding` | `EdgeInsets` | -                            | The internal padding for the tile's content.                                       |
| `dense`          | `boolean`    | `false`                      | Whether this list tile is part of a vertically dense list.                         |

### Events

| Name         | Description                              |
| :----------- | :--------------------------------------- |
| `tap`        | Triggered when the tile is tapped.       |
| `long-press` | Triggered when the tile is long-pressed. |

### Slots

| Name       | Description               |
| :--------- | :------------------------ |
| `leading`  | Slot for leading widget.  |
| `title`    | Slot for title widget.    |
| `subtitle` | Slot for subtitle widget. |
| `trailing` | Slot for trailing widget. |

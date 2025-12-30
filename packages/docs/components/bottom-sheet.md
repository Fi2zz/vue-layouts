# BottomSheet

A material design bottom sheet.

## Usage

<script setup>
import BottomSheetDemo from '@example/demos/new_components/BottomSheetDemo.vue'
</script>

<div class="demo-box">
  <BottomSheetDemo />
</div>

<<< ../demos/new_components/BottomSheetDemo.vue

## API

### Props

| Name                 | Type           | Default   | Description                                                           |
| :------------------- | :------------- | :-------- | :-------------------------------------------------------------------- |
| `visible`            | `boolean`      | `false`   | Whether the bottom sheet is visible.                                  |
| `barrierDismissible` | `boolean`      | `true`    | Whether the bottom sheet can be dismissed by tapping outside.         |
| `backgroundColor`    | `string`       | `'white'` | The background color of the bottom sheet.                             |
| `elevation`          | `number`       | `8`       | The z-coordinate at which to place this sheet relative to its parent. |
| `shape`              | `BorderRadius` | -         | The shape of the bottom sheet.                                        |
| `padding`            | `EdgeInsets`   | -         | The padding of the bottom sheet content.                              |

### Events

| Name             | Description                              |
| :--------------- | :--------------------------------------- |
| `update:visible` | Emitted when the visibility changes.     |
| `close`          | Emitted when the bottom sheet is closed. |

### Slots

| Name      | Description                      |
| :-------- | :------------------------------- |
| `default` | The content of the bottom sheet. |

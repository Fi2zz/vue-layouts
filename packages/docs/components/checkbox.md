# Checkbox

A material design checkbox.

## Usage

<script setup>
import CheckboxDemo from '@example/demos/new_components/CheckboxDemo.vue'
</script>

<div class="demo-box">
  <CheckboxDemo />
</div>

<<< ../demos/new_components/CheckboxDemo.vue

## API

### Props

| Name          | Type      | Default     | Description                                                        |
| :------------ | :-------- | :---------- | :----------------------------------------------------------------- |
| `value`       | `boolean` | -           | Whether this checkbox is checked.                                  |
| `activeColor` | `string`  | `'#2196F3'` | The color to use when this checkbox is checked.                    |
| `checkColor`  | `string`  | `'#FFFFFF'` | The color to use for the check icon when this checkbox is checked. |

### Events

| Name           | Description                                           |
| :------------- | :---------------------------------------------------- |
| `update:value` | Emitted when the value changes.                       |
| `change`       | Emitted when the value of the checkbox should change. |

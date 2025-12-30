# Radio

A material design radio button.

## Usage

<script setup>
import RadioDemo from '@example/demos/new_components/RadioDemo.vue'
</script>

<div class="demo-box">
  <RadioDemo />
</div>

<<< ../demos/new_components/RadioDemo.vue

## API

### Props

| Name          | Type     | Default | Description                                                |
| :------------ | :------- | :------ | :--------------------------------------------------------- |
| `value`       | `any`    | -       | The value represented by this radio button.                |
| `groupValue`  | `any`    | -       | The currently selected value for a group of radio buttons. |
| `activeColor` | `string` | -       | The color to use when this radio button is selected.       |

### Events

| Name                | Description                                      |
| :------------------ | :----------------------------------------------- |
| `update:groupValue` | Emitted when the user selects this radio button. |
| `change`            | Emitted when the user selects this radio button. |

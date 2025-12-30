# Switch

A material design switch.

## Usage

<script setup>
import SwitchDemo from '@example/demos/new_components/SwitchDemo.vue'
</script>

<div class="demo-box">
  <SwitchDemo />
</div>

<<< ../demos/new_components/SwitchDemo.vue

## API

### Props

| Name                 | Type      | Default     | Description                                            |
| :------------------- | :-------- | :---------- | :----------------------------------------------------- |
| `value`              | `boolean` | -           | Whether this switch is on or off.                      |
| `activeColor`        | `string`  | `'#2196F3'` | The color to use when this switch is on.               |
| `activeTrackColor`   | `string`  | `'#BBDEFB'` | The color to use on the track when this switch is on.  |
| `inactiveThumbColor` | `string`  | `'#FAFAFA'` | The color to use on the thumb when this switch is off. |
| `inactiveTrackColor` | `string`  | `'#9E9E9E'` | The color to use on the track when this switch is off. |

### Events

| Name           | Description                               |
| :------------- | :---------------------------------------- |
| `update:value` | Emitted when the value changes.           |
| `change`       | Emitted when the user toggles the switch. |

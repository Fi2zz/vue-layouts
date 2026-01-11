# Switch

A switch component that toggles between two states. It supports both iOS (default) and Material Design styles.

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

| Name                 | Type                  | Default                           | Description                                            |
| :------------------- | :-------------------- | :-------------------------------- | :----------------------------------------------------- |
| `value`              | `boolean`             | -                                 | Whether this switch is on or off.                      |
| `variant`            | `'material' \| 'ios'` | `'ios'`                           | The style variant of the switch.                       |
| `activeColor`        | `string`              | `#34C759` (iOS) / `#2196F3` (Mat) | The color to use when this switch is on.               |
| `activeTrackColor`   | `string`              | -                                 | The color to use on the track when this switch is on.  |
| `inactiveThumbColor` | `string`              | -                                 | The color to use on the thumb when this switch is off. |
| `inactiveTrackColor` | `string`              | -                                 | The color to use on the track when this switch is off. |

### Events

| Name           | Description                               |
| :------------- | :---------------------------------------- |
| `update:value` | Emitted when the value changes.           |
| `change`       | Emitted when the user toggles the switch. |

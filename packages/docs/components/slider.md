# Slider

A material design slider.

## Usage

<script setup>
import SliderDemo from '@example/demos/new_components/SliderDemo.vue'
</script>

<div class="demo-box">
  <SliderDemo />
</div>

<<< ../demos/new_components/SliderDemo.vue

## API

### Props

| Name            | Type     | Default     | Description                                                          |
| :-------------- | :------- | :---------- | :------------------------------------------------------------------- |
| `value`         | `number` | -           | The currently selected value for this slider.                        |
| `min`           | `number` | `0`         | The minimum value the user can select.                               |
| `max`           | `number` | `100`       | The maximum value the user can select.                               |
| `activeColor`   | `string` | `'#2196F3'` | The color to use for the portion of the slider track that is active. |
| `inactiveColor` | `string` | `'#BBDEFB'` | The color for the inactive portion of the slider track.              |
| `thumbColor`    | `string` | `'#2196F3'` | The color to use for the thumb.                                      |

### Events

| Name           | Description                                                   |
| :------------- | :------------------------------------------------------------ |
| `update:value` | Emitted when the value changes.                               |
| `change`       | Emitted during a drag when the user is selecting a new value. |

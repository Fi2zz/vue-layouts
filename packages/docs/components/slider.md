# Slider

A material design slider (supports iOS style).

## Usage

<script setup>
import SliderDemo from '@example/demos/new_components/SliderDemo.vue'
import RangeSliderDemo from '@example/demos/new_components/RangeSliderDemo.vue'
import SliderNegativeDemo from '@example/demos/new_components/SliderNegativeDemo.vue'
</script>

<div class="demo-box">
  <SliderDemo />
</div>

<<< ../demos/new_components/SliderDemo.vue

# RangeSlider

A material design range slider (supports iOS style).

## Usage

<div class="demo-box">
  <RangeSliderDemo />
</div>

<<< ../demos/new_components/RangeSliderDemo.vue

## Negative Values

Both Slider and RangeSlider support negative values.

<div class="demo-box">
  <SliderNegativeDemo />
</div>

<<< ../demos/new_components/SliderNegativeDemo.vue

## API (Slider)

### Props

| Name            | Type                  | Default     | Description                                                          |
| :-------------- | :-------------------- | :---------- | :------------------------------------------------------------------- |
| `value`         | `number`              | -           | The currently selected value for this slider.                        |
| `min`           | `number`              | `0`         | The minimum value the user can select.                               |
| `max`           | `number`              | `100`       | The maximum value the user can select.                               |
| `variant`       | `'material' \| 'ios'` | `'ios'`     | The visual style of the slider.                                      |
| `activeColor`   | `string`              | `'#007AFF'` | The color to use for the portion of the slider track that is active. |
| `inactiveColor` | `string`              | `'#E5E5EA'` | The color for the inactive portion of the slider track.              |
| `thumbColor`    | `string`              | `'#FFFFFF'` | The color to use for the thumb.                                      |

### Events

| Name           | Description                                                   |
| :------------- | :------------------------------------------------------------ |
| `update:value` | Emitted when the value changes.                               |
| `change`       | Emitted during a drag when the user is selecting a new value. |

### Props (RangeSlider)

| Name            | Type                             | Default     | Description                                                          |
| :-------------- | :------------------------------- | :---------- | :------------------------------------------------------------------- |
| `value`         | `{ start: number, end: number }` | -           | The currently selected range values.                                 |
| `min`           | `number`                         | `0`         | The minimum value the user can select.                               |
| `max`           | `number`                         | `100`       | The maximum value the user can select.                               |
| `variant`       | `'material' \| 'ios'`            | `'ios'`     | The visual style of the slider.                                      |
| `activeColor`   | `string`                         | `'#007AFF'` | The color to use for the portion of the slider track that is active. |
| `inactiveColor` | `string`                         | `'#E5E5EA'` | The color for the inactive portion of the slider track.              |
| `thumbColor`    | `string`                         | `'#FFFFFF'` | The color to use for the thumb.                                      |

### Events (RangeSlider)

| Name           | Description                                                   |
| :------------- | :------------------------------------------------------------ |
| `update:value` | Emitted when the range value changes.                         |
| `change`       | Emitted during a drag when the user is selecting a new range. |

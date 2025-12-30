# InkWell

A rectangular area of a Material that responds to touch.

## Usage

<script setup>
import InkWellDemo from '@example/demos/new_components/InkWellDemo.vue'
</script>

<div class="demo-box">
  <InkWellDemo />
</div>

<<< ../demos/new_components/InkWellDemo.vue

## API

### Props

| Name             | Type       | Default                | Description                                            |
| :--------------- | :--------- | :--------------------- | :----------------------------------------------------- |
| `onTap`          | `Function` | -                      | Called when the user taps this part of the material.   |
| `splashColor`    | `string`   | `'rgba(0, 0, 0, 0.1)'` | The splash color of the ink response.                  |
| `highlightColor` | `string`   | -                      | The highlight color of the ink response when pressed.  |
| `borderRadius`   | `string`   | -                      | The clipping radius of the splash (CSS border-radius). |

### Events

| Name  | Description                            |
| :---- | :------------------------------------- |
| `tap` | Triggered when the ink well is tapped. |

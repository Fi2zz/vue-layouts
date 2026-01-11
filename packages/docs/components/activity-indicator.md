# CupertinoActivityIndicator

An iOS-style activity indicator that spins clockwise.

## Usage

<script setup>
import CupertinoActivityIndicatorDemo from '@example/demos/new_components/CupertinoActivityIndicatorDemo.vue'
</script>

<div class="demo-box">
  <CupertinoActivityIndicatorDemo />
</div>

<<< ../demos/new_components/CupertinoActivityIndicatorDemo.vue

## API

### Props

| Name        | Type      | Default     | Description                                         |
| :---------- | :-------- | :---------- | :-------------------------------------------------- |
| `animating` | `boolean` | `true`      | Whether the indicator should animate.               |
| `color`     | `string`  | `'#999999'` | The color of the tick marks.                        |
| `radius`    | `number`  | `10`        | The radius of the spinner. Total size is 2x radius. |

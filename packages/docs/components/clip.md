# Clip

`ClipRRect` creates a rounded-rectangular clip. `ClipOval` creates an oval clip.

## Usage

<script setup>
import ClipDemo from '@example/demos/new_components/ClipDemo.vue'
</script>

<div class="demo-box">
  <ClipDemo />
</div>

<<< ../demos/new_components/ClipDemo.vue

## ClipRRect API

### Props

| Name           | Type           | Default       | Description                                                                                       |
| :------------- | :------------- | :------------ | :------------------------------------------------------------------------------------------------ |
| `borderRadius` | `BorderRadius` | -             | The border radius of the rounded rectangle.                                                       |
| `clipBehavior` | `string`       | `'antiAlias'` | Controls how to clip. Options: `'none'`, `'hardEdge'`, `'antiAlias'`, `'antiAliasWithSaveLayer'`. |

## ClipOval API

### Props

| Name           | Type     | Default       | Description                                                                                       |
| :------------- | :------- | :------------ | :------------------------------------------------------------------------------------------------ |
| `clipBehavior` | `string` | `'antiAlias'` | Controls how to clip. Options: `'none'`, `'hardEdge'`, `'antiAlias'`, `'antiAliasWithSaveLayer'`. |

# SnackBar

A lightweight message with an optional action which briefly displays at the bottom of the screen.

## Usage

<script setup>
import SnackBarDemo from '@example/demos/new_components/SnackBarDemo.vue'
</script>

<div class="demo-box">
  <SnackBarDemo />
</div>

<<< ../demos/new_components/SnackBarDemo.vue

## API

### Props

| Name          | Type       | Default | Description                                                     |
| :------------ | :--------- | :------ | :-------------------------------------------------------------- |
| `content`     | `string`   | -       | The content of the SnackBar.                                    |
| `actionLabel` | `string`   | -       | The label for the optional action button.                       |
| `duration`    | `number`   | `4000`  | The duration in milliseconds for which the SnackBar is visible. |
| `onAction`    | `Function` | -       | Called when the action button is pressed.                       |
| `onClose`     | `Function` | -       | Called when the SnackBar is closed.                             |

# AlertDialog

Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.

## Usage

<script setup>
import AlertDialogDemo from '@example/demos/new_components/AlertDialogDemo.vue'
</script>

<div class="demo-box">
  <AlertDialogDemo />
</div>

<<< ../demos/new_components/AlertDialogDemo.vue

## API

### Props

| Name                 | Type      | Default | Description                                             |
| :------------------- | :-------- | :------ | :------------------------------------------------------ |
| `visible`            | `boolean` | `false` | Whether the dialog is visible.                          |
| `title`              | `string`  | -       | The title of the dialog.                                |
| `content`            | `string`  | -       | The content of the dialog.                              |
| `barrierDismissible` | `boolean` | `true`  | Whether the dialog can be dismissed by tapping outside. |

### Events

| Name             | Description                          |
| :--------------- | :----------------------------------- |
| `update:visible` | Emitted when the visibility changes. |
| `close`          | Emitted when the dialog is closed.   |

### Slots

| Name      | Description                                           |
| :-------- | :---------------------------------------------------- |
| `default` | The content of the dialog (overrides `content` prop). |
| `actions` | The actions at the bottom of the dialog.              |

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

| Name                 | Type                | Default                 | Description                                                    |
| :------------------- | :------------------ | :---------------------- | :------------------------------------------------------------- |
| `visible`            | `boolean`           | `false`                 | Whether the dialog is visible.                                 |
| `title`              | `string`            | -                       | The title of the dialog.                                       |
| `content`            | `string`            | -                       | The content of the dialog.                                     |
| `barrierDismissible` | `boolean`           | `true`                  | Whether the dialog can be dismissed by tapping outside.        |
| `alignment`          | `Alignment`         | `Alignment.center`      | The alignment of the dialog within the screen.                 |
| `barrierColor`       | `string`            | `'rgba(0,0,0,0.54)'`    | The background color of the barrier overlay.                   |
| `constraints`        | `BoxConstraints`    | -                       | Custom constraints for the dialog box.                         |
| `decoration`         | `BoxDecoration`     | -                       | Custom decoration (background, border, shadow) for the dialog. |
| `size`               | `Size`              | -                       | Explicit size for the dialog.                                  |
| `actionsAlignment`   | `MainAxisAlignment` | `MainAxisAlignment.end` | Alignment of the action buttons.                               |
| `titleAlignment`     | `Alignment`         | -                       | Alignment of the title.                                        |
| `padding`            | `EdgeInsets`        | -                       | Padding inside the dialog content area.                        |
| `titleStyle`         | `TextStyle`         | -                       | Custom text style for the title.                               |
| `titleColor`         | `string`            | -                       | Color of the title text (overridden by `titleStyle`).          |
| `titleFontSize`      | `number`            | `20`                    | Font size of the title text (overridden by `titleStyle`).      |

### Events

| Name             | Description                                     |
| :--------------- | :---------------------------------------------- |
| `update:visible` | Emitted when the visibility changes.            |
| `close`          | Emitted when the dialog is closed or cancelled. |
| `ok`             | Emitted when the default OK button is clicked.  |

### Slots

| Name      | Description                                           |
| :-------- | :---------------------------------------------------- |
| `default` | The content of the dialog (overrides `content` prop). |
| `actions` | The actions at the bottom of the dialog.              |

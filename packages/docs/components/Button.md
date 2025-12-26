# Button

A Flutter-style button widget that separates behavior from appearance.

By default, `Button` is an unstyled transparent container (similar to a `GestureDetector` wrapping content). You define its appearance using the `style` prop with a `ButtonStyle` object.

## Basic Usage

The simplest usage involves handling the click event.

<script setup>
import BasicButton from '@example/demos/button/BasicButton.vue'
import StyledButton from '@example/demos/button/StyledButton.vue'
</script>

<div class="demo-box">
  <BasicButton />
</div>

<<< ../demos/button/BasicButton.vue

## Custom Styling

Use the `ButtonStyle` object to define various visual properties like background color, border, border radius, and shadow.

<div class="demo-box">
  <StyledButton />
</div>

<<< ../demos/button/StyledButton.vue

## API

### Props

| Name       | Type          | Default | Description                                                              |
| :--------- | :------------ | :------ | :----------------------------------------------------------------------- |
| `disabled` | `boolean`     | `false` | Whether the button is disabled. When disabled, events are not triggered. |
| `style`    | `ButtonStyle` | -       | The style configuration object for the button.                           |

### Events

| Name         | Description                                | Parameters |
| :----------- | :----------------------------------------- | :--------- |
| `pressed`    | Triggered when the button is clicked.      | -          |
| `long-press` | Triggered when the button is long-pressed. | -          |

### ButtonStyle

Object used to configure the button's appearance.

| Property          | Type           | Description                                      |
| :---------------- | :------------- | :----------------------------------------------- |
| `backgroundColor` | `string`       | Background color.                                |
| `foregroundColor` | `string`       | Foreground color (text/icon color).              |
| `padding`         | `EdgeInsets`   | Padding inside the button.                       |
| `side`            | `BorderSide`   | Border style.                                    |
| `shape`           | `BorderRadius` | Shape of the button (currently supports radius). |
| `elevation`       | `number`       | Height of the shadow.                            |
| `shadowColor`     | `string`       | Color of the shadow.                             |
| `minimumSize`     | `Size`         | Minimum size constraints.                        |
| `maximumSize`     | `Size`         | Maximum size constraints.                        |
| `fixedSize`       | `Size`         | Fixed size constraints.                          |
| `alignment`       | `Alignment`    | Alignment of the content.                        |

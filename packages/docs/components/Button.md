# Button

A Flutter-style button widget that separates behavior from appearance.

By default, `Button` is an unstyled transparent container (similar to a `GestureDetector` wrapping content). You can define its appearance using the `style` prop with a `ButtonStyle` object, or use the `variant` prop for predefined styles.

## iOS Button (Cupertino)

Use `variant="ios"` to create an iOS-style button with default padding, rounded corners, and opacity feedback on press.

<script setup>
import CupertinoButtonDemo from '@example/demos/new_components/CupertinoButtonDemo.vue'
import StyledButtonDemo from '@example/demos/button/StyledButton.vue'
import BasicButtonDemo from '@example/demos/button/BasicButton.vue'
</script>

<div class="demo-box">
  <CupertinoButtonDemo />
</div>

<<< ../demos/new_components/CupertinoButtonDemo.vue

### Props (iOS Variant)

When `variant="ios"` is set, the following props are available to customize the button:

| Name             | Type           | Default           | Description                         |
| :--------------- | :------------- | :---------------- | :---------------------------------- |
| `color`          | `string`       | `transparent`     | The background color of the button. |
| `disabledColor`  | `string`       | `rgba(0,0,0,0.2)` | The color when disabled.            |
| `padding`        | `EdgeInsets`   | `(14, 16)`        | Padding inside the button.          |
| `borderRadius`   | `BorderRadius` | `8`               | Border radius of the button.        |
| `pressedOpacity` | `number`       | `0.4`             | Opacity when the button is pressed. |

## Styled Button (Material-like)

You can create various button styles (like TextButton, ElevatedButton, OutlinedButton) by passing a `ButtonStyle` object to the `style` prop.

<div class="demo-box">
  <StyledButtonDemo />
</div>

<<< ../demos/button/StyledButton.vue

## Raw Button (Default)

If no `variant` or `style` is provided, `Button` acts as a raw container that detects gestures. This is useful for creating completely custom interactive elements.

<div class="demo-box">
  <BasicButtonDemo />
</div>

<<< ../demos/button/BasicButton.vue

## API

### Props

| Name       | Type             | Default    | Description                                                              |
| :--------- | :--------------- | :--------- | :----------------------------------------------------------------------- |
| `disabled` | `boolean`        | `false`    | Whether the button is disabled. When disabled, events are not triggered. |
| `behavior` | `Behavior`       | `'opaque'` | How this gesture detector should behave during hit testing.              |
| `variant`  | `'raw' \| 'ios'` | `'raw'`    | The style variant of the button.                                         |
| `style`    | `ButtonStyle`    | -          | The style configuration object for the button.                           |

### Events

| Name         | Description                                     | Parameters |
| :----------- | :---------------------------------------------- | :--------- |
| `pressed`    | Triggered when the button is tapped/clicked.    | -          |
| `long-press` | Triggered when the button is long-pressed.      | -          |
| `tap-down`   | Triggered when the pointer touches the button.  | `event`    |
| `tap-up`     | Triggered when the pointer is released.         | `event`    |
| `tap-cancel` | Triggered when the pointer cancels the gesture. | `event`    |

### ButtonStyle

Object used to configure the button's appearance.

| Property          | Type           | Description                                      |
| :---------------- | :------------- | :----------------------------------------------- |
| `backgroundColor` | `string`       | Background color.                                |
| `foregroundColor` | `string`       | Foreground color (text/icon color).              |
| `textStyle`       | `TextStyle`    | Style to apply to text content.                  |
| `padding`         | `EdgeInsets`   | Padding inside the button.                       |
| `side`            | `BorderSide`   | Border style.                                    |
| `shape`           | `BorderRadius` | Shape of the button (currently supports radius). |
| `elevation`       | `number`       | Height of the shadow.                            |
| `shadowColor`     | `string`       | Color of the shadow.                             |
| `minimumSize`     | `Size`         | Minimum size constraints.                        |
| `maximumSize`     | `Size`         | Maximum size constraints.                        |
| `fixedSize`       | `Size`         | Fixed size constraints.                          |
| `alignment`       | `Alignment`    | Alignment of the content.                        |

# Text

A run of text with a single style.

## Styles

Apply various styles like color, font size, weight, and decoration.

<script setup>
import Styles from '@example/demos/text/Styles.vue'
import Overflow from '@example/demos/text/Overflow.vue'
</script>

<div class="demo-box">
  <Styles />
</div>

<<< ../demos/text/Styles.vue

## Overflow

Handle text overflow with ellipsis or clip.

<div class="demo-box">
  <Overflow />
</div>

<<< ../demos/text/Overflow.vue

## API

### Text

#### Props

| Name             | Type                                                             | Default  | Description                                                                      |
| :--------------- | :--------------------------------------------------------------- | :------- | :------------------------------------------------------------------------------- |
| `data`           | `string \| number`                                               | -        | The text to display.                                                             |
| `style`          | `TextStyle`                                                      | -        | The style to use for this text.                                                  |
| `textAlign`      | `'left' \| 'right' \| 'center' \| 'justify' \| 'start' \| 'end'` | -        | How the text should be aligned horizontally.                                     |
| `textDirection`  | `'rtl' \| 'ltr'`                                                 | -        | The directionality of the text.                                                  |
| `softWrap`       | `boolean`                                                        | `true`   | Whether the text should break at soft line breaks.                               |
| `overflow`       | `'clip' \| 'fade' \| 'ellipsis' \| 'visible'`                    | -        | How visual overflow should be handled.                                           |
| `maxLines`       | `number`                                                         | -        | An optional maximum number of lines for the text to span, wrapping if necessary. |
| `semanticsLabel` | `string`                                                         | -        | An alternative semantics label for this text.                                    |
| `tag`            | `string`                                                         | `'span'` | The HTML tag to use for rendering.                                               |

#### Events

| Name         | Description                               |
| :----------- | :---------------------------------------- |
| `click`      | Triggered when the text is clicked.       |
| `tap`        | Triggered when the text is tapped.        |
| `double-tap` | Triggered when the text is double tapped. |
| `long-press` | Triggered when the text is long pressed.  |
| `pan-start`  | Triggered when a pan gesture starts.      |
| `pan-update` | Triggered when a pan gesture updates.     |
| `pan-end`    | Triggered when a pan gesture ends.        |

#### Slots

| Name      | Description                                           |
| :-------- | :---------------------------------------------------- |
| `default` | The content of the text (alternative to `data` prop). |

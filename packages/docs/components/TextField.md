# TextField & TextArea

Material Design text fields that allow users to enter text.

<script setup>
import BasicTextField from '@example/demos/textfield/BasicTextField.vue'
import TextAreaDemo from '@example/demos/textfield/TextAreaDemo.vue'
import Borders from '@example/demos/textfield/Borders.vue'
import PrefixSuffix from '@example/demos/textfield/PrefixSuffix.vue'
import Filled from '@example/demos/textfield/Filled.vue'
import States from '@example/demos/textfield/States.vue'
</script>

## Basic Usage

<div class="demo-box">
  <BasicTextField />
</div>

<<< ../demos/textfield/BasicTextField.vue

## TextArea (Multi-line)

You can use the `TextArea` component for multi-line input, or `TextField` with `maxLines` > 1.

<div class="demo-box">
  <TextAreaDemo />
</div>

<<< ../demos/textfield/TextAreaDemo.vue

## Borders

<div class="demo-box">
  <Borders />
</div>

<<< ../demos/textfield/Borders.vue

## Prefix & Suffix

<div class="demo-box">
  <PrefixSuffix />
</div>

<<< ../demos/textfield/PrefixSuffix.vue

## Filled

<div class="demo-box">
  <Filled />
</div>

<<< ../demos/textfield/Filled.vue

## States

Read-only、Disabled 与 Error 文本表现。

<div class="demo-box">
  <States />
</div>

<<< ../demos/textfield/States.vue

## API

### TextField

| Prop        | Type              | Default | Description                                                                             |
| ----------- | ----------------- | ------- | --------------------------------------------------------------------------------------- |
| modelValue  | `string`          | -       | The current text value.                                                                 |
| decoration  | `InputDecoration` | -       | The decoration to show around the text field.                                           |
| maxLines    | `number \| null`  | `1`     | The maximum number of lines to show at one time. If > 1 or null, it becomes a textarea. |
| obscureText | `boolean`         | `false` | Whether to hide the text being edited (e.g., for passwords).                            |
| enabled     | `boolean`         | `true`  | Whether the text field is enabled.                                                      |
| readOnly    | `boolean`         | `false` | Whether the text can be changed.                                                        |
| style       | `TextStyle`       | -       | The style to use for the text being edited.                                             |

### TextArea

Wrapper around TextField with default `maxLines` and `keyboardType`.

| Prop     | Type     | Default | Description    |
| -------- | -------- | ------- | -------------- |
| maxLines | `number` | `4`     | Default lines. |

### InputDecoration

| Prop       | Type          | Description                                                   |
| ---------- | ------------- | ------------------------------------------------------------- |
| labelText  | `string`      | Text that describes the input field.                          |
| hintText   | `string`      | Text that suggests what sort of input the field accepts.      |
| errorText  | `string`      | Text that appears below the field when the input is invalid.  |
| prefixText | `string`      | Text to place before the input.                               |
| suffixText | `string`      | Text to place after the input.                                |
| border     | `InputBorder` | The border to draw around the field.                          |
| filled     | `boolean`     | If true, the decoration's container is filled with fillColor. |
| fillColor  | `string`      | The color to fill the decoration's container with.            |

### Helper Functions

- `OutlineInputBorder({ borderSide?, borderRadius? })`
- `UnderlineInputBorder({ borderSide?, borderRadius? })`

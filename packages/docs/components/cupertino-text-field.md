# CupertinoTextField

iOS 风格的文本输入框组件，遵循 Apple Human Interface Guidelines 设计规范。

<script setup>
import Basic from '@example/demos/cupertino-text-field/Basic.vue'
import BorderStyles from '@example/demos/cupertino-text-field/BorderStyles.vue'
import ClearButton from '@example/demos/cupertino-text-field/ClearButton.vue'
import Password from '@example/demos/cupertino-text-field/Password.vue'
import PrefixSuffix from '@example/demos/cupertino-text-field/PrefixSuffix.vue'
import Multiline from '@example/demos/cupertino-text-field/Multiline.vue'
import Disabled from '@example/demos/cupertino-text-field/Disabled.vue'
</script>

## 基础用法

最基础的文本输入框，带有占位符提示。

<div class="demo-box">
  <Basic />
</div>

<<< ../demos/cupertino-text-field/Basic.vue

## 边框样式

支持三种边框样式：`roundedRect`（圆角矩形，默认）、`line`（底部线条）、`none`（无边框）。

<div class="demo-box">
  <BorderStyles />
</div>

<<< ../demos/cupertino-text-field/BorderStyles.vue

## 清除按钮

通过 `clearButtonMode` 属性控制清除按钮的显示时机。

- `never`：从不显示（默认）
- `whileEditing`：编辑时显示
- `unlessEditing`：非编辑状态时显示
- `always`：始终显示

<div class="demo-box">
  <ClearButton />
</div>

<<< ../demos/cupertino-text-field/ClearButton.vue

## 密码输入

设置 `obscureText` 为 `true` 即可启用密码模式，输入内容会被隐藏。

<div class="demo-box">
  <Password />
</div>

<<< ../demos/cupertino-text-field/Password.vue

## 前缀与后缀

可以在输入框前后添加文本或自定义内容。

<div class="demo-box">
  <PrefixSuffix />
</div>

<<< ../demos/cupertino-text-field/PrefixSuffix.vue

## 多行输入

设置 `maxLines` 为 `null` 或大于 1 的数值，即可启用多行文本输入。

<div class="demo-box">
  <Multiline />
</div>

<<< ../demos/cupertino-text-field/Multiline.vue

## 禁用状态

禁用状态下的输入框会显示为灰色背景，且无法交互。

<div class="demo-box">
  <Disabled />
</div>

<<< ../demos/cupertino-text-field/Disabled.vue

## API

### Props

| 属性               | 类型                                                             | 默认值                             | 说明                        |
| ------------------ | ---------------------------------------------------------------- | ---------------------------------- | --------------------------- |
| modelValue         | `string \| number`                                               | -                                  | 输入框的值                  |
| placeholder        | `string`                                                         | -                                  | 占位符文本                  |
| prefix             | `string`                                                         | -                                  | 前缀文本                    |
| suffix             | `string`                                                         | -                                  | 后缀文本                    |
| clearButtonMode    | `'never' \| 'whileEditing' \| 'unlessEditing' \| 'always'`       | `'never'`                          | 清除按钮显示模式            |
| borderStyle        | `'roundedRect' \| 'line' \| 'none'`                              | `'roundedRect'`                    | 边框样式                    |
| backgroundColor    | `string \| Color`                                                | `CupertinoColors.systemBackground` | 背景颜色                    |
| disabledColor      | `string \| Color`                                                | `CupertinoColors.systemGrey6`      | 禁用状态背景颜色            |
| cursorColor        | `string \| Color`                                                | `CupertinoColors.activeBlue`       | 光标颜色                    |
| width              | `number \| string`                                               | `'100%'`                           | 宽度                        |
| height             | `number \| string`                                               | -                                  | 高度                        |
| padding            | `EdgeInsets`                                                     | -                                  | 内边距                      |
| constraints        | `BoxConstraints`                                                 | -                                  | 尺寸约束                    |
| enabled            | `boolean`                                                        | `true`                             | 是否启用                    |
| disabled           | `boolean`                                                        | `false`                            | 是否禁用                    |
| readOnly           | `boolean`                                                        | `false`                            | 是否只读                    |
| obscureText        | `boolean`                                                        | `false`                            | 是否隐藏文本（密码模式）    |
| autofocus          | `boolean`                                                        | `false`                            | 是否自动聚焦                |
| maxLines           | `number \| null`                                                 | `1`                                | 最大行数，`null` 表示无限制 |
| minLines           | `number`                                                         | `1`                                | 最小行数                    |
| maxLength          | `number`                                                         | -                                  | 最大字符数                  |
| textAlign          | `'left' \| 'center' \| 'right' \| 'justify' \| 'start' \| 'end'` | `'start'`                          | 文本对齐方式                |
| textCapitalization | `'none' \| 'sentences' \| 'words' \| 'characters'`               | `'sentences'`                      | 自动大写规则                |
| autocorrect        | `boolean`                                                        | `true`                             | 是否启用自动纠正            |
| autocomplete       | `string`                                                         | `'off'`                            | 自动完成属性                |
| style              | `TextStyle`                                                      | -                                  | 输入文本样式                |
| placeholderStyle   | `TextStyle`                                                      | -                                  | 占位符文本样式              |
| prefixStyle        | `TextStyle`                                                      | -                                  | 前缀文本样式                |
| suffixStyle        | `TextStyle`                                                      | -                                  | 后缀文本样式                |
| decoration         | `InputDecoration`                                                | -                                  | 高级装饰配置（可选）        |

### Events

| 事件名            | 参数                      | 说明               |
| ----------------- | ------------------------- | ------------------ |
| update:modelValue | `value: string \| number` | 值更新时触发       |
| change            | `value: string \| number` | 值改变时触发       |
| focus             | `event: FocusEvent`       | 获得焦点时触发     |
| blur              | `event: FocusEvent`       | 失去焦点时触发     |
| submit            | `value: string`           | 提交时触发         |
| clear             | -                         | 点击清除按钮时触发 |

### Methods

通过 ref 可以调用以下方法：

| 方法名   | 说明             |
| -------- | ---------------- |
| focus()  | 使输入框获得焦点 |
| blur()   | 使输入框失去焦点 |
| select() | 选中文本         |

### 插槽

| 插槽名 | 说明           |
| ------ | -------------- |
| prefix | 前缀自定义内容 |
| suffix | 后缀自定义内容 |

## 设计规范

CupertinoTextField 遵循 iOS 设计规范：

- 使用 `-apple-system` 字体家族，确保在 Apple 设备上显示 San Francisco 字体
- 默认高度遵循 iOS 标准（约 44pt）
- 圆角半径为 8pt，符合 iOS 输入框样式
- 聚焦时边框颜色变为系统蓝色（`#007AFF`）
- 使用 `CupertinoColors` 中的系统颜色，确保与 iOS 系统风格一致

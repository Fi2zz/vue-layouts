# Effects

## Opacity

A widget that makes its child partially transparent.

<script setup>
import Opacity from '@example/demos/effect/Opacity.vue'
import IgnorePointer from '@example/demos/effect/IgnorePointer.vue'
import SafeArea from '@example/demos/effect/SafeArea.vue'
import TransformWidget from '@example/demos/effect/TransformWidget.vue'
</script>

<div class="demo-box">
  <Opacity />
</div>

<<< ../demos/effect/Opacity.vue

## Transform

A widget that applies a transformation before painting its child.

<div class="demo-box">
  <TransformWidget />
</div>

<<< ../demos/effect/TransformWidget.vue

## IgnorePointer

A widget that is invisible during hit testing.

<div class="demo-box">
  <IgnorePointer />
</div>

<<< ../demos/effect/IgnorePointer.vue

## SafeArea

A widget that insets its child by sufficient padding to avoid operating system intrusions (e.g. notch).

<div class="demo-box">
  <SafeArea />
</div>

<<< ../demos/effect/SafeArea.vue

## API

### Opacity

#### Props

| Name      | Type     | Default | Description                                    |
| :-------- | :------- | :------ | :--------------------------------------------- |
| `opacity` | `number` | `1.0`   | The fraction to scale the child's alpha value. |

#### Slots

| Name      | Description                               |
| :-------- | :---------------------------------------- |
| `default` | The widget below this widget in the tree. |

### Transform

#### Props

| Name        | Type            | Default    | Description                                                                              |
| :---------- | :-------------- | :--------- | :--------------------------------------------------------------------------------------- |
| `transform` | `string`        | -          | The transformation matrix to apply (CSS transform).                                      |
| `alignment` | `FlexAlignment` | `'center'` | The alignment of the origin of the coordinate system in which the transform takes place. |
| `origin`    | `string`        | -          | The origin of the coordinate system (CSS transform-origin).                              |

#### Slots

| Name      | Description                               |
| :-------- | :---------------------------------------- |
| `default` | The widget below this widget in the tree. |

### IgnorePointer

#### Props

| Name                | Type      | Default | Description                                    |
| :------------------ | :-------- | :------ | :--------------------------------------------- |
| `ignoring`          | `boolean` | `false` | Whether this widget ignores pointer events.    |
| `ignoringSemantics` | `boolean` | `false` | Whether this widget is invisible to semantics. |

#### Slots

| Name      | Description                               |
| :-------- | :---------------------------------------- |
| `default` | The widget below this widget in the tree. |

### SafeArea

#### Props

| Name                        | Type         | Default | Description                                                                            |
| :-------------------------- | :----------- | :------ | :------------------------------------------------------------------------------------- |
| `left`                      | `boolean`    | `true`  | Whether to avoid system intrusions on the left.                                        |
| `top`                       | `boolean`    | `true`  | Whether to avoid system intrusions at the top of the screen.                           |
| `right`                     | `boolean`    | `true`  | Whether to avoid system intrusions on the right.                                       |
| `bottom`                    | `boolean`    | `true`  | Whether to avoid system intrusions on the bottom side of the screen.                   |
| `minimum`                   | `EdgeInsets` | -       | This minimum padding to apply.                                                         |
| `maintainBottomViewPadding` | `boolean`    | `false` | Specifies whether the safe area should maintain the bottom MediaQueryData.viewPadding. |

#### Slots

| Name      | Description                               |
| :-------- | :---------------------------------------- |
| `default` | The widget below this widget in the tree. |

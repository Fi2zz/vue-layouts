# GestureDetector

A widget that detects gestures.

## Tap & Double Tap

<script setup>
import TapDoubleTap from '@example/demos/gesture/TapDoubleTap.vue'
import Pan from '@example/demos/gesture/Pan.vue'
import HitTestBehavior from '@example/demos/gesture/HitTestBehavior.vue'
import TextNodeSupport from '@example/demos/gesture/TextNodeSupport.vue'
</script>

<div class="demo-box">
  <TapDoubleTap />
</div>

<<< ../demos/gesture/TapDoubleTap.vue

## Pan (Drag)

<div class="demo-box">
  <Pan />
</div>

<<< ../demos/gesture/Pan.vue

## Hit Test Behavior

Control how the gesture detector behaves during hit testing.

<div class="demo-box">
  <HitTestBehavior />
</div>

<<< ../demos/gesture/HitTestBehavior.vue

## Text Node Support

Detect gestures on plain text nodes.

<div class="demo-box">
  <TextNodeSupport />
</div>

<<< ../demos/gesture/TextNodeSupport.vue

## API

### GestureDetector

#### Props

| Name       | Type                                          | Default          | Description                                                 |
| :--------- | :-------------------------------------------- | :--------------- | :---------------------------------------------------------- |
| `behavior` | `'deferToChild' \| 'opaque' \| 'translucent'` | `'deferToChild'` | How this gesture detector should behave during hit testing. |

#### Events

| Name         | Description                                 |
| :----------- | :------------------------------------------ |
| `click`      | Triggered when the widget is clicked.       |
| `tap`        | Triggered when the widget is tapped.        |
| `double-tap` | Triggered when the widget is double tapped. |
| `long-press` | Triggered when the widget is long pressed.  |
| `pan-start`  | Triggered when a pan gesture starts.        |
| `pan-update` | Triggered when a pan gesture updates.       |
| `pan-end`    | Triggered when a pan gesture ends.          |

#### Slots

| Name      | Description                               |
| :-------- | :---------------------------------------- |
| `default` | The widget below this widget in the tree. |

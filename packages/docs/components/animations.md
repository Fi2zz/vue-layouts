# Animations

## AnimatedContainer

A container that gradually changes its values over a period of time.

<script setup>
import AnimationUsage from '@example/demos/animation/AnimationUsage.vue'
import AnimatedOpacity from '@example/demos/animation/AnimatedOpacity.vue'
</script>

<div class="demo-box">
  <AnimationUsage />
</div>

<<< ../demos/animation/AnimationUsage.vue

## AnimatedOpacity

Animated version of Opacity which automatically transitions the child's opacity over a given duration.

<div class="demo-box">
  <AnimatedOpacity />
</div>

<<< ../demos/animation/AnimatedOpacity.vue

## API

### AnimatedContainer

#### Props

| Name                   | Type                                  | Default    | Description                                                                              |
| :--------------------- | :------------------------------------ | :--------- | :--------------------------------------------------------------------------------------- |
| `width`                | `number \| string`                    | -          | The width of the container.                                                              |
| `height`               | `number \| string`                    | -          | The height of the container.                                                             |
| `padding`              | `EdgeInsets`                          | -          | The padding of the container.                                                            |
| `margin`               | `EdgeInsets`                          | -          | The margin of the container.                                                             |
| `decoration`           | `BoxDecoration`                       | -          | The decoration to paint behind the child.                                                |
| `foregroundDecoration` | `BoxDecoration`                       | -          | The decoration to paint in front of the child.                                           |
| `color`                | `string`                              | -          | The color to paint behind the child.                                                     |
| `alignment`            | `FlexAlignment`                       | -          | The alignment of the child within the container.                                         |
| `clipBehavior`         | `'none' \| 'hardEdge' \| 'antiAlias'` | `'none'`   | The content will be clipped (or not) according to this option.                           |
| `transform`            | `string`                              | -          | The transformation matrix to apply to the container.                                     |
| `transformAlignment`   | `FlexAlignment`                       | -          | The alignment of the origin of the coordinate system in which the transform takes place. |
| `constraints`          | `BoxConstraints`                      | -          | Additional constraints to apply to the child.                                            |
| `duration`             | `number`                              | `300`      | The duration over which to animate the parameters.                                       |
| `curve`                | `string`                              | `'linear'` | The curve to apply when animating the parameters.                                        |

#### Slots

| Name      | Description                           |
| :-------- | :------------------------------------ |
| `default` | The child contained by the container. |

### AnimatedOpacity

#### Props

| Name       | Type     | Default    | Description                                     |
| :--------- | :------- | :--------- | :---------------------------------------------- |
| `opacity`  | `number` | -          | The fraction to scale the child's alpha value.  |
| `duration` | `number` | `300`      | The duration over which to animate the opacity. |
| `curve`    | `string` | `'linear'` | The curve to apply when animating the opacity.  |

#### Slots

| Name      | Description                               |
| :-------- | :---------------------------------------- |
| `default` | The widget below this widget in the tree. |

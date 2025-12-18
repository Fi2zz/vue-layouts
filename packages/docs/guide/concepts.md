# Core Concepts

FlueKit is built on the same principles as Flutter's layout system. Understanding these concepts will help you build robust layouts.

## Constraints Go Down

In FlueKit, parents pass **constraints** down to their children. Constraints consist of:

- Minimum width
- Maximum width
- Minimum height
- Maximum height

A child must size itself within these constraints.

## Sizes Go Up

After receiving constraints, a child determines its **size** (width and height) and passes it up to the parent.

## Parent Sets Position

Once a child has determined its size, the parent decides where to **position** the child relative to its own coordinate system.

## Comparison with CSS

While FlueKit is built on top of Vue and renders to HTML/CSS, its mental model is different.

| Concept          | CSS                                    | FlueKit (Flutter)                       |
| ---------------- | -------------------------------------- | --------------------------------------- |
| **Layout Model** | Box Model, Flexbox, Grid               | Widget Composition (Row, Column, Stack) |
| **Sizing**       | `width`, `height`, `margin`, `padding` | `SizedBox`, `Padding`, `Container`      |
| **Flexibility**  | `flex-grow`, `flex-shrink`             | `Expanded`, `Flexible`, `Spacer`        |
| **Positioning**  | `absolute`, `relative`, `fixed`        | `Stack` + `Positioned`                  |

## The "Everything is a Widget" Philosophy

In FlueKit, layout properties are often separate widgets rather than properties of a single element.

- Want padding? Wrap in `Padding` (or use `Container`).
- Want to center? Wrap in `Center`.
- Want to align? Wrap in `Align`.

This composition-over-configuration approach makes the widget tree explicit and predictable.

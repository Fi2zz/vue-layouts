# Box

A convenience widget that combines common painting, positioning, and sizing widgets.
It is similar to `Container` but allows passing decoration properties (border, borderRadius, boxShadow, etc.) directly as props, without needing a `BoxDecoration` object.

## Usage

<demo src="../demos/box/BasicBox.vue"></demo>

## Props

| Name         | Type                      | Default       | Description                    |
| ------------ | ------------------------- | ------------- | ------------------------------ |
| width        | `number \| string`        | -             | Width of the box               |
| height       | `number \| string`        | -             | Height of the box              |
| padding      | `EdgeInsets`              | -             | Padding                        |
| margin       | `EdgeInsets`              | -             | Margin                         |
| color        | `string`                  | -             | Background color               |
| border       | `Border`                  | -             | Border                         |
| borderRadius | `BorderRadius`            | -             | Border radius                  |
| boxShadow    | `BoxShadow[]`             | -             | Box shadows                    |
| shape        | `'rectangle' \| 'circle'` | `'rectangle'` | Shape of the box               |
| alignment    | `Alignment`               | -             | Align the child within the box |

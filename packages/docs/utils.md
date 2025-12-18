# Utils & API Reference

FlueKit provides a collection of utility functions and constants to help you build layouts more efficiently.

## Layout Constants

### Alignment

Defines alignment geometry, commonly used in `Container`, `Align`, `Stack`, and other components.

```typescript
import { Alignment } from "fluekit";

// Examples
// Alignment.center
// Alignment.topLeft
// Alignment.bottomRight
```

Available values:

- `topLeft`, `topCenter`, `topRight`
- `centerLeft`, `center`, `centerRight`
- `bottomLeft`, `bottomCenter`, `bottomRight`

### MainAxisAlignment

Defines how children should be placed along the main axis in a Flex layout (Row/Column).

```typescript
import { MainAxisAlignment } from "fluekit";
```

Available values:

- `start`: Place children from the start.
- `end`: Place children from the end.
- `center`: Place children as close to the middle as possible.
- `spaceBetween`: Place free space evenly between the children.
- `spaceAround`: Place free space evenly between the children as well as half of that space before and after the first and last child.
- `spaceEvenly`: Place free space evenly between the children as well as before and after the first and last child.

### CrossAxisAlignment

Defines how children should be placed along the cross axis in a Flex layout (Row/Column).

```typescript
import { CrossAxisAlignment } from "fluekit";
```

Available values:

- `start`, `end`, `center`, `stretch`, `baseline`

### StackFit

Defines how a `Stack` should size the non-positioned children.

```typescript
import { StackFit } from "fluekit";
```

Available values:

- `loose`: The constraints passed to the stack from its parent are loosened (default).
- `expand`: The constraints passed to the stack from its parent are tightened to the biggest size allowed.
- `passthrough`: The constraints passed to the stack from its parent are passed unmodified to the non-positioned children.

### Clip

Defines how to clip the content of a component (e.g. `Container`).

```typescript
import { Clip } from "fluekit";
```

Available values:

- `none`: No clipping (default).
- `hardEdge`: Clip, but do not apply anti-aliasing (fastest).
- `antiAlias`: Clip with anti-aliasing.
- `antiAliasWithSaveLayer`: Clip with anti-aliasing and save layer (slower).

### BoxFit

Defines how a box should be inscribed into another box (e.g. for images).

```typescript
import { BoxFit } from "fluekit";
```

Available values:

- `contain`: As large as possible while still containing the source within the target box.
- `cover`: As small as possible while still covering the entire target box.
- `fill`: Fill the target box by distorting the source's aspect ratio.
- `fitWidth`: Make sure the full width of the source is shown.
- `fitHeight`: Make sure the full height of the source is shown.
- `none`: Align the source inside the target box (by default, centered) and discard any portions of the source that lie outside the box.
- `scaleDown`: Align the source inside the target box (by default, centered) and, if necessary, scale the source down to ensure that the source fits within the box.

## Types & Helpers

### EdgeInsets

Defines immutable insets (padding or margin).

Supported object structure:

```typescript
interface EdgeInsets {
  all?: number; // Uniform value
  horizontal?: number; // Horizontal (left + right)
  vertical?: number; // Vertical (top + bottom)
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}
```

Usage examples:

```vue
<Container :padding="{ all: 10 }" />
<Container :margin="{ horizontal: 20, vertical: 10 }" />
```

### BorderRadius

Defines immutable border radii.

Supported object structure:

```typescript
type BorderRadius =
  | number
  | {
      all?: number;
      topLeft?: number;
      topRight?: number;
      bottomLeft?: number;
      bottomRight?: number;
    };
```

Usage examples:

```vue
<Container :decoration="{ borderRadius: 10 }" />
<Container :decoration="{ borderRadius: { topLeft: 10, bottomRight: 10 } }" />
```

### BoxConstraints

Defines immutable layout constraints.

```typescript
interface BoxConstraints {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}
```

### TextStyle

Defines the style of text, corresponding to Flutter's TextStyle.

```typescript
interface TextStyle {
  color?: string;
  fontSize?: number;
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
  letterSpacing?: number;
  wordSpacing?: number;
  textBaseline?: TextBaseline;
  height?: number; // Line height
  // ...
}
```

### Border

Defines a border side.

```typescript
interface BorderSide {
  width?: number;
  color?: string;
  style?: "solid" | "dashed" | "dotted" | "double" | "none";
}

interface Borders {
  all?: BorderSide;
  left?: BorderSide;
  top?: BorderSide;
  right?: BorderSide;
  bottom?: BorderSide;
}
```

## Composition API (Hooks)

### useOpacity

Returns the cumulative opacity of the current context.

Useful for custom components that need to be aware of the parent `Opacity` value (e.g., for Canvas rendering).

```typescript
import { useOpacity } from "fluekit";

const opacity = useOpacity();
// opacity.value is a number between 0 and 1, representing the cumulative opacity from the root to the current node.
```

## Global Configuration

### px2vw

FlueKit uses a `px` to `vw` responsive solution by default. The default design width is **750px**.

```typescript
import { px2vw } from "fluekit";

console.log(px2vw(750)); // "100vw"
console.log(px2vw(375)); // "50vw"
```

### setDefaultVW

Sets the default design width. Recommended to call this at the entry point of your application.

```typescript
import { setDefaultVW } from "fluekit";

// Set design width to 375px
setDefaultVW(375);
```

### setTransform

Enables or disables automatic `px` to `vw` conversion. Defaults to `true` internally for processing logic, but the library initialization sets it to `false` by default (meaning numbers are treated as px unless configured otherwise).

```typescript
import { setTransform } from "fluekit";

setTransform(false); // Disable conversion, numbers will be treated as px
```

### setBaseUrl

Sets the Base URL for image resources, used for automatically handling relative path images.

```typescript
import { setBaseUrl } from "fluekit";

setBaseUrl("https://cdn.example.com/assets/");
```

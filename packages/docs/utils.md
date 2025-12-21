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
// Type Alias: type EdgeInsets = EdgeInsetsProps;
interface EdgeInsetsProps {
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
<script setup>
import { EdgeInsets } from "fluekit";

// 1. Uniform padding for all sides
const allPadding = EdgeInsets({ all: 10 });

// 2. Symmetric padding
// horizontal = left + right
// vertical = top + bottom
const symmetricPadding = EdgeInsets({ horizontal: 20, vertical: 10 });

// 3. Individual sides
const onlyTop = EdgeInsets({ top: 15 });
const mixed = EdgeInsets({ left: 10, right: 10, top: 20 });

// 4. Override specific sides (later properties take precedence in object literal if passed raw,
// but the helper logic handles 'all', 'horizontal', 'vertical' priority correctly)
// Priority: all > horizontal/vertical > left/right/top/bottom
</script>

<template>
  <Container :padding="allPadding">
    <Text data="Content" />
  </Container>

  <!-- Direct object usage is also supported -->
  <Container :margin="{ top: 10, bottom: 20 }" />
</template>
```

### BorderRadius

Defines immutable border radii.

Supported object structure:

```typescript
// Type Alias: type BorderRadius = BorderRadiusType;
type BorderRadiusType =
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
<script setup>
import { BorderRadius } from "fluekit";

// 1. Circular radius for all corners (shorthand)
const circular = BorderRadius(10); // same as { all: 10 }

// 2. Specific corners
const topRounded = BorderRadius({
  topLeft: 10,
  topRight: 10,
});

const diagonal = BorderRadius({
  topLeft: 15,
  bottomRight: 15,
});

// 3. Object literal with 'all'
const allCorners = BorderRadius({ all: 8 });
</script>

<template>
  <Container :decoration="{ color: 'blue', borderRadius: circular }" />
</template>
```

### BoxConstraints

Defines immutable layout constraints.

```typescript
// Type Alias: type BoxConstraints = BoxConstraintsProps;
interface BoxConstraintsProps {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}
```

Usage examples:

```vue
<script setup>
import { BoxConstraints } from "fluekit";

// 1. Loose constraints (min = 0, max = specified)
const loose = BoxConstraints({
  maxWidth: 200,
  maxHeight: 100,
});

// 2. Tight constraints (min = max)
const tight = BoxConstraints({
  minWidth: 100,
  maxWidth: 100,
  minHeight: 100,
  maxHeight: 100,
});

// 3. Infinite constraints (default if not specified)
// maxWidth: Infinity
</script>

<template>
  <!-- Force child to be at least 100px wide -->
  <Container :constraints="{ minWidth: 100 }">
    <Text data="Small Text" />
  </Container>
</template>
```

### TextStyle

Defines the style of text, corresponding to Flutter's TextStyle.

```typescript
// Type Alias: type TextStyle = TextStyleProps;
interface TextStyleProps {
  color?: string;
  fontSize?: number;
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
  letterSpacing?: number;
  wordSpacing?: number;
  textBaseline?: TextBaseline;
  height?: number; // Line height
  decoration?: TextDecoration;
  // ...
}
```

Usage examples:

```vue
<script setup>
import { TextStyle, FontWeight, TextDecoration } from "fluekit";

// 1. Basic style
const bodyText = TextStyle({
  fontSize: 14,
  color: "#333333",
});

// 2. Bold and italic
const titleText = TextStyle({
  fontSize: 24,
  fontWeight: FontWeight.bold,
  fontStyle: "italic",
});

// 3. Text with decoration (underline)
const linkText = TextStyle({
  color: "blue",
  decoration: TextDecoration.underline,
});

// 4. Inheriting and overriding
const errorText = TextStyle(
  {
    color: "red",
    fontWeight: FontWeight.bold,
  },
  bodyText,
); // bodyText properties are defaults, overwritten by first arg
</script>

<template>
  <Text data="Hello World" :style="titleText" />
</template>
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

Usage examples:

```vue
<script setup>
import { Border } from "fluekit";

// 1. Create a uniform border side
const solidBlack = Border({ width: 1, color: "black" });
const thickRed = Border({ width: 4, color: "red" });

// 2. Dashed border
const dashed = Border({ width: 1, color: "#999", style: "dashed" });
</script>

<template>
  <!-- Uniform border -->
  <Container :decoration="{ border: { all: solidBlack } }" />

  <!-- Individual sides -->
  <Container
    :decoration="{
      border: {
        bottom: thickRed,
        top: dashed,
      },
    }"
  />
</template>
```

### Size

Defines a size with width and height.

```typescript
// Type Alias: type Size = SizeType;
interface SizeType {
  width?: number | string;
  height?: number | string;
}
```

Usage examples:

```vue
<script setup>
import { Size } from "fluekit";

// 1. Square size
const square = Size(100); // { width: 100, height: 100 }

// 2. Rectangular size
const rect = Size({ width: 200, height: 100 });

// 3. Using strings (e.g. percentages)
const full = Size("100%");
const responsive = Size({ width: "50%", height: 200 });
</script>
```

### BoxDecoration

Defines the decoration of a box.

```typescript
// Type Alias: type BoxDecoration = BoxDecorationProps;
interface BoxDecorationProps {
  color?: string;
  border?: Borders;
  borderRadius?: BorderRadius;
  boxShadow?: BoxShadow | BoxShadow[];
  gradient?: string;
  image?: DecorationImage;
  overflow?: Overflow;
  opacity?: number | string;
}
```

Usage examples:

```vue
<script setup>
import { BoxDecoration, Border, BorderRadius, BoxShadow } from "fluekit";

// 1. Simple colored box with rounded corners
const cardDecoration = BoxDecoration({
  color: "white",
  borderRadius: BorderRadius(8),
  boxShadow: {
    color: "rgba(0,0,0,0.1)",
    offset: { x: 0, y: 2 },
    blurRadius: 4,
  },
});

// 2. Circle with border
const circleDecoration = BoxDecoration({
  color: "red",
  borderRadius: BorderRadius("50%"), // Fully rounded
  border: { all: Border({ width: 2, color: "white" }) },
});

// 3. Gradient background
const gradientDecoration = BoxDecoration({
  gradient: "linear-gradient(to right, red, blue)",
  borderRadius: 4,
});

// 4. Background Image
const imageDecoration = BoxDecoration({
  image: {
    image: "https://example.com/bg.jpg",
    fit: "cover",
  },
  borderRadius: 8,
});
</script>

<template>
  <Container :decoration="cardDecoration" :width="200" :height="100" />
</template>
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

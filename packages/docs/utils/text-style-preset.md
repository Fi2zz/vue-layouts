# TextStylePreset

A utility class that provides common text style presets for both iOS (Cupertino) and Material Design 3.

## Usage

```typescript
import { Text } from 'fluekit';
import { TextStylePreset } from "@fluekit/presets";

// Use directly in Text component
<Text :style="TextStylePreset.titleLarge">Hello World</Text>
```

## Material Design 3 Presets

Based on the [Material Design 3 Typography](https://m3.material.io/styles/typography/type-scale-tokens) scale.

### Display

Large, short-lived text for introductions or prominent headings.

| Preset          | Size | Weight | Line Height | Tracking |
| --------------- | ---- | ------ | ----------- | -------- |
| `displayLarge`  | 57sp | 400    | 64sp        | -0.25    |
| `displayMedium` | 45sp | 400    | 52sp        | 0        |
| `displaySmall`  | 36sp | 400    | 44sp        | 0        |

### Headline

Best for shorter, high-emphasis text.

| Preset           | Size | Weight | Line Height | Tracking |
| ---------------- | ---- | ------ | ----------- | -------- |
| `headlineLarge`  | 32sp | 400    | 40sp        | 0        |
| `headlineMedium` | 28sp | 400    | 36sp        | 0        |
| `headlineSmall`  | 24sp | 400    | 32sp        | 0        |

### Title

Smaller than headlines, typically used for medium-emphasis text.

| Preset        | Size | Weight | Line Height | Tracking |
| ------------- | ---- | ------ | ----------- | -------- |
| `titleLarge`  | 22sp | 400    | 28sp        | 0        |
| `titleMedium` | 16sp | 500    | 24sp        | 0.15     |
| `titleSmall`  | 14sp | 500    | 20sp        | 0.1      |

### Label

Used for text inside components like buttons, labels, or captions.

| Preset        | Size | Weight | Line Height | Tracking |
| ------------- | ---- | ------ | ----------- | -------- |
| `labelLarge`  | 14sp | 500    | 20sp        | 0.1      |
| `labelMedium` | 12sp | 500    | 16sp        | 0.5      |
| `labelSmall`  | 11sp | 500    | 16sp        | 0.5      |

### Body

Used for long-form writing as it works well for small text sizes.

| Preset       | Size | Weight | Line Height | Tracking |
| ------------ | ---- | ------ | ----------- | -------- |
| `bodyLarge`  | 16sp | 400    | 24sp        | 0.5      |
| `bodyMedium` | 14sp | 400    | 20sp        | 0.25     |
| `bodySmall`  | 12sp | 400    | 16sp        | 0.4      |

## iOS (Cupertino) Presets

Access these presets via the `CupertinoTextStylePreset` class.

```typescript
import { Text } from 'fluekit';
import { CupertinoTextStylePreset } from "@fluekit/presets";

// Use directly
<Text :style="CupertinoTextStylePreset.largeTitle">Large Title</Text>

// Dark mode variant
<Text :style="CupertinoTextStylePreset.dark.largeTitle">Dark Mode Large Title</Text>
```

Based on [Apple's Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/typography).

| Preset        | Size | Weight   | Description                     |
| ------------- | ---- | -------- | ------------------------------- |
| `largeTitle`  | 34pt | Normal   | Large title for navigation bars |
| `title1`      | 28pt | Normal   | First-level heading             |
| `title2`      | 22pt | Normal   | Second-level heading            |
| `title3`      | 20pt | Normal   | Third-level heading             |
| `headline`    | 17pt | SemiBold | Paragraph headings              |
| `body`        | 17pt | Normal   | Body text                       |
| `callout`     | 16pt | Normal   | Callout text                    |
| `subhead`     | 15pt | Normal   | Subheadings                     |
| `footnote`    | 13pt | Normal   | Footnotes                       |
| `caption1`    | 12pt | Normal   | Secondary text                  |
| `caption2`    | 11pt | Normal   | Tertiary text                   |


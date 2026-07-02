# ButtonStylePreset

A utility class that provides common button style presets for both Material Design 3 and iOS (Cupertino).

## Usage

```typescript
import { Button } from 'fluekit';
import { ButtonStylePreset } from "@fluekit/presets";

// Material Filled Button
<Button :style="ButtonStylePreset.materialFilled">Click Me</Button>
```

## Material Design 3 Presets

Based on the [Material Design 3 Button Specs](https://m3.material.io/components/buttons/specs).

| Preset             | Description                                    | Visual Style                                            |
| ------------------ | ---------------------------------------------- | ------------------------------------------------------- |
| `materialFilled`   | High emphasis, best for key actions.           | Solid primary color background, white text, pill shape. |
| `materialTonal`    | Medium emphasis, alternative to filled.        | Light primary container background, primary text.       |
| `materialOutlined` | Medium emphasis, best for secondary actions.   | Transparent background, primary border, primary text.   |
| `materialElevated` | Separation from background.                    | Surface color background, shadow elevation.             |
| `materialText`     | Low emphasis, best for less prominent actions. | Transparent background, no border, primary text.        |

## iOS (Cupertino) Presets

Access these presets via the `CupertinoButtonStylePreset` class.

```typescript
import { Button } from 'fluekit';
import { CupertinoButtonStylePreset } from "@fluekit/presets";

// Use directly
<Button :style="CupertinoButtonStylePreset.filled">Filled Button</Button>

// Dark mode variant
<Button :style="CupertinoButtonStylePreset.dark.filled">Dark Mode Filled Button</Button>
```

Based on [Apple's Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/buttons).

| Preset              | Description                            | Visual Style                                         |
| ------------------- | -------------------------------------- | ---------------------------------------------------- |
| `filled`            | Standard iOS filled button.            | System blue background, white text, rounded corners. |
| `tinted`            | Secondary iOS button.                  | Light gray/tinted background, system blue text.      |
| `plain`             | Text-only button (like nav bar items). | Transparent background, system blue text, no border. |
| `destructive`       | Destructive actions (text only).       | Transparent background, system red text.             |
| `destructiveFilled` | Destructive actions (filled).          | System red background, white text.                   |


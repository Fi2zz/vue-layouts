import {
  ButtonStyle,
  Colors,
  CupertinoColors,
  EdgeInsets,
  BorderRadius,
  BorderSide,
  Alignment,
  FontWeight,
  TextStyle,
} from "fluekit";
import { TextStylePreset } from "./TextStylePreset";

export class ButtonStylePreset {
  // ==========================================================================
  // Material Design 3 Styles
  // https://m3.material.io/components/buttons/specs
  // ==========================================================================

  /**
   * Filled button (High emphasis)
   * Best for key actions.
   */
  static get materialFilled(): ButtonStyle {
    return ButtonStyle({
      backgroundColor: Colors.blue, // Default primary
      foregroundColor: Colors.white,
      textStyle: TextStylePreset.labelLarge,
      padding: EdgeInsets.symmetric({ horizontal: 24, vertical: 10 }),
      shape: BorderRadius.circular(20), // Pill shape
      elevation: 0,
      minimumSize: { width: 64, height: 40 },
      alignment: Alignment.center,
    });
  }

  /**
   * Outlined button (Medium emphasis)
   * Best for secondary actions.
   */
  static get materialOutlined(): ButtonStyle {
    return ButtonStyle({
      backgroundColor: Colors.transparent,
      foregroundColor: Colors.blue,
      side: BorderSide({ color: Colors.grey, width: 1 }),
      textStyle: TextStylePreset.labelLarge,
      padding: EdgeInsets.symmetric({ horizontal: 24, vertical: 10 }),
      shape: BorderRadius.circular(20),
      minimumSize: { width: 64, height: 40 },
      alignment: Alignment.center,
    });
  }

  /**
   * Text button (Low emphasis)
   * Best for less prominent actions.
   */
  static get materialText(): ButtonStyle {
    return ButtonStyle({
      backgroundColor: Colors.transparent,
      foregroundColor: Colors.blue,
      textStyle: TextStylePreset.labelLarge,
      padding: EdgeInsets.symmetric({ horizontal: 12, vertical: 10 }),
      shape: BorderRadius.circular(20),
      minimumSize: { width: 64, height: 40 },
      alignment: Alignment.center,
    });
  }

  /**
   * Elevated button
   * Used when button needs to separate from background.
   */
  static get materialElevated(): ButtonStyle {
    return ButtonStyle({
      backgroundColor: "#f3f6fc", // Surface container low approx
      foregroundColor: Colors.blue,
      textStyle: TextStylePreset.labelLarge,
      padding: EdgeInsets.symmetric({ horizontal: 24, vertical: 10 }),
      shape: BorderRadius.circular(20),
      elevation: 1,
      shadowColor: "rgba(0,0,0,0.2)",
      minimumSize: { width: 64, height: 40 },
      alignment: Alignment.center,
    });
  }

  /**
   * Tonal button (Medium emphasis)
   * Alternative to filled buttons.
   */
  static get materialTonal(): ButtonStyle {
    return ButtonStyle({
      backgroundColor: "#dbeafe", // Secondary container approx
      foregroundColor: "#1d4ed8", // On secondary container approx
      textStyle: TextStylePreset.labelLarge,
      padding: EdgeInsets.symmetric({ horizontal: 24, vertical: 10 }),
      shape: BorderRadius.circular(20),
      elevation: 0,
      minimumSize: { width: 64, height: 40 },
      alignment: Alignment.center,
    });
  }

  // ==========================================================================
  // iOS (Cupertino) Styles
  // https://developer.apple.com/design/human-interface-guidelines/buttons
  // ==========================================================================

  /**
   * iOS Filled Button
   * Standard iOS filled button style.
   */
  static get cupertinoFilled(): ButtonStyle {
    return ButtonStyle({
      backgroundColor: CupertinoColors.systemBlue,
      foregroundColor: CupertinoColors.white,
      textStyle: TextStyle({
        ...TextStylePreset.body,
        fontWeight: FontWeight.w600, // Semibold
        fontSize: 17,
      }),
      padding: EdgeInsets.symmetric({ horizontal: 20, vertical: 12 }),
      shape: BorderRadius.circular(12), // Softer rounded corners
      minimumSize: { width: 44, height: 44 }, // Apple min touch target
      alignment: Alignment.center,
    });
  }

  /**
   * iOS Tinted/Gray Button
   * Used for secondary actions in iOS.
   */
  static get cupertinoTinted(): ButtonStyle {
    return ButtonStyle({
      backgroundColor: "rgba(118, 118, 128, 0.12)", // System fill
      foregroundColor: CupertinoColors.systemBlue,
      textStyle: TextStyle({
        ...TextStylePreset.body,
        fontWeight: FontWeight.w600, // Semibold
        fontSize: 17,
      }),
      padding: EdgeInsets.symmetric({ horizontal: 20, vertical: 12 }),
      shape: BorderRadius.circular(12),
      minimumSize: { width: 44, height: 44 },
      alignment: Alignment.center,
    });
  }

  /**
   * iOS Plain Button (Text only)
   * Standard text button style (like navigation bar buttons).
   */
  static get cupertinoPlain(): ButtonStyle {
    return ButtonStyle({
      backgroundColor: Colors.transparent,
      foregroundColor: CupertinoColors.systemBlue,
      textStyle: TextStyle({
        ...TextStylePreset.body,
        fontWeight: FontWeight.w400, // Semibold
        fontSize: 17,
      }),
      padding: EdgeInsets.symmetric({ horizontal: 16, vertical: 10 }),
      shape: BorderRadius.zero,
      minimumSize: { width: 44, height: 44 },
      alignment: Alignment.center,
    });
  }

  /**
   * iOS Destructive Button
   * Used for delete or destructive actions.
   */
  static get cupertinoDestructive(): ButtonStyle {
    return ButtonStyle({
      backgroundColor: CupertinoColors.systemRed,
      foregroundColor: CupertinoColors.white,
      textStyle: TextStyle({
        ...TextStylePreset.body,
        fontWeight: FontWeight.w600, // Semibold
        fontSize: 17,
      }),
      padding: EdgeInsets.symmetric({ horizontal: 20, vertical: 12 }),
      shape: BorderRadius.circular(12),
      minimumSize: { width: 44, height: 44 },
      alignment: Alignment.center,
    });
  }
}

import { CupertinoColors, Colors, FontWeight, TextStyle } from "fluekit";

/**
 * 文本样式预设
 * 包含 iOS (Cupertino) 和 Material Design 3 风格
 */
export class TextStylePreset {
  // --- iOS (Cupertino) Defaults ---
  private static _cupertinoPrimaryColor = CupertinoColors.label;
  private static _cupertinoFontFamily =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

  // --- Material Design 3 Defaults ---
  private static _materialPrimaryColor = Colors.black87;
  private static _materialFontFamily = 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif';

  // ==========================================================================
  // iOS (Cupertino) Styles
  // 参考: https://developer.apple.com/design/human-interface-guidelines/typography
  // ==========================================================================

  /**
   * [iOS] 用于大标题，例如导航栏的大标题
   * Size: 34pt
   */
  static get largeTitle(): TextStyle {
    return TextStyle({
      fontFamily: this._cupertinoFontFamily,
      fontSize: 34,
      fontWeight: FontWeight.normal,
      letterSpacing: 0.37,
      color: this._cupertinoPrimaryColor,
    });
  }

  /**
   * [iOS] 一级标题
   * Size: 28pt
   */
  static get title1(): TextStyle {
    return TextStyle({
      fontFamily: this._cupertinoFontFamily,
      fontSize: 28,
      fontWeight: FontWeight.normal,
      letterSpacing: 0.36,
      color: this._cupertinoPrimaryColor,
    });
  }

  /**
   * [iOS] 二级标题
   * Size: 22pt
   */
  static get title2(): TextStyle {
    return TextStyle({
      fontFamily: this._cupertinoFontFamily,
      fontSize: 22,
      fontWeight: FontWeight.normal,
      letterSpacing: 0.35,
      color: this._cupertinoPrimaryColor,
    });
  }

  /**
   * [iOS] 三级标题
   * Size: 20pt
   */
  static get title3(): TextStyle {
    return TextStyle({
      fontFamily: this._cupertinoFontFamily,
      fontSize: 20,
      fontWeight: FontWeight.normal,
      letterSpacing: 0.38,
      color: this._cupertinoPrimaryColor,
    });
  }

  /**
   * [iOS] 强调文本，通常用于段落标题
   * Size: 17pt, SemiBold
   */
  static get headline(): TextStyle {
    return TextStyle({
      fontFamily: this._cupertinoFontFamily,
      fontSize: 17,
      fontWeight: FontWeight.w600,
      letterSpacing: -0.41,
      color: this._cupertinoPrimaryColor,
    });
  }

  /**
   * [iOS] 正文文本
   * Size: 17pt
   */
  static get body(): TextStyle {
    return TextStyle({
      fontFamily: this._cupertinoFontFamily,
      fontSize: 17,
      fontWeight: FontWeight.normal,
      letterSpacing: -0.41,
      color: this._cupertinoPrimaryColor,
    });
  }

  /**
   * [iOS] 标注文本
   * Size: 16pt
   */
  static get callout(): TextStyle {
    return TextStyle({
      fontFamily: this._cupertinoFontFamily,
      fontSize: 16,
      fontWeight: FontWeight.normal,
      letterSpacing: -0.32,
      color: this._cupertinoPrimaryColor,
    });
  }

  /**
   * [iOS] 副标题
   * Size: 15pt
   */
  static get subhead(): TextStyle {
    return TextStyle({
      fontFamily: this._cupertinoFontFamily,
      fontSize: 15,
      fontWeight: FontWeight.normal,
      letterSpacing: -0.24,
      color: this._cupertinoPrimaryColor,
    });
  }

  /**
   * [iOS] 脚注
   * Size: 13pt
   */
  static get footnote(): TextStyle {
    return TextStyle({
      fontFamily: this._cupertinoFontFamily,
      fontSize: 13,
      fontWeight: FontWeight.normal,
      letterSpacing: -0.08,
      color: CupertinoColors.secondaryLabel,
    });
  }

  /**
   * [iOS] 辅助说明文本 1
   * Size: 12pt
   */
  static get caption1(): TextStyle {
    return TextStyle({
      fontFamily: this._cupertinoFontFamily,
      fontSize: 12,
      fontWeight: FontWeight.normal,
      letterSpacing: 0,
      color: CupertinoColors.secondaryLabel,
    });
  }

  /**
   * [iOS] 辅助说明文本 2
   * Size: 11pt
   */
  static get caption2(): TextStyle {
    return TextStyle({
      fontFamily: this._cupertinoFontFamily,
      fontSize: 11,
      fontWeight: FontWeight.normal,
      letterSpacing: 0.07,
      color: CupertinoColors.secondaryLabel,
    });
  }

  /**
   * [iOS] 动作/按钮文本
   * Size: 17pt, Color: System Blue
   */
  static get action(): TextStyle {
    return TextStyle({
      fontFamily: this._cupertinoFontFamily,
      fontSize: 17,
      fontWeight: FontWeight.normal,
      letterSpacing: -0.41,
      color: CupertinoColors.systemBlue,
    });
  }

  /**
   * [iOS] 较小的动作/按钮文本
   * Size: 15pt, Color: System Blue
   */
  static get actionSmall(): TextStyle {
    return TextStyle({
      fontFamily: this._cupertinoFontFamily,
      fontSize: 15,
      fontWeight: FontWeight.normal,
      letterSpacing: -0.24,
      color: CupertinoColors.systemBlue,
    });
  }

  // ==========================================================================
  // Material Design 3 Styles
  // 参考: https://m3.material.io/styles/typography/type-scale-tokens
  // ==========================================================================

  // --- Display ---

  /**
   * [Material] Display Large
   * Size: 57sp, Weight: 400, LineHeight: 64sp, Tracking: -0.25
   */
  static get displayLarge(): TextStyle {
    return TextStyle({
      fontFamily: this._materialFontFamily,
      fontSize: 57,
      fontWeight: FontWeight.w400,
      height: 64 / 57,
      letterSpacing: -0.25,
      color: this._materialPrimaryColor,
    });
  }

  /**
   * [Material] Display Medium
   * Size: 45sp, Weight: 400, LineHeight: 52sp, Tracking: 0
   */
  static get displayMedium(): TextStyle {
    return TextStyle({
      fontFamily: this._materialFontFamily,
      fontSize: 45,
      fontWeight: FontWeight.w400,
      height: 52 / 45,
      letterSpacing: 0,
      color: this._materialPrimaryColor,
    });
  }

  /**
   * [Material] Display Small
   * Size: 36sp, Weight: 400, LineHeight: 44sp, Tracking: 0
   */
  static get displaySmall(): TextStyle {
    return TextStyle({
      fontFamily: this._materialFontFamily,
      fontSize: 36,
      fontWeight: FontWeight.w400,
      height: 44 / 36,
      letterSpacing: 0,
      color: this._materialPrimaryColor,
    });
  }

  // --- Headline ---

  /**
   * [Material] Headline Large
   * Size: 32sp, Weight: 400, LineHeight: 40sp, Tracking: 0
   */
  static get headlineLarge(): TextStyle {
    return TextStyle({
      fontFamily: this._materialFontFamily,
      fontSize: 32,
      fontWeight: FontWeight.w400,
      height: 40 / 32,
      letterSpacing: 0,
      color: this._materialPrimaryColor,
    });
  }

  /**
   * [Material] Headline Medium
   * Size: 28sp, Weight: 400, LineHeight: 36sp, Tracking: 0
   */
  static get headlineMedium(): TextStyle {
    return TextStyle({
      fontFamily: this._materialFontFamily,
      fontSize: 28,
      fontWeight: FontWeight.w400,
      height: 36 / 28,
      letterSpacing: 0,
      color: this._materialPrimaryColor,
    });
  }

  /**
   * [Material] Headline Small
   * Size: 24sp, Weight: 400, LineHeight: 32sp, Tracking: 0
   */
  static get headlineSmall(): TextStyle {
    return TextStyle({
      fontFamily: this._materialFontFamily,
      fontSize: 24,
      fontWeight: FontWeight.w400,
      height: 32 / 24,
      letterSpacing: 0,
      color: this._materialPrimaryColor,
    });
  }

  // --- Title ---

  /**
   * [Material] Title Large
   * Size: 22sp, Weight: 400, LineHeight: 28sp, Tracking: 0
   */
  static get titleLarge(): TextStyle {
    return TextStyle({
      fontFamily: this._materialFontFamily,
      fontSize: 22,
      fontWeight: FontWeight.w400,
      height: 28 / 22,
      letterSpacing: 0,
      color: this._materialPrimaryColor,
    });
  }

  /**
   * [Material] Title Medium
   * Size: 16sp, Weight: 500, LineHeight: 24sp, Tracking: 0.15
   */
  static get titleMedium(): TextStyle {
    return TextStyle({
      fontFamily: this._materialFontFamily,
      fontSize: 16,
      fontWeight: FontWeight.w500,
      height: 24 / 16,
      letterSpacing: 0.15,
      color: this._materialPrimaryColor,
    });
  }

  /**
   * [Material] Title Small
   * Size: 14sp, Weight: 500, LineHeight: 20sp, Tracking: 0.1
   */
  static get titleSmall(): TextStyle {
    return TextStyle({
      fontFamily: this._materialFontFamily,
      fontSize: 14,
      fontWeight: FontWeight.w500,
      height: 20 / 14,
      letterSpacing: 0.1,
      color: this._materialPrimaryColor,
    });
  }

  // --- Label ---

  /**
   * [Material] Label Large
   * Size: 14sp, Weight: 500, LineHeight: 20sp, Tracking: 0.1
   */
  static get labelLarge(): TextStyle {
    return TextStyle({
      fontFamily: this._materialFontFamily,
      fontSize: 14,
      fontWeight: FontWeight.w500,
      height: 20 / 14,
      letterSpacing: 0.1,
      color: this._materialPrimaryColor,
    });
  }

  /**
   * [Material] Label Medium
   * Size: 12sp, Weight: 500, LineHeight: 16sp, Tracking: 0.5
   */
  static get labelMedium(): TextStyle {
    return TextStyle({
      fontFamily: this._materialFontFamily,
      fontSize: 12,
      fontWeight: FontWeight.w500,
      height: 16 / 12,
      letterSpacing: 0.5,
      color: this._materialPrimaryColor,
    });
  }

  /**
   * [Material] Label Small
   * Size: 11sp, Weight: 500, LineHeight: 16sp, Tracking: 0.5
   */
  static get labelSmall(): TextStyle {
    return TextStyle({
      fontFamily: this._materialFontFamily,
      fontSize: 11,
      fontWeight: FontWeight.w500,
      height: 16 / 11,
      letterSpacing: 0.5,
      color: this._materialPrimaryColor,
    });
  }

  // --- Body ---

  /**
   * [Material] Body Large
   * Size: 16sp, Weight: 400, LineHeight: 24sp, Tracking: 0.5
   */
  static get bodyLarge(): TextStyle {
    return TextStyle({
      fontFamily: this._materialFontFamily,
      fontSize: 16,
      fontWeight: FontWeight.w400,
      height: 24 / 16,
      letterSpacing: 0.5,
      color: this._materialPrimaryColor,
    });
  }

  /**
   * [Material] Body Medium
   * Size: 14sp, Weight: 400, LineHeight: 20sp, Tracking: 0.25
   */
  static get bodyMedium(): TextStyle {
    return TextStyle({
      fontFamily: this._materialFontFamily,
      fontSize: 14,
      fontWeight: FontWeight.w400,
      height: 20 / 14,
      letterSpacing: 0.25,
      color: this._materialPrimaryColor,
    });
  }

  /**
   * [Material] Body Small
   * Size: 12sp, Weight: 400, LineHeight: 16sp, Tracking: 0.4
   */
  static get bodySmall(): TextStyle {
    return TextStyle({
      fontFamily: this._materialFontFamily,
      fontSize: 12,
      fontWeight: FontWeight.w400,
      height: 16 / 12,
      letterSpacing: 0.4,
      color: this._materialPrimaryColor,
    });
  }
}

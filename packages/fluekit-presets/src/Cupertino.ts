/**
 * iOS 26 Design System
 * Based on Apple Design Language CSS-in-JS system
 * Includes colors, typography, spacing, radius, shadows, and component states.
 */

import { TextStyle, ButtonStyle, FontWeight, EdgeInsets, BorderRadius } from "fluekit";

export interface ColorVariant {
  light: string;
  dark: string;
}

export interface Ios26Tokens {
  colors: {
    background: {
      primary: ColorVariant;
      secondary: ColorVariant;
      tertiary: ColorVariant;
      grouped: ColorVariant;
      groupedSecondary: ColorVariant;
      groupedTertiary?: ColorVariant;
    };
    label: {
      primary: ColorVariant;
      secondary: ColorVariant;
      tertiary: ColorVariant;
      quaternary: ColorVariant;
    };
    fill: {
      primary: ColorVariant;
      secondary: ColorVariant;
      tertiary: ColorVariant;
    };
    separator: ColorVariant;
    opaqueSeparator: ColorVariant;
    system: {
      red: string;
      orange: string;
      yellow: string;
      green: string;
      mint: string;
      teal: string;
      cyan: string;
      blue: string;
      indigo: string;
      purple: string;
      pink: string;
      brown: string;
      gray: string;
      gray2: string;
      gray3: string;
      gray4: string;
      gray5: string;
      gray6: string;
    };
    systemBackground: ColorVariant;
    secondarySystemBackground: ColorVariant;
    tertiarySystemBackground: ColorVariant;
    systemGroupedBackground: ColorVariant;
    link: ColorVariant;
  };
  materials: {
    ultraThin: ColorVariant;
    thin: ColorVariant;
    regular: ColorVariant;
    thick: ColorVariant;
    chrome: ColorVariant;
  };
  typography: {
    fontFamily: {
      default: string;
      display: string;
      mono: string;
    };
    [key: string]: any;
  };
}

export const ios26Tokens: Ios26Tokens = {
  colors: {
    background: {
      primary: {
        light: "#FFFFFF",
        dark: "#000000",
      },
      secondary: {
        light: "#F2F2F7",
        dark: "#1C1C1E",
      },
      tertiary: {
        light: "#FFFFFF",
        dark: "#2C2C2E",
      },
      grouped: {
        light: "#F2F2F7",
        dark: "#000000",
      },
      groupedSecondary: {
        light: "#FFFFFF",
        dark: "#1C1C1E",
      },
      groupedTertiary: {
        light: "#F2F2F7",
        dark: "#2C2C2E",
      },
    },
    label: {
      primary: {
        light: "#000000",
        dark: "#FFFFFF",
      },
      secondary: {
        light: "rgba(60, 60, 67, 0.6)",
        dark: "rgba(235, 235, 245, 0.6)",
      },
      tertiary: {
        light: "rgba(60, 60, 67, 0.3)",
        dark: "rgba(235, 235, 245, 0.3)",
      },
      quaternary: {
        light: "rgba(60, 60, 67, 0.18)",
        dark: "rgba(235, 235, 245, 0.16)",
      },
    },
    fill: {
      primary: {
        light: "rgba(120, 120, 128, 0.2)",
        dark: "rgba(120, 120, 128, 0.36)",
      },
      secondary: {
        light: "rgba(120, 120, 128, 0.16)",
        dark: "rgba(120, 120, 128, 0.32)",
      },
      tertiary: {
        light: "rgba(118, 118, 128, 0.12)",
        dark: "rgba(118, 118, 128, 0.24)",
      },
    },
    separator: {
      light: "rgba(60, 60, 67, 0.29)",
      dark: "rgba(84, 84, 88, 0.6)",
    },
    opaqueSeparator: {
      light: "#C6C6C8",
      dark: "#38383A",
    },
    system: {
      red: "#FF3B30",
      orange: "#FF9500",
      yellow: "#FFCC00",
      green: "#34C759",
      mint: "#00C7BE",
      teal: "#30B0C7",
      cyan: "#32ADE6",
      blue: "#007AFF",
      indigo: "#5856D6",
      purple: "#AF52DE",
      pink: "#FF2D55",
      brown: "#A2845E",
      gray: "#8E8E93",
      gray2: "#AEAEB2",
      gray3: "#C7C7CC",
      gray4: "#D1D1D6",
      gray5: "#E5E5EA",
      gray6: "#F2F2F7",
    },
    systemBackground: {
      light: "#FFFFFF",
      dark: "#000000",
    },
    secondarySystemBackground: {
      light: "#F2F2F7",
      dark: "#1C1C1E",
    },
    tertiarySystemBackground: {
      light: "#FFFFFF",
      dark: "#2C2C2E",
    },
    systemGroupedBackground: {
      light: "#F2F2F7",
      dark: "#000000",
    },
    link: {
      light: "#007AFF",
      dark: "#0A84FF",
    },
  },
  materials: {
    ultraThin: {
      light: "rgba(250, 250, 250, 0.70)",
      dark: "rgba(30, 30, 30, 0.55)",
    },
    thin: {
      light: "rgba(255, 255, 255, 0.75)",
      dark: "rgba(45, 45, 45, 0.60)",
    },
    regular: {
      light: "rgba(255, 255, 255, 0.85)",
      dark: "rgba(55, 55, 55, 0.70)",
    },
    thick: {
      light: "rgba(255, 255, 255, 0.91)",
      dark: "rgba(65, 65, 65, 0.78)",
    },
    chrome: {
      light: "rgba(255, 255, 255, 0.97)",
      dark: "rgba(80, 80, 80, 0.90)",
    },
  },
  typography: {
    fontFamily: {
      default:
        '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      display:
        '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      mono: '"SF Mono", SFMono-Regular, ui-monospace, Menlo, Monaco, "Cascadia Mono", monospace',
    },
    largeTitle: {
      size: "34px",
      weight: 700,
      lineHeight: "41px",
      letterSpacing: "0.37px",
    },
    title1: {
      size: "28px",
      weight: 700,
      lineHeight: "34px",
      letterSpacing: "0.36px",
    },
    title2: {
      size: "22px",
      weight: 700,
      lineHeight: "28px",
      letterSpacing: "-0.26px",
    },
    title3: {
      size: "20px",
      weight: 600,
      lineHeight: "25px",
      letterSpacing: "-0.45px",
    },
    headline: {
      size: "17px",
      weight: 600,
      lineHeight: "22px",
      letterSpacing: "-0.41px",
    },
    body: {
      size: "17px",
      weight: 400,
      lineHeight: "22px",
      letterSpacing: "-0.41px",
    },
    callout: {
      size: "16px",
      weight: 400,
      lineHeight: "21px",
      letterSpacing: "-0.32px",
    },
    subhead: {
      size: "15px",
      weight: 400,
      lineHeight: "20px",
      letterSpacing: "-0.24px",
    },
    footnote: {
      size: "13px",
      weight: 400,
      lineHeight: "18px",
      letterSpacing: "-0.08px",
    },
    caption1: {
      size: "12px",
      weight: 400,
      lineHeight: "16px",
    },
    caption2: {
      size: "11px",
      weight: 400,
      lineHeight: "13px",
    },
  },
};

export const getColor = (token: ColorVariant | string, isDark = false): string => {
  if (typeof token === "string") return token;
  return isDark ? token.dark : token.light;
};

export const adaptiveColor = (lightColor: string, darkColor: string) => (isDark: boolean) => {
  return isDark ? darkColor : lightColor;
};

export const createTheme = (isDark = false) => {
  const mode = isDark ? "dark" : "light";
  return {
    mode,
    isDark,
    colors: {
      background: ios26Tokens.colors.background.primary[mode as keyof ColorVariant],
      backgroundSecondary: ios26Tokens.colors.background.secondary[mode as keyof ColorVariant],
      backgroundTertiary: ios26Tokens.colors.background.tertiary[mode as keyof ColorVariant],
      text: ios26Tokens.colors.label.primary[mode as keyof ColorVariant],
      textSecondary: ios26Tokens.colors.label.secondary[mode as keyof ColorVariant],
      textTertiary: ios26Tokens.colors.label.tertiary[mode as keyof ColorVariant],
      textQuaternary: ios26Tokens.colors.label.quaternary[mode as keyof ColorVariant],
      fill: ios26Tokens.colors.fill.primary[mode as keyof ColorVariant],
      fillSecondary: ios26Tokens.colors.fill.secondary[mode as keyof ColorVariant],
      fillTertiary: ios26Tokens.colors.fill.tertiary[mode as keyof ColorVariant],
      separator: ios26Tokens.colors.separator[mode as keyof ColorVariant],
      opaqueSeparator: ios26Tokens.colors.opaqueSeparator[mode as keyof ColorVariant],
      system: ios26Tokens.colors.system,
      // Link
      link: ios26Tokens.colors.link[mode as keyof ColorVariant],
      // Material
      material: ios26Tokens.materials.thin[mode as keyof ColorVariant],
    },
    shadows: {
      sm: isDark ? "0 1px 2px rgba(0, 0, 0, 0.3)" : "0 1px 2px rgba(0, 0, 0, 0.1)",
      md: isDark ? "0 4px 16px rgba(0, 0, 0, 0.4)" : "0 4px 16px rgba(0, 0, 0, 0.12)",
      lg: isDark ? "0 8px 32px rgba(0, 0, 0, 0.5)" : "0 8px 32px rgba(0, 0, 0, 0.16)",
      sheet: isDark ? "0 -4px 20px rgba(0, 0, 0, 0.5)" : "0 -4px 20px rgba(0, 0, 0, 0.15)",
    },
    overlay: isDark ? "rgba(0, 0, 0, 0.75)" : "rgba(0, 0, 0, 0.40)",
    typography: ios26Tokens.typography,
  };
};

export const lightTheme = createTheme(false);
export const darkTheme = createTheme(true);

// ============================================
// 6. Presets
// ============================================

const _getFontWeight = (weight: number): FontWeight => {
  switch (weight) {
    case 700:
      return FontWeight.bold;
    case 600:
      return FontWeight.w600;
    case 400:
      return FontWeight.normal;
    default:
      return FontWeight.normal;
  }
};

const _parseLetterSpacing = (val: string): number | undefined => {
  if (!val) return undefined;
  return parseFloat(val);
};

export class CupertinoTextStylePreset {
  static getStyle(key: string, isDark = false) {
    const t = ios26Tokens.typography[key];
    return TextStyle({
      fontFamily: ios26Tokens.typography.fontFamily.default,
      fontSize: t.size,
      fontWeight: _getFontWeight(t.weight),
      height: t.lineHeight,
      letterSpacing: _parseLetterSpacing(t.letterSpacing),
      color: getColor(ios26Tokens.colors.label.primary, isDark),
    });
  }

  static get largeTitle() {
    return this.getStyle("largeTitle");
  }
  static get title1() {
    return this.getStyle("title1");
  }
  static get title2() {
    return this.getStyle("title2");
  }
  static get title3() {
    return this.getStyle("title3");
  }
  static get headline() {
    return this.getStyle("headline");
  }
  static get body() {
    return this.getStyle("body");
  }
  static get callout() {
    return this.getStyle("callout");
  }
  static get subhead() {
    return this.getStyle("subhead");
  }
  static get footnote() {
    return this.getStyle("footnote");
  }
  static get caption1() {
    return this.getStyle("caption1");
  }
  static get caption2() {
    return this.getStyle("caption2");
  }

  static get dark() {
    return {
      get largeTitle() {
        return CupertinoTextStylePreset.getStyle("largeTitle", true);
      },
      get title1() {
        return CupertinoTextStylePreset.getStyle("title1", true);
      },
      get title2() {
        return CupertinoTextStylePreset.getStyle("title2", true);
      },
      get title3() {
        return CupertinoTextStylePreset.getStyle("title3", true);
      },
      get headline() {
        return CupertinoTextStylePreset.getStyle("headline", true);
      },
      get body() {
        return CupertinoTextStylePreset.getStyle("body", true);
      },
      get callout() {
        return CupertinoTextStylePreset.getStyle("callout", true);
      },
      get subhead() {
        return CupertinoTextStylePreset.getStyle("subhead", true);
      },
      get footnote() {
        return CupertinoTextStylePreset.getStyle("footnote", true);
      },
      get caption1() {
        return CupertinoTextStylePreset.getStyle("caption1", true);
      },
      get caption2() {
        return CupertinoTextStylePreset.getStyle("caption2", true);
      },
    };
  }
}

export class CupertinoButtonStylePreset {
  private static _getStyle(type: string, isDark = false) {
    const colors = ios26Tokens.colors;
    const baseStyle = {
      padding: EdgeInsets.symmetric({ horizontal: 20, vertical: 12 }),
      shape: BorderRadius.circular(12), // iOS standard corner radius
      textStyle: CupertinoTextStylePreset.getStyle("headline", isDark), // Button text is usually headline or body-like (semi-bold)
      elevation: 0, // Flat
    };

    switch (type) {
      case "filled":
        return ButtonStyle({
          ...baseStyle,
          backgroundColor: colors.system.blue,
          foregroundColor: "#FFFFFF",
        });
      case "tinted":
        return ButtonStyle({
          ...baseStyle,
          backgroundColor: getColor(colors.fill.secondary, isDark),
          foregroundColor: colors.system.blue,
        });
      case "plain":
        return ButtonStyle({
          ...baseStyle,
          backgroundColor: "transparent",
          foregroundColor: colors.system.blue,
          padding: EdgeInsets.zero, // Plain buttons might have less padding
        });
      case "destructive":
        return ButtonStyle({
          ...baseStyle,
          backgroundColor: "transparent",
          foregroundColor: colors.system.red,
        });
      case "destructiveFilled":
        return ButtonStyle({
          ...baseStyle,
          backgroundColor: colors.system.red,
          foregroundColor: "#FFFFFF",
        });
      default:
        return ButtonStyle(baseStyle);
    }
  }

  // Light Mode (Default)
  static get filled() {
    return this._getStyle("filled");
  }
  static get tinted() {
    return this._getStyle("tinted");
  }
  static get plain() {
    return this._getStyle("plain");
  }
  static get destructive() {
    return this._getStyle("destructive");
  }
  static get destructiveFilled() {
    return this._getStyle("destructiveFilled");
  }

  // Dark Mode
  static get dark() {
    return {
      get filled() {
        return CupertinoButtonStylePreset._getStyle("filled", true);
      },
      get tinted() {
        return CupertinoButtonStylePreset._getStyle("tinted", true);
      },
      get plain() {
        return CupertinoButtonStylePreset._getStyle("plain", true);
      },
      get destructive() {
        return CupertinoButtonStylePreset._getStyle("destructive", true);
      },
      get destructiveFilled() {
        return CupertinoButtonStylePreset._getStyle("destructiveFilled", true);
      },
    };
  }
}

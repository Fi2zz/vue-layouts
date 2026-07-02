import { Color } from "./Color";

export enum Brightness {
  dark,
  light,
}

export enum CupertinoUserInterfaceLevelData {
  base,
  elevated,
}

// Minimal interface for context
export interface BuildContext {
  [key: string]: any;
}

// Mock/Stub helpers for resolution.
// In a real application, these should probably be replaced by actual context lookups.
export class CupertinoTheme {
  static maybeBrightnessOf(context: BuildContext): Brightness | null {
    if (context?.brightness !== undefined) return context.brightness;
    if (context?.theme?.brightness !== undefined) return context.theme.brightness;
    return null;
  }
}

export class CupertinoUserInterfaceLevel {
  static maybeOf(context: BuildContext): CupertinoUserInterfaceLevelData | null {
    if (context?.userInterfaceLevel !== undefined) return context.userInterfaceLevel;
    if (context?.level !== undefined) return context.level;
    return null;
  }
}

export class MediaQuery {
  static maybeHighContrastOf(context: BuildContext): boolean | null {
    if (context?.highContrast !== undefined) return context.highContrast;
    if (context?.mediaQuery?.highContrast !== undefined) return context.mediaQuery.highContrast;
    return null;
  }
}

export interface CupertinoDynamicColorOptions {
  debugLabel?: string;
  color: Color;
  darkColor: Color;
  highContrastColor: Color;
  darkHighContrastColor: Color;
  elevatedColor: Color;
  darkElevatedColor: Color;
  highContrastElevatedColor: Color;
  darkHighContrastElevatedColor: Color;
}

export class CupertinoDynamicColor extends Color {
  readonly color: Color;
  readonly darkColor: Color;
  readonly highContrastColor: Color;
  readonly darkHighContrastColor: Color;
  readonly elevatedColor: Color;
  readonly darkElevatedColor: Color;
  readonly highContrastElevatedColor: Color;
  readonly darkHighContrastElevatedColor: Color;

  private readonly _effectiveColor: Color;
  private readonly _debugLabel?: string;
  private readonly _debugResolveContext?: BuildContext;

  constructor(
    options: CupertinoDynamicColorOptions & {
      _effectiveColor?: Color;
      _debugResolveContext?: BuildContext;
    },
  ) {
    // Initialize with the effective color (or default 'color' if not resolved yet)
    const effective = options._effectiveColor ?? options.color;
    super(effective.value);

    this.color = options.color;
    this.darkColor = options.darkColor;
    this.highContrastColor = options.highContrastColor;
    this.darkHighContrastColor = options.darkHighContrastColor;
    this.elevatedColor = options.elevatedColor;
    this.darkElevatedColor = options.darkElevatedColor;
    this.highContrastElevatedColor = options.highContrastElevatedColor;
    this.darkHighContrastElevatedColor = options.darkHighContrastElevatedColor;

    this._effectiveColor = effective;
    this._debugLabel = options.debugLabel;
    this._debugResolveContext = options._debugResolveContext;
  }

  static withBrightnessAndContrast(options: {
    debugLabel?: string;
    color: Color;
    darkColor: Color;
    highContrastColor: Color;
    darkHighContrastColor: Color;
  }): CupertinoDynamicColor {
    return new CupertinoDynamicColor({
      debugLabel: options.debugLabel,
      color: options.color,
      darkColor: options.darkColor,
      highContrastColor: options.highContrastColor,
      darkHighContrastColor: options.darkHighContrastColor,
      elevatedColor: options.color,
      darkElevatedColor: options.darkColor,
      highContrastElevatedColor: options.highContrastColor,
      darkHighContrastElevatedColor: options.darkHighContrastColor,
    });
  }

  static withBrightness(options: {
    debugLabel?: string;
    color: Color;
    darkColor: Color;
  }): CupertinoDynamicColor {
    return new CupertinoDynamicColor({
      debugLabel: options.debugLabel,
      color: options.color,
      darkColor: options.darkColor,
      highContrastColor: options.color,
      darkHighContrastColor: options.darkColor,
      elevatedColor: options.color,
      darkElevatedColor: options.darkColor,
      highContrastElevatedColor: options.color,
      darkHighContrastElevatedColor: options.darkColor,
    });
  }

  static resolve(resolvable: Color, context: BuildContext): Color {
    if (resolvable instanceof CupertinoDynamicColor) {
      return resolvable.resolveFrom(context);
    }
    return resolvable;
  }

  static maybeResolve(
    resolvable: Color | null | undefined,
    context: BuildContext,
  ): Color | null | undefined {
    if (!resolvable) return resolvable;
    return CupertinoDynamicColor.resolve(resolvable, context);
  }

  get _isPlatformBrightnessDependent(): boolean {
    return (
      this.color.value !== this.darkColor.value ||
      this.elevatedColor.value !== this.darkElevatedColor.value ||
      this.highContrastColor.value !== this.darkHighContrastColor.value ||
      this.highContrastElevatedColor.value !== this.darkHighContrastElevatedColor.value
    );
  }

  get _isHighContrastDependent(): boolean {
    return (
      this.color.value !== this.highContrastColor.value ||
      this.darkColor.value !== this.darkHighContrastColor.value ||
      this.elevatedColor.value !== this.highContrastElevatedColor.value ||
      this.darkElevatedColor.value !== this.darkHighContrastElevatedColor.value
    );
  }

  get _isInterfaceElevationDependent(): boolean {
    return (
      this.color.value !== this.elevatedColor.value ||
      this.darkColor.value !== this.darkElevatedColor.value ||
      this.highContrastColor.value !== this.highContrastElevatedColor.value ||
      this.darkHighContrastColor.value !== this.darkHighContrastElevatedColor.value
    );
  }

  resolveFrom(context: BuildContext): CupertinoDynamicColor {
    const brightness = this._isPlatformBrightnessDependent
      ? (CupertinoTheme.maybeBrightnessOf(context) ?? Brightness.light)
      : Brightness.light;

    const level = this._isInterfaceElevationDependent
      ? (CupertinoUserInterfaceLevel.maybeOf(context) ?? CupertinoUserInterfaceLevelData.base)
      : CupertinoUserInterfaceLevelData.base;

    const highContrast =
      this._isHighContrastDependent && (MediaQuery.maybeHighContrastOf(context) ?? false);

    let resolved: Color;

    if (brightness === Brightness.light) {
      if (level === CupertinoUserInterfaceLevelData.base) {
        resolved = highContrast ? this.highContrastColor : this.color;
      } else {
        resolved = highContrast ? this.highContrastElevatedColor : this.elevatedColor;
      }
    } else {
      // Dark
      if (level === CupertinoUserInterfaceLevelData.base) {
        resolved = highContrast ? this.darkHighContrastColor : this.darkColor;
      } else {
        resolved = highContrast ? this.darkHighContrastElevatedColor : this.darkElevatedColor;
      }
    }

    return new CupertinoDynamicColor({
      _effectiveColor: resolved,
      _debugResolveContext: context,
      debugLabel: this._debugLabel,
      color: this.color,
      darkColor: this.darkColor,
      highContrastColor: this.highContrastColor,
      darkHighContrastColor: this.darkHighContrastColor,
      elevatedColor: this.elevatedColor,
      darkElevatedColor: this.darkElevatedColor,
      highContrastElevatedColor: this.highContrastElevatedColor,
      darkHighContrastElevatedColor: this.darkHighContrastElevatedColor,
    });
  }

  toString(): string {
    return this._effectiveColor.toString();
    return `CupertinoDynamicColor(${this._debugLabel ?? ""}, resolved=${this._effectiveColor.toString()})`;
  }
}

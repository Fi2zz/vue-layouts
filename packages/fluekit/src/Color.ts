/**
 * A color represented by red, green, blue, and alpha channels.
 *
 * This class mimics Flutter's `Color` class API while ensuring compatibility with
 * web color strings (CSS).
 */
export class Color {
  // Store internal RGBA values
  private readonly _r: number;
  private readonly _g: number;
  private readonly _b: number;
  private readonly _a: number;

  /**
   * Construct a Color from an integer value.
   *
   * @param value A 32-bit integer value (0xAARRGGBB).
   */
  constructor(value: number) {
    this._a = (value >> 24) & 0xff;
    this._r = (value >> 16) & 0xff;
    this._g = (value >> 8) & 0xff;
    this._b = value & 0xff;
  }

  /**
   * Construct a Color from ARGB values.
   */
  static fromARGB(a: number, r: number, g: number, b: number): Color {
    return new Color(
      (((a & 0xff) << 24) | ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff)) >>> 0,
    );
  }

  /**
   * Construct a Color from RGBO values (opacity 0.0 to 1.0).
   */
  static fromRGBO(r: number, g: number, b: number, opacity: number): Color {
    const a = Math.round(opacity * 255);
    return Color.fromRGB(r, g, b, a);
  }

  /**
   * Alias for fromARGB with 255 alpha default, but here we can just use fromARGB
   * or a dedicated helper.
   */
  static fromRGB(r: number, g: number, b: number, a: number = 255): Color {
    return Color.fromARGB(a, r, g, b);
  }

  /**
   * Parse a CSS color string into a Color object.
   * Supports hex (#RGB, #RRGGBB, #RRGGBBAA) and rgb/rgba().
   */
  static fromString(color: string): Color {
    if (!color || color === "transparent") return new Color(0x00000000);

    // HEX
    if (color.startsWith("#")) {
      let hex = color.slice(1);
      if (hex.length === 3) {
        hex = hex
          .split("")
          .map((c) => c + c)
          .join("");
      }

      if (hex.length === 6) {
        // Full opacity
        const val = parseInt(hex, 16);
        return new Color(0xff000000 | val);
      }

      if (hex.length === 8) {
        // RRGGBBAA in CSS, but Flutter uses AARRGGBB in int constructor.
        // We need to be careful.
        // CSS Hex: #RRGGBBAA
        // Int: 0xAARRGGBB
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const a = parseInt(hex.substring(6, 8), 16);
        return Color.fromARGB(a, r, g, b);
      }
    }

    // RGB/RGBA
    if (color.startsWith("rgb")) {
      const parts = color.match(/[\d.]+/g);
      if (parts && parts.length >= 3) {
        const r = parseFloat(parts[0]!);
        const g = parseFloat(parts[1]!);
        const b = parseFloat(parts[2]!);
        const aVal = parts[3] !== undefined ? parseFloat(parts[3]!) : 1;
        return Color.fromRGBO(r, g, b, aVal);
      }
    }

    // Fallback: return transparent black or maybe log warning
    console.warn(`[Color] Could not parse color string: ${color}`);
    return new Color(0x00000000);
  }

  /**
   * The alpha channel of this color in an 8-bit value (0-255).
   */
  get alpha(): number {
    return this._a;
  }

  /**
   * The opacity of this color (0.0 to 1.0).
   */
  get opacity(): number {
    return this._a / 255.0;
  }

  /**
   * The red channel of this color in an 8-bit value (0-255).
   */
  get red(): number {
    return this._r;
  }

  /**
   * The green channel of this color in an 8-bit value (0-255).
   */
  get green(): number {
    return this._g;
  }

  /**
   * The blue channel of this color in an 8-bit value (0-255).
   */
  get blue(): number {
    return this._b;
  }

  /**
   * Returns a new color that matches this color with the alpha channel replaced with a (which ranges from 0 to 255).
   */
  withAlpha(a: number): Color {
    return Color.fromARGB(a, this._r, this._g, this._b);
  }

  /**
   * Returns a new color that matches this color with the opacity replaced with opacity (which ranges from 0.0 to 1.0).
   */
  withOpacity(opacity: number): Color {
    return Color.fromRGBO(this._r, this._g, this._b, opacity);
  }

  /**
   * Returns a new color that matches this color with the red channel replaced with r (which ranges from 0 to 255).
   */
  withRed(r: number): Color {
    return Color.fromARGB(this._a, r, this._g, this._b);
  }

  /**
   * Returns a new color that matches this color with the green channel replaced with g (which ranges from 0 to 255).
   */
  withGreen(g: number): Color {
    return Color.fromARGB(this._a, this._r, g, this._b);
  }

  /**
   * Returns a new color that matches this color with the blue channel replaced with b (which ranges from 0 to 255).
   */
  withBlue(b: number): Color {
    return Color.fromARGB(this._a, this._r, this._g, b);
  }

  /**
   * Returns a relative luminance of the color (0.0 to 1.0).
   */
  computeLuminance(): number {
    const R = this._r / 255.0;
    const G = this._g / 255.0;
    const B = this._b / 255.0;
    const r = R <= 0.03928 ? R / 12.92 : Math.pow((R + 0.055) / 1.055, 2.4);
    const g = G <= 0.03928 ? G / 12.92 : Math.pow((G + 0.055) / 1.055, 2.4);
    const b = B <= 0.03928 ? B / 12.92 : Math.pow((B + 0.055) / 1.055, 2.4);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  /**
   * Returns a CSS string representation of the color (rgba).
   * This allows the Color object to be used directly in style bindings.
   */
  toString(): string {
    // Optimization: if alpha is 255, use rgb
    if (this._a === 255) {
      return `rgb(${this._r}, ${this._g}, ${this._b})`;
    }
    // Use opacity for rgba (0-1)
    const opacity = Number((this._a / 255.0).toFixed(3)); // Limit precision
    return `rgba(${this._r}, ${this._g}, ${this._b}, ${opacity})`;
  }

  /**
   * Returns a 32-bit integer representing this color (0xAARRGGBB).
   */
  get value(): number {
    return (
      (((this._a & 0xff) << 24) |
        ((this._r & 0xff) << 16) |
        ((this._g & 0xff) << 8) |
        (this._b & 0xff)) >>>
      0
    );
  }
}

// Re-export utility functions as standalone helpers if needed, or deprecate them.
// For backward compatibility with previous step, we can keep functional exports that wrap Color class.

export function withOpacity(color: string | Color, opacity: number): string {
  const c = color instanceof Color ? color : Color.fromString(color);
  return c.withOpacity(opacity).toString();
}

export function withAlpha(color: string | Color, alpha: number): string {
  const c = color instanceof Color ? color : Color.fromString(color);
  return c.withAlpha(alpha).toString();
}

export function withRed(color: string | Color, red: number): string {
  const c = color instanceof Color ? color : Color.fromString(color);
  return c.withRed(red).toString();
}

export function withGreen(color: string | Color, green: number): string {
  const c = color instanceof Color ? color : Color.fromString(color);
  return c.withGreen(green).toString();
}

export function withBlue(color: string | Color, blue: number): string {
  const c = color instanceof Color ? color : Color.fromString(color);
  return c.withBlue(blue).toString();
}

export function computeLuminance(color: string | Color): number {
  const c = color instanceof Color ? color : Color.fromString(color);
  return c.computeLuminance();
}

export function lighten(color: string | Color, amount: number): string {
  const c = color instanceof Color ? color : Color.fromString(color);
  const percent = Math.max(0, Math.min(1, amount));
  const newR = Math.round(c.red + (255 - c.red) * percent);
  const newG = Math.round(c.green + (255 - c.green) * percent);
  const newB = Math.round(c.blue + (255 - c.blue) * percent);
  return Color.fromARGB(c.alpha, newR, newG, newB).toString();
}

export function darken(color: string | Color, amount: number): string {
  const c = color instanceof Color ? color : Color.fromString(color);
  const percent = Math.max(0, Math.min(1, amount));
  const newR = Math.round(c.red * (1 - percent));
  const newG = Math.round(c.green * (1 - percent));
  const newB = Math.round(c.blue * (1 - percent));
  return Color.fromARGB(c.alpha, newR, newG, newB).toString();
}

export const ColorUtils = {
  withOpacity,
  withAlpha,
  withRed,
  withGreen,
  withBlue,
  lighten,
  darken,
  computeLuminance,
};

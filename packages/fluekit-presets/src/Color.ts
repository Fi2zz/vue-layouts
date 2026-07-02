export enum ColorSpace {
  sRGB,
  extendedSRGB,
}

function clampDouble(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function lerpDouble(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export class Color {
  /**
   * The alpha channel of this color.
   */
  readonly a: number;

  /**
   * The red channel of this color.
   */
  readonly r: number;

  /**
   * The green channel of this color.
   */
  readonly g: number;

  /**
   * The blue channel of this color.
   */
  readonly b: number;

  /**
   * The color space of this color.
   */
  readonly colorSpace: ColorSpace;

  /**
   * Construct a Color from an integer value.
   * 0xAARRGGBB
   */
  constructor(value: number) {
    this.a = ((value >> 24) & 0xff) / 255.0;
    this.r = ((value >> 16) & 0xff) / 255.0;
    this.g = ((value >> 8) & 0xff) / 255.0;
    this.b = (value & 0xff) / 255.0;
    this.colorSpace = ColorSpace.sRGB;
  }

  static from(options: {
    alpha: number;
    red: number;
    green: number;
    blue: number;
    colorSpace?: ColorSpace;
  }): Color {
    const c = Object.create(Color.prototype);
    // @ts-ignore
    c.a = options.alpha;
    // @ts-ignore
    c.r = options.red;
    // @ts-ignore
    c.g = options.green;
    // @ts-ignore
    c.b = options.blue;
    // @ts-ignore
    c.colorSpace = options.colorSpace ?? ColorSpace.sRGB;
    return c;
  }

  static fromARGB(a: number, r: number, g: number, b: number): Color {
    return Color.from({
      alpha: (a & 0xff) / 255.0,
      red: (r & 0xff) / 255.0,
      green: (g & 0xff) / 255.0,
      blue: (b & 0xff) / 255.0,
    });
  }

  static fromRGBO(r: number, g: number, b: number, opacity: number): Color {
    return Color.from({
      alpha: opacity,
      red: (r & 0xff) / 255.0,
      green: (g & 0xff) / 255.0,
      blue: (b & 0xff) / 255.0,
    });
  }

  // Deprecated getters in Dart, but useful for compatibility
  get alpha(): number {
    return Math.round(this.a * 255);
  }

  get red(): number {
    return Math.round(this.r * 255);
  }

  get green(): number {
    return Math.round(this.g * 255);
  }

  get blue(): number {
    return Math.round(this.b * 255);
  }

  get opacity(): number {
    return this.a;
  }

  get value(): number {
    return this.toARGB32();
  }

  toARGB32(): number {
    const a = Math.round(this.a * 255) & 0xff;
    const r = Math.round(this.r * 255) & 0xff;
    const g = Math.round(this.g * 255) & 0xff;
    const b = Math.round(this.b * 255) & 0xff;
    return ((a << 24) | (r << 16) | (g << 8) | b) >>> 0;
  }

  withValues(options: {
    alpha?: number;
    red?: number;
    green?: number;
    blue?: number;
    colorSpace?: ColorSpace;
  }): Color {
    return Color.from({
      alpha: options.alpha ?? this.a,
      red: options.red ?? this.r,
      green: options.green ?? this.g,
      blue: options.blue ?? this.b,
      colorSpace: options.colorSpace ?? this.colorSpace,
    });
  }

  withAlpha(a: number): Color {
    return Color.fromARGB(a, this.red, this.green, this.blue);
  }

  withOpacity(opacity: number): Color {
    return Color.fromRGBO(this.red, this.green, this.blue, opacity);
  }

  withRed(r: number): Color {
    return Color.fromARGB(this.alpha, r, this.green, this.blue);
  }

  withGreen(g: number): Color {
    return Color.fromARGB(this.alpha, this.red, g, this.blue);
  }

  withBlue(b: number): Color {
    return Color.fromARGB(this.alpha, this.red, this.green, b);
  }

  computeLuminance(): number {
    // Linearize color components
    const linearize = (val: number) => {
      if (val <= 0.03928) return val / 12.92;
      return Math.pow((val + 0.055) / 1.055, 2.4);
    };

    const R = linearize(this.r);
    const G = linearize(this.g);
    const B = linearize(this.b);

    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }

  static lerp(a: Color | null, b: Color | null, t: number): Color | null {
    if (b === null) {
      if (a === null) return null;
      return a.withValues({ alpha: clampDouble(a.a * (1.0 - t), 0, 1) });
    } else {
      if (a === null) {
        return b.withValues({ alpha: clampDouble(b.a * t, 0, 1) });
      } else {
        return Color.from({
          alpha: clampDouble(lerpDouble(a.a, b.a, t), 0, 1),
          red: clampDouble(lerpDouble(a.r, b.r, t), 0, 1),
          green: clampDouble(lerpDouble(a.g, b.g, t), 0, 1),
          blue: clampDouble(lerpDouble(a.b, b.b, t), 0, 1),
          colorSpace: a.colorSpace,
        });
      }
    }
  }

  toString(): string {
    // Return standard CSS string for convenience
    const a = this.a;
    const r = Math.round(this.r * 255);
    const g = Math.round(this.g * 255);
    const b = Math.round(this.b * 255);
    if (a === 1.0) {
      return `rgb(${r}, ${g}, ${b})`;
    }
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  // Helper for hex string parsing if needed
  static fromString(hex: string): Color {
    if (!hex || hex === "transparent") return new Color(0x00000000);
    if (hex.startsWith("#")) {
      let val = hex.slice(1);
      if (val.length === 3) {
        val = val
          .split("")
          .map((c) => c + c)
          .join("");
      }
      if (val.length === 6) {
        return new Color(0xff000000 | parseInt(val, 16));
      }
      if (val.length === 8) {
        // #RRGGBBAA in CSS -> 0xAARRGGBB in Flutter Color(int)
        // But Color(int) expects AARRGGBB
        // If input is CSS hex: #RRGGBBAA
        const r = parseInt(val.substring(0, 2), 16);
        const g = parseInt(val.substring(2, 4), 16);
        const b = parseInt(val.substring(4, 6), 16);
        const a = parseInt(val.substring(6, 8), 16);
        return Color.fromARGB(a, r, g, b);
      }
    }
    return new Color(0x00000000);
  }
}

import { Color } from "./Color";

/**
 * Resolves a color value to a CSS string.
 *
 * @param color A string color, a Color object, or undefined/null.
 * @returns The CSS string representation or undefined.
 */

export function resolveColor(color: string | Color | undefined | null): string | undefined {
  if (!color) return undefined;
  if (color instanceof Color) return color.toString();
  return color;
}

import { Alignment, alignmentToCssPosition } from "./Alignment";
import { Color } from "./Color";
import { resolveColor } from "./resolveColor";

export enum TileMode {
  clamp = "clamp",
  repeated = "repeated",
  mirror = "mirror",
  decal = "decal",
}

export interface GradientTransform {
  // Placeholder for matrix transform logic if needed later
  transform?: string;
}

export interface GradientProps {
  colors: (string | Color)[];
  stops?: number[];
  transform?: GradientTransform;
  tileMode?: TileMode;
}

export interface LinearGradientProps extends GradientProps {
  begin?: Alignment;
  end?: Alignment;
}

export interface RadialGradientProps extends GradientProps {
  center?: Alignment;
  radius?: number;
  // focal?: Alignment; // CSS support for focal points is limited/complex
  // focalRadius?: number;
}

// Helper to convert Alignment to CSS linear-gradient direction
// Flutter Alignment: (-1, -1) is top-left, (1, 1) is bottom-right. (0,0) is center.
// CSS linear-gradient: "to right", "135deg", etc.
function alignmentToCSSSide(alignment: Alignment): string {
  // Simple mapping for common constants
  switch (alignment) {
    case Alignment.topLeft:
      return "to bottom right";
    case Alignment.topCenter:
      return "to bottom";
    case Alignment.topRight:
      return "to bottom left";
    case Alignment.centerLeft:
      return "to right";
    case Alignment.centerRight:
      return "to left";
    // LinearGradient(begin: centerLeft, end: centerRight) -> CSS: to right
    case Alignment.bottomLeft:
      return "to top right";
    case Alignment.bottomCenter:
      return "to top";
    case Alignment.bottomRight:
      return "to top left";
    default:
      return "to bottom"; // default fallback
  }
}

function calculateLinearDirection(begin: Alignment, end: Alignment): string {
  // This is a simplified heuristic.
  // Perfect mapping requires vector math, but our Alignment is string-based.

  if (begin === Alignment.topCenter && end === Alignment.bottomCenter) return "to bottom";
  if (begin === Alignment.bottomCenter && end === Alignment.topCenter) return "to top";
  if (begin === Alignment.centerLeft && end === Alignment.centerRight) return "to right";
  if (begin === Alignment.centerRight && end === Alignment.centerLeft) return "to left";

  if (begin === Alignment.topLeft && end === Alignment.bottomRight) return "to bottom right";
  if (begin === Alignment.bottomRight && end === Alignment.topLeft) return "to top left";
  if (begin === Alignment.topRight && end === Alignment.bottomLeft) return "to bottom left";
  if (begin === Alignment.bottomLeft && end === Alignment.topRight) return "to top right";

  // Fallback: use 'begin' to determine general direction 'away from' begin
  return alignmentToCSSSide(begin);
}

export function LinearGradient(props: LinearGradientProps): string {
  const { colors, stops, begin = Alignment.centerLeft, end = Alignment.centerRight } = props;

  if (!colors || colors.length === 0) return "none";

  const direction = calculateLinearDirection(begin, end);

  let colorStopsString = "";
  if (stops && stops.length === colors.length) {
    colorStopsString = colors.map((c, i) => `${resolveColor(c)} ${stops![i]! * 100}%`).join(", ");
  } else {
    colorStopsString = colors.map((c) => resolveColor(c)).join(", ");
  }

  return `linear-gradient(${direction}, ${colorStopsString})`;
}

export function RadialGradient(props: RadialGradientProps): string {
  const {
    colors,
    stops,
    center = Alignment.center,
    // radius = 0.5, // Flutter default is 0.5 (half width/height)
    // tileMode
  } = props;

  if (!colors || colors.length === 0) return "none";

  const position = alignmentToCssPosition(center);

  let colorStopsString = "";
  if (stops && stops.length === colors.length) {
    colorStopsString = colors.map((c, i) => `${resolveColor(c)} ${stops![i]! * 100}%`).join(", ");
  } else {
    colorStopsString = colors.map((c) => resolveColor(c)).join(", ");
  }

  return `radial-gradient(circle at ${position}, ${colorStopsString})`;
}

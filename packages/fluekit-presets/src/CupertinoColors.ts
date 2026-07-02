import { Color } from "./Color";
import { CupertinoDynamicColor } from "./CupertinoDynamicColor";

export class CupertinoColors {
  // Basic Colors
  static readonly white = new Color(0xffffffff).toString();
  static readonly black = new Color(0xff000000).toString();
  static readonly transparent = new Color(0x00000000).toString();
  static readonly lightBackgroundGray = new Color(0xffe5e5ea).toString();
  static readonly extraLightBackgroundGray = new Color(0xffefeff4).toString();
  static readonly darkBackgroundGray = new Color(0xff171717).toString();

  static readonly inactiveGray = CupertinoDynamicColor.withBrightness({
    debugLabel: "inactiveGray",
    color: new Color(0xff999999),
    darkColor: new Color(0xff757575),
  }).toString();

  // System Colors
  static readonly systemBlue = CupertinoDynamicColor.withBrightnessAndContrast({
    debugLabel: "systemBlue",
    color: Color.fromARGB(255, 0, 122, 255),
    darkColor: Color.fromARGB(255, 10, 132, 255),
    highContrastColor: Color.fromARGB(255, 0, 64, 221),
    darkHighContrastColor: Color.fromARGB(255, 64, 156, 255),
  }).toString();

  static readonly systemGreen = CupertinoDynamicColor.withBrightnessAndContrast({
    debugLabel: "systemGreen",
    color: Color.fromARGB(255, 52, 199, 89),
    darkColor: Color.fromARGB(255, 48, 209, 88),
    highContrastColor: Color.fromARGB(255, 36, 138, 61),
    darkHighContrastColor: Color.fromARGB(255, 48, 219, 91),
  }).toString();

  static readonly systemMint = CupertinoDynamicColor.withBrightnessAndContrast({
    debugLabel: "systemMint",
    color: Color.fromARGB(255, 0, 199, 190),
    darkColor: Color.fromARGB(255, 99, 230, 226),
    highContrastColor: Color.fromARGB(255, 12, 129, 123),
    darkHighContrastColor: Color.fromARGB(255, 102, 212, 207),
  }).toString();

  static readonly systemIndigo = CupertinoDynamicColor.withBrightnessAndContrast({
    debugLabel: "systemIndigo",
    color: Color.fromARGB(255, 88, 86, 214),
    darkColor: Color.fromARGB(255, 94, 92, 230),
    highContrastColor: Color.fromARGB(255, 54, 52, 163),
    darkHighContrastColor: Color.fromARGB(255, 125, 122, 255),
  }).toString();

  static readonly systemOrange = CupertinoDynamicColor.withBrightnessAndContrast({
    debugLabel: "systemOrange",
    color: Color.fromARGB(255, 255, 149, 0),
    darkColor: Color.fromARGB(255, 255, 159, 10),
    highContrastColor: Color.fromARGB(255, 201, 52, 0),
    darkHighContrastColor: Color.fromARGB(255, 255, 179, 64),
  }).toString();

  static readonly systemPink = CupertinoDynamicColor.withBrightnessAndContrast({
    debugLabel: "systemPink",
    color: Color.fromARGB(255, 255, 45, 85),
    darkColor: Color.fromARGB(255, 255, 55, 95),
    highContrastColor: Color.fromARGB(255, 211, 15, 69),
    darkHighContrastColor: Color.fromARGB(255, 255, 100, 130),
  }).toString();

  static readonly systemBrown = CupertinoDynamicColor.withBrightnessAndContrast({
    debugLabel: "systemBrown",
    color: Color.fromARGB(255, 162, 132, 94),
    darkColor: Color.fromARGB(255, 172, 142, 104),
    highContrastColor: Color.fromARGB(255, 127, 101, 69),
    darkHighContrastColor: Color.fromARGB(255, 181, 148, 105),
  }).toString();

  static readonly systemPurple = CupertinoDynamicColor.withBrightnessAndContrast({
    debugLabel: "systemPurple",
    color: Color.fromARGB(255, 175, 82, 222),
    darkColor: Color.fromARGB(255, 191, 90, 242),
    highContrastColor: Color.fromARGB(255, 137, 68, 171),
    darkHighContrastColor: Color.fromARGB(255, 218, 143, 255),
  }).toString();

  static readonly systemRed = CupertinoDynamicColor.withBrightnessAndContrast({
    debugLabel: "systemRed",
    color: Color.fromARGB(255, 255, 59, 48),
    darkColor: Color.fromARGB(255, 255, 69, 58),
    highContrastColor: Color.fromARGB(255, 215, 0, 21),
    darkHighContrastColor: Color.fromARGB(255, 255, 105, 97),
  }).toString();

  static readonly systemTeal = CupertinoDynamicColor.withBrightnessAndContrast({
    debugLabel: "systemTeal",
    color: Color.fromARGB(255, 90, 200, 250),
    darkColor: Color.fromARGB(255, 100, 210, 255),
    highContrastColor: Color.fromARGB(255, 0, 113, 164),
    darkHighContrastColor: Color.fromARGB(255, 112, 215, 255),
  }).toString();

  static readonly systemCyan = CupertinoDynamicColor.withBrightnessAndContrast({
    debugLabel: "systemCyan",
    color: Color.fromARGB(255, 50, 173, 230),
    darkColor: Color.fromARGB(255, 100, 210, 255),
    highContrastColor: Color.fromARGB(255, 0, 113, 164),
    darkHighContrastColor: Color.fromARGB(255, 112, 215, 255),
  }).toString();

  static readonly systemYellow = CupertinoDynamicColor.withBrightnessAndContrast({
    debugLabel: "systemYellow",
    color: Color.fromARGB(255, 255, 204, 0),
    darkColor: Color.fromARGB(255, 255, 214, 10),
    highContrastColor: Color.fromARGB(255, 160, 90, 0),
    darkHighContrastColor: Color.fromARGB(255, 255, 212, 38),
  }).toString();

  static readonly systemGrey = CupertinoDynamicColor.withBrightnessAndContrast({
    debugLabel: "systemGrey",
    color: Color.fromARGB(255, 142, 142, 147),
    darkColor: Color.fromARGB(255, 142, 142, 147),
    highContrastColor: Color.fromARGB(255, 108, 108, 112),
    darkHighContrastColor: Color.fromARGB(255, 174, 174, 178),
  }).toString();

  static readonly systemGrey2 = CupertinoDynamicColor.withBrightnessAndContrast({
    debugLabel: "systemGrey2",
    color: Color.fromARGB(255, 174, 174, 178),
    darkColor: Color.fromARGB(255, 99, 99, 102),
    highContrastColor: Color.fromARGB(255, 142, 142, 147),
    darkHighContrastColor: Color.fromARGB(255, 124, 124, 128),
  }).toString();

  static readonly systemGrey3 = CupertinoDynamicColor.withBrightnessAndContrast({
    debugLabel: "systemGrey3",
    color: Color.fromARGB(255, 199, 199, 204),
    darkColor: Color.fromARGB(255, 72, 72, 74),
    highContrastColor: Color.fromARGB(255, 174, 174, 178),
    darkHighContrastColor: Color.fromARGB(255, 84, 84, 86),
  }).toString();

  static readonly systemGrey4 = CupertinoDynamicColor.withBrightnessAndContrast({
    debugLabel: "systemGrey4",
    color: Color.fromARGB(255, 209, 209, 214),
    darkColor: Color.fromARGB(255, 58, 58, 60),
    highContrastColor: Color.fromARGB(255, 188, 188, 192),
    darkHighContrastColor: Color.fromARGB(255, 68, 68, 70),
  }).toString();

  static readonly systemGrey5 = CupertinoDynamicColor.withBrightnessAndContrast({
    debugLabel: "systemGrey5",
    color: Color.fromARGB(255, 229, 229, 234),
    darkColor: Color.fromARGB(255, 44, 44, 46),
    highContrastColor: Color.fromARGB(255, 216, 216, 220),
    darkHighContrastColor: Color.fromARGB(255, 54, 54, 56),
  }).toString();

  static readonly systemGrey6 = CupertinoDynamicColor.withBrightnessAndContrast({
    debugLabel: "systemGrey6",
    color: Color.fromARGB(255, 242, 242, 247),
    darkColor: Color.fromARGB(255, 28, 28, 30),
    highContrastColor: Color.fromARGB(255, 235, 235, 240),
    darkHighContrastColor: Color.fromARGB(255, 36, 36, 38),
  }).toString();

  // Active Colors (Aliases)
  static readonly activeBlue = CupertinoColors.systemBlue.toString();
  static readonly activeGreen = CupertinoColors.systemGreen.toString();
  static readonly activeOrange = CupertinoColors.systemOrange.toString();
  static readonly destructiveRed = CupertinoColors.systemRed.toString();

  // Label Colors
  static readonly label = new CupertinoDynamicColor({
    debugLabel: "label",
    color: Color.fromARGB(255, 0, 0, 0),
    darkColor: Color.fromARGB(255, 255, 255, 255),
    highContrastColor: Color.fromARGB(255, 0, 0, 0),
    darkHighContrastColor: Color.fromARGB(255, 255, 255, 255),
    elevatedColor: Color.fromARGB(255, 0, 0, 0),
    darkElevatedColor: Color.fromARGB(255, 255, 255, 255),
    highContrastElevatedColor: Color.fromARGB(255, 0, 0, 0),
    darkHighContrastElevatedColor: Color.fromARGB(255, 255, 255, 255),
  }).toString();

  static readonly secondaryLabel = new CupertinoDynamicColor({
    debugLabel: "secondaryLabel",
    color: Color.fromARGB(153, 60, 60, 67),
    darkColor: Color.fromARGB(153, 235, 235, 245),
    highContrastColor: Color.fromARGB(173, 60, 60, 67),
    darkHighContrastColor: Color.fromARGB(173, 235, 235, 245),
    elevatedColor: Color.fromARGB(153, 60, 60, 67),
    darkElevatedColor: Color.fromARGB(153, 235, 235, 245),
    highContrastElevatedColor: Color.fromARGB(173, 60, 60, 67),
    darkHighContrastElevatedColor: Color.fromARGB(173, 235, 235, 245),
  }).toString();

  static readonly tertiaryLabel = new CupertinoDynamicColor({
    debugLabel: "tertiaryLabel",
    color: Color.fromARGB(76, 60, 60, 67),
    darkColor: Color.fromARGB(76, 235, 235, 245),
    highContrastColor: Color.fromARGB(96, 60, 60, 67),
    darkHighContrastColor: Color.fromARGB(96, 235, 235, 245),
    elevatedColor: Color.fromARGB(76, 60, 60, 67),
    darkElevatedColor: Color.fromARGB(76, 235, 235, 245),
    highContrastElevatedColor: Color.fromARGB(96, 60, 60, 67),
    darkHighContrastElevatedColor: Color.fromARGB(96, 235, 235, 245),
  }).toString();

  static readonly quaternaryLabel = new CupertinoDynamicColor({
    debugLabel: "quaternaryLabel",
    color: Color.fromARGB(45, 60, 60, 67),
    darkColor: Color.fromARGB(40, 235, 235, 245),
    highContrastColor: Color.fromARGB(66, 60, 60, 67),
    darkHighContrastColor: Color.fromARGB(61, 235, 235, 245),
    elevatedColor: Color.fromARGB(45, 60, 60, 67),
    darkElevatedColor: Color.fromARGB(40, 235, 235, 245),
    highContrastElevatedColor: Color.fromARGB(66, 60, 60, 67),
    darkHighContrastElevatedColor: Color.fromARGB(61, 235, 235, 245),
  }).toString();

  // Fill Colors
  static readonly systemFill = new CupertinoDynamicColor({
    debugLabel: "systemFill",
    color: Color.fromARGB(51, 120, 120, 128),
    darkColor: Color.fromARGB(91, 120, 120, 128),
    highContrastColor: Color.fromARGB(71, 120, 120, 128),
    darkHighContrastColor: Color.fromARGB(112, 120, 120, 128),
    elevatedColor: Color.fromARGB(51, 120, 120, 128),
    darkElevatedColor: Color.fromARGB(91, 120, 120, 128),
    highContrastElevatedColor: Color.fromARGB(71, 120, 120, 128),
    darkHighContrastElevatedColor: Color.fromARGB(112, 120, 120, 128),
  }).toString();

  static readonly secondarySystemFill = new CupertinoDynamicColor({
    debugLabel: "secondarySystemFill",
    color: Color.fromARGB(40, 120, 120, 128),
    darkColor: Color.fromARGB(81, 120, 120, 128),
    highContrastColor: Color.fromARGB(61, 120, 120, 128),
    darkHighContrastColor: Color.fromARGB(102, 120, 120, 128),
    elevatedColor: Color.fromARGB(40, 120, 120, 128),
    darkElevatedColor: Color.fromARGB(81, 120, 120, 128),
    highContrastElevatedColor: Color.fromARGB(61, 120, 120, 128),
    darkHighContrastElevatedColor: Color.fromARGB(102, 120, 120, 128),
  }).toString();

  static readonly tertiarySystemFill = new CupertinoDynamicColor({
    debugLabel: "tertiarySystemFill",
    color: Color.fromARGB(30, 118, 118, 128),
    darkColor: Color.fromARGB(61, 118, 118, 128),
    highContrastColor: Color.fromARGB(51, 118, 118, 128),
    darkHighContrastColor: Color.fromARGB(81, 118, 118, 128),
    elevatedColor: Color.fromARGB(30, 118, 118, 128),
    darkElevatedColor: Color.fromARGB(61, 118, 118, 128),
    highContrastElevatedColor: Color.fromARGB(51, 118, 118, 128),
    darkHighContrastElevatedColor: Color.fromARGB(81, 118, 118, 128),
  }).toString();

  static readonly quaternarySystemFill = new CupertinoDynamicColor({
    debugLabel: "quaternarySystemFill",
    color: Color.fromARGB(20, 116, 116, 128),
    darkColor: Color.fromARGB(45, 118, 118, 128),
    highContrastColor: Color.fromARGB(40, 116, 116, 128),
    darkHighContrastColor: Color.fromARGB(66, 118, 118, 128),
    elevatedColor: Color.fromARGB(20, 116, 116, 128),
    darkElevatedColor: Color.fromARGB(45, 118, 118, 128),
    highContrastElevatedColor: Color.fromARGB(40, 116, 116, 128),
    darkHighContrastElevatedColor: Color.fromARGB(66, 118, 118, 128),
  }).toString();

  static readonly placeholderText = new CupertinoDynamicColor({
    debugLabel: "placeholderText",
    color: Color.fromARGB(76, 60, 60, 67),
    darkColor: Color.fromARGB(76, 235, 235, 245),
    highContrastColor: Color.fromARGB(96, 60, 60, 67),
    darkHighContrastColor: Color.fromARGB(96, 235, 235, 245),
    elevatedColor: Color.fromARGB(76, 60, 60, 67),
    darkElevatedColor: Color.fromARGB(76, 235, 235, 245),
    highContrastElevatedColor: Color.fromARGB(96, 60, 60, 67),
    darkHighContrastElevatedColor: Color.fromARGB(96, 235, 235, 245),
  }).toString();

  static readonly systemBackground = new CupertinoDynamicColor({
    debugLabel: "systemBackground",
    color: Color.fromARGB(255, 255, 255, 255),
    darkColor: Color.fromARGB(255, 0, 0, 0),
    highContrastColor: Color.fromARGB(255, 255, 255, 255),
    darkHighContrastColor: Color.fromARGB(255, 0, 0, 0),
    elevatedColor: Color.fromARGB(255, 255, 255, 255),
    darkElevatedColor: Color.fromARGB(255, 28, 28, 30),
    highContrastElevatedColor: Color.fromARGB(255, 255, 255, 255),
    darkHighContrastElevatedColor: Color.fromARGB(255, 36, 36, 38),
  }).toString();

  static readonly secondarySystemBackground = new CupertinoDynamicColor({
    debugLabel: "secondarySystemBackground",
    color: Color.fromARGB(255, 242, 242, 247),
    darkColor: Color.fromARGB(255, 28, 28, 30),
    highContrastColor: Color.fromARGB(255, 235, 235, 240),
    darkHighContrastColor: Color.fromARGB(255, 36, 36, 38),
    elevatedColor: Color.fromARGB(255, 242, 242, 247),
    darkElevatedColor: Color.fromARGB(255, 44, 44, 46),
    highContrastElevatedColor: Color.fromARGB(255, 235, 235, 240),
    darkHighContrastElevatedColor: Color.fromARGB(255, 54, 54, 56),
  }).toString();

  static readonly tertiarySystemBackground = new CupertinoDynamicColor({
    debugLabel: "tertiarySystemBackground",
    color: Color.fromARGB(255, 255, 255, 255),
    darkColor: Color.fromARGB(255, 44, 44, 46),
    highContrastColor: Color.fromARGB(255, 255, 255, 255),
    darkHighContrastColor: Color.fromARGB(255, 54, 54, 56),
    elevatedColor: Color.fromARGB(255, 255, 255, 255),
    darkElevatedColor: Color.fromARGB(255, 58, 58, 60),
    highContrastElevatedColor: Color.fromARGB(255, 255, 255, 255),
    darkHighContrastElevatedColor: Color.fromARGB(255, 68, 68, 70),
  }).toString();

  static readonly systemGroupedBackground = new CupertinoDynamicColor({
    debugLabel: "systemGroupedBackground",
    color: Color.fromARGB(255, 242, 242, 247),
    darkColor: Color.fromARGB(255, 0, 0, 0),
    highContrastColor: Color.fromARGB(255, 235, 235, 240),
    darkHighContrastColor: Color.fromARGB(255, 0, 0, 0),
    elevatedColor: Color.fromARGB(255, 242, 242, 247),
    darkElevatedColor: Color.fromARGB(255, 28, 28, 30),
    highContrastElevatedColor: Color.fromARGB(255, 235, 235, 240),
    darkHighContrastElevatedColor: Color.fromARGB(255, 36, 36, 38),
  }).toString();

  static readonly secondarySystemGroupedBackground = new CupertinoDynamicColor({
    debugLabel: "secondarySystemGroupedBackground",
    color: Color.fromARGB(255, 255, 255, 255),
    darkColor: Color.fromARGB(255, 28, 28, 30),
    highContrastColor: Color.fromARGB(255, 255, 255, 255),
    darkHighContrastColor: Color.fromARGB(255, 36, 36, 38),
    elevatedColor: Color.fromARGB(255, 255, 255, 255),
    darkElevatedColor: Color.fromARGB(255, 44, 44, 46),
    highContrastElevatedColor: Color.fromARGB(255, 255, 255, 255),
    darkHighContrastElevatedColor: Color.fromARGB(255, 54, 54, 56),
  }).toString();

  static readonly tertiarySystemGroupedBackground = new CupertinoDynamicColor({
    debugLabel: "tertiarySystemGroupedBackground",
    color: Color.fromARGB(255, 242, 242, 247),
    darkColor: Color.fromARGB(255, 44, 44, 46),
    highContrastColor: Color.fromARGB(255, 235, 235, 240),
    darkHighContrastColor: Color.fromARGB(255, 54, 54, 56),
    elevatedColor: Color.fromARGB(255, 242, 242, 247),
    darkElevatedColor: Color.fromARGB(255, 58, 58, 60),
    highContrastElevatedColor: Color.fromARGB(255, 235, 235, 240),
    darkHighContrastElevatedColor: Color.fromARGB(255, 68, 68, 70),
  }).toString();

  static readonly separator = new CupertinoDynamicColor({
    debugLabel: "separator",
    color: Color.fromARGB(73, 60, 60, 67),
    darkColor: Color.fromARGB(153, 84, 84, 88),
    highContrastColor: Color.fromARGB(94, 60, 60, 67),
    darkHighContrastColor: Color.fromARGB(173, 84, 84, 88),
    elevatedColor: Color.fromARGB(73, 60, 60, 67),
    darkElevatedColor: Color.fromARGB(153, 210, 210, 210),
    highContrastElevatedColor: Color.fromARGB(94, 60, 60, 67),
    darkHighContrastElevatedColor: Color.fromARGB(173, 84, 84, 88),
  }).toString();

  static readonly opaqueSeparator = new CupertinoDynamicColor({
    debugLabel: "opaqueSeparator",
    color: Color.fromARGB(255, 198, 198, 200),
    darkColor: Color.fromARGB(255, 56, 56, 58),
    highContrastColor: Color.fromARGB(255, 198, 198, 200),
    darkHighContrastColor: Color.fromARGB(255, 56, 56, 58),
    elevatedColor: Color.fromARGB(255, 198, 198, 200),
    darkElevatedColor: Color.fromARGB(255, 56, 56, 58),
    highContrastElevatedColor: Color.fromARGB(255, 198, 198, 200),
    darkHighContrastElevatedColor: Color.fromARGB(255, 56, 56, 58),
  }).toString();

  static readonly link = new CupertinoDynamicColor({
    debugLabel: "link",
    color: Color.fromARGB(255, 0, 122, 255),
    darkColor: Color.fromARGB(255, 9, 132, 255),
    highContrastColor: Color.fromARGB(255, 0, 122, 255),
    darkHighContrastColor: Color.fromARGB(255, 9, 132, 255),
    elevatedColor: Color.fromARGB(255, 0, 122, 255),
    darkElevatedColor: Color.fromARGB(255, 9, 132, 255),
    highContrastElevatedColor: Color.fromARGB(255, 0, 122, 255),
    darkHighContrastElevatedColor: Color.fromARGB(255, 9, 132, 255),
  }).toString();
}

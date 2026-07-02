import { defineConfig } from "vitepress";
import path from "path";
import { fileURLToPath } from "url";
import fluekitPkg from "../../fluekit/package.json" with { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/fluekit/",
  title: "FlueKit",
  description: "A Flutter-style Layout UI kit for Vue 3",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/getting-started" },
      { text: "Components", link: "/components/container" },
      {
        text: `v${fluekitPkg.version}`,
        link: `https://github.com/Fi2zz/fluekit/releases/tag/v${fluekitPkg.version}`,
      },
    ],

    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Getting Started", link: "/guide/getting-started" },
          { text: "Concepts", link: "/guide/concepts" },
        ],
      },
      {
        text: "Components",
        items: [
          { text: "ActivityIndicator", link: "/components/activity-indicator" },
          { text: "AlertDialog", link: "/components/alert-dialog" },
          { text: "Animations", link: "/components/animations" },
          { text: "AspectRatio", link: "/components/aspect-ratio" },
          { text: "BottomSheet", link: "/components/bottom-sheet" },
          { text: "BottomNavigationBar", link: "/components/bottom-navigation-bar" },
          { text: "Box", link: "/components/box" },
          { text: "Button", link: "/components/Button" },
          { text: "Button Family", link: "/components/buttons" },
          { text: "Card", link: "/components/card" },
          { text: "Checkbox", link: "/components/checkbox" },
          { text: "Chips", link: "/components/chips" },
          { text: "CircleAvatar", link: "/components/circle-avatar" },
          { text: "Clip", link: "/components/clip" },
          { text: "ConstrainedBox", link: "/components/constrained-box" },
          { text: "Container", link: "/components/container" },
          { text: "CupertinoContextMenu", link: "/components/cupertino-context-menu" },
          { text: "CupertinoTextField", link: "/components/cupertino-text-field" },
          { text: "Divider & Spacer", link: "/components/divider" },
          { text: "Drawer", link: "/components/drawer" },
          { text: "DropdownButton", link: "/components/dropdown-button" },
          { text: "Effects", link: "/components/effects" },
          { text: "Expanded", link: "/components/expanded" },
          { text: "FlueConfigProvider", link: "/components/flue-config-provider" },
          { text: "GestureDetector", link: "/components/gesture-detector" },
          { text: "Icon", link: "/components/icon" },
          { text: "Image", link: "/components/Image" },
          { text: "InkWell", link: "/components/ink-well" },
          { text: "LayoutBuilder", link: "/components/layout-builder" },
          { text: "ListTile", link: "/components/list-tile" },
          { text: "ListView & GridView", link: "/components/list-view" },
          { text: "Modal", link: "/components/modal" },
          { text: "Overlay", link: "/components/overlay" },
          { text: "PopupMenuButton", link: "/components/popup-menu-button" },
          { text: "Progress Indicators", link: "/components/progress-indicators" },
          { text: "Radio", link: "/components/radio" },
          { text: "RatingBar", link: "/components/rating-bar" },
          { text: "RefreshIndicator", link: "/components/refresh-indicator" },
          { text: "Row & Column", link: "/components/row-column" },
          { text: "Scaffold & AppBar", link: "/components/scaffold" },
          { text: "SegmentedControl", link: "/components/segmented-control" },
          { text: "SlidingSegmentedControl", link: "/components/sliding-segmented-control" },
          { text: "Slider", link: "/components/slider" },
          { text: "SnackBar", link: "/components/snack-bar" },
          { text: "Stack, Positioned & Sticky", link: "/components/stack" },
          { text: "StyleProvider", link: "/components/style-provider" },
          { text: "Switch", link: "/components/switch" },
          { text: "Table", link: "/components/table" },
          { text: "Tabs", link: "/components/tabs" },
          { text: "Text", link: "/components/text" },
          { text: "TextButtonWithIcon", link: "/components/text-button-with-icon" },
          { text: "TextField", link: "/components/TextField" },
          { text: "Toast", link: "/components/toast" },
        ],
      },
      {
        text: "API Reference",
        items: [
          { text: "Alignment", link: "/utils/alignment" },
          { text: "Animator", link: "/utils/animator" },
          { text: "Border", link: "/utils/border" },
          { text: "BorderRadius", link: "/utils/border-radius" },
          { text: "BoxConstraints", link: "/utils/box-constraints" },
          { text: "BoxDecoration", link: "/utils/box-decoration" },
          { text: "BoxFit", link: "/utils/box-fit" },
          { text: "BoxShadow", link: "/utils/box-shadow" },
          { text: "BoxShape", link: "/utils/box-shape" },
          { text: "ButtonStyle", link: "/utils/button-style" },
          { text: "ButtonStylePreset", link: "/utils/button-style-preset" },
          { text: "Clip", link: "/utils/clip" },
          { text: "EdgeInsets", link: "/utils/edge-insets" },
          { text: "Colors", link: "/utils/colors" },
          { text: "Flex Alignment", link: "/utils/flex-alignment" },
          { text: "Gradient", link: "/utils/gradient" },
          { text: "ImageColorBackground", link: "/utils/image-color-background" },
          { text: "ImageProvider", link: "/utils/image-provider" },
          { text: "ImageUtils", link: "/utils/image-utils" },
          { text: "InputDecoration", link: "/utils/input-decoration" },
          { text: "Matrix4", link: "/utils/matrix4" },
          { text: "MediaQuery", link: "/utils/media-query" },
          { text: "Size", link: "/utils/size" },
          { text: "StackFit", link: "/utils/stack-fit" },
          { text: "TextStyle", link: "/utils/text-style" },
          { text: "TextStylePreset", link: "/utils/text-style-preset" },
          { text: "Utils & Constants", link: "/utils" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/Fi2zz/fluekit" }],
  },
  vite: {
    resolve: {
      alias: [
        { find: "fluekit", replacement: path.resolve(__dirname, "../../fluekit/src/index.ts") },
        {
          find: "@fluekit/presets",
          replacement: path.resolve(__dirname, "../../fluekit-presets/src/index.ts"),
        },
        {
          find: "@fluekit/liquid",
          replacement: path.resolve(__dirname, "../../fluekit-liquid/src/index.ts"),
        },

        { find: "@example", replacement: path.resolve(__dirname, "../") },
      ],
    },
  },
});

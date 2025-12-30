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
          { text: "Container", link: "/components/container" },
          { text: "Box", link: "/components/box" },
          { text: "Card", link: "/components/card" },
          { text: "Row & Column", link: "/components/row-column" },
          { text: "Stack, Positioned & Sticky", link: "/components/stack" },
          { text: "Expanded", link: "/components/expanded" },
          { text: "ListView & GridView", link: "/components/list-view" },
          { text: "Text", link: "/components/text" },
          { text: "TextField", link: "/components/TextField" },
          { text: "Image", link: "/components/Image" },
          { text: "Button", link: "/components/Button" },
          { text: "GestureDetector", link: "/components/gesture-detector" },
          { text: "Animations", link: "/components/animations" },
          { text: "Effects", link: "/components/effects" },
          { text: "Divider & Spacer", link: "/components/divider" },
          { text: "Clip", link: "/components/clip" },
          { text: "ListTile", link: "/components/list-tile" },
          { text: "InkWell", link: "/components/ink-well" },
          { text: "Switch", link: "/components/switch" },
          { text: "Checkbox", link: "/components/checkbox" },
          { text: "Radio", link: "/components/radio" },
          { text: "Slider", link: "/components/slider" },
          { text: "SnackBar", link: "/components/snack-bar" },
          { text: "AlertDialog", link: "/components/alert-dialog" },
          { text: "BottomSheet", link: "/components/bottom-sheet" },
        ],
      },
      {
        text: "API Reference",
        items: [
          { text: "Utils & Constants", link: "/utils" },
          { text: "Alignment", link: "/utils/alignment" },
          { text: "Flex Alignment", link: "/utils/flex-alignment" },
          { text: "EdgeInsets", link: "/utils/edge-insets" },
          { text: "Border", link: "/utils/border" },
          { text: "BorderRadius", link: "/utils/border-radius" },
          { text: "BoxConstraints", link: "/utils/box-constraints" },
          { text: "BoxDecoration", link: "/utils/box-decoration" },
          { text: "BoxShadow", link: "/utils/box-shadow" },
          { text: "BoxShape", link: "/utils/box-shape" },
          { text: "BoxFit", link: "/utils/box-fit" },
          { text: "ButtonStyle", link: "/utils/button-style" },
          { text: "Clip", link: "/utils/clip" },
          { text: "Gradient", link: "/utils/gradient" },
          { text: "ImageProvider", link: "/utils/image-provider" },
          { text: "InputDecoration", link: "/utils/input-decoration" },
          { text: "Matrix4", link: "/utils/matrix4" },
          { text: "Size", link: "/utils/size" },
          { text: "StackFit", link: "/utils/stack-fit" },
          { text: "TextStyle", link: "/utils/text-style" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/Fi2zz/fluekit" }],
  },
  vite: {
    resolve: {
      alias: [
        { find: "fluekit", replacement: path.resolve(__dirname, "../../fluekit/src/index.ts") },
        { find: "@example", replacement: path.resolve(__dirname, "../") },
      ],
    },
  },
});

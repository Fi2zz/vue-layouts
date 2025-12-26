import { defineConfig } from "vitepress";
import path from "path";
import { fileURLToPath } from "url";

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
          { text: "Row & Column", link: "/components/row-column" },
          { text: "Stack, Positioned & Sticky", link: "/components/stack" },
          { text: "Expanded", link: "/components/expanded" },
          { text: "ListView & GridView", link: "/components/list-view" },
          { text: "Text", link: "/components/text" },
          { text: "Button", link: "/components/Button" },
          { text: "GestureDetector", link: "/components/gesture-detector" },
          { text: "Animations", link: "/components/animations" },
          { text: "Effects", link: "/components/effects" },
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
          { text: "Clip", link: "/utils/clip" },
          { text: "Gradient", link: "/utils/gradient" },
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

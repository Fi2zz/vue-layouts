import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: "./tsconfig.json",
      include: ["src/**/*.ts"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      formats: ["es"],
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "FlueKitPresets",
      fileName: "index",
    },
    rollupOptions: {
      external: ["vue", "fluekit"],
      output: {
        globals: {
          vue: "Vue",
          fluekit: "FlueKit",
        },
      },
    },
  },
});

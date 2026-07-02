import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { BoxDecoration, boxDecorationToStyle } from "../BoxDecoration";
import { Border } from "../Border";
import { BorderRadius } from "../BorderRadius";
import { BoxShadow } from "../BoxShadow";

describe("BoxDecoration", () => {
  let originalWarn: typeof console.warn;

  beforeEach(() => {
    originalWarn = console.warn;
    console.warn = vi.fn();
  });

  afterEach(() => {
    console.warn = originalWarn;
  });

  describe("constructor", () => {
    it("creates BoxDecoration with color", () => {
      const decoration = BoxDecoration({ color: "red" });
      expect(decoration.color).toBe("red");
    });

    it("creates BoxDecoration with multiple properties", () => {
      const decoration = BoxDecoration({
        color: "red",
        opacity: 0.5,
      });

      expect(decoration.color).toBe("red");
      expect(decoration.opacity).toBe(0.5);
    });
  });

  describe("boxDecorationToStyle", () => {
    it("converts color to backgroundColor", () => {
      const decoration = BoxDecoration({ color: "red" });
      const style = boxDecorationToStyle(decoration);

      expect(style.backgroundColor).toBe("red");
    });

    it("converts opacity to style", () => {
      const decoration = BoxDecoration({ opacity: 0.5 });
      const style = boxDecorationToStyle(decoration);

      expect(style.opacity).toBe(0.5);
    });

    it("merges multiple properties", () => {
      const decoration = BoxDecoration({
        color: "red",
        opacity: 0.8,
      });
      const style = boxDecorationToStyle(decoration);

      expect(style.backgroundColor).toBe("red");
      expect(style.opacity).toBe(0.8);
    });

    it("converts border to style", () => {
      const border = Border.all({ color: "blue", width: 2 });
      const decoration = BoxDecoration({ border });
      const style = boxDecorationToStyle(decoration);

      expect(style.borderTop).toBeDefined();
      expect(style.borderLeft).toBeDefined();
      expect(style.borderRight).toBeDefined();
      expect(style.borderBottom).toBeDefined();
    });

    it("converts borderRadius to style", () => {
      const borderRadius = BorderRadius.circular(8);
      const decoration = BoxDecoration({ borderRadius });
      const style = boxDecorationToStyle(decoration);

      expect(style.borderTopLeftRadius).toBeDefined();
      expect(style.borderTopRightRadius).toBeDefined();
      expect(style.borderBottomLeftRadius).toBeDefined();
      expect(style.borderBottomRightRadius).toBeDefined();
    });

    it("converts boxShadow to style", () => {
      const boxShadow = BoxShadow({ color: "rgba(0, 0, 0, 0.2)", offset: { x: 2, y: 2 }, blurRadius: 4 });
      const decoration = BoxDecoration({ boxShadow });
      const style = boxDecorationToStyle(decoration);

      expect(style.boxShadow).toBeDefined();
    });

    it("converts gradient to style", () => {
      const gradient = "linear-gradient(to right, red, blue)";
      const decoration = BoxDecoration({ gradient });
      const style = boxDecorationToStyle(decoration);

      expect(style.backgroundImage).toBe(gradient);
    });

    it("converts shape to style", () => {
      const decoration = BoxDecoration({ shape: "circle" });
      const style = boxDecorationToStyle(decoration);

      expect(style.borderRadius).toBe("50%");
    });

    it("converts backdropFilter to style", () => {
      const decoration = BoxDecoration({ backdropFilter: "blur(10px)" });
      const style = boxDecorationToStyle(decoration);

      expect(style.backdropFilter).toBe("blur(10px)");
      expect(style.webkitBackdropFilter).toBe("blur(10px)");
    });
  });

  describe("security", () => {
    it("blocks unsafe color values", () => {
      const decoration = BoxDecoration({
        // @ts-ignore - 故意传入危险值测试
        color: "url('javascript:alert(1)')",
      });
      const style = boxDecorationToStyle(decoration);

      expect(console.warn).toHaveBeenCalled();
      expect(style.backgroundColor).toBeUndefined();
    });

    it("blocks unsafe backdropFilter values", () => {
      const decoration = BoxDecoration({
        // @ts-ignore - 故意传入危险值测试
        backdropFilter: "url('javascript:alert(1)')",
      });
      const style = boxDecorationToStyle(decoration);

      expect(console.warn).toHaveBeenCalled();
      expect(style.backdropFilter).toBeUndefined();
    });

    it("blocks unsafe gradient values", () => {
      const decoration = BoxDecoration({
        // @ts-ignore - 故意传入危险值测试
        gradient: "url('javascript:alert(1)')",
      });
      const style = boxDecorationToStyle(decoration);

      expect(console.warn).toHaveBeenCalled();
      expect(style.backgroundImage).toBeUndefined();
    });
  });

  describe("edge cases", () => {
    it("handles undefined decoration", () => {
      const style = boxDecorationToStyle(undefined as any);
      expect(style).toEqual({});
    });

    it("handles empty decoration", () => {
      const decoration = BoxDecoration({});
      const style = boxDecorationToStyle(decoration);
      expect(style).toEqual({});
    });

    it("prioritizes shape over borderRadius", () => {
      const borderRadius = BorderRadius.circular(8);
      const decoration = BoxDecoration({ shape: "circle", borderRadius });
      const style = boxDecorationToStyle(decoration);

      expect(style.borderRadius).toBe("50%");
    });
  });
});

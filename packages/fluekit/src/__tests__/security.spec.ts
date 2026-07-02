import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import {
  isValidCssFilter,
  sanitizeCssFilter,
  isSafeDataUrl,
  sanitizeImageSrc,
  isValidCssColor,
  sanitizeCssColor,
  isValidCssGradient,
  sanitizeCssGradient,
} from "../security";

describe("Security Module", () => {
  let originalWarn: typeof console.warn;

  beforeEach(() => {
    originalWarn = console.warn;
    console.warn = vi.fn();
  });

  afterEach(() => {
    console.warn = originalWarn;
  });

  describe("isValidCssFilter", () => {
    it("validates safe CSS filters", () => {
      expect(isValidCssFilter("blur(10px)")).toBe(true);
      expect(isValidCssFilter("brightness(1.5)")).toBe(true);
      expect(isValidCssFilter("contrast(200%)")).toBe(true);
      expect(isValidCssFilter("grayscale(100%)")).toBe(true);
      expect(isValidCssFilter("opacity(0.5)")).toBe(true);
    });

    it("rejects unsafe CSS filters", () => {
      expect(isValidCssFilter("url('javascript:alert(1)')")).toBe(false);
      expect(isValidCssFilter("expression(alert(1))")).toBe(false);
      expect(isValidCssFilter("blur(10px); background: red")).toBe(false);
    });

    it("handles empty and invalid input", () => {
      expect(isValidCssFilter("")).toBe(false);
      expect(isValidCssFilter(null as any)).toBe(false);
      expect(isValidCssFilter(undefined as any)).toBe(false);
    });
  });

  describe("sanitizeCssFilter", () => {
    it("returns safe filters unchanged", () => {
      expect(sanitizeCssFilter("blur(10px)")).toBe("blur(10px)");
      expect(sanitizeCssFilter("brightness(1.5)")).toBe("brightness(1.5)");
    });

    it("blocks dangerous filters", () => {
      expect(sanitizeCssFilter("url('javascript:alert(1)')")).toBe("");
      expect(sanitizeCssFilter("expression(alert(1))")).toBe("");
      expect(console.warn).toHaveBeenCalled();
    });

    it("cleans potentially dangerous content", () => {
      // 注意：sanitizeCssFilter 会移除危险关键字但保留合法部分
      const result = sanitizeCssFilter("blur(10px) javascript:alert(1)");
      // 应该移除 javascript: 部分
      expect(result).not.toContain("javascript");
    });

    it("handles empty input", () => {
      expect(sanitizeCssFilter("")).toBe("");
      expect(sanitizeCssFilter(null as any)).toBe("");
      expect(sanitizeCssFilter(undefined as any)).toBe("");
    });
  });

  describe("isSafeDataUrl", () => {
    it("validates safe image data URLs", () => {
      expect(isSafeDataUrl("data:image/png;base64,abc123")).toBe(true);
      expect(isSafeDataUrl("data:image/jpeg;base64,abc123")).toBe(true);
      expect(isSafeDataUrl("data:image/gif;base64,abc123")).toBe(true);
      expect(isSafeDataUrl("data:image/webp;base64,abc123")).toBe(true);
      expect(isSafeDataUrl("data:image/svg+xml,%3Csvg%3E%3C/svg%3E")).toBe(true);
    });

    it("blocks dangerous data URLs", () => {
      expect(isSafeDataUrl("data:text/html,<script>alert(1)</script>")).toBe(false);
      expect(isSafeDataUrl("data:application/javascript,alert(1)")).toBe(false);
      expect(isSafeDataUrl("data:image/svg+xml,<script>alert(1)</script>")).toBe(false);
      expect(isSafeDataUrl("data:image/svg+xml,<svg onload='alert(1)'>")).toBe(false);
    });

    it("allows non-data URLs", () => {
      expect(isSafeDataUrl("https://example.com/image.png")).toBe(true);
      expect(isSafeDataUrl("/images/logo.png")).toBe(true);
    });
  });

  describe("sanitizeImageSrc", () => {
    it("returns safe image URLs unchanged", () => {
      expect(sanitizeImageSrc("https://example.com/image.png")).toBe(
        "https://example.com/image.png"
      );
      expect(sanitizeImageSrc("/images/logo.png")).toBe("/images/logo.png");
      expect(sanitizeImageSrc("data:image/png;base64,abc123")).toBe(
        "data:image/png;base64,abc123"
      );
    });

    it("blocks dangerous protocols", () => {
      expect(sanitizeImageSrc("javascript:alert(1)")).toBe("");
      expect(sanitizeImageSrc("vbscript:alert(1)")).toBe("");
      expect(sanitizeImageSrc("data:text/html,<script>alert(1)</script>")).toBe("");
      expect(console.warn).toHaveBeenCalled();
    });

    it("handles empty input", () => {
      expect(sanitizeImageSrc("")).toBe("");
      expect(sanitizeImageSrc(null as any)).toBe("");
      expect(sanitizeImageSrc(undefined as any)).toBe("");
    });

    it("trims whitespace", () => {
      expect(sanitizeImageSrc("  https://example.com/image.png  ")).toBe(
        "https://example.com/image.png"
      );
    });
  });

  describe("isValidCssColor", () => {
    it("validates safe CSS colors", () => {
      expect(isValidCssColor("#fff")).toBe(true);
      expect(isValidCssColor("#ffffff")).toBe(true);
      expect(isValidCssColor("#ffffff80")).toBe(true);
      expect(isValidCssColor("rgb(255, 0, 0)")).toBe(true);
      expect(isValidCssColor("rgba(255, 0, 0, 0.5)")).toBe(true);
      expect(isValidCssColor("hsl(0, 100%, 50%)")).toBe(true);
      expect(isValidCssColor("hsla(0, 100%, 50%, 0.5)")).toBe(true);
      expect(isValidCssColor("red")).toBe(true);
      expect(isValidCssColor("blue")).toBe(true);
      expect(isValidCssColor("transparent")).toBe(true);
    });

    it("rejects unsafe colors", () => {
      expect(isValidCssColor("url('javascript:alert(1)')")).toBe(false);
      expect(isValidCssColor("expression(alert(1))")).toBe(false);
      expect(isValidCssColor("red; background: url('javascript:alert(1)')")).toBe(false);
    });

    it("handles empty input", () => {
      expect(isValidCssColor("")).toBe(false);
      expect(isValidCssColor(null as any)).toBe(false);
      expect(isValidCssColor(undefined as any)).toBe(false);
    });
  });

  describe("sanitizeCssColor", () => {
    it("returns safe colors unchanged", () => {
      expect(sanitizeCssColor("#ff0000")).toBe("#ff0000");
      expect(sanitizeCssColor("rgb(255, 0, 0)")).toBe("rgb(255, 0, 0)");
      expect(sanitizeCssColor("red")).toBe("red");
    });

    it("blocks unsafe colors", () => {
      expect(sanitizeCssColor("url('javascript:alert(1)')")).toBeUndefined();
      expect(sanitizeCssColor("expression(alert(1))")).toBeUndefined();
      expect(console.warn).toHaveBeenCalled();
    });

    it("handles empty input", () => {
      expect(sanitizeCssColor("")).toBeUndefined();
      expect(sanitizeCssColor(null as any)).toBeUndefined();
      expect(sanitizeCssColor(undefined as any)).toBeUndefined();
    });
  });

  describe("isValidCssGradient", () => {
    it("validates safe CSS gradients", () => {
      expect(isValidCssGradient("linear-gradient(to right, red, blue)")).toBe(true);
      expect(isValidCssGradient("radial-gradient(circle, red, blue)")).toBe(true);
      expect(isValidCssGradient("conic-gradient(from 0deg, red, blue)")).toBe(true);
      expect(isValidCssGradient("repeating-linear-gradient(red, blue)")).toBe(true);
    });

    it("rejects unsafe gradients", () => {
      expect(isValidCssGradient("url('javascript:alert(1)')")).toBe(false);
      expect(isValidCssGradient("expression(alert(1))")).toBe(false);
      expect(
        isValidCssGradient("linear-gradient(red, blue); background: url('javascript:alert(1)')")
      ).toBe(false);
    });

    it("handles empty input", () => {
      expect(isValidCssGradient("")).toBe(false);
      expect(isValidCssGradient(null as any)).toBe(false);
      expect(isValidCssGradient(undefined as any)).toBe(false);
    });
  });

  describe("sanitizeCssGradient", () => {
    it("returns safe gradients unchanged", () => {
      expect(sanitizeCssGradient("linear-gradient(to right, red, blue)")).toBe(
        "linear-gradient(to right, red, blue)"
      );
      expect(sanitizeCssGradient("radial-gradient(circle, red, blue)")).toBe(
        "radial-gradient(circle, red, blue)"
      );
    });

    it("blocks unsafe gradients", () => {
      expect(sanitizeCssGradient("url('javascript:alert(1)')")).toBe("");
      expect(sanitizeCssGradient("expression(alert(1))")).toBe("");
      expect(console.warn).toHaveBeenCalled();
    });

    it("handles empty input", () => {
      expect(sanitizeCssGradient("")).toBe("");
      expect(sanitizeCssGradient(null as any)).toBe("");
      expect(sanitizeCssGradient(undefined as any)).toBe("");
    });
  });
});

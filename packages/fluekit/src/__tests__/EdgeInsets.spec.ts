import { describe, expect, it } from "vitest";
import { EdgeInsets } from "../EdgeInsets";

describe("EdgeInsets", () => {
  describe("constructor", () => {
    it("creates EdgeInsets with all sides equal", () => {
      const insets = EdgeInsets.all(10);
      expect(insets.top).toBe(10);
      expect(insets.right).toBe(10);
      expect(insets.bottom).toBe(10);
      expect(insets.left).toBe(10);
    });

    it("creates EdgeInsets with only top", () => {
      const insets = EdgeInsets.only({ top: 10 });
      expect(insets.top).toBe(10);
      expect(insets.right).toBe(0);
      expect(insets.bottom).toBe(0);
      expect(insets.left).toBe(0);
    });

    it("creates EdgeInsets with specific sides", () => {
      const insets = EdgeInsets.only({ top: 10, right: 20, bottom: 30, left: 40 });
      expect(insets.top).toBe(10);
      expect(insets.right).toBe(20);
      expect(insets.bottom).toBe(30);
      expect(insets.left).toBe(40);
    });

    it("creates EdgeInsets with symmetric horizontal and vertical", () => {
      const insets = EdgeInsets.symmetric({ horizontal: 20, vertical: 10 });
      expect(insets.top).toBe(10);
      expect(insets.right).toBe(20);
      expect(insets.bottom).toBe(10);
      expect(insets.left).toBe(20);
    });

    it("creates EdgeInsets with only horizontal", () => {
      const insets = EdgeInsets.symmetric({ horizontal: 15 });
      expect(insets.top).toBe(0);
      expect(insets.right).toBe(15);
      expect(insets.bottom).toBe(0);
      expect(insets.left).toBe(15);
    });

    it("creates EdgeInsets with only vertical", () => {
      const insets = EdgeInsets.symmetric({ vertical: 25 });
      expect(insets.top).toBe(25);
      expect(insets.right).toBe(0);
      expect(insets.bottom).toBe(25);
      expect(insets.left).toBe(0);
    });

  });

  describe("validation", () => {
    it("handles negative values", () => {
      const insets = EdgeInsets.all(-10);
      expect(insets.top).toBe(-10);
      expect(insets.right).toBe(-10);
      expect(insets.bottom).toBe(-10);
      expect(insets.left).toBe(-10);
    });

    it("handles zero values", () => {
      const insets = EdgeInsets.all(0);
      expect(insets.top).toBe(0);
      expect(insets.right).toBe(0);
      expect(insets.bottom).toBe(0);
      expect(insets.left).toBe(0);
    });

    it("handles decimal values", () => {
      const insets = EdgeInsets.all(10.5);
      expect(insets.top).toBe(10.5);
      expect(insets.right).toBe(10.5);
      expect(insets.bottom).toBe(10.5);
      expect(insets.left).toBe(10.5);
    });
  });
});

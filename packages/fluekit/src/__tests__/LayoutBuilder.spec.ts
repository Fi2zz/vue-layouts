import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import LayoutBuilder from "../LayoutBuilder.vue";

// Mock ResizeObserver
let observerCallback: ResizeObserverCallback | null = null;
class MockResizeObserver {
  constructor(callback: ResizeObserverCallback) {
    observerCallback = callback;
  }
  observe() {
    // Optionally trigger immediately if needed, but we can do it manually in tests
  }
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal("ResizeObserver", MockResizeObserver);

describe("LayoutBuilder", () => {
  it("renders with default props (both directions)", () => {
    const wrapper = mount(LayoutBuilder);
    const style = wrapper.element.getAttribute("style");
    expect(style).toContain("width: 100%");
    expect(style).toContain("height: 100%");
  });

  it("renders with direction='horizontal'", () => {
    const wrapper = mount(LayoutBuilder, {
      props: {
        direction: "horizontal",
      },
    });
    const style = wrapper.element.getAttribute("style");
    expect(style).toContain("width: 100%");
    // Should NOT contain height: 100% (it might contain other styles, but checking absence of height: 100%)
    // The style string might look like "display: block; width: 100%;"
    expect(style).not.toMatch(/height:\s*100%/);
  });

  it("renders with direction='vertical'", () => {
    const wrapper = mount(LayoutBuilder, {
      props: {
        direction: "vertical",
      },
    });
    const style = wrapper.element.getAttribute("style");
    expect(style).not.toMatch(/width:\s*100%/);
    expect(style).toContain("height: 100%");
  });

  it("renders with direction='none'", () => {
    const wrapper = mount(LayoutBuilder, {
      props: {
        direction: "none",
      },
    });
    const style = wrapper.element.getAttribute("style");
    expect(style).not.toMatch(/width:\s*100%/);
    expect(style).not.toMatch(/height:\s*100%/);
  });

  it("passes correct constraints for horizontal direction", async () => {
    const wrapper = mount(LayoutBuilder, {
      props: {
        direction: "horizontal",
      },
      slots: {
        default: `<template #default="{ constraints }">
          <div class="child" :data-min-width="constraints.minWidth" :data-max-height="constraints.maxHeight"></div>
        </template>`,
      },
    });

    // Trigger observer callback
    if (observerCallback) {
      observerCallback(
        [
          {
            contentRect: { width: 500, height: 200 } as DOMRectReadOnly,
          } as ResizeObserverEntry,
        ],
        {} as ResizeObserver,
      );
    }

    await wrapper.vm.$nextTick();

    const child = wrapper.find(".child");
    expect(child.exists()).toBe(true);
    expect(child.attributes("data-min-width")).toBe("500");
    // maxHeight should be Infinity (which might stringify to 'Infinity' or undefined depending on Vue/JS behavior)
    // BoxConstraints handles Infinity -> undefined mapping in toVal?
    // Let's check BoxConstraints.ts again.
    // const toVal = (v: number | string) => (v === Infinity ? undefined : v);
    // So it should be undefined.
    // DOM attributes might not show if undefined.
    expect(child.attributes("data-max-height")).toBeUndefined();
  });

  it("passes correct constraints for vertical direction", async () => {
    const wrapper = mount(LayoutBuilder, {
      props: {
        direction: "vertical",
      },
      slots: {
        default: `<template #default="{ constraints }">
          <div class="child" :data-min-height="constraints.minHeight" :data-max-width="constraints.maxWidth"></div>
        </template>`,
      },
    });

    // Trigger observer callback
    if (observerCallback) {
      observerCallback(
        [
          {
            contentRect: { width: 500, height: 200 } as DOMRectReadOnly,
          } as ResizeObserverEntry,
        ],
        {} as ResizeObserver,
      );
    }

    await wrapper.vm.$nextTick();

    const child = wrapper.find(".child");
    expect(child.exists()).toBe(true);
    expect(child.attributes("data-min-height")).toBe("200");
    expect(child.attributes("data-max-width")).toBeUndefined();
  });
});

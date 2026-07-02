import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import Box from "../Box.vue";

describe("Box", () => {
  let originalWarn: typeof console.warn;

  beforeEach(() => {
    originalWarn = console.warn;
    console.warn = vi.fn();
  });

  afterEach(() => {
    console.warn = originalWarn;
  });

  it("renders default slot content", () => {
    const wrapper = mount(Box, {
      slots: {
        default: "Content",
      },
    });

    expect(wrapper.text()).toBe("Content");
    expect(wrapper.element.tagName).toBe("DIV");
  });

  it("renders with width and height", () => {
    const wrapper = mount(Box, {
      props: {
        width: 200,
        height: 100,
      },
    });

    const style = wrapper.element.getAttribute("style");
    expect(style).toContain("width: 200px");
    expect(style).toContain("height: 100px");
  });

  it("renders with string dimensions", () => {
    const wrapper = mount(Box, {
      props: {
        width: "50%",
        height: "100vh",
      },
    });

    const style = wrapper.element.getAttribute("style");
    expect(style).toContain("width: 50%");
    expect(style).toContain("height: 100vh");
  });

  it("renders with width and height correctly", () => {
    const wrapper = mount(Box, {
      props: {
        width: 300,
        height: 200,
      },
    });

    const style = wrapper.element.getAttribute("style");
    expect(style).toContain("width: 300px");
    expect(style).toContain("height: 200px");
  });

  it("renders with cursor", () => {
    const wrapper = mount(Box, {
      props: {
        cursor: "pointer",
      },
    });

    const style = wrapper.element.getAttribute("style");
    expect(style).toContain("cursor: pointer");
  });

  it("renders with custom style from attrs", () => {
    const wrapper = mount(Box, {
      props: {
        width: 100,
      },
      attrs: {
        style: "cursor: pointer;",
      },
    });

    const style = wrapper.element.getAttribute("style");
    expect(style).toContain("width: 100px");
    expect(style).toContain("cursor: pointer");
  });

  it("merges multiple props correctly", () => {
    const wrapper = mount(Box, {
      props: {
        width: 300,
        height: 200,
      },
    });

    const style = wrapper.element.getAttribute("style");
    expect(style).toContain("width: 300px");
    expect(style).toContain("height: 200px");
  });

  it("accepts null and undefined props", () => {
    const wrapper = mount(Box, {
      props: {
        width: null as any,
        height: undefined as any,
      },
    });

    const style = wrapper.element.getAttribute("style");
    expect(style).not.toContain("width:");
    expect(style).not.toContain("height:");
  });

  it("renders children correctly", () => {
    const wrapper = mount(Box, {
      slots: {
        default: '<div class="child">Child 1</div><div class="child">Child 2</div>',
      },
    });

    expect(wrapper.findAll(".child")).toHaveLength(2);
    expect(wrapper.text()).toBe("Child 1Child 2");
  });

  it("applies custom class from attrs", () => {
    const wrapper = mount(Box, {
      props: {},
      attrs: {
        class: "container-box",
      },
    });

    expect(wrapper.classes()).toContain("container-box");
  });

  it("forwards event listeners", async () => {
    const onClick = vi.fn();
    const wrapper = mount(Box, {
      props: {
        onClick,
      },
    });

    await wrapper.trigger("click");
    expect(onClick).toHaveBeenCalled();
  });
});

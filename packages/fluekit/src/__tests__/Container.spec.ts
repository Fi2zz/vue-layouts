import { EdgeInsets } from "@/EdgeInsets";
import { BoxDecoration } from "@/BoxDecoration";
import { mount } from "@vue/test-utils";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import Container from "../Container.vue";

describe("Container", () => {
  // 保存 console.warn 的引用
  let originalWarn: typeof console.warn;
  
  beforeEach(() => {
    originalWarn = console.warn;
    console.warn = vi.fn();
  });
  
  afterEach(() => {
    console.warn = originalWarn;
  });

  it("renders correctly", () => {
    const wrapper = mount(Container, {
      props: {
        width: 100,
        height: 100,
        color: "red",
      },
    });

    expect(wrapper.element.tagName).toBe("DIV");
    const style = wrapper.element.getAttribute("style");
    expect(style).toContain("width: 100px");
    expect(style).toContain("height: 100px");
    expect(style).toContain("background-color: red");
  });

  it("renders with padding", () => {
    const wrapper = mount(Container, {
      props: {
        padding: EdgeInsets.all(10),
      },
    });

    const style = wrapper.element.getAttribute("style");
    expect(style).toContain("padding: 10px");
  });

  it("renders with margin", () => {
    const wrapper = mount(Container, {
      props: {
        margin: EdgeInsets.symmetric({ horizontal: 20, vertical: 10 }),
      },
    });

    const style = wrapper.element.getAttribute("style");
    expect(style).toContain("margin: 10px 20px");
  });

  it("handles negative padding correctly (validation)", () => {
    const wrapper = mount(Container, {
      props: {
        padding: EdgeInsets.all(-10),
      },
    });

    expect(console.warn).toHaveBeenCalledWith(
      "[Container] padding must be non-negative"
    );
  });

  it("validates color and decoration conflict", () => {
    const wrapper = mount(Container, {
      props: {
        color: "red",
        decoration: BoxDecoration({ color: "blue" }),
      },
    });

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("[Container] Cannot provide both a color and a decoration")
    );
  });

  it("validates decoration type", () => {
    const wrapper = mount(Container, {
      props: {
        // @ts-ignore - 故意传入错误类型测试验证
        decoration: { color: "red" },
      },
    });

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("[Container] decoration must be created using BoxDecoration constructor")
    );
  });

  it("validates padding type", () => {
    const wrapper = mount(Container, {
      props: {
        // @ts-ignore - 故意传入错误类型测试验证
        padding: { all: 10 },
      },
    });

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("[Container] padding must be created using EdgeInsets constructor")
    );
  });

  it("validates margin type", () => {
    const wrapper = mount(Container, {
      props: {
        // @ts-ignore - 故意传入错误类型测试验证
        margin: { symmetric: { horizontal: 10 } },
      },
    });

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("[Container] margin must be created using EdgeInsets constructor")
    );
  });

  it("applies decoration correctly", () => {
    const decoration = BoxDecoration({
      color: "blue",
    });
    
    const wrapper = mount(Container, {
      props: {
        decoration,
      },
    });

    const style = wrapper.element.getAttribute("style");
    expect(style).toContain("background-color: blue");
  });

  it("applies alignment correctly", () => {
    const wrapper = mount(Container, {
      props: {
        alignment: "center",
        width: 200,
        height: 200,
      },
      slots: {
        default: "<div>Content</div>",
      },
    });

    const style = wrapper.element.getAttribute("style");
    expect(style).toContain("display: flex");
  });

  it("renders foreground decoration", () => {
    const decoration = BoxDecoration({
      color: "rgba(255, 0, 0, 0.5)",
    });
    
    const wrapper = mount(Container, {
      props: {
        foregroundDecoration: decoration,
      },
    });

    // 检查前景装饰元素是否存在
    const foregroundElement = wrapper.find("div");
    expect(foregroundElement.exists()).toBe(true);
  });

  it("handles clipBehavior correctly", () => {
    const wrapper = mount(Container, {
      props: {
        clipBehavior: "hardEdge",
        decoration: BoxDecoration({ color: "red" }),
      },
    });

    const style = wrapper.element.getAttribute("style");
    expect(style).toContain("overflow: hidden");
  });

  it("warns when clipBehavior is set without decoration", () => {
    const wrapper = mount(Container, {
      props: {
        clipBehavior: "hardEdge",
      },
    });

    expect(console.warn).toHaveBeenCalledWith(
      "[Container] clipBehavior has no effect when decoration is null"
    );
  });

  it("applies flex correctly", () => {
    const wrapper = mount(Container, {
      props: {
        flex: 1,
      },
    });

    const style = wrapper.element.getAttribute("style");
    expect(style).toContain("flex: 1 1 0%");
  });

  it("accepts custom style from attrs", () => {
    const wrapper = mount(Container, {
      props: {
        width: 100,
      },
      attrs: {
        style: "cursor: pointer;",
      },
    });

    const style = wrapper.element.getAttribute("style");
    expect(style).toContain("cursor: pointer");
    expect(style).toContain("width: 100px");
  });
});

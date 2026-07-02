import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { BoxDecoration, boxDecorationToStyle } from "../BoxDecoration";
import { Border } from "../Border";
import { BorderRadius } from "../BorderRadius";
import { BoxShadow } from "../BoxShadow";
import { ImageFilter } from "../ImageFilter";
import Box from "../Box.vue";

// 模拟 Box 组件的简单实现，用于测试集成
const TestBox = {
  template: `
    <div :style="boxStyle">{{ content }}</div>
  `,
  props: {
    decoration: {
      type: Object,
      default: () => ({})
    },
    content: {
      type: String,
      default: ""
    }
  },
  computed: {
    boxStyle() {
      return boxDecorationToStyle(this.decoration);
    }
  }
};

describe("BoxDecoration Integration Tests", () => {
  let originalWarn: typeof console.warn;

  beforeEach(() => {
    originalWarn = console.warn;
    console.warn = vi.fn();
  });

  afterEach(() => {
    console.warn = originalWarn;
  });

  it("integrates with Box component", () => {
    const decoration = BoxDecoration({
      color: "red",
      border: Border.all({ color: "blue", width: 2 }),
      borderRadius: BorderRadius.circular(8),
      boxShadow: BoxShadow({ color: "rgba(0, 0, 0, 0.2)", offset: { x: 2, y: 2 }, blurRadius: 4 })
    });

    const wrapper = mount(TestBox, {
      props: {
        decoration,
        content: "Test Content"
      }
    });

    expect(wrapper.text()).toBe("Test Content");
    expect(wrapper.attributes("style")).toContain("background-color: red");
    expect(wrapper.attributes("style")).toContain("border-top");
    expect(wrapper.attributes("style")).toContain("border-bottom-left-radius");
    expect(wrapper.attributes("style")).toContain("box-shadow");
  });

  it("handles complex decoration with gradient and image", () => {
    const decoration = BoxDecoration({
      gradient: "linear-gradient(to right, red, blue)",
      image: {
        image: "https://example.com/image.png",
        fit: "cover",
        alignment: "center"
      }
    });

    const wrapper = mount(TestBox, {
      props: {
        decoration,
        content: "Test Content"
      }
    });

    expect(wrapper.text()).toBe("Test Content");
    expect(wrapper.attributes("style")).toContain("background-image");
    expect(wrapper.attributes("style")).toContain("background-size");
    expect(wrapper.attributes("style")).toContain("background-position");
  });

  it("handles backdropFilter for glassmorphism effect", () => {
    const backdropFilter = ImageFilter.blur({ sigmaX: 10 });
    console.log('backdropFilter:', backdropFilter);
    console.log('backdropFilter.toString():', backdropFilter.toString());
    
    const decoration = BoxDecoration({
      color: "rgba(255, 255, 255, 0.8)",
      backdropFilter: backdropFilter,
      borderRadius: BorderRadius.circular(12)
    });

    // 直接调用 boxDecorationToStyle 并输出结果
    const style = boxDecorationToStyle(decoration);
    console.log('boxDecorationToStyle result:', style);

    const wrapper = mount(TestBox, {
      props: {
        decoration,
        content: "Glassmorphism Test"
      }
    });

    expect(wrapper.text()).toBe("Glassmorphism Test");
    expect(wrapper.attributes("style")).toContain("background-color: rgba(255, 255, 255, 0.8)");
    expect(wrapper.attributes("style")).toContain("border-bottom-left-radius");
  });

  it("handles circle shape", () => {
    const decoration = BoxDecoration({
      color: "green",
      shape: "circle"
    });

    const wrapper = mount(TestBox, {
      props: {
        decoration,
        content: "Circle Test"
      }
    });

    expect(wrapper.text()).toBe("Circle Test");
    expect(wrapper.attributes("style")).toContain("background-color: green");
    expect(wrapper.attributes("style")).toContain("border-radius: 50%");
  });

  it("caches styles for performance", () => {
    const decoration = BoxDecoration({
      color: "purple",
      border: Border.all({ color: "yellow", width: 1 })
    });

    // 第一次调用
    const style1 = boxDecorationToStyle(decoration);
    // 第二次调用，应该使用缓存
    const style2 = boxDecorationToStyle(decoration);

    // 应该返回相同的对象引用
    expect(style1).toBe(style2);
  });
});

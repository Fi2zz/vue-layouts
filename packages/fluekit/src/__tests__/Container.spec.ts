import { describe, it, expect, beforeAll } from "vitest";
import { mount } from "@vue/test-utils";
import Container from "../Container.vue";
import { setTransform } from "../px2vw";
import { EdgeInsets } from "@/EdgeInsets";
describe("Container", () => {
  beforeAll(() => {
    setTransform(false);
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
});

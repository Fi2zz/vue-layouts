import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import LiquidGlassDialog from "../LiquidGlassDialog.vue";
import Icon from "../Icon.vue";
import { Icons } from "../Icons";
import { ImageProvider } from "../ImageProvider";

describe("LiquidGlassDialog", () => {
  it("renders built-in icon correctly", () => {
    const wrapper = mount(LiquidGlassDialog, {
      props: {
        modelValue: true,
        actions: [],
        icon: Icons.checkCircle,
      },
      global: {
        stubs: {
          Teleport: true,
          Transition: {
            template: "<div><slot /></div>",
          },
        },
      },
    });

    const iconComponent = wrapper.findComponent(Icon);
    expect(iconComponent.exists()).toBe(true);
    // The resolved icon should be the SVG path string from Icons.checkCircle
    expect(iconComponent.props("icon")).toBe(Icons.checkCircle);
  });

  it("renders image url correctly", () => {
    const imageUrl = "https://example.com/image.png";
    const wrapper = mount(LiquidGlassDialog, {
      props: {
        modelValue: true,
        actions: [],
        icon: ImageProvider(imageUrl),
      },
      global: {
        stubs: {
          Teleport: true,
          Transition: {
            template: "<div><slot /></div>",
          },
        },
      },
    });

    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe(imageUrl);
    expect(wrapper.findComponent(Icon).exists()).toBe(false);
  });
});

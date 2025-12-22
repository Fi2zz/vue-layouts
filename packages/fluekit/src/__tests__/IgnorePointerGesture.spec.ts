import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { GestureDetector, IgnorePointer, Container, Text } from "../";

// 测试 IgnorePointer 与 GestureDetector 的交互
describe("IgnorePointer with GestureDetector", () => {
  it("should ignore gestures when ignoring is true", async () => {
    const onClick = vi.fn();
    const onTap = vi.fn();

    const wrapper = mount({
      components: {
        GestureDetector,
        IgnorePointer,
        Container,
        Text,
      },
      template: `
        <GestureDetector @click="onClick" @tap="onTap">
          <IgnorePointer :ignoring="true">
            <Container color="red" width="100" height="100" alignment="center">
              <Text data="Click Me" />
            </Container>
          </IgnorePointer>
        </GestureDetector>
      `,
      setup() {
        return {
          onClick,
          onTap,
        };
      },
    });

    // 点击 IgnorePointer 包裹的内容
    await wrapper.find(".container-box").trigger("click");

    // 预期：点击事件应该被忽略，onClick 和 onTap 都不应该被调用
    expect(onClick).not.toHaveBeenCalled();
    expect(onTap).not.toHaveBeenCalled();
  });

  it("should not ignore gestures when ignoring is false", async () => {
    const onClick = vi.fn();
    const onTap = vi.fn();

    const wrapper = mount({
      components: {
        GestureDetector,
        IgnorePointer,
        Container,
        Text,
      },
      template: `
        <GestureDetector @click="onClick" @tap="onTap">
          <IgnorePointer :ignoring="false">
            <Container color="red" width="100" height="100" alignment="center">
              <Text data="Click Me" />
            </Container>
          </IgnorePointer>
        </GestureDetector>
      `,
      setup() {
        return {
          onClick,
          onTap,
        };
      },
    });

    // 点击 IgnorePointer 包裹的内容
    await wrapper.find(".container-box").trigger("click");

    // 预期：点击事件应该被处理，onClick 和 onTap 都应该被调用
    expect(onClick).toHaveBeenCalled();
    expect(onTap).toHaveBeenCalled();
  });

  it("should handle nested IgnorePointer correctly", async () => {
    const onClick = vi.fn();
    const onTap = vi.fn();

    const wrapper = mount({
      components: {
        GestureDetector,
        IgnorePointer,
        Container,
        Text,
      },
      template: `
        <GestureDetector @click="onClick" @tap="onTap">
          <Container color="blue" width="120" height="120" alignment="center">
            <IgnorePointer :ignoring="true">
              <Container color="red" width="100" height="100" alignment="center">
                <IgnorePointer :ignoring="false">
                  <Text data="Click Me" />
                </IgnorePointer>
              </Container>
            </IgnorePointer>
          </Container>
        </GestureDetector>
      `,
      setup() {
        return {
          onClick,
          onTap,
        };
      },
    });

    // 点击最内层的 IgnorePointer 包裹的文本
    await wrapper.find(".container-box .container-box").trigger("click");

    // 预期：外层 IgnorePointer 设为 true，所以点击事件应该被忽略
    expect(onClick).not.toHaveBeenCalled();
    expect(onTap).not.toHaveBeenCalled();
  });
});

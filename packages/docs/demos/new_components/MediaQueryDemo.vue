<template>
  <Column :gap="20">
    <Container color="#f5f5f5" :padding="EdgeInsets.all(20)">
      <Text :style="{ fontSize: 20, fontWeight: 'bold' }">Global MediaQuery</Text>
      <Text>Size: {{ mediaQuery.size.width }} x {{ mediaQuery.size.height }}</Text>
      <Text>Orientation: {{ mediaQuery.orientation }}</Text>
      <Text>Device Pixel Ratio: {{ mediaQuery.devicePixelRatio }}</Text>
      <Text>Platform Brightness: {{ mediaQuery.platformBrightness }}</Text>
      <Text>High Contrast: {{ mediaQuery.highContrast }}</Text>
      <Text>Disable Animations: {{ mediaQuery.disableAnimations }}</Text>
      <Text
        >Padding (Safe Area): Top={{ mediaQuery.padding.top }}, Bottom={{
          mediaQuery.padding.bottom
        }}</Text
      >
      <Text :style="{ color: '#666', fontSize: 12 }">Try resizing the window!</Text>
    </Container>

    <MediaQuery :data="customData">
      <Container color="#e3f2fd" :padding="EdgeInsets.all(20)">
        <Text :style="{ fontSize: 20, fontWeight: 'bold' }">Nested MediaQuery (Override)</Text>
        <Text>Simulating Landscape Tablet with Top Padding:</Text>
        <div style="margin-top: 10px; padding: 10px; border: 1px dashed #999">
          <ChildComponent />
        </div>
      </Container>
    </MediaQuery>
  </Column>
</template>

<script setup lang="ts">
import {
  Column,
  Container,
  Text,
  EdgeInsets,
  useMediaQuery,
  MediaQuery,
  Orientation,
} from "fluekit";
import { reactive, defineComponent, h } from "vue";

const mediaQuery = useMediaQuery();

const customData = reactive({
  size: { width: 1024, height: 768 },
  devicePixelRatio: 2,
  platformBrightness: "dark" as const,
  orientation: Orientation.landscape,
  disableAnimations: true,
  highContrast: false,
  padding: EdgeInsets.symmetric({ vertical: 24 }),
  viewInsets: EdgeInsets.zero,
});

// Inline child component to test injection
const ChildComponent = defineComponent({
  setup() {
    const mq = useMediaQuery();
    return () =>
      h("div", [
        h("div", `Size: ${mq.size.width} x ${mq.size.height}`),
        h("div", `Orientation: ${mq.orientation}`),
        h("div", `Animations: ${mq.disableAnimations ? "Disabled" : "Enabled"}`),
        h("div", `Padding Top: ${mq.padding.top}`),
      ]);
  },
});
</script>

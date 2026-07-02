<template>
  <div :style="rootStyle">
    <Stack :fit="StackFit.expand">
      <transition :css="false" @enter="onEnter" @leave="onLeave">
        <template v-if="open">
          <Positioned v-bind="positionStyle">
            <Container :width="width" height="100%" :decoration="decoration">
              <slot />
            </Container>
          </Positioned>
        </template>
      </transition>
      <Overlay v-bind="overlayProps" />
    </Stack>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { Positioned, StackFit } from ".";
import { BoxDecoration } from "./BoxDecoration";
import { BoxShadow } from "./BoxShadow";
import { Color } from "./Color";
import { resolveColor } from "./resolveColor";
import { Colors } from "./Colors";
import Container from "./Container.vue";
import Overlay from "./Overlay.vue";
import Stack from "./Stack.vue";
defineOptions({ inheritAttrs: false });
interface Props {
  modelValue?: boolean;
  backgroundColor?: string | Color;
  elevation?: number;
  width?: number;
  edge?: "start" | "end"; // Direction of slide
  overlayColor?: string | Color;
}

const props = withDefaults(defineProps<Props>(), {
  backgroundColor: () => Colors.white,
  elevation: 16,
  width: 320,
  edge: "start",
  overlayColor: "rgba(0, 0, 0, 0.5)",
});

const open = defineModel("open", {
  type: Boolean,
  default: false,
});
const emit = defineEmits<{ (e: "close"): void }>();
const close = () => {
  open.value = false;
  emit("close");
};
const overlayProps = computed(() => {
  return {
    zIndex: props.elevation - 1,
    color: resolveColor(props.overlayColor),
    visible: open.value,
    onTap: close,
  };
});

const decoration = computed(() => {
  return BoxDecoration({
    boxShadow: [
      BoxShadow({
        color: "rgba(0,0,0,0.2)",
        blurRadius: 10,
        offset: { x: 0, y: 8 },
        spreadRadius: -5,
      }),
      BoxShadow({
        color: "rgba(0,0,0,0.14)",
        blurRadius: 24,
        offset: { x: 0, y: 16 },
        spreadRadius: 2,
      }),
      BoxShadow({
        color: "rgba(0,0,0,0.12)",
        blurRadius: 30,
        offset: { x: 0, y: 6 },
        spreadRadius: 5,
      }),
    ],
    color: resolveColor(props.backgroundColor),
  });
});

const positionStyle = computed(() => {
  const css: Record<string, number | string> = {};
  if (props.edge === "end") {
    css.right = 0;
  } else {
    css.left = 0;
  }
  css.top = 0;
  css.bottom = 0;
  css.zIndex = props.elevation;
  return css;
});

const onEnter = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  const targetTransform = element.style.transform || "translateX(0%)";
  const startTransform = props.edge === "end" ? "translateX(100%)" : "translateX(-100%)";

  element.animate(
    [
      { transform: startTransform },
      { transform: "translateX(0%)" }, // target is 0 for both as we position with left/right: 0
    ],
    {
      duration: 300,
      easing: "ease",
    },
  ).onfinish = done;
};

const onLeave = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  const endTransform = props.edge === "end" ? "translateX(100%)" : "translateX(-100%)";

  element.animate([{ transform: "translateX(0%)" }, { transform: endTransform }], {
    duration: 300,
    easing: "ease",
  }).onfinish = done;
};

const rootStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  zIndex: 1000,
};
</script>

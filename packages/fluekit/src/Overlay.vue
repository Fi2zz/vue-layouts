<template>
  <Transition :css="false" @enter="onEnter" @leave="onLeave">
    <div v-if="visible" :style="style" @click="handleClick">
      <slot />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { Color } from "./Color";
import { resolveColor } from "./resolveColor";
import { usePositionStyle } from "./usePosition";
defineOptions({ inheritAttrs: false });
interface Props {
  visible?: boolean;
  color?: string | Color;
  zIndex?: number;
  position?: "absolute" | "fixed" | "sticky";
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  color: "rgba(0, 0, 0, 0.5)",
  zIndex: 1000,
  position: "absolute",
});
const emit = defineEmits<{ (e: "tap"): void }>();
const handleClick = () => emit("tap");
const onEnter = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  const animation = element.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 250,
    easing: "ease-in",
  });
  animation.onfinish = done;
};

const onLeave = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  const animation = element.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 250,
    easing: "ease-out",
  });
  animation.onfinish = done;
};
const position = usePositionStyle(
  computed(() => ({ inset: 0, zIndex: props.zIndex, position: props.position })),
);
const style = computed<CSSProperties>(() => {
  return {
    backgroundColor: resolveColor(props.color),
    ...position.value,
    pointerEvents: "auto",
    cursor: "auto",
  };
});
</script>

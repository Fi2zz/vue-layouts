<template>
  <div :class="{ disabled: disabled }" @click="handleClick" v-bind="$attrs" :style="containerStyle">
    <slot />
    <TransitionGroup :css="false" @enter="onRippleEnter">
      <span v-for="ripple in ripples" :key="ripple.id" :style="ripple.style" />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type CSSProperties } from "vue";
import { Color } from "./Color";
import { resolveColor } from "./resolveColor";
defineOptions({ inheritAttrs: false });
interface Props {
  splashColor?: string | Color;
  highlightColor?: string | Color;
  borderRadius?: string; // CSS border-radius
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  splashColor: "rgba(0, 0, 0, 0.1)",
  disabled: false,
});
const emit = defineEmits<{ (e: "tap"): void }>();
interface Ripple {
  id: number;
  style: CSSProperties;
}

const ripples = ref<Ripple[]>([]);
let rippleCount = 0;

const containerStyle = computed<CSSProperties>(() => ({
  position: "relative",
  overflow: "hidden",
  cursor: props.disabled ? "default" : "pointer",
  display: "block",
  borderRadius: props.borderRadius,
}));

const handleClick = (e: MouseEvent) => {
  if (props.disabled) return;
  emit("tap");
  const el = e.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  const id = rippleCount++;
  const style: CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    top: `${y}px`,
    left: `${x}px`,
    backgroundColor: resolveColor(props.splashColor) || "rgba(0,0,0,0.1)",
    position: "absolute",
    borderRadius: "50%",
    pointerEvents: "none",
    transform: "scale(0)", // Initial state
  };

  ripples.value.push({ id, style });

  // Remove ripple after animation (slightly longer than 600ms to be safe, or rely on animation finish)
  // But since we manage the list manually, we need to remove it.
  setTimeout(() => {
    ripples.value = ripples.value.filter((r) => r.id !== id);
  }, 600);
};

const onRippleEnter = (el: Element, done: () => void) => {
  const animation = (el as HTMLElement).animate(
    [
      { transform: "scale(0)", opacity: 1 },
      { transform: "scale(4)", opacity: 0 },
    ],
    {
      duration: 600,
      easing: "linear",
    },
  );
  animation.onfinish = done;
};
</script>

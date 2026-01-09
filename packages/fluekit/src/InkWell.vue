<template>
  <div class="ink-well" :class="{ disabled: disabled }" @click="handleClick" v-bind="$attrs">
    <slot />
    <span v-for="ripple in ripples" :key="ripple.id" class="ripple" :style="ripple.style" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({ inheritAttrs: false });

interface Props {
  onTap?: () => void;
  splashColor?: string;
  highlightColor?: string;
  borderRadius?: string; // CSS border-radius
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  splashColor: "rgba(0, 0, 0, 0.1)",
  disabled: false,
});

const emit = defineEmits<{
  (e: "tap"): void;
}>();

interface Ripple {
  id: number;
  style: Record<string, string>;
}

const ripples = ref<Ripple[]>([]);
let rippleCount = 0;

const handleClick = (e: MouseEvent) => {
  if (props.disabled) return;
  emit("tap");

  const el = e.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  const id = rippleCount++;
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    top: `${y}px`,
    left: `${x}px`,
    backgroundColor: props.splashColor,
  };

  ripples.value.push({ id, style });

  // Remove ripple after animation
  setTimeout(() => {
    ripples.value = ripples.value.filter((r) => r.id !== id);
  }, 600);
};
</script>

<style scoped>
.ink-well {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  /* Ensure it behaves like a container */
  display: block;
}

.ink-well.disabled {
  cursor: default;
}

.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 0.6s linear;
  pointer-events: none;
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
</style>

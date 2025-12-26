<template>
  <div
    class="fluekit-text-field"
    :class="{
      'is-focused': isFocused,
      'is-disabled': !enabled,
      'has-error': !!decoration?.errorText,
    }"
  >
    <!-- Label -->
    <label
      v-if="decoration?.labelText"
      class="fluekit-input-label"
      :class="{ 'is-floating': isFloating }"
      :style="labelStyle"
    >
      {{ decoration.labelText }}
    </label>

    <!-- Input Container -->
    <div class="fluekit-input-container" :style="containerStyle">
      <!-- Prefix -->
      <div
        v-if="$slots.prefix || decoration?.prefixText"
        class="fluekit-input-prefix"
        ref="prefixRef"
      >
        <slot name="prefix">{{ decoration?.prefixText }}</slot>
      </div>

      <!-- Input Element -->
      <component
        :is="isMultiline ? 'textarea' : 'input'"
        ref="inputRef"
        class="fluekit-input-element"
        :value="modelValue"
        :disabled="!enabled"
        :readonly="readOnly"
        :type="inputType"
        :placeholder="placeholderText"
        :rows="minLines || 1"
        :style="inputStyle"
        v-bind="$attrs"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- Suffix -->
      <div v-if="$slots.suffix || decoration?.suffixText" class="fluekit-input-suffix">
        <slot name="suffix">{{ decoration?.suffixText }}</slot>
      </div>
    </div>

    <!-- Helper/Error Text -->
    <div
      v-if="decoration?.errorText || decoration?.helperText"
      class="fluekit-input-helper"
      :class="{ 'is-error': !!decoration?.errorText }"
    >
      {{ decoration?.errorText || decoration?.helperText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  useSlots,
  onMounted,
  onBeforeUnmount,
  type CSSProperties,
  type StyleValue,
} from "vue";
import {
  type InputDecoration,
  type InputBorder,
  OutlineInputBorder,
  UnderlineInputBorder,
} from "./InputDecoration";
import { type TextStyle, toCSSStyle as textStyleToCSS } from "./TextStyle";
import { BorderSide, borderSideToStyle } from "./Border";
import { BorderRadius, borderRadiusToStyle } from "./BorderRadius";

defineOptions({ inheritAttrs: false });

interface Props {
  modelValue?: string | number;
  decoration?: InputDecoration;
  enabled?: boolean;
  readOnly?: boolean;
  obscureText?: boolean;
  maxLines?: number | null; // 1 = input, >1 or null = textarea
  minLines?: number;
  keyboardType?: string; // 'text', 'number', 'email', 'multiline', etc.
  style?: TextStyle; // Text style
  cursorColor?: string;
  autofocus?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  enabled: true,
  readOnly: false,
  obscureText: false,
  maxLines: 1,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "focus", event: FocusEvent): void;
  (e: "blur", event: FocusEvent): void;
  (e: "submit", value: string): void;
}>();

const inputRef = ref<HTMLInputElement | HTMLTextAreaElement | null>(null);
const isFocused = ref(false);
const prefixRef = ref<HTMLElement | null>(null);
const prefixWidth = ref(0);
let _ro: ResizeObserver | null = null;

onMounted(() => {
  if (prefixRef.value) {
    _ro = new ResizeObserver(() => {
      prefixWidth.value = Math.round(prefixRef.value!.getBoundingClientRect().width);
    });
    _ro.observe(prefixRef.value);
    prefixWidth.value = Math.round(prefixRef.value.getBoundingClientRect().width);
  }
});

onBeforeUnmount(() => {
  if (_ro) {
    _ro.disconnect();
    _ro = null;
  }
});

const isMultiline = computed(() => {
  return props.maxLines === null || props.maxLines > 1 || props.keyboardType === "multiline";
});

const inputType = computed(() => {
  if (isMultiline.value) return undefined; // textarea doesn't need type
  if (props.obscureText) return "password";
  return props.keyboardType === "number" ? "number" : "text"; // Simplified
});

const isFloating = computed(() => {
  return (
    isFocused.value ||
    (props.modelValue !== "" && props.modelValue !== null && props.modelValue !== undefined)
  );
});

// When label is present and not floating, hide hint to avoid overlap with label.
const placeholderText = computed(() => {
  if (props.decoration?.labelText && !isFloating.value) return "";
  return props.decoration?.hintText || "";
});

// Styles
const currentBorder = computed<InputBorder | undefined>(() => {
  if (props.decoration?.errorText && props.decoration.errorBorder)
    return props.decoration.errorBorder;
  if (!props.enabled && props.decoration?.disabledBorder) return props.decoration.disabledBorder;
  if (isFocused.value && props.decoration?.focusedBorder) return props.decoration.focusedBorder;
  if (props.enabled && props.decoration?.enabledBorder) return props.decoration.enabledBorder;
  return props.decoration?.border; // Default fallback
});

const containerStyle = computed<CSSProperties>(() => {
  const css: CSSProperties = {
    display: "flex",
    alignItems: isMultiline.value ? "flex-start" : "center",
    position: "relative",
    transition: "all 0.2s ease",
  };

  // Border logic
  const border = currentBorder.value || UnderlineInputBorder(); // Default to Underline if not specified? Or maybe none?
  // Flutter defaults to Underline in Material.

  if (border.isOutline) {
    // Outline border logic
    const side = border.borderSide || BorderSide({ width: 1, color: "#888" });
    const radius = border.borderRadius || BorderRadius.all(4);
    Object.assign(css, borderSideToStyle(side));
    Object.assign(css, borderRadiusToStyle(radius));
    // Override border style to specific key if borderSideToStyle returns generic 'border'
    // Actually borderSideToStyle returns 'border: 1px solid color'.

    // Padding
    css.padding = "8px 12px";
  } else {
    // Underline logic
    const side = border.borderSide || BorderSide({ width: 1, color: "#888" });
    css.borderBottom = `${side.width}px ${side.style || "solid"} ${side.color}`;
    css.borderRadius = "0"; // No radius for underline usually
    css.padding = "4px 0";
  }

  // Background
  if (props.decoration?.filled) {
    css.backgroundColor = props.decoration.fillColor || "#f0f0f0";
  }

  return css;
});

const inputStyle = computed<CSSProperties>(() => {
  const css: CSSProperties = {
    ...textStyleToCSS(props.style),
  };
  if (props.cursorColor) {
    css.caretColor = props.cursorColor;
  }
  return css;
});

const labelStyle = computed<CSSProperties>(() => {
  const css: CSSProperties = {
    position: "absolute",
    left: `${(currentBorder.value?.isOutline ? 12 : 0) + (prefixWidth.value || 0)}px`,
    top: currentBorder.value?.isOutline ? "50%" : "0", // Center vertically initially
    transform: "translateY(-50%)",
    pointerEvents: "none",
    transition: "all 0.2s ease",
    color: "#666",
    ...textStyleToCSS(props.decoration?.labelStyle),
  };

  if (isFloating.value) {
    css.top = "0";
    css.transform = "translateY(-100%) scale(0.75)";
    css.transformOrigin = "left bottom";
    if (isFocused.value) {
      css.color = "#2196F3"; // Active color
    }
  }

  return css;
});

// Events
const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};

const handleFocus = (e: FocusEvent) => {
  isFocused.value = true;
  emit("focus", e);
};

const handleBlur = (e: FocusEvent) => {
  isFocused.value = false;
  emit("blur", e);
};
</script>

<style scoped>
.fluekit-text-field {
  position: relative;
  margin-top: 16px; /* Space for floating label */
  font-family: inherit;
}

.fluekit-input-container {
  /* Defined in dynamic style */
  width: 100%;
  box-sizing: border-box;
}

.fluekit-input-element {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: 16px;
  color: inherit;
  resize: none; /* Handle via auto-grow or maxLines */
}

.fluekit-input-label {
  /* Defined in dynamic style */
  z-index: 1;
}

.fluekit-input-helper {
  font-size: 12px;
  margin-top: 4px;
  color: #666;
}

.fluekit-input-helper.is-error {
  color: #f44336;
}
</style>

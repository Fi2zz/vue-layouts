<script setup lang="ts">
import { computed, type CSSProperties, nextTick, onMounted, ref, useSlots, watch } from "vue";
import Container from "./Container.vue";
import IconButton from "./IconButton.vue";
import { Icons } from "./Icons";
import Row from "./Row.vue";
// import GestureDetector from "./GestureDetector.vue";
import { CupertinoColors } from "@fluekit/presets";
import { Border, BorderSide } from "./Border";
import { BorderRadius } from "./BorderRadius";
import { BoxDecoration } from "./BoxDecoration";
import { Color } from "./Color";
import { EdgeInsets, paddingToStyle } from "./EdgeInsets";
import { resolveColor } from "./resolveColor";
// import { CupertinoColors } from "./CupertinoColors";
import { Alignment, ButtonStyle, StyleProvider } from ".";
import { BoxConstraints } from "./BoxConstraints";
import { OverlayVisibilityMode } from "./OverlayVisibilityMode";
import { FontWeight, TextAlign, TextStyle, textStyleToStyle } from "./TextStyle";
import { px2vw } from "./px2vw";
import Expanded from "./Expanded.vue";

defineOptions({ inheritAttrs: false });

export interface CupertinoTextFieldProps {
  // Value
  modelValue?: string | number;
  // Appearance
  placeholder?: string;
  // Clear button
  clearButtonMode?: OverlayVisibilityMode;
  suffixMode?: OverlayVisibilityMode;
  prefixMode?: OverlayVisibilityMode;
  // Border style
  borderStyle?: "roundedRect" | "line" | "none";

  // Colors
  backgroundColor?: string | Color;
  disabledColor?: string | Color;
  cursorColor?: string | Color;

  // Dimensions
  width?: number | string;
  height?: number | string;
  padding?: EdgeInsets;
  constraints?: BoxConstraints;

  // Behavior
  disabled?: boolean;
  readOnly?: boolean;
  obscureText?: boolean;
  autofocus?: boolean;

  // Text input
  maxLines?: number | null;
  minLines?: number;
  maxLength?: number;
  textAlign?: "left" | "center" | "right" | "justify" | "start" | "end";
  textCapitalization?: "none" | "sentences" | "words" | "characters";

  // Web Native Props
  keyboardType?: string; // inputmode
  textInputAction?: string; // enterkeyhint

  autocorrect?: boolean;
  autocomplete?: string;
  // Style
  style?: TextStyle;
  placeholderStyle?: TextStyle;
  decoration?: BoxDecoration;
}

export type CupertinoTextFieldEmits = {
  (e: "update:modelValue", value: string | number): void;
  (e: "change", value: string | number): void;
  (e: "focus", event: FocusEvent): void;
  (e: "blur", event: FocusEvent): void;
  (e: "submit", value: string): void;
  (e: "clear"): void;
};
const kDefaultDecoration: CSSProperties = {
  backgroundColor: "#ffffff",
  border: "1px solid #d1d1d6", // iOS Gray 4
  borderRadius: "5px",
};

const kDefaultPlaceholderStyle: CSSProperties = {
  fontWeight: 400,
  color: "#c7c7cc", // CupertinoColors.placeholderText
  // We need to match the input's default font styles if not overridden
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  fontSize: "17px",
};

const props = withDefaults(defineProps<CupertinoTextFieldProps>(), {
  modelValue: "",
  disabled: false,
  readOnly: false,
  obscureText: false,

  maxLines: 1,
  minLines: 1,
  autofocus: false,
  autocorrect: true,
  autocomplete: "off",
  textAlign: TextAlign.left,
  textCapitalization: "sentences",

  borderStyle: "roundedRect",
  padding: () => EdgeInsets.all(7),
  // clearButtonMode: "never",
  backgroundColor: () => CupertinoColors.systemBackground,
  disabledColor: () => CupertinoColors.systemGrey6,
  cursorColor: () => CupertinoColors.activeBlue,
  width: "100%",
  prefixMode: OverlayVisibilityMode.always,
  suffixMode: OverlayVisibilityMode.always,
  clearButtonMode: OverlayVisibilityMode.never,
});

const slots = useSlots();
const emit = defineEmits<CupertinoTextFieldEmits>();
const model = computed({
  get: () => props.modelValue ?? "",
  set: (value: string | number) => emit("update:modelValue", value),
});

// Refs
const inputRef = ref<HTMLInputElement | HTMLTextAreaElement | null>(null);
const isFocused = ref(false);

// Computed
const isMultiline = computed(() => {
  return props.maxLines !== 1 && props.maxLines !== null;
});

const inputType = computed(() => {
  if (isMultiline.value) return undefined;
  if (props.obscureText) return "password";
  return "text";
});

const hasText = computed(() => {
  return model.value != null && model.value != undefined && String(model.value).length > 0;
});

const showPlaceholder = computed(() => {
  return !hasText.value && !isFocused.value;
});

const isEditting = computed(() => {
  return hasText.value && isFocused.value;
});

function shouldShowAttachment(mode: string) {
  switch (mode) {
    case OverlayVisibilityMode.never:
      return false;
    case OverlayVisibilityMode.always:
      return true;
    case OverlayVisibilityMode.editing:
      return hasText.value;
    case OverlayVisibilityMode.notEditing:
      return !hasText.value;
    default:
      return false;
  }
}

const showClearButton = computed(() => {
  if (showSuffix.value) return false;

  switch (props.clearButtonMode) {
    case OverlayVisibilityMode.never:
      return false;
    case OverlayVisibilityMode.always:
      return true;
    case OverlayVisibilityMode.editing:
      return isEditting.value;
    case OverlayVisibilityMode.notEditing:
      return !isEditting.value;
    default:
      return false;
  }
});

const showSuffix = computed(() => {
  if (!slots.suffix) return false;
  return shouldShowAttachment(props.suffixMode);
});

const showPrefix = computed(() => {
  if (!slots.prefix) return false;
  return shouldShowAttachment(props.prefixMode);
});
// Auto-grow for multiline
const autoGrow = () => {
  const el = inputRef.value as HTMLTextAreaElement | null;
  if (!el || !isMultiline.value) return;
  const cs = window.getComputedStyle(el);
  const lh = parseFloat(cs.lineHeight || "0") || parseFloat(cs.fontSize || "17") * 1.2;
  const min = (props.minLines || 1) * lh;

  el.style.minHeight = `${Math.round(min)}px`;
  if (props.maxLines && props.maxLines > 1) {
    const max = props.maxLines * lh;
    el.style.maxHeight = `${Math.round(max)}px`;
  } else {
    el.style.maxHeight = "";
  }
  el.style.height = "auto";
  el.style.height = `${Math.max(Math.round(min), el.scrollHeight)}px`;
};

onMounted(() => {
  nextTick(autoGrow);
  if (props.autofocus) {
    inputRef.value?.focus();
  }
});

watch(
  () => model.value,
  () => nextTick(autoGrow),
);

// Container decoration
const containerDecoration = computed(() => {
  if (props.decoration) return;
  const bgColor = props.disabled ? props.backgroundColor : props.disabledColor;
  const baseDecoration = BoxDecoration({ color: bgColor });
  if (props.borderStyle === "none") return baseDecoration;

  const borderSide = BorderSide({
    color: isFocused.value ? "transparent" : CupertinoColors.separator,
    width: 1,
  });
  if (props.borderStyle === "line")
    return baseDecoration.copyWith({ border: Border.only({ bottom: borderSide }) });
  return baseDecoration.copyWith({
    borderRadius: BorderRadius.all(8),
    border: Border.all(borderSide),
  });
});

const baseFontSize = 17;
const baseFontColor = computed(() => {
  return props.style?.color
    ? typeof props.style.color === "string"
      ? props.style.color
      : props.style.color.toString()
    : CupertinoColors.label.toString();
});

const inputWrapperStyle = computed<CSSProperties>(() => ({
  flex: 1,
  position: "relative",
  display: "flex",
  alignItems: isMultiline.value ? "flex-start" : "center",
  flexShrink: 0,
  height: "100%",
  minWidth: 0,
}));

const sharedTextStyle = computed<CSSProperties>(() => {
  return {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    textAlign: props.textAlign,
    whiteSpace: isMultiline.value ? "pre-wrap" : "nowrap",
    overflow: "hidden",
    // minHeight: isMultiline.value ? 0 : "1.3em",
    textOverflow: "ellipsis",
  } as CSSProperties;
});

const inputElementStyle = computed<CSSProperties>(() => {
  const cursorColor = resolveColor(props.cursorColor);
  const style: CSSProperties = {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    margin: 0,
    lineHeight: `var(--fluekit-line-height, normal)`,
    resize: "none",
    fontSize: `${px2vw(baseFontSize)}`,
    width: "100%",
    color: props.disabled ? baseFontColor.value : CupertinoColors.tertiaryLabel.toString(),
    caretColor: cursorColor,
    overflow: isMultiline.value ? "hidden" : undefined,
  };
  return Object.assign(style, sharedTextStyle.value, textStyleToStyle(props.style));
});

const placeholderStyle = computed<CSSProperties>(() => {
  const fontSize = px2vw(props.placeholderStyle?.fontSize ?? baseFontSize);
  const style: CSSProperties = {
    ...sharedTextStyle.value,
    position: "absolute",
    top: 0,
    left: 0,
    pointerEvents: "none",
    fontSize,
    height: "100%",
    display: "flex",
    alignItems: isMultiline.value ? "flex-start" : "center",
    ...kDefaultPlaceholderStyle,
    textAlign: props.textAlign,
    ...textStyleToStyle(props.placeholderStyle),
    lineHeight: inputElementStyle.value.lineHeight,
  };

  return style;
});

const clearIconSize = 18;
// const clearButtonIconSize = 16;
const clearButtonColor = CupertinoColors.systemGrey2.toString();
// Event handlers
const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  model.value = target.value;
  nextTick(autoGrow);
};
const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("change", target.value);
};

const handleFocus = (e: FocusEvent) => {
  isFocused.value = true;
  emit("focus", e);
};

const handleBlur = (e: FocusEvent) => {
  isFocused.value = false;
  emit("blur", e);
};

const handleClear = () => {
  model.value = "";
  emit("clear");
  inputRef.value?.focus();
};

// Expose
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select(),
});

const rootContainer = computed(() => {
  return {
    width: props.width,
    height: props.height,
    decoration: containerDecoration.value,
    alignment: isMultiline.value ? Alignment.topLeft : Alignment.center,
    padding: props.padding,
    // minHeight: isMultiline.value ? 0 : "1.3em",
    // constraints: BoxConstraints({
    //   minHeight: isMultiline.value ? 0 : "1.3em",
    // }),
  };
});

const containerStyleProvider = computed<CSSProperties>(() => {
  const outlineColor = isFocused.value ? CupertinoColors.activeBlue : "transparent";
  return {
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    outline: `2px solid ${outlineColor}`,
    overflow: "auto",
    boxShadow: isFocused.value
      ? `
    0 0 0 3px rgba(0, 122, 255, 0.15),  /* 柔和外扩 */
    0 0 0 6px rgba(0, 122, 255, 0.05);  /* 极淡外层 */`
      : "none",
  };
});

const clearButtonStyle = ButtonStyle({
  padding: EdgeInsets.symmetric({ horizontal: 6 }),
});
// isFocused.value = true;
</script>

<template>
  <StyleProvider :style="containerStyleProvider">
    <Container v-bind="rootContainer">
      <Row expanded :gap="6">
        <Row main-axis-size="min" v-if="showPrefix">
          <slot name="prefix"> </slot>
        </Row>
        <div :style="inputWrapperStyle">
          <div v-if="showPlaceholder" :style="placeholderStyle">{{ placeholder }}</div>
          <component
            :is="isMultiline ? 'textarea' : 'input'"
            ref="inputRef"
            :value="model"
            :disabled="disabled"
            :readonly="readOnly"
            :type="inputType"
            :rows="minLines || 1"
            :style="inputElementStyle"
            :maxlength="maxLength"
            :autocapitalize="textCapitalization"
            :autocorrect="autocorrect ? 'on' : 'off'"
            :autocomplete="autocomplete"
            :inputmode="keyboardType"
            :enterkeyhint="textInputAction"
            @input="handleInput"
            @change="handleChange"
            @focus="handleFocus"
            @blur="handleBlur"
          />
        </div>
        <Row main-axis-size="min" v-if="showClearButton || showSuffix">
          <IconButton
            v-if="showClearButton"
            :icon="Icons.closeFilled"
            :color="clearButtonColor"
            :style="clearButtonStyle"
            :icon-size="clearIconSize"
            @pressed="handleClear"
          />
          <slot name="suffix" v-if="showSuffix"> </slot>
        </Row>
      </Row>
    </Container>
  </StyleProvider>
</template>

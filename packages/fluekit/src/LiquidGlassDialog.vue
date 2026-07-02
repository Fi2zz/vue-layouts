<template>
  <Teleport to="body">
    <Transition :css="false" @enter="onFadeEnter" @leave="onFadeLeave">
      <div :style="dialogOverlayStyle" v-if="modelValue">
        <Transition :css="false" @enter="onScaleEnter" @leave="onScaleLeave">
          <div :style="liquidGlassDialogStyle" @click.stop v-if="modelValue">
            <div style="position: relative; z-index: 2">
              <Container :padding="contentPadding">
                <div v-if="icon" :style="iconContainerStyle">
                  <Image v-if="isImageProvider(icon)" :image="icon" :width="48" :height="48" />
                  <Icon
                    v-else
                    :icon="resolvedIcon"
                    :size="48"
                    :color="mediaQuery.platformBrightness === 'dark' ? '#ffffff' : '#000000'"
                  />
                </div>
                <Text :style="titleStyle" tag="h3" v-if="title">{{ title }}</Text>
                <Text :style="messageStyle" tag="p" v-if="message" :data="message"></Text>
              </Container>
              <StyleProvider :style="{ padding: '0 12px 12px' }">
                <FlexBox :direction="direction" :gap="actionsGap">
                  <Button
                    v-for="(action, index) in actions"
                    :key="index"
                    :style="getActionButtonStyle(action)"
                    @pressed="handleAction(action, index)"
                    :text="action.title"
                  />
                </FlexBox>
              </StyleProvider>
            </div>
            <div :style="backdropStyle"></div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ComputedRef, CSSProperties, type Component } from "vue";
import { Alignment } from "./Alignment";
import { defineKeyframes } from "./Animator";
import { BorderRadius } from "./BorderRadius";
import { BoxDecoration, boxDecorationToStyle } from "./BoxDecoration";
import { BlurStyle, BoxShadow } from "./BoxShadow";
import Button from "./Button.vue";
import { ButtonStyle } from "./ButtonStyle";
import Container from "./Container.vue";
import { EdgeInsets, paddingToStyle } from "./EdgeInsets";
import FlexBox from "./FlexBox.vue";
import { ImageFilter } from "./ImageFilter";
import { StyleProvider } from "./StyleProvider";
import Text from "./Text.vue";
import Icon from "./Icon.vue";
import { Icons } from "./Icons";
import { CupertinoIcons } from "./CupertinoIcons";
import { FontWeight, TextAlign, TextStyle } from "./TextStyle";
import { useMediaQuery } from "./useMediaQuery";
import { useZIndex } from "./usePosition";
import { isIOS, isIPad, isMacOS } from "./device";
import { px2vw } from "./px2vw";
import Image from "./Image.vue";
import { CupertinoColors } from "./CupertinoColors";
import { isImageProvider, type ImageProvider } from "./ImageProvider";
export type LiquidGlassDialogActionStyle = "default" | "primary" | "destructive";
defineOptions({ inheritAttrs: false });
export interface LiquidGlassDialogAction {
  title: string;
  style?: LiquidGlassDialogActionStyle;
  keepOpen?: boolean;
  // support  async function
  onPressed?: (action: LiquidGlassDialogAction) => void | Promise<void>;
  [key: string]: unknown;
}

export interface LiquidGlassDialogActionPayload {
  action: LiquidGlassDialogAction;
  index: number;
}

export interface LiquidGlassDialogExpose {
  close: () => void;
}
export interface LiquidGlassDialogProps {
  modelValue: boolean;
  title?: string;
  message?: string;
  actions: LiquidGlassDialogAction[];
  alignment?: Alignment;
  icon?: ImageProvider | Component | string;
}
const props = withDefaults(defineProps<LiquidGlassDialogProps>(), {
  title: "",
  message: "",
  alignment: Alignment.centerLeft,
  actions: () => [],
});
const direction = computed(() => {
  if (props.actions.length == 2) return "row";
  return "column";
});
const actionsGap = computed(() => {
  if (isMacOS) return "16px";
  if (isIPad) return "12px";
  if (isIOS) return "12px";
  const w = mediaQuery.size.width;
  if (w >= 1024) return "12px";
  if (w >= 600) return "12px";
  return "8px";
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "action", payload: LiquidGlassDialogActionPayload): void;
  (e: "close"): void;
  (e: "afterClose"): void;
}>();
const close = (): void => {
  emit("update:modelValue", false);
  emit("close");
};

defineExpose<LiquidGlassDialogExpose>({ close });
const handleAction = async (action: LiquidGlassDialogAction, index: number) => {
  const payload: LiquidGlassDialogActionPayload = { action, index };
  if (typeof action.onPressed === "function") {
    try {
      await action.onPressed(action);
      if (!action.keepOpen) close();
      return;
    } catch (error) {}
    return;
  }
  emit("action", payload);

  if (!action.keepOpen) close();
};

const resolvedIcon = computed(() => {
  if (!props.icon) return null;
  if (typeof props.icon === "string") {
    // Check built-in icons
    if (props.icon in Icons) {
      return (Icons as any)[props.icon];
    }
    if (props.icon in CupertinoIcons) {
      return (CupertinoIcons as any)[props.icon];
    }
  }
  return props.icon;
});

const iconContainerStyle = computed<CSSProperties>(() => {
  return {
    display: "flex",
    // justifyContent: 'sta',
    marginBottom: px2vw(16),
  };
});

const contentPadding = EdgeInsets.only({
  top: "22PX",
  bottom: "20PX",
  left: "20PX",
  right: "20PX",
});

const mediaQuery = useMediaQuery();
const titleStyle = computed(() => {
  const w = mediaQuery.size.width;
  let fs: number;
  if (isMacOS) {
    fs = 14;
  } else if (isIOS || isIPad) {
    fs = 17;
  } else {
    fs = w >= 1024 ? 21 : w >= 600 ? 19 : 17;
  }
  return TextStyle({
    fontSize: fs + "PX",
    fontWeight: 600,
    height: `${1.35 * fs}PX`,
    letterSpacing: -0.4,
    color: mediaQuery.platformBrightness === "dark" ? "#ffffff" : "#000000",
  });
});

const messageStyle = computed(() => {
  const w = mediaQuery.size.width;
  let fs: number;
  if (isMacOS) {
    fs = 14;
  } else if (isIOS || isIPad) {
    fs = 14;
  } else {
    fs = w >= 1024 ? 16 : w >= 600 ? 15 : 13;
  }
  return TextStyle({
    fontSize: fs + "PX",
    fontWeight: 600,
    height: `${1.35 * fs}px`,
    letterSpacing: "-0.4PX",
    color: mediaQuery.platformBrightness === "dark" ? "#a1a1a6" : "#6b6b6b",
  });
});

function getActionButtonStyle(action: LiquidGlassDialogAction): ButtonStyle {
  let backgroundColor;
  let textColor;
  switch (mediaQuery.platformBrightness) {
    case "light":
      textColor =
        action.style == "primary"
          ? CupertinoColors.white
          : action.style == "destructive"
            ? CupertinoColors.destructiveRed
            : CupertinoColors.black;
      backgroundColor =
        action.style == "primary" ? CupertinoColors.activeBlue : "rgba(120, 120, 128, 0.16)";
      break;
    case "dark":
      textColor =
        action.style == "destructive" ? CupertinoColors.destructiveRed : CupertinoColors.white;
      backgroundColor =
        action.style == "primary" ? CupertinoColors.activeBlue : "rgba(120, 120, 128, 0.24)";
      break;
  }
  const w = mediaQuery.size.width;
  let fontSize: number;
  let verticalPad = "12PX";
  let horizontalPad = "16PX";
  if (isMacOS) {
    fontSize = 14;
    verticalPad = "10PX"; //"10PX";
    horizontalPad = "14PX"; //"14PX";
  } else if (isIPad) {
    fontSize = 15;
    verticalPad = "14PX"; //"14PX";
    horizontalPad = "20PX"; // "20PX";
  } else if (isIOS) {
    fontSize = 15;
    verticalPad = "12PX"; // "12PX";
    horizontalPad = "16PX"; // "16PX";
  } else {
    const base = direction.value == "row" ? 15 : 16;
    fontSize = w >= 1024 ? base + 3 : w >= 600 ? base + 2 : base;
    verticalPad = w >= 1024 ? "14PX" : w >= 600 ? "13PX" : "12PX";
    horizontalPad = w >= 1024 ? "20PX" : w >= 600 ? "18PX" : "16PX";
  }
  const fontWeight = action.style == "primary" ? FontWeight.w500 : FontWeight.w400;
  return ButtonStyle({
    alignment: "center",
    textAlign: TextAlign.center,
    backgroundColor: backgroundColor,
    padding: EdgeInsets.symmetric({ vertical: verticalPad, horizontal: horizontalPad }),
    textStyle: TextStyle({
      fontSize: fontSize + "PX",
      height: `${1.35 * fontSize}PX`,
      color: textColor,
      fontWeight,
    }),
    shape: BorderRadius.circular("100PX"),
    flex: "1 1 0%",
  });
}

const backdropStyle = computed(() => {
  const decoration = boxDecorationToStyle(
    BoxDecoration({
      boxShadow: [
        BoxShadow({
          color:
            mediaQuery.platformBrightness === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.25)",
          offset: { x: 0, y: 25 },
          blurRadius: 50,
          spreadRadius: -12,
        }),
        BoxShadow({
          color:
            mediaQuery.platformBrightness === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(255, 255, 255, 0.4)",
          offset: { x: 0, y: 0 },
          blurRadius: 0,
          spreadRadius: 0.5,
          blurStyle: BlurStyle.inner,
        }),
      ],
      color:
        mediaQuery.platformBrightness === "dark"
          ? "rgba(40, 40, 42, 0.85)"
          : "rgba(245, 245, 247, 0.82)",
      backdropFilter: `${ImageFilter.blur({ sigmaY: 25 })} ${ImageFilter.saturate("180%")}`,
    }),
  );
  return Object.assign(decoration, { position: "absolute", inset: 0, zIndex: 0 });
});

defineKeyframes("liquid-glass-dialog-enter", {
  from: { transform: "scale(0.85) translateY(10px)", opacity: 0 },
  to: { opacity: 1, transform: "scale(1) translateY(0)" },
});
const overlayZIndex = useZIndex();
const dialogOverlayStyle: ComputedRef<CSSProperties> = computed(() => {
  const w = mediaQuery.size.width;
  let padding: CSSProperties = {};
  if (isIOS) {
    padding = paddingToStyle({ vertical: 40, horizontal: 20 });
  } else if (isIPad) {
    padding = paddingToStyle({ vertical: 80, horizontal: 32 });
  } else if (isMacOS) {
    padding = paddingToStyle({ vertical: 64, horizontal: 32 });
  } else if (w >= 600 && w < 1024) {
    padding = paddingToStyle({ vertical: 64, horizontal: 24 });
  } else if (w >= 1024) {
    padding = paddingToStyle({ vertical: 80, horizontal: 32 });
  } else {
    padding = paddingToStyle({
      vertical: 40,
      horizontal: 20,
    });
  }
  return {
    position: "fixed",
    inset: 0,
    zIndex: overlayZIndex,
    pointerEvents: "auto",
    cursor: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0, 0, 0, 0.25)",
    backdropFilter: "blur(3px)",
    ...padding,
    width: "100%",
    height: "100%",
  };
});
const liquidGlassDialogStyle: ComputedRef<CSSProperties> = computed(() => {
  const w = mediaQuery.size.width;
  let maxWidth = "400px";
  let corner = "32px";
  if (isIOS) {
    maxWidth = "400px";
    corner = "32px";
  } else if (isIPad) {
    maxWidth = "560px";
    corner = "36px";
  } else if (isMacOS) {
    maxWidth = "520px";
    corner = "24px";
  } else if (w >= 600 && w < 1024) {
    maxWidth = "560px";
    corner = "32px";
  } else if (w >= 1024) {
    maxWidth = "640px";
    corner = "28px";
  } else {
    maxWidth = "400px";
    corner = "32px";
  }
  return {
    position: "relative",
    maxWidth: px2vw(maxWidth),
    borderRadius: px2vw(corner),
    overflow: "hidden",
    width: "100%",
    animation: "liquid-glass-dialog-enter 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
  };
});
const onFadeEnter = (el: Element, done: () => void) => {
  const animation = el.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 250,
    easing: "ease",
    fill: "both",
  });
  animation.onfinish = () => done();
};

const onFadeLeave = (el: Element, done: () => void) => {
  const animation = el.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 250,
    easing: "ease",
    fill: "both",
  });
  animation.onfinish = () => {
    done();
    emit("afterClose");
  };
};

const onScaleEnter = (el: Element, done: () => void) => {
  const animation = el.animate(
    [
      { opacity: 0, transform: "scale(0.85) translateY(10px)" },
      { opacity: 1, transform: "scale(1) translateY(0)" },
    ],
    {
      duration: 350,
      easing: "cubic-bezier(0.32, 0.72, 0, 1)",
      fill: "both",
    },
  );

  animation.onfinish = () => done();
};

const onScaleLeave = (el: Element, done: () => void) => {
  const animation = el.animate(
    [
      { opacity: 1, transform: "scale(1) translateY(0)" },
      { opacity: 0, transform: "scale(0.85) translateY(10px)" },
    ],
    {
      duration: 200,
      easing: "ease-in",
      fill: "both",
    },
  );

  animation.onfinish = () => done();
};
</script>

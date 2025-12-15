<template>
  <div :style="containerStyle" :class="rootClass">
    <div v-if="$slots.header" class="scroll-view-header">
      <slot name="header"></slot>
    </div>

    <div
      ref="scrollContainer"
      :class="containerClass"
      :style="computedStyle"
      @scroll="handleScroll">
      <div :style="contentStyle" class="scroll-view__content">
        <slot />
      </div>
    </div>
    <slot v-if="$slots.body" name="body"></slot>
    <div v-if="$slots.footer" class="scroll-view-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { px2vw } from "@/px2vw";
import { computed, onUnmounted, ref, useAttrs, CSSProperties } from "vue";
import type { EdgeInsets } from "@/EdgeInsets";
type Style = CSSProperties;

interface Props {
  /** 滚动方向：'vertical' 垂直滚动 | 'horizontal' 水平滚动 */
  scrollDirection?: "vertical" | "horizontal";
  reverse?: boolean;
  padding?: EdgeInsets;
  physics?: "bouncing" | "clamping" | "never" | "always";
  clipBehavior?: "none" | "hardEdge" | "antiAlias" | "hard-edge" | "anti-alias";
  /** 容器宽度，支持数字（px）或字符串（如 '100%'） */

  width?: number | string;
  /** 容器高度，支持数字（px）或字符串（如 '100%'） */

  height?: number | string;
  // 可滚动区域高度
  /** 可滚动区域的高度，用于限制滚动范围 */
  scrollableHeight?: number | string;
  scrollableWidth?: number | string;
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  flex?: boolean;
  gap?: number | string;
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  expand?: boolean;
  mainAxisAlignment?:
    | "start"
    | "end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  crossAxisAlignment?: "start" | "end" | "center" | "stretch" | "baseline";
  style?: CSSProperties;

  captureScrollEvent?: boolean;
}

type Emits = {
  scroll: [
    event: {
      scrollTop: number;
      scrollLeft: number;
      scrollHeight: number;
      scrollWidth: number;
    },
  ];
  scrollStart: [];
  scrollEnd: [];
};

defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<Props>(), {
  scrollDirection: "vertical",
  physics: "bouncing",
  clipBehavior: "hardEdge",
  width: "100%",
  height: "100%",
  flex: false,
  gap: 0,
  flexWrap: "wrap",
  captureScrollEvent: false,
});
const computedClipBehavior = computed(() => {
  if (!props.clipBehavior) return undefined;
  return props.clipBehavior.replace("-", "").toLowerCase();
});

const $attrs = useAttrs();

const emit = defineEmits<Emits>();
const scrollContainer = ref<HTMLElement>();
let scrollTimer: number | null = null;
let isScrolling = false;
const computedStyle = computed(() => {
  const style: Style = {};

  const width = props.scrollableWidth ?? props.width;
  style.width = width ? px2vw(width) : width;
  const height = props.scrollableHeight ?? props.height;
  style.height = height ? px2vw(height) : height;
  return style;
});

const containerStyle = computed(() =>
  Object.assign({}, props.style, {
    width: props.width ? px2vw(props.width) : undefined,
    height: props.height ? px2vw(props.height) : undefined,
  })
);
const pattern = /-(scroll-view|scrollview)/g;
const rootClass = computed(() => {
  let name = $attrs.class as unknown as string;

  const base = "scroll-view";

  if (!name) return base;
  name = `${name}`.trim();
  const has = pattern.test(name);
  if (has) {
    name = name.replace(pattern, "-scroll-view");
  } else {
    const parts = name.split(" ").filter(Boolean);
    name = parts
      .map((part: string, index: number) => {
        if (index == 0) return `${part} ${part}-scroll-view`;
        return part;
      })
      .join(" ");
  }
  return base + " " + name;
});

const containerClass = computed(() => {
  const physics = props.physics;
  const scrollDirection = props.scrollDirection;
  const hardEdge = computedClipBehavior.value === "hardedge";
  const antiAlias = computedClipBehavior.value === "antialias";
  const noneBehavior = computedClipBehavior.value === "none";

  const physicsBouncing = physics === "bouncing";
  const physicsClamping = physics === "clamping";
  const physicsNever = physics === "never";
  const physicsAlways = physics === "always";

  return [
    "scroll-view--container",
    `scroll-view--container--${scrollDirection}`,
    {
      "scroll-view--physics-bouncing": physicsBouncing,
      "scroll-view--physics-clamping": physicsClamping,
      "scroll-view--physics-never": physicsNever,
      "scroll-view--physics-always": physicsAlways,
      "scroll-view--clip-hard-edge": hardEdge,
      "scroll-view--clip-anti-alias": antiAlias,
      "scroll-view--clip-none": noneBehavior,
    },
    $attrs.class,
  ];
});

const gapRegex = /^[0-9]+((px|vw|vh|%)?)(\s[0-9]+((px|vw|vh|%)?))?$/;
const contentStyle = computed(() => {
  const style: Style = {};
  if (props.flex) {
    const gap = props.gap as unknown as string;

    if (gap) {
      if (gapRegex.test(gap)) {
        const [gap1, gap2] = gap.split(" ");
        style.rowGap = px2vw(gap1);
        style.columnGap = px2vw(gap2 || gap1);
      } else {
        style.gap = px2vw(gap);
      }
    }
    style.display = "flex";
    style.justifyContent = props.mainAxisAlignment;
    style.alignItems = props.crossAxisAlignment;
    style.flexDirection = props.flexDirection; //|| props.scrollDirection === "vertical" ? "column" : "row";
    style.flexWrap = props.flexWrap;

    if (!props.expand) {
      style.width = "auto";
      style.height = "auto";
    }
  }

  // Padding
  if (props.padding) {
    const p = props.padding;
    if (p.all !== undefined) {
      style.padding = px2vw(p.all);
    } else {
      const top = p.vertical ?? p.top;
      const right = p.horizontal ?? p.right;
      const bottom = p.vertical ?? p.bottom;
      const left = p.horizontal ?? p.left;
      style.paddingTop = px2vw(top);
      style.paddingRight = px2vw(right);
      style.paddingBottom = px2vw(bottom);
      style.paddingLeft = px2vw(left);
    }
  }

  return style;
});

const handleScroll = (event: Event) => {
  if (!props.captureScrollEvent) return;

  const target = event.target as HTMLElement;

  if (!isScrolling) {
    isScrolling = true;
    emit("scrollStart");
  }

  emit("scroll", {
    scrollTop: target.scrollTop,
    scrollLeft: target.scrollLeft,
    scrollHeight: target.scrollHeight,
    scrollWidth: target.scrollWidth,
  });

  // 清除之前的定时器
  if (scrollTimer) {
    clearTimeout(scrollTimer);
  }

  // 设置新的定时器来检测滚动结束
  scrollTimer = window.setTimeout(() => {
    isScrolling = false;
    emit("scrollEnd");
  }, 150);
};

// 滚动控制方法
const scrollTo = (options: {
  top?: number;
  left?: number;
  behavior?: "auto" | "smooth";
}) => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo(options);
  }
};

const scrollToTop = (smooth = true) => {
  scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
};

const scrollToBottom = (smooth = true) => {
  if (scrollContainer.value) {
    scrollTo({
      top: scrollContainer.value.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });
  }
};

const scrollToLeft = (smooth = true) => {
  scrollTo({ left: 0, behavior: smooth ? "smooth" : "auto" });
};

const scrollToRight = (smooth = true) => {
  if (scrollContainer.value) {
    scrollTo({
      left: scrollContainer.value.scrollWidth,
      behavior: smooth ? "smooth" : "auto",
    });
  }
};

// 暴露方法给父组件
defineExpose({
  scrollTo,
  scrollToTop,
  scrollToBottom,
  scrollToLeft,
  scrollToRight,
  scrollContainer,
});

onUnmounted(() => {
  if (scrollTimer) {
    clearTimeout(scrollTimer);
  }
});
</script>

<style lang="scss">
.scroll-view {
  position: relative;
}
.scroll-view--container {
  position: relative;
}
.scroll-view--flex {
  display: flex;
  &.scroll-view--container--horizontal {
    flex-direction: row;
  }

  &.scroll-view--container--vertical {
    flex-direction: column;
  }
}

.scroll-view--container--clip-none,
.scroll-view--container--physics-never {
  overflow: hidden;
}

.scroll-view--physics-bouncing,
.scroll-view--physics-clamping,
.scroll-view--physics-always {
  &.scroll-view--container--horizontal {
    overflow-x: auto;
    overflow-y: hidden;
  }
  &.scroll-view--container--vertical {
    overflow-x: hidden;
    overflow-y: auto;
  }
}

.scroll-view__content {
  height: 100%;
  width: 100%;
}
/* 物理效果 */
.scroll-view--physics-bouncing {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

.scroll-view--physics-clamping {
  overscroll-behavior: none;
}
.scroll-view--physics-never .scroll-view__content {
  overflow: hidden !important;
}
.scroll-view::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.scroll-view::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

.scroll-view::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  transition: background 0.2s ease;
}

.scroll-view::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.5);
}

.scroll-view {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0.1);
}

.scroll-view {
  -webkit-overflow-scrolling: touch;
}

.scroll-view::-webkit-scrollbar {
  display: none;
}

.scroll-view .scroll-view-footer,
.scroll-view .scroll-view-header {
  width: 100%;
}
</style>

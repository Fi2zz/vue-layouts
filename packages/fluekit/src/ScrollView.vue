<template>
  <div ref="scrollRef" :style="containerStyle" @scroll="handleScroll">
    <div :style="contentStyle">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type CSSProperties, onUnmounted } from "vue";
import type { EdgeInsets } from "./EdgeInsets";
import { paddingToStyle } from "./EdgeInsets";

defineOptions({ inheritAttrs: false });

interface Props {
  /** 滚动方向 */
  scrollDirection?: "vertical" | "horizontal";
  /** 内边距 */
  padding?: EdgeInsets;
  /** 物理滚动效果模拟（主要影响 CSS overflow 行为） */
  physics?: "bouncing" | "clamping" | "never" | "always";
  /** 裁剪行为 */
  clipBehavior?: "none" | "hardEdge" | "antiAlias";
  /** 是否反向滚动 (暂未完全实现，预留接口) */
  reverse?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  scrollDirection: "vertical",
  physics: "bouncing",
  clipBehavior: "hardEdge",
  reverse: false,
});

const emit = defineEmits<{
  (
    e: "scroll",
    payload: {
      scrollTop: number;
      scrollLeft: number;
      scrollHeight: number;
      scrollWidth: number;
    },
  ): void;
  (e: "scrollStart"): void;
  (e: "scrollEnd"): void;
}>();

const scrollRef = ref<HTMLElement>();
let isScrolling = false;
let scrollTimer: number | null = null;

// --- Styles ---

const containerStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    // 默认占满父容器，确保 overflow 生效 (Web 滚动容器通常需要显式尺寸或 fill)
    // 如果用户需要特定尺寸，应在外层包裹 SizedBox/Container 或直接传入 style
    width: "100%",
    height: "100%",
    position: "relative",
    display: "block",
    // 隐藏 Firefox 滚动条
    scrollbarWidth: "none",
    // 优化滚动体验
    WebkitOverflowScrolling: "touch",
  };

  // 处理 Physics (滚动物理效果) & Scroll Direction (滚动方向)
  if (props.physics === "never") {
    style.overflow = "hidden";
  } else {
    if (props.scrollDirection === "vertical") {
      style.overflowX = "hidden";
      style.overflowY = "auto";
    } else {
      style.overflowX = "auto";
      style.overflowY = "hidden";
    }

    if (props.physics === "clamping") {
      style.overscrollBehavior = "none";
    } else if (props.physics === "bouncing") {
      style.overscrollBehavior = "auto";
    }
  }

  // 处理 Clip Behavior (裁剪行为)
  if (props.clipBehavior === "none") {
    if (props.physics === "never") {
      style.overflow = "visible";
    }
  }

  return style;
});

const contentStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    // 确保内容能够撑开容器
    minWidth: props.scrollDirection === "horizontal" ? "max-content" : "100%",
    minHeight: props.scrollDirection === "vertical" ? "fit-content" : "100%",
    boxSizing: "border-box",
    // 使得 padding 生效且不塌陷 (建立 BFC)
    display: "flow-root",
  };

  if (props.padding) {
    Object.assign(style, paddingToStyle(props.padding));
  }

  return style;
});

// --- Events ---

const handleScroll = (event: Event) => {
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

  if (scrollTimer) clearTimeout(scrollTimer);
  scrollTimer = window.setTimeout(() => {
    isScrolling = false;
    emit("scrollEnd");
  }, 150);
};

// --- Expose ---

const scrollTo = (options: ScrollToOptions) => {
  scrollRef.value?.scrollTo(options);
};

defineExpose({
  scrollRef,
  scrollTo,
});

onUnmounted(() => {
  if (scrollTimer) clearTimeout(scrollTimer);
});
</script>

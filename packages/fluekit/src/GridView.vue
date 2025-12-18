<template>
  <ScrollView
    :scroll-direction="scrollDirection"
    :padding="padding"
    :physics="physics"
    :clip-behavior="clipBehavior"
    class="flutter-grid-view"
    :style="scrollViewStyle"
  >
    <div class="grid-view-content" :style="gridStyle">
      <!-- 模式1: 静态子元素 -->
      <slot v-if="!itemCount" />

      <!-- 模式2: 构建器模式 -->
      <template v-else>
        <template v-for="index in itemCount" :key="index - 1">
          <slot name="item" :index="index - 1"></slot>
        </template>
      </template>
    </div>
  </ScrollView>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import ScrollView from "./ScrollView.vue";
import type { EdgeInsets } from "./EdgeInsets";
import { px2vw } from "./px2vw";

defineOptions({ inheritAttrs: false });

interface Props {
  scrollDirection?: "vertical" | "horizontal";
  padding?: EdgeInsets;
  physics?: "bouncing" | "clamping" | "never" | "always";
  shrinkWrap?: boolean;
  clipBehavior?: "none" | "hardEdge" | "antiAlias";

  // Grid 专有属性
  crossAxisCount?: number; // 列数 (垂直滚动时)
  mainAxisSpacing?: number | string; // 主轴间距
  crossAxisSpacing?: number | string; // 交叉轴间距
  childAspectRatio?: number; // 子元素宽高比
  itemCount?: number;
}

const props = withDefaults(defineProps<Props>(), {
  scrollDirection: "vertical",
  physics: "bouncing",
  shrinkWrap: false,
  clipBehavior: "hardEdge",
  crossAxisCount: 2,
  mainAxisSpacing: 0,
  crossAxisSpacing: 0,
  childAspectRatio: 1.0,
});

const scrollViewStyle = computed<CSSProperties>(() => {
  return {
    height: props.shrinkWrap ? "auto" : "100%",
    width: props.shrinkWrap ? "auto" : "100%",
  };
});

const gridStyle = computed<CSSProperties>(() => {
  const isVertical = props.scrollDirection === "vertical";
  const mainGap =
    typeof props.mainAxisSpacing === "number"
      ? px2vw(props.mainAxisSpacing)
      : props.mainAxisSpacing;
  const crossGap =
    typeof props.crossAxisSpacing === "number"
      ? px2vw(props.crossAxisSpacing)
      : props.crossAxisSpacing;

  return {
    display: "grid",
    // 垂直滚动：主轴是行，交叉轴是列
    gridTemplateColumns: isVertical ? `repeat(${props.crossAxisCount}, 1fr)` : "none",
    gridTemplateRows: !isVertical ? `repeat(${props.crossAxisCount}, 1fr)` : "none",
    gridAutoFlow: isVertical ? "row" : "column",
    gap: isVertical ? `${mainGap} ${crossGap}` : `${crossGap} ${mainGap}`,
    // 确保 Grid 容器尺寸能够撑开 ScrollView
    minWidth: isVertical ? "100%" : "max-content",
    minHeight: isVertical ? "max-content" : "100%",
  };
});
</script>

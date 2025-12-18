<template>
  <ScrollView
    :scroll-direction="scrollDirection"
    :padding="padding"
    :physics="physics"
    :clip-behavior="clipBehavior"
    :class="['flutter-list-view', { 'list-view-shrink-wrap': shrinkWrap }]"
    :style="listViewStyle"
  >
    <div class="list-view-content" :style="contentStyle">
      <!-- 模式1: 静态子元素 (类似 Flutter ListView(children: [])) -->
      <slot v-if="!itemCount" />

      <!-- 模式2: 构建器模式 (类似 Flutter ListView.builder) -->
      <template v-else>
        <template v-for="index in itemCount" :key="index - 1">
          <slot name="item" :index="index - 1"></slot>
          <div v-if="separator && index < itemCount" class="list-view-separator">
            <slot name="separator" :index="index - 1"></slot>
          </div>
        </template>
      </template>
    </div>
  </ScrollView>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import type { EdgeInsets } from "./EdgeInsets";
import ScrollView from "./ScrollView.vue";

defineOptions({ inheritAttrs: false });

interface Props {
  scrollDirection?: "vertical" | "horizontal";
  padding?: EdgeInsets;
  physics?: "bouncing" | "clamping" | "never" | "always";
  shrinkWrap?: boolean;
  itemCount?: number;
  itemExtent?: number | string;
  separator?: boolean; // 是否启用分隔符
  clipBehavior?: "none" | "hardEdge" | "antiAlias";
}

const props = withDefaults(defineProps<Props>(), {
  scrollDirection: "vertical",
  physics: "bouncing",
  shrinkWrap: false,
  clipBehavior: "hardEdge",
  separator: false,
});

const listViewStyle = computed<CSSProperties>(() => {
  return {
    height: props.shrinkWrap ? "auto" : "100%",
    width: props.shrinkWrap ? "auto" : "100%",
  };
});

const contentStyle = computed<CSSProperties>(() => {
  const isVertical = props.scrollDirection === "vertical";
  return {
    display: "flex",
    flexDirection: isVertical ? "column" : "row",
    gap: "0px", // 默认无间距，由 separator 控制
    // 在横向滚动时，强制 Flex 容器宽度适应内容，防止子元素收缩，从而触发 ScrollView 滚动
    minWidth: isVertical ? "100%" : "max-content",
  };
});
</script>

<style scoped>
.flutter-list-view {
  display: flex;
  flex-direction: column;
}
.list-view-shrink-wrap {
  flex: 0 0 auto;
}
</style>

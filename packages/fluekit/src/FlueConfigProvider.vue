<template>
  <div :style="providerStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, watchEffect, type CSSProperties } from "vue";
import { FlueConfigsProps, provideFlueConfig } from "./FlueConfig";
import { setAssetBaseURL } from "./ImageProvider";
import { setDefaultVW, setTransform } from "./px2vw";
import { setVisibleToasts } from "./Toast";

const props = withDefaults(defineProps<FlueConfigsProps>(), {
  transform: true,
  designWidth: 750,
  assetBaseURL: "/",
  toastCount: 1,
});

watchEffect(() => {
  setTransform(props.transform);
  setDefaultVW(props.designWidth);
  setAssetBaseURL(props.assetBaseURL);
  setVisibleToasts(props.toastCount);
});

// Provide a key if we want to access config in children, though px2vw uses module state currently.
// For now, module state is enough as it's a global config.
provideFlueConfig(props);

const providerStyle = computed<CSSProperties>(() => {
  const lineHeight = props.lineHeight ?? "normal";
  const style: CSSProperties & Record<string, any> = {
    "--fluekit-line-height": lineHeight,
    lineHeight,
    display: "contents",
  };
  return style;
});
</script>

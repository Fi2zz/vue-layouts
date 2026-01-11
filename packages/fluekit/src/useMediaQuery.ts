import { reactive, inject, InjectionKey } from "vue";
import { EdgeInsets } from "./EdgeInsets";

export enum Orientation {
  portrait = "portrait",
  landscape = "landscape",
}

export interface MediaQueryData {
  size: { width: number; height: number };
  devicePixelRatio: number;
  platformBrightness: "light" | "dark";
  orientation: Orientation;
  disableAnimations: boolean;
  highContrast: boolean;
  padding: EdgeInsets;
  viewInsets: EdgeInsets;
}

export const MediaQueryKey: InjectionKey<MediaQueryData> = Symbol("MediaQuery");

// Global state
const globalState = reactive<MediaQueryData>({
  size: { width: 0, height: 0 },
  devicePixelRatio: 1,
  platformBrightness: "light",
  orientation: Orientation.portrait,
  disableAnimations: false,
  highContrast: false,
  padding: EdgeInsets.zero,
  viewInsets: EdgeInsets.zero,
});

let listenersAttached = false;

const updateGlobalState = () => {
  if (typeof window === "undefined") return;

  // Size & Ratio
  const width = window.innerWidth;
  const height = window.innerHeight;
  globalState.size = { width, height };
  globalState.devicePixelRatio = window.devicePixelRatio || 1;

  // Orientation (Derived from size matches Flutter behavior)
  globalState.orientation = width > height ? Orientation.landscape : Orientation.portrait;

  // Media Queries
  const isDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  globalState.platformBrightness = isDark ? "dark" : "light";

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  globalState.disableAnimations = !!reduceMotion;

  const highContrast = window.matchMedia?.("(prefers-contrast: more)").matches;
  globalState.highContrast = !!highContrast;
};

const attachListeners = () => {
  if (typeof window === "undefined" || listenersAttached) return;

  window.addEventListener("resize", updateGlobalState);

  const queries = [
    "(prefers-color-scheme: dark)",
    "(prefers-reduced-motion: reduce)",
    "(prefers-contrast: more)",
  ];

  queries.forEach((q) => {
    const mq = window.matchMedia?.(q);
    if (mq?.addEventListener) {
      mq.addEventListener("change", updateGlobalState);
    } else if (mq?.addListener) {
      mq.addListener(updateGlobalState);
    }
  });

  updateGlobalState();
  listenersAttached = true;
};

export function useMediaQuery(): MediaQueryData {
  attachListeners();
  // inject returns the provided value or the default value (globalState)
  // We cast globalState because reactive returns UnwrapNestedRefs<T> which is compatible enough
  return inject(MediaQueryKey, globalState as MediaQueryData);
}

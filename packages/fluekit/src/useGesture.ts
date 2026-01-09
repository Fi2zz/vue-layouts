import { CSSProperties, PropType, SetupContext, inject, provide, ref } from "vue";

const GESTURE_HANDLED = Symbol("gesture_handled");

export interface GestureDetail {
  globalPosition: { x: number; y: number };
  delta?: { x: number; y: number };
}

export interface GestureCallbacks {
  onTap?: () => void;
  onClick?: (event: MouseEvent) => void;
  onDbClick?: (event: MouseEvent) => void;
  onDoubleTap?: () => void;
  onLongPress?: () => void;
  onPanStart?: (detail: GestureDetail) => void;
  onPanUpdate?: (detail: Required<GestureDetail>) => void;
  onPanEnd?: () => void;
}
export type Behavior = "deferToChild" | "opaque" | "translucent";

type Events = Record<string, (e: any) => void>;

export const events = [
  "click",
  "tap",
  "double-tap",
  "long-press",
  "pan-start",
  "pan-update",
  "pan-end",
];

export type GestureBehavior = PropType<Behavior>;

export function useGestures({ emit }: SetupContext) {
  const lastClickTime = ref(0);
  const longPressTimer = ref<number | null>(null);
  const isPanning = ref(false);
  const startPos = ref({ x: 0, y: 0 });
  const lastPos = ref({ x: 0, y: 0 });

  const callbacks = {
    onTap: () => emit("tap"),
    onClick: (event: MouseEvent) => emit("click", event),
    onDoubleTap: () => emit("double-tap"),
    onLongPress: () => emit("long-press"),
    onPanStart: (detail: GestureDetail) => emit("pan-start", detail),
    onPanUpdate: (detail: Required<GestureDetail>) => emit("pan-update", detail),
    onPanEnd: () => emit("pan-end"),
  };

  // 点击处理 (Tap & Double Tap)
  const handleClick = (e: MouseEvent) => {
    if ((e as any)[GESTURE_HANDLED]) return;
    (e as any)[GESTURE_HANDLED] = true;

    const now = Date.now();
    const delta = now - lastClickTime.value;
    if (delta < 300) {
      callbacks.onDoubleTap?.();
      lastClickTime.value = 0; // 重置
    } else {
      callbacks.onTap?.();
      callbacks.onClick?.(e);
      lastClickTime.value = now;
    }
  };

  // 按下处理 (Long Press & Pan Start)
  const handleDown = (e: MouseEvent) => {
    if ((e as any)[GESTURE_HANDLED]) return;
    (e as any)[GESTURE_HANDLED] = true;

    startLongPressTimer();
    startPan(e.clientX, e.clientY);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    // 如果移动超过一定阈值，取消长按
    if (Math.abs(e.clientX - startPos.value.x) > 5 || Math.abs(e.clientY - startPos.value.y) > 5) {
      clearLongPressTimer();
    }
    updatePan(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    clearLongPressTimer();
    endPan();
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  // Touch 处理
  const handleTouchStart = (e: TouchEvent) => {
    if ((e as any)[GESTURE_HANDLED]) return;
    (e as any)[GESTURE_HANDLED] = true;

    if (e.touches.length > 1) return;
    const touch = e.touches[0]!;
    startLongPressTimer();
    startPan(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if ((e as any)[GESTURE_HANDLED]) return;
    (e as any)[GESTURE_HANDLED] = true;

    const touch = e.touches[0]!;
    if (
      Math.abs(touch.clientX - startPos.value.x) > 5 ||
      Math.abs(touch.clientY - startPos.value.y) > 5
    ) {
      clearLongPressTimer();
    }
    updatePan(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if ((e as any)[GESTURE_HANDLED]) return;
    (e as any)[GESTURE_HANDLED] = true;

    clearLongPressTimer();
    endPan();
  };

  const handleCancel = (e: TouchEvent) => {
    if ((e as any)[GESTURE_HANDLED]) return;
    (e as any)[GESTURE_HANDLED] = true;

    clearLongPressTimer();
    endPan();
  };

  // Long Press 逻辑
  const startLongPressTimer = () => {
    clearLongPressTimer();
    longPressTimer.value = window.setTimeout(() => {
      callbacks.onLongPress?.();
    }, 500); // 500ms 长按
  };

  const clearLongPressTimer = () => {
    if (longPressTimer.value) {
      clearTimeout(longPressTimer.value);
      longPressTimer.value = null;
    }
  };

  // Pan 逻辑
  const startPan = (x: number, y: number) => {
    startPos.value = { x, y };
    lastPos.value = { x, y };
    isPanning.value = true;
    callbacks.onPanStart?.({ globalPosition: { x, y } });
  };

  const updatePan = (x: number, y: number) => {
    if (!isPanning.value) return;

    const dx = x - lastPos.value.x;
    const dy = y - lastPos.value.y;

    if (dx === 0 && dy === 0) return;

    callbacks.onPanUpdate?.({
      delta: { x: dx, y: dy },
      globalPosition: { x, y },
    });

    lastPos.value = { x, y };
  };

  const endPan = () => {
    if (isPanning.value) {
      isPanning.value = false;
      callbacks.onPanEnd?.();
    }
  };

  // 返回需要绑定的事件处理器
  return {
    onClick: handleClick,
    onMousedown: handleDown,
    onMouseup: handleMouseUp,
    onMousemove: handleMouseMove,
    onTouchstart: handleTouchStart,
    onTouchmove: handleTouchMove,
    onTouchend: handleTouchEnd,
    onTouchcancel: handleCancel,
  };
}

const S_EVENTS = Symbol("events");
const S_BEHAVIOR = Symbol("behavior");
export function useGestureStyle(staticBehavior?: Behavior) {
  const behavior = staticBehavior || inject<Behavior>(S_BEHAVIOR, "opaque");
  const style: CSSProperties = {};
  // 处理 behavior: opaque | translucent
  if (behavior === "opaque" || behavior === "translucent") {
    style.cursor = "pointer";
    style.userSelect = "none";
  }

  return style;
}

export function useGestureEvents() {
  const result = inject<any>(S_EVENTS, undefined);
  return result;
}

export function provideGesture(events: Events, behavior: Behavior) {
  provide(S_EVENTS, events);
  provide(S_BEHAVIOR, behavior);
}

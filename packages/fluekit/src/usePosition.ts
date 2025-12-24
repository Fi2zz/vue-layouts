import { CSSProperties, computed } from "vue";
import { px2vw } from "./px2vw";

export interface Props {
  /** 距离顶部的距离 */
  top?: number;
  /** 距离底部的距离 */
  bottom?: number;
  /** 距离左侧的距离 */
  left?: number;
  /** 距离右侧的距离 */
  right?: number;
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /** z-index 层级 */
  zIndex?: number;
}

export function positionToStyle(
  props: Props,
  position: "absolute" | "fixed" | "sticky" | "relative" = "absolute",
) {
  const style: CSSProperties = {
    position,
    boxSizing: "border-box",
  };

  style.top = px2vw(props.top);
  style.bottom = px2vw(props.bottom);
  style.left = px2vw(props.left);
  style.right = px2vw(props.right);
  style.width = px2vw(props.width);
  style.height = px2vw(props.height);
  style.zIndex = props.zIndex;
  return style;
}

export function usePositionStyle(
  props: Props,
  position: "absolute" | "fixed" | "sticky" | "relative" = "absolute",
) {
  return computed(() => {
    const style: CSSProperties = {
      position,
      boxSizing: "border-box",
    };

    style.top = px2vw(props.top);
    style.bottom = px2vw(props.bottom);
    style.left = px2vw(props.left);
    style.right = px2vw(props.right);
    style.width = px2vw(props.width);
    style.height = px2vw(props.height);
    style.zIndex = props.zIndex;
    return style;
  });
}

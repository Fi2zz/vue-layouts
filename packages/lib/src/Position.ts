import { Size } from "./Size";
export interface PositionProps extends Size {
  /** 定位类型 */
  position?: "absolute" | "fixed" | "sticky" | string;
  /** 距离顶部的距离 */
  top?: number | string;
  /** 距离底部的距离 */
  bottom?: number | string;
  /** 距离左侧的距离 */
  left?: number | string;
  /** 距离右侧的距离 */
  right?: number | string;
  /** z-index 层级 */
  zIndex?: number | string;
  /** 是否填充整个父容器 */
  fill?: boolean;
  translateX?: number | string;
  translateY?: number | string;
  centered?: boolean;
  transform?: string;
  ignorePointer?: boolean;
  centeredX?: boolean;
  centeredY?: boolean;
}
export const Position = (
  props: PositionProps = {},
  cloned: PositionProps = {}
) => ({ ...cloned, ...props }) as PositionProps;

import { CSSProperties } from "vue";
import { px2vw } from "./px2vw";

export const positionToStyle = (
  props: Omit<PositionProps, "width" | "heigh"> = {}
) => {
  const style: CSSProperties = {
    position: props.position as CSSProperties["position"],
    zIndex: props.zIndex,
    transform: undefined as CSSProperties["transform"],
  };

  // 如果设置了 fill，则填充整个父容器
  if (props.fill) {
    style.top = "0";
    style.left = "0";
    style.right = "0";
    style.bottom = "0";
    style.width = "100%";
    style.height = "100%";
    return style;
  }

  if (props.centered) {
    style.top = "50%";
    style.left = "50%";
    style.transform = "translate(-50%, -50%)";
    return style;
  }

  if (props.transform) style.transform = props.transform;
  if (props.centeredX) {
    style.left = "50%";
    if (!style.transform) style.transform = "";
    style.transform += "translateX(-50%)";
  }
  if (props.centeredY) {
    style.top = "50%";
    if (!style.transform) style.transform = "";
    style.transform = "translateY(-50%)";
  }
  // 设置定位属性
  const topValue = px2vw(props.top!);
  const bottomValue = px2vw(props.bottom!);
  const leftValue = px2vw(props.left!);
  const rightValue = px2vw(props.right!);
  const _translateX = px2vw(props.translateX!);
  const _translateY = px2vw(props.translateY!);

  if (topValue !== undefined) style.top = topValue;
  if (bottomValue !== undefined) style.bottom = bottomValue;
  if (leftValue !== undefined) style.left = leftValue;
  if (rightValue !== undefined) style.right = rightValue;

  if (!props.transform) {
    let translateX: string = "",
      translateY: string = "";
    if (_translateX !== undefined) translateX = `translateX(${_translateX})`;
    if (_translateY !== undefined) translateY = `translateY(${_translateY})`;

    if (translateX || translateY) {
      style.transform = "";
      if (translateX) style.transform += translateX;
      if (translateY) style.transform += translateY;
    }
  }

  return style;
};

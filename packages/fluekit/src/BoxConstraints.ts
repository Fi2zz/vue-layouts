import { CSSProperties } from "vue";
import { px2vw } from "./px2vw";
import { isPlainObject } from "./utils";

// 定义唯一符号标记
const BOX_CONSTRAINTS_SYMBOL = Symbol("boxConstraints");

export interface BoxConstraintsProps {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}

export type BoxConstraints = BoxConstraintsProps & {
  [BOX_CONSTRAINTS_SYMBOL]?: true;
};

const toVal = (v: number) => (v === Infinity ? undefined : v);

export function BoxConstraints(props: BoxConstraintsProps = {}): BoxConstraints {
  const minWidth = Math.max(0, props.minWidth ?? 0);
  const minHeight = Math.max(0, props.minHeight ?? 0);
  const maxWidth = Math.max(minWidth, props.maxWidth ?? Infinity);
  const maxHeight = Math.max(minHeight, props.maxHeight ?? Infinity);

  return {
    minWidth: toVal(minWidth),
    maxWidth: toVal(maxWidth),
    minHeight: toVal(minHeight),
    maxHeight: toVal(maxHeight),
    [BOX_CONSTRAINTS_SYMBOL]: true as const,
  };
}

// Static methods for Flutter-like API
BoxConstraints.tight = (size: { width: number; height: number }) =>
  BoxConstraints({
    minWidth: size.width,
    maxWidth: size.width,
    minHeight: size.height,
    maxHeight: size.height,
  });

BoxConstraints.loose = (size: { width: number; height: number }) =>
  BoxConstraints({
    minWidth: 0,
    maxWidth: size.width,
    minHeight: 0,
    maxHeight: size.height,
  });

BoxConstraints.expand = ({
  width,
  height,
}: {
  width?: number;
  height?: number;
} = {}) =>
  BoxConstraints({
    minWidth: width ?? Infinity,
    maxWidth: width ?? Infinity,
    minHeight: height ?? Infinity,
    maxHeight: height ?? Infinity,
  });

/**
 * 类型守卫：检查对象是否通过 BoxConstraints 创建
 */
export function isBoxConstraints(value: any): value is BoxConstraints {
  if (!isPlainObject(value)) return false;
  return BOX_CONSTRAINTS_SYMBOL in value;
}

export function boxConstraintsToStyle(constraints?: BoxConstraintsProps): CSSProperties {
  const constraintsType = constraints ?? {};

  return {
    minWidth: px2vw(constraintsType.minWidth),
    maxWidth: px2vw(constraintsType.maxWidth),
    minHeight: px2vw(constraintsType.minHeight),
    maxHeight: px2vw(constraintsType.maxHeight),
  };
}

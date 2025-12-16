import { px2vw } from "./px2vw";

export interface BoxConstraints {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}
const toVal = (v: number) => (v === Infinity ? undefined : v);
export function BoxConstraints(
  props: BoxConstraints = {},
  cloned: BoxConstraints = {}
): BoxConstraints {
  const constraints = {
    ...cloned,
    ...props,
  } as BoxConstraints;

  // 内部数据
  const _minWidth = Math.max(0, constraints.minWidth ?? 0);
  const _minHeight = Math.max(0, constraints.minHeight ?? 0);
  const _maxWidth = Math.max(_minWidth, constraints.maxWidth ?? Infinity);
  const _maxHeight = Math.max(_minHeight, constraints.maxHeight ?? Infinity);
  function build(): BoxConstraints {
    return {
      minWidth: toVal(_minWidth),
      maxWidth: toVal(_maxWidth),
      minHeight: toVal(_minHeight),
      maxHeight: toVal(_maxHeight),
    };
  }
  return build() as BoxConstraints;
}

export function boxConstraintsToStyle(constraints?: BoxConstraints) {
  const constraintsType = constraints ?? {};

  return {
    minWidth: px2vw(constraintsType.minWidth),
    maxWidth: px2vw(constraintsType.maxWidth),
    minHeight: px2vw(constraintsType.minHeight),
    maxHeight: px2vw(constraintsType.maxHeight),
  };
}

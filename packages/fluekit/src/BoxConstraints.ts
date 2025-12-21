import { CSSProperties } from "vue";
import { px2vw } from "./px2vw";

export interface BoxConstraintsProps {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}

export type BoxConstraints = BoxConstraintsProps;

const toVal = (v: number) => (v === Infinity ? undefined : v);

export function BoxConstraints(props: BoxConstraintsProps = {}): BoxConstraintsProps {
  const minWidth = Math.max(0, props.minWidth ?? 0);
  const minHeight = Math.max(0, props.minHeight ?? 0);
  const maxWidth = Math.max(minWidth, props.maxWidth ?? Infinity);
  const maxHeight = Math.max(minHeight, props.maxHeight ?? Infinity);

  return {
    minWidth: toVal(minWidth),
    maxWidth: toVal(maxWidth),
    minHeight: toVal(minHeight),
    maxHeight: toVal(maxHeight),
  };
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

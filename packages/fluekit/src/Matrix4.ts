import { type CSSProperties } from "vue";
import { type Alignment, alignmentToOrigin } from "./Alignment";

const MATRIX4_SYMBOL = Symbol("Matrix4");

export interface Matrix4 {
  _storage: Float32Array;
  [MATRIX4_SYMBOL]: true;
  clone(): Matrix4;
  multiply(other: Matrix4): Matrix4;
  translated(x: number, y: number, z?: number): Matrix4;
  scaled(x: number, y: number, z?: number): Matrix4;
  rotatedX(radians: number): Matrix4;
  rotatedY(radians: number): Matrix4;
  rotatedZ(radians: number): Matrix4;
  toString(): string;
}

export function Matrix4(arg?: Float32Array | number[]): Matrix4 {
  let storage: Float32Array;
  if (arg) {
    storage = new Float32Array(arg);
  } else {
    storage = new Float32Array([
      1,
      0,
      0,
      0, // col 0
      0,
      1,
      0,
      0, // col 1
      0,
      0,
      1,
      0, // col 2
      0,
      0,
      0,
      1, // col 3
    ]);
  }

  const matrix: Matrix4 = {
    _storage: storage,
    [MATRIX4_SYMBOL]: true,

    clone() {
      return Matrix4(this._storage);
    },

    multiply(other: Matrix4) {
      const a = this._storage;
      const b = other._storage;
      const out = new Float32Array(16);

      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          let sum = 0;
          for (let k = 0; k < 4; k++) {
            sum += (a[k * 4 + i] ?? 0) * (b[j * 4 + k] ?? 0);
          }
          out[j * 4 + i] = sum;
        }
      }
      return Matrix4(out);
    },

    translated(x: number, y: number, z: number = 0) {
      return this.multiply(Matrix4.translation(x, y, z));
    },

    scaled(x: number, y: number, z: number = 1) {
      return this.multiply(Matrix4.scaling(x, y, z));
    },

    rotatedX(radians: number) {
      return this.multiply(Matrix4.rotationX(radians));
    },

    rotatedY(radians: number) {
      return this.multiply(Matrix4.rotationY(radians));
    },

    rotatedZ(radians: number) {
      return this.multiply(Matrix4.rotationZ(radians));
    },

    toString() {
      return `matrix3d(${this._storage.join(",")})`;
    },
  };

  return matrix;
}

// Static methods attached to the factory function
Matrix4.identity = (): Matrix4 => {
  return Matrix4();
};

Matrix4.fromList = (list: number[]): Matrix4 => {
  return Matrix4(list);
};

Matrix4.rotationX = (radians: number): Matrix4 => {
  const c = Math.cos(radians);
  const s = Math.sin(radians);
  return Matrix4([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
};

Matrix4.rotationY = (radians: number): Matrix4 => {
  const c = Math.cos(radians);
  const s = Math.sin(radians);
  return Matrix4([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
};

Matrix4.rotationZ = (radians: number): Matrix4 => {
  const c = Math.cos(radians);
  const s = Math.sin(radians);
  return Matrix4([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
};

Matrix4.translation = (x: number, y: number, z: number = 0): Matrix4 => {
  return Matrix4([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]);
};

Matrix4.scaling = (x: number, y: number, z: number = 1): Matrix4 => {
  return Matrix4([x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1]);
};

Matrix4.diagonal3 = (x: number, y: number, z: number): Matrix4 => {
  return Matrix4.scaling(x, y, z);
};

Matrix4.skewX = (alpha: number): Matrix4 => {
  const t = Math.tan(alpha);
  return Matrix4([1, 0, 0, 0, t, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
};

Matrix4.skewY = (beta: number): Matrix4 => {
  const t = Math.tan(beta);
  return Matrix4([1, t, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
};

export function matrix4ToCSSStyle(transform?: Matrix4, alignment?: Alignment): CSSProperties {
  if (!transform) return {};
  const style: CSSProperties = {
    transform: transform.toString(),
  };

  if (alignment) {
    style.transformOrigin = alignmentToOrigin(alignment);
  }

  return style;
}

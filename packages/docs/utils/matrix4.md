# Matrix4

A 4x4 matrix used for 3D geometric transformations.

## Usage

```ts
import { Matrix4 } from "fluekit";

// Identity matrix
const m1 = Matrix4.identity();

// Rotation
const m2 = Matrix4.rotationZ(Math.PI / 4);

// Scaling
const m3 = Matrix4.scaling(1.5, 1.5);

// Translation
const m4 = Matrix4.translation(10, 20);

// Chaining
const m5 = Matrix4.identity().translated(10, 20).rotatedZ(0.1).scaled(2, 2);
```

## Static Methods

### Factories

- `Matrix4.identity()`: Returns an identity matrix.
- `Matrix4.rotationX(radians)`: Returns a rotation matrix around the X axis.
- `Matrix4.rotationY(radians)`: Returns a rotation matrix around the Y axis.
- `Matrix4.rotationZ(radians)`: Returns a rotation matrix around the Z axis.
- `Matrix4.translation(x, y, z)`: Returns a translation matrix.
- `Matrix4.scaling(x, y, z)`: Returns a scaling matrix.
- `Matrix4.skewX(alpha)`: Returns a skew matrix along the X axis.
- `Matrix4.skewY(beta)`: Returns a skew matrix along the Y axis.
- `Matrix4.diagonal3(x, y, z)`: Returns a diagonal matrix (scaling).

## Instance Methods

- `clone()`: Returns a copy of the matrix.
- `multiply(other)`: Returns the result of multiplying this matrix by another.
- `translated(x, y, z)`: Returns a new matrix representing this matrix translated.
- `scaled(x, y, z)`: Returns a new matrix representing this matrix scaled.
- `rotatedX(radians)`: Returns a new matrix representing this matrix rotated around X.
- `rotatedY(radians)`: Returns a new matrix representing this matrix rotated around Y.
- `rotatedZ(radians)`: Returns a new matrix representing this matrix rotated around Z.
- `toString()`: Returns the CSS `matrix3d(...)` string representation.

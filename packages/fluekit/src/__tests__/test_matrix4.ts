import { Matrix4, matrix4ToCSSStyle } from "../Matrix4";
import { Alignment } from "../Alignment";

const m = Matrix4.identity();
console.log("Without alignment:", matrix4ToCSSStyle(m));

console.log("With alignment center:", matrix4ToCSSStyle(m, Alignment.center));
console.log("With alignment topLeft:", matrix4ToCSSStyle(m, Alignment.topLeft));

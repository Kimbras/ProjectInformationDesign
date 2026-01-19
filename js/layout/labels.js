// js/layout/labels.js
import { ctx } from "../canvas/canvas.js";

export function addClusterLabel(label, x, y) {
  ctx.fillStyle = "black";
  ctx.font = "16px sans-serif";
  ctx.fillText(label, x, y);
}

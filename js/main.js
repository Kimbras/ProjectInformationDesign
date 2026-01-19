import { canvas } from "./canvas/canvas.js";
import "./ui/buttons.js";
import "./ui/story.js";
import { startRenderLoop } from "./canvas/render.js";
console.log("canvas:", canvas);

startRenderLoop();

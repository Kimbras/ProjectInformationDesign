import { ctx, canvas, mouse } from "./canvas.js";
import { bolletjes } from "../model/bolletjes.js";
import { addClusterLabel } from "../layout/labels.js";


let hoveredBolletje = null;

export function setMode(newMode) {
    mode = newMode;
}

function drawLetters() {
    ctx.fillStyle = "black";
    ctx.font = "20px sans-serif";
    ctx.fillText("Letters komen hier", 50, 50);
}

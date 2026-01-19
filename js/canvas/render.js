import { ctx, canvas, mouse } from "./canvas.js";
import { bolletjes } from "../model/bolletjes.js";
import { addClusterLabel } from "../layout/labels.js";

let mode = "paintings";
let hoveredBolletje = null; // bolletje waar de muis overheen is

export function setMode(newMode) {
    mode = newMode;
}

// Start de render loop
export function startRenderLoop() {
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (mode === "paintings") {
            hoveredBolletje = null;

            bolletjes.forEach(b => {
                // subtiel float-effect
                const floatOffset = Math.sin(b.floatPhase) * b.floatAmount;
                const drawY = b.homeY + floatOffset;

                // muis-check
                const dx = mouse.x - b.x;
                const dy = mouse.y - drawY;
                if (Math.sqrt(dx * dx + dy * dy) < b.r) {
                    hoveredBolletje = b;
                }

                // bolletje tekenen
                ctx.fillStyle = b.color;
                ctx.beginPath();
                ctx.arc(b.x, drawY, b.r, 0, Math.PI * 2);
                ctx.fill();
            });

            // label tekenen
            if (hoveredBolletje) {
                const b = hoveredBolletje;
                const floatOffset = Math.sin(b.floatPhase) * b.floatAmount;

                // stuur het hele bolletje door, zodat we img kunnen gebruiken
                addClusterLabel(b, b.x, b.homeY + floatOffset - b.r - 8);
            }
        }

        if (mode === "letters") drawLetters();

        requestAnimationFrame(draw);
    }

    draw();
}

// Dummy letters
function drawLetters() {
    ctx.fillStyle = "black";
    ctx.font = "20px sans-serif";
    ctx.fillText("Letters komen hier", 50, 50);
}

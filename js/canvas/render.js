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

            // Bolletjes tekenen
            bolletjes.forEach(b => {
                const floatOffset = Math.sin(b.floatPhase) * b.floatAmount;
                b.floatPhase += b.floatSpeed;

                const drawX = b.homeX;
                const drawY = b.homeY + floatOffset;

                // bolletje
                ctx.fillStyle = b.color;
                ctx.beginPath();
                ctx.arc(drawX, drawY, b.r, 0, Math.PI * 2);
                ctx.fill();

                // hovered label
                if (hoveredBolletje === b) {
                    addClusterLabel(b, drawX, drawY - b.r - 8);
                }
            });

            // Jaartal boven rij tekenen (1x per jaar)
            const drawnYears = new Set();
            bolletjes.forEach(b => {
                const year = b.data.year;
                if (b.yearLabelX && !drawnYears.has(year)) {
                    ctx.fillStyle = "black";
                    ctx.font = "20px sans-serif";
                    ctx.textAlign = "center";  // boven kolom centreren
                    ctx.fillText(year, b.yearLabelX, b.yearLabelY);
                    drawnYears.add(year);
                }
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

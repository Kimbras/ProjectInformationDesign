import { ctx, canvas, mouse } from "./canvas.js";
import { bolletjes } from "../model/bolletjes.js";
import { addClusterLabel } from "../layout/labels.js";

let mode = "paintings";
let hoveredBolletje = null;

export function setMode(newMode) {
    mode = newMode;
}

export function startRenderLoop() {
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (mode === "paintings") {
            hoveredBolletje = null;

            const lerp = (start, end, amt) => start + (end - start) * amt;

            bolletjes.forEach(b => {
                // update floatPhase
                b.floatPhase += b.floatSpeed;

                // subtiel float-effect
                const floatOffset = Math.sin(b.floatPhase) * b.floatAmount;

                // zachte beweging naar target
                b.homeX = lerp(b.homeX, b.targetX, 0.05); // 0.05 is snelheid
                b.homeY = lerp(b.homeY, b.targetY, 0.05);

                // huidige positie (thuis + float)
                const drawX = b.homeX;
                const drawY = b.homeY + floatOffset;

                // hover check
                const dx = mouse.x - drawX;
                const dy = mouse.y - drawY;
                if (Math.sqrt(dx * dx + dy * dy) < b.r) {
                    hoveredBolletje = b;
                }

                // bolletje tekenen
                ctx.fillStyle = b.color;
                ctx.beginPath();
                ctx.arc(drawX, drawY, b.r, 0, Math.PI * 2);
                ctx.fill();
            });


            // label tekenen boven het bolletje
            if (hoveredBolletje) {
                const b = hoveredBolletje;
                const floatOffset = Math.sin(b.floatPhase) * b.floatAmount;

                addClusterLabel(
                    b,
                    b.homeX,
                    b.homeY + floatOffset
                );
            }
        }

        if (mode === "letters") {
            drawLetters();
        }

        requestAnimationFrame(draw);
    }

    draw();
}

function drawLetters() {
    ctx.fillStyle = "black";
    ctx.font = "20px sans-serif";
    ctx.fillText("Letters komen hier", 50, 50);
}

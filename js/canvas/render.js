import { ctx, canvas } from "./canvas.js";
import { bolletjes } from "../model/bolletjes.js";

export function startRenderLoop() {
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bolletjes.forEach(b => {
      ctx.fillStyle = b.color;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
}

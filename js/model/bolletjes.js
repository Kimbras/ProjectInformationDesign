import { paintings } from "../data/paintings.js";
import { KLEUREN } from "../data/colors.js";
import { canvas } from "../canvas/canvas.js";

export const bolletjes = paintings.map((p, i) => {
    const area = (p.width || 1) * (p.height || 1);
    const radius = Math.sqrt(area) * 0.1;

    const img = new Image();
    img.src = p.image || "";

    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;

    return {
        data: p,
        img,
        x,
        y,
        homeX: x,
        homeY: y,
        targetX: x,  // nieuwe target posities
        targetY: y,
        r: radius,
        color: KLEUREN[i % KLEUREN.length],
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: 0.01 + Math.random() * 0.02,
        floatAmount: 3 + Math.random() * 4
    };
});

// js/model/bolletjes.js
import { paintings } from "../data/paintings.js";
import { KLEUREN } from "../data/colors.js";
import { canvas } from "../canvas/canvas.js";

// Maak een bolletje voor elk schilderij
export const bolletjes = paintings.map((p, i) => {
    // radius gebaseerd op oppervlakte
    const area = (p.width || 1) * (p.height || 1);
    const radius = Math.sqrt(area) * 0.2; // schaalfactor, aanpassen naar wens

    return {
        data: p,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        homeX: Math.random() * canvas.width,
        homeY: Math.random() * canvas.height,
        r: radius,
        color: KLEUREN[i % KLEUREN.length],
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: 0.01 + Math.random() * 0.02,
        floatAmount: 3 + Math.random() * 4
    };
});

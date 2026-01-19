// js/model/bolletjes.js

import { paintings } from "../data/paintings.js";
import { KLEUREN } from "../data/colors.js";

// simulatie van canvasbreedte / hoogte
import { canvas } from "../canvas/canvas.js";

export const bolletjes = paintings.map((p, i) => {
  const area = (p.width || 1) * (p.height || 1); // fallback
  const radius = Math.sqrt(area) * 0.06;

  return {
    data: p,
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    homeX: 0,
    homeY: 0,
    r: radius,
    color: KLEUREN[i % KLEUREN.length],
    target: null,
    floatPhase: Math.random() * Math.PI * 2,
    floatSpeed: 0.01 + Math.random() * 0.02,
    floatAmount: 3 + Math.random() * 4
  };
});

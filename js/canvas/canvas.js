// js/canvas/canvas.js

export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");

export const sidebar = document.getElementById("sidebar");

// centrale mouse state
export const mouse = {
  x: 0,
  y: 0
};

// canvas afmetingen
export function resizeCanvas() {
  const sidebarWidth = sidebar ? sidebar.offsetWidth : 0;
  const dpr = window.devicePixelRatio || 1;

  const cssWidth = window.innerWidth - sidebarWidth;
  const cssHeight = window.innerHeight;

  canvas.style.width = cssWidth + "px";
  canvas.style.height = cssHeight + "px";

  canvas.width = cssWidth * dpr;
  canvas.height = cssHeight * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}


// mouse tracking
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

// resize listener
window.addEventListener("resize", resizeCanvas);

// init
resizeCanvas();

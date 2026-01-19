import { setMode } from "../canvas/render.js";

const paintingsBtn = document.getElementById("showPaintingsBtn");
const lettersBtn = document.getElementById("showLettersBtn");

paintingsBtn.addEventListener("click", () => setMode("paintings"));
lettersBtn.addEventListener("click", () => setMode("letters"));

import { setMode } from "../canvas/render.js";
import { bolletjes } from "../model/bolletjes.js";
import { sortByYear, sortBySize, sortByMadeLocation, sortByCurrentLocation } from "../layout/clusters.js";

// Hoofd-buttons
const paintingsBtn = document.getElementById("showPaintingsBtn");
const lettersBtn = document.getElementById("showLettersBtn");

// Sub-buttons voor paintings
const filtersDiv = document.getElementById("paintingsFilters");
const sortByYearBtn = document.getElementById("sortByYearBtn");
const sortBySizeBtn = document.getElementById("sortBySizeBtn");
const sortByMadeBtn = document.getElementById("sortByMadeBtn");
const sortByCurrentBtn = document.getElementById("sortByCurrentBtn");

// Helper: reset bolletjes naar originele volgorde
function resetBolletjes() {
  // Als je wilt dat de bolletjes teruggaan naar hun originele homeX/Y
  bolletjes.forEach(b => {
    b.homeX = b.x; // behoud huidige posities
    b.homeY = b.y;
  });
}

// Event listeners
paintingsBtn.addEventListener("click", () => {
  setMode("paintings");
  filtersDiv.style.display = "block"; // toon sub-buttons
  resetBolletjes(); // toon huidige state zonder sortering
});

lettersBtn.addEventListener("click", () => {
  setMode("letters");
  filtersDiv.style.display = "none"; // verberg sub-buttons
});

// Sub-buttons koppelen
sortByYearBtn.addEventListener("click", () => {
  const sorted = sortByYear(bolletjes);
  sorted.forEach((b, i) => {
    b.homeX = 100 + (i % 3) * 150; // voorbeeld layout
    b.homeY = 100 + Math.floor(i / 3) * 150;
  });
});

sortBySizeBtn.addEventListener("click", () => {
  const sorted = sortBySize(bolletjes);
  sorted.forEach((b, i) => {
    b.homeX = 100 + (i % 3) * 150;
    b.homeY = 100 + Math.floor(i / 3) * 150;
  });
});

sortByMadeBtn.addEventListener("click", () => {
  const sorted = sortByMadeLocation(bolletjes);
  sorted.forEach((b, i) => {
    b.homeX = 100 + (i % 3) * 150;
    b.homeY = 100 + Math.floor(i / 3) * 150;
  });
});

sortByCurrentBtn.addEventListener("click", () => {
  const sorted = sortByCurrentLocation(bolletjes);
  sorted.forEach((b, i) => {
    b.homeX = 100 + (i % 3) * 150;
    b.homeY = 100 + Math.floor(i / 3) * 150;
  });
});

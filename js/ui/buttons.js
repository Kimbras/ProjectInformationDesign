import { setMode } from "../canvas/render.js";
import { bolletjes } from "../model/bolletjes.js";
import { sortByYear, sortBySize, sortByMadeLocation, sortByCurrentLocation, groupByYear } from "../layout/clusters.js";

// Hoofd-buttons
const paintingsBtn = document.getElementById("showPaintingsBtn");
const lettersBtn = document.getElementById("showLettersBtn");

// Sub-buttons voor paintings
const filtersDiv = document.getElementById("paintingsFilters");
const sortByYearBtn = document.getElementById("sortByYearBtn");
const sortBySizeBtn = document.getElementById("sortBySizeBtn");
const sortByMadeBtn = document.getElementById("sortByMadeBtn");
const sortByCurrentBtn = document.getElementById("sortByCurrentBtn");

// Vertikale en horizontale spacing
const colSpacing = 150;   // afstand tussen kolommen (jaartallen)
const rowSpacing = 120;   // afstand tussen bolletjes onder elkaar
const startX = 100;
const startY = 100;

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
  const grouped = groupByYear(bolletjes);
  const years = Object.keys(grouped).sort((a,b)=>a-b); // oplopend

  // verwijder oude labels
  bolletjes.forEach(b => delete b.yearLabelY);
  bolletjes.forEach(b => delete b.yearLabelX);

  let currentX = startX; // begin X voor eerste kolom

  years.forEach(year => {
    const column = grouped[year];
    column.forEach((b, i) => {
      b.homeX = currentX;
      b.homeY = startY + i * rowSpacing;
      b.yearLabelX = currentX;           // X voor het jaartal label
      b.yearLabelY = startY - 30;        // Y boven de eerste bol
    });
    currentX += colSpacing; // volgende kolom
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

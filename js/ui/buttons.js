import { setMode } from "../canvas/render.js";
import { bolletjes } from "../model/bolletjes.js";
import { sortByYear, sortBySize, sortByMadeLocation, sortByCurrentLocation, groupByYear, arrangeByYear } from "../layout/clusters.js";

// Hoofd-buttons
const paintingsBtn = document.getElementById("showPaintingsBtn");
const lettersBtn = document.getElementById("showLettersBtn");

// Sub-buttons voor paintings
const filtersDiv = document.getElementById("paintingsFilters");
const lettersFiltersDiv = document.getElementById("lettersFilters");
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

// Event listeners met togglen
paintingsBtn.addEventListener("click", () => {
    setMode("paintings");

    if (filtersDiv.style.display === "block") {
        // Als menu al open is, sluit het
        filtersDiv.style.display = "none";
    } else {
        // Open schilderijen en sluit letters
        filtersDiv.style.display = "block";
        if (lettersFiltersDiv) lettersFiltersDiv.style.display = "none";
    }

    resetBolletjes();
});

lettersBtn.addEventListener("click", () => {
    setMode("letters");

    if (lettersFiltersDiv.style.display === "block") {
        // Sluit menu als al open
        lettersFiltersDiv.style.display = "none";
    } else {
        // Open letters en sluit schilderijen
        lettersFiltersDiv.style.display = "block";
        if (filtersDiv) filtersDiv.style.display = "none";
    }
});


// Sub-buttons koppelen
sortByYearBtn.addEventListener("click", () => {
    arrangeByYear(bolletjes); // berekent targetX en targetY

    // optioneel: verwijder oude labels
    bolletjes.forEach(b => {
        delete b.yearLabelX;
        delete b.yearLabelY;
    });

    // Labels boven de eerste bol per jaar
    const grouped = groupByYear(bolletjes);
    const years = Object.keys(grouped).sort((a, b) => a - b);
    let currentX = startX;

    years.forEach(year => {
        const column = grouped[year];
        column.forEach((b, i) => {
            b.yearLabelX = currentX;        // X voor het jaartal label
            b.yearLabelY = startY - 30;     // Y boven de eerste bol
        });
        currentX += colSpacing;
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

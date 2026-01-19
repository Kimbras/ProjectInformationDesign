// js/layout/clusters.js

// sorteer bolletjes op jaar
export function sortByYear(bolletjes) {
  return [...bolletjes].sort((a, b) => a.data.year - b.data.year);
}

// sorteer op oppervlakte
export function sortBySize(bolletjes) {
  return [...bolletjes].sort((a, b) => (b.r ** 2) - (a.r ** 2));
}

// dummy cluster op willekeurige cluster id
export function sortByCluster(bolletjes) {
  return bolletjes.map((b, i) => ({ ...b, cluster: i % 3 }));
}

// sorteer op plaats gemaakt
export function sortByMadeLocation(bolletjes) {
  return [...bolletjes].sort((a, b) => a.data.madeIn.localeCompare(b.data.madeIn));
}

// sorteer op huidige locatie
export function sortByCurrentLocation(bolletjes) {
  return [...bolletjes].sort((a, b) => a.data.currentLocation.localeCompare(b.data.currentLocation));
}

// Groepeer bolletjes op jaar
export function groupByYear(bolletjes) {
  const map = {};
  bolletjes.forEach(b => {
    const year = b.data.year;
    if (!map[year]) map[year] = [];
    map[year].push(b);
  });
  return map; 
}

// js/layout/clusters.js
export function arrangeByYear(bolletjes) {
    const grouped = groupByYear(bolletjes); // gebruik je bestaande functie
    const years = Object.keys(grouped).sort((a,b)=>a-b); // oplopend
    const startX = 100;
    const startY = 100;
    const colSpacing = 150;
    const rowSpacing = 120;

    let currentX = startX;

    years.forEach(year => {
        const column = grouped[year];
        column.forEach((b, i) => {
            b.targetX = currentX;
            b.targetY = startY + i * rowSpacing;
        });
        currentX += colSpacing;
    });
}

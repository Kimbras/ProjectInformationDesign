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
    const grouped = groupByYear(bolletjes);             
    const years = Object.keys(grouped).sort((a, b) => a - b); 

    const startX = 100;   
    const startY = 100;   
    const colSpacing = 100; 
    const rowSpacing = 30;  
    const xJitter = 10;    // maximale horizontale variatie ±10px

    let currentX = startX;

    years.forEach(year => {
        const column = grouped[year];
        column.forEach((b, i) => {
            const offsetX = (Math.random() - 0.5) * 2 * xJitter; // random tussen -10 en +10
            b.targetX = currentX + offsetX;                
            b.targetY = startY + i * rowSpacing; 
        });

        // Label boven eerste bolletje van het jaar
        if (column.length > 0) {
            column[0].yearLabelX = currentX;
            column[0].yearLabelY = startY - 30;
        }

        currentX += colSpacing; 
    });
}


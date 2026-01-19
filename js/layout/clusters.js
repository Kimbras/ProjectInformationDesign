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

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

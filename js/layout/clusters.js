import { canvas } from "../canvas/canvas.js";

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

// Bolletjes arrangeren op jaar met labels boven
export function arrangeByYear(bolletjes) {
  const grouped = groupByYear(bolletjes);
  const years = Object.keys(grouped).sort((a, b) => a - b);

  const paddingX = 60;       // marge links/rechts
  const topPadding = 80;     // ruimte voor labels
  const bottomPadding = 40;  // marge onderaan
  const xJitterMax = 10;     // maximale horizontale jitter

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  const totalWidth = canvasWidth - paddingX * 2;
  const colCount = years.length;
  const colSpacing = colCount > 1 ? totalWidth / (colCount - 1) : 0;

  years.forEach((year, idx) => {
    const column = grouped[year];
    const columnX = paddingX + idx * colSpacing;

    // verticale spacing zodat bolletjes binnen canvas blijven
    const availableHeight = canvasHeight - topPadding - bottomPadding;
    const rowSpacing = column.length > 1 ? Math.min(30, availableHeight / (column.length - 1)) : 0;

    column.forEach((b, i) => {
      // horizontale jitter binnen canvas
      const maxOffsetLeft = Math.min(xJitterMax, columnX - paddingX - b.r);
      const maxOffsetRight = Math.min(xJitterMax, canvasWidth - paddingX - columnX - b.r);
      const offsetX = (Math.random() - 0.5) * 2 * Math.min(maxOffsetLeft, maxOffsetRight);

      b.targetX = columnX + offsetX;
      b.targetY = topPadding + i * rowSpacing;
    });

    // Label boven eerste bol van het jaar
    if (column.length > 0) {
      column[0].yearLabelX = columnX;
      column[0].yearLabelY = topPadding - 20;
    }
  });
}




// SORTEERFUNCTIES
export function sortByYear(bolletjes) {
  return [...bolletjes].sort((a, b) => a.data.year - b.data.year);
}

export function sortBySize(bolletjes) {
  return [...bolletjes].sort((a, b) => (b.r ** 2) - (a.r ** 2));
}

export function sortByCluster(bolletjes) {
  return bolletjes.map((b, i) => ({ ...b, cluster: i % 3 }));
}

export function sortByMadeLocation(bolletjes) {
  return [...bolletjes].sort((a, b) => a.data.madeIn.localeCompare(b.data.madeIn));
}

export function sortByCurrentLocation(bolletjes) {
  return [...bolletjes].sort((a, b) => a.data.currentLocation.localeCompare(b.data.currentLocation));
}

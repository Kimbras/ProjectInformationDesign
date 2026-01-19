import { ctx } from "../canvas/canvas.js";

export function addClusterLabel(bolletje, x, y) {
  const imgSize = 80; // grootte van de afbeelding
  const textOffset = 4; // ruimte tussen afbeelding en tekst

  const p = bolletje.data; // schilderij info

  // Bereken y startpunt voor de afbeelding
  // y is bovenkant bolletje, we tekenen afbeelding erboven
  const imgY = y - imgSize;

  // Teken afbeelding
  if (bolletje.img && bolletje.img.complete) {
    ctx.drawImage(bolletje.img, x - imgSize / 2, imgY, imgSize, imgSize);
  }

  // Teken tekst direct onder de afbeelding
  ctx.fillStyle = "black";
  ctx.font = "14px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  const lines = [
    p.title,
    `Year: ${p.year}`,
    `Made in: ${p.madeIn}`,
    `Location: ${p.currentLocation}`,
    `Size: ${p.width} x ${p.height} cm`
  ];

  const lineHeight = 16;

  // tekst begint onder afbeelding
  const textStartY = imgY + imgSize + textOffset;

  lines.forEach((line, i) => {
    ctx.fillText(line, x, textStartY + i * lineHeight);
  });
}

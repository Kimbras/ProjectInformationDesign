import { ctx, canvas } from "../canvas/canvas.js";

export function addClusterLabel(bolletje, x, y) {
  const p = bolletje.data;
  const imgSize = 80;
  const padding = 6;          // ruimte rondom label
  const lineHeight = 16;
  const textOffset = 4;

  const lines = [
    p.title,
    `Year: ${p.year}`,
    `Made in: ${p.madeIn}`,
    `Location: ${p.currentLocation}`,
    `Size: ${p.width} x ${p.height} cm`
  ];

  const textHeight = lines.length * lineHeight;
  const totalHeight = imgSize + textOffset + textHeight + padding * 2;
  const textWidths = lines.map(line => ctx.measureText(line).width);
  const totalWidth = Math.max(imgSize, ...textWidths) + padding * 2;

  // label standaard boven bolletje
  let labelX = x;
  let labelY = y - bolletje.r - totalHeight;

  // pas aan bij canvas randen
  if (labelX - totalWidth / 2 < 0) labelX = totalWidth / 2 + 2;
  if (labelX + totalWidth / 2 > canvas.width) labelX = canvas.width - totalWidth / 2 - 2;
  if (labelY < 0) labelY = y + bolletje.r + 8; // onder bolletje als niet genoeg ruimte

  // achtergrond met schaduw
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.shadowColor = "rgba(0,0,0,0.3)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  ctx.fillRect(
    labelX - totalWidth / 2,
    labelY,
    totalWidth,
    totalHeight
  );

  // schaduw resetten
  ctx.shadowColor = "transparent";

  // afbeelding tekenen boven tekst
  if (!bolletje.img && p.image) {
    bolletje.img = new Image();
    bolletje.img.src = p.image;
  }
  if (bolletje.img && bolletje.img.complete) {
    ctx.drawImage(
      bolletje.img,
      labelX - imgSize / 2,
      labelY + padding,
      imgSize,
      imgSize
    );
  }

  // tekst tekenen
  ctx.fillStyle = "black";
  ctx.font = "14px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  lines.forEach((line, i) => {
    ctx.fillText(line, labelX, labelY + padding + imgSize + textOffset + i * lineHeight);
  });
}

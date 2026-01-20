/* =====================
   CANVAS SETUP
===================== */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const imageCache = {};

let mode = "paintings"; // startmodus

document.getElementById("showPaintingsBtn").addEventListener("click", () => {
  mode = "paintings"; // terug naar bolletjes schilderijen
});

document.getElementById("showLettersBtn").addEventListener("click", () => {
    mode = "letters";

    // Bolletjes “uitzetten”
    bolletjes.forEach(b => b.target = null);
});


// Knoppen referenties

const paintingsBtn = document.getElementById("paintingsBtn");
const yearBtn = document.getElementById("yearBtn");
const madeInBtn = document.getElementById("madeInBtn");
const currentLocationBtn = document.getElementById("currentLocationBtn");

let clusterLabels = [];




const dpr = window.devicePixelRatio || 1;
canvas.width = canvas.clientWidth * dpr;
canvas.height = canvas.clientHeight * dpr;
ctx.scale(dpr, dpr);
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = "high";


function resize() {
  canvas.width = window.innerWidth - sidebar.offsetWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

const mouse = { x: 0, y: 0 };

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

const MARGIN = 30;

function cw() {
  return canvas.clientWidth;
}

function ch() {
  return canvas.clientHeight;
}
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}



// titel boven de klusters

function addClusterLabel(text, x, y) {
  clusterLabels.push({ text, x, y });
}

function sortByYear() {
  clusterLabels = [];

  const centerY = ch() / 2;
  const spacing = 120;
  const years = [...new Set(bolletjes.map(b => b.data.year))].sort();

  years.forEach((year, i) => {
    const x = 200 + i * spacing;

    addClusterLabel(year, x, centerY - 60);

    bolletjes
      .filter(b => b.data.year === year)
      .forEach((b, j) => {
        b.target = {
          x,
          y: centerY + j * 20
        };
      });
  });
}

function sortByLocation(field) {
  clusterLabels = [];

  const spacing = 140;
  const keys = [...new Set(bolletjes.map(b => b.data[field]))];

  keys.forEach((key, i) => {
    const x = 200 + i * spacing;
    const y = canvas.height / 2;

    addClusterLabel(key, x, y - 70);

    bolletjes
      .filter(b => b.data[field] === key)
      .forEach((b, j) => {
        b.target = {
          x: x + (j % 5) * 18,
          y: y + Math.floor(j / 5) * 18
        };
      });
  });
}

function sortBySize() {
  clusterLabels = [];

  const sorted = [...bolletjes].sort(
    (a, b) => (a.data.width * a.data.height) - (b.data.width * b.data.height)
  );

  const x = canvas.width / 2;

  sorted.forEach((b, i) => {
    b.target = {
      x,
      y: canvas.height - 80 - i * 18
    };
  });

  addClusterLabel("Klein → Groot", x, 40);
}

ctx.font = "16px Inter, Arial, sans-serif"; // Inter is strak en modern
ctx.fillStyle = "white";
ctx.textAlign = "center";
ctx.textBaseline = "bottom";

clusterLabels.forEach(label => {
  ctx.fillText(label.text, label.x, label.y);
});



/* =====================
   KLEUREN
===================== */
const KLEUREN = [
  "#f6df75",
  "#b12603",
  "#679ddb",
  "#d3a818",
  "#89a844",
  "#d0d7ab"
];

/* =====================
   DATA (brieven)
===================== */
const LETTER_MARGIN = 120;

const letters = [
  { img: "img/brief-2juli1873.png" },
  { img: "img/brief-3maart-1874.png" },
  { img: "img/brief-3maart-1874I.png" },
  { img: "img/brief-5mei1873.png" },
  { img: "img/brief-7augustus1873.png" },
  { img: "img/brief-7juli-1874-1r.png" },
  { img: "img/brief-7juli-1874-1v.png" },
  { img: "img/brief-7juli-1874-2r.png" },
  { img: "img/brief-7juli-1874-3r.png" },
  { img: "img/brief-7juli-1874-4r.png" },
  { img: "img/brief-9feb-1874.png" },
  { img: "img/brief-9feb-1874I.png" },
  { img: "img/brief-9mei1873.png" },
  { img: "img/brief-10juli-1874.png" }
].map(l => ({
  ...l,
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  targetX: LETTER_MARGIN + Math.random() * (cw() - LETTER_MARGIN * 2),
targetY: LETTER_MARGIN + Math.random() * (ch() - LETTER_MARGIN * 2),
  floatPhase: Math.random() * Math.PI * 2,
  floatSpeed: 0.008 + Math.random() * 0.01
}));
/* =====================
   maken (brieven)
===================== */
function cw() {
  return canvas.clientWidth;
}

function ch() {
  return canvas.clientHeight;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (mode === "paintings") {
    drawPaintings();

    ctx.font = "15px Inter, Arial, sans-serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";

    clusterLabels.forEach(label => {
      ctx.fillText(label.text, label.x, label.y);
    });

    drawHoverInfo(); // 👈 hover blijft werken
  }

  if (mode === "letters") {
    drawLetters();   // 👈 HIER verschijnen je brieven
  }

  requestAnimationFrame(draw);
}


// aparte tekenfuncties

function drawPaintings() {
  bolletjes.forEach(b => {
    b.floatPhase += b.floatSpeed;

    const ox = Math.cos(b.floatPhase) * b.floatAmount;
    const oy = Math.sin(b.floatPhase) * b.floatAmount;

    const tx = b.target ? b.target.x : b.homeX;
    const ty = b.target ? b.target.y : b.homeY;

    b.x += (tx + ox - b.x) * 0.05;
    b.y += (ty + oy - b.y) * 0.05;

    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fillStyle = b.color;
    ctx.fill();
  });
}

// brieven tekenen 
function drawLetters() {
  letters.forEach(l => {
    if (!l.imgObj) {
      l.imgObj = new Image();
      l.imgObj.src = l.img;
    }

    // schaduw instellingen
  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
  ctx.shadowBlur = 25;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 12;


    l.floatPhase += l.floatSpeed;

    const ox = Math.cos(l.floatPhase) * 6;
    const oy = Math.sin(l.floatPhase) * 6;

    l.x += (l.targetX + ox - l.x) * 0.05;
    l.y += (l.targetY + oy - l.y) * 0.05;

    if (l.imgObj.complete) {
      ctx.drawImage(l.imgObj, l.x, l.y, 140, 180);
    }
  });
}


function VanGogh() {
  mode = "letters";
  clusterLabels = [];
  bolletjes.forEach(b => b.target = null);
  console.log("VanGogh functie uitgevoerd!");
}



function resizeCanvas() {
  canvas.width = window.innerWidth - (sidebar?.offsetWidth || 0);
  canvas.height = window.innerHeight;
}

letters.forEach(l => {
  const img = new Image();
  img.src = l.img;
  img.onload = () => console.log(`Afbeelding geladen: ${l.img}`);
});


/* =====================
   DATA (schilderijen)
===================== */
const paintings = [
  {
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "Amandelbloesem",
    year: 1890,
    madeIn: "Saint-Rémy, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 92.0,
    height: 73.5
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "Bloeiende amandelboom (detailstudie)",
    year: 1890,
    madeIn: "Saint-Rémy, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 46.0,
    height: 55.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "Bloeiende perzikbomen",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 92.0,
    height: 73.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "Bloemenvaas met klaprozen",
    year: 1886,
    madeIn: "Parijs, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 32.0,
    height: 41.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "Boer die spit",
    year: 1885,
    madeIn: "Nuenen, Nederland",
    currentLocation: "Van Gogh Museum",
    width: 39.0,
    height: 48.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "Boerderijen bij Loosduinen",
    year: 1882,
    madeIn: "Loosduinen, Nederland",
    currentLocation: "Van Gogh Museum",
    width: 55.0,
    height: 36.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "Boerenhuis en korenveld",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 100.0,
    height: 50.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "Boerenhuis met rieten dak",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 100.0,
    height: 50.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "Boerin met strohoed",
    year: 1885,
    madeIn: "Nuenen, Nederland",
    currentLocation: "Van Gogh Museum",
    width: 34.0,
    height: 42.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "Bomen in de tuin van het ziekenhuis",
    year: 1889,
    madeIn: "Saint-Rémy, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 91.0,
    height: 72.0
  },
   {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "Boomgaard met abrikozen in bloei",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 92.0,
    height: 73.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "Boomgaard met bloeiende pruimenbomen",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 92.0,
    height: 73.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "Boomgaard omzoomd met cipressen",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 92.0,
    height: 73.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "Bosgrond",
    year: 1882,
    madeIn: "Den Haag, Nederland",
    currentLocation: "Van Gogh Museum",
    width: 60.0,
    height: 45.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "Brug bij Trinquetaille",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 92.0,
    height: 73.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "Brug over de Seine bij Asnières",
    year: 1887,
    madeIn: "Asnières, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 65.0,
    height: 50.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "Cipressen tegen een bewolkte hemel",
    year: 1889,
    madeIn: "Saint-Rémy, Frankrijk",
    currentLocation: "Metropolitan Museum of Art",
    width: 74.0,
    height: 93.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "Cypressen",
    year: 1889,
    madeIn: "Saint-Rémy, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 73.0,
    height: 92.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "De Aardappeleters",
    year: 1885,
    madeIn: "Nuenen, Nederland",
    currentLocation: "Van Gogh Museum",
    width: 114.0,
    height: 82.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "De akkers bij Auvers",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 100.0,
    height: 50.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "De bergen bij Saint-Rémy",
    year: 1889,
    madeIn: "Saint-Rémy, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 92.0,
    height: 72.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "De boomwortels",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 100.0,
    height: 50.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "De Boulevard de Clichy",
    year: 1887,
    madeIn: "Parijs, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 55.0,
    height: 46.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "De brug bij Auvers",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 65.0,
    height: 50.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "De cipressen met twee figuren",
    year: 1889,
    madeIn: "Saint-Rémy, Frankrijk",
    currentLocation: "National Gallery, Londen",
    width: 74.0,
    height: 93.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "De cipressenweg",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Musée d'Orsay",
    width: 74.0,
    height: 93.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "De gele huis",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 94.0,
    height: 76.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "De herberg Ravoux",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 65.0,
    height: 50.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "De heuvel van Montmartre met steengroeven",
    year: 1887,
    madeIn: "Parijs, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 54.0,
    height: 45.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "De heuvels rond Auvers",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 100.0,
    height: 50.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "De kerk in Auvers (studievariant)",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 36.0,
    height: 45.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "De Kerk van Auvers",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Musée d'Orsay",
    width: 94.0,
    height: 74.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "De laatste korenvelden",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 100.0,
    height: 50.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "De Langloisbrug bij Arles",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Wallraf-Richartz Museum",
    width: 54.0,
    height: 65.0
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "De olijfbomen met bergen",
    year: 1889,
    madeIn: "Saint-Rémy, Frankrijk",
    currentLocation: "Metropolitan Museum of Art",
    width: 91.4,
    height: 72.4
  },
  {
     image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0176V1962_gb.jpg/full/!682,440/0/default.jpg",
    title: "De olijfgaard met blauwe lucht",
    year: 1889,
    madeIn: "Saint-Rémy, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 92.0,
    height: 72.0
  },
  {
    title: "De openbare tuin in Arles",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 92.0,
    height: 73.0
  },
  {
    title: "De ophaalbrug",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 65.0,
    height: 54.0
  },
  {
    title: "De oude kerktoren in Nuenen",
    year: 1884,
    madeIn: "Nuenen, Nederland",
    currentLocation: "Van Gogh Museum",
    width: 33.0,
    height: 43.0
  },
  {
    title: "De pastorietuin in Nuenen",
    year: 1884,
    madeIn: "Nuenen, Nederland",
    currentLocation: "Van Gogh Museum",
    width: 34.0,
    height: 44.0
  },
  {
    title: "De Pinksterbloemen",
    year: 1884,
    madeIn: "Nuenen, Nederland",
    currentLocation: "Van Gogh Museum",
    width: 50.0,
    height: 40.0
  },
  {
    title: "De populierenlaan",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 100.0,
    height: 50.0
  },
  {
    title: "De rivier bij Asnières",
    year: 1887,
    madeIn: "Asnières, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 54.0,
    height: 44.0
  },
  {
    title: "De rode dakpannen",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Musée d'Orsay",
    width: 92.0,
    height: 72.0
  },
  {
    title: "De Rode Wijngaard",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Museum of Fine Arts, Boston",
    width: 81.0,
    height: 92.0
  },
  {
    title: "De rode wijngaard bij Arles (detailvariant)",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Pushkin Museum, Moskou",
    width: 92.0,
    height: 73.0
  },
  {
    title: "De Schuur van Roulin",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 50.0,
    height: 61.0
  },
  {
    title: "De slaapkamer (derde versie)",
    year: 1889,
    madeIn: "Saint-Rémy, Frankrijk",
    currentLocation: "Art Institute of Chicago",
    width: 90.0,
    height: 72.0
  },
  {
    title: "De Slaapkamer (eerste versie)",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 90.0,
    height: 72.0
  },
  {
    title: "De slaapkamer (tweede versie)",
    year: 1889,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 90.0,
    height: 72.0
  },
  {
    title: "De sower (zonsondergang)",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 80.5,
    height: 64.0
  },
  {
    title: "De stoel van Gauguin",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 72.0,
    height: 90.0
  },
  {
    title: "De tuin met kippen",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 65.0,
    height: 50.0
  },
  {
    title: "De tuin van Daubigny",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Hiroshima Museum of Art",
    width: 101.0,
    height: 56.0
  },
  {
    title: "De tuin van Daubigny (tweede versie)",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 103.0,
    height: 53.0
  },
  {
    title: "De tuin van het ziekenhuis in Arles",
    year: 1889,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Espace Van Gogh",
    width: 92.0,
    height: 73.0
  },
  {
    title: "De velden bij Auvers na de regen",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 100.0,
    height: 50.0
  },
  {
    title: "De vlakte van Auvers",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 100.0,
    height: 50.0
  },
  {
    title: "De weg naar Auvers",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 100.0,
    height: 50.0
  },
  {
    title: "De weg naar de gevangenis",
    year: 1890,
    madeIn: "Saint-Rémy, Frankrijk",
    currentLocation: "Pushkin Museum",
    width: 64.0,
    height: 80.0
  },
  {
    title: "De witte boomstammen",
    year: 1889,
    madeIn: "Saint-Rémy, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 92.0,
    height: 72.0
  },
  {
    title: "De Zaaier",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 80.5,
    height: 64.0
  },
  {
    title: "De zee bij Les Saintes-Maries",
    year: 1888,
    madeIn: "Saintes-Maries-de-la-Mer, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 81.0,
    height: 65.0
  },
  {
    title: "De ziekenhuisgang in Saint-Rémy",
    year: 1889,
    madeIn: "Saint-Rémy, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 92.0,
    height: 73.0
  },
  {
    title: "Gezicht op de moestuin",
    year: 1884,
    madeIn: "Nuenen, Nederland",
    currentLocation: "Van Gogh Museum",
    width: 60.0,
    height: 45.0
  },
  {
    title: "Groentetuinen op Montmartre",
    year: 1887,
    madeIn: "Parijs, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 38.0,
    height: 46.0
  },
  {
    title: "Het Caféterras bij Nacht",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Musée d'Orsay",
    width: 65.0,
    height: 80.0
  },
  {
    title: "Het gele huis (achterzijde)",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 90.0,
    height: 72.0
  },
  {
    title: "Het Gele Huis (voorzijde)",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 72.0,
    height: 82.0
  },
  {
    title: "Het huis van Dr. Gachet",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Musée d'Orsay",
    width: 57.0,
    height: 68.0
  },
  {
    title: "Het nachtcafé",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 92.0,
    height: 72.0
  },
  {
    title: "Het park van het ziekenhuis in Saint-Rémy",
    year: 1889,
    madeIn: "Saint-Rémy, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 92.0,
    height: 72.0
  },
  {
    title: "Het regende bij Auvers",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "National Gallery of Wales",
    width: 100.0,
    height: 50.0
  },
  {
    title: "Het Slaapkamer",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 90.0,
    height: 72.0
  },
  {
    title: "Het strand bij Scheveningen",
    year: 1882,
    madeIn: "Scheveningen, Nederland",
    currentLocation: "Van Gogh Museum",
    width: 51.0,
    height: 34.0
  },
  {
    title: "Huizen in Auvers",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 100.0,
    height: 50.0
  },
  {
    title: "Irissen",
    year: 1889,
    madeIn: "Saint-Rémy, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 93.0,
    height: 71.0
  },
  {
    title: "Irissen (tweede versie)",
    year: 1889,
    madeIn: "Saint-Rémy, Frankrijk",
    currentLocation: "J. Paul Getty Museum",
    width: 94.3,
    height: 74.3
  },
  {
    title: "Kerkhof in Nuenen",
    year: 1884,
    madeIn: "Nuenen, Nederland",
    currentLocation: "Van Gogh Museum",
    width: 33.0,
    height: 41.0
  },
  {
    title: "Kop van een boerin met witte muts",
    year: 1885,
    madeIn: "Nuenen, Nederland",
    currentLocation: "Van Gogh Museum",
    width: 36.0,
    height: 44.0
  },
  {
    title: "Kop van een vrouw",
    year: 1885,
    madeIn: "Nuenen, Nederland",
    currentLocation: "Van Gogh Museum",
    width: 38.0,
    height: 47.0
  },
{
    title: "Korenveld achter het klooster",
    year: 1889,
    madeIn: "Saint-Rémy, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 92.0,
    height: 73.0
  },
  {
    title: "Korenveld bij Auvers",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 100.0,
    height: 50.0
  },
  {
    title: "Korenveld met kraaien",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 103.0,
    height: 50.5
  },
  {
    title: "Korenveld met maaiers",
    year: 1889,
    madeIn: "Saint-Rémy, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 92.0,
    height: 73.0
  },
  {
    title: "Korenveld met schoven bij zonsondergang",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 100.0,
    height: 50.0
  },
  {
    title: "Landschap bij Montmartre",
    year: 1887,
    madeIn: "Parijs, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 54.0,
    height: 45.0
  },
  {
    title: "Landschap met koren en wolken",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 100.0,
    height: 50.0
  },
  {
    title: "Landschap met regen",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "National Gallery of Wales",
    width: 100.0,
    height: 50.0
  },
  {
    title: "Olijfbomen met gele lucht en zon",
    year: 1889,
    madeIn: "Saint-Rémy, Frankrijk",
    currentLocation: "Museum of Modern Art, New York",
    width: 92.0,
    height: 72.0
  },
  {
    title: "Olijfgaard",
    year: 1889,
    madeIn: "Saint-Rémy, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 92.0,
    height: 72.0
  },
  {
    title: "Portret van Adeline Ravoux",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Cleveland Museum of Art",
    width: 41.0,
    height: 52.0
  },
  {
    title: "Portret van Armand Roulin",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Museum Folkwang",
    width: 54.0,
    height: 65.0
  },
  {
    title: "Portret van Dr. Gachet (eerste versie)",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Musée d'Orsay",
    width: 56.0,
    height: 67.0
  },
  {
    title: "Portret van een vrouw met blauwe sjaal",
    year: 1885,
    madeIn: "Nuenen, Nederland",
    currentLocation: "Van Gogh Museum",
    width: 36.0,
    height: 44.0
  },
  {
    title: "Portret van Joseph Roulin",
    year: 1889,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Museum of Modern Art, New York",
    width: 54.0,
    height: 65.0
  },
  {
    title: "Portret van Madame Roulin",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Museum of Fine Arts, Boston",
    width: 73.0,
    height: 92.0
  },
  {
    title: "Portret van Père Tanguy",
    year: 1887,
    madeIn: "Parijs, Frankrijk",
    currentLocation: "Musée Rodin",
    width: 75.0,
    height: 92.0
  },
  {
    title: "Sterrennacht",
    year: 1889,
    madeIn: "Saint-Rémy, Frankrijk",
    currentLocation: "Museum of Modern Art, New York",
    width: 92.1,
    height: 73.7
  },
  {
    title: "Stilleven met aardewerk en fruit",
    year: 1886,
    madeIn: "Parijs, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 38.0,
    height: 46.0
  },
  {
    title: "Stilleven met absint",
    year: 1887,
    madeIn: "Parijs, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 38.0,
    height: 46.0
  },
  {
    title: "Stilleven met bijbel",
    year: 1885,
    madeIn: "Nuenen, Nederland",
    currentLocation: "Van Gogh Museum",
    width: 78.5,
    height: 65.0
  },
  {
    title: "Stilleven met bloeiende amandel takken",
    year: 1890,
    madeIn: "Saint-Rémy, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 46.0,
    height: 55.0
  },
  {
    title: "Stilleven met bloemen en rozen",
    year: 1886,
    madeIn: "Parijs, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 41.0,
    height: 46.0
  },
  {
    title: "Stilleven met karaf en citroenen",
    year: 1887,
    madeIn: "Parijs, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 33.0,
    height: 41.0
  },
  {
    title: "Stilleven met kool en klompen",
    year: 1881,
    madeIn: "Etten, Nederland",
    currentLocation: "Van Gogh Museum",
    width: 41.0,
    height: 32.0
  },
  {
    title: "Stilleven met perziken en citroenen",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 53.0,
    height: 43.0
  },
  {
    title: "Stilleven met uien",
    year: 1889,
    madeIn: "Saint-Rémy, Frankrijk",
    currentLocation: "Kroller-Müller Museum",
    width: 35.0,
    height: 43.0
  },
  {
    title: "Vaas met anjers",
    year: 1886,
    madeIn: "Parijs, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 38.0,
    height: 46.0
  },
  {
    title: "Vaas met irissen",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "National Gallery, Londen",
    width: 60.0,
    height: 70.0
  },
  {
    title: "Vaas met rozen",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 46.0,
    height: 55.0
  },
  {
    title: "Van Goghs stoel",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 73.0,
    height: 92.0
  },
  {
    title: "Veld met korenaren",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 91.0,
    height: 72.0
  },
  {
    title: "Vissersboten op het strand bij Les Saintes-Maries",
    year: 1888,
    madeIn: "Saintes-Maries-de-la-Mer, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 81.0,
    height: 65.0
  },
  {
    title: "Watermolen in Gennep",
    year: 1884,
    madeIn: "Gennep, Nederland",
    currentLocation: "Van Gogh Museum",
    width: 38.0,
    height: 45.0
  },
  {
    title: "Weg met cipressen en sterren",
    year: 1890,
    madeIn: "Auvers-sur-Oise, Frankrijk",
    currentLocation: "Kroller-Müller Museum",
    width: 73.0,
    height: 92.0
  },
  {
    title: "Wever met weefgetouw",
    year: 1884,
    madeIn: "Nuenen, Nederland",
    currentLocation: "Van Gogh Museum",
    width: 60.5,
    height: 70.5
  },
  {
    title: "Wolken boven de Rhône",
    year: 1888,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Musée d'Orsay",
    width: 90.0,
    height: 72.0
  },
  {
    title: "Zelfportret",
    year: 1887,
    madeIn: "Parijs, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 32.5,
    height: 41.0
  },
  {
    title: "Zelfportret als schilder",
    year: 1888,
    madeIn: "Parijs, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 31.0,
    height: 40.0
  },
  {
    title: "Zelfportret met grijze vilthoed",
    year: 1887,
    madeIn: "Parijs, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 37.2,
    height: 44.5
  },
  {
    title: "Zelfportret met verbonden oor",
    year: 1889,
    madeIn: "Saint-Rémy, Frankrijk",
    currentLocation: "Courtauld Gallery, Londen",
    width: 49.0,
    height: 60.0
  },
  {
    title: "Zicht op Parijs vanaf Montmartre",
    year: 1887,
    madeIn: "Parijs, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 33.0,
    height: 44.0
  },
  {
    title: "Zonnebloemen",
    year: 1889,
    madeIn: "Arles, Frankrijk",
    currentLocation: "Van Gogh Museum",
    width: 73.0,
    height: 95.0
  },
  {
    title: "Zonnebloemen (vierde versie)",
    year: 1889,
    madeIn: "Arles, Frankrijk",
    currentLocation: "National Gallery, Londen",
    width: 73.0,
    height: 92.1
  }
];
/* =====================
   Tot 126 ingevuld
===================== */



/* =====================
   BOLLETJES MAKEN
===================== */
const bolletjes = paintings.map((p, i) => {
  const area = p.width * p.height;
  const x = Math.random() * cw();
  const y = Math.random() * ch();


  return {
    data: p,
    x,
    y,

    // 👇 NIEUW: vrije-positie
    homeX: x,
    homeY: y,

    r: Math.sqrt(area) * 0.06,
    color: KLEUREN[i % KLEUREN.length],
    target: null,

    floatPhase: Math.random() * Math.PI * 2,
    floatSpeed: 0.01 + Math.random() * 0.02,
    floatAmount: 3 + Math.random() * 4
  };
});




/* =====================
   CLUSTERING
===================== */
function sortByCluster(field) {
  clusterLabels = [];
  const groups = {};

  //  Groepeer bolletjes
  bolletjes.forEach(b => {
    const key = b.data[field];
    if (!groups[key]) groups[key] = [];
    groups[key].push(b);
  });

  const keys = Object.keys(groups);

  //const groupSpacingX = 200;
  //const groupSpacingY = 150;
  const maxCols = 5;
  const margin = 30;

  // kleur per groep
  const groupColors = {};

  const sidebarWidth = sidebar.offsetWidth || 250; // fallback als sidebar niet zichtbaar
  const availableWidth = canvas.width - sidebarWidth - 2 * margin;
  const availableHeight = canvas.height - 2 * margin;

 // bepaal horizontale en verticale spacing afhankelijk van canvas
  const cols = Math.min(maxCols, keys.length);
  const rows = Math.ceil(keys.length / cols);
  const groupSpacingX = availableWidth / cols;
  const groupSpacingY = availableHeight / rows;
  
  keys.forEach((key, index) => {
    const group = groups[key];

    // vaste kleur per cluster
    groupColors[key] = KLEUREN[index % KLEUREN.length];

const canvasW = canvas.clientWidth;
const canvasH = canvas.clientHeight;

// grid
// Bepaal horizontale en verticale spacing afhankelijk van canvas
const cols = Math.min(maxCols, keys.length);
const rows = Math.ceil(keys.length / cols);

// Voeg extra verticale margefactor toe (bijvoorbeeld 1.2)
const verticalFactor = 1.2;

const groupSpacingX = availableWidth / cols;
const groupSpacingY = (availableHeight / rows) * verticalFactor; // meer ruimte tussen rijen


// max ruimte die 1 cluster inneemt
const clusterWidth = groupSpacingX;
const clusterHeight = groupSpacingY;

// veilige zone (waar clusters mogen staan)
const safeLeft = margin + clusterWidth / 1;
const safeRight = canvasW - margin - clusterWidth / 8;
const safeTop = margin + clusterHeight / 2;
const safeBottom = canvasH - margin - clusterHeight / 2;

// totale grid-grootte
const totalWidth = (cols - 1) * groupSpacingX;
const totalHeight = (rows - 1) * groupSpacingY;

// startpunt zodat alles binnen safe zone blijft
const originX = clamp(
  canvasW / 2 - totalWidth / 2,
  safeLeft,
  safeRight - totalWidth
);

const originY = clamp(
  canvasH / 2 - totalHeight / 2,
  safeTop,
  safeBottom - totalHeight
);

// positie per cluster
const col = index % cols;
const row = Math.floor(index / cols);

let startX = originX + col * groupSpacingX;
let startY = originY + row * groupSpacingY;

    // label boven cluster
    addClusterLabel(key, startX, startY - 60);

    //  bolletjes binnen cluster
    const gridCols = Math.ceil(Math.sqrt(group.length));
    const gridRows = Math.ceil(group.length / gridCols);
    const gridSpacing = 26;

    group.forEach((b, i) => {
      let x =
        startX +
        (i % gridCols) * gridSpacing -
        ((gridCols - 1) * gridSpacing) / 2;

      let y =
        startY +
        Math.floor(i / gridCols) * gridSpacing -
        ((gridRows - 1) * gridSpacing) / 2;

      // 🔒 altijd binnen canvas
      x = Math.min(Math.max(x, margin), canvas.width - margin);
      y = Math.min(Math.max(y, margin), canvas.height - margin);

      b.target = { x, y };
      b.color = groupColors[key];
    });
  });
}


function sortByMadeLocation() {
  sortByCluster("madeIn");
}

function sortByCurrentLocation() {
  sortByCluster("currentLocation");
}

function sortByYear() {
  sortByCluster("yearCount");
}


function sortByYear() {
  clusterLabels = [];

  const centerY = canvas.height / 5;
  const padding = 40;
  const availableWidth = canvas.width - padding * 2;

  const years = [...new Set(bolletjes.map(b => b.data.year))].sort();
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  const yearCount = {};

  years.forEach(year => {
    const t = (year - minYear) / (maxYear - minYear || 1);
    const x = padding + t * availableWidth;

    addClusterLabel(year, x, centerY - 40);
    yearCount[year] = 0;
  });

  bolletjes.forEach(b => {
    const year = b.data.year;
    const t = (year - minYear) / (maxYear - minYear || 1);

    const x = padding + t * availableWidth;
    const y = centerY + yearCount[year] * 16;

    yearCount[year]++;
    b.target = { x, y };
  });
}




function sortBySize() {
  clusterLabels = [];
  const paddingTop = 80;
  const paddingBottom = 80;
  const paddingSide = 120;

  // sorteer klein → groot
  bolletjes.sort((a, b) =>
    a.data.width * a.data.height -
    b.data.width * b.data.height
  );

  const sizes = bolletjes.map(
    b => b.data.width * b.data.height
  );

  const minSize = Math.min(...sizes);
  const maxSize = Math.max(...sizes);

  const cols = Math.ceil(Math.sqrt(bolletjes.length));
  const colSpacing = 60;

  bolletjes.forEach((b, i) => {
    const size = b.data.width * b.data.height;

    // normaliseer grootte → Y (onder klein, boven groot)
    const t = (size - minSize) / (maxSize - minSize || 1);
    const y =
      canvas.height -
      paddingBottom -
      t * (canvas.height - paddingTop - paddingBottom);

    // lichte horizontale spreiding (staaf-effect)
    const col = i % cols;
    const row = Math.floor(i / cols);

    const x =
      canvas.width / 2 +
      (col - cols / 2) * colSpacing +
      row * 6; // kleine variatie

    b.target = { x, y };
  });
}



/* =====================
   TEKEN + ANIMEER
===================== */
function getHoveredBolletje() {
  return bolletjes.find(
    b => Math.hypot(b.x - mouse.x, b.y - mouse.y) <= b.r + 40
  );
}

function drawBolletjes() {
  bolletjes.forEach(b => {
    b.floatPhase += b.floatSpeed;

    const ox = Math.cos(b.floatPhase) * b.floatAmount;
    const oy = Math.sin(b.floatPhase) * b.floatAmount;

    const tx = b.target ? b.target.x : b.homeX;
    const ty = b.target ? b.target.y : b.homeY;

    b.x += (tx + ox - b.x) * 0.05;
    b.y += (ty + oy - b.y) * 0.05;

    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fillStyle = b.color;
    ctx.fill();
  });

  ctx.font = "15px sans-serif";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";

  clusterLabels.forEach(label => {
    ctx.fillText(
      label.text,
      Math.round(label.x) + 0.5,
      Math.round(label.y) + 0.5
    );
  });
}

function drawHoverInfo() {
  const hovered = getHoveredBolletje();
  if (!hovered) return;

  const info = hovered.data;

  const lines = [
    info.title,
    `Jaar: ${info.year}`,
    `Gemaakt in: ${info.madeIn}`,
    `Museum: ${info.currentLocation}`,
    `Afmetingen: ${info.height} × ${info.width} cm`
  ];

  const padding = 8;
  const lineHeight = 18;
  const imageWidth = 120;
  const imageHeight = 80;
  const imageTextSpacing = 12;

  ctx.font = "500 16px Inter, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ffffff";

  const textWidth = Math.max(...lines.map(l => ctx.measureText(l).width));
  const boxWidth = Math.max(imageWidth, textWidth) + padding * 2;
  const boxHeight =
    imageHeight +
    imageTextSpacing +
    lines.length * lineHeight +
    padding * 3;

  let x = hovered.x + hovered.r + 12;
  let y = hovered.y - boxHeight / 2;

  if (x + boxWidth > canvas.width) x = hovered.x - boxWidth - 12;
  if (y < 10) y = 10;
  if (y + boxHeight > canvas.height)
    y = canvas.height - boxHeight - 10;

  ctx.fillStyle = "rgba(0,0,0,0.75)";
  ctx.fillRect(x, y, boxWidth, boxHeight);

  ctx.fillStyle = "white";
  lines.forEach((line, i) => {
    ctx.fillText(
      line,
      x + boxWidth / 2,
      y + padding * 2 + imageHeight + imageTextSpacing + i * lineHeight
    );
  });

  if (info.image) {
    if (!imageCache[info.image]) {
      const img = new Image();
      img.src = info.image;
      imageCache[info.image] = img;
    }

    const img = imageCache[info.image];
    if (img.complete) {
      ctx.drawImage(
        img,
        x + (boxWidth - imageWidth) / 2,
        y + padding,
        imageWidth,
        imageHeight
      );
    }
  }
}



// Na 1 minuut alle bolletjes terug naar vrije staat
setTimeout(() => {
  bolletjes.forEach(b => (b.target = null));
}, 60_000);

//  foto
function getHoveredBolletje() {
  return bolletjes.find(
    b => Math.hypot(b.x - mouse.x, b.y - mouse.y) <= b.r + 10
  );
}
 
// button
const mainBtns = document.querySelectorAll(".mainBtn");

mainBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const group = btn.dataset.group;

    // alle mainBtns resetten
    mainBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // alle sub-buttons verbergen
    document.querySelectorAll(".subBtn").forEach(sb => sb.style.display = "none");

    // alleen de sub-buttons van deze groep tonen
    document.querySelectorAll(`.subBtn[data-group="${group}"]`).forEach(sb => {
      sb.style.display = "block";
    });
  });
});

// verhaal vertellen


const storyText = [
  "Welkom in het verhaal van Van Gogh.",
  "Hier zie je zijn vroege werken, klein en ingetogen.",
  "In de loop der jaren worden de werken kleurrijker en expressiever.",
  "We volgen zijn reizen door Frankrijk en Nederland.",
  "Kijk hoe de locaties van de schilderijen clusters vormen in het museum."
];

let storyIndex = 0;
const overlay = document.getElementById("storyOverlay");
let autoHideTimeout = null;
let autoPlay = true; // fase 1: automatisch afspelen

// Functie om tekst te tonen
function showStoryText(index) {
  if (index >= storyText.length) {
    overlay.style.display = "none";

  // Einde van automatisch verhaal: sidebar tonen
  sidebar.classList.add("show"); // <- hier verschijnt je sidebar
    resizeCanvas(); // 👈 deze is essentieel

    // Na automatisch afspelen: gebruiker kan zelf klikken
    autoPlay = false;
    overlay.addEventListener("click", manualClickHandler);
    return;
  }

  overlay.textContent = storyText[index];
  overlay.style.display = "block";
  
if (autoPlay) {
    // Speciaal voor de tweede zin (index 1)
    if (index === 1) {
      // 1 Laat de tekst even zien
      setTimeout(() => {
        overlay.style.display = "none";

        // 2 Laat tijdlijncluster zien
        sortByYear();

        // 3 Wacht even (bijv. 3 seconden) zodat de gebruiker het kan zien
        setTimeout(() => {
          // 4 Ga door met de volgende tekst
          storyIndex++;
          showStoryText(storyIndex);
        }, 3000);
      }, 4000); // 4 seconden tekst lezen
    } else {
      setTimeout(() => {
        overlay.style.display = "none";
        storyIndex++;
        showStoryText(storyIndex);
      }, 4000);
    }
  }
}

// Handmatige klik (fase 2)
function manualClickHandler() {
  if (storyIndex >= storyText.length) {
    overlay.style.display = "none";
    return;
  }
  overlay.style.display = "block";
  overlay.textContent = storyText[storyIndex];
  storyIndex++;
}

// Start automatisch afspelen
showStoryText(storyIndex);

draw(); // onderaan je script



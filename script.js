/* =====================
   CANVAS SETUP
===================== */
function hideColofon() {
  colofonOverlay.style.display = "none";
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const imageCache = {};
const colofonOverlay = document.getElementById("colofonOverlay");
const storyOverlay = document.getElementById("storyOverlay");
colofonOverlay.style.display = "none"; // start verborgenconst colofonOverlay

let mode = "paintings"; // startmodus
let inspirationPositionsInitialized = false;
let currentView = "paintings"; // standaard view

// helper functie om alle overlays te verbergen
function hideOverlays() {
  colofonOverlay.style.display = "none";
  storyOverlay.style.display = "none";
}

// main buttons
document.querySelectorAll(".mainBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentMain = btn.dataset.group;

    // standaard eerste sub button
    const firstSub = document.querySelector(`.subBtn[data-group="${currentMain}"]`);
    currentSub = firstSub?.dataset.view || "";

    // ✅ verberg overlays als je op een andere knop klikt
    if (btn.id !== "Colofon") hideOverlays();

    setActiveButtons();
    setActiveButton(currentMain);
  });
});

// sub buttons
document.querySelectorAll(".subBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentSub = btn.dataset.view;

    // ✅ verberg colofon als je op subknop klikt
    hideOverlays();

    // voer de sort functie uit
    const sortFunction = btn.getAttribute("onclick");
    if (sortFunction) eval(sortFunction);

    setActiveButtons();
  });
});

// Colofon button
document.getElementById("Colofon").addEventListener("click", () => {
  // overlay tonen
  colofonOverlay.style.display = "block";
  storyOverlay.style.display = "none";

  mode = "colofon";

  document.querySelectorAll(".mainBtn").forEach(btn => btn.classList.remove("active"));
  document.getElementById("Colofon").classList.add("active");
});



function setActiveButton(view) {
  const mainBtns = document.querySelectorAll(".mainBtn");
  mainBtns.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === view);
  });

  // laat juiste sub-buttons zien
  document.querySelectorAll(".subBtn").forEach(sb => sb.style.display = "none");
  const activeGroup = document.querySelector(`.mainBtn[data-view="${view}"]`)?.dataset.group;
  if (activeGroup) {
    document.querySelectorAll(`.subBtn[data-group="${activeGroup}"]`).forEach(sb => {
      sb.style.display = "block";
    });
  }
}

let currentMain = "schilderijen";   // actieve main button
let currentSub = "year";             // standaard actieve sub button

function setActiveButtons() {
  // main buttons
  document.querySelectorAll(".mainBtn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.group === currentMain);
  });

  // sub buttons
  document.querySelectorAll(".subBtn").forEach(btn => {
    const isActiveGroup = btn.dataset.group === currentMain;
    btn.style.display = isActiveGroup ? "block" : "none";
    btn.classList.toggle("active", isActiveGroup && btn.dataset.view === currentSub);
  });
}

// main button click
document.querySelectorAll(".mainBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentMain = btn.dataset.group;

    // standaard eerste sub button
    const firstSub = document.querySelector(`.subBtn[data-group="${currentMain}"]`);
    currentSub = firstSub?.dataset.view || "";

    setActiveButtons();
  });
});

// sub button click
document.querySelectorAll(".subBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentSub = btn.dataset.view;

    // voer de sort functie uit
    const sortFunction = btn.getAttribute("onclick");
    if (sortFunction) eval(sortFunction);

    setActiveButtons();
  });
});

// initialiseer
setActiveButtons();


// sub button click
document.querySelectorAll(".subBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentSub = btn.dataset.view;

    // roep eventueel sort functie aan
    const sortFunction = btn.getAttribute("onclick");
    if (sortFunction) eval(sortFunction);

    setActiveButtons();
  });
});

// initialiseer bij laden
setActiveButtons();


// bij klikken
document.querySelectorAll(".mainBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentView = btn.dataset.view;
    setActiveButton(currentView);
  });
});

// bij laden
setActiveButton(currentView);


function switchToPaintings() {
  mode = "paintings";
  activeLetter = null;
  activeInspiration = null;
}

let activeLetter = null;   // de letter die vergroot wordt weergegeven
let activeInspiration = null;
let activeLetterTime = 0;  // wanneer deze is aangeklikt
const ACTIVE_DISPLAY_DURATION = 2000; // 2 seconden

document.getElementById("showPaintingsBtn").addEventListener("click", () => {
  mode = "paintings";
  activeLetter = null;
  activeInspiration = null;
});

document.getElementById("showLettersBtn").addEventListener("click", () => {
  mode = "letters";
  activeInspiration = null;
  activeLetter = null;
});

document.getElementById("vanGoghBtn").addEventListener("click", () => {
  mode = "vanGogh";
  activeLetter = null;
  activeInspiration = null;
  clusterLabels = [];
});

document.getElementById("Colofon").addEventListener("click", () => {
  // verberg andere content
  storyOverlay.style.display = "none";

  // toon colofon
  colofonOverlay.style.display = "block";

  // canvas blijft, maar mode verandert niet
  mode = "colofon";

  // active states netjes
  document.querySelectorAll(".mainBtn").forEach(btn =>
    btn.classList.remove("active")
  );
  document.getElementById("Colofon").classList.add("active");
});




// Knoppen referenties

const paintingsBtn = document.getElementById("paintingsBtn");
const yearBtn = document.getElementById("yearBtn");
const madeInBtn = document.getElementById("madeInBtn");
const currentLocationBtn = document.getElementById("currentLocationBtn");
document.querySelectorAll('.subBtn[data-view="currentLocation"]').forEach(btn => {
  btn.addEventListener("click", () => {
    hideOverlays();                     
    sortByLocation("currentLocation");  
    showTop10Musea();                   
  });
});




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

function showTop10Musea() {
  const museumCounts = {};

  bolletjes.forEach(b => {
    const museum = b.data.currentLocation?.trim();
    if (!museum) return;

    museumCounts[museum] = (museumCounts[museum] || 0) + 1;
  });

  const top10 = Object.entries(museumCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  storyOverlay.innerHTML =
    "<strong>Top 10 musea met meeste Van Gogh-schilderijen</strong><br><br>" +
    top10
      .map(([museum, count], i) =>
        `${i + 1}. ${museum} – ${count} schilderij(en)`
      )
      .join("<br>");

  storyOverlay.style.display = "block";
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
const LETTER_MARGIN = 50;

const letters = [
   { img: "img/5juni-1888-japanseinvloeden.png", data: {
      omschrijving: ".",
    }},
     { img: "img/brief-9mei1873.png", data: {
      omschrijving: ".",
    }}, 
  { img: "img/brief.png", data: {
      omschrijving: ".",
    }}, 
  { img: "img/brief1-26oct.png" , data: {
      omschrijving: ".",
    }},
   { img: "img/brief-2juli1873.png" , data: {
      omschrijving: ".",
    }},
  { img: "img/brief-3maart-1874.png" , data: {
      omschrijving: ".",
    }},
  { img: "img/brief-4januari-1875.png", data: {
      omschrijving: ".",
    }},
{ img: "img/brief-5mei1873.png" , data: {
      omschrijving: ".",
    }},
 { img: "img/brief-7augustus1873.png" , data: {
      omschrijving: ".",
    }},
 { img: "img/brief-7juli-1874-1r.png" , data: {
      omschrijving: ".",
    }},
 { img: "img/brief-7juli-1874-2r.png", data: {
      omschrijving: ".",
    }},
  { img: "img/brief-7juli-1874-3r.png", data: {
      omschrijving: ".",
    }},
   { img: "img/brief-7juli-1874-4r.png", data: {
      omschrijving: ".",
    }},
  { img: "img/brief-9feb-1874.png" , data: {
      omschrijving: ".",
    }},
    { img: "img/brief-9feb-18742.png", data: {
      omschrijving: '.',
    }},
    { img: "img/brief-10aug-1874.png" , data: {
      omschrijving: ".",
    }},
     { img: "img/brief-10aug-1874-1v.png" , data: {
      omschrijving: ".",
    }},
      { img: "img/brief-10juli-1874.png" , data: {
      omschrijving: ".",
    }},
    { img: "img/brief-10maart-1875.png", data: {
      omschrijving: ".",
    }},
    { img: "img/brief-13december.png", data: {
      omschrijving: ".",
    }},
    { img: "img/brief-13juni1873.png" , data: {
      omschrijving: ".",
    }},
     { img: "img/brief-13sept1873.png" , data: {
      omschrijving: ".",
    }},
      { img: "img/brief-13sept22.png" , data: {
      omschrijving: ".",
    }},
     { img: "img/brief-japansekunst.png" , data: {
      omschrijving: "Zie je hoe brutaal die idioten in Dordrecht zijn, zie je hoe zelfvoldaan ze zijn, ze willen zich verlagen tot Gas & Pissaro waarvan ze trouwens nog nooit iets gezien hebben, net zomin als van de anderen. Vijf maar het is een heel goed teken dat de jongeren woedend zijn, dat bewijst misschien dat er oude mensen zijn die er goed over gesproken hebben. Wat betreft in het zuiden blijven, ook al is het duurder kom op, we houden van Japanse schilderkunst, we zijn erdoor beïnvloed alle impressionisten hebben dat gemeen en we zouden niet naar Japan gaan, d.w.z. naar het equivalent van Japan, het zuiden. Ik geloof dus dat de toekomst van de nieuwe kunst toch in het zuiden ligt. Het is alleen geen goede politiek om daar alleen te blijven, terwijl twee of drie elkaar zouden kunnen helpen om van weinig te leven.",
    }},
      { img: "img/broederliefde.png", data: {
      omschrijving: "Ik heb eigenlijk geen vriend behalve U en als ik beroerd ben zijt gij me altijd in de gedachten - Aan Theo vanuit Den Haag, 22 juli 1883",
    }},
    { img: "img/japansekunstbezit-bit.png", data: {
      omschrijving: "Als het mogelijk was alle Japanse prenten die we thuis hebben zijn prachtig zou het beter zijn om de hele voorraad terug te nemen. We krijgen ze zo goedkoop en we kunnen er zoveel kunstenaars blij mee maken, dat we toch maar beter de gunst van Père Bing kunnen behouden.",
    }},
     { img: "img/japansoog.png", data: {
      omschrijving: "Ik benijd de Japanners om de extreme helderheid die alles in hun werk heeft. Het is nooit saai en lijkt nooit haastig te worden . Hun werk is net zo eenvoudig als ademhalen, en ze doen een figuur met een paar zelfverzekerde slagen met hetzelfde gemak alsof het zo simpel is als het dichtknopen van je vest.",
    }}, 
     { img: "img/workbasedonjapanese-bit.png", data: {
      omschrijving: "Al mijn werk is tot op zekere hoogte gebaseerd op Japanse kunst...",
    }},
     { img: "img/vangogh-air.png", data: {
      omschrijving: "Parijs is Parijs, er is maar één Parijs, en hoe zwaar het leven hier ook mag zijn, en als het nog erger en zwaarder zou worden de Franse lucht verheldert je geest en doet je goed enorm veel goed.",
    }}

   

].map(l => ({
  ...l,
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  
  // Doelen waar ze naartoe moeten bewegen
  targetX: LETTER_MARGIN + Math.random() * (cw() - LETTER_MARGIN * 2),
  targetY: LETTER_MARGIN + Math.random() * (ch() - LETTER_MARGIN * 2),
  
  // Snelheid
  moveSpeed: 0.02,   // vaste snelheid
  lastTargetChange: performance.now(),
  changeTargetInterval: 4000 // interval voor target update
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

    drawHoverInfo(); // hover info blijft werken
  }

  if (mode === "letters") {
    drawLetters();   // brieven
  }

  if (mode === "vanGogh") {
    drawVanGogh();   // Van Gogh inspiratie view
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
  const now = performance.now();

  letters.forEach(l => {
    if (!l.imgObj) {
      l.imgObj = new Image();
      l.imgObj.src = l.img;
    }

    // update nieuwe targets
    if (now - l.lastTargetChange > l.changeTargetInterval) {
      l.targetX = LETTER_MARGIN + Math.random() * (cw() - LETTER_MARGIN * 2);
      l.targetY = LETTER_MARGIN + Math.random() * (ch() - LETTER_MARGIN * 2);
      l.lastTargetChange = now;
    }

    // lineair bewegen naar target
    l.x += (l.targetX - l.x) * l.moveSpeed;
    l.y += (l.targetY - l.y) * l.moveSpeed;

    if (l.imgObj.complete) {
      // normale letters
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.35)";
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 8;
      ctx.drawImage(l.imgObj, l.x, l.y, 140, 180);
      ctx.restore();
    }
  });

  // vergroot actieve letter tekenen + tekst
  if (activeLetter && now - activeLetterTime < ACTIVE_DISPLAY_DURATION) {
    const img = activeLetter.imgObj;
    if (img && img.complete) {
      const scale = 2.6;
      const w = 140 * scale;
      const h = 180 * scale;
      const x = (cw() - w) / 2;
      const y = (ch() - h) / 2;

      // afbeelding tekenen
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 30;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 20;
      ctx.drawImage(img, x, y, w, h);
      ctx.restore();

      // tekst tekenen
  
      ctx.save();
      ctx.font = "500 28px Inter, Arial, sans-serif";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      const textX = cw() / 2; 
      const textY = y + h + 4; // 8 pixels onder de afbeelding (minder dan 20)

      
// de omschrijving en andere info
    const info = activeLetter.data;
    const text = info.omschrijving || "";
    const lines = [
    info.title || "",
    info.date || info.year || "",
    info.madeIn || "",
    info.currentLocation || "",
    info.omschrijving || ""
  ].filter(line => line); // lege regels eruit

  const lineHeight = 22; // ← verkleind van 28px, compactere tekst
  const padding = 15;


lines.forEach((line, i) => {
  ctx.fillText(line, cw() / 2, textY + i * lineHeight);
});

ctx.restore();
    }
  } else {
    activeLetter = null; // reset na tijd
  }
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
  if (performance.now() - l.lastTargetChange > l.changeTargetInterval) {
    l.targetX = LETTER_MARGIN + Math.random() * (cw() - LETTER_MARGIN * 2);
    l.targetY = LETTER_MARGIN + Math.random() * (ch() - LETTER_MARGIN * 2);
    l.lastTargetChange = performance.now();
  }
});

/* =====================
   DATA (schilderijen inspiratie)
===================== */
// Inspiratie kunstwerken
const inspirationArt = [
  {
    id: 2,
    title: "Evening Shower at Atake and the Great Bridge",
    artist: "Hiroshige",
    category: "Japanse inspo",
    description: "Van Gogh kopieerde de kunstwerken van Hiroshige omdat hij dit ook wil maken",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/00/Hiroshige_-_Evening_Shower_at_Atake_and_the_Great_Bridge.jpg"
  },
  {
    id: 3,
    title: "Collection of New Ukiyo-e Style Beauties",
    artist: "Kondō Shiun",
    category: "Japanse inspo",
    description: "Felle platte vlakken en Ukiyo-e stijl inspireerden Van Gogh",
    img: "https://data.ukiyo-e.org/artelino/images/12444g1.jpg"
  },
  {
    id: 4,
    title: "Courtisan",
    artist: "Keisai Eisen",
    category: "Japanse inspo",
    description: "Van Gogh kopieerde Eisen om hiervan te leren",
    img: "https://uitdekunstmarina.nl/wp-content/uploads/2018/05/13.Keisai-Eisen-Courtisane-1.jpg"
  },
  {
    id: 6,
    title: "Kiribatake",
    artist: "Hiroshige",
    category: "Japanse inspo",
    description: "Afgesneden compositie van bomen",
    img: "https://www.scholten-japanese-art.com/artistimages/10-5547w.jpg"
  },
  {
    id: 7,
    title: "Japanese Woodblock Print Hitomoto",
    artist: "Tsunoda Kunisada",
    category: "Japanse inspo",
    description: "Felle vlakken en zwarte contourlijnen",
    img: "https://www.uchiyama.nl/Images/kunisada2.jpg"
  },
  {
    id: 8,
    title: "Herfstbloemen, gele vogel en insecten",
    artist: "Onbekende Japanse kunstenaar",
    category: "Japanse inspo",
    description: "Van Gogh kopieerde dit Japanse werk",
    img: "https://flashbak.com/wp-content/uploads/2019/01/VanGoghJapanprints-27-1200x1827.jpg"
  },
  {
    id: 9,
    title: "The Great Wave off Kanagawa",
    artist: "Katsushika Hokusai",
    category: "Japanse inspo",
    description: "Golven en swirls lijken sterk op Van Goghs stijl",
    img: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Tsunami_by_hokusai_19th_century.jpg"
  },

  // 🖼️ Europese inspiratie / nagetekend
  {
    id: 10,
    title: "Breton Women in the Meadow",
    artist: "Émile Bernard",
    category: "Nagetekend",
    description: "Van Gogh tekende dit werk na",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Émile_Bernard_1888-08_-_Breton_Women_in_the_Meadow_%28Le_Pardon_de_Pont-Aven%29.jpg"
  },
  {
    id: 11,
    title: "Her Man at Sea",
    artist: "Virginie Demont-Breton",
    category: "Nagetekend",
    description: "Nagetekend door Van Gogh",
    img: "https://upload.wikimedia.org/wikipedia/commons/f/f3/L%27homme_est_en_mer.jpg"
  },
  {
    id: 12,
    title: "Newgate Exercise Yard",
    artist: "Gustave Doré",
    category: "Nagetekend",
    description: "Nagetekend door Van Gogh",
    img: "https://upload.wikimedia.org/wikipedia/commons/8/81/Newgate-prison-exercise-yard.jpg"
  },
  {
    id: 13,
    title: "Cows",
    artist: "Jacob Jordaens",
    category: "Nagetekend",
    description: "Nagetekend door Van Gogh",
    img: "hhttps://upload.wikimedia.org/wikipedia/commons/0/0f/Lille_Jordaens_vaches.JPG"
  },
  {
    id: 14,
    title: "The Sower",
    artist: "Jean-François Millet",
    category: "Nagetekend",
    description: "Belangrijke inspiratiebron voor Van Gogh",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/05/Vincent_Willem_van_Gogh_025.jpg"
  },
  {
    id: 15,
    title: "The Raising of Lazarus",
    artist: "Rembrandt van Rijn",
    category: "Sterk beïnvloed",
    description: "Van Gogh had veel respect voor Rembrandt",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Rembrandt_Harmensz._van_Rijn_015.jpg"
  },
    {
    id: 16,
    title: "Shearing sheep",
    artist: "Jean-François Millet",
    category: "Ngetekend",
    description: "Van Gogh had veel respect voor Rembrandt",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/34/Labours_of_the_fields-Woman_shearing_sheep_%28Millet%29.jpg"
  },
  {
  id: 17,
  title: "The Drinkers",
  artist: "Honoré Daumier",
  category: "nagetekend",
  description: "Daumiers sociale thema’s beïnvloedden Van Goghs vroege werk.",
  img: "https://upload.wikimedia.org/wikipedia/commons/9/95/Daumier_The_Drinkers.jpg",
},
  {
  id: 18,
  title: "The Woodcutter",
  artist: "Jean-François Millet",
  category: "nagetekend",
  description: "Van Gogh nam Millets arbeiders en boeren als belangrijk voorbeeld.",
  img: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/337799/761285/main-image",
},
{
  id: 19,
  title: "The Pietà",
  artist: "Eugène Delacroix",
  category: "nagetekend",
  description: "Van Gogh bewonderde Delacroix’ kleurgebruik en emotionele kracht.",
  img: "https://www.eugene-delacroix.com/assets/img/paintings/pieta.jpg",
},
{
  id: 20,
  title: "The Good Samaritan",
  artist: "Eugène Delacroix",
  category: "nagetekend",
  description: "Van Gogh maakte meerdere studies gebaseerd op dit werk van Delacroix.",
  img: "https://upload.wikimedia.org/wikipedia/commons/d/de/Honor%C3%A9_Daumier_%281808-1879%29_-_The_Good_Samaritan_-_35.215_-_Burrell_Collection.jpg",
}

];


// Van Gogh kunstwerken
const vanGoghArt = [
  {
    id: 1,
    title: "De bloeiende pruimenboom (naar Hiroshige)",
    year: 1887,
    madeIn: "Parijs",
    museum: "Van Gogh Museum",
    size: "34 × 55 cm",
    img: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0115V1962_gb.jpg/full/!682,440/0/default.jpg",
    inspirationId: 1
  },
  {
    id: 2,
    title: "De brug in de regen (naar Hiroshige)",
    year: 1887,
    madeIn: "Parijs",
    museum: "Van Gogh Museum",
    size: "30 × 50 cm",
    img: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0114V1962_gb.jpg/full/!682,440/0/default.jpg",
    inspirationId: 2
  },
  {
    id: 3,
    title: "Zelfportret",
    year: 1888,
    madeIn: "Arles",
    museum: "Harvard Art Museums / Fogg Museum",
    size: "19 × 47.5 cm",
    img: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0476_x01.jpg/full/!682,440/0/default.jpg",
    inspirationId: 3
  },
  {
    id: 3,
    title: "L'Arlésienne (Madame Ginoux)",
    year: 1888,
    madeIn: "Arles",
    museum: "Metropolitan Museum of Art",
    size: "—",
    img: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0488_x01.jpg/full/!682,440/0/default.jpg",
    inspirationId: 3
  },
  {
    id: 3,
    title: "De slaapkamer",
    year: 1889,
    madeIn: "Saint-Rémy",
    museum: "Art Institute of Chicago",
    size: "30 × 50 cm",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Vincent_van_Gogh_-_The_Bedroom_-_Google_Art_Project.jpg",
    inspirationId: 3
  },
  {
    id: 4,
    title: "De courtisane (naar Eisen)",
    year: 1887,
    madeIn: "Parijs",
    museum: "Van Gogh Museum",
    size: "51.1 × 32.8 cm",
    img: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Courtisane_%28naar_Eisen%29_-_s0116V1962_-_Van_Gogh_Museum.jpg",
    inspirationId: 4
  },
  {
    id: 5,
    title: "Amandelbloesem",
    year: 1890,
    madeIn: "Saint-Rémy",
    museum: "Van Gogh Museum",
    size: "51.6 × 33.9 cm",
    img: "https://www.cultuurblogger.nl/wp-content/uploads/2018/03/vangoghmuseum-s0176V1962-800-Small.jpg",
    inspirationId: 5
  },
  {
    id: 6,
    title: "Kreupelhout met twee figuren",
    year: 1887,
    madeIn: "Auvers-sur-Oise",
    museum: "Van Gogh Museum",
    size: "34.7 × 47.3 cm",
    img: "https://www.cultuurblogger.nl/wp-content/uploads/2018/03/unnamed-11-Small.jpg",
    inspirationId: 6
  },
  {
    id: 6,
    title: "De sterrennacht",
    year: 1888,
    madeIn: "Arles",
    museum: "Musée d'Orsay",
    size: "35 × 47 cm",
    img: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Vincent_van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    inspirationId: 9
  },
  {
    id: 6,
    title: "De gevangenisbinnenplaats (naar Doré)",
    year: 1890,
    madeIn: "Saint-Rémy",
    museum: "Pushkin Museum",
    size: "19 × 27.5 cm",
    img: "https://upload.wikimedia.org/wikipedia/commons/7/77/Vincent_van_Gogh_-_Prisoners_Exercising.jpg",
    inspirationId: 12
  },
  {
    id: 7,
    title: "De opwekking van Lazarus (naar Rembrandt)",
    year: 1890,
    madeIn: "Saint-Rémy",
    museum: "Van Gogh Museum",
    size: "33.5 × 48.5 cm",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/60/Vincent_van_Gogh_-_The_Raising_of_Lazarus.jpg",
    inspirationId: 15
  },
  {
    id: 7,
    title: "Pietà (naar Delacroix)",
    year: 1889,
    madeIn: "Saint-Rémy",
    museum: "Van Gogh Museum",
    size: "27.8 × 36.5 cm",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/57/Vincent_van_Gogh_-_Pieta.jpg",
    inspirationId: 19
  },
  {
    id: 8,
    title: "De barmhartige Samaritaan (naar Delacroix)",
    year: 1890,
    madeIn: "Saint-Rémy",
    museum: "Kröller-Müller Museum",
    size: "30.5 × 39.5 cm",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Vincent_van_Gogh_-_The_Good_Samaritan.jpg",
    inspirationId: 20
  },
  {
    id: 9,
    title: "De sterrennacht",
    year: 1888,
    location: "Arles",
    museum: "Musée d'Orsay",
    size: "35 x 47",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/01/Vincent_van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    inspirationId: 9
  },
  {
    id: 10,
    title: "Breton woman and children",
    year: 1888,
    location: "Arles",
    museum: "Galleria d'Arte Moderna",
    size: "60 x 73",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Breton_Women.jpg",
    inspirationId: 10
  },
  {
    id: 11,
    title: "Schaal met aardappels",
    year: 1888,
    location: "Arles",
    museum: "Kröller-Müller Museum",
    size: "35 x 47",
    img: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20108.951.jpg/full/!682,440/0/default.jpg",
    inspirationId: 11
  },
  {
    id: 12,
    title: "De gevangenisbinnenplaats (naar Gustave Doré)",
    year: 1890,
    location: "Saint-Rémy",
    museum: "Pushkin State Museum of Fine Arts",
    size: "19 x 27.5",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Vincent_Willem_van_Gogh_037.jpg",
    inspirationId: 12
  },
  {
    id: 13,
    title: "Cows",
    year: 1890,
    location: "Auvers-sur-Oise",
    museum: "Palais des Beaux-Arts de Lille",
    size: "55 x 65",
    img: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Lille_Pdba_van_gogh_vaches.jpg",
    inspirationId: 13
  },
  {
    id: 14,
    title: "De zaaier",
    year: 1888,
    location: "Arles",
    museum: "Villa Flora",
    size: "31 x 29.5",
    img: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF1442_x01.jpg/full/!682,440/0/default.jpg",
    inspirationId: 14
  },
  {
    id: 15,
    title: "De opwekking van Lazarus (naar Rembrandt)",
    year: 1890,
    location: "Saint-Rémy",
    museum: "Van Gogh Museum",
    size: "33.5 x 48.5",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Vincent_van_Gogh_-_The_raising_of_Lazarus_%28after_Rembrandt%29_-_Google_Art_Project.jpg",
    inspirationId: 15
  },
  {
    id: 16,
    title: "De schapenhoedster (naar Millet)",
    year: 1889,
    location: "Saint-Rémy",
    museum: "Tel Aviv Museum",
    size: "33 x 50",
    img: "https://upload.wikimedia.org/wikipedia/commons/8/8c/De_schapenscheerster_%28naar_Millet%29_-_s0042V1962_-_Van_Gogh_Museum.jpg",
    inspirationId: 16
  },
  {
    id: 17,
    title: "De eerste stapjes (naar Millet)",
    year: 1890,
    location: "Saint-Rémy",
    museum: "Metropolitan Museum of Art",
    size: "35.5 x 55.5",
    img: "https://vggallery.com/painting/f_0668.jpg",
    inspirationId: 17
  },
  {
    id: 18,
    title: "De houthakker (naar Millet)",
    year: 1890,
    location: "Saint-Rémy",
    museum: "Van Gogh Museum",
    size: "28.5 x 39.5",
    img: "https://upload.wikimedia.org/wikipedia/commons/8/87/Van_Gogh_-_Der_Holzhacker_%28nach_Millet%29.jpeg",
    inspirationId: 18
  },
  {
    id: 19,
    title: "Pietà (naar Delacroix)",
    year: 1889,
    location: "Saint-Rémy",
    museum: "Van Gogh Museum",
    size: "27.8 x 36.5",
    img: "https://upload.wikimedia.org/wikipedia/commons/8/82/Vincent_Willem_van_Gogh_083.jpg",
    inspirationId: 19
  },
  {
    id: 20,
    title: "De Barmhartige Samaritaan (naar Delacroix)",
    year: 1890,
    location: "Saint-Rémy",
    museum: "Kröller-Müller Museum",
    size: "30.5 x 39.5",
    img: "https://upload.wikimedia.org/wikipedia/commons/7/76/Vincent_Willem_van_Gogh_022.jpg",
    inspirationId: 20
  }

];


/* =====================
   inspiratie van van gogh
===================== */
function drawImageFixedWidth(ctx, img, x, y, targetW) {
  const ratio = img.naturalHeight / img.naturalWidth;
  const h = targetW * ratio;

  ctx.drawImage(img, x, y, targetW, h);

  return h; // belangrijk: echte hoogte teruggeven
}

function drawImageContain(ctx, img, x, y, maxW, maxH) {
  const ratio = Math.min(
    maxW / img.naturalWidth,
    maxH / img.naturalHeight
  );

  const w = img.naturalWidth * ratio;
  const h = img.naturalHeight * ratio;

  const offsetX = x + (maxW - w) / 2;
  const offsetY = y + (maxH - h) / 2;

  ctx.drawImage(img, offsetX, offsetY, w, h);

  return { w, h };
}

function resizeCanvasToContent() {
  let bottom = 0;

  // inspiratie
  inspirationArt.forEach(insp => {
    const b = insp.y + insp.blockHeight;
    if (b > bottom) bottom = b;
  });

  // Van Gogh
  vanGoghArt.forEach(v => {
    if (v.y !== undefined && v.blockHeight) {
      const b = v.y + v.blockHeight;
      if (b > bottom) bottom = b;
    }
  });

  canvas.height = bottom + 80; // extra ademruimte
}

function measureWrappedText(ctx, text, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let lines = 1;

  words.forEach(word => {
    const testLine = line + word + " ";
    if (ctx.measureText(testLine).width > maxWidth) {
      lines++;
      line = word + " ";
    } else {
      line = testLine;
    }
  });

  return lines * lineHeight;
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let lines = [];

  words.forEach(word => {
    const testLine = line + word + " ";
    if (ctx.measureText(testLine).width > maxWidth) {
      lines.push(line);
      line = word + " ";
    } else {
      line = testLine;
    }
  });

  lines.push(line);
  lines.forEach((l, i) => ctx.fillText(l, x, y + i * lineHeight));

  return lines.length * lineHeight;
}

function rectsOverlap(a, b) {
  return !(
    a.x + a.w < b.x ||
    a.x > b.x + b.w ||
    a.y + a.h < b.y ||
    a.y > b.y + b.h
  );
}


function isOverlapping(x, y, size, items, padding = 20) {
  return items.some(it => {
    if (it.x === undefined || it.y === undefined) return false;

    return !(
      x + size + padding < it.x ||
      x > it.x + size + padding ||
      y + size + padding < it.y ||
      y > it.y + size + padding
    );
  });
}

function showInspiration() {
  mode = "vanGogh";
  activeInspiration = null;
  console.log("showInspiration aangeroepen");
}

document.getElementById("vanGoghBtn").addEventListener("click", showInspiration);

function rectsOverlap(a, b) {
  return !(
    a.x + a.w < b.x ||
    a.x > b.x + b.w ||
    a.y + a.h < b.y ||
    a.y > b.y + b.h
  );
}

const VAN_WIDTH = 180; // Van Gogh afbeeldingen
const VAN_HEIGHT = 140;

function placeInspirationArt() {
  const paddingX = 40;
  const paddingY = 40;
  const gapX = 40;
  const gapY = 60;

  const cellWidth = INSP_SIZE + gapX;
  const cols = Math.max(
    1,
    Math.floor((cw() - paddingX * 2) / cellWidth)
  );

  inspirationArt.forEach((insp, index) => {
    // image preload
    if (!insp.imgObj) {
      insp.imgObj = new Image();
      insp.imgObj.src = insp.img;
    }

    // teksthoogtes meten
    ctx.font = "bold 13px Inter, Arial, sans-serif";
    const titleHeight = measureWrappedText(ctx, insp.title, INSP_SIZE, 15);

    ctx.font = "12px Inter, Arial, sans-serif";
    const descHeight = measureWrappedText(ctx, insp.description, INSP_SIZE, 15);

    const artistHeight = 14;

    insp.blockHeight =
      INSP_SIZE +
      16 +
      titleHeight +
      4 +
      artistHeight +
      4 +
      descHeight +
      10;

    const col = index % cols;
    const row = Math.floor(index / cols);

    insp.x = paddingX + col * cellWidth;
    insp.y = paddingY + row * (insp.blockHeight + gapY);
  });

  // canvas hoogte correct zetten
  const bottom = Math.max(
    ...inspirationArt.map(i => i.y + i.blockHeight)
  );

  canvas.height = bottom + paddingY;
  inspirationPositionsInitialized = true;
}


function placeVanGoghArt() {
  if (!activeInspiration) return;

  const related = vanGoghArt.filter(v => v.inspirationId === activeInspiration.id);

  const paddingX = 40;
  const paddingY = 20;
  const gapX = 40;
  const gapY = 40;

  // Bereken de rechterkant van de inspiratie-schilderijen
  const inspirationRight = Math.max(...inspirationArt.map(i => i.x + INSP_SIZE));

  // start X iets rechts van inspiratie
  const startX = inspirationRight + paddingX;
  let col = 0;
  let row = 0;
  let rowHeight = 0;

  related.forEach(v => {
    if (!v.imgObj) {
      v.imgObj = new Image();
      v.imgObj.src = v.img;
    }

    // titel + beschrijving hoogte
    ctx.font = "bold 14px Inter, Arial, sans-serif";
    const titleHeight = measureWrappedText(ctx, v.title, VAN_WIDTH, 16);
    const inspData = inspirationArt.find(i => i.id === v.inspirationId);
    ctx.font = "13px Inter, Arial, sans-serif";
    const descHeight = inspData?.description ? measureWrappedText(ctx, inspData.description, VAN_WIDTH, 16) : 0;

    const vBlockHeight = VAN_HEIGHT + 8 + titleHeight + 4 + descHeight + 8;
    v.blockHeight = vBlockHeight;

    // X rechts van inspiratie + col
    v.x = startX + col * (VAN_WIDTH + gapX);
    // Y gelijk aan inspiratie-top of in een grid eronder
    v.y = activeInspiration.y + row * (vBlockHeight + gapY);

    rowHeight = Math.max(rowHeight, vBlockHeight + gapY);

    col++;
    // nieuwe rij als Van Gogh-schilderijen te breed worden
    const totalWidth = startX + col * (VAN_WIDTH + gapX);
    if (totalWidth > cw() - paddingX) {
      col = 0;
      row++;
      rowHeight = 0;
    }
  });

  // canvasbreedte en hoogte aanpassen zodat alles zichtbaar blijft
  let bottom = Math.max(...related.map(v => v.y + v.blockHeight));
  canvas.height = Math.max(canvas.height, bottom + paddingY);

  const rightMost = Math.max(...related.map(v => v.x + VAN_WIDTH));
  canvas.width = Math.max(canvas.width, rightMost + paddingX);
}




const INSP_SIZE = 120;
const INSP_MARGIN = 60;

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let lines = [];

  words.forEach(word => {
    const testLine = line + word + " ";
    if (ctx.measureText(testLine).width > maxWidth) {
      lines.push(line);
      line = word + " ";
    } else {
      line = testLine;
    }
  });

  lines.push(line);

  lines.forEach((l, i) => {
    ctx.fillText(l, x, y + i * lineHeight);
  });

  return lines.length * lineHeight; // handig voor spacing
}

function drawVanGogh() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 🔑 Inspiratie maar één keer positioneren
  if (!inspirationPositionsInitialized) {
    placeInspirationArt();
  }
  
  // ================================
  // 1. INSPIRATIE-SCHILDERIJEN
  // ================================
  inspirationArt.forEach(insp => {
    if (!insp.imgObj) {
      insp.imgObj = new Image();
      insp.imgObj.src = insp.img;
    }

    if (!insp.imgObj.complete || insp.imgObj.naturalWidth === 0) return;

    const size = INSP_SIZE;

    // afbeelding
    ctx.drawImage(insp.imgObj, insp.x, insp.y, size, size);

    ctx.textAlign = "center";

    // titel
    ctx.font = "bold 13px Inter, Arial, sans-serif";
    ctx.fillStyle = "white";
    const titleHeight = drawWrappedText(
      ctx,
      insp.title,
      insp.x + size / 2,
      insp.y + size + 16,
      size,
      15
    );

    // artiest
    ctx.font = "12px Inter, Arial, sans-serif";
    ctx.fillStyle = "#cccccc";
    ctx.fillText(
      insp.artist,
      insp.x + size / 2,
      insp.y + size + 16 + titleHeight + 4
    );

    // beschrijving
    ctx.font = "12px Inter, Arial, sans-serif";
    ctx.fillStyle = "#aaaaaa";
    const descHeight = drawWrappedText(
      ctx,
      insp.description,
      insp.x + size / 2,
      insp.y + size + 16 + titleHeight + 20,
      size,
      15
    );

    // 🔑 volledige blokhoogte (voor overlap-detectie)
    insp.blockHeight =
      size +
      16 +
      titleHeight +
      4 +
      14 +
      4 +
      descHeight +
      10;
  });

  // ================================
  // 2. VAN GOGH SCHILDERIJEN
  // ================================
  if (activeInspiration) {
    const related = vanGoghArt.filter(
      v => v.inspirationId === activeInspiration.id
    );

    if (!drawVanGogh.placedRects) {
      drawVanGogh.placedRects = [];
    }

    if (activeInspiration) {
    if (!drawVanGogh.vanGoghPlaced) {
    placeVanGoghArt(); // bepaalt x/y
    drawVanGogh.vanGoghPlaced = true;
  }

  related.forEach(v => {
    // alleen tekenen
    drawImageContain(ctx, v.imgObj, v.x, v.y, VAN_WIDTH, VAN_HEIGHT);
    // tekst tekenen
  });
}


    related.forEach(v => {
      if (!v.imgObj) {
        v.imgObj = new Image();
        v.imgObj.src = v.img;
      }

      if (!v.imgObj.complete || v.imgObj.naturalWidth === 0) return;

      const w = 180;
      const h = 140;

      //  ALLE inspiratie-blokken als rechthoeken
      const inspirationRects = inspirationArt.map(i => ({
        x: i.x,
        y: i.y,
        w: INSP_SIZE,
        h: i.blockHeight
      }));

      //  hoogte Van Gogh-blok vooraf berekenen
      ctx.font = "bold 14px Inter, Arial, sans-serif";
      const titleHeight = measureWrappedText(ctx, v.title, w, 16);

      const inspData = inspirationArt.find(
        i => i.id === v.inspirationId
      );

      ctx.font = "13px Inter, Arial, sans-serif";
      const descHeight = inspData?.description
        ? drawWrappedText(ctx, inspData.description, 0, 0, w, 16)
        : 0;

      const vBlockHeight =
        h + 8 + titleHeight + 4 + descHeight + 8;
        v.blockHeight = vBlockHeight;

      // 🖼 afbeelding
      drawImageContain(ctx, v.imgObj, v.x, v.y, w, h);


      ctx.textAlign = "center";

      // titel
      ctx.font = "bold 14px Inter, Arial, sans-serif";
      ctx.fillStyle = "white";
      const tHeight = drawWrappedText(
        ctx,
        v.title,
        v.x + w / 2,
        v.y + h + 8,
        w,
        16
      );

      // beschrijving
      if (inspData?.description) {
        ctx.font = "13px Inter, Arial, sans-serif";
        ctx.fillStyle = "#cccccc";
        drawWrappedText(
          ctx,
          inspData.description,
          v.x + w / 2,
          v.y + h + 8 + tHeight + 4,
          w,
          16
        );
      }
    });
  }

  // ================================
  // 3. VERBINDINGSLIJNEN
  // ================================
  vanGoghArt.forEach(v => {
    const insp = inspirationArt.find(
      i => i.id === v.inspirationId
    );

    if (!insp || !v.imgObj) return;

    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(
      insp.x + INSP_SIZE / 2,
      insp.y + INSP_SIZE / 2
    );
    ctx.lineTo(
      v.x + 180 / 2,
      v.y + 140 / 2
    );
    ctx.stroke();
  });
}

canvas.addEventListener("click", () => {
  // Letters mode
  if (mode === "letters") {
    for (const l of letters) {
      const width = 140;
      const height = 180;
      if (
        mouse.x >= l.x &&
        mouse.x <= l.x + width &&
        mouse.y >= l.y &&
        mouse.y <= l.y + height
      ) {
        activeLetter = l;
        activeLetterTime = performance.now();
        activeInspiration = null; // reset Van Gogh
        break;
      }
    }
    return;
  }

  // Van Gogh inspiratie mode
 if (mode === "vanGogh") {
  for (const insp of inspirationArt) {
    const size = 120;
    if (
      mouse.x >= insp.x &&
      mouse.x <= insp.x + size &&
      mouse.y >= insp.y &&
      mouse.y <= insp.y + size
    ) {
      activeInspiration = insp;

  // 🔥 reset Van Gogh posities
    vanGoghArt.forEach(v => {
  v.x = undefined;
  v.y = undefined;
});

// 🔑 forceer opnieuw plaatsen rechts
    drawVanGogh.vanGoghPlaced = false;


      break;
    }
  }
}


  // Paintings mode (optioneel)
  if (mode === "paintings") {
    // Hier kun je clicks op paintings afhandelen
    // b.v. bolletjes aanklikken
  }
});

function loadImage(obj, key = "imgObj") {
  if (obj[key]) return;

  const img = new Image();
  img.src = obj.img;
  img.onerror = () => {
    console.warn("Image failed:", obj.img);
  };
  obj[key] = img;
}




/* =====================
   DATA (schilderijen)
===================== */
const paintings = [
  {
    title: "De pastorietuin met sneeuw",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Norton Simon Museum of Art",
    width: 34,
    height: 55,
    image: "https://cms.guggenheim-bilbao.eus/uploads/2025/02/GRAD1935-279120070516balazs-scaled.jpg"
  },
  {
    title: "Portret van Joseph Roulin",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Museum of Fine Arts",
    width: 30,
    height: 50,
    image: "https://collections.mfa.org/internal/media/dispatcher/1447565/preview;jsessionid=337E4A05896DF90AB4D85FA7DDDE598F"
  },
  {
    title: "Boerderij",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Private collection",
    width: 19,
    height: 47.5,
    image: "https://commons.wikimedia.org/wiki/File:Farmhouse_in_Provence,_1888,_Vincent_van_Gogh,_NGA.jpg"
  },
  {
    title: "Stilleven met twee zonnebloemen",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Kunstmuseum Bern",
    width: 34,
    height: 55,
    image: "https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Zwei_abgeschnittene_Sonnenblumen1.jpeg"
  },
  {
    title: "Zelfportret",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Kunstmuseum Den Haag",
    width: 30,
    height: 50,
    image: "https://data.spinque.com/iiif/2/http%3A%2F%2Fimages.gemeentemuseum.nl%2FData2010%2F20101208_45.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Vogelnesten",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Kunstmuseum Den Haag",
    width: 34,
    height: 55,
    image: "https://data.spinque.com/iiif/2/http%3A%2F%2Fimages.gemeentemuseum.nl%2Fdata2012%2F20120607_1.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Restaurant de la Sirène in Asnières",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Ashmolean Museum",
    width: 35.5,
    height: 49.5,
    image: "https://data.spinque.com/iiif/2/https%3A%2F%2Fcdn.mediatheque.epmoo.fr%2Flink%2Fbtd189jq0aik480.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Fritillaria's",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "",
    width: 36,
    height: 58.5,
    image: "https://data.spinque.com/iiif/2/https%3A%2F%2Fcdn.mediatheque.epmoo.fr%2Flink%2Fdkn189jq0e3u1nk.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De danszaal",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Musée d'Orsay",
    width: 35.5,
    height: 49.5,
    image: "https://data.spinque.com/iiif/2/https%3A%2F%2Fcdn.mediatheque.epmoo.fr%2Flink%2Fleu189jpz12a59c.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Vrouw bij het haardvuur",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Musée d'Orsay",
    width: 36,
    height: 58.5,
    image: "https://data.spinque.com/iiif/2/https%3A%2F%2Fcdn.mediatheque.epmoo.fr%2Flink%2Ftyt189jpoml9d5s.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Stilleven met aardewerk en klompen",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Centraal Museum",
    width: 24,
    height: 32,
    image: "https://data.spinque.com/iiif/2/https%3A%2F%2Fcmu.adlibhosting.com%2Fwebapiimages%2Fwwwopac.ashx%3Fcommand%3Dgetcontent%26server%3Dimages%26value%3DOBJECTEN%2FXbestanden%2Fgecropt%2FX21828_01.tif/full/!682,440/0/default.jpg"
  },
  {
    title: "Bosgrond",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Centraal Museum",
    width: 51.6,
    height: 33.9,
    image: "https://data.spinque.com/iiif/2/https%3A%2F%2Fcmu.adlibhosting.com%2Fwebapiimages%2Fwwwopac.ashx%3Fcommand%3Dgetcontent%26server%3Dimages%26value%3DOBJECTEN%2FXbestanden%2Fgecropt%2FX22123_01.tif/full/!682,440/0/default.jpg"
  },
  {
    title: "Brug over de Seine bij Asnières",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Larry Ellison",
    width: 42,
    height: 62.5,
    image: "https://data.spinque.com/iiif/2/https%3A%2F%2Fcollection.kunsthaus.ch%2Fmultimedia%2F0%2Fmultimedia-1454210.extra-large.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Bruggen over de Seine bij Asnières",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Foundation E.G. Bührle",
    width: 37,
    height: 58.8,
    image: "https://data.spinque.com/iiif/2/https%3A%2F%2Fcollection.kunsthaus.ch%2Fmultimedia%2F0%2Fmultimedia-1454210.extra-large.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Boer en boerin aardappelen potend",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Kunsthaus Zurich",
    width: 42,
    height: 62.5,
    image: "https://data.spinque.com/iiif/2/https%3A%2F%2Fcollection.kunsthaus.ch%2Fmultimedia%2F1%2Fmultimedia-630211.extra-large.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Landschap met sneeuw",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Guggenheim Museum",
    width: 35,
    height: 47,
    image: "https://data.spinque.com/iiif/2/https%3A%2F%2Flh3.googleusercontent.com%2FEzedvLT2a5pcvvoF5cwhGuErp9m-Q9iMkT95wFqYsCKbZrGF3xMtme6dGCZNu99kQyk%3Dw2400/full/!682,440/0/default.jpg"
  },
  {
    title: "Vissersboten op zee",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Pushkin State Museum of Fine Arts",
    width: 34.7,
    height: 47.3,
    image: "https://data.spinque.com/iiif/2/https%3A%2F%2Flh6.googleusercontent.com%2Fj218Ie8MTlmKyRuMM7CtYdw2cBdPnStvelusG-K7YFPCUsKMu044sPC_hwhRHyEnt7E%3Dw2400/full/!682,440/0/default.jpg"
  },
  {
    title: "Portret van Armand Roulin",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Museum Folkwang",
    width: 39.5,
    height: 94.5,
    image: "https://data.spinque.com/iiif/2/https%3A%2F%2Fsammlung-online.museum-folkwang.de%2FeMP%2FeMuseumPlus%3Fservice%3DDynamicAsset%26sp%3DSU5mxm4Yx%252FVbhp94nksEmWhUPPCPARCxmRF3wZoiekBYI9dLioBnZzXySIRTomizoxxT9oo9OlonT%250APnyO6EhNhqJhq4t%252F%252BLzvsfbLBbc2NAKqW677oPUO4nupgZBjq41ZxIqE9mglfu4%253D%26sp%3DSimage%252Fjpeg/full/!682,440/0/default.jpg"
  },
  {
    title: "Zandschuiten",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Museum Folkwang",
    width: 35,
    height: 47,
    image: "https://data.spinque.com/iiif/2/https%3A%2F%2Fsammlung-online.museum-folkwang.de%2FeMP%2FeMuseumPlus%3Fservice%3DDynamicAsset%26sp%3DSU5mxm4Yx%252FVbhp94nksEmWhUPPCPARCxmRF3wZoiekBYI9dLioBnZzXySIRTomizoxxT9oo9OlonT%250APnyO6EhNhqJhq4t%252F%252BLzvsfbLBbc2NAKqW677oPUO4i3VJ2GFZILOxIqE9mglfu4%253D%26sp%3DSimage%252Fjpeg/full/!682,440/0/default.jpg"
  },
  {
    title: "Liggende koe",
    year: 1883,
    madeIn: "Den Haag",
    currentLocation: "Private collection",
    width: 33,
    height: 50,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0001b_x01.jpg/full/!995,642/0/default.jpg"
  },
  {
    title: "Strand en zee",
    year: 1882,
    madeIn: "Den Haag",
    currentLocation: "Metropolitan Museum of Art",
    width: 35.5,
    height: 55.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0002_x01.jpg/full/!995,642/0/default.jpg"
  },
  {
    title: "Duingrond",
    year: 1882,
    madeIn: "Den Haag",
    currentLocation: "Private collection",
    width: 42,
    height: 53,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0002a_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Duinen met een paar figuurtjes",
    year: 1882,
    madeIn: "Den Haag",
    currentLocation: "Private collection",
    width: 31,
    height: 44,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0003_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Een verwaaide boom",
    year: 1883,
    madeIn: "Den Haag",
    currentLocation: "",
    width: 33.5,
    height: 48.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0010_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Koeien in de weide",
    year: 1883,
    madeIn: "Den Haag",
    currentLocation: "Soumaya Museum",
    width: 33,
    height: 50,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0015_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De oude toren 's avonds",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Private collection",
    width: 35.5,
    height: 55.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0040_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Houtsprokkelaars in de sneeuw",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Yoshino Gypsum Art Foundation",
    width: 28.5,
    height: 39.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0043_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Raderen van de watermolen te Gennep",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Netherlands Cultural Heritage Agency",
    width: 27.8,
    height: 36.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0047_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Watermolen te Opwetten",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Collection Adar Poonawalla",
    width: 30.5,
    height: 39.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0048_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Stilleven met potten, kruik en fles",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Private collection",
    width: 37,
    height: 55.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0058_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Stilleven met twee kruikjes en pompoenen",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Private collection",
    width: 37.5,
    height: 55,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0059_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Kop van een man",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Collection Niarchos",
    width: 67.9,
    height: 93.4,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0081_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Kop van een vrouw",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Private collection",
    width: 41.3,
    height: 32.1,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0081_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Boerenhuis met spittende vrouw",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Tokyo Fuji Art Museum",
    width: 48,
    height: 46,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0089_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Boerenhuis",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Private collection",
    width: 47,
    height: 61.3,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0091_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Boerenhuis",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Private collection",
    width: 19,
    height: 26.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0092_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Boerenhuis",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Private collection",
    width: 62.5,
    height: 84.4,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0092a_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Twee spittende boerinnen",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Private collection",
    width: 68.3,
    height: 84.2,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0096_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Bosweggetje",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Private collection",
    width: 42.8,
    height: 58.6,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0120_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Vrouw, naaiend",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Collection Georg Schäfer",
    width: 19,
    height: 41,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0126a_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Vrouw met lange stok, van opzij gezien",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Private collection",
    width: 55,
    height: 79,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0139_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Vrouw, aardappelen schillend, halffiguur",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Private collection",
    width: 36,
    height: 44.3,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0145_x01.jpg/full/!682,440/0/default.jpg"
  },
    {
    title: "Vrouw, aardappelen schillend, kniestuk",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Metropolitan Museum of Art",
    width: 41.1,
    height: 57.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0145_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Naaiende vrouw",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Private collection",
    width: 40.5,
    height: 31.7,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0157_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Wever",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Private collection",
    width: 61,
    height: 93,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0162_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Kop van een man",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Kröller-Müller Museum",
    width: 56.7,
    height: 82.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0169a_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Pannekoeken bakkende vrouw",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Metropolitan Museum of Art",
    width: 60,
    height: 80,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0176_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Twee ratten",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Private collection",
    width: 35,
    height: 47,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0177_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De pastorie te Nuenen bij avond, achterzijde",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Private collection",
    width: 66.4,
    height: 149.6,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0183_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Bloembollenveld",
    year: 1883,
    madeIn: "Den Haag",
    currentLocation: "National Gallery of Art",
    width: 45,
    height: 58,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0186_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Landschap in de schemering",
    year: 1883,
    madeIn: "Drenthe",
    currentLocation: "Private collection",
    width: 67,
    height: 126,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0188_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Sloot met bruggetje",
    year: 1883,
    madeIn: "Den Haag",
    currentLocation: "Private collection",
    width: 69,
    height: 87.8,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0189_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Laan met twee figuren",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Collection Dr. Cyrus Poonawalla",
    width: 78,
    height: 98,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0191a_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Knotwilg",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "F. van Lanschot Bankiers NV",
    width: 60,
    height: 78.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0195_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Nieuwe Kerk en oude huizen in Den Haag",
    year: 1882,
    madeIn: "Den Haag",
    currentLocation: "Private collection",
    width: 45,
    height: 58,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0204_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Stilleven met frittilaria's",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Musée d'Orsay",
    width: 33.8,
    height: 43.1,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0214_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Kom met chrysantjes",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Monte Carlo Art SA",
    width: 65.5,
    height: 80.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0217_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Straat in Parijs op de feestdag Quatorze Juillet",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Villa Flora",
    width: 33.7,
    height: 42.7,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0222_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Majolicapot met zinnia's",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Private collection",
    width: 65.5,
    height: 80.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0241_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Vaas met zinnia's en geraniums",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "National Gallery of Canada",
    width: 42,
    height: 56,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0241_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Vaas met anjers",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Stedelijk Museum",
    width: 31.5,
    height: 42,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0243_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Vaas met gladiolen",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Private collection",
    width: 49.5,
    height: 57.4,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0248_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Vaas met rode gladiolen",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Private collection",
    width: 40,
    height: 56.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0248b_x01.jpg/full/!682,440/0/default.jpg"
  },
   {
    title: "Vaas met rozen en andere bloemen",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Yoshino Gypsum Art Foundation",
    width: 31,
    height: 41,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0258_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Vaas met anjers en zinnia's",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Private collection",
    width: 58,
    height: 85,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0259_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Heuvelrand met bomen",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "P. and N. de Boer Foundation",
    width: 31,
    height: 41,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0291_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Kreupelhout",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 31.5,
    height: 41.7,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0291_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Twee dames bij het ingangshek van een park in Asnières",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Israel Museum",
    width: 41.6,
    height: 31.4,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0305_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Fabrieken in Clichy",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "St. Louis Art Museum",
    width: 36.5,
    height: 53.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0317_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Vaas met seringen, margrietjes en anemonen",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Musée d'Art et d'Histoire",
    width: 39,
    height: 41.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0322_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Vaas met viscaria",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Private collection",
    width: 30.5,
    height: 40,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0324a_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Drie paar schoenen, een schoen ondersteboven",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Harvard Art Museums/Fogg Museum",
    width: 39.2,
    height: 30.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0332_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Een paar schoenen, een schoen ondersteboven",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Private collection",
    width: 29.5,
    height: 19,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0332a_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Een buitenwijk van Parijs",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Private collection",
    width: 53,
    height: 78,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0351_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Man met spade in een Parijse buitenwijk",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Larry Ellison",
    width: 13.5,
    height: 24,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0361_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Portret van père Tanguy",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Ny Carlsberg Glyptotek",
    width: 43.8,
    height: 30,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0364_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Zelfportret met strohoed",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Metropolitan Museum of Art",
    width: 41,
    height: 32,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0365v_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Dame in een tuin wandelend",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Private collection",
    width: 38.8,
    height: 31.3,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0368_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Mandje met appels",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "St. Louis Art Museum",
    width: 43.2,
    height: 34.2,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0379_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Landschap met sneeuw",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Private collection",
    width: 43.2,
    height: 34.2,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0391_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Bloeiend amandeltakje in glas met boek",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Private collection",
    width: 42.7,
    height: 31.7,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0393_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Mandje met sinaasappels",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Private collection",
    width: 36.5,
    height: 25,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0395_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Landschap met pad en afgeknotte bomen",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Private collection",
    width: 36.5,
    height: 25,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0407_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Stilleven met koffiepot",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Basil and Elise Goulandris Museum of Contemporary Art",
    width: 37.9,
    height: 28.4,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0410_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Zeegezicht bij Les Saintes-Maries-de-la-Mer",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 36.3,
    height: 29.4,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0417_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Tuin met treurboom",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Merzbacher Art Foundation",
    width: 42.7,
    height: 31.7,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0428_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Tuin met bloemen",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Private collection",
    width: 33.5,
    height: 44.4,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0430_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Patience Escalier",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Norton Simon Museum of Art",
    width: 44.5,
    height: 33.6,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0444_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Distels",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Collection Niarchos",
    width: 73.9,
    height: 95.2,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0447_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Distels",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Private collection",
    width: 27.3,
    height: 41.3,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0447a_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Twaalf zonnebloemen in een vaas",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Neue Pinakothek",
    width: 41,
    height: 30.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0455_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Vaas met twaalf zonnebloemen",
    year: 1889,
    madeIn: "Arles",
    currentLocation: "Philadelphia Museum of Art",
    width: 42.2,
    height: 34.8,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0456_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Een paar oude schoenen",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Metropolitan Museum of Art",
    width: 41,
    height: 31.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0461_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Zelfportret",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Harvard Art Museums/Fogg Museum",
    width: 34,
    height: 25,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0476_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De spoorwegbrug over de Avenue Montmajour",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Private collection",
    width: 65.7,
    height: 79.3,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0480_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Les Alyscamps, de herfst",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Private collection",
    width: 65,
    height: 80,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0487_x01.jpg/full/!682,440/0/default.jpg"
  },
 {
    title: "L'Arlésienne, portret van Madame Ginoux",
    year: 1890,
    madeIn: "Saint-Rémy",
    currentLocation: "Museu de Arte de Sao Paulo",
    width: 30,
    height: 41.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0488_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Augustine Roulin met baby",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Philadelphia Museum of Art",
    width: 41,
    height: 34,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0490_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De zaaier met ondergaande zon",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Foundation E.G. Bührle",
    width: 47.5,
    height: 55,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0494_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De rode wijngaard",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Pushkin State Museum of Fine Arts",
    width: 30.5,
    height: 40,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0495_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Herinnering aan de tuin in Etten",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Hermitage",
    width: 60,
    height: 85,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0496_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Een romanleester",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Private collection",
    width: 35.5,
    height: 67,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0497_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De stoel van Van Gogh",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "National Gallery",
    width: 44,
    height: 59.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0498_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Portret van dokter Félix Rey",
    year: 1889,
    madeIn: "Arles",
    currentLocation: "Pushkin State Museum of Fine Arts",
    width: 24.5,
    height: 35.4,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0500_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Blauwe handschoenen en mandje met sinaasappels en citroenen",
    year: 1889,
    madeIn: "Arles",
    currentLocation: "National Gallery of Art",
    width: 32,
    height: 46,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0502_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Binnenplaats van het hospitaal",
    year: 1889,
    madeIn: "Arles",
    currentLocation: "Oskar Reinhart Collection 'Am Römerholz'",
    width: 37.5,
    height: 25.7,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0519_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Meisjeskopje",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Musée des Beaux-Arts",
    width: 41.7,
    height: 32.3,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0535_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Portret van Camille Roulin",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Philadelphia Museum of Art",
    width: 42,
    height: 32,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0537_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "L'Arlésienne, portret van Madame Ginoux",
    year: 1890,
    madeIn: "Saint-Rémy",
    currentLocation: "Galleria Nazionale d'Arte Moderna",
    width: 31.5,
    height: 38,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0542_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "L'Arlésienne, portret van Madame Ginoux",
    year: 1890,
    madeIn: "Saint-Rémy",
    currentLocation: "Collection Idan Ofer",
    width: 45,
    height: 60.4,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0543_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De witte boomgaard",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 31.5,
    height: 38,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0552_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Boomgaard met bloeiende abrikozenbomen",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Private collection",
    width: 45,
    height: 60.4,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0556_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Perzikboompje in de boomgaard omringd door cypressen",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Private collection",
    width: 45,
    height: 60.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0556_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Korenveld met schoven",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Israel Museum",
    width: 33.5,
    height: 44,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0558_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Korenhalmen op een veld",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Israel Museum",
    width: 75,
    height: 93,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0562_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De oude taxus",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Private collection",
    width: 32.3,
    height: 43.2,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0573_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Weide met bloemen onder onweerslucht",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Private collection",
    width: 30.5,
    height: 47,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0575_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Een zaaier",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Hammer Museum",
    width: 34.5,
    height: 49.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0575a_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Een tuin met bloemen",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Private collection",
    width: 33.5,
    height: 43.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0578_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Veld met papavers",
    year: 1890,
    madeIn: "Auvers-sur-Oise",
    currentLocation: "Kunstmuseum Den Haag",
    width: 59,
    height: 84.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0581_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Majolicapot met oleandertakken",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Metropolitan Museum of Art",
    width: 65,
    height: 78.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0593_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Majolicapot met oleandertakken",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Private collection",
    width: 33.5,
    height: 50.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0594_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Irissen",
    year: 1889,
    madeIn: "Saint-Rémy",
    currentLocation: "National Gallery of Canada",
    width: 42.4,
    height: 57,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0601_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Twee krabben",
    year: 1889,
    madeIn: "Arles",
    currentLocation: "Private collection",
    width: 42.9,
    height: 31.3,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0606_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De sterrennacht",
    year: 1889,
    madeIn: "Saint-Rémy",
    currentLocation: "Museum of Modern Art",
    width: 33.3,
    height: 43.3,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0612_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Riviertje omringd door struikgewas",
    year: 1890,
    madeIn: "Auvers-sur-Oise",
    currentLocation: "C.V. Starr and Co.",
    width: 39.3,
    height: 46.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0740_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Bloeiende kastanjebomen",
    year: 1890,
    madeIn: "Auvers-sur-Oise",
    currentLocation: "Private collection",
    width: 33.3,
    height: 43.3,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0751_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Vaas met bloemen en distels",
    year: 1890,
    madeIn: "Auvers-sur-Oise",
    currentLocation: "Pola Museum of Art",
    width: 19,
    height: 25.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0763_x01.jpg/full/!682,440/0/default.jpg"
  },
   {
    title: "Korenveld",
    year: 1890,
    madeIn: "Auvers-sur-Oise",
    currentLocation: "Private collection",
    width: 30.6,
    height: 47.6,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF0812_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De zaaier",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 50.8,
    height: 66,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF1143_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De zaaier",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Villa Flora",
    width: 65.7,
    height: 78.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF1442_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De boer, portret van Patience Escalier",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Collection Niarchos",
    width: 44,
    height: 57,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF1460_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Veld met klaprozen",
    year: 1889,
    madeIn: "Saint-Rémy",
    currentLocation: "Kunsthalle Bremen",
    width: 51,
    height: 93,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF1494_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Mousmé in rieten leunstoel, halffiguur",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "National Gallery of Art",
    width: 46,
    height: 35,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF1504_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De brug van Trinquetaille",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Private collection",
    width: 51,
    height: 93,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF1507_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Riviergezicht, kade en brug",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Wynn Fine Art",
    width: 99,
    height: 66,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fdavidbrooks%2Ffull%2FF1507_x01.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Populierenlaan bij zonsondergang",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Kröller-Müller Museum",
    width: 45.8,
    height: 32.2,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20100.120.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Een laan in het park",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Kröller-Müller Museum",
    width: 92,
    height: 104,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20100.251.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Vogelnesten",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Kröller-Müller Museum",
    width: 85,
    height: 151,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20100.451.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Stilleven met bokkingen",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Kröller-Müller Museum",
    width: 46,
    height: 27,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20101.004.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Spitter",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Kröller-Müller Museum",
    width: 42.5,
    height: 33,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20102.175.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De minnaar, portret van Paul-Eugène Milliet",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Kröller-Müller Museum",
    width: 46,
    height: 27,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20102.392.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Een stapel korenschoven op een veld",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Kröller-Müller Museum",
    width: 41,
    height: 26,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20102.692.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Olijfboomgaard",
    year: 1889,
    madeIn: "Saint-Rémy",
    currentLocation: "Kröller-Müller Museum",
    width: 41,
    height: 35,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20104.278.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Stilleven met baardmankruik en koffiemolen",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Kröller-Müller Museum",
    width: 42.7,
    height: 33.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20104.313.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Visser op het strand",
    year: 1882,
    madeIn: "Den Haag",
    currentLocation: "Kröller-Müller Museum",
    width: 41,
    height: 35,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20104.318.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De groene wijngaard",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Kröller-Müller Museum",
    width: 40,
    height: 32.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20104.607.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Olijfboomgaard met plukker en plukster",
    year: 1889,
    madeIn: "Saint-Rémy",
    currentLocation: "Kröller-Müller Museum",
    width: 37.5,
    height: 24.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20104.796.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De oude toren van Nuenen met een ploeger",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Kröller-Müller Museum",
    width: 38.3,
    height: 26,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20105.115.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Bloeiende weide",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Kröller-Müller Museum",
    width: 35,
    height: 26,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20105.264.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Stilleven met vier zonnebloemen",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Kröller-Müller Museum",
    width: 40.3,
    height: 30.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20105.570.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Kop van een vrouw",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 35,
    height: 26,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20105.591.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Stilleven met gipstorso, een roos en twee boeken",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Kröller-Müller Museum",
    width: 38.5,
    height: 26.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20105.676.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Aardappeloogst, twee figuren",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Kröller-Müller Museum",
    width: 36,
    height: 27,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20105.684.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Man aan tafel zittend",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Kröller-Müller Museum",
    width: 38.5,
    height: 26.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20105.938.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Gezicht op Saintes-Maries-de-la-Mer",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Kröller-Müller Museum",
    width: 46.4,
    height: 35.3,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20106.327.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Kop van een meisje",
    year: 1890,
    madeIn: "Auvers-sur-Oise",
    currentLocation: "Kröller-Müller Museum",
    width: 41,
    height: 34.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20106.498.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Vaas met margrietjes en anemonen",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Kröller-Müller Museum",
    width: 40.5,
    height: 30.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20107.055.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Meisje in het bos",
    year: 1882,
    madeIn: "Den Haag",
    currentLocation: "Kröller-Müller Museum",
    width: 40,
    height: 28.6,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20107.592.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Wever",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Kröller-Müller Museum",
    width: 40.5,
    height: 30.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20107.755.jpg/full/!682,440/0/default.jpg"
  },
    {
    title: "Vrouw, de vloer vegend",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Kröller-Müller Museum",
    width: 36,
    height: 27,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20108.559.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Les Alyscamps, de herfst",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Kröller-Müller Museum",
    width: 41.8,
    height: 32.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20108.668.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Scheveningse vrouw op het strand",
    year: 1882,
    madeIn: "Den Haag",
    currentLocation: "Kröller-Müller Museum",
    width: 33.3,
    height: 25.7,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20108.683.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Boomgaard door cypressen omzoomd",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Kröller-Müller Museum",
    width: 43.8,
    height: 34.6,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20108.685.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Korenbulten bij een boerderij",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Kröller-Müller Museum",
    width: 41.8,
    height: 32.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20108.785.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Mandje met appels, opgedragen aan Lucien Pissarro",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Kröller-Müller Museum",
    width: 39.7,
    height: 25.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20108.800.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Schaal met aardappels",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Kröller-Müller Museum",
    width: 39.7,
    height: 25.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20108.951.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Bosrand",
    year: 1882,
    madeIn: "Den Haag",
    currentLocation: "Kröller-Müller Museum",
    width: 39.7,
    height: 25.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20109.023.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Stilleven met onder andere strohoed en pijp",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Kröller-Müller Museum",
    width: 35.7,
    height: 25.3,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20109.323.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Vaas met pioenen en rozen",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Kröller-Müller Museum",
    width: 25.1,
    height: 19,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20109.371.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Veld met een berg hooi of koren",
    year: 1889,
    madeIn: "Saint-Rémy",
    currentLocation: "Kröller-Müller Museum",
    width: 42.5,
    height: 33.1,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20109.773.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De heuvel van Montmartre met molens",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Kröller-Müller Museum",
    width: 44.5,
    height: 35,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20109.824.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Kop van een man met pijp",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Kröller-Müller Museum",
    width: 42.5,
    height: 33.1,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20109.928.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Kar met roodbonte os",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Kröller-Müller Museum",
    width: 44.5,
    height: 35,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20110.256.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Interieur van een restaurant",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Kröller-Müller Museum",
    width: 29.3,
    height: 40.3,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20110.328.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Stilleven met kruikjes",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Kröller-Müller Museum",
    width: 28.5,
    height: 18.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20110.381.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Vrouw aan de maaltijd, gezien tegen het raam",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Kröller-Müller Museum",
    width: 29.3,
    height: 40.3,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20111.052.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Stilleven met uien",
    year: 1889,
    madeIn: "Arles",
    currentLocation: "Kröller-Müller Museum",
    width: 47.8,
    height: 34.8,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20111.075.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Stilleven met onder andere aarden pot en klompen",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Kröller-Müller Museum",
    width: 43,
    height: 30,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20111.332.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Landschap met knotberken",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Private collection",
    width: 39.4,
    height: 30.2,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20121.986.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De zaaier",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Kröller-Müller Museum",
    width: 45.5,
    height: 33,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20122.897.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Vijf personen bij de maaltijd (de Aardappeleters)",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Kröller-Müller Museum",
    width: 36.8,
    height: 45.2,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2FKM%20126.762.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Mansportret",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Kröller-Müller Museum",
    width: 39,
    height: 30.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2Fsharepoint%2FKM103_189-lijst.tif/full/!682,440/0/default.jpg"
  },
  {
    title: "Knotwilgen bij zonsondergang",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Kröller-Müller Museum",
    width: 37.7,
    height: 29.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2Fsharepoint%2FKM107_313-IR.tif/full/!682,440/0/default.jpg"
  },
  {
    title: "L'Arlésienne, portret van Madame Ginoux",
    year: 1890,
    madeIn: "Saint-Rémy",
    currentLocation: "Kröller-Müller Museum",
    width: 44.3,
    height: 32.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2Fsharepoint%2FKM110_202-strijklicht.tif/full/!682,440/0/default.jpg"
  },
  {
    title: "De brug van Langlois",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Kröller-Müller Museum",
    width: 44.3,
    height: 32.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2Fsharepoint%2FKM111_056-strijklicht.tif/full/!682,440/0/default.jpg"
  },
  {
    title: "Stilleven met fles, citroenen en sinaasappelen",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Kröller-Müller Museum",
    width: 47,
    height: 30,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fkmm%2Fsharepoint%2FKM111_196-lijst.tif/full/!682,440/0/default.jpg"
  },
  {
    title: "Vaas met anjers",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Museum Boijmans-van Beuningen",
    width: 35.5,
    height: 26,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fsma%2FA2235.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Gezicht op de daken van Parijs",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Kunstmuseum Basel",
    width: 65,
    height: 78,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fsma%2FA2236.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Twee handen",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Private collection",
    width: 35.5,
    height: 26,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fd0078V1962r_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Korenveld met schoven",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Honolulu Museum of Art",
    width: 65,
    height: 78,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fd0227V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Boulevard de Clichy",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 70.5,
    height: 170,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fd0356V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Kop van een vrouw",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 41,
    height: 33,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fd0362V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Bomen met klimop",
    year: 1889,
    madeIn: "Saint-Rémy",
    currentLocation: "",
    width: 34,
    height: 44.3,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fd0439V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Weg met kaalgesnoeide knotwilgen",
    year: 1889,
    madeIn: "Arles",
    currentLocation: "Collection Niarchos",
    width: 50.5,
    height: 40,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fd1172S2012_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Portret van dokter Gachet",
    year: 1890,
    madeIn: "Auvers-sur-Oise",
    currentLocation: "Private collection",
    width: 34,
    height: 44.3,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fp0469V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Portret van dokter Gachet",
    year: 1890,
    madeIn: "Auvers-sur-Oise",
    currentLocation: "Musée d'Orsay",
    width: 44.1,
    height: 38.1,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fp0472V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Vogelnesten",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 29.5,
    height: 41.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0001V1962_gp.jpg/full/!682,440/0/default.jpg"
  },
   {
    title: "De oude kerktoren te Nuenen ('Het boerenkerkhof')",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 41.5,
    height: 79,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0002V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Het uitgaan van de Hervormde Kerk te Nuenen",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 35.5,
    height: 45,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0003V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Kop van een vrouw",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Kröller-Müller Museum",
    width: 45,
    height: 35.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0004V1962r_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Volkstuin met zonnebloemen",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 46,
    height: 38,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0004V1962v_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De aardappeleters",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 42.4,
    height: 32,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0005V1962_gp.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Kop van een vrouw",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 46,
    height: 38,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0006V1962_gp.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Naaiende vrouw",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 46.4,
    height: 38.3,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0007V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Stilleven met bijbel",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 33,
    height: 43,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0008V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Vaas met judaspenningen",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 41,
    height: 54.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0009V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Kop van een oude vrouw",
    year: 1885,
    madeIn: "Antwerpen",
    currentLocation: "Van Gogh Museum",
    width: 49,
    height: 46,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0010V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Schoenen",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 49,
    height: 46,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0011V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De heuvel van Montmartre met steengroeve",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 36,
    height: 53,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0012V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Gezicht op Parijs",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 60,
    height: 45.8,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0013V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Impasse des Deux Frères",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 57,
    height: 82,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0014V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Moestuinen en de Moulin de Blute-fin op Montmartre",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 35,
    height: 43,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0015V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Zelfportret met grijze vilthoed",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Rijksmuseum",
    width: 32,
    height: 39.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0016V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Zelfportret met vilthoed",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 33.8,
    height: 48.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0016V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Agostina Segatori in het Cafè du Tambourin",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 40.2,
    height: 30,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0017V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Volkstuinen op Montmartre",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 58.4,
    height: 79.1,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0018V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Laan in een park",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Private collection",
    width: 42,
    height: 30,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0019V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Stilleven met karaf en citroenen",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 33,
    height: 51,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0020V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Studie voor 'Romans Parijsiens`",
    year: 1887,
    madeIn: "Parijis",
    currentLocation: "Van Gogh Museum",
    width: 41.6,
    height: 57.2,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0021V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Zelfportret als schilder",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 40,
    height: 29.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0022V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Stilleven met kweeperen en citroenen",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 31,
    height: 22.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0023V1962_gb_wfr.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Vissersboten bij Les Saintes-Maries-de-la-Mer",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 40,
    height: 29.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0028V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De zouaaf",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 31,
    height: 22.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0029V1962_gp.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Het gele huis (`De straat')",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 41.5,
    height: 31,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0032V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Veld met klaprozen",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 47,
    height: 39,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0033V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De roze perzikboom",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 23,
    height: 34,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0035V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Boomgaard en huis met oranje dak",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Private collection",
    width: 45.6,
    height: 38,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0038V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Boomgaard met witte bloesem",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Metropolitan Museum of Art",
    width: 35.5,
    height: 26.2,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0038V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Bloeiend pereboompje",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 44.2,
    height: 33.8,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0039V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Geploegde akkers ('De voren`)",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 35,
    height: 24.4,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0040V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Irissen",
    year: 1889,
    madeIn: "Saint-Rémy",
    currentLocation: "Getty Center",
    width: 27.2,
    height: 19,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0050V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Bospad",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 41.5,
    height: 32.4,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0051V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Stilleven met koperen ketel en kruik",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 27.2,
    height: 19,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0052V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Spoelwiel",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 41.5,
    height: 32.4,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0054V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Weg langs de Seine bij Asnières",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 32.2,
    height: 24.6,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0055V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Gipsen vrouwentorso",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 73.5,
    height: 60.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0056V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Gezicht op Parijs vanuit Theo's appartement in de rue Lepic",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 38,
    height: 55,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0057V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
    {
    title: "Zelfportret",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 33,
    height: 24,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0071V1962v_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Kop van een vrouw",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 41,
    height: 32.8,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0072V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Garenspoelende vrouw",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 33,
    height: 24,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0073V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Portret van een vrouw",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 35,
    height: 27,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0074V1962_gp.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Oevers van de Seine",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 40,
    height: 32.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0077V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Kreupelhout",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 31,
    height: 44,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0078V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Stilleven met kolen en uien",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 44,
    height: 39,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0082V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Kop van een skelet met brandende sigaret",
    year: 1886,
    madeIn: "Antwerpen",
    currentLocation: "Van Gogh Museum",
    width: 46.5,
    height: 37,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0083V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De Ruijterkade te Amsterdam",
    year: 1885,
    madeIn: "Amsterdam",
    currentLocation: "Van Gogh Museum",
    width: 20,
    height: 27,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0085V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De Seine met de Pont de la Grande Jatte",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 37.5,
    height: 45.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0086V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De hut",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 46.5,
    height: 37,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0087V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Gipsen vrouwentorso",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 38.4,
    height: 46,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0089V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Zittend naakt meisje",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 38,
    height: 46.2,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0090V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Portret van een vrouw",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 32,
    height: 40.9,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0091V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Weg te Montmartre",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 56,
    height: 62.2,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0092V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Portret van Agostina Segatori",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 33,
    height: 41,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0093V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Daken in Parijs",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 22.2,
    height: 16.3,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0095V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Bierpullen",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 33,
    height: 41,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0096V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Zelfportret",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 91,
    height: 50.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0097V1962v_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Gezicht op een park te Asnières",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 58,
    height: 45.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0098V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Ijsvogel",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 65.5,
    height: 35,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0100V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Gipsen spiermodel",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 50,
    height: 64.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0102V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Gipsen mannentorso",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 32.7,
    height: 41,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0103V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Portret van een man met één oog",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 50,
    height: 64.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0113V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De brug in de regen (naar Hiroshige)",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 35,
    height: 27,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0114V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De bloeiende pruimenboom (naar Hiroshige)",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 46,
    height: 55,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0115V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Gezicht op een slagerswinkel",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 78.5,
    height: 40.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0119V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Een paar leren klompen",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 78.5,
    height: 40.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0120V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Uitgebloeide zonnebloemen",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 46,
    height: 55,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0121V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Garnalen en mosselen",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 46,
    height: 37.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0122V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Schedel",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 65,
    height: 40,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0123V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Een op zijn rug liggende krab",
    year: 1889,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 46,
    height: 37.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0124V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Portret van Etienne-Lucien Martin",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 46.5,
    height: 38.4,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0125V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Bloeiende kastanjeboom",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 65,
    height: 35,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0126V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Bloeiende kastanjeboom",
    year: 1890,
    madeIn: "Auvers-sur-Oise",
    currentLocation: "Kröller-Müller Museum",
    width: 46.5,
    height: 38.4,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0126V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Schoenen",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 50,
    height: 61,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0127V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Schedel",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 49.5,
    height: 61,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0128V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Boerderij met turfhopen",
    year: 1883,
    madeIn: "Nieuw-Amsterdam",
    currentLocation: "Van Gogh Museum",
    width: 50,
    height: 61,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0130V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Appels",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 45.5,
    height: 60.2,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0131V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Zonsondergang in Montmartre",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: null,
    height: null,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0133M1970_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Restaurant te Asnières",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 26.5,
    height: 34.8,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0134V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Studie voor 'De aardappeleters`",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 38.1,
    height: 45.3,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0135V1962r_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Vleermuis",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 26.5,
    height: 34.8,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0136V1973_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Stilleven met kool en klompen",
    year: 1881,
    madeIn: "Den Haag",
    currentLocation: "Van Gogh Museum",
    width: 37,
    height: 25.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0137V1962_gb.jpg/full/!995,642/0/default.jpg"
  },
  {
    title: "Stilleven met aardewerk en flessen",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 61,
    height: 50.2,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0138V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "De pastorie te Nuenen",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 43.7,
    height: 33.3,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0140V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Populierenlaan in de herfst",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 53.9,
    height: 72.8,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0141M1977_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Achterkanten van huizen",
    year: 1885,
    madeIn: "Antwerpen",
    currentLocation: "Van Gogh Museum",
    width: 45.7,
    height: 54.6,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0142V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Vaas met gladiolen en herfstasters",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 45.7,
    height: 54.6,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0144V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Kop van een oude Arlésienne",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 45.7,
    height: 54.6,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0145V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Mand met appels",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 45.7,
    height: 54.6,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0150V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Mand met appels",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 35.6,
    height: 27.3,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0151V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Mand met aardappels",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 45.6,
    height: 38.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0152V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Mand met aardappels",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 38.1,
    height: 61.1,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0154V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Zelfportret",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 40.3,
    height: 34,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0156V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Portret van Theo van Gogh",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 42.2,
    height: 34.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0157V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Zelfportret met pijp",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 42.2,
    height: 34.4,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0158V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Zelfportret",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 41,
    height: 33,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0159V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Zelfportret",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 55.6,
    height: 46,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0159V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Zelfportret als schilder",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 46.5,
    height: 38,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0160V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Zelfportret",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 43.6,
    height: 33,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0161V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Zelfportret met vilthoed",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 46.5,
    height: 38,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0162V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Zelfportret met pijp en strohoed",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 45.4,
    height: 37.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0163V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Portret van Léonie Rose Charbuy-Davy",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 32.8,
    height: 42,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0165V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Portret van Camille Roulin",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 45.4,
    height: 37.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0166V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Vaas met herfstasters",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 55,
    height: 67,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0177V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Glas met gele rozen",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 99,
    height: 79,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0178V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Mandje met bloembollen",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 54.6,
    height: 45.1,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0179V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Mand met viooltjes op een tafel",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 66,
    height: 51,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0180V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
   {
    title: "Drie romans",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 42.1,
    height: 22,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0181V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Flesje met bloemen",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 54.5,
    height: 46,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0182V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Bloempot met bieslook",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 21,
    height: 42,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0183V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Bloeiend amandeltakje in een glas",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 21,
    height: 42,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0184V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Siernetel in een bloempot",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 37,
    height: 44.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0185V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Glas absint en een karaf",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 70.3,
    height: 34.2,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0186V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Grote Nachtpauwoog",
    year: 1889,
    madeIn: "Saint-Rémy",
    currentLocation: "Van Gogh Museum",
    width: 69,
    height: 33.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0189V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Wilde rozen",
    year: 1890,
    madeIn: "Saint-Rémy",
    currentLocation: "Van Gogh Museum",
    width: 27.3,
    height: 35.3,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0190V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Stilleven met citroenen",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 55,
    height: 41,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0193V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Druiven",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 65.5,
    height: 54.3,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0194V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Korenveld met patrijs",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 38,
    height: 46,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0197V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Gipsen vrouwentorso",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 37,
    height: 45.5,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0199V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Gipsen vrouwentorso",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 46,
    height: 55.3,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0201V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Paard",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 32,
    height: 46,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0202V1962_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Zeegezicht bij Scheveningen",
    year: 1882,
    madeIn: "Scheveningen",
    currentLocation: "Van Gogh Museum",
    width: 19,
    height: 14,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0416N1990_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Aardappelrooiende boerin",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 49.2,
    height: 65.2,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0452S1995_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Boer, onkruidverbrandend",
    year: 1883,
    madeIn: "Drenthe",
    currentLocation: "Van Gogh Museum",
    width: 19,
    height: 14,
    image: "https://data.spinque.com/iiif/2/vangoghworldwide%2Fvgm%2Fs0548S2019_gb.jpg/full/!682,440/0/default.jpg"
  },
  {
    title: "Tuin met vlinders",
    year: 1889,
    madeIn: "Arles",
    currentLocation: "Private collection",
    width: 42,
    height: 34,
    image: "https://drawpaintacademy.com/wp-content/uploads/2021/07/Vincent-van-Gogh-Garden-Coin-With-Butterflies-1887-1200W.jpg"
  },
  {
    title: "Groep huizen met een figuurtje",
    year: 1890,
    madeIn: "Auvers-sur-Oise",
    currentLocation: "Private collection",
    width: 19,
    height: 14,
    image: "https://eshop.maisondevangogh.fr/wp-content/uploads/2022/05/27-F758-canvas-baklijst-blank.jpg"
  },
  {
    title: "Laan in een park in Asnières",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Yale University Art Gallery",
    width: 55,
    height: 65,
    image: "https://images.collections.yale.edu/iiif/2/yuag:393cf680-3efa-41e3-8e54-df8d6f95a96e/full/!682,440/0/default.jpg"
  },
  {
    title: "Café-terras aan het Place du Forum",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Kröller-Müller Museum",
    width: 40.4,
    height: 30.3,
    image: "https://krollermuller.nl/media/cache/collection_item_detail_small/media/collectionitempage/tmsImage/caf-terras-bij-nacht-place-du-forum-vincent-van-gogh-44529-copyright-kroller-muller-museum.jpg?500909865b6e"
  },
  {
    title: "Zaaier (?)",
    year: 1883,
    madeIn: "Den Haag",
    currentLocation: null,
    width: 55,
    height: 65,
    image: "https://krollermuller.nl/media/cache/collection_item_detail_small/media/collectionitempage/tmsImage/de-zaaier-vincent-van-gogh-44543-copyright-kroller-muller-museum.jpg?500909865b6e"
  },
  {
    title: "Herfstlandschap met vier bomen",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Kröller-Müller Museum",
    width: 49.2,
    height: 65.2,
    image: "https://krollermuller.nl/media/cache/collection_item_detail_small/media/collectionitempage/tmsImage/herfstlandschap-vincent-van-gogh-44696-copyright-kroller-muller-museum.jpg?500909865b6e"
  },
  {
    title: "Korenveld met schoven",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Private collection",
    width: 52,
    height: 65,
    image: "https://krollermuller.nl/media/cache/collection_item_detail_small/media/collectionitempage/tmsImage/korenveld-met-maaier-en-zon-vincent-van-gogh-44548-copyright-kroller-muller-museum.jpg?500909865b6e"
  },
  {
    title: "Uitzichtspunt op Montmartre",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Art Institute of Chicago",
    width: 55,
    height: 46,
    image: "https://krollermuller.nl/media/cache/collection_item_detail_small/media/collectionitempage/tmsImage/la-butte-montmartre-vincent-van-gogh-44506-copyright-kroller-muller-museum.jpg"
  },
  {
    title: "Naakte vrouw, liggend",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Kröller-Müller Museum",
    width: 32,
    height: 40,
    image: "https://krollermuller.nl/media/cache/collection_item_detail_small/media/collectionitempage/tmsImage/liggend-naakt-vincent-van-gogh-44429-copyright-kroller-muller-museum.jpg?500909865b6e"
  },
  {
    title: "De Moulin de la Galette: le Radet",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Kröller-Müller Museum",
    width: 55,
    height: 67,
    image: "https://krollermuller.nl/media/cache/collection_item_detail_small/media/collectionitempage/tmsImage/moulin-de-la-galette-vincent-van-gogh-44512-copyright-kroller-muller-museum.jpg?500909865b6e"
  },
  {
    title: "Portret van Joseph Roulin",
    year: 1889,
    madeIn: "Arles",
    currentLocation: "Kröller-Müller Museum",
    width: 32,
    height: 40,
    image: "https://krollermuller.nl/media/cache/collection_item_detail_small/media/collectionitempage/tmsImage/portret-van-joseph-roulin-vincent-van-gogh-44526-copyright-kroller-muller-museum.jpg?500909865b6e"
  },
  {
    title: "Bloeiende perzikbomen, Souvenir de Mauve",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Kröller-Müller Museum",
    width: 33,
    height: 46.5,
    image: "https://krollermuller.nl/media/cache/collection_item_detail_small/media/collectionitempage/tmsImage/roze-perzikbomen-souvenir-de-mauve-vincent-van-gogh-44542-copyright-kroller-muller-museum.jpg?500909865b6e"
  },
  {
    title: "Stilleven met aarden kom met aardappels",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Museum Boijmans-van Beuningen",
    width: 46,
    height: 38,
    image: "https://krollermuller.nl/media/cache/collection_item_detail_small/media/collectionitempage/tmsImage/stilleven-met-aardappels-vincent-van-gogh-44514-copyright-kroller-muller-museum.jpg"
  },
  {
    title: "Mand met appels en twee pompoenen",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Kröller-Müller Museum",
    width: 46.1,
    height: 38,
    image: "https://krollermuller.nl/media/cache/collection_item_detail_small/media/collectionitempage/tmsImage/stilleven-met-appels-en-pompoenen-vincent-van-gogh-44484-copyright-kroller-muller-museum.jpg?500909865b6e"
  },
  {
    title: "Stilleven met vlees, groenten en aardewerk",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Collection J. Lipchitz",
    width: 46.1,
    height: 55.2,
    image: "https://krollermuller.nl/media/cache/collection_item_detail_small/media/collectionitempage/tmsImage/stilleven-met-vlees-en-groente-anoniem-36351-copyright-kroller-muller-museum.jpg?500909865b6e"
  },
  {
    title: "Vallende bladeren",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Kröller-Müller Museum",
    width: 72,
    height: 91,
    image: "https://krollermuller.nl/media/cache/collection_item_detail_small/media/collectionitempage/tmsImage/vallende-bladeren-les-alyscamps-vincent-van-gogh-44518-copyright-kroller-muller-museum.jpg?500909865b6e"
  },
  {
    title: "Wever",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Kröller-Müller Museum",
    width: 46.1,
    height: 55.2,
    image: "https://krollermuller.nl/media/cache/collection_item_detail_small/media/collectionitempage/tmsImage/weefgetouw-met-wever-vincent-van-gogh-44472-copyright-kroller-muller-museum.jpg?500909865b6e"
  },
  {
    title: "Wever",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Kröller-Müller Museum",
    width: 53.7,
    height: 65.2,
    image: "https://krollermuller.nl/media/cache/collection_item_detail_small/media/collectionitempage/tmsImage/weefgetouw-met-wever-vincent-van-gogh-44491-copyright-kroller-muller-museum.jpg?500909865b6e"
  },
  {
    title: "Wever",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Collection Alex Maguy",
    width: 40,
    height: 32.4,
    image: "https://krollermuller.nl/media/cache/collection_item_detail_small/media/collectionitempage/tmsImage/wever-voor-het-weefgetouw-vincent-van-gogh-44496-copyright-kroller-muller-museum.jpg?500909865b6e"
  },
  {
    title: "De roze boomgaard",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 19,
    height: 27,
    image: "https://lh3.googleusercontent.com/3G0VW5I0SFQb5iB_pysfMOK8IlaiSChdHtaV39jN296a4ajeC8YdexcF9X81WRbtaCQ=s1200"
  },
  {
    title: "Portret van Armand Roulin",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Museum Boijmans-van Beuningen",
    width: 52,
    height: 64.4,
    image: "https://media.rkd.nl/iiif/10708739/full/!682,440/0/default.jpg"
  },
  {
    title: "Glas met bloemen",
    year: 1890,
    madeIn: "Auvers-sur-Oise",
    currentLocation: "Collection Alicia Koplowitz",
    width: 54,
    height: 65.5,
    image: "https://media.rkd.nl/iiif/10708742/full/!682,440/0/default.jpg"
  },
  {
    title: "Glas met witte, roze en rode anjers",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Detroit Institute of Arts",
    width: 81,
    height: 100,
    image: "https://media.rkd.nl/iiif/10708742/full/!682,440/0/default.jpg"
  },
  {
    title: "Zelfportret",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Kunstmuseum Basel",
    width: 54,
    height: 72,
    image: "https://media.rkd.nl/iiif/10714352/full/!682,440/0/default.jpg"
  },
  {
    title: "Spittende boerin",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Barber Institute of Fine Arts, University of Birmingham",
    width: 81,
    height: 100,
    image: "https://media.rkd.nl/iiif/10714673/full/!682,440/0/default.jpg"
  },
  {
    title: "Vrouw aan het spinnewiel",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Narodni Museum",
    width: 54,
    height: 72,
    image: "https://media.rkd.nl/iiif/10716286/full/!682,440/0/default.jpg"
  },
  {
    title: "Vrouw, zittend, halffiguur",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Private collection",
    width: 46,
    height: 55.6,
    image: "https://media.rkd.nl/iiif/10716286/full/!682,440/0/default.jpg"
  },
  {
    title: "Vrouw met falie",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Musée des Beaux-Arts",
    width: 43.2,
    height: 33.9,
    image: "https://media.rkd.nl/iiif/10716315/full/!682,440/0/default.jpg"
  },
  {
    title: "Pastorietuin",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Groninger Museum",
    width: 44,
    height: 35.5,
    image: "https://media.rkd.nl/iiif/10717285/full/!682,440/0/default.jpg"
  },
    {
    title: "Bordeelscène",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Barnes Foundation",
    width: 18.8,
    height: 27,
    image: "https://media.rkd.nl/iiif/10770774/full/!682,440/0/default.jpg"
  },
  {
    title: "Portret van een boer met pijpje",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Barnes Foundation",
    width: 46.5,
    height: 37.5,
    image: "https://media.rkd.nl/iiif/10770775/full/!682,440/0/default.jpg"
  },
  {
    title: "Een fabriek in Asnières",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Barnes Foundation",
    width: 65,
    height: 54,
    image: "https://media.rkd.nl/iiif/10770777/full/!682,440/0/default.jpg"
  },
  {
    title: "Naakte vrouw, liggend",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Barnes Foundation",
    width: 38,
    height: 61,
    image: "https://media.rkd.nl/iiif/10770779/full/!682,440/0/default.jpg"
  },
  {
    title: "Herfstlandschap",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Fitzwilliam Museum",
    width: 65,
    height: 54,
    image: "https://media.rkd.nl/iiif/10770781/full/!682,440/0/default.jpg"
  },
  {
    title: "Korenveld met schoven en maaier",
    year: 1890,
    madeIn: "Auvers-sur-Oise",
    currentLocation: "Toledo Museum of Art",
    width: 38,
    height: 61,
    image: "https://media.rkd.nl/iiif/10770783/full/!682,440/0/default.jpg"
  },
  {
    title: "Een groep huizen",
    year: 1890,
    madeIn: "Auvers-sur-Oise",
    currentLocation: "Toledo Museum of Art",
    width: 23.8,
    height: 40.9,
    image: "https://media.rkd.nl/iiif/10770784/full/!682,440/0/default.jpg"
  },
  {
    title: "Een paar schoenen",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Baltimore Museum of Art",
    width: 49.8,
    height: 72.5,
    image: "https://media.rkd.nl/iiif/10770788/full/!682,440/0/default.jpg"
  },
  {
    title: "De oude molen",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Buffalo AKG Art Museum",
    width: 33,
    height: 41,
    image: "https://media.rkd.nl/iiif/10770791/full/!682,440/0/default.jpg"
  },
  {
    title: "Rand van een korenveld met klaprozen",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Denver Art Museum",
    width: 32.7,
    height: 41.3,
    image: "https://media.rkd.nl/iiif/10770793/full/!682,440/0/default.jpg"
  },
  {
    title: "Olijfboomgaard",
    year: 1889,
    madeIn: "Saint-Rémy",
    currentLocation: "Goteborgs Konstmuseum",
    width: 32.5,
    height: 41.2,
    image: "https://media.rkd.nl/iiif/10770833/full/!682,440/0/default.jpg"
  },
  {
    title: "Landschap met wegrand",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Pommersches Landesmuseum",
    width: 32.7,
    height: 41.3,
    image: "https://media.rkd.nl/iiif/10770844/full/!682,440/0/default.jpg"
  },
  {
    title: "Zelfportret met verbonden oor",
    year: 1889,
    madeIn: "Arles",
    currentLocation: "Courtauld Institute Galleries",
    width: 32.5,
    height: 41.2,
    image: "https://media.rkd.nl/iiif/10770878/full/!682,440/0/default.jpg"
  },
  {
    title: "De Pont du Carroussel en het Louvre",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Ny Carlsberg Glyptotek",
    width: 31.9,
    height: 22,
    image: "https://media.rkd.nl/iiif/10770883/full/!682,440/0/default.jpg"
  },
  {
    title: "Ploeger met aardappelplantende vrouw",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Von der Heydt-Museum",
    width: 31.2,
    height: 48.3,
    image: "https://media.rkd.nl/iiif/10770926/full/!682,440/0/default.jpg"
  },
  {
    title: "Spittende boerin",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Art Gallery of Ontario",
    width: 31.9,
    height: 22,
    image: "https://media.rkd.nl/iiif/10770936/full/!682,440/0/default.jpg"
  },
  {
    title: "Moeder Van Gogh, naar een foto",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Norton Simon Museum of Art",
    width: 21,
    height: 27.1,
    image: "https://media.rkd.nl/iiif/10770967/full/!682,440/0/default.jpg"
  },
  {
    title: "Restaurant Rispal in Asnières",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Nelson-Atkins Museum of Fine Art",
    width: 45.9,
    height: 38.1,
    image: "https://nl.wikipedia.org/wiki/Bestand:Van_Gogh_-_Das_Restaurant_Rispal_in_Asniéres.jpeg"
  },
  {
    title: "De sterrennacht",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Musée d'Orsay",
    width: 45.5,
    height: 56.5,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/01/Vincent_van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg"
  },
  {
    title: "Man bukkend met stok of schep",
    year: 1883,
    madeIn: "Den Haag",
    currentLocation: "Kuboso Memorial Museum of Arts",
    width: 45.9,
    height: 38.1,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/05/Man_Stooping_with_Stick_or_Spade.jpg"
  },
  {
    title: "Ingangshek van boerderij met hooischelven",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "National Gallery of Art",
    width: 46,
    height: 38.2,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/06/Farmhouse_in_Provence%2C_1888%2C_Vincent_van_Gogh%2C_NGA.jpg"
  },
  {
    title: "De schilder op de weg naar Tarascon",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "",
    width: 45.5,
    height: 56.5,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/07/Vincent_Van_Gogh_0013.jpg"
  },
  {
    title: "Ketel en twee kommen",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Private collection",
    width: 42,
    height: 33,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Van_gogh_Still_Life_with_Copper_Coffeepot_and_Two_White_Bowls_f202.jpg"
  },
  {
    title: "Een laan in het plantsoen",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Louis Vuitton Foundation",
    width: 44.5,
    height: 37.2,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/09/Van_Gogh_-_Weg_im_Park_von_Arles_mit_Spaziergängern.jpeg"
  },
  {
    title: "De slaapkamer",
    year: 1889,
    madeIn: "Saint-Rémy",
    currentLocation: "Art Institute of Chicago",
    width: 34,
    height: 25,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Vincent_van_Gogh_-_The_Bedroom_-_Google_Art_Project.jpg"
  },
  {
    title: "Vrouw, zittend, kniestuk",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Netherlands Cultural Heritage Agency",
    width: 45.2,
    height: 81.3,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Peasant_Woman%2C_Seated_with_White_Cap_by_Vincent_van_Gogh_-_Noordbrabants_Museum.jpg"
  },
   {
    title: "Avond (naar Millet)",
    year: 1889,
    madeIn: "Saint-Rémy",
    currentLocation: "Van Gogh Museum",
    width: 38,
    height: 46,
    image: "https://upload.wikimedia.org/wikipedia/commons/1/14/Avond_%28naar_Millet%29_-_s0174V1962_-_Van_Gogh_Museum.jpg"
  },
  {
    title: "Vaas met vijftien zonnebloemen",
    year: 1889,
    madeIn: "Arles",
    currentLocation: "Seiji Togo Memorial Sompo Japan Nipponkoa Museum of Art",
    width: 61,
    height: 50,
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Van_Gogh_Vase_with_Fifteen_Sunflowers.jpg"
  },
  {
    title: "De oude toren",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Foundation E.G. Bührle",
    width: 47.3,
    height: 39.4,
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Van_Gogh_-_Der_alte_Friedhofsturm_in_Nuenen.jpeg"
  },
  {
    title: "Stilleven met boeken, Roman Parijsiens",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Private collection",
    width: 38,
    height: 46,
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Van_Gogh_-_Stillleben_mit_französischen_Romanen_und_Glas_mit_Rose.jpeg"
  },
  {
    title: "Watermolen",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Noordbrabants Museum",
    width: 96,
    height: 120,
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Van_Gogh_-_Wassermühle_in_Kollen_bei_Nuenen.jpeg"
  },
  {
    title: "Verliefde paartjes in het park Voyer d'Argenson te Asnières",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 48,
    height: 55,
    image: "https://upload.wikimedia.org/wikipedia/commons/2/20/WLANL_-_Pachango_-_Verliefde_paartjes_in_het_park_Voyer_d%27Argenson_te_Asnières%2C_Vincent_van_Gogh_%281887%29.jpg"
  },
  {
    title: "Portret van een man",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "",
    width: 50.5,
    height: 60,
    image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Van_Gogh_-_Fliederstrauch.jpeg"
  },
  {
    title: "Seringen",
    year: 1889,
    madeIn: "Saint-Rémy",
    currentLocation: "Hermitage",
    width: 73.3,
    height: 60,
    image: "https://upload.wikimedia.org/wikipedia/commons/2/24/Van_Gogh_-_Fliederstrauch.jpeg"
  },
  {
    title: "Seine-oever met de Pont de Clichy",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Collection Niarchos",
    width: 41,
    height: 33,
    image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Vincent_van_Gogh_-_Banks_of_the_Seine_with_the_Pont_de_Clichy_in_the_Spring_%281887%29.jpg"
  },
  {
    title: "Stilleven met gemberpot en vruchten",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Private collection",
    width: 73.3,
    height: 60,
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Van_gogh_still_life_with_ginger_jar_and_apples_f104_jh923.jpg"
  },
  {
    title: "Breton woman and children",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Galleria d'Arte Moderna",
    width: 60,
    height: 73,
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Breton_Women.jpg"
  },
  {
    title: "La Crau met bloeiende perzikbomen",
    year: 1889,
    madeIn: "Arles",
    currentLocation: "Courtauld Institute Galleries",
    width: 42,
    height: 35,
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Vincent_van_Gogh_-_Perzikbomen_in_bloei.jpg"
  },
  {
    title: "De tuin van dokter Gachet",
    year: 1890,
    madeIn: "Auvers-sur-Oise",
    currentLocation: "Musée d'Orsay",
    width: 54,
    height: 73.4,
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Doctor_Gachet%27s_Garden_in_Auvers.jpg"
  },
  {
    title: "Bloeiende boomgaarden, gezicht op Arles",
    year: 1889,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 73.5,
    height: 93,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/32/Van_Gogh_-_Blühender_Obstgarten_mit_Blick_auf_Arles.jpeg"
  },
  {
    title: "De Moulin de la Galette: le Blute-fin",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Kelvingrove Art Gallery",
    width: 50,
    height: 65,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/34/Van_Gogh_-_Le_Moulin_de_la_Galette.jpeg"
  },
  {
    title: "Duinlandschap",
    year: 1883,
    madeIn: "Den Haag",
    currentLocation: "Private collection",
    width: 48,
    height: 73,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Landscape_with_Dunes.jpg"
  },
  {
    title: "Vaas met dorre bladeren",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Private collection",
    width: 50,
    height: 65,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/37/Van_Gogh_-_Vase_mit_verwelkten_Blätter.jpeg"
  },
  {
    title: "The Man is at Sea",
    year: 1889,
    madeIn: "Saint-Rémy",
    currentLocation: "Private collection",
    width: 66,
    height: 51,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Van_Gogh_-_Der_Mann_ist_auf_See_%28nach_Demont-Breton%29.jpeg"
  },
  {
    title: "Portret van een prostituee",
    year: 1885,
    madeIn: "Antwerpen",
    currentLocation: "Van Gogh Museum",
    width: 47,
    height: 35.5,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Vincent_van_Gogh_-_Portrait_of_a_prostitute_-_Google_Art_Project.jpg"
  },
  {
    title: "Vaas met korenbloemen en klaprozen",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Triton Foundation",
    width: 47,
    height: 35.5,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Vincent_van_Gogh_-_Vase_with_Cornflowers_and_Poppies_-_F280_JH2032.jpg"
  },
  {
    title: "Vaas met witte en rode anjers",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Private collection",
    width: 41.5,
    height: 34.5,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Vase-with-White-and-Red-Carnations_F236.jpg"
  },
  {
    title: "Gemberpot met margrietjes (?)",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Private collection",
    width: 48,
    height: 60,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Van_Gogh_-_Ingwertopf_mit_Chrysantemen.jpeg"
  },
  {
    title: "Paul Gauguin (Man met rode baret)",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 41.5,
    height: 34.5,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Vincent_van_Gogh_-_Paul_Gauguin_%28Man_in_a_Red_Beret%29.jpg"
  },
  {
    title: "Portret van een boer",
    year: 1889,
    madeIn: "Saint-Rémy",
    currentLocation: "Galleria Nazionale d'Arte Moderna",
    width: 55.5,
    height: 47,
    image: "https://upload.wikimedia.org/wikipedia/commons/4/43/Il_giardiniere_%28Vincent_Van_Gogh%29.jpg"
  },
  {
    title: "Landschap met rijtuigje en trein op de achtergrond",
    year: 1890,
    madeIn: "Auvers-sur-Oise",
    currentLocation: "Pushkin State Museum of Fine Arts",
    width: 60.7,
    height: 45.7,
    image: "https://upload.wikimedia.org/wikipedia/commons/4/48/Van_Gogh_Landscape_with_carriage_and_train_1890.jpg"
  },
  {
    title: "Boerin aardappelen opgravend",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Royal Museum of Fine Arts",
    width: 55.5,
    height: 47,
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Vincent_van_Gogh_-_Aardappelrooister.jpg"
  },
  {
    title: "De pastorietuin met sneeuw",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Hammer Museum",
    width: 55.6,
    height: 46.8,
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Van_Gogh_-_The_Parsonage_Garden_at_Nuenen.jpg"
  },
  {
    title: "Zonsondergang bij Montmajour",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Private collection",
    width: 50,
    height: 64.3,
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Sunset_at_Montmajour_1888_Van_Gogh.jpg"
  },
  {
    title: "De dichter, portret van Eugène Boch",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Musée d'Orsay",
    width: 100.7,
    height: 60.7,
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Van_Gogh_-_Portrait_of_Eug%C3%A9ne_Boch.jpg"
  },
  {
    title: "La Berceuse, portret van Madame Roulin",
    year: 1889,
    madeIn: "Arles",
    currentLocation: "Art Institute of Chicago",
    width: 50,
    height: 64.3,
    image: "https://upload.wikimedia.org/wikipedia/commons/5/53/Paul_Gauguin_-_Madame_Roulin.jpg"
  },
  {
    title: "Vaas met klaprozen",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Wadsworth Atheneum",
    width: 21.2,
    height: 27,
    image: "https://upload.wikimedia.org/wikipedia/commons/5/58/Van_Gogh_-_Vase_mit_rotem_Klatschmohn.jpeg"
  },
  {
    title: "De oogst",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 50,
    height: 60.7,
    image: "https://upload.wikimedia.org/wikipedia/commons/5/59/Vincent_van_Gogh_-_De_oogst_-_Google_Art_Project.jpg"
  },
  {
    title: "De Moulin de Blute-Fin",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "",
    width: 46.7,
    height: 55.3,
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Van_Gogh_-_Le_Moulin_de_la_Galette4.jpeg"
  },
  {
    title: "Slaapzaal in het hospitaal",
    year: 1889,
    madeIn: "Arles",
    currentLocation: "Oskar Reinhart Collection 'Am Römerholz'",
    width: 54,
    height: 65,
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Ward_in_the_Hospital_in_Arles.jpg"
  },
  {
    title: "Het nachtcafé",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Yale University Art Gallery",
    width: 46.7,
    height: 55.3,
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Vincent_Willem_van_Gogh_076.jpg"
  },
  {
    title: "Kermisklanten",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Musée d'Orsay",
    width: 32.8,
    height: 24,
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Encampment_of_Gypsies_with_Caravans.jpg"
  },
  {
    title: "Populierenlaan",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Museum Boijmans-van Beuningen",
    width: 81.5,
    height: 60.5,
    image: "https://upload.wikimedia.org/wikipedia/commons/6/60/Vincent_van_Gogh_-_Poplars_near_Nuenen_-_Google_Art_Project.jpg"
  },
   {
    title: "Zouaaf, hele figuur, zittend",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Private collection",
    width: null,
    height: null,
    image: "https://upload.wikimedia.org/wikipedia/commons/6/60/Vincent_Willem_van_Gogh_026.jpg"
  },
  {
    title: "Bloeiende amandelboom",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 48.9,
    height: 65.5,
    image: "https://upload.wikimedia.org/wikipedia/commons/6/68/Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg"
  },
  {
    title: "Kop van een prostituee",
    year: 1885,
    madeIn: "Antwerpen",
    currentLocation: "Van Gogh Museum",
    width: 43.2,
    height: 36.2,
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Vincent_van_Gogh_-_Head_of_a_prostitute_-_Google_Art_Project.jpg"
  },
  {
    title: "De slaapkamer",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 43.5,
    height: 36.2,
    image: "https://upload.wikimedia.org/wikipedia/commons/7/76/Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg"
  },
  {
    title: "De Barmhartige Samaritaan (naar Delacroix)",
    year: 1890,
    madeIn: "Saint-Rémy",
    currentLocation: "Kröller-Müller Museum",
    width: 39.5,
    height: 32.5,
    image: "https://upload.wikimedia.org/wikipedia/commons/7/76/Vincent_Willem_van_Gogh_022.jpg"
  },
  {
    title: "De slaapkamer",
    year: 1889,
    madeIn: "Saint-Rémy",
    currentLocation: "Musée d'Orsay",
    width: 34,
    height: 25,
    image: "https://upload.wikimedia.org/wikipedia/commons/7/77/Vincent_van_Gogh_-_Van_Gogh%27s_Bedroom_in_Arles_-_Google_Art_Project.jpg"
  },
  {
    title: "Pietà (naar Delacroix)",
    year: 1889,
    madeIn: "Saint-Rémy",
    currentLocation: "Van Gogh Museum",
    width: 50,
    height: 60,
    image: "https://upload.wikimedia.org/wikipedia/commons/8/82/Vincent_Willem_van_Gogh_083.jpg"
  },
  {
    title: "De houthakker (naar Millet)",
    year: 1890,
    madeIn: "Saint-Rémy",
    currentLocation: "Van Gogh Museum",
    width: 24,
    height: 19,
    image: "https://upload.wikimedia.org/wikipedia/commons/8/87/Van_Gogh_-_Der_Holzhacker_%28nach_Millet%29.jpeg"
  },
  {
    title: "Zomeravond, korenveld met ondergaande zon",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Kunstmuseum Winterthur",
    width: null,
    height: null,
    image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Van_Gogh_-_Weizenfeld_mit_Blick_auf_Arles.jpeg"
  },
  {
    title: "De schapenhoedster (naar Millet)",
    year: 1889,
    madeIn: "Saint-Rémy",
    currentLocation: "Tel Aviv Museum",
    width: 73,
    height: 59.5,
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8c/De_schapenscheerster_%28naar_Millet%29_-_s0042V1962_-_Van_Gogh_Museum.jpg"
  },
  {
    title: "Een groep huizen",
    year: 1890,
    madeIn: "Auvers-sur-Oise",
    currentLocation: "Hermitage",
    width: 24,
    height: 19,
    image: "https://upload.wikimedia.org/wikipedia/commons/9/91/Gogh%2C_Vincent_van_-_Cottages.jpg"
  },
  {
    title: "Marguerite Gachet in de tuin",
    year: 1890,
    madeIn: "Auvers-sur-Oise",
    currentLocation: "Musée d'Orsay",
    width: 73,
    height: 59.5,
    image: "https://upload.wikimedia.org/wikipedia/commons/9/92/Marguerite_Gachet_in_the_garden.jpg"
  },
  {
    title: "Boerderij in een korenveld",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 45,
    height: 54,
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Vincent_van_Gogh_-_Boerderij_in_een_korenveld_-_Google_Art_Project.jpg"
  },
  {
    title: "Nettenboetsters in de duinen",
    year: 1882,
    madeIn: "Den Haag",
    currentLocation: "Private collection",
    width: 46.8,
    height: 51.3,
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Women_Mending_Nets_in_the_Dunes.jpg"
  },
  {
    title: "Vaas met vijftien zonnebloemen",
    year: 1889,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 53.4,
    height: 64,
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Vincent_van_Gogh_-_Sunflowers_-_VGM_F458.jpg"
  },
  {
    title: "Aardappelschillende vrouw, gezien tegen het raam",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Pérez Simón Collection",
    width: 72,
    height: 58,
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Vincent_van_Gogh_-_Peasant_woman_seated_before_an_open_door%2C_peeling_potatoes_%281885%29.jpg"
  },
  {
    title: "De opwekking van Lazarus (naar Rembrandt)",
    year: 1890,
    madeIn: "Saint-Rémy",
    currentLocation: "Van Gogh Museum",
    width: 55,
    height: 45.5,
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Vincent_van_Gogh_-_The_raising_of_Lazarus_%28after_Rembrandt%29_-_Google_Art_Project.jpg"
  },
  {
    title: "De gevangenisbinnenplaats (naar Gustave Doré)",
    year: 1890,
    madeIn: "Saint-Rémy",
    currentLocation: "Pushkin State Museum of Fine Arts",
    width: 55,
    height: 45.5,
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Vincent_Willem_van_Gogh_037.jpg"
  },
   {
    title: "Veld met bloemen bij Arles",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 73,
    height: 46,
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/VanGogh-View_of_Arles_with_Irises.jpg"
  },
  {
    title: "Graspollen",
    year: 1889,
    madeIn: "Arles",
    currentLocation: "Pola Museum of Art",
    width: 60,
    height: 81,
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Vincent_van_Gogh_-_Clumps_of_Grass.jpg"
  },
  {
    title: "Korenveld met bergen op de achtergrond",
    year: 1889,
    madeIn: "Saint-Rémy",
    currentLocation: "Ny Carlsberg Glyptotek",
    width: 72,
    height: 58,
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Vincent_van_Gogh_-_Landscape_from_Saint-R%C3%A9my_-_Google_Art_Project.jpg"
  },
  {
    title: "Boerderij in Loosduinen bij Den Haag",
    year: 1883,
    madeIn: "Den Haag",
    currentLocation: "Centraal Museum",
    width: 73,
    height: 46,
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Van_Gogh_-_Bauernh%C3%A4user_in_Loosduinen_bei_Den_Haag_in_der_Morgend%C3%A4mmerung.jpeg"
  },
  {
    title: "Portret van Gijsbertus de Groot",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Nelson-Atkins Museum of Fine Art",
    width: 72,
    height: 58,
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Portrait_of_Gijsbertus_de_Groot_-_My_Dream.jpg"
  },
  {
    title: "Bloeiende boomgaard",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Van Gogh Museum",
    width: 31.5,
    height: 38.5,
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Vincent_Willem_van_Gogh_077.jpg"
  },
  {
    title: "Vijf zonnebloemen in een vaas",
    year: 1888,
    madeIn: "Arles",
    currentLocation: null,
    width: 45,
    height: 50,
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Vincent_Van_Gogh_-_Three_Sunflowers_F453.jpg"
  },
  {
    title: "De courtisane (naar Eisen)",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Van Gogh Museum",
    width: 51,
    height: 64,
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Courtisane_%28naar_Eisen%29_-_s0116V1962_-_Van_Gogh_Museum.jpg"
  },
  {
    title: "Toeschouwers in de Arena",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Hermitage",
    width: 65,
    height: 81,
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Vincent_Willem_van_Gogh_028.jpg"
  },
  {
    title: "Het oude station in Eindhoven",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Private collection",
    width: 54,
    height: 65,
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b7/The-old-station-at-eindhoven-1885.jpg"
  },
  {
    title: "Dorp bij zonsondergang",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Rijksmuseum",
    width: 73,
    height: 92,
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Boerendorp_in_de_avond_Rijksmuseum_SK-A-3307.jpeg"
  },
  {
    title: "Stadsgezicht in Amsterdam",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "P. and N. de Boer Foundation",
    width: 65,
    height: 81.5,
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Van_Gogh_-_Blick_auf_Amsterdam_vom_Hauptbahnhof.jpeg"
  },
  {
    title: "Kar met zwarte os",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Portland Art Museum",
    width: 51,
    height: 64,
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Vincent_van_Gogh_-_Charrette_de_boeuf.jpg"
  },
  {
    title: "Korenveld met schoven en Arles op de achtergrond",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Musée Rodin",
    width: 64.2,
    height: 53,
    image: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Vincent_van_Gogh_-_Arles._View_from_the_Wheatfields_%281888%29.jpg"
  },
  {
    title: "Bloemen in een blauwe vaas",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Private collection",
    width: 36.5,
    height: 44,
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Van_gogh_flowers_in_a_blue_vase_jh_add20.jpg"
  },
    {
    title: "Ophaalbrug met dame met parasol",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Wallraf-Richartz-Museum",
    width: 33.5,
    height: 41.5,
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Vincent_Van_Gogh_0014.jpg"
  },
  {
    title: "Een buitenwijk van Parijs",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Private collection",
    width: 65,
    height: 54,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Van_Gogh_-_Stra%C3%9Fe_am_Stadtrand_von_Paris_mit_M%C3%A4nnlicher_Figur_mit_Spaten.jpeg"
  },
  {
    title: "Een meisje op straat, twee rijtuigen op de achtergrond",
    year: 1882,
    madeIn: "Den Haag",
    currentLocation: "Villa Flora",
    width: 64.2,
    height: 80.3,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Girl_in_the_Street%2C_Two_Coaches_in_the_Background%2C_A.jpg"
  },
  {
    title: "Cows",
    year: 1890,
    madeIn: "Auvers-sur-Oise",
    currentLocation: "Palais des Beaux-Arts de Lille",
    width: 55,
    height: 65,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Lille_Pdba_van_gogh_vaches.jpg"
  },
  {
    title: "Boerenhuizen tussen de bomen",
    year: 1883,
    madeIn: "Drenthe",
    currentLocation: "Museum of John Paul II and Primate Wyszynski",
    width: 81,
    height: 65,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Farmhouses_Among_Trees.jpg"
  },
  {
    title: "Badinrichting aan de Seine",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Virginia Museum of Fine Arts",
    width: 74,
    height: 60,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Van_Gogh_-_Badeboot_an_der_Seine_bei_Asni%C3%A8res.jpeg"
  },
  {
    title: "Vaas met bloemen",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Private collection",
    width: 60.5,
    height: 73.5,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Van_Gogh_-_Vase_mit_Pechnelken.jpeg"
  },
  {
    title: "Roze rozen",
    year: 1890,
    madeIn: "Auvers-sur-Oise",
    currentLocation: "Ny Carlsberg Glyptotek",
    width: 74,
    height: 60,
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Roses_-_Vincent_van_Gogh.JPG"
  },
  {
    title: "Straatscène op Montmartre",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Private collection",
    width: 92,
    height: 73,
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Vincent_Willem_van_Gogh_133.jpg"
  },
  {
    title: "Laan met platanen",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Musée Rodin",
    width: 73,
    height: 92,
    image: "https://uploads0.wikiart.org/images/vincent-van-gogh/avenue-of-plane-trees-near-arles-station-1888(1).jpg!Large.jpg"
  },
  {
    title: "Portret van Alexander Reid in fauteuil gezeten",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "http://www.ou.edu/fjjma",
    width: 81.3,
    height: 65.4,
    image: "https://uploads0.wikiart.org/images/vincent-van-gogh/portrait-of-the-art-dealer-alexander-reid-sitting-in-an-easy-chair.jpg!Large.jpg"
  },
  {
    title: "Boerenhuis met thuiskomende man",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Soumaya Museum",
    width: 73.3,
    height: 60.3,
    image: "https://uploads1.wikiart.org/images/vincent-van-gogh/cottage-with-peasant-coming-home-1885(1).jpg!Large.jpg"
  },
  {
    title: "Geranium in een pot",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Private collection",
    width: 65,
    height: 54,
    image: "https://uploads1.wikiart.org/images/vincent-van-gogh/geranium-in-a-flowerpot-1886(1).jpg!Large.jpg"
  },
  {
    title: "Landschap met zonsondergang",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Museo Thyssen-Bornemisza",
    width: 64.1,
    height: 47.9,
    image: "https://uploads1.wikiart.org/images/vincent-van-gogh/landscape-at-dusk-1885.jpg!Large.jpg"
  },
  {
    title: "Stukje bosgrond met bloemen in de lente",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Collection Tan Sri Lim Kok Thay",
    width: 64.4,
    height: 55.2,
    image: "https://uploads1.wikiart.org/images/vincent-van-gogh/park-at-asnieres-in-spring-1887.jpg!Large.jpg"
  },
  {
    title: "Drie bokkingen en een knoflookbolletje",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Artizon Museum",
    width: 71,
    height: 95,
    image: "https://uploads1.wikiart.org/images/vincent-van-gogh/still-life-with-bloaters-and-garlic-1887.jpg!Large.jpg"
  },
  {
    title: "Straatje in Saintes-Maries-de-la-Mer",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Nancy Lee and Perry R. Bass",
    width: 64.4,
    height: 55.2,
    image: "https://uploads1.wikiart.org/images/vincent-van-gogh/street-in-saintes-maries-1888-2.jpg!Large.jpg"
  },
  {
    title: "De Seine met de Pont de Clichy",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Private collection",
    width: 65,
    height: 54,
    image: "https://uploads1.wikiart.org/images/vincent-van-gogh/the-seine-with-the-pont-de-clichy-1887-1.jpg!Large.jpg"
  },
  {
    title: "Wever",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Neue Pinakothek",
    width: 54,
    height: 65,
    image: "https://uploads1.wikiart.org/images/vincent-van-gogh/weaver-near-an-open-window-1884.jpg!Large.jpg"
  },
  {
    title: "Dame in het gras zittend",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Private collection",
    width: 35.2,
    height: 24.6,
    image: "https://uploads1.wikiart.org/images/vincent-van-gogh/woman-sitting-in-the-grass-1887.jpg!Large.jpg"
  },
  {
    title: "Herfstlandschap bij avond",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Centraal Museum",
    width: 35,
    height: 23.9,
    image: "https://uploads2.wikiart.org/images/vincent-van-gogh/autumn-landscape-at-dusk-1885(1).jpg!Large.jpg"
  },
  {
    title: "Stilleven met stokrozen",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Kunsthaus Zurich",
    width: 64.1,
    height: 54.6,
    image: "https://uploads2.wikiart.org/images/vincent-van-gogh/vase-of-hollyhocks-1886.jpg!Large.jpg"
  },
  {
    title: "Veld met gele bloemen",
    year: 1889,
    madeIn: "Arles",
    currentLocation: "Kunstmuseum Winterthur",
    width: 34.3,
    height: 23.5,
    image: "https://uploads3.wikiart.org/images/vincent-van-gogh/a-field-of-yellow-flowers-1889(1).jpg!Large.jpg"
  },
  {
    title: "Landschap met zonsondergang",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Collection R. Graber",
    width: 64.1,
    height: 54.6,
    image: "https://uploads3.wikiart.org/images/vincent-van-gogh/landscape-at-sunset-1885.jpg!Large.jpg"
  },
  {
    title: "Vrouw met kind op haar schoot",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Collection Barbra Streisand",
    width: 69,
    height: 56,
    image: "https://uploads3.wikiart.org/images/vincent-van-gogh/peasant-woman-with-a-child-in-her-lap-1885.jpg!Large.jpg"
  },
  {
    title: "Stilleven met kruiken",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Österreichische Galerie Belvedere",
    width: 45,
    height: 51,
    image: "https://uploads3.wikiart.org/images/vincent-van-gogh/still-life-with-five-bottles-1884.jpg!Large.jpg"
  },
  {
    title: "Jongen met uniformpet",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Museu de Arte de Sao Paulo",
    width: 45,
    height: 50,
    image: "https://uploads3.wikiart.org/images/vincent-van-gogh/the-schoolboy-camille-roulin-1888.jpg!Large.jpg"
  },
  {
    title: "De Seine met een roeibootje",
    year: 1887,
    madeIn: "Parijs",
    currentLocation: "Private collection",
    width: 48,
    height: 44,
    image: "https://uploads3.wikiart.org/images/vincent-van-gogh/the-seine-with-a-rowing-boat-1887.jpg!Large.jpg"
  },
  {
    title: "De tuin van de dichter",
    year: 1888,
    madeIn: "Arles",
    currentLocation: "Private collection",
    width: 55,
    height: 45,
    image: "https://uploads4.wikiart.org/images/vincent-van-gogh/public-garden-with-couple-and-blue-fir-tree-the-poet-s-garden-iii-1888.jpg!Large.jpg"
  },
  {
    title: "Mand met aardappels",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Van Gogh Museum",
    width: 48,
    height: 44,
    image: "https://uploads5.wikiart.org/images/vincent-van-gogh/basket-of-potatoes-1885(1).jpg!Large.jpg"
  },
  {
    title: "Boerenhuis en vrouw met geit",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Stadelsches Kunstinstitut und Stadrische Galerie",
    width: 55.1,
    height: 66.2,
    image: "https://uploads5.wikiart.org/images/vincent-van-gogh/cottage-and-woman-with-goat-1885(1).jpg!Large.jpg"
  },
  {
    title: "Boerenhuis, onder bomen met vrouw",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Private collection",
    width: 73.5,
    height: 93,
    image: "https://uploads5.wikiart.org/images/vincent-van-gogh/cottage-with-trees-and-peasant-woman-1885(1).jpg!Large.jpg"
  },
  {
    title: "Kop van een man",
    year: 1885,
    madeIn: "Nuenen",
    currentLocation: "Musées Royaux des Beaux-Arts de Belgique",
    width: 32,
    height: 40,
    image: "https://uploads5.wikiart.org/images/vincent-van-gogh/head-of-a-young-peasant-in-a-peaked-cap-1885.jpg!Large.jpg"
  },
  {
    title: "Schaapherder met kudde",
    year: 1884,
    madeIn: "Nuenen",
    currentLocation: "Soumaya Museum",
    width: 59.5,
    height: 99.5,
    image: "https://uploads5.wikiart.org/images/vincent-van-gogh/shepherd-with-a-flock-of-sheep-1884.jpg!Large.jpg"
  },
  {
    title: "Scabiosa en ranunculus",
    year: 1886,
    madeIn: "Parijs",
    currentLocation: "Private collection",
    width: 92.4,
    height: 71.1,
    image: "https://uploads5.wikiart.org/images/vincent-van-gogh/still-life-with-scabiosa-and-ranunculus-1886.jpg!Large.jpg"
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

// Bereken top 10 musea
const museumCounts = bolletjes.reduce((acc, b) => {
  const museum = b.data.currentLocation;
  acc[museum] = (acc[museum] || 0) + 1;
  return acc;
}, {});


const topMuseums = Object.entries(museumCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10);

console.log("Top 10 musea met meeste Van Gogh-schilderijen:");
topMuseums.forEach(([museum, count], index) => {
  console.log(`${index + 1}. ${museum} - ${count} schilderij(en)`);
});

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
    const view = btn.dataset.view;

    // alle mainBtns resetten
    mainBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // laat sub-buttons van deze groep zien
    document.querySelectorAll(".subBtn").forEach(sb => sb.style.display = "none");
    document.querySelectorAll(`.subBtn[data-group="${btn.dataset.group}"]`).forEach(sb => {
      sb.style.display = "block";
    });

    // active view opslaan
    currentView = view;

    // **Top 10 musea laten zien bij museum**
    if (view === "museum") {
      const museumCounts = bolletjes.reduce((acc, b) => {
        const museum = b.data.currentLocation || "Onbekend";
        acc[museum] = (acc[museum] || 0) + 1;
        return acc;
      }, {});

      const topMuseums = Object.entries(museumCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

      console.log("Top 10 musea met meeste Van Gogh-schilderijen:");
      topMuseums.forEach(([museum, count], index) => {
        console.log(`${index + 1}. ${museum} - ${count} schilderij(en)`);
      });

      // Als je het visueel wilt tonen in de overlay:
      overlay.textContent =
        "Top 10 musea:\n" +
        topMuseums.map(([m,c],i) => `${i+1}. ${m} - ${c} schilderij(en)`).join("\n");
      overlay.style.display = "block";
    }
  });
});



// verhaal vertellen

const storyText = [
  //begin scherm
  "In de sterren zie je de werken van Gogh die verspreid zijn over de wereld en musea.",
  "Daarnaast zie je waar de werken zijn gemaakt tijdens zijn leven.",

  // nu in museum
  "Jo van gogh-bonger verkocht een aantal werken van van Gogh strategisch over verschillende delen van de wereld",
  "om zo de naamsbekendheid van de schilderijen groter te maken.",
  " In haar eigen woorden 'Het is een offer voor Vincents roem'.",

  // gemaakt in
    "Van Gogh was een reizend, lusteloze kunstenaar die erkenning zocht maar niet vond tijdens zijn leven.",
  "Nederland had weinig meer te bieden en hij zocht inspiratie in de natuur van Zuid-Frankrijk en wilde een kunstcollectief creëren. ",
  "Hij had geen plannen om weer terug te keren naar Nederland.",

    // Brieven pagina
    "In de brieven zie je zijn worstelingen met zichzelf en hoe hij zich voelt over zijn vervreemding.",
  "Je ziet bijv. verder stukken waarin hij duidelijk maakt hoe hij geïnspireerd is door de Japanse kunst.",
  "Neem een kijkje door de brieven en kruip in het leven van Gogh.",
    "Deze brieven zijn essentieel geweest voor de branding van het merk van Gogh,",
    "het biedt een inkijkje in het gedachtegang van Gogh en zorgde zo voor het vergroten van de bekendheid en mythevorming wereldwijd.",
     "Dit allemaal verzameld en uitgebracht door Jo van gogh-bonger",
      "en de brieven worden steeds opnieuw onder de aandacht gebracht om van Gogh tot de verbeelding te laten spreken.",
      "Kijk zelf naar de brieven, je kan erop klikken voor meer informatie."
];

let storyIndex = 0;
const overlay = document.getElementById("storyOverlay");
let autoHideTimeout = null;
let autoPlay = true; // fase 1: automatisch afspelen

function showStoryText(index, showOverlay = true) {
  if (index >= storyText.length) {
    overlay.style.display = "none";
    sidebar.classList.add("show"); // sidebar tonen
    resizeCanvas();
    autoPlay = false;
    overlay.addEventListener("click", manualClickHandler);
    return;
  }

  if (showOverlay) {
    overlay.textContent = storyText[index];
    overlay.style.display = "block";
  } else {
    overlay.style.display = "none";
  }

  if (!autoPlay) return; // handmatige modus

  // Hier definieer je speciale pauzes / functies per index
  const specialPauses = {
    // na intro (eerste 2 zinnen) -> tijdlijn cluster
    2: () => {
      overlay.style.display = "none";
      sortByYear(); // laat tijdlijncluster zien
      setTimeout(() => {
        resetBolletjes();
        storyIndex++;
        showStoryText(storyIndex);
      }, 6000); // 3 seconden wachten
    },

    // Nu in museum (index 2,3,4) -> 10 seconden pauze
    5: () => {
      overlay.style.display = "none";
      // bolletjes weer vrij laten bewegen
      letters.forEach(l => {
        l.targetX = LETTER_MARGIN + Math.random() * (cw() - LETTER_MARGIN * 2);
        l.targetY = LETTER_MARGIN + Math.random() * (ch() - LETTER_MARGIN * 2);
        l.lastTargetChange = performance.now();
      });
      bolletjes.forEach(b => b.target = null);
      sortByCurrentLocation();
      setTimeout(() => {
        storyIndex++;
        showStoryText(storyIndex);
      }, 3000); // 10 seconden pauze
    },


    // Gemaakt in (index 7) -> 10 seconden pauze
    8: () => {
      overlay.style.display = "none";
      letters.forEach(l => {
        l.targetX = LETTER_MARGIN + Math.random() * (cw() - LETTER_MARGIN * 2);
        l.targetY = LETTER_MARGIN + Math.random() * (ch() - LETTER_MARGIN * 2);
        l.lastTargetChange = performance.now();
      });
      bolletjes.forEach(b => b.target = null);
      sortByMadeLocation();
      setTimeout(() => {
        storyIndex++;
        showStoryText(storyIndex);
      }, 3000); // 10 seconden pauze
    },

    // Brieven pagina (laat gebruiker zelf klikken)
    16: () => {
      overlay.style.display = "block";
      autoPlay = false; // stop automatische flow
      VanGogh()
      overlay.addEventListener("click", manualClickHandler);
    }
  };

  // Check of we een speciale pauze hebben voor deze index
  if (specialPauses[index]) {
    specialPauses[index]();
  } else {
    // normale flow: 4 seconden per zin
    setTimeout(() => {
      overlay.style.display = "none";
      storyIndex++;
      showStoryText(storyIndex);
    }, 4000);
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

function resetBolletjes() {
  // Overlay verbergen
  overlay.style.display = "none";

  // Bolletjes weer vrij laten bewegen
  bolletjes.forEach(b => {
    b.target = null;

    // random nieuwe home positie
    b.homeX = Math.random() * cw();
    b.homeY = Math.random() * ch();
  });

  // Letters vrij laten bewegen
  if (letters) {
    letters.forEach(l => {
      l.targetX = LETTER_MARGIN + Math.random() * (cw() - LETTER_MARGIN * 2);
      l.targetY = LETTER_MARGIN + Math.random() * (ch() - LETTER_MARGIN * 2);
      l.lastTargetChange = performance.now();
    });
  }
}





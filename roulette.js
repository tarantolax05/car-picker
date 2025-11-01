let cars = [
  { brand: "Renault", logo: "logos/Renault.jpg" },
  { brand: "Opel", logo: "logos/Opel.jpg" },
  { brand: "Volkswagen", logo: "logos/Volkswagen.jpg" },
  { brand: "Fiat", logo: "logos/Fiat.jpg" }
];

let spinning = false;
let rerollUsed = false;
let currentCars = [];

function getTwoDistinctCars() {
  let car1, car2;
  do {
    car1 = cars[Math.floor(Math.random() * cars.length)];
    car2 = cars[Math.floor(Math.random() * cars.length)];
  } while (car1.brand === car2.brand);
  return [car1, car2];
}

function startRoulette() {
  if (spinning) return;
  spinning = true;
  rerollUsed = false;

  const startBtn = document.getElementById("startBtn");
  const rerollBtn = document.getElementById("rerollBtn");
  const buttonsContainer = document.querySelector(".buttons");

  // Nascondi START
  startBtn.style.display = "none";

  // Centra RELOAD e BACK
  buttonsContainer.classList.add("centered");

  // Attiva RELOAD (normale)
  rerollBtn.disabled = false;
  rerollBtn.classList.remove("final-disabled");

  const rouletteLogos = [
    document.getElementById("rouletteLogo1"),
    document.getElementById("rouletteLogo2")
  ];

  rouletteLogos.forEach(r => r.style.animation = "spin 2s ease-out");

  const interval = setInterval(() => {
    const [c1, c2] = getTwoDistinctCars();
    rouletteLogos[0].src = c1.logo;
    rouletteLogos[1].src = c2.logo;
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    rouletteLogos.forEach(r => r.style.animation = "none");

    currentCars = getTwoDistinctCars();
    rouletteLogos[0].src = currentCars[0].logo;
    rouletteLogos[1].src = currentCars[1].logo;

    spinning = false;
  }, 2500);
}

function reroll() {
  if (rerollUsed || spinning) return;
  rerollUsed = true;
  spinning = true;

  const rerollBtn = document.getElementById("rerollBtn");
  rerollBtn.disabled = true;

  const rouletteLogos = [
    document.getElementById("rouletteLogo1"),
    document.getElementById("rouletteLogo2")
  ];

  rouletteLogos.forEach(r => r.style.animation = "spin 1.5s ease-out");

  const interval = setInterval(() => {
    const [c1, c2] = getTwoDistinctCars();
    rouletteLogos[0].src = c1.logo;
    rouletteLogos[1].src = c2.logo;
  }, 100);

  setTimeout(() => {
    clearInterval(interval);
    rouletteLogos.forEach(r => r.style.animation = "none");

    currentCars = getTwoDistinctCars();
    rouletteLogos[0].src = currentCars[0].logo;
    rouletteLogos[1].src = currentCars[1].logo;

    spinning = false;

    // Dopo il reroll torna bordeaux e disattivo
    rerollBtn.classList.add("final-disabled");
    rerollBtn.disabled = true;
  }, 1800);
}

document.addEventListener("DOMContentLoaded", () => {
  const rerollBtn = document.getElementById("rerollBtn");
  rerollBtn.classList.add("final-disabled");
  rerollBtn.disabled = true;

  document.getElementById("startBtn").addEventListener("click", startRoulette);
  document.getElementById("rerollBtn").addEventListener("click", reroll);
});

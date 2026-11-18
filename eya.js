
const opening = document.getElementById("opening");
const message = document.getElementById("message");
const flowers = document.getElementById("flowers");

function showMessage() {
  opening.classList.add("hidden");
  message.classList.remove("hidden");
}

function openGift() {
  const gift = document.querySelector(".gift");

  if (gift.classList.contains("open")) return;

  gift.classList.add("open");

  setTimeout(() => {
    message.classList.add("hidden");
    flowers.classList.remove("hidden");
    startMagic();
  }, 1000);
}

/* FALLING PINK PETALS */

const petalContainer = document.getElementById("petals");

for (let i = 0; i < 35; i++) {
  const petal = document.createElement("span");

  petal.className = "falling-petal";
  petal.style.left = Math.random() * 100 + "%";
  petal.style.animationDuration =
    (6 + Math.random() * 8) + "s";
  petal.style.animationDelay =
    (Math.random() * 8) + "s";
  petal.style.transform =
    `scale(${0.5 + Math.random()})`;

  petalContainer.appendChild(petal);
}

/* GLOWING FIREFLIES */

const canvas = document.getElementById("magic");
const ctx = canvas.getContext("2d");

let fireflies = [];
let animationStarted = false;

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createFireflies() {
  fireflies = [];

  for (let i = 0; i < 65; i++) {
    fireflies.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: 1 + Math.random() * 2.5,
      glow: 8 + Math.random() * 18,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: (Math.random() - 0.5) * 0.6,
      phase: Math.random() * Math.PI * 2
    });
  }
}

function animateFireflies() {
  ctx.clearRect(
    0,
    0,
    window.innerWidth,
    window.innerHeight
  );

  fireflies.forEach(f => {
    f.x += f.speedX;
    f.y += f.speedY;
    f.phase += 0.025;

    if (f.x < 0) f.x = window.innerWidth;
    if (f.x > window.innerWidth) f.x = 0;
    if (f.y < 0) f.y = window.innerHeight;
    if (f.y > window.innerHeight) f.y = 0;

    const opacity =
      0.4 + (Math.sin(f.phase) + 1) * 0.3;

    ctx.beginPath();

    ctx.arc(
      f.x,
      f.y,
      f.radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      `rgba(211, 255, 139, ${opacity})`;

    ctx.shadowBlur = f.glow;
    ctx.shadowColor = "#baff70";
    ctx.fill();
  });

  ctx.shadowBlur = 0;

  requestAnimationFrame(animateFireflies);
}

function startMagic() {
  if (animationStarted) return;

  animationStarted = true;
  createFireflies();
  animateFireflies();
}

/* LETTER */

function openLetter() {
  document
    .getElementById("letter-overlay")
    .classList.remove("hidden");
}

function closeLetter() {
  document
    .getElementById("letter-overlay")
    .classList.add("hidden");
}

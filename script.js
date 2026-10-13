// Change this to the birthday person's passcode (4 digits).
const PASSCODE = "1234";
let entered = "";
const screens = [...document.querySelectorAll(".screen")];
const dots = [...document.querySelectorAll("#pin-dots span")];
const error = document.getElementById("pin-error");

function showScreen(id) {
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  entered = "";
  updateDots();
  error.classList.remove("show");
}
function updateDots() {
  dots.forEach((dot, i) => dot.classList.toggle("filled", i < entered.length));
}
function checkPin() {
  if (entered === PASSCODE) {
    showScreen("intro-screen");
  } else {
    error.classList.add("show");
    showScreen("try-screen");
  }
}
document.getElementById("keypad").addEventListener("click", e => {
  const key = e.target.closest("button")?.dataset.key;
  if (!key) return;
  if (key === "clear") entered = entered.slice(0, -1);
  else if (key === "enter") { checkPin(); return; }
  else if (entered.length < 4) entered += key;
  updateDots();
  if (entered.length === 4) setTimeout(() => {
    if (entered.length === 4) checkPin();
  }, 220);
});
document.querySelectorAll("[data-go]").forEach(btn => btn.addEventListener("click", () => showScreen(btn.dataset.go)));
document.querySelectorAll("[data-gift]").forEach(btn => btn.addEventListener("click", () => {
  const destination = ({wish:"wish-screen",memories:"memories-screen",letter:"letter-screen",photos:"photos-screen"})[btn.dataset.gift];
  showScreen(destination);
}));
document.getElementById("blow-candles").addEventListener("click", () => {
  document.querySelector(".candles").textContent = "✨ 💨 ✨";
  document.getElementById("wish-message").textContent = "Wish sent to the universe! May it come true 💗";
  document.getElementById("blow-candles").textContent = "WISH MADE! ♡";
  setTimeout(() => showScreen("gifts-screen"), 1700);
});
document.getElementById("restart").addEventListener("click", () => showScreen("passcode-screen"));

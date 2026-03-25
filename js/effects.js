let effectRunning = false;

/* =========================
   演出ユーティリティ
========================= */
function waitMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function pulseMapButton() {
  const mapBtn = document.getElementById("mapBtn");
  if (!mapBtn) return;

  mapBtn.animate(
    [
      {
        transform: "scale(1)",
        boxShadow: "0 12px 26px rgba(98, 74, 20, 0.28)"
      },
      {
        transform: "scale(1.12)",
        boxShadow: "0 0 0 12px rgba(255, 205, 70, 0.20), 0 16px 34px rgba(98, 74, 20, 0.34)"
      },
      {
        transform: "scale(1)",
        boxShadow: "0 12px 26px rgba(98, 74, 20, 0.28)"
      }
    ],
    {
      duration: 900,
      easing: "ease-out"
    }
  );
}

function createSparkle(x, y) {
  const fxLayer = document.getElementById("fxLayer");
  if (!fxLayer) return;

  const s = document.createElement("div");
  s.className = "sparkle";
  s.style.left = `${x}px`;
  s.style.top = `${y}px`;
  fxLayer.appendChild(s);

  const dx = (Math.random() - 0.5) * 44;
  const dy = (Math.random() - 0.5) * 44;

  s.animate(
    [
      { transform: "translate(-50%, -50%) scale(0.5)", opacity: 0 },
      { transform: "translate(-50%, -50%) scale(1.2)", opacity: 1, offset: 0.35 },
      { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.2)`, opacity: 0 }
    ],
    {
      duration: 800,
      easing: "ease-out"
    }
  );

  setTimeout(() => s.remove(), 820);
}

/* =========================
   地図のかけら演出
========================= */
async function animateIconToMap(spotId) {
  const fxLayer = document.getElementById("fxLayer");
  const iconSrc = iconMap[spotId];
  const saveBtn = document.getElementById("saveAnswerBtn");
  const mapBtn = document.getElementById("mapBtn");

  if (!fxLayer || !iconSrc || !saveBtn || !mapBtn) return;

  const saveRect = saveBtn.getBoundingClientRect();
  const mapRect = mapBtn.getBoundingClientRect();

  const startX = saveRect.left + saveRect.width / 2;
  const startY = saveRect.top + saveRect.height / 2;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const endX = mapRect.left + mapRect.width / 2;
  const endY = mapRect.top + mapRect.height / 2;

  const icon = document.createElement("img");
  icon.src = iconSrc;
  icon.alt = "";
  icon.className = "flyingIcon";
  icon.style.left = `${startX}px`;
  icon.style.top = `${startY}px`;
  icon.style.transform = "translate(-50%, -50%) scale(1.15)";
  icon.style.opacity = "0";
  fxLayer.appendChild(icon);

  /* Step 1: 中央へ拡大移動 */
  await waitMs(20);
  icon.style.transition = "left 0.65s ease, top 0.65s ease, transform 0.65s ease, opacity 0.2s ease";
  icon.style.left = `${centerX}px`;
  icon.style.top = `${centerY}px`;
  icon.style.transform = "translate(-50%, -50%) scale(4.2)";
  icon.style.opacity = "1";

  const sparkleTimer1 = setInterval(() => {
    createSparkle(centerX + (Math.random() - 0.5) * 70, centerY + (Math.random() - 0.5) * 70);
  }, 120);

  await waitMs(700);

  /* Step 2: 中央で約2秒見せる */
  icon.style.transition = "transform 0.45s ease";
  icon.style.transform = "translate(-50%, -50%) scale(4.5)";

  const sparkleTimer2 = setInterval(() => {
    createSparkle(centerX + (Math.random() - 0.5) * 90, centerY + (Math.random() - 0.5) * 90);
    if (Math.random() > 0.45) {
      createSparkle(centerX + (Math.random() - 0.5) * 90, centerY + (Math.random() - 0.5) * 90);
    }
  }, 140);

  await waitMs(2000);

  clearInterval(sparkleTimer1);
  clearInterval(sparkleTimer2);

  /* Step 3: 右上の地図ボタンへ吸い込み */
  icon.style.transition = "left 0.8s ease-in, top 0.8s ease-in, transform 0.8s ease-in, opacity 0.8s ease-in";
  icon.style.left = `${endX}px`;
  icon.style.top = `${endY}px`;
  icon.style.transform = "translate(-50%, -50%) scale(0.18)";
  icon.style.opacity = "0.18";

  const flySparkleTimer = setInterval(() => {
    const rect = icon.getBoundingClientRect();
    createSparkle(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }, 90);

  await waitMs(820);
  clearInterval(flySparkleTimer);
  icon.remove();

  /* Step 4: ボタンを光らせる */
  pulseMapButton();
}

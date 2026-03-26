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

  mapBtn.classList.remove("mapBtnPulse");
  void mapBtn.offsetWidth;
  mapBtn.classList.add("mapBtnPulse");

  setTimeout(() => {
    mapBtn.classList.remove("mapBtnPulse");
  }, 900);
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

function waitForImageReady(img) {
  if (img.complete && img.naturalWidth > 0) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const onLoad = () => {
      cleanup();
      resolve();
    };

    const onError = () => {
      cleanup();
      reject(new Error("image load failed"));
    };

    const cleanup = () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };

    img.addEventListener("load", onLoad, { once: true });
    img.addEventListener("error", onError, { once: true });
  });
}

function nextFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}

/* =========================
   地図アイコン演出
   mapicon を中央表示してから右上へ吸い込む
========================= */
async function animateIconToMap(spotId) {
  const fxLayer = document.getElementById("fxLayer");
  const iconSrc = iconMap[spotId];
  const mapBtn = document.getElementById("mapBtn");

  if (!fxLayer || !iconSrc || !mapBtn) return;

  const mapRect = mapBtn.getBoundingClientRect();

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const endX = mapRect.left + mapRect.width / 2;
  const endY = mapRect.top + mapRect.height / 2;

  const icon = document.createElement("img");
  icon.src = iconSrc;
  icon.alt = "";
  icon.className = "flyingIcon";
  icon.style.left = `${centerX}px`;
  icon.style.top = `${centerY}px`;
  icon.style.transform = "translate(-50%, -50%) scale(0.9)";
  icon.style.opacity = "0";
  icon.style.transition = "none";
  fxLayer.appendChild(icon);

  try {
    await waitForImageReady(icon);
  } catch (e) {
    icon.remove();
    return;
  }

  await nextFrame();

  /* Step 1: 中央に大きく表示 */
  icon.style.transition =
    "transform 0.4s ease, opacity 0.22s ease";
  icon.style.transform = "translate(-50%, -50%) scale(3)";
  icon.style.opacity = "1";

  const sparkleTimer1 = setInterval(() => {
    createSparkle(centerX + (Math.random() - 0.5) * 70, centerY + (Math.random() - 0.5) * 70);
  }, 120);

  await waitMs(400);

  /* Step 2: 中央で約2秒見せる */
  icon.style.transition = "transform 0.45s ease";
  icon.style.transform = "translate(-50%, -50%) scale(3.15)";

  const sparkleTimer2 = setInterval(() => {
    createSparkle(centerX + (Math.random() - 0.5) * 90, centerY + (Math.random() - 0.5) * 90);
    if (Math.random() > 0.45) {
      createSparkle(centerX + (Math.random() - 0.5) * 90, centerY + (Math.random() - 0.5) * 90);
    }
  }, 140);

  await waitMs(2000);

  clearInterval(sparkleTimer1);
  clearInterval(sparkleTimer2);

  /* Step 3: 右上のヒミツの地図へ吸い込み */
  icon.style.transition =
    "left 1.15s ease-in-out, top 1.15s ease-in-out, transform 1.15s ease-in-out, opacity 1.15s ease-in-out";
  icon.style.left = `${endX}px`;
  icon.style.top = `${endY}px`;
  icon.style.transform = "translate(-50%, -50%) scale(0.18)";
  icon.style.opacity = "0.18";

  const flySparkleTimer = setInterval(() => {
    const rect = icon.getBoundingClientRect();
    createSparkle(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }, 90);

  await waitMs(1170);
  clearInterval(flySparkleTimer);
  icon.remove();

  /* Step 4: 右上ボタンを光らせる */
  pulseMapButton();
}

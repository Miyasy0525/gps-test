let effectRunning = false;

/* =========================
   かけら演出
========================= */
async function animateIconToMap(spotId) {
  const fxLayer = document.getElementById("fxLayer");
  const iconPath = iconMap[spotId];
  const mapBtn = document.getElementById("mapBtn");
  if (!fxLayer || !iconPath || !mapBtn) return;

  const startRect = document.body.getBoundingClientRect();
  const endRect = mapBtn.getBoundingClientRect();

  const flying = document.createElement("img");
  flying.src = iconPath;
  flying.alt = "";
  flying.style.position = "fixed";
  flying.style.left = `${startRect.width / 2 - 40}px`;
  flying.style.top = `${startRect.height / 2 - 40}px`;
  flying.style.width = "80px";
  flying.style.height = "80px";
  flying.style.objectFit = "contain";
  flying.style.zIndex = "1300";
  flying.style.transition = "transform 0.75s ease, opacity 0.75s ease";
  fxLayer.appendChild(flying);

  await waitMs(30);

  const dx = endRect.left + endRect.width / 2 - (startRect.width / 2);
  const dy = endRect.top + endRect.height / 2 - (startRect.height / 2);

  flying.style.transform = `translate(${dx}px, ${dy}px) scale(0.18)`;
  flying.style.opacity = "0.2";

  await waitMs(800);
  flying.remove();
}

function waitMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
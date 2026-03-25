let answers = JSON.parse(localStorage.getItem("answers") || "{}");
let unlocked = JSON.parse(localStorage.getItem("unlocked") || "{}");
let collectedPieces = JSON.parse(localStorage.getItem("collectedPieces") || "{}");
let sessionId = localStorage.getItem("sessionId") || "";
let userProfile = JSON.parse(localStorage.getItem("userProfile") || "null");

let currentSpot = null;
let currentScreen = "title";
let deviceAccessAllowed = false;

/* =========================
   端末制限
========================= */
function isSmartphoneDevice() {
  const ua = navigator.userAgent || "";
  const maxTouchPoints = navigator.maxTouchPoints || 0;
  const shortestSide = Math.min(window.screen.width || 0, window.screen.height || 0);
  const isIPhone = /iPhone/i.test(ua);
  const isIPod = /iPod/i.test(ua);
  const isAndroidMobile = /Android/i.test(ua) && /Mobile/i.test(ua);
  const isWindowsPhone = /Windows Phone/i.test(ua);
  const isTablet =
    /iPad/i.test(ua) ||
    /Tablet/i.test(ua) ||
    (/Android/i.test(ua) && !/Mobile/i.test(ua)) ||
    (/Macintosh/i.test(ua) && maxTouchPoints > 1);
  const isPhoneByTouchSize = maxTouchPoints > 0 && shortestSide > 0 && shortestSide <= 430;

  if (isTablet) return false;
  if (isIPhone || isIPod || isAndroidMobile || isWindowsPhone) return true;
  if (isPhoneByTouchSize && !/Windows NT|Macintosh|CrOS|Linux x86_64/i.test(ua)) return true;
  return false;
}

function applyDeviceGate() {
  const gateScreen = document.getElementById("deviceGateScreen");

  deviceAccessAllowed = isSmartphoneDevice();

  if (!deviceAccessAllowed) {
    document.body.classList.add("device-blocked");
    if (gateScreen) gateScreen.classList.remove("hidden");
    hideAllAppScreens();
    hideAllFloatingUI();

    if (typeof stopWatchingLocation === "function") {
      stopWatchingLocation();
    }
    return false;
  }

  document.body.classList.remove("device-blocked");
  if (gateScreen) gateScreen.classList.add("hidden");
  return true;
}

/* =========================
   初期化
========================= */
document.addEventListener("DOMContentLoaded", () => {
  if (!applyDeviceGate()) return;

  restoreProfileForm();
  updateStartButtonState();
  if (typeof updateMapCollectionUI === "function") updateMapCollectionUI();
  if (typeof renderUnlockedList === "function") renderUnlockedList();
  setupAdminHotspot();
  routeOnLoad();
});

window.addEventListener("resize", () => {
  const wasAllowed = deviceAccessAllowed;
  const allowed = applyDeviceGate();

  if (!allowed) return;

  if (wasAllowed && typeof invalidateMapSize === "function") {
    invalidateMapSize(120);
  }
});

window.addEventListener("orientationchange", () => {
  const wasAllowed = deviceAccessAllowed;
  const allowed = applyDeviceGate();

  if (!allowed) return;

  if (wasAllowed && typeof invalidateMapSize === "function") {
    invalidateMapSize(180);
  }
});

/* =========================
   画面制御
========================= */
function hideAllAppScreens() {
  const ids = ["titleScreen", "startScreen", "appScreen"];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
}

function hideAllFloatingUI() {
  const mapBtn = document.getElementById("mapBtn");
  const tutorialBackdrop = document.getElementById("tutorialBackdrop");
  const tutorialModal = document.getElementById("tutorialModal");
  const mapSheetBackdrop = document.getElementById("mapSheetBackdrop");
  const mapSheet = document.getElementById("mapSheet");
  const sheetBackdrop = document.getElementById("sheetBackdrop");
  const sheet = document.getElementById("sheet");
  const pinBackdrop = document.getElementById("pinBackdrop");
  const pinModal = document.getElementById("pinModal");
  const fxLayer = document.getElementById("fxLayer");

  if (mapBtn) mapBtn.classList.add("hidden");
  if (tutorialBackdrop) tutorialBackdrop.style.display = "none";
  if (tutorialModal) tutorialModal.style.display = "none";
  if (mapSheetBackdrop) mapSheetBackdrop.style.display = "none";
  if (mapSheet) mapSheet.style.display = "none";
  if (sheetBackdrop) sheetBackdrop.style.display = "none";
  if (sheet) sheet.style.display = "none";
  if (pinBackdrop) pinBackdrop.classList.add("hidden");
  if (pinModal) pinModal.classList.add("hidden");
  if (fxLayer) fxLayer.innerHTML = "";
}

function setActiveScreen(screenName) {
  hideAllAppScreens();

  const titleScreen = document.getElementById("titleScreen");
  const startScreen = document.getElementById("startScreen");
  const appScreen = document.getElementById("appScreen");
  const mapBtn = document.getElementById("mapBtn");

  if (screenName === "title" && titleScreen) {
    titleScreen.classList.remove("hidden");
    if (mapBtn) mapBtn.classList.add("hidden");
  }

  if (screenName === "start" && startScreen) {
    startScreen.classList.remove("hidden");
    if (mapBtn) mapBtn.classList.add("hidden");
  }

  if (screenName === "app" && appScreen) {
    appScreen.classList.remove("hidden");
    if (mapBtn) mapBtn.classList.remove("hidden");
  }

  currentScreen = screenName;
}

function routeOnLoad() {
  const hasSavedSession = !!(userProfile && sessionId);

  if (hasSavedSession) {
    resumeExperience(true);
    return;
  }

  setActiveScreen("title");
}

/* =========================
   画面遷移
========================= */
function goToProfileScreen() {
  if (!deviceAccessAllowed) return;

  if (userProfile && sessionId) {
    resumeExperience(false);
    return;
  }

  setActiveScreen("start");
  restoreProfileForm();
  updateStartButtonState();
}

function resumeExperience(skipIntro) {
  if (!deviceAccessAllowed) return;

  setActiveScreen("app");
  if (typeof updateMapCollectionUI === "function") updateMapCollectionUI();
  if (typeof renderUnlockedList === "function") renderUnlockedList();

  if (typeof initMap === "function") {
    initMap();
  }

  if (!skipIntro) {
    // 再訪時はチュートリアルを出さない方針
  }
}

function restoreProfileForm() {
  if (!userProfile) return;

  const genderSelect = document.getElementById("genderSelect");
  const ageSelect = document.getElementById("ageSelect");
  const regionSelect = document.getElementById("regionSelect");
  const companionSelect = document.getElementById("companionSelect");

  if (genderSelect) genderSelect.value = userProfile.gender || "";
  if (ageSelect) ageSelect.value = userProfile.age || "";
  if (regionSelect) regionSelect.value = userProfile.region || "";
  if (companionSelect) companionSelect.value = userProfile.companion || "";
}

function showTitleScreen() {
  if (!deviceAccessAllowed) {
    applyDeviceGate();
    return;
  }
  setActiveScreen("title");
}

/* =========================
   管理用ホットスポット
========================= */
let hotspotTimer = null;

function setupAdminHotspot() {
  const hotspot = document.getElementById("adminHotspot");
  if (!hotspot) return;

  const startHold = (e) => {
    e.preventDefault();
    clearTimeout(hotspotTimer);
    hotspotTimer = setTimeout(() => {
      openPinModal();
    }, HOTSPOT_HOLD_MS);
  };

  const cancelHold = () => {
    clearTimeout(hotspotTimer);
  };

  hotspot.addEventListener("mousedown", startHold);
  hotspot.addEventListener("touchstart", startHold, { passive: false });

  hotspot.addEventListener("mouseup", cancelHold);
  hotspot.addEventListener("mouseleave", cancelHold);
  hotspot.addEventListener("touchend", cancelHold);
  hotspot.addEventListener("touchcancel", cancelHold);
}

function openPinModal() {
  const pinBackdrop = document.getElementById("pinBackdrop");
  const pinModal = document.getElementById("pinModal");
  const pinInput = document.getElementById("pinInput");
  const pinError = document.getElementById("pinError");

  pinError.textContent = "";
  pinInput.value = "";

  pinBackdrop.classList.remove("hidden");
  pinModal.classList.remove("hidden");

  setTimeout(() => pinInput.focus(), 30);
}

function closePinModal() {
  document.getElementById("pinBackdrop").classList.add("hidden");
  document.getElementById("pinModal").classList.add("hidden");
  document.getElementById("pinError").textContent = "";
}

function submitAdminPin() {
  const pinInput = document.getElementById("pinInput");
  const pinError = document.getElementById("pinError");
  const value = pinInput.value.trim();

  if (value === ADMIN_PIN) {
    closePinModal();
    goToProfileScreen();
  } else {
    pinError.textContent = "暗証番号が違います。";
    pinInput.focus();
    pinInput.select();
  }
}

/* =========================
   開始画面
========================= */
function updateStartButtonState() {
  const gender = document.getElementById("genderSelect").value.trim();
  const age = document.getElementById("ageSelect").value.trim();
  const region = document.getElementById("regionSelect").value.trim();
  const companion = document.getElementById("companionSelect").value.trim();

  const ok = gender !== "" && age !== "" && region !== "" && companion !== "";
  document.getElementById("startBtn").disabled = !ok;
}

async function startExperience() {
  if (!deviceAccessAllowed) return;

  const gender = document.getElementById("genderSelect").value.trim();
  const age = document.getElementById("ageSelect").value.trim();
  const region = document.getElementById("regionSelect").value.trim();
  const companion = document.getElementById("companionSelect").value.trim();

  if (!gender || !age || !region || !companion) return;

  userProfile = { gender, age, region, companion };
  localStorage.setItem("userProfile", JSON.stringify(userProfile));

  if (!sessionId) {
    sessionId = createSessionId();
    localStorage.setItem("sessionId", sessionId);
  }

  sendSessionToSheet();

  setActiveScreen("app");
  if (typeof initMap === "function") initMap();
  if (typeof updateMapCollectionUI === "function") updateMapCollectionUI();
  if (typeof renderUnlockedList === "function") renderUnlockedList();
  if (typeof openTutorial === "function") openTutorial();
}

function createSessionId() {
  return "session_" + Date.now() + "_" + Math.random().toString(36).slice(2, 10);
}

/* =========================
   Google Sheets送信
========================= */
function sendSessionToSheet() {
  if (!API_URL || !sessionId || !userProfile) return;

  fetch(API_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type: "session",
      session_id: sessionId,
      gender: userProfile.gender,
      age: userProfile.age,
      region: userProfile.region,
      companion: userProfile.companion
    })
  }).catch(() => {});
}

function sendAnswerToSheet(spotId, answerText) {
  if (!API_URL || !sessionId) return;

  fetch(API_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type: "answer",
      session_id: sessionId,
      spot_id: spotId,
      answer: answerText
    })
  }).catch(() => {});
}
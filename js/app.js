const API_URL = "https://script.google.com/macros/s/AKfycbx3AGuRyNJe0mDxP5jb-JkkjE1npzYkRYSD2eHZlqceMaR2pvQiESmnxfUGV9kVyBBH/exec";

const OLD_URL = "https://miyasy0525.github.io/gps-test/images/old.jpg?v=6";
const NEW_URL = "https://miyasy0525.github.io/gps-test/images/new.jpg?v=6";

const DRINK_WATER_URL = NEW_URL;
const SEAL_LINK = "";

/* =========================
   MapTiler
========================= */
const MAPTILER_KEY = "6bM0wJwEREYxPUpDEK46";
const MAPTILER_STYLE_ID = "jp-mierune-streets";
const MAPTILER_TILE_URL = `https://api.maptiler.com/maps/${MAPTILER_STYLE_ID}/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`;

/* =========================
   GPS安定判定設定
========================= */
const GPS_SETTINGS = {
  requiredAccuracy: 35,
  stableDistance: 25,
  requiredStableCount: 2,
  watchTimeout: 15000,
  maximumAge: 0,
  defaultZoom: 17,
  stableZoom: 17
};

/* =========================
   管理用PIN
========================= */
const ADMIN_PIN = "2525";
const HOTSPOT_HOLD_MS = 5000;

/* =========================
   竜画像対応
   PNG 前提
========================= */
const dragonImageMap = {
  spot01: {
    locked: "images/1-A.png",
    unlocked: "images/1-B.png"
  }
};

const pieceMap = {
  spot01: 1,
  spot02: 2,
  spot03: 3,
  spot04: 4,
  spot05: 5,
  spot06: 6,
  spot07: 7,
  spot08: 8
};

const iconMap = {
  spot01: "map/mapicon1.png",
  spot02: "map/mapicon2.png",
  spot03: "map/mapicon3.png",
  spot04: "map/mapicon4.png",
  spot05: "map/mapicon5.png",
  spot06: "map/mapicon6.png",
  spot07: "map/mapicon7.png",
  spot08: "map/mapicon8.png"
};

const spots = [
  {
    spot_id: "spot01",
    spot_name: "第1問　富士山の水",
    latitude: 35.506855,
    longitude: 138.744967,
    radius_m: 100,
    mediaMode: "single",
    images: { single: DRINK_WATER_URL },
    content: {
      description: "この場所では、富士山から流れてきた湧き水を飲むことができます。",
      question: "この水は、どれくらいの時間をかけてここに湧き出しているでしょうか？",
      hint: "ヒント：オリンピックが6回くらい開催される時間がかかります。",
      tip: "",
      choices: [
        { value: "A", label: "10年～20年" },
        { value: "B", label: "20年～30年" },
        { value: "C", label: "30年～50年" }
      ],
      correctValue: "B"
    }
  },
  {
    spot_id: "spot02",
    spot_name: "第2問　富士講",
    latitude: 35.50693,
    longitude: 138.74504,
    radius_m: 100,
    mediaMode: "single",
    images: { single: NEW_URL },
    content: {
      description: "富士山を対象にした信仰について考えてみましょう。",
      question: "富士山を対象にし、江戸時代に流行した信仰とその開祖で正しい組み合わせは？",
      hint: "ヒント：講とは現代のサークルやクラブのような意味です。",
      tip: "",
      choices: [
        { value: "A", label: "神道と神武天皇" },
        { value: "B", label: "修験道と役小角" },
        { value: "C", label: "富士講と長谷川角行" }
      ],
      correctValue: "C"
    }
  },
  {
    spot_id: "spot03",
    spot_name: "第3問　誰が整備した？",
    latitude: 35.50701,
    longitude: 138.74512,
    radius_m: 100,
    mediaMode: "single",
    images: { single: NEW_URL },
    content: {
      description: "東圓寺を中心として、忍野八海の整備に関わった人物と講中について考えましょう。",
      question: "（a）は、東圓寺を中心として（b）を立ち上げ、忍野八海を整備しました。",
      hint: "ヒント：ドラえもんに発音が似てるよ。",
      tip: "",
      choices: [
        { value: "A", label: "（a）大寄友右衛門　（b）大我講" },
        { value: "B", label: "（a）大塩平八郎　（b）丸吉講" },
        { value: "C", label: "（a）伊能忠敬　（b）町火消" }
      ],
      correctValue: "A"
    }
  },
  {
    spot_id: "spot04",
    spot_name: "第4問　なぜ整備された？",
    latitude: 35.50709,
    longitude: 138.7452,
    radius_m: 100,
    mediaMode: "single",
    images: { single: NEW_URL },
    content: {
      description: "村の人々が困っていた時代を想像しながら考えてみましょう。",
      question: "忍野八海は、（a）で困窮した忍草村を（b）するために整備された。",
      hint: "",
      tip: "動画の中にヒントがあります。",
      choices: [
        { value: "A", label: "（a）享保の飢饉　（b）維持・管理" },
        { value: "B", label: "（a）天明の飢饉　（b）縮小・整理" },
        { value: "C", label: "（a）天保の飢饉　（b）復興・救済" }
      ],
      correctValue: "C"
    }
  },
  {
    spot_id: "spot05",
    spot_name: "第5問　誰が管理した？",
    latitude: 35.50717,
    longitude: 138.74528,
    radius_m: 100,
    mediaMode: "single",
    images: { single: NEW_URL },
    content: {
      description: "富士講と忍野八海の違いを考えてみましょう。",
      question: "大我講は（a）ではなく、（b）に管理されていました。",
      hint: "ヒント：たまにお香の香りがします。",
      tip: "",
      choices: [
        { value: "A", label: "（a）神社　（b）上野寛永寺" },
        { value: "B", label: "（a）幕府　（b）伊勢神宮" },
        { value: "C", label: "（a）藩　（b）奉行所" }
      ],
      correctValue: "A"
    }
  },
  {
    spot_id: "spot06",
    spot_name: "第6問　星と池",
    latitude: 35.50725,
    longitude: 138.74536,
    radius_m: 100,
    mediaMode: "single",
    images: { single: NEW_URL },
    content: {
      description: "忍野八海は、星の並びになぞらえて造られたともいわれています。",
      question: "忍野八海はある星座に基づいて造られています。ひしゃくの形の星座と、夜空でほとんど動かない明るい星の組み合わせとして正しいものはどれでしょうか？",
      hint: "",
      tip: "チップス：実験用の純粋な水としてNASAが宇宙に持って行ったことも！",
      choices: [
        { value: "A", label: "北斗七星と北極星" },
        { value: "B", label: "オリオン座とシリウス" },
        { value: "C", label: "カシオペア座と北極星" }
      ],
      correctValue: "A"
    }
  },
  {
    spot_id: "spot07",
    spot_name: "第7問　村おこしのしくみ",
    latitude: 35.50733,
    longitude: 138.74544,
    radius_m: 100,
    mediaMode: "single",
    images: { single: NEW_URL },
    content: {
      description: "昔の取り組みが、今の観光につながっていることを考えてみましょう。",
      question: "忍草村にある、水が湧き出す池を（a）、現代の（b）の仕組みを作り、（c）を目指す村おこし事業だった。",
      hint: "ヒント：今、あなたの周りにどんな人がたくさんいるか考えてみましょう。",
      tip: "",
      choices: [
        { value: "A", label: "（a）選んで　（b）投資　（c）移住と拡大" },
        { value: "B", label: "（a）埋め立て　（b）M＆A　（c）人口増と景観保全" },
        { value: "C", label: "（a）繋げて　（b）クラウドファンディング　（c）観光誘致と地域の向上" }
      ],
      correctValue: "C"
    }
  },
  {
    spot_id: "spot08",
    spot_name: "第8問　石碑のことば",
    latitude: 35.50741,
    longitude: 138.74552,
    radius_m: 100,
    mediaMode: "single",
    images: { single: NEW_URL },
    content: {
      description: "あなたの近くにある石碑を見つけてください。",
      question: "この石碑は、（A）という意味を伝えていて、このような石碑は忍野八海に（B）あります。",
      hint: "ヒント：昔の人は「ふ」と書いて「う」と読みました。",
      tip: "",
      choices: [
        { value: "A", label: "（A）昔から変わらない水の尊さ　（B）8" },
        { value: "B", label: "（A）風と音の美しさ　（B）6" },
        { value: "C", label: "（A）川の流れの速さ　（B）9" }
      ],
      correctValue: "A"
    }
  }
];

let answers = JSON.parse(localStorage.getItem("answers") || "{}");
let unlocked = JSON.parse(localStorage.getItem("unlocked") || "{}");
let collectedPieces = JSON.parse(localStorage.getItem("collectedPieces") || "{}");
let sessionId = localStorage.getItem("sessionId") || "";
let userProfile = JSON.parse(localStorage.getItem("userProfile") || "null");

let currentSpot = null;
let currentScreen = "title";
const markers = {};
let userMarker = null;
let userCircle = null;
let watchId = null;
let lastLat = null;
let lastLon = null;
let map = null;
let effectRunning = false;
let tutorialIndex = 0;
const TUTORIAL_TOTAL = 4;

/* GPS安定判定用 */
let stableCount = 0;
let stableReference = null;
let gpsLocked = false;
let hasCenteredOnStableLocation = false;
let latestAccuracy = null;

/* 管理ホットスポット */
let hotspotTimer = null;

/* =========================
   端末制限
========================= */
let deviceAccessAllowed = false;

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
    if (watchId !== null && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
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
  updateMapCollectionUI();
  renderUnlockedList();
  setupAdminHotspot();
  routeOnLoad();
});

window.addEventListener("resize", () => {
  const wasAllowed = deviceAccessAllowed;
  const allowed = applyDeviceGate();

  if (!allowed) return;

  if (wasAllowed && map) {
    setTimeout(() => {
      map.invalidateSize();
    }, 120);
  }
});

window.addEventListener("orientationchange", () => {
  const wasAllowed = deviceAccessAllowed;
  const allowed = applyDeviceGate();

  if (!allowed) return;

  if (wasAllowed && map) {
    setTimeout(() => {
      map.invalidateSize();
    }, 180);
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
  updateMapCollectionUI();
  renderUnlockedList();

  if (!map) {
    initMap();
  } else {
    setTimeout(() => {
      map.invalidateSize();
    }, 80);
  }

  if (!skipIntro) {
    // ここではチュートリアルは出さない方針
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
  initMap();
  updateMapCollectionUI();
  renderUnlockedList();
  openTutorial();
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

/* =========================
   地図初期化
========================= */
function initMap() {
  if (map) {
    setTimeout(() => {
      map.invalidateSize();
    }, 120);
    return;
  }

  map = L.map("map", {
    zoomControl: true,
    attributionControl: true
  }).setView([35.50712, 138.74522], GPS_SETTINGS.defaultZoom);

  L.tileLayer(MAPTILER_TILE_URL, {
    tileSize: 256,
    zoomOffset: 0,
    maxZoom: 20,
    attribution: "&copy; MapTiler &copy; OpenStreetMap contributors"
  }).addTo(map);

  spots.forEach((spot) => {
    const marker = createSpotMarker(spot, false, isSpotAnsweredCorrectly(spot.spot_id));
    marker.addTo(map);

    marker.on("click", () => {
      if (!unlocked[spot.spot_id]) return;
      openSpotSheet(spot);
    });

    markers[spot.spot_id] = marker;
  });

  setTimeout(() => {
    map.invalidateSize();
  }, 150);

  startWatchingLocation();
}

function createSpotMarker(spot, isUnlocked, isCorrect) {
  const color = isCorrect ? "#31b36b" : isUnlocked ? "#3892ff" : "#9aa4af";
  const markerHtml = `
    <div style="
      width: 22px;
      height: 22px;
      border-radius: 999px;
      background:${color};
      border:3px solid #fff;
      box-shadow:0 4px 12px rgba(0,0,0,0.25);
    "></div>
  `;

  const icon = L.divIcon({
    className: "",
    html: markerHtml,
    iconSize: [22, 22],
    iconAnchor: [11, 11]
  });

  return L.marker([spot.latitude, spot.longitude], { icon });
}

function updateMarker(spot) {
  const marker = markers[spot.spot_id];
  if (!marker) return;

  const updated = createSpotMarker(
    spot,
    !!unlocked[spot.spot_id],
    isSpotAnsweredCorrectly(spot.spot_id)
  );

  marker.setIcon(updated.options.icon);
}

function isSpotAnsweredCorrectly(spotId) {
  return !!(answers[spotId] && answers[spotId].isCorrect);
}

/* =========================
   GPS監視
========================= */
function startWatchingLocation() {
  if (!navigator.geolocation) return;
  if (watchId !== null) return;

  watchId = navigator.geolocation.watchPosition(
    onLocationUpdate,
    onLocationError,
    {
      enableHighAccuracy: true,
      timeout: GPS_SETTINGS.watchTimeout,
      maximumAge: GPS_SETTINGS.maximumAge
    }
  );
}

function onLocationUpdate(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const accuracy = position.coords.accuracy;
  latestAccuracy = accuracy;

  if (!userMarker) {
    const userIcon = L.divIcon({
      className: "",
      html: `
        <div style="
          width:18px;
          height:18px;
          border-radius:999px;
          background:#ff7c3b;
          border:3px solid #fff;
          box-shadow:0 4px 12px rgba(0,0,0,0.28);
        "></div>
      `,
      iconSize: [18, 18],
      iconAnchor: [9, 9]
    });

    userMarker = L.marker([lat, lon], { icon: userIcon }).addTo(map);
    userCircle = L.circle([lat, lon], {
      radius: accuracy,
      color: "#ff7c3b",
      weight: 1,
      opacity: 0.9,
      fillColor: "#ff7c3b",
      fillOpacity: 0.13
    }).addTo(map);
  } else {
    userMarker.setLatLng([lat, lon]);
    userCircle.setLatLng([lat, lon]);
    userCircle.setRadius(accuracy);
  }

  const current = L.latLng(lat, lon);

  if (accuracy <= GPS_SETTINGS.requiredAccuracy) {
    if (!stableReference) {
      stableReference = current;
      stableCount = 1;
    } else {
      const moved = stableReference.distanceTo(current);
      if (moved <= GPS_SETTINGS.stableDistance) {
        stableCount += 1;
      } else {
        stableReference = current;
        stableCount = 1;
      }
    }

    if (!gpsLocked && stableCount >= GPS_SETTINGS.requiredStableCount) {
      gpsLocked = true;
    }
  } else {
    stableCount = 0;
    stableReference = null;
  }

  if (gpsLocked && !hasCenteredOnStableLocation) {
    map.setView([lat, lon], GPS_SETTINGS.stableZoom);
    hasCenteredOnStableLocation = true;
  }

  lastLat = lat;
  lastLon = lon;

  checkUnlockByDistance(lat, lon);
}

function onLocationError() {}

function checkUnlockByDistance(lat, lon) {
  spots.forEach((spot) => {
    const distance = getDistanceMeters(lat, lon, spot.latitude, spot.longitude);
    if (distance <= spot.radius_m && !unlocked[spot.spot_id]) {
      unlocked[spot.spot_id] = true;
      localStorage.setItem("unlocked", JSON.stringify(unlocked));
      updateMarker(spot);
      renderUnlockedList();
    }
  });
}

function getDistanceMeters(lat1, lon1, lat2, lon2) {
  const a = L.latLng(lat1, lon1);
  const b = L.latLng(lat2, lon2);
  return a.distanceTo(b);
}

function centerOnUser() {
  if (map && lastLat !== null && lastLon !== null) {
    map.setView([lastLat, lastLon], GPS_SETTINGS.stableZoom);
  }
}

/* =========================
   竜画像ヘルパー
========================= */
function getDragonImageSrc(spotId, isCorrect) {
  const config = dragonImageMap[spotId];
  if (!config) return "";
  return isCorrect ? config.unlocked : config.locked;
}

function hasDragonImage(spotId) {
  const config = dragonImageMap[spotId];
  return !!(config && config.locked && config.unlocked);
}

/* =========================
   見つけたヒミツ一覧
========================= */
function renderUnlockedList() {
  const list = document.getElementById("unlockedList");
  const template = document.getElementById("spotRowTemplate");

  if (!list) return;

  const unlockedSpots = spots.filter((spot) => unlocked[spot.spot_id]);

  if (unlockedSpots.length === 0) {
    list.innerHTML = `<div style="color:#666; font-size:14px;">まだ見つかったヒミツはないよ。池の近くまで行ってみよう！</div>`;
    return;
  }

  list.innerHTML = "";

  unlockedSpots.forEach((spot) => {
    const correct = isSpotAnsweredCorrectly(spot.spot_id);

    if (template) {
      const fragment = template.content.cloneNode(true);
      const button = fragment.querySelector(".spotRow");
      const titleEl = fragment.querySelector(".spotRowTitle");
      const metaEl = fragment.querySelector(".spotRowMeta");
      const badgeEl = fragment.querySelector(".doneBadge");
      const visualWrap = fragment.querySelector(".spotRowVisualWrap");
      const dragonImg = fragment.querySelector(".spotRowDragonImg");

      titleEl.textContent = spot.spot_name;
      metaEl.textContent = correct ? "問題クリア済み" : "まだ問題に答えていないよ";

      if (correct) {
        badgeEl.classList.remove("hidden");
      } else {
        badgeEl.classList.add("hidden");
      }

      if (hasDragonImage(spot.spot_id)) {
        dragonImg.src = getDragonImageSrc(spot.spot_id, correct);
        dragonImg.alt = "";
        dragonImg.onerror = () => {
          visualWrap.classList.add("hidden");
        };
      } else {
        visualWrap.classList.add("hidden");
      }

      button.addEventListener("click", () => {
        openSpotSheet(spot);
      });

      list.appendChild(fragment);
      return;
    }

    const button = document.createElement("button");
    button.className = "spotRow";
    button.type = "button";
    button.innerHTML = `
      <div class="spotRowLeft">
        <div class="spotRowTitle">${spot.spot_name}</div>
        <div class="spotRowMeta">${correct ? "問題クリア済み" : "まだ問題に答えていないよ"}</div>
      </div>
      ${correct ? `<div class="doneBadge">クリア！</div>` : ``}
    `;
    button.addEventListener("click", () => openSpotSheet(spot));
    list.appendChild(button);
  });
}

function openSpotSheetById(spotId) {
  const spot = spots.find((s) => s.spot_id === spotId);
  if (!spot) return;
  openSpotSheet(spot);
}

/* =========================
   チュートリアル
========================= */
function openTutorial() {
  document.getElementById("tutorialBackdrop").style.display = "block";
  document.getElementById("tutorialModal").style.display = "block";
  tutorialIndex = 0;
  updateTutorialUI();
}

function closeTutorial() {
  document.getElementById("tutorialBackdrop").style.display = "none";
  document.getElementById("tutorialModal").style.display = "none";
}

function skipTutorial() {
  closeTutorial();
}

function closeTutorialIfBackdrop(event) {
  if (event.target.id === "tutorialBackdrop") {
    closeTutorial();
  }
}

function updateTutorialUI() {
  const track = document.getElementById("tutorialTrack");
  track.style.transform = `translateX(-${tutorialIndex * 100}%)`;

  const dots = document.querySelectorAll(".tutorialDot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === tutorialIndex);
  });

  document.getElementById("tutorialPrevBtn").disabled = tutorialIndex === 0;
  document.getElementById("tutorialNextBtn").textContent =
    tutorialIndex === TUTORIAL_TOTAL - 1 ? "はじめる" : "つぎへ";
}

function nextTutorial() {
  if (tutorialIndex >= TUTORIAL_TOTAL - 1) {
    closeTutorial();
    return;
  }
  tutorialIndex += 1;
  updateTutorialUI();
}

function prevTutorial() {
  if (tutorialIndex <= 0) return;
  tutorialIndex -= 1;
  updateTutorialUI();
}

function goTutorialSlide(index) {
  tutorialIndex = index;
  updateTutorialUI();
}

/* =========================
   地図のかけらUI
========================= */
function updateMapCollectionUI() {
  updateMapBtnCount();
  updatePieceGrid();
  updateSealArea();
}

function updateMapBtnCount() {
  const count = Object.keys(collectedPieces).length;
  const countEl = document.getElementById("mapBtnCount");
  if (countEl) {
    countEl.textContent = `地図のかけら ${count}/8`;
  }
}

function updatePieceGrid() {
  const cells = document.querySelectorAll(".pieceCell");
  cells.forEach((cell) => {
    const pieceNo = Number(cell.dataset.piece);
    const matchedSpotId = Object.keys(pieceMap).find((spotId) => pieceMap[spotId] === pieceNo);
    if (matchedSpotId && collectedPieces[matchedSpotId]) {
      cell.classList.add("collected");
    } else {
      cell.classList.remove("collected");
    }
  });
}

function updateSealArea() {
  const count = Object.keys(collectedPieces).length;
  const sealArea = document.getElementById("sealArea");
  const sealLinkBtn = document.getElementById("sealLinkBtn");

  if (count >= 8 && SEAL_LINK) {
    sealArea.classList.remove("hidden");
    sealLinkBtn.href = SEAL_LINK;
  } else {
    sealArea.classList.add("hidden");
    sealLinkBtn.href = "#";
  }
}

function openMapSheet() {
  document.getElementById("mapSheetBackdrop").style.display = "block";
  document.getElementById("mapSheet").style.display = "block";
  updateMapCollectionUI();
}

function closeMapSheet() {
  document.getElementById("mapSheetBackdrop").style.display = "none";
  document.getElementById("mapSheet").style.display = "none";
}

function closeMapSheetIfBackdrop(event) {
  if (event.target.id === "mapSheetBackdrop") {
    closeMapSheet();
  }
}

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

/* =========================
   スポットシート
========================= */
function openSpotSheet(spot) {
  currentSpot = spot;

  document.getElementById("sheetBackdrop").style.display = "block";
  document.getElementById("sheet").style.display = "block";

  document.getElementById("spotTitle").textContent = spot.spot_name;
  document.getElementById("spotDescription").textContent = spot.content.description || "";
  document.getElementById("spotQuestion").textContent = spot.content.question || "";
  document.getElementById("formMessage").textContent = "";
  document.getElementById("imageError").textContent = "";

  renderHintAndTip(spot);
  renderImageArea(spot);
  renderChoices(spot);
}

function renderHintAndTip(spot) {
  const hintEl = document.getElementById("spotHint");
  const tipEl = document.getElementById("spotTip");

  if (spot.content.hint) {
    hintEl.textContent = spot.content.hint;
    hintEl.classList.remove("hidden");
  } else {
    hintEl.textContent = "";
    hintEl.classList.add("hidden");
  }

  if (spot.content.tip) {
    tipEl.textContent = spot.content.tip;
    tipEl.classList.remove("hidden");
  } else {
    tipEl.textContent = "";
    tipEl.classList.add("hidden");
  }
}

function renderImageArea(spot) {
  const singleArea = document.getElementById("singleImageArea");
  const compareArea = document.getElementById("compareArea");
  const singleImage = document.getElementById("singleImage");
  const oldImg = document.getElementById("oldImg");
  const newImg = document.getElementById("newImg");
  const imageError = document.getElementById("imageError");

  singleArea.classList.add("hidden");
  compareArea.classList.add("hidden");
  imageError.textContent = "";

  if (spot.mediaMode === "single" && spot.images && spot.images.single) {
    singleArea.classList.remove("hidden");
    singleImage.src = spot.images.single;
    singleImage.onerror = () => {
      imageError.textContent = "画像の読み込みに失敗しました。";
    };
  } else if (spot.mediaMode === "compare" && spot.images && spot.images.old && spot.images.new) {
    compareArea.classList.remove("hidden");
    oldImg.src = spot.images.old;
    newImg.src = spot.images.new;
    updateCompareSlider(50);
    oldImg.onerror = () => {
      imageError.textContent = "昔の画像の読み込みに失敗しました。";
    };
    newImg.onerror = () => {
      imageError.textContent = "今の画像の読み込みに失敗しました。";
    };
  }
}

function renderChoices(spot) {
  const box = document.getElementById("choicesBox");
  const saved = answers[spot.spot_id] ? answers[spot.spot_id].value : null;

  box.innerHTML = (spot.content.choices || []).map((choice) => {
    const checked = saved === choice.value ? "checked" : "";
    return `
      <label class="choiceLabel">
        <input type="radio" name="spotChoice" value="${choice.value}" ${checked}>
        <span>${choice.label}</span>
      </label>
    `;
  }).join("");
}

function closeSheetIfBackdrop(event) {
  if (event.target.id === "sheetBackdrop") {
    closeSheet();
  }
}

function updateCompareSlider(value) {
  document.getElementById("compareWrap").style.setProperty("--divider", value + "%");
}

function closeSheet() {
  document.getElementById("sheetBackdrop").style.display = "none";
  document.getElementById("sheet").style.display = "none";
}

function getSelectedChoice() {
  const checked = document.querySelector('input[name="spotChoice"]:checked');
  if (!checked) return null;
  return checked.value;
}

async function saveAnswer() {
  if (!currentSpot || effectRunning) return;

  const alreadyCorrect = answers[currentSpot.spot_id] && answers[currentSpot.spot_id].isCorrect;
  if (alreadyCorrect) {
    document.getElementById("formMessage").innerText = "このスポットは発見済みです。";
    return;
  }

  const selectedValue = getSelectedChoice();

  if (!selectedValue) {
    document.getElementById("formMessage").innerText = "選択肢を1つ選んでください。";
    return;
  }

  const selectedChoice = currentSpot.content.choices.find((c) => c.value === selectedValue);
  const isCorrect = selectedValue === currentSpot.content.correctValue;
  const isFirstCorrect = isCorrect && !collectedPieces[currentSpot.spot_id];

  answers[currentSpot.spot_id] = {
    value: selectedChoice.value,
    label: selectedChoice.label,
    isCorrect: isCorrect
  };
  localStorage.setItem("answers", JSON.stringify(answers));

  sendAnswerToSheet(
    currentSpot.spot_id,
    `${selectedChoice.value}: ${selectedChoice.label} / ${isCorrect ? "正解" : "不正解"}`
  );

  document.getElementById("formMessage").innerText =
    `${isCorrect ? "正解です！ 地図のかけらを手に入れたよ。" : "ちがうかも。もう一回ちょうせん！"}\nあなたの回答：${selectedChoice.value}（${selectedChoice.label}）`;

  if (isFirstCorrect) {
    collectedPieces[currentSpot.spot_id] = true;
    localStorage.setItem("collectedPieces", JSON.stringify(collectedPieces));
  }

  updateProgress();
  updateMarker(currentSpot);
  renderUnlockedList();

  if (isFirstCorrect) {
    effectRunning = true;
    await animateIconToMap(currentSpot.spot_id);
    updateMapCollectionUI();
    effectRunning = false;
  } else {
    updateMapCollectionUI();
  }

  setTimeout(() => {
    closeSheet();
  }, 200);
}

/* =========================
   その他
========================= */
function updateProgress() {
  updateMapBtnCount();
}

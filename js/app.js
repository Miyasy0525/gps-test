const API_URL = "https://script.google.com/macros/s/AKfycbx3AGuRyNJe0mDxP5jb-JkkjE1npzYkRYSD2eHZlqceMaR2pvQiESmnxfUGV9kVyBBH/exec";

const OLD_URL = "https://miyasy0525.github.io/gps-test/images/old.jpg?v=6";
const NEW_URL = "https://miyasy0525.github.io/gps-test/images/new.jpg?v=6";

const DRINK_WATER_URL = NEW_URL;
const SEAL_LINK = "";

/* =========================
   MapTiler
========================= */
const MAPTILER_KEY = "c8LmF4zfUxbdqG0w5bmE";
const MAPTILER_STYLE_ID = "jp-mierune-streets";
const MAPTILER_TILE_URL = `https://api.maptiler.com/maps/${MAPTILER_STYLE_ID}/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`;

/* =========================
   GPS安定判定設定
   位置確定レイヤー
========================= */
const GPS_SETTINGS = {
  requiredAccuracy: 35,        // この値以下なら「かなり使える」
  stableDistance: 25,          // 前回安定候補からこの距離以内なら安定継続
  requiredStableCount: 2,      // 連続何回で安定とみなすか
  watchTimeout: 15000,
  maximumAge: 0,
  defaultZoom: 17,
  stableZoom: 17
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
    latitude: 35.506930,
    longitude: 138.745040,
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
    latitude: 35.507010,
    longitude: 138.745120,
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
    latitude: 35.507090,
    longitude: 138.745200,
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
    latitude: 35.507170,
    longitude: 138.745280,
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
    latitude: 35.507250,
    longitude: 138.745360,
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
    latitude: 35.507330,
    longitude: 138.745440,
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
    latitude: 35.507410,
    longitude: 138.745520,
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

function logDebug() {}

function updateStartButtonState() {
  const gender = document.getElementById("genderSelect").value.trim();
  const age = document.getElementById("ageSelect").value.trim();
  const region = document.getElementById("regionSelect").value.trim();
  const companion = document.getElementById("companionSelect").value.trim();

  const ok = gender !== "" && age !== "" && region !== "" && companion !== "";
  document.getElementById("startBtn").disabled = !ok;
}

function createSessionId() {
  return "sess_" + Date.now() + "_" + Math.random().toString(36).slice(2, 10);
}

function postToSheet(payload) {
  const body = new URLSearchParams(payload).toString();

  fetch(API_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: body
  }).catch(() => {});
}

function sendSessionToSheet(profile) {
  postToSheet({
    action: "session",
    session_id: sessionId,
    started_at: profile.startedAt,
    gender: profile.gender,
    age_group: profile.age,
    companion_type: profile.companion,
    region: profile.region
  });
}

function sendAnswerToSheet(spotId, answerText) {
  postToSheet({
    action: "answer",
    session_id: sessionId,
    timestamp: new Date().toISOString(),
    spot_id: spotId,
    answer_text: answerText
  });
}

function getCorrectCount() {
  return Object.values(answers).filter(a => a && a.isCorrect).length;
}

function updateMapBtnCount() {
  const count = getCorrectCount();
  const el = document.getElementById("mapBtnCount");
  if (el) {
    el.textContent = `回答数：${count}/8`;
  }

  const btn = document.getElementById("mapBtn");
  if (btn) {
    if (count >= 8) {
      btn.classList.add("attentionGlow");
    } else {
      btn.classList.remove("attentionGlow");
    }
  }
}

function updateSealButton() {
  const sealBtn = document.getElementById("sealBtn");
  const count = Object.keys(collectedPieces).length;

  if (count >= 8) {
    sealBtn.classList.remove("hidden");
    sealBtn.href = SEAL_LINK;
  } else {
    sealBtn.classList.add("hidden");
    sealBtn.href = "";
  }
}

function updateMapCollectionUI() {
  let count = 0;

  spots.forEach((spot) => {
    const pieceNumber = pieceMap[spot.spot_id];
    const pieceEl = document.getElementById(`piece${pieceNumber}`);
    const hasPiece = !!collectedPieces[spot.spot_id];

    if (pieceEl) {
      if (hasPiece) {
        pieceEl.classList.add("filled");
        count++;
      } else {
        pieceEl.classList.remove("filled");
      }
    }
  });

  const titleCountEl = document.getElementById("mapTitleCount");
  if (titleCountEl) {
    titleCountEl.innerText = `(${count}/8枚)`;
  }

  const stageEl = document.getElementById("mapStage");
  if (stageEl) {
    if (count === 8) {
      stageEl.classList.add("completed");
    } else {
      stageEl.classList.remove("completed");
    }
  }

  updateSealButton();
  updateMapBtnCount();
}

function openMapSheet() {
  updateMapCollectionUI();
  document.getElementById("mapSheetBackdrop").style.display = "block";
  document.getElementById("mapSheet").style.display = "block";
}

function closeMapSheet() {
  document.getElementById("mapSheetBackdrop").style.display = "none";
  document.getElementById("mapSheet").style.display = "none";
}

function pulseMapButton() {
  const mapBtn = document.getElementById("mapBtn");
  mapBtn.classList.add("pulse");
  mapBtn.classList.add("sparklePulse");
  setTimeout(() => mapBtn.classList.remove("pulse"), 300);
  setTimeout(() => mapBtn.classList.remove("sparklePulse"), 1000);
}

function createSparkle(x, y) {
  const fxLayer = document.getElementById("fxLayer");
  const s = document.createElement("div");
  s.className = "sparkle";
  const dx = (Math.random() - 0.5) * 24;
  const dy = (Math.random() - 0.5) * 24;
  s.style.left = `${x + dx}px`;
  s.style.top = `${y + dy}px`;
  fxLayer.appendChild(s);
  setTimeout(() => s.remove(), 750);
}

function animateIconToMap(spotId) {
  return new Promise((resolve) => {
    const iconSrc = iconMap[spotId];
    if (!iconSrc) {
      resolve();
      return;
    }

    const fxLayer = document.getElementById("fxLayer");
    const saveBtn = document.getElementById("saveAnswerBtn");
    const mapBtn = document.getElementById("mapBtn");

    if (!saveBtn || !mapBtn) {
      resolve();
      return;
    }

    const saveRect = saveBtn.getBoundingClientRect();
    const mapRect = mapBtn.getBoundingClientRect();

    const startX = saveRect.left + saveRect.width / 2;
    const startY = saveRect.top + saveRect.height / 2;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const endX = mapRect.left + mapRect.width / 2;
    const endY = mapRect.top + mapRect.height / 2;

    const icon = document.createElement("img");
    icon.className = "flyingIcon";
    icon.src = iconSrc;
    icon.style.left = `${startX}px`;
    icon.style.top = `${startY}px`;
    icon.style.transform = "translate(-50%, -50%) scale(1.35)";
    fxLayer.appendChild(icon);

    requestAnimationFrame(() => {
      icon.style.opacity = "1";
      icon.style.transition = "left 0.7s ease, top 0.7s ease, transform 0.7s ease, opacity 0.25s ease";
      icon.style.left = `${centerX}px`;
      icon.style.top = `${centerY}px`;
      icon.style.transform = "translate(-50%, -50%) scale(4.5)";
    });

    const sparkleTimer = setInterval(() => {
      const currentLeft = parseFloat(icon.style.left || "0");
      const currentTop = parseFloat(icon.style.top || "0");
      if (currentLeft && currentTop) {
        createSparkle(currentLeft, currentTop);
        if (Math.random() > 0.55) createSparkle(currentLeft, currentTop);
      }
    }, 90);

    const step1Done = () => {
      icon.removeEventListener("transitionend", step1Done);

      setTimeout(() => {
        icon.style.transition = "left 1.1s cubic-bezier(0.2, 0.85, 0.2, 1), top 1.1s cubic-bezier(0.2, 0.85, 0.2, 1), transform 1.1s ease, opacity 1.1s ease";
        icon.style.left = `${endX}px`;
        icon.style.top = `${endY}px`;
        icon.style.transform = "translate(-50%, -50%) scale(0.42)";
        icon.style.opacity = "0.92";

        const step2Done = () => {
          icon.removeEventListener("transitionend", step2Done);
          clearInterval(sparkleTimer);
          pulseMapButton();
          setTimeout(() => {
            icon.remove();
            resolve();
          }, 120);
        };

        icon.addEventListener("transitionend", step2Done, { once: true });
      }, 1000);
    };

    icon.addEventListener("transitionend", step1Done, { once: true });
  });
}

/* =========================
   チュートリアル
========================= */
function maybeOpenTutorial() {
  const seen = localStorage.getItem("tutorialSeen");
  if (seen === "1") return;

  tutorialIndex = 0;
  updateTutorialSlide();
  document.getElementById("tutorialBackdrop").style.display = "block";
  document.getElementById("tutorialModal").style.display = "block";
}

function updateTutorialSlide() {
  const track = document.getElementById("tutorialTrack");
  if (track) {
    track.style.transform = `translateX(-${tutorialIndex * 100}%)`;
  }

  document.querySelectorAll(".tutorialDot").forEach((dot, idx) => {
    dot.classList.toggle("active", idx === tutorialIndex);
  });

  const prevBtn = document.getElementById("tutorialPrevBtn");
  const nextBtn = document.getElementById("tutorialNextBtn");
  const startBtn = document.getElementById("tutorialStartBtn");

  if (prevBtn) prevBtn.disabled = tutorialIndex === 0;
  if (nextBtn) nextBtn.classList.toggle("hidden", tutorialIndex === TUTORIAL_TOTAL - 1);
  if (startBtn) startBtn.classList.toggle("hidden", tutorialIndex !== TUTORIAL_TOTAL - 1);
}

function nextTutorialSlide() {
  if (tutorialIndex < TUTORIAL_TOTAL - 1) {
    tutorialIndex += 1;
    updateTutorialSlide();
  }
}

function prevTutorialSlide() {
  if (tutorialIndex > 0) {
    tutorialIndex -= 1;
    updateTutorialSlide();
  }
}

function finishTutorial() {
  localStorage.setItem("tutorialSeen", "1");
  document.getElementById("tutorialBackdrop").style.display = "none";
  document.getElementById("tutorialModal").style.display = "none";
}

function skipTutorial() {
  finishTutorial();
}

function closeTutorialIfBackdrop(e) {
  if (e.target.id === "tutorialBackdrop") {
    finishTutorial();
  }
}

function startExperience() {
  const gender = document.getElementById("genderSelect").value;
  const age = document.getElementById("ageSelect").value;
  const region = document.getElementById("regionSelect").value;
  const companion = document.getElementById("companionSelect").value;

  if (!gender || !age || !region || !companion) return;

  sessionId = createSessionId();
  localStorage.setItem("sessionId", sessionId);

  userProfile = {
    gender,
    age,
    region,
    companion,
    startedAt: new Date().toISOString()
  };
  localStorage.setItem("userProfile", JSON.stringify(userProfile));

  sendSessionToSheet(userProfile);

  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("appScreen").classList.remove("hidden");
  document.getElementById("mapBtn").classList.remove("hidden");

  if (!map) {
    initMap();
  }

  setTimeout(() => {
    map.invalidateSize();
    startAutoTracking();
    maybeOpenTutorial();
  }, 100);
}

function initMap() {
  map = L.map("map").setView([35.506855, 138.744967], GPS_SETTINGS.defaultZoom);

  L.tileLayer(MAPTILER_TILE_URL, {
    maxZoom: 19,
    attribution: '&copy; MapTiler & OpenStreetMap contributors'
  }).addTo(map);

  spots.forEach((spot) => {
    const marker = L.circleMarker([spot.latitude, spot.longitude], {
      radius: 14,
      color: "gray",
      fillColor: "gray",
      fillOpacity: 0.8,
      weight: 2
    }).addTo(map);

    marker.bindTooltip(spot.spot_name);
    marker.on("click", () => openSpotFromMarker(spot));
    marker.on("mouseup", () => openSpotFromMarker(spot));

    markers[spot.spot_id] = marker;
  });

  updateProgress();
  updateMapCollectionUI();
  spots.forEach(updateMarker);
  renderUnlockedList();
}

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function resetGpsStability() {
  stableCount = 0;
  stableReference = null;
  gpsLocked = false;
}

function isAccurateEnough(accuracy) {
  return Number.isFinite(accuracy) && accuracy <= GPS_SETTINGS.requiredAccuracy;
}

function evaluateGpsStability(lat, lon, accuracy) {
  latestAccuracy = accuracy;

  if (!isAccurateEnough(accuracy)) {
    resetGpsStability();
    return false;
  }

  if (!stableReference) {
    stableReference = { lat, lon };
    stableCount = 1;
    return false;
  }

  const drift = getDistance(lat, lon, stableReference.lat, stableReference.lon);

  if (drift <= GPS_SETTINGS.stableDistance) {
    stableCount += 1;
  } else {
    stableReference = { lat, lon };
    stableCount = 1;
    return false;
  }

  stableReference = {
    lat: (stableReference.lat + lat) / 2,
    lon: (stableReference.lon + lon) / 2
  };

  if (stableCount >= GPS_SETTINGS.requiredStableCount) {
    gpsLocked = true;
    return true;
  }

  return false;
}

function startAutoTracking() {
  if (!navigator.geolocation) {
    alert("この端末では位置情報が使えません。");
    return;
  }

  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
  }

  resetGpsStability();

  watchId = navigator.geolocation.watchPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const accuracy = pos.coords.accuracy;

      lastLat = lat;
      lastLon = lon;

      updateUserLocation(lat, lon, accuracy);

      const stableNow = evaluateGpsStability(lat, lon, accuracy);

      if (stableNow) {
        if (!hasCenteredOnStableLocation) {
          map.setView([lat, lon], GPS_SETTINGS.stableZoom);
          hasCenteredOnStableLocation = true;
        }
        checkDistance(lat, lon);
      }

      renderUnlockedList();
    },
    () => {},
    {
      enableHighAccuracy: true,
      timeout: GPS_SETTINGS.watchTimeout,
      maximumAge: GPS_SETTINGS.maximumAge
    }
  );
}

function updateUserLocation(lat, lon, accuracy) {
  if (userMarker) map.removeLayer(userMarker);
  if (userCircle) map.removeLayer(userCircle);

  userMarker = L.circleMarker([lat, lon], {
    radius: 8,
    color: "#ffffff",
    weight: 2,
    fillColor: "#1976d2",
    fillOpacity: 1
  }).addTo(map);

  userCircle = L.circle([lat, lon], {
    radius: accuracy,
    color: gpsLocked ? "#1976d2" : "#ff9800",
    fillColor: gpsLocked ? "#1976d2" : "#ff9800",
    fillOpacity: gpsLocked ? 0.12 : 0.08,
    weight: 1
  }).addTo(map);
}

function centerOnUser() {
  if (lastLat !== null && lastLon !== null) {
    map.setView([lastLat, lastLon], GPS_SETTINGS.stableZoom);
  }
}

function checkDistance(lat, lon) {
  let changed = false;

  spots.forEach((spot) => {
    const d = getDistance(lat, lon, spot.latitude, spot.longitude);

    if (d <= spot.radius_m && !unlocked[spot.spot_id]) {
      unlocked[spot.spot_id] = true;
      changed = true;
    }

    updateMarker(spot);
  });

  if (changed) {
    localStorage.setItem("unlocked", JSON.stringify(unlocked));
  }

  renderUnlockedList();
}

function updateMarker(spot) {
  const marker = markers[spot.spot_id];
  if (!marker) return;

  const ans = answers[spot.spot_id];

  if (ans && ans.isCorrect) {
    marker.setStyle({ color: "green", fillColor: "green" });
  } else if (unlocked[spot.spot_id]) {
    marker.setStyle({ color: "blue", fillColor: "blue" });
  } else {
    marker.setStyle({ color: "gray", fillColor: "gray" });
  }
}

function openSpotFromMarker(spot) {
  if (!gpsLocked) {
    alert("現在地を確認中です。しばらくすると、正しい場所でスポットを開けるようになります。");
    return;
  }

  if (!unlocked[spot.spot_id]) {
    alert("このスポットの近くに移動すると情報が開放されます。");
    return;
  }

  if (answers[spot.spot_id] && answers[spot.spot_id].isCorrect) {
    alert("このスポットは発見済みです。");
    return;
  }

  openSpot(spot);
}

function buildChoices(spot) {
  const box = document.getElementById("choicesBox");
  box.innerHTML = "";

  const saved = answers[spot.spot_id]?.value || "";

  spot.content.choices.forEach((choice, idx) => {
    const label = document.createElement("label");
    label.className = "choiceLabel";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "spotChoice";
    radio.value = choice.value;
    if (saved === choice.value) radio.checked = true;

    const code = document.createElement("div");
    code.className = "choiceCode";
    code.textContent = ["A", "B", "C"][idx] || choice.value;

    const text = document.createElement("div");
    text.textContent = choice.label;

    label.appendChild(radio);
    label.appendChild(code);
    label.appendChild(text);

    box.appendChild(label);
  });
}

function setMedia(spot) {
  const imageError = document.getElementById("imageError");
  imageError.style.display = "none";
  imageError.innerText = "";

  const singleArea = document.getElementById("singleImageArea");
  const compareArea = document.getElementById("compareArea");

  singleArea.classList.add("hidden");
  compareArea.classList.add("hidden");

  if (spot.mediaMode === "compare") {
    compareArea.classList.remove("hidden");

    const oldImg = document.getElementById("oldImg");
    const newImg = document.getElementById("newImg");

    oldImg.onerror = () => {
      imageError.style.display = "block";
      imageError.innerText = "昔画像の読み込みに失敗しました。";
    };
    newImg.onerror = () => {
      imageError.style.display = "block";
      imageError.innerText = "今画像の読み込みに失敗しました。";
    };

    oldImg.src = spot.images.old || "";
    newImg.src = spot.images.new || "";

    document.getElementById("compareRange").value = 50;
    updateCompareSlider(50);
  } else {
    singleArea.classList.remove("hidden");
    const singleImg = document.getElementById("singleImg");
    singleImg.onerror = () => {
      imageError.style.display = "block";
      imageError.innerText = "参考画像の読み込みに失敗しました。";
    };
    singleImg.src = spot.images.single || "";
  }
}

function openSpot(spot) {
  currentSpot = spot;

  document.getElementById("spotTitle").innerText = spot.spot_name;
  document.getElementById("spotDescription").innerText = spot.content.description;
  document.getElementById("spotQuestion").innerText = spot.content.question;

  const hintEl = document.getElementById("spotHint");
  const tipEl = document.getElementById("spotTip");

  if (spot.content.hint) {
    hintEl.innerText = spot.content.hint;
    hintEl.classList.remove("hidden");
  } else {
    hintEl.innerText = "";
    hintEl.classList.add("hidden");
  }

  if (spot.content.tip) {
    tipEl.innerText = spot.content.tip;
    tipEl.classList.remove("hidden");
  } else {
    tipEl.innerText = "";
    tipEl.classList.add("hidden");
  }

  buildChoices(spot);
  setMedia(spot);

  const saved = answers[spot.spot_id];
  if (saved) {
    document.getElementById("formMessage").innerText =
      `保存済みの回答：${saved.value}（${saved.label}）\n結果：${saved.isCorrect ? "発見済み" : "リトライ"}`;
  } else {
    document.getElementById("formMessage").innerText = "";
  }

  document.getElementById("sheetBackdrop").style.display = "block";
  document.getElementById("sheet").style.display = "block";
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

  const selectedChoice = currentSpot.content.choices.find(c => c.value === selectedValue);
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
    `${isCorrect ? "正解です！ 地図片を獲得しました。" : "リトライ"}\nあなたの回答：${selectedChoice.value}（${selectedChoice.label}）`;

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

function updateProgress() {
  updateMapBtnCount();
}

function renderUnlockedList() {
  const container = document.getElementById("unlockedList");
  const unlockedSpots = spots.filter(spot => unlocked[spot.spot_id]);

  if (unlockedSpots.length === 0) {
    const gpsMessage = gpsLocked
      ? "まだ開放されたスポットはありません。"
      : `現在地を確認中です。しばらくすると近くのスポットが開きます。${latestAccuracy ? `（現在の誤差の目安：約${Math.round(latestAccuracy)}m）` : ""}`;
    container.innerHTML = `<div style="color:#666; font-size:14px;">${gpsMessage}</div>`;
    return;
  }

  container.innerHTML = "";

  unlockedSpots.forEach(spot => {
    const row = document.createElement("div");
    row.className = "spotRow";

    const left = document.createElement("div");
    const title = document.createElement("div");
    title.className = "spotRowTitle";
    title.textContent = spot.spot_name;

    const meta = document.createElement("div");
    meta.className = "spotRowMeta";

    if (answers[spot.spot_id] && answers[spot.spot_id].isCorrect) {
      meta.textContent = "発見済み";
    } else if (answers[spot.spot_id]) {
      meta.textContent = "リトライ";
    } else {
      meta.textContent = "未回答";
    }

    left.appendChild(title);
    left.appendChild(meta);

    if (answers[spot.spot_id] && answers[spot.spot_id].isCorrect) {
      const badge = document.createElement("div");
      badge.className = "doneBadge";
      badge.textContent = "発見済み";
      row.appendChild(left);
      row.appendChild(badge);
    } else {
      const btn = document.createElement("button");
      btn.textContent = answers[spot.spot_id] ? "リトライ" : "ヒミツに迫る";
      if (answers[spot.spot_id] && !answers[spot.spot_id].isCorrect) {
        btn.classList.add("retryBtn");
      }
      btn.onclick = () => {
        openSpot(spot);
      };
      row.appendChild(left);
      row.appendChild(btn);
    }

    container.appendChild(row);
  });
}

updateStartButtonState();
setTimeout(() => {
  updateMapCollectionUI();
  renderUnlockedList();
}, 0);

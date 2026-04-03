let tutorialIndex = 0;
const TUTORIAL_TOTAL = 4;
let currentSpot = null;
let currentSheetMode = "quiz"; // "quiz" | "review"
let sealVideoOpening = false;
let sealCompletionTimer = null;
let sealVideoEndedBound = false;

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

function setFormMessage(text, type = "") {
  const el = document.getElementById("formMessage");
  if (!el) return;

  el.innerText = text || "";
  el.classList.remove("messageSuccess", "messageError", "messageInfo");

  if (type) {
    el.classList.add(type);
  }
}

/* =========================
   正解済み解説モード用ヘルパー
========================= */
function getSpotCorrectAnswerLabel(spot) {
  if (!spot || !spot.content || !spot.content.choices) return "";
  const answer = spot.content.choices.find((c) => c.value === spot.content.correctValue);
  if (!answer) return "";
  return `${answer.value}：${answer.label}`;
}

function buildReviewContent(spot) {
  const content = spot.content || {};
  const correctAnswerLabel = getSpotCorrectAnswerLabel(spot);

  return {
    title: content.reviewTitle || `${spot.spot_name}　正解解説`,
    description: content.reviewLead || content.description || "",
    question: content.reviewAnswer
      ? `${content.reviewAnswer}\n\n${content.reviewComment || ""}`.trim()
      : `正解は「${correctAnswerLabel}」です。\n\n${content.reviewComment || "この問題はクリア済みです。現地のことをもう一度思い出してみよう！"}`
  };
}

function setSheetMode(mode) {
  currentSheetMode = mode;

  const choicesBox = document.getElementById("choicesBox");
  const saveBtn = document.getElementById("saveAnswerBtn");
  const compareRange = document.getElementById("compareRange");
  const formMessage = document.getElementById("formMessage");

  if (mode === "review") {
    if (choicesBox) choicesBox.classList.add("hidden");
    if (saveBtn) saveBtn.classList.add("hidden");
    if (compareRange && !compareRange.classList.contains("hidden")) {
      compareRange.classList.remove("hidden");
    }
    if (formMessage) formMessage.classList.add("hidden");
  } else {
    if (choicesBox) choicesBox.classList.remove("hidden");
    if (saveBtn) saveBtn.classList.remove("hidden");
    if (formMessage) formMessage.classList.remove("hidden");
  }
}

function openReviewSpotSheet(spot) {
  currentSpot = spot;
  setSheetMode("review");

  document.getElementById("sheetBackdrop").style.display = "block";
  document.getElementById("sheet").style.display = "block";
  document.getElementById("imageError").textContent = "";
  setFormMessage("");

  const review = buildReviewContent(spot);

  document.getElementById("spotTitle").textContent = review.title;
  document.getElementById("spotDescription").textContent = review.description;
  document.getElementById("spotQuestion").textContent = review.question;

  renderHintAndTip(spot, true);
  renderImageArea(spot);
}

function openQuizSpotSheet(spot) {
  currentSpot = spot;
  setSheetMode("quiz");

  document.getElementById("sheetBackdrop").style.display = "block";
  document.getElementById("sheet").style.display = "block";

  document.getElementById("spotTitle").textContent = spot.spot_name;
  document.getElementById("spotDescription").textContent = spot.content.description || "";
  document.getElementById("spotQuestion").textContent = spot.content.question || "";
  setFormMessage("");
  document.getElementById("imageError").textContent = "";

  renderHintAndTip(spot, false);
  renderImageArea(spot);
  renderChoices(spot);
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
    const answer = answers[spot.spot_id];
    const correct = !!(answer && answer.isCorrect);
    const triedWrong = !!(answer && !answer.isCorrect);

    let metaText = "まだ問題に答えていないよ";
    if (correct) {
      metaText = "問題クリア済み";
    } else if (triedWrong) {
      metaText = "前回はちがったよ。もう一度チャレンジ！";
    }

    if (template) {
      const fragment = template.content.cloneNode(true);
      const button = fragment.querySelector(".spotRow");
      const titleEl = fragment.querySelector(".spotRowTitle");
      const metaEl = fragment.querySelector(".spotRowMeta");
      const badgeEl = fragment.querySelector(".doneBadge");
      const visualWrap = fragment.querySelector(".spotRowVisualWrap");
      const dragonImg = fragment.querySelector(".spotRowDragonImg");

      titleEl.textContent = spot.spot_name;
      metaEl.textContent = metaText;

      badgeEl.classList.remove("retryBadge");

      if (correct) {
        badgeEl.textContent = "クリア！";
        badgeEl.classList.remove("hidden");
      } else if (triedWrong) {
        badgeEl.textContent = "もう一度トライ";
        badgeEl.classList.add("retryBadge");
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

    const badgeHtml = correct
      ? `<div class="doneBadge">クリア！</div>`
      : triedWrong
        ? `<div class="doneBadge retryBadge">もう一度トライ</div>`
        : "";

    const button = document.createElement("button");
    button.className = "spotRow";
    button.type = "button";
    button.innerHTML = `
      <div class="spotRowLeft">
        <div class="spotRowTitle">${spot.spot_name}</div>
        <div class="spotRowMeta">${metaText}</div>
      </div>
      ${badgeHtml}
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
  if (!track) return;

  track.style.transform = `translateX(-${tutorialIndex * 100}%)`;

  const dots = document.querySelectorAll(".tutorialDot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === tutorialIndex);
  });

  const prevBtn = document.getElementById("tutorialPrevBtn");
  const nextBtn = document.getElementById("tutorialNextBtn");

  if (prevBtn) prevBtn.disabled = tutorialIndex === 0;
  if (nextBtn) {
    nextBtn.textContent = tutorialIndex === TUTORIAL_TOTAL - 1 ? "はじめる" : "つぎへ";
  }
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
   ヒミツの地図 UI
========================= */
function updateMapCollectionUI() {
  updateMapBtnCount();
  updateMapTitleCount();
  updateMapPieceLayers();
  updateSealArea();
  updateCompletedMapEffects();
}

function updateMapBtnCount() {
  const count = Object.keys(collectedPieces).length;
  const countEl = document.getElementById("mapBtnCount");
  if (countEl) {
    countEl.textContent = `地図のかけら ${count}/8`;
  }
}

function updateMapTitleCount() {
  const count = Object.keys(collectedPieces).length;
  const countEl = document.getElementById("mapTitleCount");
  if (countEl) {
    countEl.textContent = `(${count}/8枚)`;
  }
}

function updateMapPieceLayers() {
  const mapStage = document.getElementById("mapStage");
  if (!mapStage) return;

  Object.keys(pieceMap).forEach((spotId) => {
    const pieceNo = pieceMap[spotId];
    const pieceEl = document.getElementById(`piece${pieceNo}`);
    if (!pieceEl) return;

    if (collectedPieces[spotId]) {
      pieceEl.classList.add("filled");
    } else {
      pieceEl.classList.remove("filled");
    }
  });

  const collectedCount = Object.keys(collectedPieces).length;
  mapStage.classList.toggle("completed", collectedCount >= 8);
}

function updateSealArea() {
  const sealBtn = document.getElementById("sealBtn");
  if (!sealBtn) return;

  const count = Object.keys(collectedPieces).length;
  if (count >= 8 && SEAL_LINK) {
    sealBtn.classList.remove("hidden");
    sealBtn.classList.add("sealReady");
  } else {
    sealBtn.classList.add("hidden");
    sealBtn.classList.remove("sealReady");
    closeSealVideo(true, false);
  }
}

function updateCompletedMapEffects() {
  const count = Object.keys(collectedPieces).length;
  const mapStage = document.getElementById("mapStage");
  const mapBtn = document.getElementById("mapBtn");

  if (mapStage) {
    mapStage.classList.toggle("completedGlow", count >= 8);
  }

  if (mapBtn) {
    mapBtn.classList.toggle("mapBtnCompleted", count >= 8);
  }
}

function openMapSheet() {
  document.getElementById("mapSheetBackdrop").style.display = "block";
  document.getElementById("mapSheet").style.display = "block";
  updateMapCollectionUI();
}

function closeMapSheet() {
  closeSealVideo(true, false);
  hideSealCompletionMessage(true);
  document.getElementById("mapSheetBackdrop").style.display = "none";
  document.getElementById("mapSheet").style.display = "none";
}

function closeMapSheetIfBackdrop(event) {
  if (event.target.id === "mapSheetBackdrop") {
    closeMapSheet();
  }
}

/* =========================
   封印動画
========================= */
function getSealVideoElements() {
  return {
    mapStage: document.getElementById("mapStage"),
    overlay: document.getElementById("sealVideoOverlay"),
    video: document.getElementById("sealVideo"),
    closeBtn: document.getElementById("sealVideoCloseBtn")
  };
}

function prepareSealVideo() {
  const { video } = getSealVideoElements();
  if (!video) return false;
  if (!SEAL_LINK) return false;

  if (!video.getAttribute("src")) {
    video.src = SEAL_LINK;
    video.load();
  }

  if (!sealVideoEndedBound) {
    video.addEventListener("ended", handleSealVideoEnded);
    sealVideoEndedBound = true;
  }

  return true;
}

async function openSealVideo() {
  if (sealVideoOpening) return;

  const count = Object.keys(collectedPieces).length;
  if (count < 8) return;

  const { mapStage, overlay, video } = getSealVideoElements();
  if (!mapStage || !overlay || !video) return;
  if (!prepareSealVideo()) return;

  hideSealCompletionMessage(true);

  sealVideoOpening = true;

  overlay.classList.remove("hidden");
  overlay.classList.remove("show", "revealing");
  mapStage.classList.remove("videoPlaying");

  video.pause();
  video.currentTime = 0;

  void overlay.offsetWidth;

  overlay.classList.add("show", "revealing");
  mapStage.classList.add("videoPlaying");

  await waitMs(760);

  try {
    await video.play();
  } catch (e) {
    /* 自動再生制限があっても controls から手動再生可 */
  }

  setTimeout(() => {
    overlay.classList.remove("revealing");
  }, 980);

  sealVideoOpening = false;
}

function closeSealVideo(forceImmediate = false, showCompletion = !forceImmediate) {
  const { mapStage, overlay, video } = getSealVideoElements();
  if (!mapStage || !overlay || !video) return;

  sealVideoOpening = false;
  video.pause();

  if (forceImmediate) {
    overlay.classList.remove("show", "revealing");
    overlay.classList.add("hidden");
    mapStage.classList.remove("videoPlaying");

    if (showCompletion) {
      setTimeout(() => {
        showSealCompletionMessage();
      }, 60);
    }
    return;
  }

  overlay.classList.remove("revealing", "show");
  mapStage.classList.remove("videoPlaying");

  setTimeout(() => {
    if (!overlay.classList.contains("show")) {
      overlay.classList.add("hidden");
    }
    if (showCompletion) {
      showSealCompletionMessage();
    }
  }, 220);
}

function handleSealVideoEnded() {
  closeSealVideo(false, true);
}

/* =========================
   封印完了メッセージ
========================= */
function hideSealCompletionMessage(immediate = false) {
  clearTimeout(sealCompletionTimer);

  const fxLayer = document.getElementById("fxLayer");
  if (!fxLayer) return;

  const existing = document.getElementById("sealCompletionNote");
  if (!existing) return;

  if (immediate) {
    existing.remove();
    return;
  }

  existing.style.transition = "opacity 0.28s ease, transform 0.28s ease";
  existing.style.opacity = "0";
  existing.style.transform = "translate(-50%, -50%) scale(0.96)";

  setTimeout(() => {
    existing.remove();
  }, 300);
}

function showSealCompletionMessage() {
  alert("おめでとう！ 達成メッセージの呼び出しまでは来ています。");
}

  sealCompletionTimer = setTimeout(() => {
    hideSealCompletionMessage();
  }, 5200);
}

/* =========================
   スポットシート
========================= */
function openSpotSheet(spot) {
  const alreadyCorrect = answers[spot.spot_id] && answers[spot.spot_id].isCorrect;

  if (alreadyCorrect) {
    openReviewSpotSheet(spot);
  } else {
    openQuizSpotSheet(spot);
  }
}

function renderHintAndTip(spot, isReviewMode = false) {
  const hintEl = document.getElementById("spotHint");
  const tipEl = document.getElementById("spotTip");

  if (isReviewMode) {
    hintEl.textContent = "";
    hintEl.classList.add("hidden");

    const correctAnswerLabel = getSpotCorrectAnswerLabel(spot);
    if (correctAnswerLabel) {
      tipEl.textContent = `正解：${correctAnswerLabel}`;
      tipEl.classList.remove("hidden");
    } else {
      tipEl.textContent = "";
      tipEl.classList.add("hidden");
    }
    return;
  }

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

  const isReview = currentSheetMode === "review";

  const singleSrc = isReview
    ? (spot.images && (spot.images.review || spot.images.quiz || spot.images.single))
    : (spot.images && (spot.images.quiz || spot.images.single));

  if (spot.mediaMode === "single" && singleSrc) {
    singleArea.classList.remove("hidden");
    singleImage.onerror = () => {
      imageError.textContent = "画像の読み込みに失敗しました。";
    };
    singleImage.src = singleSrc;
    return;
  }

  const oldSrc = isReview
    ? (spot.images && (spot.images.reviewOld || spot.images.old))
    : (spot.images && (spot.images.quizOld || spot.images.old));

  const newSrc = isReview
    ? (spot.images && (spot.images.reviewNew || spot.images.new))
    : (spot.images && (spot.images.quizNew || spot.images.new));

  if (spot.mediaMode === "compare" && oldSrc && newSrc) {
    compareArea.classList.remove("hidden");
    oldImg.onerror = () => {
      imageError.textContent = "昔の画像の読み込みに失敗しました。";
    };
    newImg.onerror = () => {
      imageError.textContent = "今の画像の読み込みに失敗しました。";
    };
    oldImg.src = oldSrc;
    newImg.src = newSrc;
    updateCompareSlider(50);
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
  const wrap = document.getElementById("compareWrap");
  if (!wrap) return;
  wrap.style.setProperty("--divider", value + "%");
}

function closeSheet() {
  document.getElementById("sheetBackdrop").style.display = "none";
  document.getElementById("sheet").style.display = "none";
  currentSheetMode = "quiz";
}

function getSelectedChoice() {
  const checked = document.querySelector('input[name="spotChoice"]:checked');
  if (!checked) return null;
  return checked.value;
}

async function saveAnswer() {
  if (!currentSpot || effectRunning || currentSheetMode !== "quiz") return;

  const alreadyCorrect = answers[currentSpot.spot_id] && answers[currentSpot.spot_id].isCorrect;
  if (alreadyCorrect) {
    setFormMessage("このスポットはもうクリア済みだよ。", "messageInfo");
    return;
  }

  const selectedValue = getSelectedChoice();

  if (!selectedValue) {
    setFormMessage("選択肢を1つ選んでください。", "messageInfo");
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

  if (isFirstCorrect) {
    collectedPieces[currentSpot.spot_id] = true;
    localStorage.setItem("collectedPieces", JSON.stringify(collectedPieces));
  }

  sendAnswerToSheet(
    currentSpot.spot_id,
    `${selectedChoice.value}: ${selectedChoice.label} / ${isCorrect ? "正解" : "不正解"}`
  );

  updateProgress();
  updateMarker(currentSpot);
  renderUnlockedList();

  if (isFirstCorrect) {
    effectRunning = true;
    closeSheet();
    await waitMs(120);
    await animateIconToMap(currentSpot.spot_id);
    updateMapCollectionUI();
    effectRunning = false;
    return;
  }

  if (isCorrect) {
    setFormMessage("正解です！ このスポットはクリア済みだよ。", "messageSuccess");
    updateMapCollectionUI();

    setTimeout(() => {
      closeSheet();
    }, 1100);
    return;
  }

  setFormMessage("ちがうみたい。もう一度トライしてみよう！", "messageError");
  updateMapCollectionUI();
}

/* =========================
   その他
========================= */
function updateProgress() {
  updateMapCollectionUI();
}

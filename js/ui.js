let tutorialIndex = 0;
const TUTORIAL_TOTAL = 4;
let currentSpot = null;

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
   完成地図の上に透過ピースを重ねる方式
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
    sealBtn.href = SEAL_LINK;
    sealBtn.textContent = "封印を解く";
  } else {
    sealBtn.classList.add("hidden");
    sealBtn.classList.remove("sealReady");
    sealBtn.href = "";
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
  document.getElementById("mapSheetBackdrop").style.display = "none";
  document.getElementById("mapSheet").style.display = "none";
}

function closeMapSheetIfBackdrop(event) {
  if (event.target.id === "mapSheetBackdrop") {
    closeMapSheet();
  }
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
  setFormMessage("");
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
  const wrap = document.getElementById("compareWrap");
  if (!wrap) return;
  wrap.style.setProperty("--divider", value + "%");
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

const API_URL = "https://script.google.com/macros/s/AKfycbx3AGuRyNJe0mDxP5jb-JkkjE1npzYkRYSD2eHZlqceMaR2pvQiESmnxfUGV9kVyBBH/exec";

const OLD_URL = "https://miyasy0525.github.io/gps-test/images/old.jpg?v=6";
const NEW_URL = "https://miyasy0525.github.io/gps-test/images/new.jpg?v=6";

const DRINK_WATER_URL = NEW_URL;

/*
  8枚そろったあと「封印を解く」を押すと再生する動画
  images フォルダ内の final.mp4 を開く
*/
const SEAL_LINK = "images/final.mp4";

/* =========================
   MapTiler
========================= */
const MAPTILER_KEY = "6bM0wJwEREYxPUpDEK46";
const MAPTILER_STYLE_ID = "jp-mierune-streets";
const MAPTILER_TILE_URL = `https://api.maptiler.com/maps/${MAPTILER_STYLE_ID}/{z}/{x}/{y}.jpg?key=${MAPTILER_KEY}`;

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

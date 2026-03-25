let map = null;
let watchId = null;
let userMarker = null;
let userCircle = null;
let lastLat = null;
let lastLon = null;
let latestAccuracy = null;
const markers = {};

/* GPS安定判定用 */
let stableCount = 0;
let stableReference = null;
let gpsLocked = false;
let hasCenteredOnStableLocation = false;

/* =========================
   地図初期化
========================= */
function initMap() {
  if (map) {
    invalidateMapSize(120);
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

  invalidateMapSize(150);
  startWatchingLocation();
}

function invalidateMapSize(delay = 100) {
  if (!map) return;
  setTimeout(() => {
    map.invalidateSize();
  }, delay);
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

function stopWatchingLocation() {
  if (watchId !== null && navigator.geolocation) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
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
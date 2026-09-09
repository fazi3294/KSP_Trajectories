import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  BODIES,
  DISTANCE_SCALE,
  getScaledPosition,
  getScaledSOI,
  getTransferState,
  listTransferBodies,
} from "./ksp-system.js";

const KERBIN_DAYS_PER_YEAR = 426;
const KERBIN_HOURS_PER_DAY = 6;
const SECONDS_PER_DAY = KERBIN_HOURS_PER_DAY * 60 * 60;
const SECONDS_PER_YEAR = KERBIN_DAYS_PER_YEAR * SECONDS_PER_DAY;
const CURSOR_SIZE_PX = 16;
const MOON_VISIBILITY_THRESHOLD = 0.75;
const DEFAULT_RATE_SECONDS = 1;

const viewport = document.querySelector("#viewport");
const labelsRoot = document.querySelector("#labels");
const currentTimeInput = document.querySelector("#current-time");
const currentYearsInput = document.querySelector("#current-years");
const currentDaysInput = document.querySelector("#current-days");
const currentHoursInput = document.querySelector("#current-hours");
const currentMinutesInput = document.querySelector("#current-minutes");
const currentSecondsInput = document.querySelector("#current-seconds");
const timeUTModeInput = document.querySelector("#time-ut-mode");
const timePlayToggle = document.querySelector("#time-play-toggle");
const rateYearsInput = document.querySelector("#rate-years");
const rateDaysInput = document.querySelector("#rate-days");
const rateHoursInput = document.querySelector("#rate-hours");
const rateMinutesInput = document.querySelector("#rate-minutes");
const rateSecondsInput = document.querySelector("#rate-seconds");
const timeModeToggle = document.querySelector("#time-parts-toggle");
const timePartsFields = document.querySelector("#time-parts-fields");
const rateModeToggle = document.querySelector("#rate-parts-toggle");
const ratePartsFields = document.querySelector("#rate-parts-fields");
const departureTimeInput = document.querySelector("#departure-time");
const arrivalTimeInput = document.querySelector("#arrival-time");
const originSelect = document.querySelector("#origin");
const destinationSelect = document.querySelector("#destination");
const showOrbitsInput = document.querySelector("#show-orbits");
const showLabelsInput = document.querySelector("#show-labels");
const showSOIInput = document.querySelector("#show-soi");
const transferSummary = document.querySelector("#transfer-summary");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020617);

const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 5000);
camera.position.set(0, 80, 220);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
viewport.appendChild(renderer.domElement);

const systemOuterRadius =
  BODIES.filter((body) => body.parent === "Kerbol").reduce(
    (maxValue, body) => Math.max(maxValue, body.semiMajorAxis ?? 0, (body.semiMajorAxis ?? 0) + (body.soi ?? 0)),
    0,
  ) * DISTANCE_SCALE;
const maxCameraDistance = (systemOuterRadius / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) * 1.25;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 0.75;
controls.maxDistance = maxCameraDistance;

scene.add(new THREE.AmbientLight(0xffffff, 0.55));
const sunLight = new THREE.PointLight(0xfff4b1, 2.2, 0, 0);
scene.add(sunLight);

const stars = new THREE.Points(
  new THREE.BufferGeometry(),
  new THREE.PointsMaterial({ color: 0xffffff, size: 0.8 }),
);
const starPositions = [];
for (let index = 0; index < 1500; index += 1) {
  starPositions.push((Math.random() - 0.5) * 4000, (Math.random() - 0.5) * 4000, (Math.random() - 0.5) * 4000);
}
stars.geometry.setAttribute("position", new THREE.Float32BufferAttribute(starPositions, 3));
scene.add(stars);

const orbitGroup = new THREE.Group();
const soiGroup = new THREE.Group();
const transferGroup = new THREE.Group();
scene.add(orbitGroup, soiGroup, transferGroup);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const meshEntries = [];
const labelEntries = [];
const bodyStates = new Map();

let currentTimeSeconds = Number(currentTimeInput.value) || 0;
let isPlaying = false;
let isUpdatingTimeInputs = false;
let lastFrameTime = performance.now();
let useCompactTimeControls = false;
let useCompactRateControls = false;

function createLabel(name) {
  const label = document.createElement("div");
  label.className = "scene-label";
  label.textContent = name;
  labelsRoot.appendChild(label);
  return label;
}

function createOrbit(body) {
  if (!body.parent || !body.semiMajorAxis) {
    return null;
  }

  const points = [];
  const inclination = THREE.MathUtils.degToRad(body.inclinationDeg ?? 0);
  for (let index = 0; index <= 256; index += 1) {
    const angle = (index / 256) * Math.PI * 2;
    points.push(
      new THREE.Vector3(
        Math.cos(angle) * body.semiMajorAxis * DISTANCE_SCALE,
        Math.sin(angle) * Math.sin(inclination) * body.semiMajorAxis * DISTANCE_SCALE,
        Math.sin(angle) * Math.cos(inclination) * body.semiMajorAxis * DISTANCE_SCALE,
      ),
    );
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.LineLoop(
    geometry,
    new THREE.LineBasicMaterial({ color: 0x334155, transparent: true, opacity: 0.85 }),
  );
  orbitGroup.add(line);
  return line;
}

for (const body of BODIES) {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 24, 24),
    new THREE.MeshStandardMaterial({
      color: body.color,
      emissive: body.name === "Kerbol" ? body.color : 0x000000,
      emissiveIntensity: body.name === "Kerbol" ? 0.8 : 0,
    }),
  );
  scene.add(mesh);

  const soiMesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.18 }),
  );
  soiGroup.add(soiMesh);

  const label = createLabel(body.name);
  const orbit = createOrbit(body);
  const isMoon = body.parent && body.parent !== "Kerbol";

  bodyStates.set(body.name, { body, mesh, soiMesh, orbit, label, isMoon });
  meshEntries.push({ body, mesh });
  labelEntries.push({ body, mesh, label, isMoon });
}

const transferCurve = new THREE.Line(
  new THREE.BufferGeometry(),
  new THREE.LineBasicMaterial({ color: 0xff8c42 }),
);
const shipMarker = new THREE.Mesh(
  new THREE.SphereGeometry(0.6, 16, 16),
  new THREE.MeshBasicMaterial({ color: 0xffffff }),
);
transferGroup.add(transferCurve, shipMarker);

function populateSelectors() {
  const names = listTransferBodies();
  for (const select of [originSelect, destinationSelect]) {
    for (const name of names) {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      select.appendChild(option);
    }
  }

  originSelect.value = "Kerbin";
  destinationSelect.value = "Duna";
}

function resizeRenderer() {
  const { clientWidth, clientHeight } = viewport;
  renderer.setSize(clientWidth, clientHeight, false);
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
}

function clampTimeValue(value) {
  if (!Number.isFinite(value)) {
    return 0;
  }
  return Math.max(0, value);
}

function parseIntegerInput(input, fallback = 0) {
  const value = Number(input.value);
  if (!Number.isFinite(value)) {
    return fallback;
  }
  return Math.max(0, Math.floor(value));
}

function secondsToTimeParts(totalSeconds, asUT) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  let remaining = safeSeconds;

  const yearsElapsed = Math.floor(remaining / SECONDS_PER_YEAR);
  remaining -= yearsElapsed * SECONDS_PER_YEAR;

  const daysElapsed = Math.floor(remaining / SECONDS_PER_DAY);
  remaining -= daysElapsed * SECONDS_PER_DAY;

  const hours = Math.floor(remaining / 3600);
  remaining -= hours * 3600;

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining - minutes * 60;

  if (asUT) {
    return {
      years: yearsElapsed + 1,
      days: daysElapsed + 1,
      hours,
      minutes,
      seconds,
    };
  }

  return {
    years: yearsElapsed,
    days: daysElapsed,
    hours,
    minutes,
    seconds,
  };
}

function timePartsToSeconds(parts, asUT) {
  const years = Math.max(0, Math.floor(parts.years));
  const days = Math.max(0, Math.floor(parts.days));
  const hours = Math.max(0, Math.floor(parts.hours));
  const minutes = Math.max(0, Math.floor(parts.minutes));
  const seconds = Math.max(0, Math.floor(parts.seconds));

  if (asUT) {
    const yearsElapsed = Math.max(0, years - 1);
    const daysElapsed = Math.max(0, days - 1);
    return (
      yearsElapsed * SECONDS_PER_YEAR +
      daysElapsed * SECONDS_PER_DAY +
      hours * 3600 +
      minutes * 60 +
      seconds
    );
  }

  return years * SECONDS_PER_YEAR + days * SECONDS_PER_DAY + hours * 3600 + minutes * 60 + seconds;
}

function syncTimeInputsFromSeconds() {
  isUpdatingTimeInputs = true;
  currentTimeInput.value = String(Math.floor(currentTimeSeconds));

  const parts = secondsToTimeParts(currentTimeSeconds, timeUTModeInput.checked);
  currentYearsInput.value = String(parts.years);
  currentDaysInput.value = String(parts.days);
  currentHoursInput.value = String(parts.hours);
  currentMinutesInput.value = String(parts.minutes);
  currentSecondsInput.value = String(parts.seconds);
  isUpdatingTimeInputs = false;
}

function updateCurrentTimeFromSecondsInput() {
  if (isUpdatingTimeInputs) {
    return;
  }

  currentTimeSeconds = clampTimeValue(Number(currentTimeInput.value));
  syncTimeInputsFromSeconds();
}

function updateCurrentTimeFromPartsInputs() {
  if (isUpdatingTimeInputs) {
    return;
  }

  currentTimeSeconds = timePartsToSeconds(
    {
      years: parseIntegerInput(currentYearsInput),
      days: parseIntegerInput(currentDaysInput),
      hours: parseIntegerInput(currentHoursInput),
      minutes: parseIntegerInput(currentMinutesInput),
      seconds: parseIntegerInput(currentSecondsInput),
    },
    timeUTModeInput.checked,
  );

  syncTimeInputsFromSeconds();
}

function getCurrentTime() {
  return currentTimeSeconds;
}

function getPlaybackRateSecondsPerSecond() {
  return timePartsToSeconds(
    {
      years: parseIntegerInput(rateYearsInput),
      days: parseIntegerInput(rateDaysInput),
      hours: parseIntegerInput(rateHoursInput),
      minutes: parseIntegerInput(rateMinutesInput),
      seconds: parseIntegerInput(rateSecondsInput),
    },
    false,
  ) || DEFAULT_RATE_SECONDS;
}

function toVector(position) {
  return new THREE.Vector3(position.x, position.y, position.z);
}

function getWorldUnitsPerPixel(distance) {
  if (renderer.domElement.clientHeight <= 0) {
    return 0;
  }

  return (2 * distance * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) / renderer.domElement.clientHeight;
}

function getProjectedScreenDiameter(worldRadius, position) {
  const distance = Math.max(camera.position.distanceTo(position), 0.0001);
  const unitsPerPixel = getWorldUnitsPerPixel(distance);
  if (unitsPerPixel <= 0) {
    return 0;
  }
  return (worldRadius * 2) / unitsPerPixel;
}

function getMarkerDiameterPx(body) {
  return body.name === "Kerbol" ? CURSOR_SIZE_PX * 2 : CURSOR_SIZE_PX;
}

function getDisplayRadius(body, mesh) {
  const physicalRadius = body.radius * DISTANCE_SCALE;
  const distance = Math.max(camera.position.distanceTo(mesh.position), 0.0001);
  const unitsPerPixel = getWorldUnitsPerPixel(distance);
  const markerRadius = unitsPerPixel > 0 ? (getMarkerDiameterPx(body) * 0.5) * unitsPerPixel : 0;
  return Math.max(physicalRadius, markerRadius);
}

function getVisibleMoonParent() {
  const thresholdPixels = Math.min(renderer.domElement.clientWidth, renderer.domElement.clientHeight) * MOON_VISIBILITY_THRESHOLD;
  let visibleParent = null;
  let bestDiameter = 0;

  for (const { body, mesh } of bodyStates.values()) {
    if (body.parent !== "Kerbol" || !body.soi) {
      continue;
    }

    const soiDiameter = getProjectedScreenDiameter(getScaledSOI(body), mesh.position);
    if (soiDiameter >= thresholdPixels && soiDiameter > bestDiameter) {
      visibleParent = body.name;
      bestDiameter = soiDiameter;
    }
  }

  return visibleParent;
}

function updateBodies(timeSeconds) {
  for (const { body, mesh, soiMesh, orbit } of bodyStates.values()) {
    const scaledPosition = getScaledPosition(body.name, timeSeconds);
    mesh.position.set(scaledPosition.x, scaledPosition.y, scaledPosition.z);

    soiMesh.position.copy(mesh.position);

    if (orbit) {
      const parentPosition = getScaledPosition(body.parent, timeSeconds);
      orbit.position.set(parentPosition.x, parentPosition.y, parentPosition.z);
    }
  }

  const visibleMoonParent = getVisibleMoonParent();

  for (const { body, mesh, soiMesh, orbit, isMoon } of bodyStates.values()) {
    const showMoon = !isMoon || body.parent === visibleMoonParent;
    mesh.visible = showMoon;
    mesh.scale.setScalar(getDisplayRadius(body, mesh));

    soiMesh.scale.setScalar(getScaledSOI(body));
    soiMesh.visible = showMoon && Boolean(body.soi) && showSOIInput.checked;

    if (orbit) {
      orbit.visible = showMoon && showOrbitsInput.checked;
    }
  }
}

function buildTransferCurve(start, end) {
  const startVector = toVector(start);
  const endVector = toVector(end);
  const centerBias = startVector.clone().add(endVector);
  if (centerBias.lengthSq() === 0) {
    centerBias.set(0, 12, 0);
  } else {
    centerBias.normalize().multiplyScalar(Math.max(startVector.length(), endVector.length(), 12) * 0.35);
  }

  const normal = new THREE.Vector3().crossVectors(startVector, endVector);
  if (normal.lengthSq() === 0) {
    normal.set(0, 1, 0);
  } else {
    normal.normalize().multiplyScalar(centerBias.length() * 0.35);
  }

  return new THREE.CubicBezierCurve3(
    startVector,
    startVector.clone().lerp(endVector, 0.3).add(centerBias).add(normal),
    startVector.clone().lerp(endVector, 0.7).add(centerBias).sub(normal),
    endVector,
  );
}

function updateTransfer() {
  const state = getTransferState(
    originSelect.value,
    destinationSelect.value,
    Number(departureTimeInput.value),
    Number(arrivalTimeInput.value),
    getCurrentTime(),
  );

  if (!state.valid) {
    transferCurve.visible = false;
    shipMarker.visible = false;
    transferSummary.textContent = state.reason;
    return;
  }

  const curve = buildTransferCurve(state.start, state.end);
  transferCurve.geometry.dispose();
  transferCurve.geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(160));
  transferCurve.visible = true;

  shipMarker.position.copy(curve.getPoint(state.progress));
  shipMarker.visible = state.shipVisible;

  transferSummary.textContent = `Trajektoria: ${originSelect.value} → ${destinationSelect.value}, postęp lotu: ${Math.round(
    state.progress * 100,
  )}%`;
}

function updateLabels() {
  for (const { mesh, label } of labelEntries) {
    if (!showLabelsInput.checked || !mesh.visible) {
      label.style.display = "none";
      continue;
    }

    const projected = mesh.position.clone().project(camera);
    const visible = projected.z >= -1 && projected.z <= 1;
    label.style.display = visible ? "block" : "none";
    if (!visible) {
      continue;
    }

    label.style.left = `${((projected.x + 1) * 0.5) * renderer.domElement.clientWidth}px`;
    label.style.top = `${((-projected.y + 1) * 0.5) * renderer.domElement.clientHeight}px`;
  }
}

function focusOnBody(bodyName) {
  const state = bodyStates.get(bodyName);
  if (!state) {
    return;
  }

  controls.target.copy(state.mesh.position);
  const offset = camera.position
    .clone()
    .sub(controls.target)
    .normalize()
    .multiplyScalar(Math.max(getDisplayRadius(state.body, state.mesh) * 3, 6));
  camera.position.copy(state.mesh.position.clone().add(offset));
  controls.update();
}

renderer.domElement.addEventListener("dblclick", (event) => {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);

  const hits = raycaster.intersectObjects(
    meshEntries.filter(({ mesh }) => mesh.visible).map(({ mesh }) => mesh),
  );
  if (hits.length === 0) {
    return;
  }

  const match = meshEntries.find(({ mesh }) => mesh === hits[0].object);
  if (match) {
    focusOnBody(match.body.name);
  }
});

function togglePlayback() {
  isPlaying = !isPlaying;
  timePlayToggle.textContent = isPlaying ? "Pause" : "Play";
}

function setCompactVisibility(enabled, fields, toggle) {
  if (fields) {
    fields.hidden = enabled;
  }
  if (toggle) {
    toggle.textContent = enabled ? "Pokaż pola" : "Uprość do sekund";
  }
}

function updateTimeModeUI() {
  setCompactVisibility(useCompactTimeControls, timePartsFields, timeModeToggle);
  setCompactVisibility(useCompactRateControls, ratePartsFields, rateModeToggle);
}

function render(frameTime) {
  const deltaSeconds = Math.max(0, (frameTime - lastFrameTime) / 1000);
  lastFrameTime = frameTime;

  if (isPlaying) {
    currentTimeSeconds += deltaSeconds * getPlaybackRateSecondsPerSecond();
    syncTimeInputsFromSeconds();
  }

  updateBodies(getCurrentTime());
  updateTransfer();
  updateLabels();
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

currentTimeInput.addEventListener("input", updateCurrentTimeFromSecondsInput);
for (const input of [currentYearsInput, currentDaysInput, currentHoursInput, currentMinutesInput, currentSecondsInput]) {
  input.addEventListener("input", updateCurrentTimeFromPartsInputs);
}

if (timeUTModeInput) {
  timeUTModeInput.addEventListener("change", () => {
    syncTimeInputsFromSeconds();
  });
}

if (timeModeToggle) {
  timeModeToggle.addEventListener("click", () => {
    useCompactTimeControls = !useCompactTimeControls;
    updateTimeModeUI();
  });
}

if (rateModeToggle) {
  rateModeToggle.addEventListener("click", () => {
    useCompactRateControls = !useCompactRateControls;
    updateTimeModeUI();
  });
}

timePlayToggle.addEventListener("click", togglePlayback);

for (const element of [
  departureTimeInput,
  arrivalTimeInput,
  originSelect,
  destinationSelect,
  showOrbitsInput,
  showLabelsInput,
  showSOIInput,
]) {
  element.addEventListener("input", () => {
    updateTransfer();
  });
  element.addEventListener("change", () => {
    updateTransfer();
  });
}

populateSelectors();
syncTimeInputsFromSeconds();
updateTimeModeUI();
resizeRenderer();
window.addEventListener("resize", resizeRenderer);
focusOnBody("Kerbin");
requestAnimationFrame(render);

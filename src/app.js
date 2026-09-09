import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  BODIES,
  DISTANCE_SCALE,
  getBodyOrbitPoints,
  getScaledPosition,
  getScaledSOI,
} from "./ksp-system.js";
import { secondsToTimeParts, timePartsToSeconds } from "./time.js";

const CURSOR_SIZE_PX = 16;
const MOON_VISIBILITY_THRESHOLD = 0.75;
const DEFAULT_RATE_SECONDS = 1;

const layoutRoot = document.querySelector("#layout");
const panelToggle = document.querySelector("#panel-toggle");
const viewport = document.querySelector("#viewport");
const labelsRoot = document.querySelector("#labels");
const currentTimeInput = document.querySelector("#current-time");
const currentTimeSecondsField = document.querySelector("#current-time-seconds-field");
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
const rateTimeInput = document.querySelector("#rate-time");
const rateTimeSecondsField = document.querySelector("#rate-time-seconds-field");
const timeModeToggle = document.querySelector("#time-parts-toggle");
const timePartsFields = document.querySelector("#time-parts-fields");
const rateModeToggle = document.querySelector("#rate-parts-toggle");
const ratePartsFields = document.querySelector("#rate-parts-fields");
const showOrbitsInput = document.querySelector("#show-orbits");
const showLabelsInput = document.querySelector("#show-labels");
const showSOIInput = document.querySelector("#show-soi");
const showEclipticInput = document.querySelector("#show-ecliptic");
const panelWidthInput = document.querySelector("#panel-width");
const panelWidthValue = document.querySelector("#panel-width-value");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020617);

const camera = new THREE.PerspectiveCamera(60, 1, 0.01, 5000);
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
controls.minDistance = 0.05;
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
scene.add(orbitGroup, soiGroup);
const eclipticPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(systemOuterRadius * 2.4, systemOuterRadius * 2.4),
  new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.06,
    depthWrite: false,
    side: THREE.DoubleSide,
  }),
);
eclipticPlane.rotation.x = -Math.PI / 2;
scene.add(eclipticPlane);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const meshEntries = [];
const labelEntries = [];
const bodyStates = new Map();

let currentTimeSeconds = Number(currentTimeInput.value) || 0;
let playbackRateSecondsPerSecond = Math.max(DEFAULT_RATE_SECONDS, Number(rateTimeInput?.value) || DEFAULT_RATE_SECONDS);
let isPlaying = false;
let isUpdatingTimeInputs = false;
let isUpdatingRateInputs = false;
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

  const geometry = new THREE.BufferGeometry().setFromPoints(
    getBodyOrbitPoints(body.name).map(
      (point) => new THREE.Vector3(point.x * DISTANCE_SCALE, point.y * DISTANCE_SCALE, point.z * DISTANCE_SCALE),
    ),
  );
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

function syncTimeInputsFromSeconds() {
  isUpdatingTimeInputs = true;
  currentTimeInput.value = String(Math.floor(currentTimeSeconds));

  const parts = secondsToTimeParts(currentTimeSeconds, !timeUTModeInput.checked);
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
    !timeUTModeInput.checked,
  );

  syncTimeInputsFromSeconds();
}

function getCurrentTime() {
  return currentTimeSeconds;
}

function syncRateInputsFromSeconds() {
  isUpdatingRateInputs = true;
  const wholeSeconds = Math.floor(playbackRateSecondsPerSecond);
  if (rateTimeInput) {
    rateTimeInput.value = String(wholeSeconds);
  }

  const parts = secondsToTimeParts(wholeSeconds, false);
  rateYearsInput.value = String(parts.years);
  rateDaysInput.value = String(parts.days);
  rateHoursInput.value = String(parts.hours);
  rateMinutesInput.value = String(parts.minutes);
  rateSecondsInput.value = String(parts.seconds);
  isUpdatingRateInputs = false;
}

function updateRateFromSecondsInput() {
  if (isUpdatingRateInputs || !rateTimeInput) {
    return;
  }

  playbackRateSecondsPerSecond = clampTimeValue(Number(rateTimeInput.value)) || DEFAULT_RATE_SECONDS;
  syncRateInputsFromSeconds();
}

function updateRateFromPartsInputs() {
  if (isUpdatingRateInputs) {
    return;
  }

  playbackRateSecondsPerSecond =
    timePartsToSeconds(
      {
        years: parseIntegerInput(rateYearsInput),
        days: parseIntegerInput(rateDaysInput),
        hours: parseIntegerInput(rateHoursInput),
        minutes: parseIntegerInput(rateMinutesInput),
        seconds: parseIntegerInput(rateSecondsInput),
      },
      false,
    ) || DEFAULT_RATE_SECONDS;
  syncRateInputsFromSeconds();
}

function getPlaybackRateSecondsPerSecond() {
  return playbackRateSecondsPerSecond || DEFAULT_RATE_SECONDS;
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

  const targetOffset = state.mesh.position.clone().sub(controls.target);
  controls.target.copy(state.mesh.position);
  camera.position.add(targetOffset);
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

function setCompactVisibility(enabled, secondsField, fields, toggle) {
  if (secondsField) {
    secondsField.hidden = !enabled;
  }
  if (fields) {
    fields.hidden = Boolean(enabled);
  }
  if (toggle) {
    toggle.textContent = enabled ? "Pokaż Y/D/H/m/s" : "Uprość do sekund";
  }
}

function updateTimeModeUI() {
  setCompactVisibility(useCompactTimeControls, currentTimeSecondsField, timePartsFields, timeModeToggle);
  setCompactVisibility(useCompactRateControls, rateTimeSecondsField, ratePartsFields, rateModeToggle);
}

function updatePanelWidth() {
  if (!panelWidthInput || !layoutRoot) {
    return;
  }

  const width = Math.max(280, Math.min(640, Number(panelWidthInput.value) || 420));
  layoutRoot.style.setProperty("--panel-width", `${width}px`);
  if (panelWidthValue) {
    panelWidthValue.textContent = `${width}px`;
  }
}

function render(frameTime) {
  const deltaSeconds = Math.max(0, (frameTime - lastFrameTime) / 1000);
  lastFrameTime = frameTime;

  if (isPlaying) {
    currentTimeSeconds += deltaSeconds * getPlaybackRateSecondsPerSecond();
    syncTimeInputsFromSeconds();
  }

  updateBodies(getCurrentTime());
  updateLabels();
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

currentTimeInput.addEventListener("input", updateCurrentTimeFromSecondsInput);
for (const input of [currentYearsInput, currentDaysInput, currentHoursInput, currentMinutesInput, currentSecondsInput]) {
  input.addEventListener("input", updateCurrentTimeFromPartsInputs);
}
for (const input of [rateYearsInput, rateDaysInput, rateHoursInput, rateMinutesInput, rateSecondsInput]) {
  input.addEventListener("input", updateRateFromPartsInputs);
}
if (rateTimeInput) {
  rateTimeInput.addEventListener("input", updateRateFromSecondsInput);
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

if (showEclipticInput) {
  showEclipticInput.addEventListener("change", () => {
    eclipticPlane.visible = showEclipticInput.checked;
  });
  eclipticPlane.visible = showEclipticInput.checked;
}

if (panelWidthInput) {
  panelWidthInput.addEventListener("input", updatePanelWidth);
  updatePanelWidth();
}

if (panelToggle && layoutRoot) {
  panelToggle.addEventListener("click", () => {
    const isCollapsed = layoutRoot.classList.toggle("panel-collapsed");
    panelToggle.textContent = isCollapsed ? "▶" : "◀";
    panelToggle.setAttribute("aria-expanded", String(!isCollapsed));
    panelToggle.setAttribute("aria-label", isCollapsed ? "Pokaż panel ustawień" : "Ukryj panel ustawień");
    panelToggle.title = isCollapsed ? "Pokaż panel ustawień" : "Ukryj panel ustawień";
    resizeRenderer();
  });
}

timePlayToggle.addEventListener("click", togglePlayback);
syncTimeInputsFromSeconds();
syncRateInputsFromSeconds();
updateTimeModeUI();
resizeRenderer();
window.addEventListener("resize", resizeRenderer);
focusOnBody("Kerbin");
requestAnimationFrame(render);

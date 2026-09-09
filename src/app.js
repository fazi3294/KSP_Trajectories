import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  BODIES,
  DISTANCE_SCALE,
  MIN_BODY_RADIUS_FACTOR,
  getBody,
  getScaledPosition,
  getScaledRadius,
  getScaledSOI,
  getTransferState,
  listTransferBodies,
} from "./ksp-system.js";

const viewport = document.querySelector("#viewport");
const labelsRoot = document.querySelector("#labels");
const currentTimeInput = document.querySelector("#current-time");
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

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 3;
controls.maxDistance = 1800;

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

  bodyStates.set(body.name, { body, mesh, soiMesh, orbit, label });
  meshEntries.push({ body, mesh });
  labelEntries.push({ mesh, label });
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

function getCurrentTime() {
  return Number(currentTimeInput.value) || 0;
}

function toVector(position) {
  return new THREE.Vector3(position.x, position.y, position.z);
}

function getDisplayRadius(body, mesh) {
  const base = getScaledRadius(body);
  const distance = camera.position.distanceTo(mesh.position);
  return Math.max(base, distance * MIN_BODY_RADIUS_FACTOR);
}

function updateBodies(timeSeconds) {
  for (const { body, mesh, soiMesh, orbit } of bodyStates.values()) {
    const scaledPosition = getScaledPosition(body.name, timeSeconds);
    mesh.position.set(scaledPosition.x, scaledPosition.y, scaledPosition.z);
    mesh.scale.setScalar(getDisplayRadius(body, mesh));

    soiMesh.position.copy(mesh.position);
    soiMesh.scale.setScalar(getScaledSOI(body));
    soiMesh.visible = Boolean(body.soi) && showSOIInput.checked;

    if (orbit) {
      const parentPosition = getScaledPosition(body.parent, timeSeconds);
      orbit.position.set(parentPosition.x, parentPosition.y, parentPosition.z);
      orbit.visible = showOrbitsInput.checked;
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
    if (!showLabelsInput.checked) {
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
  const offset = camera.position.clone().sub(controls.target).normalize().multiplyScalar(Math.max(getDisplayRadius(state.body, state.mesh) * 8, 16));
  camera.position.copy(state.mesh.position.clone().add(offset));
  controls.update();
}

renderer.domElement.addEventListener("dblclick", (event) => {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);

  const hits = raycaster.intersectObjects(meshEntries.map(({ mesh }) => mesh));
  if (hits.length === 0) {
    return;
  }

  const match = meshEntries.find(({ mesh }) => mesh === hits[0].object);
  if (match) {
    focusOnBody(match.body.name);
  }
});

function render() {
  const timeSeconds = getCurrentTime();
  updateBodies(timeSeconds);
  updateTransfer();
  updateLabels();
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

for (const element of [
  currentTimeInput,
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
resizeRenderer();
window.addEventListener("resize", resizeRenderer);
focusOnBody("Kerbin");
render();

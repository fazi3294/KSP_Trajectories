export const DISTANCE_SCALE = 1 / 400000000;
export const RADIUS_SCALE = 1 / 120000;
export const MIN_BODY_RADIUS_FACTOR = 0.008;

export const BODIES = [
  { name: "Kerbol", parent: null, radius: 261600000, color: 0xffd166 },
  {
    name: "Moho",
    parent: "Kerbol",
    semiMajorAxis: 5263138304,
    orbitalPeriod: 2215754,
    eccentricity: 0.200000003,
    inclinationDeg: 7,
    longitudeOfAscendingNodeDeg: 70,
    argumentOfPeriapsisDeg: 15,
    meanAnomalyAtEpochRad: 3.14,
    radius: 250000,
    soi: 11206449,
    color: 0xb88f61,
  },
  {
    name: "Eve",
    parent: "Kerbol",
    semiMajorAxis: 9832684544,
    orbitalPeriod: 5657995,
    eccentricity: 0.01,
    inclinationDeg: 2.099999905,
    longitudeOfAscendingNodeDeg: 15,
    argumentOfPeriapsisDeg: 0,
    meanAnomalyAtEpochRad: 3.14,
    radius: 700000,
    soi: 85109365,
    color: 0xb96ad9,
  },
  {
    name: "Gilly",
    parent: "Eve",
    semiMajorAxis: 31500000,
    orbitalPeriod: 388587,
    eccentricity: 0.55,
    inclinationDeg: 12,
    longitudeOfAscendingNodeDeg: 80,
    argumentOfPeriapsisDeg: 10,
    meanAnomalyAtEpochRad: 0.9,
    radius: 13000,
    soi: 126123,
    color: 0xdbc9a2,
  },
  {
    name: "Kerbin",
    parent: "Kerbol",
    semiMajorAxis: 13599840256,
    orbitalPeriod: 9203545,
    eccentricity: 0,
    inclinationDeg: 0,
    longitudeOfAscendingNodeDeg: 0,
    argumentOfPeriapsisDeg: 0,
    meanAnomalyAtEpochRad: 3.14,
    radius: 600000,
    soi: 84159286,
    color: 0x5fb2ff,
  },
  {
    name: "Mun",
    parent: "Kerbin",
    semiMajorAxis: 12000000,
    orbitalPeriod: 138984,
    eccentricity: 0,
    inclinationDeg: 0,
    longitudeOfAscendingNodeDeg: 0,
    argumentOfPeriapsisDeg: 0,
    meanAnomalyAtEpochRad: 1.7,
    radius: 200000,
    soi: 2429559,
    color: 0xb8bcc4,
  },
  {
    name: "Minmus",
    parent: "Kerbin",
    semiMajorAxis: 47000000,
    orbitalPeriod: 1077311,
    eccentricity: 0,
    inclinationDeg: 6,
    longitudeOfAscendingNodeDeg: 78,
    argumentOfPeriapsisDeg: 38,
    meanAnomalyAtEpochRad: 0.9,
    radius: 60000,
    soi: 2247428,
    color: 0x8de2c8,
  },
  {
    name: "Duna",
    parent: "Kerbol",
    semiMajorAxis: 20726155264,
    orbitalPeriod: 17315400,
    eccentricity: 0.051,
    inclinationDeg: 0.06,
    longitudeOfAscendingNodeDeg: 135.5,
    argumentOfPeriapsisDeg: 0,
    meanAnomalyAtEpochRad: 3.14,
    radius: 320000,
    soi: 47921949,
    color: 0xd07a44,
  },
  {
    name: "Ike",
    parent: "Duna",
    semiMajorAxis: 3200000,
    orbitalPeriod: 65518,
    eccentricity: 0.03,
    inclinationDeg: 0.2,
    longitudeOfAscendingNodeDeg: 0,
    argumentOfPeriapsisDeg: 0,
    meanAnomalyAtEpochRad: 1.7,
    radius: 130000,
    soi: 1049598,
    color: 0x8f7a63,
  },
  {
    name: "Dres",
    parent: "Kerbol",
    semiMajorAxis: 40839348203,
    orbitalPeriod: 47893063,
    eccentricity: 0.145,
    inclinationDeg: 5,
    longitudeOfAscendingNodeDeg: 280,
    argumentOfPeriapsisDeg: 90,
    meanAnomalyAtEpochRad: 3.14,
    radius: 138000,
    soi: 32832840,
    color: 0xc5c4d8,
  },
  {
    name: "Jool",
    parent: "Kerbol",
    semiMajorAxis: 68773560320,
    orbitalPeriod: 104661432,
    eccentricity: 0.05,
    inclinationDeg: 1.304,
    longitudeOfAscendingNodeDeg: 52,
    argumentOfPeriapsisDeg: 0,
    meanAnomalyAtEpochRad: 0.1,
    radius: 6000000,
    soi: 2455985200,
    color: 0x90d76e,
  },
  {
    name: "Laythe",
    parent: "Jool",
    semiMajorAxis: 27184000,
    orbitalPeriod: 52981,
    eccentricity: 0,
    inclinationDeg: 0,
    longitudeOfAscendingNodeDeg: 0,
    argumentOfPeriapsisDeg: 0,
    meanAnomalyAtEpochRad: 3.14,
    radius: 500000,
    soi: 3723645,
    color: 0x6ad9c6,
  },
  {
    name: "Vall",
    parent: "Jool",
    semiMajorAxis: 43152000,
    orbitalPeriod: 105962,
    eccentricity: 0,
    inclinationDeg: 0,
    longitudeOfAscendingNodeDeg: 0,
    argumentOfPeriapsisDeg: 0,
    meanAnomalyAtEpochRad: 0.9,
    radius: 300000,
    soi: 2406401,
    color: 0xc7e9ef,
  },
  {
    name: "Tylo",
    parent: "Jool",
    semiMajorAxis: 68500000,
    orbitalPeriod: 211926,
    eccentricity: 0,
    inclinationDeg: 0.025,
    longitudeOfAscendingNodeDeg: 0,
    argumentOfPeriapsisDeg: 0,
    meanAnomalyAtEpochRad: 3.14,
    radius: 600000,
    soi: 10856518,
    color: 0xcbc0b3,
  },
  {
    name: "Bop",
    parent: "Jool",
    semiMajorAxis: 128500000,
    orbitalPeriod: 544507,
    eccentricity: 0.235,
    inclinationDeg: 15,
    longitudeOfAscendingNodeDeg: 10,
    argumentOfPeriapsisDeg: 25,
    meanAnomalyAtEpochRad: 0.9,
    radius: 65000,
    soi: 1221060,
    color: 0xa3825b,
  },
  {
    name: "Pol",
    parent: "Jool",
    semiMajorAxis: 179890000,
    orbitalPeriod: 901903,
    eccentricity: 0.17085,
    inclinationDeg: 4.25,
    longitudeOfAscendingNodeDeg: 2,
    argumentOfPeriapsisDeg: 15,
    meanAnomalyAtEpochRad: 0.9,
    radius: 44000,
    soi: 1042138,
    color: 0xe9cd76,
  },
  {
    name: "Eeloo",
    parent: "Kerbol",
    semiMajorAxis: 90118820000,
    orbitalPeriod: 156992048,
    eccentricity: 0.26,
    inclinationDeg: 6.15,
    longitudeOfAscendingNodeDeg: 50,
    argumentOfPeriapsisDeg: 260,
    meanAnomalyAtEpochRad: 3.14,
    radius: 210000,
    soi: 119082940,
    color: 0xe6efff,
  },
];

const bodyMap = new Map(BODIES.map((body) => [body.name, body]));

const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;
const TAU = Math.PI * 2;

const addVectors = (left, right) => ({
  x: left.x + right.x,
  y: left.y + right.y,
  z: left.z + right.z,
});

const rotateInReferencePlane = (vector, angle) => ({
  x: vector.x * Math.cos(angle) - vector.z * Math.sin(angle),
  y: vector.y,
  z: vector.x * Math.sin(angle) + vector.z * Math.cos(angle),
});

const rotateAroundXAxis = (vector, angle) => ({
  x: vector.x,
  y: vector.y * Math.cos(angle) + vector.z * Math.sin(angle),
  z: -vector.y * Math.sin(angle) + vector.z * Math.cos(angle),
});

const normalizeAngle = (angle) => {
  const normalized = angle % TAU;
  return normalized < 0 ? normalized + TAU : normalized;
};

function solveEccentricAnomaly(meanAnomaly, eccentricity) {
  if (eccentricity === 0) {
    return meanAnomaly;
  }

  let eccentricAnomaly = eccentricity < 0.8 ? meanAnomaly : Math.PI;

  for (let iteration = 0; iteration < 12; iteration += 1) {
    const numerator = eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly) - meanAnomaly;
    const denominator = 1 - eccentricity * Math.cos(eccentricAnomaly);
    const delta = numerator / denominator;
    eccentricAnomaly -= delta;

    if (Math.abs(delta) < 1e-12) {
      break;
    }
  }

  return eccentricAnomaly;
}

function transformOrbitalPlanePosition(body, position) {
  let transformed = rotateInReferencePlane(position, degreesToRadians(body.argumentOfPeriapsisDeg ?? 0));
  transformed = rotateAroundXAxis(transformed, degreesToRadians(body.inclinationDeg ?? 0));
  return rotateInReferencePlane(transformed, degreesToRadians(body.longitudeOfAscendingNodeDeg ?? 0));
}

function getBodyPositionInParentFrame(body, timeSeconds) {
  const eccentricity = body.eccentricity ?? 0;
  const meanMotion = TAU / body.orbitalPeriod;
  const meanAnomaly = normalizeAngle((body.meanAnomalyAtEpochRad ?? 0) + timeSeconds * meanMotion);
  const eccentricAnomaly = solveEccentricAnomaly(meanAnomaly, eccentricity);
  const semiMinorAxis = body.semiMajorAxis * Math.sqrt(1 - eccentricity ** 2);

  return transformOrbitalPlanePosition(body, {
    x: body.semiMajorAxis * (Math.cos(eccentricAnomaly) - eccentricity),
    y: 0,
    z: semiMinorAxis * Math.sin(eccentricAnomaly),
  });
}

export function getBody(name) {
  return bodyMap.get(name);
}

export function getBodyOrbitPoints(bodyName, segments = 256) {
  const body = getBody(bodyName);

  if (!body) {
    throw new Error(`Unknown body: ${bodyName}`);
  }

  if (!body.parent || !body.semiMajorAxis) {
    return [];
  }

  const eccentricity = body.eccentricity ?? 0;
  const semiMinorAxis = body.semiMajorAxis * Math.sqrt(1 - eccentricity ** 2);
  const points = [];

  for (let index = 0; index <= segments; index += 1) {
    const eccentricAnomaly = (index / segments) * TAU;
    points.push(
      transformOrbitalPlanePosition(body, {
        x: body.semiMajorAxis * (Math.cos(eccentricAnomaly) - eccentricity),
        y: 0,
        z: semiMinorAxis * Math.sin(eccentricAnomaly),
      }),
    );
  }

  return points;
}

export function getBodyPosition(bodyName, timeSeconds) {
  const body = getBody(bodyName);

  if (!body) {
    throw new Error(`Unknown body: ${bodyName}`);
  }

  if (!body.parent) {
    return { x: 0, y: 0, z: 0 };
  }

  return addVectors(getBodyPosition(body.parent, timeSeconds), getBodyPositionInParentFrame(body, timeSeconds));
}

export function getScaledPosition(bodyName, timeSeconds) {
  const position = getBodyPosition(bodyName, timeSeconds);

  return {
    x: position.x * DISTANCE_SCALE,
    y: position.y * DISTANCE_SCALE,
    z: position.z * DISTANCE_SCALE,
  };
}

export function getScaledRadius(body) {
  return Math.max(Math.cbrt(body.radius) / 20, 0.18);
}

export function getScaledSOI(body) {
  return body.soi ? body.soi * DISTANCE_SCALE : 0;
}

export function listTransferBodies() {
  return BODIES.filter((body) => body.parent).map((body) => body.name);
}

export function getTransferState(originName, destinationName, departureTime, arrivalTime, currentTime) {
  if (originName === destinationName) {
    return { valid: false, reason: "Start i cel muszą być różne." };
  }

  if (!Number.isFinite(departureTime) || !Number.isFinite(arrivalTime) || arrivalTime <= departureTime) {
    return { valid: false, reason: "Czas przybycia musi być większy od czasu odlotu." };
  }

  const start = getScaledPosition(originName, departureTime);
  const end = getScaledPosition(destinationName, arrivalTime);
  const rawProgress = (currentTime - departureTime) / (arrivalTime - departureTime);
  const progress = Math.max(0, Math.min(1, rawProgress));

  return {
    valid: true,
    progress,
    shipVisible: currentTime >= departureTime && currentTime <= arrivalTime,
    start,
    end,
  };
}

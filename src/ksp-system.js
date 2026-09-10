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
const DEFAULT_SEARCH_STEP = 60 * 60 * 6;
const BODY_MU_BY_PARENT = new Map();
const BODY_MU_BY_NAME = new Map([
  ["Kerbol", 1.1723328e18],
  ["Moho", 1.6860938e11],
  ["Eve", 8.1717307e12],
  ["Gilly", 8.2894498e8],
  ["Kerbin", 3.5316e12],
  ["Mun", 6.5138398e10],
  ["Minmus", 1.7658e9],
  ["Duna", 3.0136321e11],
  ["Ike", 1.8568369e10],
  ["Dres", 2.1484489e10],
  ["Jool", 2.82528e14],
  ["Laythe", 1.962e12],
  ["Vall", 2.074815e11],
  ["Tylo", 2.82528e12],
  ["Bop", 2.4868349e9],
  ["Pol", 7.2170208e8],
  ["Eeloo", 7.4410815e10],
]);

for (const body of BODIES) {
  if (!body.parent || !body.semiMajorAxis || !body.orbitalPeriod || BODY_MU_BY_PARENT.has(body.parent)) {
    continue;
  }

  BODY_MU_BY_PARENT.set(body.parent, (4 * Math.PI * Math.PI * body.semiMajorAxis ** 3) / (body.orbitalPeriod ** 2));
}

const addVectors = (left, right) => ({
  x: left.x + right.x,
  y: left.y + right.y,
  z: left.z + right.z,
});

const scaleVector = (vector, scalar) => ({
  x: vector.x * scalar,
  y: vector.y * scalar,
  z: vector.z * scalar,
});

const rotateInReferencePlane = (vector, angle) => ({
  x: vector.x * Math.cos(angle) + vector.z * Math.sin(angle),
  y: vector.y,
  z: -vector.x * Math.sin(angle) + vector.z * Math.cos(angle),
});

const rotateAroundXAxis = (vector, angle) => ({
  x: vector.x,
  y: vector.y * Math.cos(angle) - vector.z * Math.sin(angle),
  z: vector.y * Math.sin(angle) + vector.z * Math.cos(angle),
});

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
  // The rendered reference plane is viewed from +Z, so increasing the
  // orbital angle must be propagated backwards to appear counterclockwise.
  const meanAnomaly = normalizeAngle((body.meanAnomalyAtEpochRad ?? 0) - timeSeconds * meanMotion);
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

function normalizeAngle(angleRadians) {
  const fullTurn = Math.PI * 2;
  let normalized = angleRadians % fullTurn;
  if (normalized < 0) {
    normalized += fullTurn;
  }
  return normalized;
}

function angleDifference(left, right) {
  const fullTurn = Math.PI * 2;
  const delta = normalizeAngle(left - right);
  return Math.min(delta, fullTurn - delta);
}

function magnitude(vector) {
  return Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
}

function normalize(vector) {
  const length = magnitude(vector);
  if (length === 0) {
    return { x: 0, y: 0, z: 0 };
  }
  return {
    x: vector.x / length,
    y: vector.y / length,
    z: vector.z / length,
  };
}

function subtractVectors(left, right) {
  return {
    x: left.x - right.x,
    y: left.y - right.y,
    z: left.z - right.z,
  };
}

function dot(left, right) {
  return left.x * right.x + left.y * right.y + left.z * right.z;
}

function cross(left, right) {
  return {
    x: left.y * right.z - left.z * right.y,
    y: left.z * right.x - left.x * right.z,
    z: left.x * right.y - left.y * right.x,
  };
}

function clamp(value, minValue, maxValue) {
  return Math.min(maxValue, Math.max(minValue, value));
}

function getBodyVelocity(bodyName, timeSeconds) {
  const delta = 60;
  const before = getBodyPosition(bodyName, timeSeconds - delta);
  const after = getBodyPosition(bodyName, timeSeconds + delta);
  return {
    x: (after.x - before.x) / (2 * delta),
    y: (after.y - before.y) / (2 * delta),
    z: (after.z - before.z) / (2 * delta),
  };
}

function getTransferCacheKey(bodyName, timeSeconds) {
  return `${bodyName}:${timeSeconds}`;
}

function getCachedBodyPosition(cache, bodyName, timeSeconds) {
  const key = getTransferCacheKey(bodyName, timeSeconds);
  if (!cache.has(key)) {
    cache.set(key, getBodyPosition(bodyName, timeSeconds));
  }
  return cache.get(key);
}

function getCachedBodyVelocity(cache, bodyName, timeSeconds) {
  const key = getTransferCacheKey(bodyName, timeSeconds);
  if (!cache.has(key)) {
    cache.set(key, getBodyVelocity(bodyName, timeSeconds));
  }
  return cache.get(key);
}

function getRelativeBodyState(bodyName, centerName, timeSeconds, caches) {
  return {
    position: subtractVectors(
      getCachedBodyPosition(caches.positionCache, bodyName, timeSeconds),
      getCachedBodyPosition(caches.positionCache, centerName, timeSeconds),
    ),
    velocity: subtractVectors(
      getCachedBodyVelocity(caches.velocityCache, bodyName, timeSeconds),
      getCachedBodyVelocity(caches.velocityCache, centerName, timeSeconds),
    ),
  };
}

function stumpffC(zValue) {
  if (zValue > 1e-8) {
    const squareRoot = Math.sqrt(zValue);
    return (1 - Math.cos(squareRoot)) / zValue;
  }

  if (zValue < -1e-8) {
    const squareRoot = Math.sqrt(-zValue);
    return (Math.cosh(squareRoot) - 1) / (-zValue);
  }

  return 0.5;
}

function stumpffS(zValue) {
  if (zValue > 1e-8) {
    const squareRoot = Math.sqrt(zValue);
    return (squareRoot - Math.sin(squareRoot)) / (squareRoot ** 3);
  }

  if (zValue < -1e-8) {
    const squareRoot = Math.sqrt(-zValue);
    return (Math.sinh(squareRoot) - squareRoot) / (squareRoot ** 3);
  }

  return 1 / 6;
}

function getLambertTimeOfFlight(zValue, startRadius, endRadius, transferParameter, gravitationalParameter) {
  const cValue = stumpffC(zValue);
  const sValue = stumpffS(zValue);

  if (cValue <= 0) {
    return null;
  }

  const yValue = startRadius + endRadius + transferParameter * ((zValue * sValue - 1) / Math.sqrt(cValue));
  if (yValue <= 0) {
    return null;
  }

  const chi = Math.sqrt(yValue / cValue);
  const timeOfFlight = (chi ** 3 * sValue + transferParameter * Math.sqrt(yValue)) / Math.sqrt(gravitationalParameter);
  if (!Number.isFinite(timeOfFlight)) {
    return null;
  }

  return { cValue, sValue, yValue, timeOfFlight };
}

function solveLambertTransfer(startPosition, endPosition, flightTime, gravitationalParameter) {
  const startRadius = magnitude(startPosition);
  const endRadius = magnitude(endPosition);
  if (startRadius === 0 || endRadius === 0 || flightTime <= 0 || gravitationalParameter <= 0) {
    return null;
  }

  const cosineTransferAngle = clamp(dot(startPosition, endPosition) / (startRadius * endRadius), -1, 1);
  const sineTransferAngle = clamp(
    magnitude(cross(startPosition, endPosition)) / (startRadius * endRadius),
    0,
    1,
  );
  const transferAngle = Math.atan2(sineTransferAngle, cosineTransferAngle);
  const transferParameter =
    sineTransferAngle === 0 ? 0 : sineTransferAngle * Math.sqrt((startRadius * endRadius) / (1 - cosineTransferAngle));

  if (!Number.isFinite(transferParameter) || Math.abs(transferParameter) < 1e-8) {
    return null;
  }

  const maxZValue = 16 * Math.PI * Math.PI;
  const zSamples = 96;
  let lowerBracket = null;
  let upperBracket = null;
  let previous = null;

  for (let sampleIndex = 0; sampleIndex <= zSamples; sampleIndex += 1) {
    const zValue = -maxZValue + (2 * maxZValue * sampleIndex) / zSamples;
    const solution = getLambertTimeOfFlight(
      zValue,
      startRadius,
      endRadius,
      transferParameter,
      gravitationalParameter,
    );
    if (!solution) {
      continue;
    }

    const difference = solution.timeOfFlight - flightTime;
    const current = { zValue, difference, solution };
    if (Math.abs(difference) < 1e-6) {
      lowerBracket = current;
      upperBracket = current;
      break;
    }

    if (previous && previous.difference * difference < 0) {
      lowerBracket = previous;
      upperBracket = current;
      break;
    }

    previous = current;
  }

  if (!lowerBracket || !upperBracket) {
    return null;
  }

  let best = Math.abs(lowerBracket.difference) <= Math.abs(upperBracket.difference) ? lowerBracket : upperBracket;
  let low = lowerBracket;
  let high = upperBracket;

  for (let iteration = 0; iteration < 80 && high.zValue - low.zValue > 1e-10; iteration += 1) {
    const middleZValue = (low.zValue + high.zValue) / 2;
    const middleSolution = getLambertTimeOfFlight(
      middleZValue,
      startRadius,
      endRadius,
      transferParameter,
      gravitationalParameter,
    );
    if (!middleSolution) {
      low = { ...low, zValue: middleZValue };
      continue;
    }

    const difference = middleSolution.timeOfFlight - flightTime;
    const middle = { zValue: middleZValue, difference, solution: middleSolution };
    if (Math.abs(difference) < Math.abs(best.difference)) {
      best = middle;
    }

    if (Math.abs(difference) < 1e-6) {
      best = middle;
      break;
    }

    if (low.difference * difference <= 0) {
      high = middle;
    } else {
      low = middle;
    }
  }

  const lagrangeY = best.solution.yValue;
  const fValue = 1 - lagrangeY / startRadius;
  const gValue = (transferParameter * Math.sqrt(lagrangeY)) / Math.sqrt(gravitationalParameter);
  const gDotValue = 1 - lagrangeY / endRadius;

  if (!Number.isFinite(gValue) || Math.abs(gValue) < 1e-8) {
    return null;
  }

  return {
    departureVelocity: scaleVector(subtractVectors(endPosition, scaleVector(startPosition, fValue)), 1 / gValue),
    arrivalVelocity: scaleVector(subtractVectors(scaleVector(endPosition, gDotValue), startPosition), 1 / gValue),
    transferAngle,
  };
}

function getRoundedTransferDetails(details) {
  const departureDeltaV = Number(details.departureDeltaV.toFixed(2));
  const arrivalDeltaV = Number(details.arrivalDeltaV.toFixed(2));
  const deltaV = Number((departureDeltaV + arrivalDeltaV).toFixed(2));

  return {
    ...details,
    score: deltaV,
    deltaV,
    departureDeltaV,
    arrivalDeltaV,
    phaseAngleDeg: Number(details.phaseAngleDeg.toFixed(2)),
    transferAngleDeg: Number(details.transferAngleDeg.toFixed(2)),
  };
}

export function getTransferSearchContext(originName, destinationName) {
  const originBody = getBody(originName);
  const destinationBody = getBody(destinationName);
  if (originName === destinationName) {
    return { valid: false, reason: "Start i cel muszą być różne." };
  }

  if (!originBody || !destinationBody) {
    return { valid: false, reason: "Nie udało się odnaleźć wybranego ciała niebieskiego." };
  }

  if (!originBody.parent || originBody.parent !== destinationBody.parent) {
    return {
      valid: false,
      reason: "Wyszukiwanie Lambert działa obecnie dla ciał orbitujących to samo ciało nadrzędne.",
    };
  }

  const gravitationalParameter = BODY_MU_BY_PARENT.get(originBody.parent);
  if (!Number.isFinite(gravitationalParameter) || gravitationalParameter <= 0) {
    return { valid: false, reason: "Brak danych grawitacyjnych dla wybranego układu." };
  }

  return {
    valid: true,
    centerName: originBody.parent,
    gravitationalParameter,
  };
}

function evaluateTransferCandidateWithContext(context, departureTime, arrivalTime) {
  const duration = arrivalTime - departureTime;
  if (!Number.isFinite(departureTime) || !Number.isFinite(arrivalTime) || duration <= 0) {
    return null;
  }

  const departureState = getRelativeBodyState(context.originName, context.centerName, departureTime, context.caches);
  const arrivalState = getRelativeBodyState(context.destinationName, context.centerName, arrivalTime, context.caches);
  const lambertSolution = solveLambertTransfer(
    departureState.position,
    arrivalState.position,
    duration,
    context.gravitationalParameter,
  );
  if (!lambertSolution) {
    return null;
  }

  const departureBodyVelocity = departureState.velocity;
  const arrivalBodyVelocity = arrivalState.velocity;
  const departureDeltaV = magnitude(subtractVectors(lambertSolution.departureVelocity, departureBodyVelocity));
  const arrivalDeltaV = magnitude(subtractVectors(arrivalBodyVelocity, lambertSolution.arrivalVelocity));
  const destinationAtDeparture = getRelativeBodyState(
    context.destinationName,
    context.centerName,
    departureTime,
    context.caches,
  ).position;
  const phaseAngleDeg =
    (normalizeAngle(Math.atan2(destinationAtDeparture.z, destinationAtDeparture.x) -
      Math.atan2(departureState.position.z, departureState.position.x)) *
      180) /
    Math.PI;
  const deltaV = departureDeltaV + arrivalDeltaV;

  return {
    departureTime,
    arrivalTime,
    duration,
    score: deltaV,
    deltaV,
    departureDeltaV,
    arrivalDeltaV,
    phaseAngleDeg,
    transferAngleDeg: (lambertSolution.transferAngle * 180) / Math.PI,
    centerName: context.centerName,
  };
}

function propagateTwoBody(position, velocity, timeSeconds, gravitationalParameter) {
  if (timeSeconds <= 0) {
    return { position, velocity };
  }

  const radius = magnitude(position);
  const velocitySquared = dot(velocity, velocity);
  const radialVelocity = dot(position, velocity) / radius;
  const alpha = 2 / radius - velocitySquared / gravitationalParameter;
  let universalAnomaly =
    Math.sqrt(gravitationalParameter) * Math.abs(alpha) * timeSeconds;

  if (!Number.isFinite(universalAnomaly) || universalAnomaly < 1e-8) {
    universalAnomaly = Math.sqrt(gravitationalParameter) * timeSeconds / radius;
  }

  for (let iteration = 0; iteration < 80; iteration += 1) {
    const zValue = alpha * universalAnomaly ** 2;
    const cValue = stumpffC(zValue);
    const sValue = stumpffS(zValue);
    const equation =
      (radius * radialVelocity / Math.sqrt(gravitationalParameter)) * universalAnomaly ** 2 * cValue +
      (1 - alpha * radius) * universalAnomaly ** 3 * sValue +
      radius * universalAnomaly -
      Math.sqrt(gravitationalParameter) * timeSeconds;
    const derivative =
      (radius * radialVelocity / Math.sqrt(gravitationalParameter)) * universalAnomaly * (1 - zValue * sValue) +
      (1 - alpha * radius) * universalAnomaly ** 2 * cValue +
      radius;
    const correction = equation / derivative;
    universalAnomaly -= correction;

    if (Math.abs(correction) < 1e-7) {
      break;
    }
  }

  const zValue = alpha * universalAnomaly ** 2;
  const cValue = stumpffC(zValue);
  const sValue = stumpffS(zValue);
  const fValue = 1 - (universalAnomaly ** 2 / radius) * cValue;
  const gValue =
    timeSeconds -
    (universalAnomaly ** 3 / Math.sqrt(gravitationalParameter)) * sValue;
  const nextPosition = addVectors(scaleVector(position, fValue), scaleVector(velocity, gValue));
  const nextRadius = magnitude(nextPosition);
  const gDotValue = 1 - (universalAnomaly ** 2 / nextRadius) * cValue;
  const fDotValue =
    (Math.sqrt(gravitationalParameter) / (nextRadius * radius)) *
    (alpha * universalAnomaly ** 3 * sValue - universalAnomaly);
  const nextVelocity = addVectors(scaleVector(position, fDotValue), scaleVector(velocity, gDotValue));

  return { position: nextPosition, velocity: nextVelocity };
}

function addManeuverVelocity(state, maneuver) {
  const prograde = normalize(state.velocity);
  const radial = normalize(state.position);
  const normal = normalize(cross(state.position, state.velocity));
  const deltaV = addVectors(
    scaleVector(prograde, Number(maneuver.prograde) || 0),
    addVectors(
      scaleVector(normal, Number(maneuver.normal) || 0),
      scaleVector(radial, Number(maneuver.radial) || 0),
    ),
  );

  return {
    position: state.position,
    velocity: addVectors(state.velocity, deltaV),
  };
}

export function getTransferPlan(originName, destinationName, departureTime, arrivalTime) {
  const context = getTransferSearchContext(originName, destinationName);
  if (!context.valid) {
    return context;
  }

  const plan = evaluateTransferCandidateWithContext(
    {
      ...context,
      originName,
      destinationName,
      caches: {
        positionCache: new Map(),
        velocityCache: new Map(),
      },
    },
    departureTime,
    arrivalTime,
  );

  if (!plan) {
    return { valid: false, reason: "Nie udało się znaleźć transferu Lambert dla podanych czasów." };
  }

  return {
    valid: true,
    ...getRoundedTransferDetails(plan),
  };
}

export function getTransferTrajectory(
  originName,
  destinationName,
  departureTime,
  arrivalTime,
  options = {},
) {
  const context = getTransferSearchContext(originName, destinationName);
  if (!context.valid) {
    return context;
  }

  if (!Number.isFinite(departureTime) || !Number.isFinite(arrivalTime) || arrivalTime <= departureTime) {
    return { valid: false, reason: "Czas przybycia musi być większy od czasu odlotu." };
  }

  const maneuvers = [...(options.maneuvers ?? [])]
    .filter((maneuver) => maneuver.time > departureTime && maneuver.time < arrivalTime)
    .sort((left, right) => left.time - right.time);
  const samplesPerSegment = Math.max(16, Math.floor(options.samplesPerSegment ?? 72));
  const originBody = getBody(originName);
  const destinationBody = getBody(destinationName);
  const trajectoryMu = BODY_MU_BY_NAME.get(context.centerName) ?? context.gravitationalParameter;
  const originState = getRelativeBodyState(
    originName,
    context.centerName,
    departureTime,
    { positionCache: new Map(), velocityCache: new Map() },
  );
  const originRadial = normalize(originState.position);
  const originNormal = normalize(cross(originState.position, originState.velocity));
  const originPrograde = normalize(cross(originNormal, originRadial));
  const departureOrbitHeight = Math.max(0, Number(options.departureOrbitHeight) || 0);
  const departureRadius = originBody.radius + departureOrbitHeight;
  const bodyMu = BODY_MU_BY_NAME.get(originName);
  const circularSpeed = bodyMu ? Math.sqrt(bodyMu / departureRadius) : 0;
  const escapeAngle = degreesToRadians(Number(options.departureEscapeAngle) || 0);
  const escapeDirection = normalize(
    addVectors(
      scaleVector(originPrograde, Math.cos(escapeAngle)),
      scaleVector(originRadial, Math.sin(escapeAngle)),
    ),
  );
  const startPosition = addVectors(originState.position, scaleVector(originRadial, departureRadius));
  const startVelocity = addVectors(
    originState.velocity,
    addVectors(
      scaleVector(originPrograde, circularSpeed),
      scaleVector(escapeDirection, Math.max(0, Number(options.departureDeltaV) || 0)),
    ),
  );
  const arrivalState = getRelativeBodyState(
    destinationName,
    context.centerName,
    arrivalTime,
    { positionCache: new Map(), velocityCache: new Map() },
  );
  const points = [];
  const times = [];
  const maneuverPositions = [];
  let state = {
    position: startPosition,
    velocity: startVelocity,
  };
  let segmentStartTime = departureTime;

  const appendSegment = (segmentEndTime, isFinalSegment = false) => {
    const duration = segmentEndTime - segmentStartTime;
    const segmentStartState = state;
    for (let index = points.length === 0 ? 0 : 1; index <= samplesPerSegment; index += 1) {
      const progress = index / samplesPerSegment;
      const offsetTime = duration * progress;
      const propagated = propagateTwoBody(
        segmentStartState.position,
        segmentStartState.velocity,
        offsetTime,
        trajectoryMu,
      );
      let position = propagated.position;
      if (isFinalSegment && progress > 0.65) {
        const approachProgress = (progress - 0.65) / 0.35;
        const blend = approachProgress * approachProgress * (3 - 2 * approachProgress);
        position = addVectors(
          scaleVector(position, 1 - blend),
          scaleVector(arrivalState.position, blend),
        );
      }
      const parentPosition = getBodyPosition(context.centerName, segmentStartTime + offsetTime);
      points.push(
        scaleVector(addVectors(parentPosition, position), DISTANCE_SCALE),
      );
      times.push(segmentStartTime + offsetTime);
    }

    state = propagateTwoBody(
      segmentStartState.position,
      segmentStartState.velocity,
      duration,
      trajectoryMu,
    );
    segmentStartTime = segmentEndTime;
  };

  for (const maneuver of maneuvers) {
    appendSegment(maneuver.time);
    maneuverPositions.push(
      scaleVector(
        addVectors(getBodyPosition(context.centerName, maneuver.time), state.position),
        DISTANCE_SCALE,
      ),
    );
    state = addManeuverVelocity(state, maneuver);
  }
  appendSegment(arrivalTime, true);

  const arrivalOrbitHeight = Math.max(0, Number(options.arrivalOrbitHeight) || 0);
  if (arrivalOrbitHeight > 0) {
    const radial = normalize(arrivalState.position);
    const arrivalPosition = addVectors(
      arrivalState.position,
      scaleVector(radial, destinationBody.radius + arrivalOrbitHeight),
    );
    points.push(
      scaleVector(
        addVectors(getBodyPosition(context.centerName, arrivalTime), arrivalPosition),
        DISTANCE_SCALE,
      ),
    );
    times.push(arrivalTime);
  }

  const destinationPosition = getBodyPosition(destinationName, arrivalTime);
  points.push(scaleVector(destinationPosition, DISTANCE_SCALE));
  times.push(arrivalTime);

  return {
    valid: true,
    points,
    times,
    maneuverPositions,
    departureVelocity: startVelocity,
  };
}

function chooseAdaptiveStep(range, requestedStep, maxSamples) {
  const minimumStep = Math.max(60, Math.floor(requestedStep));
  if (range <= 0 || maxSamples <= 1) {
    return minimumStep;
  }

  const adaptiveStep = Math.ceil(range / maxSamples / 60) * 60;
  return Math.max(minimumStep, adaptiveStep);
}

export function findTransferWindows(originName, destinationName, searchStartTime, searchEndTime, options = {}) {
  if (originName === destinationName) {
    return [];
  }

  if (
    !Number.isFinite(searchStartTime) ||
    !Number.isFinite(searchEndTime) ||
    searchEndTime <= searchStartTime
  ) {
    return [];
  }

  const searchContext = getTransferSearchContext(originName, destinationName);
  if (!searchContext.valid) {
    return [];
  }

  const minDuration = Math.max(60, Number(options.minDuration ?? DEFAULT_SEARCH_STEP));
  const maxDuration = Math.max(minDuration, Number(options.maxDuration ?? 60 * 60 * 24 * 200));
  const departureStep = chooseAdaptiveStep(
    searchEndTime - searchStartTime,
    Number(options.departureStep ?? DEFAULT_SEARCH_STEP),
    Math.max(12, Math.floor(Number(options.maxDepartureSamples ?? 72))),
  );
  const durationStep = chooseAdaptiveStep(
    maxDuration - minDuration,
    Number(options.durationStep ?? DEFAULT_SEARCH_STEP),
    Math.max(12, Math.floor(Number(options.maxDurationSamples ?? 64))),
  );
  const maxCandidates = Math.max(1, Math.floor(Number(options.maxCandidates ?? 8)));
  const minSeparation = Math.max(departureStep, Number(options.minSeparation ?? departureStep * 2));
  const candidates = [];
  const candidateMap = new Map();
  const context = {
    ...searchContext,
    originName,
    destinationName,
    caches: {
      positionCache: new Map(),
      velocityCache: new Map(),
    },
  };

  function evaluateCandidate(departureTime, duration) {
    if (departureTime < searchStartTime || departureTime > searchEndTime || duration < minDuration || duration > maxDuration) {
      return;
    }

    const roundedDepartureTime = Math.round(departureTime);
    const roundedDuration = Math.round(duration);
    const candidateKey = `${roundedDepartureTime}:${roundedDuration}`;
    if (candidateMap.has(candidateKey)) {
      return;
    }

    const plan = evaluateTransferCandidateWithContext(context, roundedDepartureTime, roundedDepartureTime + roundedDuration);
    candidateMap.set(candidateKey, plan ?? null);
    if (plan) {
      candidates.push(getRoundedTransferDetails(plan));
    }
  }

  for (let departureTime = searchStartTime; departureTime <= searchEndTime; departureTime += departureStep) {
    for (let duration = minDuration; duration <= maxDuration; duration += durationStep) {
      evaluateCandidate(departureTime, duration);
    }
  }

  const refinedDepartureStep = Math.max(60, Math.floor(departureStep / 4));
  const refinedDurationStep = Math.max(60, Math.floor(durationStep / 4));
  const refinementSeeds = candidates
    .slice()
    .sort((left, right) => left.score - right.score)
    .slice(0, Math.min(candidates.length, Math.max(maxCandidates * 3, 10)));

  for (const seed of refinementSeeds) {
    const departureMin = Math.max(searchStartTime, seed.departureTime - departureStep);
    const departureMax = Math.min(searchEndTime, seed.departureTime + departureStep);
    const durationMin = Math.max(minDuration, seed.duration - durationStep);
    const durationMax = Math.min(maxDuration, seed.duration + durationStep);

    for (let departureTime = departureMin; departureTime <= departureMax; departureTime += refinedDepartureStep) {
      for (let duration = durationMin; duration <= durationMax; duration += refinedDurationStep) {
        evaluateCandidate(departureTime, duration);
      }
    }
  }

  candidates.sort((left, right) => left.score - right.score);
  const filtered = [];
  for (const candidate of candidates) {
    if (filtered.length >= maxCandidates) {
      break;
    }

    const isTooClose = filtered.some(
      (entry) =>
        Math.abs(entry.departureTime - candidate.departureTime) < minSeparation &&
        Math.abs(entry.arrivalTime - candidate.arrivalTime) < minSeparation,
    );
    if (!isTooClose) {
      filtered.push(candidate);
    }
  }

  return filtered;
}

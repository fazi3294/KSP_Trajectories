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
    inclinationDeg: 7,
    phaseDeg: 15,
    radius: 250000,
    soi: 11206449,
    color: 0xb88f61,
  },
  {
    name: "Eve",
    parent: "Kerbol",
    semiMajorAxis: 9832684544,
    orbitalPeriod: 5657995,
    inclinationDeg: 2.1,
    phaseDeg: 50,
    radius: 700000,
    soi: 85109365,
    color: 0xb96ad9,
  },
  {
    name: "Gilly",
    parent: "Eve",
    semiMajorAxis: 31500000,
    orbitalPeriod: 388587,
    inclinationDeg: 12,
    phaseDeg: 130,
    radius: 13000,
    soi: 126123,
    color: 0xdbc9a2,
  },
  {
    name: "Kerbin",
    parent: "Kerbol",
    semiMajorAxis: 13599840256,
    orbitalPeriod: 9203545,
    inclinationDeg: 0,
    phaseDeg: 0,
    radius: 600000,
    soi: 84159286,
    color: 0x5fb2ff,
  },
  {
    name: "Mun",
    parent: "Kerbin",
    semiMajorAxis: 12000000,
    orbitalPeriod: 138984,
    inclinationDeg: 0,
    phaseDeg: 90,
    radius: 200000,
    soi: 2429559,
    color: 0xb8bcc4,
  },
  {
    name: "Minmus",
    parent: "Kerbin",
    semiMajorAxis: 47000000,
    orbitalPeriod: 1077311,
    inclinationDeg: 6,
    phaseDeg: 215,
    radius: 60000,
    soi: 2247428,
    color: 0x8de2c8,
  },
  {
    name: "Duna",
    parent: "Kerbol",
    semiMajorAxis: 20726155264,
    orbitalPeriod: 17315400,
    inclinationDeg: 0.06,
    phaseDeg: 120,
    radius: 320000,
    soi: 47921949,
    color: 0xd07a44,
  },
  {
    name: "Ike",
    parent: "Duna",
    semiMajorAxis: 3200000,
    orbitalPeriod: 65518,
    inclinationDeg: 0.2,
    phaseDeg: 175,
    radius: 130000,
    soi: 1049598,
    color: 0x8f7a63,
  },
  {
    name: "Dres",
    parent: "Kerbol",
    semiMajorAxis: 40839348203,
    orbitalPeriod: 47893063,
    inclinationDeg: 5,
    phaseDeg: 200,
    radius: 138000,
    soi: 32832840,
    color: 0xc5c4d8,
  },
  {
    name: "Jool",
    parent: "Kerbol",
    semiMajorAxis: 68773560320,
    orbitalPeriod: 104661432,
    inclinationDeg: 1.3,
    phaseDeg: 255,
    radius: 6000000,
    soi: 2455985200,
    color: 0x90d76e,
  },
  {
    name: "Laythe",
    parent: "Jool",
    semiMajorAxis: 27184000,
    orbitalPeriod: 52981,
    inclinationDeg: 0,
    phaseDeg: 0,
    radius: 500000,
    soi: 3723645,
    color: 0x6ad9c6,
  },
  {
    name: "Vall",
    parent: "Jool",
    semiMajorAxis: 43152000,
    orbitalPeriod: 105962,
    inclinationDeg: 0,
    phaseDeg: 75,
    radius: 300000,
    soi: 2406401,
    color: 0xc7e9ef,
  },
  {
    name: "Tylo",
    parent: "Jool",
    semiMajorAxis: 68500000,
    orbitalPeriod: 211926,
    inclinationDeg: 0.25,
    phaseDeg: 145,
    radius: 600000,
    soi: 10856518,
    color: 0xcbc0b3,
  },
  {
    name: "Bop",
    parent: "Jool",
    semiMajorAxis: 128500000,
    orbitalPeriod: 544507,
    inclinationDeg: 15,
    phaseDeg: 230,
    radius: 65000,
    soi: 1221060,
    color: 0xa3825b,
  },
  {
    name: "Pol",
    parent: "Jool",
    semiMajorAxis: 179890000,
    orbitalPeriod: 901903,
    inclinationDeg: 4.25,
    phaseDeg: 300,
    radius: 44000,
    soi: 1042138,
    color: 0xe9cd76,
  },
  {
    name: "Eeloo",
    parent: "Kerbol",
    semiMajorAxis: 90118820000,
    orbitalPeriod: 156992048,
    inclinationDeg: 6.15,
    phaseDeg: 330,
    radius: 210000,
    soi: 119082940,
    color: 0xe6efff,
  },
];

const bodyMap = new Map(BODIES.map((body) => [body.name, body]));

const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;

const addVectors = (left, right) => ({
  x: left.x + right.x,
  y: left.y + right.y,
  z: left.z + right.z,
});

export function getBody(name) {
  return bodyMap.get(name);
}

export function getBodyPosition(bodyName, timeSeconds) {
  const body = getBody(bodyName);

  if (!body) {
    throw new Error(`Unknown body: ${bodyName}`);
  }

  if (!body.parent) {
    return { x: 0, y: 0, z: 0 };
  }

  const orbitFraction = ((timeSeconds % body.orbitalPeriod) + body.orbitalPeriod) % body.orbitalPeriod / body.orbitalPeriod;
  const angle = degreesToRadians(body.phaseDeg ?? 0) + orbitFraction * Math.PI * 2;
  const inclination = degreesToRadians(body.inclinationDeg ?? 0);
  const local = {
    x: Math.cos(angle) * body.semiMajorAxis,
    y: Math.sin(angle) * Math.sin(inclination) * body.semiMajorAxis,
    z: Math.sin(angle) * Math.cos(inclination) * body.semiMajorAxis,
  };

  return addVectors(getBodyPosition(body.parent, timeSeconds), local);
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

function getHohmannDuration(originBody, destinationBody) {
  if (!originBody.parent || originBody.parent !== destinationBody.parent) {
    return null;
  }
  if (!originBody.semiMajorAxis || !destinationBody.semiMajorAxis || !originBody.orbitalPeriod) {
    return null;
  }

  const gravitationalParameter =
    (4 * Math.PI * Math.PI * originBody.semiMajorAxis ** 3) / (originBody.orbitalPeriod ** 2);
  const transferSemiMajorAxis = (originBody.semiMajorAxis + destinationBody.semiMajorAxis) / 2;
  return Math.PI * Math.sqrt((transferSemiMajorAxis ** 3) / gravitationalParameter);
}

function getAngularPhaseFromParent(originName, destinationName, timeSeconds) {
  const originBody = getBody(originName);
  const destinationBody = getBody(destinationName);
  if (!originBody?.parent || originBody.parent !== destinationBody?.parent) {
    return null;
  }

  const parentPosition = getBodyPosition(originBody.parent, timeSeconds);
  const originPosition = subtractVectors(getBodyPosition(originName, timeSeconds), parentPosition);
  const destinationPosition = subtractVectors(getBodyPosition(destinationName, timeSeconds), parentPosition);
  const originAngle = Math.atan2(originPosition.z, originPosition.x);
  const destinationAngle = Math.atan2(destinationPosition.z, destinationPosition.x);
  return normalizeAngle(destinationAngle - originAngle);
}

function scoreTransferCandidate(originName, destinationName, departureTime, arrivalTime) {
  const duration = arrivalTime - departureTime;
  const originBody = getBody(originName);
  const destinationBody = getBody(destinationName);
  const originDeparture = getBodyPosition(originName, departureTime);
  const destinationArrival = getBodyPosition(destinationName, arrivalTime);
  const transferDirection = normalize(subtractVectors(destinationArrival, originDeparture));
  const originVelocity = normalize(getBodyVelocity(originName, departureTime));
  const destinationVelocity = normalize(getBodyVelocity(destinationName, arrivalTime));
  const departureAlignmentPenalty = 1 - clamp(dot(originVelocity, transferDirection), -1, 1);
  const arrivalAlignmentPenalty = 1 - clamp(dot(destinationVelocity, transferDirection), -1, 1);

  let phasePenalty = 0.35;
  let durationPenalty = 0.35;
  const phaseAtDeparture = getAngularPhaseFromParent(originName, destinationName, departureTime);
  const hohmannDuration = getHohmannDuration(originBody, destinationBody);
  if (phaseAtDeparture !== null && destinationBody?.orbitalPeriod) {
    const destinationMeanMotion = (2 * Math.PI) / destinationBody.orbitalPeriod;
    const expectedPhase = normalizeAngle(Math.PI - destinationMeanMotion * duration);
    phasePenalty = angleDifference(phaseAtDeparture, expectedPhase) / Math.PI;
  }
  if (hohmannDuration) {
    durationPenalty = Math.min(1, Math.abs(duration - hohmannDuration) / hohmannDuration);
  }

  const originOrbitNormal = normalize(cross(originDeparture, getBodyVelocity(originName, departureTime)));
  const destinationOrbitNormal = normalize(cross(destinationArrival, getBodyVelocity(destinationName, arrivalTime)));
  const planePenalty = 0.5 * (1 - clamp(dot(originOrbitNormal, destinationOrbitNormal), -1, 1));

  const rawScore =
    phasePenalty * 0.45 +
    durationPenalty * 0.25 +
    departureAlignmentPenalty * 0.2 +
    arrivalAlignmentPenalty * 0.05 +
    planePenalty * 0.05;

  return Math.max(0, rawScore * 100);
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

  const minDuration = Math.max(60, Number(options.minDuration ?? 60 * 60 * 6));
  const maxDuration = Math.max(minDuration, Number(options.maxDuration ?? 60 * 60 * 24 * 200));
  const departureStep = Math.max(60, Number(options.departureStep ?? 60 * 60 * 6));
  const durationStep = Math.max(60, Number(options.durationStep ?? 60 * 60 * 6));
  const maxCandidates = Math.max(1, Math.floor(Number(options.maxCandidates ?? 8)));
  const minSeparation = Math.max(departureStep, Number(options.minSeparation ?? departureStep * 2));
  const candidates = [];

  for (let departureTime = searchStartTime; departureTime <= searchEndTime; departureTime += departureStep) {
    for (let duration = minDuration; duration <= maxDuration; duration += durationStep) {
      const arrivalTime = departureTime + duration;
      const score = scoreTransferCandidate(originName, destinationName, departureTime, arrivalTime);
      candidates.push({
        departureTime,
        arrivalTime,
        duration,
        score: Number(score.toFixed(2)),
      });
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

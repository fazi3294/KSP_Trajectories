import test from "node:test";
import assert from "node:assert/strict";

import {
  findTransferWindows,
  getBodyOrbitPoints,
  getBodyPosition,
  getEscapeTrajectory,
  getTransferPlan,
  getTransferSearchContext,
  getTransferState,
  getTransferTrajectory,
  listTransferBodies,
} from "../src/ksp-system.js";

function assertVectorClose(actual, expected, tolerance = 1e-6) {
  assert.ok(Math.abs(actual.x - expected.x) < tolerance);
  assert.ok(Math.abs(actual.y - expected.y) < tolerance);
  assert.ok(Math.abs(actual.z - expected.z) < tolerance);
}

test("root body remains at system origin", () => {
  assert.deepEqual(getBodyPosition("Kerbol", 123456), { x: 0, y: 0, z: 0 });
});

test("transfer state starts and ends at requested body positions", () => {
  const departureTime = 1000;
  const arrivalTime = 2000;
  const state = getTransferState("Kerbin", "Duna", departureTime, arrivalTime, 1500);

  assert.equal(state.valid, true);
  assertVectorClose(state.start, {
    x: getBodyPosition("Kerbin", departureTime).x / 400000000,
    y: getBodyPosition("Kerbin", departureTime).y / 400000000,
    z: getBodyPosition("Kerbin", departureTime).z / 400000000,
  });
  assertVectorClose(state.end, {
    x: getBodyPosition("Duna", arrivalTime).x / 400000000,
    y: getBodyPosition("Duna", arrivalTime).y / 400000000,
    z: getBodyPosition("Duna", arrivalTime).z / 400000000,
  });
  assert.equal(state.progress, 0.5);
  assert.equal(state.shipVisible, true);
});

test("transfer validation rejects impossible selections", () => {
  assert.equal(getTransferState("Kerbin", "Kerbin", 0, 100, 0).valid, false);
  assert.equal(getTransferState("Kerbin", "Duna", 100, 100, 100).valid, false);
});

test("transfer selectors include planets and moons but not the star", () => {
  const names = listTransferBodies();
  assert.equal(names.includes("Kerbol"), false);
  assert.equal(names.includes("Kerbin"), true);
  assert.equal(names.includes("Mun"), true);
});

test("UT 0 positions follow stock orbital elements", () => {
  assertVectorClose(getBodyPosition("Kerbin", 0), {
    x: -13599823007.697136,
    y: 0,
    z: 21659825.247473374,
  });

  assertVectorClose(getBodyPosition("Moho", 0), {
    x: -555132604.2089658,
    y: -200018093.33316424,
    z: 6288140326.440433,
  });

  assertVectorClose(getBodyPosition("Minmus", 0), {
    x: -13579599059.215322,
    y: -1152398.0594368556,
    z: -20750832.4521845,
  });
});

test("time propagation moves a reference-plane orbit counterclockwise in the front view", () => {
  const start = getBodyPosition("Kerbin", 0);
  const next = getBodyPosition("Kerbin", 60);
  const startScreenY = -start.z;
  const nextScreenY = -next.z;
  const signedTurn =
    start.x * nextScreenY -
    startScreenY * next.x;

  assert.ok(signedTurn > 0);
});

test("orbit paths preserve eccentric periapsis and apoapsis distances", () => {
  const mohoPoints = getBodyOrbitPoints("Moho", 256);
  const distances = mohoPoints.map((point) => Math.hypot(point.x, point.y, point.z));
  const periapsis = Math.min(...distances);
  const apoapsis = Math.max(...distances);

  assert.ok(Math.abs(periapsis - 4210510627.4105854) < 1e-6);
  assert.ok(Math.abs(apoapsis - 6315765980.589414) < 1e-6);
});

test("transfer window search returns ranked candidates with required fields", () => {
  const results = findTransferWindows("Kerbin", "Duna", 0, 60 * 60 * 24 * 240, {
    minDuration: 60 * 60 * 24 * 30,
    maxDuration: 60 * 60 * 24 * 260,
    departureStep: 60 * 60 * 24 * 5,
    durationStep: 60 * 60 * 24 * 5,
    maxCandidates: 5,
  });

  assert.equal(results.length > 0, true);
  assert.equal(results.length <= 5, true);
  assert.equal(results[0].deltaV <= results[results.length - 1].deltaV, true);

  for (const result of results) {
    assert.equal(Number.isFinite(result.departureTime), true);
    assert.equal(Number.isFinite(result.arrivalTime), true);
    assert.equal(Number.isFinite(result.duration), true);
    assert.equal(Number.isFinite(result.score), true);
    assert.equal(Number.isFinite(result.deltaV), true);
    assert.equal(Number.isFinite(result.departureDeltaV), true);
    assert.equal(Number.isFinite(result.arrivalDeltaV), true);
    assert.equal(Number.isFinite(result.phaseAngleDeg), true);
    assert.equal(Number.isFinite(result.transferAngleDeg), true);
    assert.equal(result.arrivalTime > result.departureTime, true);
    assert.equal(result.duration, result.arrivalTime - result.departureTime);
    assert.equal(result.score, result.deltaV);
  }
});

test("transfer window search rejects invalid ranges", () => {
  assert.deepEqual(findTransferWindows("Kerbin", "Kerbin", 0, 1000), []);
  assert.deepEqual(findTransferWindows("Kerbin", "Duna", 1000, 1000), []);
});

test("Lambert transfer plan exposes delta-v details for sibling bodies", () => {
  const plan = getTransferPlan("Kerbin", "Duna", 0, 60 * 60 * 24 * 120);

  assert.equal(plan.valid, true);
  assert.equal(plan.centerName, "Kerbol");
  assert.equal(plan.deltaV > 0, true);
  assert.equal(plan.departureDeltaV > 0, true);
  assert.equal(plan.arrivalDeltaV > 0, true);
  assert.equal(plan.score, plan.deltaV);
  assert.equal(Math.abs(plan.deltaV - (plan.departureDeltaV + plan.arrivalDeltaV)) < 0.01, true);
  assert.equal(plan.phaseAngleDeg >= 0 && plan.phaseAngleDeg <= 360, true);
});

test("Lambert transfer search context rejects bodies without a shared parent", () => {
  const context = getTransferSearchContext("Kerbin", "Mun");

  assert.equal(context.valid, false);
  assert.match(context.reason, /to samo ciało nadrzędne/i);
});

test("input-driven transfer trajectory uses start escape data and reaches target position", () => {
  const departureTime = 0;
  const arrivalTime = 60 * 60 * 24 * 120;
  const options = {
    departureOrbitHeight: 100000,
    departureDeltaV: 950,
    departureEscapeAngle: 15,
    maneuvers: [
      { time: arrivalTime / 2, prograde: 0, normal: 0, radial: 0 },
    ],
  };
  const trajectory = getTransferTrajectory("Kerbin", "Duna", departureTime, arrivalTime, options);

  assert.equal(trajectory.valid, true);
  assert.equal(trajectory.points.length > 2, true);
  assert.equal(trajectory.maneuverPositions.length, 1);
  assertVectorClose(trajectory.points.at(-1), {
    x: getBodyPosition("Duna", arrivalTime).x / 400000000,
    y: getBodyPosition("Duna", arrivalTime).y / 400000000,
    z: getBodyPosition("Duna", arrivalTime).z / 400000000,
  });

  const steeperEscape = getTransferTrajectory("Kerbin", "Duna", departureTime, arrivalTime, {
    ...options,
    departureEscapeAngle: 65,
  });
  assert.equal(steeperEscape.valid, true);
  assert.notDeepEqual(steeperEscape.points[20], trajectory.points[20]);
  assert.equal(
    trajectory.points.every((point) =>
      [point.x, point.y, point.z].every((coordinate) => Number.isFinite(coordinate)),
    ),
    true,
  );
  assert.equal(
    Math.max(...trajectory.points.map((point) => Math.hypot(point.x, point.y, point.z))) < 1000,
    true,
  );
});

test("escape trajectory derives closest body and time from signed ejection angle", () => {
  const trajectory = getEscapeTrajectory("Kerbin", 0, {
    departureOrbitHeight: 100000,
    departureDeltaV: 950,
    departureEscapeAngle: -115.8,
    horizonSeconds: 2 * 426 * 21600,
  });
  const mirroredTrajectory = getEscapeTrajectory("Kerbin", 0, {
    departureOrbitHeight: 100000,
    departureDeltaV: 950,
    departureEscapeAngle: 115.8,
    horizonSeconds: 2 * 426 * 21600,
  });

  assert.equal(trajectory.valid, true);
  assert.equal(typeof trajectory.destinationName, "string");
  assert.equal(trajectory.arrivalTime > 0, true);
  assert.equal(trajectory.encountered, false);
  assert.equal(
    trajectory.points.every((point) =>
      [point.x, point.y, point.z].every((coordinate) => Number.isFinite(coordinate)),
    ),
    true,
  );
  assert.notDeepEqual(trajectory.points[20], mirroredTrajectory.points[20]);
});

test("escape trajectory continues from the post-maneuver state", () => {
  const maneuverTime = 2 * 21600;
  const trajectory = getEscapeTrajectory("Kerbin", 0, {
    departureOrbitHeight: 100000,
    departureDeltaV: 950,
    departureEscapeAngle: 0,
    horizonSeconds: 100 * 21600,
    maneuvers: [{ time: maneuverTime, prograde: 1000, normal: 0, radial: 0 }],
  });
  const maneuverIndex = trajectory.times.indexOf(maneuverTime);

  assert.equal(trajectory.valid, true);
  assert.equal(trajectory.maneuverPositions.length, 1);
  assert.equal(maneuverIndex >= 0, true);
  assert.equal(trajectory.times.at(-1) > maneuverTime, true);
  assert.notDeepEqual(trajectory.points[maneuverIndex], trajectory.points[maneuverIndex + 1]);
});

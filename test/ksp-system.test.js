import test from "node:test";
import assert from "node:assert/strict";

import { getBodyOrbitPoints, getBodyPosition, getTransferState, listTransferBodies } from "../src/ksp-system.js";

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
    x: -568676232.2539349,
    y: -198406748.03839207,
    z: -6286981017.636776,
  });

  assertVectorClose(getBodyPosition("Minmus", 0), {
    x: -13645468805.909271,
    y: 4912696.964371395,
    z: 31725932.445057634,
  });
});

test("orbit paths preserve eccentric periapsis and apoapsis distances", () => {
  const mohoPoints = getBodyOrbitPoints("Moho", 256);
  const distances = mohoPoints.map((point) => Math.hypot(point.x, point.y, point.z));
  const periapsis = Math.min(...distances);
  const apoapsis = Math.max(...distances);

  assert.ok(Math.abs(periapsis - 4210510627.4105854) < 1e-6);
  assert.ok(Math.abs(apoapsis - 6315765980.589414) < 1e-6);
});

import test from "node:test";
import assert from "node:assert/strict";

import { findTransferWindows, getBodyPosition, getTransferState, listTransferBodies } from "../src/ksp-system.js";

function assertVectorClose(actual, expected) {
  assert.ok(Math.abs(actual.x - expected.x) < 1e-9);
  assert.ok(Math.abs(actual.y - expected.y) < 1e-9);
  assert.ok(Math.abs(actual.z - expected.z) < 1e-9);
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

test("transfer window search returns ranked candidates with required fields", () => {
  const results = findTransferWindows("Kerbin", "Duna", 0, 60 * 60 * 24 * 80, {
    minDuration: 60 * 60 * 24 * 20,
    maxDuration: 60 * 60 * 24 * 150,
    departureStep: 60 * 60 * 24 * 3,
    durationStep: 60 * 60 * 24 * 3,
    maxCandidates: 5,
  });

  assert.equal(results.length > 0, true);
  assert.equal(results.length <= 5, true);
  assert.equal(results[0].score <= results[results.length - 1].score, true);

  for (const result of results) {
    assert.equal(Number.isFinite(result.departureTime), true);
    assert.equal(Number.isFinite(result.arrivalTime), true);
    assert.equal(Number.isFinite(result.duration), true);
    assert.equal(Number.isFinite(result.score), true);
    assert.equal(result.arrivalTime > result.departureTime, true);
    assert.equal(result.duration, result.arrivalTime - result.departureTime);
  }
});

test("transfer window search rejects invalid ranges", () => {
  assert.deepEqual(findTransferWindows("Kerbin", "Kerbin", 0, 1000), []);
  assert.deepEqual(findTransferWindows("Kerbin", "Duna", 1000, 1000), []);
});

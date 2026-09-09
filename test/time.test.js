import test from "node:test";
import assert from "node:assert/strict";

import { secondsToTimeParts, timePartsToSeconds } from "../src/time.js";

test("time conversion in elapsed mode keeps zero-based year/day", () => {
  assert.deepEqual(secondsToTimeParts(0, false), {
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  assert.equal(
    timePartsToSeconds({ years: 0, days: 0, hours: 1, minutes: 2, seconds: 3 }, false),
    3723,
  );
});

test("time conversion in one-based calendar mode keeps year/day offset", () => {
  assert.deepEqual(secondsToTimeParts(0, true), {
    years: 1,
    days: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  assert.equal(
    timePartsToSeconds({ years: 1, days: 1, hours: 1, minutes: 2, seconds: 3 }, true),
    3723,
  );
});

test("time conversion clamps invalid values to non-negative integers", () => {
  assert.equal(
    timePartsToSeconds({ years: -2, days: -3, hours: 1.9, minutes: 2.8, seconds: -5 }, false),
    3720,
  );
});

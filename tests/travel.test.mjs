import test from "node:test";
import assert from "node:assert/strict";
import { cameraStop, journey } from "../components/world/observatory/journey.js";
import { createTravel, sampleTravel } from "../components/world/observatory/travel.js";
import { clampZoom, zoomLimits, zoomedPosition } from "../components/world/observatory/viewControls.js";

test("every section pair travels continuously through the corridor to its exact camera", () => {
  for (const compact of [false, true]) for (const from of journey) for (const to of journey) {
    if (from === to) continue;
    const start = cameraStop(from.index, compact), end = cameraStop(to.index, compact);
    const travel = createTravel(start, end);
    assert.deepEqual(sampleTravel(travel, 0), start);
    assert.deepEqual(sampleTravel(travel, 1), end);
    assert.equal(sampleTravel(travel, .5).position[0], 32);
    let previous = start;
    for (let i = 1; i <= 200; i++) {
      const frame = sampleTravel(travel, i / 200);
      assert.ok([...frame.position, ...frame.target, frame.fov].every(Number.isFinite));
      assert.ok(frame.position[1] >= 3);
      assert.ok(Math.hypot(...frame.position.map((v, axis) => v - previous.position[axis])) < 25);
      previous = frame;
    }
    for (const boundary of [.3263518223, .6736481777]) {
      const before = sampleTravel(travel, boundary - .000001);
      const after = sampleTravel(travel, boundary + .000001);
      assert.ok(Math.hypot(...before.position.map((v, axis) => v - after.position[axis])) < .01);
    }
    const midway = sampleTravel(travel, .43);
    const redirected = createTravel(midway, cameraStop((to.index + 2) % journey.length, compact));
    assert.deepEqual(sampleTravel(redirected, 0), midway);
  }
});

test("per-environment dolly steps are visible, bounded, and reset exactly", () => {
  for (const stop of journey) {
    const bounds = zoomLimits(stop.id);
    assert.ok(bounds.step >= .15);
    assert.equal(clampZoom(-10, bounds), bounds.min);
    assert.equal(clampZoom(10, bounds), bounds.max);
    const { position, target } = cameraStop(stop.index);
    const closer = zoomedPosition(position, target, 1 - bounds.step, bounds);
    assert.ok(Math.hypot(...closer.map((v, i) => v - position[i])) > 4);
    assert.deepEqual(zoomedPosition(position, target, 1, bounds), position);
    assert.ok(zoomedPosition(position, target, bounds.min, bounds)[2] - stop.z > 11);
    const far = zoomedPosition(position, target, bounds.max, bounds);
    assert.ok(far[0] <= 25.3 || far[1] >= 22, "far zoom stays outside corridor columns or above its roof");
  }
});

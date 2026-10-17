import test from "node:test";
import assert from "node:assert/strict";
import { clampZoom, MIN_ZOOM, MAX_ZOOM, zoomedPosition } from "../components/world/observatory/viewControls.js";
import { journey, cameraStop } from "../components/world/observatory/journey.js";

test("zoom clamps both directions and reset preserves the authored camera", () => {
  assert.equal(clampZoom(-100), MIN_ZOOM);
  assert.equal(clampZoom(100), MAX_ZOOM);
  for (const compact of [false, true]) for (const entry of journey) {
    const { position, target } = cameraStop(entry.index, compact);
    assert.deepEqual(zoomedPosition(position, target, 1), position);
    for (const zoom of [-100, MIN_ZOOM, MAX_ZOOM, 100]) {
      const result = zoomedPosition(position, target, zoom);
      assert.ok(result.every(Number.isFinite));
      assert.ok(result[1] >= 3);
      assert.ok(result[2] > target[2]);
      assert.ok(result[2] - target[2] >= (position[2] - target[2]) * MIN_ZOOM - .0001);
    }
  }
});

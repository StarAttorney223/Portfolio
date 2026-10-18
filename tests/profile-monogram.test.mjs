import test from "node:test";
import assert from "node:assert/strict";
import { createMonogramGeometry, frameTrace } from "../components/world/observatory/profileMonogram.js";

test("DC has distinct, non-overlapping extruded silhouettes within its frame", () => {
  const geometries = createMonogramGeometry();
  const [d, c] = geometries.map((geometry) => geometry.boundingBox);
  assert.ok(d.max.x < c.min.x);
  for (const geometry of geometries) {
    const box = geometry.boundingBox;
    assert.ok(box.max.z - box.min.z > .4);
    assert.ok(box.min.x > -5.9 && box.max.x < 5.9);
    assert.ok(box.min.y > -4.3 && box.max.y < 4.3);
    assert.ok([...geometry.attributes.position.array].every(Number.isFinite));
    geometry.dispose();
  }
});

test("frame light loops continuously without leaving the metal surround", () => {
  assert.deepEqual(frameTrace(0), frameTrace(1));
  for (let i = 0; i < 1000; i++) {
    const [x, y, z] = frameTrace(i / 1000);
    assert.ok(Math.abs(x) <= 6.1 && Math.abs(y) <= 4.5);
    assert.equal(z, .49);
    const next = frameTrace((i + 1) / 1000);
    assert.ok(Math.hypot(x - next[0], y - next[1]) < .05);
  }
});

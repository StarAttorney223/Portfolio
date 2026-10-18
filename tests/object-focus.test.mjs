import test from "node:test";
import assert from "node:assert/strict";
import { cameraStop, journey } from "../components/world/observatory/journey.js";
import { createObjectFocus, objectFocusView, sampleObjectFocus } from "../components/world/observatory/objectFocus.js";

test("authored focus views stay outside room geometry and restore the original camera exactly", () => {
  const index = journey.findIndex((stop) => stop.id === "profile"), z = journey[index].z;
  for (const compact of [false, true]) for (const id of ["profile", "education"]) {
    const original = cameraStop(index, compact), view = objectFocusView(id, z, compact);
    const travel = createObjectFocus(original, view);
    assert.deepEqual(sampleObjectFocus(travel, 0), original);
    assert.deepEqual(sampleObjectFocus(travel, 1), view);
    for (let i = 0; i <= 100; i++) {
      const frame = sampleObjectFocus(travel, i / 100);
      assert.ok(frame.position[2] - z >= 16);
      assert.ok([...frame.position, ...frame.target, frame.fov].every(Number.isFinite));
    }
    assert.deepEqual(sampleObjectFocus(createObjectFocus(view, original, true, true), 1), original);
  }
  assert.equal(objectFocusView("unknown", z), null);
});

test("repeated focus retargets start at the actual frame and use shortest-arc rotation", () => {
  const index = journey.findIndex((stop) => stop.id === "profile"), z = journey[index].z;
  for (const compact of [false, true]) {
    let current = cameraStop(index, compact);
    for (let i = 0; i < 20; i++) {
      const travel = createObjectFocus(current, objectFocusView(i % 2 ? "profile" : "education", z, compact));
      assert.deepEqual(sampleObjectFocus(travel, 0), current);
      let previous, winding = 0;
      for (let step = 0; step <= 100; step++) {
        const frame = sampleObjectFocus(travel, step / 100);
        const yaw = Math.atan2(frame.target[0] - frame.position[0], frame.target[2] - frame.position[2]);
        if (previous !== undefined) winding += Math.atan2(Math.sin(yaw - previous), Math.cos(yaw - previous));
        previous = yaw;
      }
      assert.ok(Math.abs(winding) < Math.PI);
      current = sampleObjectFocus(travel, .4);
    }
  }
});

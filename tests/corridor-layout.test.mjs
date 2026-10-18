import test from "node:test";
import assert from "node:assert/strict";
import { corridorBounds, corridorDetails, isBoardingBay } from "../components/world/observatory/corridorLayout.js";
import { cameraStop, journey } from "../components/world/observatory/journey.js";
import { createTravel, sampleTravel } from "../components/world/observatory/travel.js";

test("corridor details retain open boarding bays and cover every destination", () => {
  const layout = corridorDetails();
  assert.ok(corridorBounds.start > cameraStop(0, true).position[2]);
  assert.ok(corridorBounds.end < journey.at(-1).z);
  for (const stop of journey) assert.ok(isBoardingBay(stop.z + 22));
  for (const panel of layout.panels.filter((item) => item.position[0] < 32)) assert.equal(isBoardingBay(panel.position[2]), false);
});

test("new corridor panels and ceiling services clear forward and reverse camera paths", () => {
  const { panels, ceiling, services } = corridorDetails();
  for (const compact of [false, true]) for (let i = 0; i < journey.length - 1; i++) for (const [from, to] of [[i, i + 1], [i + 1, i]]) {
    const travel = createTravel(cameraStop(from, compact), cameraStop(to, compact));
    for (let step = 0; step <= 200; step++) {
      const { position } = sampleTravel(travel, step / 200);
      for (const mesh of [...panels, ...ceiling, ...services]) {
        const inside = position.every((value, axis) => Math.abs(value - mesh.position[axis]) < mesh.scale[axis] / 2 + .3);
        assert.equal(inside, false, `${journey[from].id} -> ${journey[to].id} intersects new architecture`);
      }
    }
  }
});

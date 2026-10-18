import test from "node:test";
import assert from "node:assert/strict";
import { Box3, Euler, Matrix4, Quaternion, Vector3 } from "three";
import { facilityLayout, facilityEnvelope, facilityThemes } from "../components/world/observatory/facilityLayout.js";
import { skillClusters, developmentMilestones } from "../components/world/observatory/facilitySystems.js";
import { skillsCategories } from "../data/skills.js";
import { experienceData } from "../data/experience.js";
import { journey, cameraStop } from "../components/world/observatory/journey.js";
import { createTravel, sampleTravel } from "../components/world/observatory/travel.js";
import { objectFocusView, createObjectFocus, sampleObjectFocus } from "../components/world/observatory/objectFocus.js";

function bounds(item, z) {
  const matrix = new Matrix4().compose(new Vector3(item.position[0], item.position[1], item.position[2] + z), new Quaternion().setFromEuler(new Euler(...(item.rotation || [0, 0, 0]))), new Vector3(...item.scale));
  return new Box3(new Vector3(-.5, -.5, -.5), new Vector3(.5, .5, .5)).applyMatrix4(matrix);
}

test("all nine non-home destinations have supported, bounded architectural detail", () => {
  assert.equal(facilityLayout("home"), null);
  assert.equal(Object.keys(facilityThemes).length, journey.length - 1);
  for (const entry of journey.slice(1)) {
    const layout = facilityLayout(entry.id);
    let count = 0;
    for (const [key, items] of Object.entries(layout)) {
      if (key === "theme") continue;
      count += items.length;
      for (const item of items) {
        assert.ok(item.position.every(Number.isFinite));
        assert.ok(item.scale.every((v) => Number.isFinite(v) && v > 0));
        assert.ok(item.position[0] + item.scale[0] / 2 < 25, "boarding bay must remain open");
      }
    }
    assert.ok(count < 270, "instanced detail budget");
    assert.ok(facilityLayout(entry.id, true).hardware.length < layout.hardware.length);
    assert.ok(layout.panels.some((item) => item.position[2] === -47), "segmented rear gallery should add background depth");
    assert.equal(layout.panels.filter((item) => item.position[2] === -47).length, layout.theme.bays);
    assert.ok(layout.frames.some((item) => item.position[1] === 22.2 && item.scale[2] >= 50), "destination should be enclosed by ceiling trusses");
    assert.ok(!layout.panels.some((item) => item.position[2] === -38 && item.scale[0] >= 30), "rear gallery should not use a full-width slab");
    const lastStep = layout.frames.at(-1);
    assert.ok(lastStep.position[2] - lastStep.scale[2] / 2 <= -22.5);
    assert.equal(lastStep.position[1] + lastStep.scale[1] / 2, layout.theme.level);
  }
  assert.equal(facilityEnvelope(true).shells.length, 24);
  assert.equal(facilityEnvelope(false).shells.length, 48);
});

test("new room geometry clears every forward and reverse corridor journey", () => {
  const boxes = journey.slice(1).flatMap((entry) => Object.entries(facilityLayout(entry.id)).filter(([key]) => key !== "theme").flatMap(([, items]) => items.map((item) => bounds(item, entry.z))));
  for (const compact of [false, true]) for (let a = 0; a < journey.length; a++) for (let b = 0; b < journey.length; b++) {
    if (a === b) continue;
    const travel = createTravel(cameraStop(a, compact), cameraStop(b, compact));
    for (let step = 0; step <= 100; step++) {
      const position = new Vector3(...sampleTravel(travel, step / 100).position);
      assert.ok(!boxes.some((box) => box.containsPoint(position)), `collision ${a} -> ${b}`);
    }
  }
});

test("close-up paths remain unobstructed by the added architecture", () => {
  for (const [room, ids] of [["profile", ["profile", "education"]], ["about", ["journey", "build", "work"]], ["contact", ["email", "github", "linkedin"]]]) {
    const entry = journey.find((item) => item.id === room);
    const boxes = Object.entries(facilityLayout(room)).filter(([key]) => key !== "theme").flatMap(([, items]) => items.map((item) => bounds(item, entry.z)));
    for (const compact of [false, true]) for (const id of ids) {
      const travel = createObjectFocus(cameraStop(entry.index, compact), objectFocusView(id, entry.z, compact));
      for (let step = 0; step <= 100; step++) assert.ok(!boxes.some((box) => box.containsPoint(new Vector3(...sampleObjectFocus(travel, step / 100).position))));
    }
  }
});

test("technology clusters and development milestones use only existing portfolio data", () => {
  assert.deepEqual(skillClusters.map((item) => item.id), skillsCategories.map((item) => item.id));
  assert.equal(new Set(skillClusters.map((item) => item.position.join(","))).size, skillsCategories.length);
  for (const item of developmentMilestones) {
    const source = experienceData.find((original) => original.id === item.id);
    assert.ok(source);
    assert.equal(item.period, source.period);
    assert.equal(item.description, source.description);
    assert.ok(!/editable|placeholder|\[/.test(item.label.toLowerCase()));
  }
});

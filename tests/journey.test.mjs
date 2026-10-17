import test from "node:test";
import assert from "node:assert/strict";
import { journey, worldProjects, indexForRoute, cameraStop, interpolateCamera } from "../components/world/observatory/journey.js";
import { projectsData } from "../data/projects.js";
import { projectRegistry } from "../components/world/observatory/projectRegistry.js";

test("project scenes are bound by stable IDs, with authored cameras", () => {
  const environments = { ether: "atelier", unravel: "compute", physiogenie: "motion", pixelchat: "exchange", atmosalert: "weather" };
  for (const [id, environment] of Object.entries(environments)) {
    const config = projectRegistry[id];
    const stop = journey.find((entry) => entry.id === id);
    assert.equal(config.environment, environment);
    assert.equal(stop.project, config.project);
    assert.equal(stop.environment, environment);
    assert.equal(indexForRoute(config.route), stop.index);
    assert.ok(cameraStop(stop.index).fov > 0);
    assert.ok(config.zone.toLowerCase().includes(id === "ether" ? "ether" : id));
  }
});

test("all existing projects and their external links are retained", () => {
  for (const project of projectsData) {
    assert.equal(worldProjects.find((item) => item.id === project.id), project);
    assert.ok(journey.some((stop) => stop.project === project));
  }
  const weather = worldProjects.find((project) => project.id === "atmosalert");
  assert.deepEqual(weather.links, {});
  assert.deepEqual(weather.techStack, []);
});

test("every destination has a unique URL and resolves to its camera stop", () => {
  assert.equal(new Set(journey.map((stop) => stop.route)).size, journey.length);
  for (const stop of journey) assert.equal(indexForRoute(stop.route), stop.index);
  assert.equal(indexForRoute("/projects/ether"), indexForRoute("/projects"));
});

test("camera interpolation is continuous and reaches every desktop and mobile stop", () => {
  for (const compact of [false, true]) {
    for (const stop of journey) {
      assert.deepEqual(interpolateCamera(stop.index, compact), cameraStop(stop.index, compact));
      if (!stop.index) continue;
      const before = interpolateCamera(stop.index - .0001, compact);
      const after = interpolateCamera(stop.index + .0001, compact);
      for (const field of ["position", "target"]) for (let axis = 0; axis < 3; axis++) {
        assert.ok(Number.isFinite(before[field][axis]));
        assert.ok(Math.abs(before[field][axis] - after[field][axis]) < .01);
      }
    }
  }
  assert.deepEqual(interpolateCamera(-3), cameraStop(0));
  assert.deepEqual(interpolateCamera(100), cameraStop(journey.length - 1));
});

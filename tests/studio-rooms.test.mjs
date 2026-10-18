import test from "node:test";
import assert from "node:assert/strict";
import { journey, cameraStop } from "../components/world/observatory/journey.js";
import { createObjectFocus, objectFocusView, sampleObjectFocus } from "../components/world/observatory/objectFocus.js";
import { profileData } from "../data/profile.js";
import { aboutDisplays, contactDisplays, displayFocus } from "../components/world/observatory/studioDisplays.js";
import { contactMethod, openContact } from "../components/world/observatory/contactMethods.js";
import { PerspectiveCamera, Vector3 } from "three";

test("About and Contact focus views remain outside architecture and return exactly", () => {
  for (const [room, ids] of [["about", ["journey", "build", "work"]], ["contact", ["email", "github", "linkedin"]]]) {
    const entry = journey.find((item) => item.id === room);
    for (const compact of [false, true]) for (const id of ids) {
      const start = cameraStop(entry.index, compact), end = objectFocusView(id, entry.z, compact);
      const travel = createObjectFocus(start, end);
      for (let i = 0; i <= 100; i++) {
        const frame = sampleObjectFocus(travel, i / 100);
        assert.ok(frame.position[2] - entry.z >= 13);
        assert.ok([...frame.position, ...frame.target, frame.fov].every(Number.isFinite));
      }
      assert.deepEqual(sampleObjectFocus(travel, 1), end);
      assert.deepEqual(sampleObjectFocus(createObjectFocus(end, start, true, true), 1), start);
    }
  }
});

test("each physical display has a distinct close-up with all corners inside the viewport", () => {
  for (const [compact, aspect, width] of [[false, 1280 / 632, 1280], [false, 1024 / 680, 1024], [false, 768 / 936, 768], [true, 390 / 776, 390], [true, 360 / 712, 360]]) {
    const displays = [...aboutDisplays, ...contactDisplays(compact)];
    const poses = new Set();
    for (const display of displays) {
      const view = displayFocus(display.id, compact, aspect, width);
      poses.add(view.position.join(","));
      const camera = new PerspectiveCamera(view.fov, aspect, .1, 200);
      camera.position.set(...view.position); camera.lookAt(...view.target); camera.updateMatrixWorld();
      for (const x of [-1, 1]) for (const y of [-1, 1]) {
        const corner = new Vector3(display.position[0] + x * (display.size[0] + .3) * .52, display.position[1] + y * (display.size[1] + .3) * .52, display.position[2] + .5).project(camera);
        assert.ok(Math.abs(corner.x) < .98 && Math.abs(corner.y) < .98, `${display.id}: clipped at ${aspect}: ${corner.toArray()}`);
        assert.ok(corner.z > -1 && corner.z < 1);
        if (!compact) assert.ok((corner.x + 1) * width / 2 > 418, `${display.id}: covered by information rail`);
      }
    }
    assert.equal(poses.size, 6);
  }
});

test("contact actions only resolve verified configuration", () => {
  assert.equal(contactMethod("email").url, "mailto:divyanshchandrakar2005@gmail.com");
  assert.equal(contactMethod("github").url, "https://github.com/StarAttorney223");
  assert.equal(contactMethod("linkedin"), null);
  assert.equal(contactMethod("unknown"), null);
});

test("direct terminal actions open the configured destination safely and ignore placeholders", () => {
  const original = globalThis.window, opened = [];
  globalThis.window = { location: { href: "" }, open: (...args) => opened.push(args) };
  try {
    openContact("github");
    assert.deepEqual(opened, [["https://github.com/StarAttorney223", "_blank", "noopener,noreferrer"]]);
    openContact("email");
    assert.equal(window.location.href, "mailto:divyanshchandrakar2005@gmail.com");
    openContact("linkedin");
    assert.equal(opened.length, 1);
  } finally {
    if (original === undefined) delete globalThis.window;
    else globalThis.window = original;
  }
});

test("rapid switches between all cards restart at the actual camera and never wind a full turn", () => {
  const entry = journey.find((item) => item.id === "about");
  let current = cameraStop(entry.index);
  for (const id of ["journey", "work", "build", "journey", "work"]) {
    const travel = createObjectFocus(current, objectFocusView(id, entry.z, false));
    assert.deepEqual(sampleObjectFocus(travel, 0), current);
    assert.ok(travel.startRotation.angleTo(travel.endRotation) < Math.PI);
    current = sampleObjectFocus(travel, .37);
  }
  assert.equal(createObjectFocus(current, cameraStop(entry.index), true).duration, 160);
});

test("Contact uses configured identity and explicitly flags the unverified LinkedIn placeholder", () => {
  assert.equal(profileData.socials.find((item) => item.label === "EMAIL").url, "mailto:divyanshchandrakar2005@gmail.com");
  assert.equal(profileData.socials.find((item) => item.label === "GITHUB").url, "https://github.com/StarAttorney223");
  assert.equal(profileData.socials.find((item) => item.label === "LINKEDIN").configured, false);
});

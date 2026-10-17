import test from "node:test";
import assert from "node:assert/strict";
import { cameraStop, journey } from "../components/world/observatory/journey.js";
import { createTravel, retraceTravel, sampleTravel, travelParameter } from "../components/world/observatory/travel.js";

const distance = (a, b) => Math.hypot(...a.map((v, i) => v - b[i]));
const yaw = ({ position, target }) => Math.atan2(position[0] - target[0], position[2] - target[2]);
const shortest = (angle) => Math.atan2(Math.sin(angle), Math.cos(angle));

function checkView(travel) {
  let last = sampleTravel(travel, 0), winding = 0;
  for (let i = 1; i <= 1000; i++) {
    const frame = sampleTravel(travel, i / 1000);
    const turn = shortest(yaw(frame) - yaw(last));
    assert.ok(Math.abs(turn) < .06, "no orientation snap");
    assert.ok([...frame.position, ...frame.target, frame.fov].every(Number.isFinite));
    winding += turn;
    last = frame;
  }
  const expected = shortest(yaw(travel.end) - yaw(travel.start));
  assert.ok(Math.abs(winding - expected) < 1e-8, "no extra full rotation");
  assert.deepEqual(last, travel.end);
}

test("every adjacent backward journey exactly retraces its forward position path", () => {
  for (const compact of [false, true]) for (let i = 0; i < journey.length - 1; i++) {
    const a = cameraStop(i, compact), b = cameraStop(i + 1, compact);
    const forward = createTravel(a, b), backward = createTravel(b, a);
    assert.equal(forward.duration, backward.duration);
    for (let sample = 0; sample <= 1000; sample++) {
      assert.ok(distance(sampleTravel(forward, 1 - sample / 1000).position, sampleTravel(backward, sample / 1000).position) < 1e-9);
    }
    checkView(backward);
    const middle = sampleTravel(backward, .5);
    assert.ok(middle.target[2] > middle.position[2], "reverse corridor view faces travel direction");
  }
});

test("an interrupted next/previous journey rewinds the same curve without position jumps", () => {
  for (const compact of [false, true]) for (let i = 0; i < journey.length - 1; i++) {
    const a = cameraStop(i, compact), b = cameraStop(i + 1, compact);
    const forward = createTravel(a, b);
    forward.endpointIndices = [i, i + 1];
    for (const fraction of [.1, .3, .5, .8]) {
      forward.parameter = travelParameter(forward, fraction);
      const start = sampleTravel(forward, fraction);
      const reverse = retraceTravel(start, a, forward, 0);
      assert.deepEqual(sampleTravel(reverse, 0), start);
      checkView(reverse);
      reverse.parameter = travelParameter(reverse, .4);
      const resumed = retraceTravel(sampleTravel(reverse, .4), b, reverse, 1);
      assert.equal(resumed.curve, forward.curve);
      assert.deepEqual(sampleTravel(resumed, 0), sampleTravel(reverse, .4));
      checkView(resumed);
    }
  }
});

test("normal forward paths and look-at targets retain the original sampling", () => {
  const ease = (t) => t * t * (3 - 2 * t);
  const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
  const cubic = (a, b, c, d, t) => a.map((v, i) => (1 - t) ** 3 * v + 3 * (1 - t) ** 2 * t * b[i] + 3 * (1 - t) * t * t * c[i] + t ** 3 * d[i]);
  for (const compact of [false, true]) for (let i = 0; i < journey.length - 1; i++) {
    const start = cameraStop(i, compact), end = cameraStop(i + 1, compact);
    const travel = createTravel(start, end);
    assert.equal(travel.view, null);
    const { entry, exit, lead, direction } = travel;
    const point = (t) => t < .25
      ? cubic(start.position, [Math.min(32, start.position[0] + 9), start.position[1], start.position[2]], [32, 10, entry[2] - direction * lead], entry, t * 4)
      : t <= .75 ? cubic(entry, [32, 10, entry[2] + direction * lead * 2], [32, 10, exit[2] - direction * lead * 2], exit, (t - .25) * 2)
        : cubic(exit, [32, 10, exit[2] + direction * lead], [Math.min(32, end.position[0] + 9), end.position[1], end.position[2]], end.position, (t - .75) * 4);
    for (let n = 1; n < 100; n++) {
      const t = ease(n / 100), position = point(t), ahead = point(Math.min(1, t + .005));
      const length = distance(ahead, position) || 1;
      let target = position.map((v, axis) => v + (ahead[axis] - v) / length * 18);
      target = mix(start.target, target, ease(Math.min(1, t / .22)));
      target = mix(target, end.target, ease(Math.max(0, (t - .76) / .24)));
      assert.deepEqual(sampleTravel(travel, n / 100), { position, target, fov: start.fov + (end.fov - start.fov) * t });
    }
  }
});

import { Matrix4, Quaternion, Vector3 } from "three";

const mix = (a, b, t) => a.map((value, axis) => value + (b[axis] - value) * t);
const ease = (t) => t * t * (3 - 2 * t);
const cubic = (a, b, c, d, t) => a.map((value, axis) => (1 - t) ** 3 * value + 3 * (1 - t) ** 2 * t * b[axis] + 3 * (1 - t) * t * t * c[axis] + t ** 3 * d[axis]);

export function createTravel(start, end, duration = 1800) {
  const direction = end.position[2] < start.position[2] ? -1 : 1;
  const lead = Math.min(12, Math.abs(end.position[2] - start.position[2]) / 6);
  const entry = [32, 10, start.position[2] + direction * lead];
  const exit = [32, 10, end.position[2] - direction * lead];
  const curve = { start, end, entry, exit, direction, lead };
  return { ...curve, duration, curve, from: 0, to: 1, view: direction > 0 ? reverseView(start, end, direction) : null };
}

function lookRotation(position, target) {
  return new Quaternion().setFromRotationMatrix(new Matrix4().lookAt(new Vector3(...position), new Vector3(...target), new Vector3(0, 1, 0)));
}

function reverseView(start, end, direction) {
  const yaw = (frame) => Math.atan2(frame.position[0] - frame.target[0], frame.position[2] - frame.target[2]);
  const shortest = (angle) => Math.atan2(Math.sin(angle), Math.cos(angle));
  const laneYaw = direction > 0 ? Math.PI : 0;
  const departure = shortest(laneYaw - yaw(start));
  const arrival = shortest(yaw(end) - laneYaw);
  return {
    start: lookRotation(start.position, start.target),
    lane: lookRotation([0, 0, 0], [0, 0, direction]),
    end: lookRotation(end.position, end.target),
    // An interrupted view can lie on the other side of the yaw seam. Restore
    // the room-facing heading first instead of completing a full turn around it.
    stabilize: departure * arrival > 0 && Math.abs(departure + arrival) > Math.PI,
  };
}

export function retraceTravel(start, end, previous, endpoint, duration = previous.duration) {
  const travel = createTravel(start, end, duration);
  return { ...travel, curve: previous.curve, from: previous.parameter, to: endpoint, endpointIndices: previous.endpointIndices, view: reverseView(start, end, travel.direction) };
}

export function travelParameter(travel, fraction) {
  return travel.from + (travel.to - travel.from) * ease(Math.max(0, Math.min(1, fraction)));
}

function viewTarget(view, position, t) {
  let orientation;
  if (view.stabilize && t < .12) orientation = view.start.clone().slerp(view.end, ease(t / .12));
  else if (t < .25) orientation = (view.stabilize ? view.end : view.start).clone().slerp(view.lane, ease(view.stabilize ? (t - .12) / .13 : t / .25));
  else orientation = view.lane.clone().slerp(view.end, ease(Math.max(0, (t - .76) / .24)));
  return new Vector3(0, 0, -18).applyQuaternion(orientation).add(new Vector3(...position)).toArray();
}

function point(travel, t) {
  const { start, end, entry, exit, direction, lead } = travel.curve;
  if (t < .25) return cubic(start.position, [Math.min(32, start.position[0] + 9), start.position[1], start.position[2]], [32, 10, entry[2] - direction * lead], entry, t * 4);
  if (t <= .75) return cubic(entry, [32, 10, entry[2] + direction * lead * 2], [32, 10, exit[2] - direction * lead * 2], exit, (t - .25) * 2);
  return cubic(exit, [32, 10, exit[2] + direction * lead], [Math.min(32, end.position[0] + 9), end.position[1], end.position[2]], end.position, (t - .75) * 4);
}

export function sampleTravel(travel, fraction) {
  const raw = Math.max(0, Math.min(1, fraction));
  const t = ease(raw);
  const parameter = travelParameter(travel, raw);
  const position = point(travel, parameter);
  const ahead = point(travel, Math.min(1, parameter + .005));
  const length = Math.hypot(...ahead.map((v, i) => v - position[i])) || 1;
  let target = position.map((v, i) => v + (ahead[i] - v) / length * 18);
  target = mix(travel.start.target, target, ease(Math.min(1, t / .22)));
  target = mix(target, travel.end.target, ease(Math.max(0, (t - .76) / .24)));
  if (travel.view) target = viewTarget(travel.view, position, t);
  return { position: raw === 0 ? [...travel.start.position] : raw === 1 ? [...travel.end.position] : position, target: raw === 0 ? [...travel.start.target] : raw === 1 ? [...travel.end.target] : target, fov: travel.start.fov + (travel.end.fov - travel.start.fov) * t };
}

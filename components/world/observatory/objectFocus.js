import { Matrix4, Quaternion, Vector3 } from "three";
import { displayFocus } from "./studioDisplays.js";

const views = {
  profile: { position: [12, 8, 20], target: [3, 7, -4.5], fov: 44, mobile: { position: [9, 9, 31], target: [8, .5, -4.5], fov: 50 } },
  education: { position: [4, 6, 16], target: [-8, 4, 1], fov: 44, mobile: { position: [-3, 6, 24], target: [-4.5, 1, 1], fov: 45 } },
};

export function objectFocusView(id, roomZ, compact, aspect, viewportWidth) {
  const display = displayFocus(id, compact, aspect, viewportWidth);
  if (display) return { ...display, position: display.position.map((v, i) => i === 2 ? v + roomZ : v), target: display.target.map((v, i) => i === 2 ? v + roomZ : v) };
  const config = views[id];
  if (!config) return null;
  const view = compact ? config.mobile : config;
  return { position: view.position.map((v, i) => i === 2 ? v + roomZ : v), target: view.target.map((v, i) => i === 2 ? v + roomZ : v), fov: view.fov };
}

export function createObjectFocus(start, end, reduced = false, returning = false) {
  const rotation = (frame) => new Quaternion().setFromRotationMatrix(new Matrix4().lookAt(new Vector3(...frame.position), new Vector3(...frame.target), new Vector3(0, 1, 0)));
  return { kind: "object", start, end, duration: reduced ? 160 : 850, returning, startedAt: null, startRotation: rotation(start), endRotation: rotation(end) };
}

export function sampleObjectFocus(travel, fraction) {
  const raw = Math.max(0, Math.min(1, fraction));
  if (raw === 0) return travel.start;
  if (raw === 1) return travel.end;
  const t = raw * raw * (3 - 2 * raw);
  const mix = (a, b) => a.map((value, i) => value + (b[i] - value) * t);
  const position = mix(travel.start.position, travel.end.position);
  const orientation = travel.startRotation.clone().slerp(travel.endRotation, t);
  const distance = (frame) => Math.hypot(...frame.position.map((v, i) => v - frame.target[i]));
  const length = distance(travel.start) + (distance(travel.end) - distance(travel.start)) * t;
  const target = new Vector3(0, 0, -length).applyQuaternion(orientation).add(new Vector3(...position)).toArray();
  return { position, target, fov: travel.start.fov + (travel.end.fov - travel.start.fov) * t };
}

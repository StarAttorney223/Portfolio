const mix = (a, b, t) => a.map((value, axis) => value + (b[axis] - value) * t);
const ease = (t) => t * t * (3 - 2 * t);
const cubic = (a, b, c, d, t) => a.map((value, axis) => (1 - t) ** 3 * value + 3 * (1 - t) ** 2 * t * b[axis] + 3 * (1 - t) * t * t * c[axis] + t ** 3 * d[axis]);

export function createTravel(start, end, duration = 1800) {
  const direction = end.position[2] < start.position[2] ? -1 : 1;
  const lead = Math.min(12, Math.abs(end.position[2] - start.position[2]) / 6);
  const entry = [32, 10, start.position[2] + direction * lead];
  const exit = [32, 10, end.position[2] - direction * lead];
  return { start, end, duration, entry, exit, direction, lead };
}

function point(travel, t) {
  const { start, end, entry, exit, direction, lead } = travel;
  if (t < .25) return cubic(start.position, [Math.min(32, start.position[0] + 9), start.position[1], start.position[2]], [32, 10, entry[2] - direction * lead], entry, t * 4);
  if (t <= .75) return cubic(entry, [32, 10, entry[2] + direction * lead * 2], [32, 10, exit[2] - direction * lead * 2], exit, (t - .25) * 2);
  return cubic(exit, [32, 10, exit[2] + direction * lead], [Math.min(32, end.position[0] + 9), end.position[1], end.position[2]], end.position, (t - .75) * 4);
}

export function sampleTravel(travel, fraction) {
  const raw = Math.max(0, Math.min(1, fraction));
  const t = ease(raw);
  const position = point(travel, t);
  const ahead = point(travel, Math.min(1, t + .005));
  const length = Math.hypot(...ahead.map((v, i) => v - position[i])) || 1;
  let target = position.map((v, i) => v + (ahead[i] - v) / length * 18);
  target = mix(travel.start.target, target, ease(Math.min(1, t / .22)));
  target = mix(target, travel.end.target, ease(Math.max(0, (t - .76) / .24)));
  return { position: raw === 1 ? [...travel.end.position] : position, target: raw === 1 ? [...travel.end.target] : target, fov: travel.start.fov + (travel.end.fov - travel.start.fov) * t };
}

export const MIN_ZOOM = .65;
export const MAX_ZOOM = 1.85;

const limits = {
  home: { min: .8, max: 1.7, step: .18 },
  profile: { min: .67, max: 1.65, step: .18 },
  ether: { min: .67, max: 1.85, step: .18 },
  unravel: { min: .67, max: 1.8, step: .18 },
  physiogenie: { min: .68, max: 1.8, step: .18 },
  pixelchat: { min: .7, max: 1.85, step: .18 },
  skills: { min: .67, max: 1.8, step: .18 },
  experience: { min: .68, max: 1.6, step: .18 },
  about: { min: .7, max: 1.5, step: .18 },
  contact: { min: .65, max: 1.65, step: .18 },
};

export function zoomLimits(id) {
  return limits[id] || { min: MIN_ZOOM, max: MAX_ZOOM, step: .18 };
}

export function clampZoom(value, bounds = { min: MIN_ZOOM, max: MAX_ZOOM }) {
  return Math.max(bounds.min, Math.min(bounds.max, value));
}

// Stay on the authored, exterior approach ray; never orbit behind the installation.
export function zoomedPosition(position, target, zoom, bounds) {
  const distance = clampZoom(zoom, bounds);
  return position.map((value, axis) => axis === 1
    ? Math.max(3, target[axis] + (value - target[axis]) * distance)
    : target[axis] + (value - target[axis]) * distance);
}

import { journey } from "./journey.js";

export const corridorBounds = { start: 48, end: journey.at(-1).z - 60, centerX: 32 };
export const isBoardingBay = (z, clearance = 20) => journey.some((stop) => Math.abs(z - (stop.z + 22)) < clearance || Math.abs(z - (stop.z + (stop.mobile?.position[2] || 40))) < clearance);

export function corridorDetails() {
  const frames = [], panels = [], ceiling = [], inlays = [], fixtures = [], services = [];
  for (let z = 36; z > corridorBounds.end; z -= 12) {
    ceiling.push({ position: [32, 21.6, z], scale: [10.5, .18, 3.5] });
    inlays.push({ position: [32, -.475, z], scale: [7.8, .035, .09] });
    fixtures.push({ position: [32, 19.62, z], scale: [6, .07, .18] });
    services.push({ position: [32, 19.8, z], scale: [6.6, .25, .5] });
    for (const x of [29, 35]) services.push({ position: [x, 20.7, z], scale: [.08, 1.8, .12] });
    if (!isBoardingBay(z, 14)) frames.push({ position: [26, 10, z], scale: [.65, 20, .7] }, { position: [38, 10, z], scale: [.65, 20, .7] }, { position: [32, 20, z], scale: [13, .65, .7] });
    panels.push({ position: [39.1, 6, z], scale: [.3, 10, 10.8] });
    if (!isBoardingBay(z)) panels.push({ position: [24.9, 6, z], scale: [.3, 10, 10.8] });
  }
  return { frames, panels, ceiling, inlays, fixtures, services };
}

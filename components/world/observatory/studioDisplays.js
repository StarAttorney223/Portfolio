// Shared dimensions keep camera framing and the physical displays in agreement.
export const aboutDisplays = [
  { id: "journey", label: "MY JOURNEY", title: "B.TECH / CSE", position: [-2, 4, 3], size: [5.1, 3.5] },
  { id: "build", label: "WHAT I BUILD", title: "WEB + AI + 3D", position: [7, 4, 3], size: [5.1, 3.5] },
  { id: "work", label: "HOW I WORK", title: "DESIGN / DEVELOP", position: [16, 4, 3], size: [5.1, 3.5] },
];

export function contactDisplays(compact = false) {
  return ["email", "github", "linkedin"].map((id, i) => ({ id, label: id.toUpperCase(), position: [7 + (i - 1) * (compact ? 5 : 7), 6, 9], size: [4.6, 4.8] }));
}

export function displayFocus(id, compact, aspect = compact ? 390 / 776 : 1280 / 632, viewportWidth = compact ? 390 : 1280) {
  const display = [...aboutDisplays, ...contactDisplays(compact)].find((item) => item.id === id);
  if (!display) return null;
  const fov = 44, tangent = Math.tan(fov * Math.PI / 360);
  const [width, height] = display.size;
  // Reserve the left rail on desktop and the lower information panel on mobile.
  const centerX = compact ? 0 : Math.min(.62, 430 / viewportWidth);
  const distance = Math.max(10.5, width / (2 * tangent * aspect * (compact ? .73 : (1 - centerX) * .8)), height / (2 * tangent * (compact ? .46 : .62)));
  const shiftX = distance * tangent * aspect * centerX;
  const shiftY = compact ? distance * tangent * .42 : 0;
  const [x, y, z] = display.position;
  return { position: [x - shiftX, y + .8 - shiftY, z + distance], target: [x - shiftX, y - shiftY, z], fov };
}

import { ExtrudeGeometry, Path, Shape } from "three";

export function createMonogramGeometry() {
  const d = new Shape();
  d.moveTo(-4.8, -3); d.lineTo(-4.8, 3); d.lineTo(-2.8, 3);
  d.bezierCurveTo(.1, 3, .1, -3, -2.8, -3); d.closePath();
  const counter = new Path();
  counter.moveTo(-3.7, -1.9); counter.lineTo(-2.8, -1.9);
  counter.bezierCurveTo(-1.35, -1.9, -1.35, 1.9, -2.8, 1.9);
  counter.lineTo(-3.7, 1.9); counter.closePath();
  d.holes.push(counter);

  const c = new Shape();
  const start = Math.PI * .23, end = Math.PI * 1.77;
  c.absarc(3.1, 0, 3, start, end, false);
  c.lineTo(3.1 + 1.9 * Math.cos(end), 1.9 * Math.sin(end));
  c.absarc(3.1, 0, 1.9, end, start, true); c.closePath();
  const options = { depth: .38, steps: 1, bevelEnabled: true, bevelThickness: .065, bevelSize: .055, bevelSegments: 2, curveSegments: 24 };
  return [d, c].map((shape) => {
    const geometry = new ExtrudeGeometry(shape, options);
    geometry.computeBoundingBox();
    return geometry;
  });
}

// Clockwise perimeter trace; the emissive runner remains attached to the frame.
export function frameTrace(fraction) {
  const width = 12.2, height = 9;
  const distance = ((fraction % 1 + 1) % 1) * 2 * (width + height);
  if (distance < width) return [-width / 2 + distance, height / 2, .49];
  if (distance < width + height) return [width / 2, height / 2 - (distance - width), .49];
  if (distance < 2 * width + height) return [width / 2 - (distance - width - height), -height / 2, .49];
  return [-width / 2, -height / 2 + (distance - 2 * width - height), .49];
}

const box = (position, scale, rotation) => ({ position, scale, ...(rotation ? { rotation } : {}) });

export const facilityThemes = {
  profile: { name: "IDENTITY ARCHIVE", accent: "#c5b38b", level: 3.8, bays: 3 },
  ether: { name: "CREATIVE SYSTEMS / ENGINEERING HANGAR", accent: "#bca482", level: 5, bays: 2 },
  unravel: { name: "COMPUTE / EXECUTION INFRASTRUCTURE", accent: "#a7c7c9", level: 6, bays: 4 },
  physiogenie: { name: "VISUAL COMPUTING / RESEARCH BAY", accent: "#b5d1cb", level: 3.5, bays: 3 },
  pixelchat: { name: "REAL-TIME / TRANSMISSION EXCHANGE", accent: "#c7b58b", level: 5.5, bays: 2 },
  skills: { name: "TECHNOLOGY CORE / SYSTEM INTEGRATION", accent: "#a9c8c8", level: 6, bays: 3 },
  experience: { name: "DEVELOPMENT OPERATIONS / MILESTONES", accent: "#cabc9c", level: 4.5, bays: 3 },
  about: { name: "PROTOTYPING / PRECISION ASSEMBLY", accent: "#c5ad80", level: 4, bays: 2 },
  contact: { name: "COMMUNICATIONS / SIGNAL INFRASTRUCTURE", accent: "#bad2cb", level: 5, bays: 3 },
};

export function facilityLayout(id, compact = false) {
  const theme = facilityThemes[id];
  if (!theme) return null;
  const frames = [], panels = [], lights = [], floor = [], seams = [], services = [], hardware = [];
  for (const x of [-9, 7, 23]) {
    frames.push(box([x, 9, -31], [.7, 18, 1.1]));
    frames.push(box([x, 17.4, -20], [.6, .7, 23]));
    lights.push(box([x + .4, 9, -30.4], [.045, 11, .06]));
  }
  for (const z of [-31, -22, -15]) {
    frames.push(box([7, 18, z], [33, .8, 1]));
    services.push(box([7, 18.7, z], [30, .2, .25]));
    lights.push(box([7, 17.5, z], [25, .055, .15]));
    for (const side of [-1, 1]) frames.push(box([7 + side * 14, 15.5, z], [.3, 6, .4], [0, 0, side * -.65]));
  }
  for (const z of [-8, 2, 12]) {
    frames.push(box([7, 18.5, z], [32, .55, .9]));
    lights.push(box([7, 18.18, z], [25, .05, .12]));
  }
  for (const x of [-5, 3, 11, 19]) panels.push(box([x, 19.3, 0], [4, .3, 34]));
  for (const x of [-9, 23]) frames.push(box([x, 9, 10], [.5, 18, .7]));
  panels.push(box([7, -.5, -22], [34, .8, 26]));
  panels.push(box([7, theme.level - .35, -30], [32, .7, 12]));
  for (const x of [-7, 7, 21]) frames.push(box([x, theme.level / 2 - .3, -34], [.6, theme.level, 1]));
  panels.push(box([7, 8, -38], [34, 17, .7]));
  for (let i = 0; i < theme.bays; i++) {
    const x = -6 + i * 26 / Math.max(1, theme.bays - 1);
    panels.push(box([x, 9, -37.5], [5.6, 12, .25]));
    frames.push(box([x, 15.3, -37.2], [6.1, .3, .5]));
    lights.push(box([x, 14.9, -37.1], [4.6, .07, .06]));
    for (let j = 0; j < (compact ? 3 : 7); j++) hardware.push(box([x, 4 + j * 1.35, -37.25], [4.8, .12, .22]));
  }
  for (let x = -6; x <= 20; x += 6.5) for (let z = -10; z <= 8; z += 6) {
    floor.push(box([x, .09, z], [6.35, .045, 5.85]));
    seams.push(box([x - 2.7, .12, z - 2.5], [.8, .025, .055]));
  }
  for (const x of [-8.5, 22.5]) {
    frames.push(box([x, 1.1, -7], [.25, 2.2, 32]));
    services.push(box([x, 13.7, -12], [.4, .3, 36]));
    lights.push(box([x, 13.5, -12], [.07, .04, 35]));
    for (let z = -28; z <= 3; z += 5) hardware.push(box([x, 13, z], [.9, .1, .45]));
  }
  // The rear service gallery is physically supported; no geometry enters the boarding bay.
  for (let i = 0; i < 8; i++) frames.push(box([-7, (i + 1) * theme.level / 8 / 2, -14.3 - i * 1.1], [3, (i + 1) * theme.level / 8, 1.12]));
  return { theme, frames, panels, lights, floor, seams, services, hardware };
}

export function facilityEnvelope(compact = false) {
  const shells = [], faces = [], fins = [], warm = [], cool = [];
  for (let i = 0; i < 48; i++) {
    if (compact && Math.floor(i / 2) % 2) continue;
    const x = i % 2 ? -44 - i % 4 * 5 : 48 + i % 3 * 6;
    const z = 25 - Math.floor(i / 2) * 46, height = 18 + i * 7 % 24;
    shells.push(box([x, height / 2 - 4, z], [10, height, 15]));
    for (const side of [-1, 1]) fins.push(box([x + side * 4.4, height / 2 - 4, z + 7.7], [.18, height - 1, .35]));
    for (let y = 3; y < height - 1; y += 4.5) {
      faces.push(box([x, y - 4, z + 7.6], [7.7, 3.2, .18]));
      fins.push(box([x, y - 2.3, z + 7.8], [8, .18, .3]));
      (i % 2 ? warm : cool).push(box([x, y - 5.4, z + 7.83], [5, .055, .04]));
      const inward = x < 0 ? 1 : -1;
      faces.push(box([x + inward * 5.05, y - 4, z], [.18, 3.2, 12.7]));
      fins.push(box([x + inward * 5.2, y - 2.3, z], [.3, .18, 13]));
      (i % 2 ? warm : cool).push(box([x + inward * 5.3, y - 5.4, z], [.04, .055, 9]));
    }
  }
  return { shells, faces, fins, warm, cool };
}

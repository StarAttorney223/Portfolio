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

const rearBayHeights = {
  profile: [12, 9, 14], ether: [10, 14], unravel: [14, 11, 13, 9],
  physiogenie: [12, 14, 10], pixelchat: [14, 10], skills: [11, 15, 10],
  experience: [10, 14, 11], about: [12, 10], contact: [14, 11, 13],
};

export function facilityLayout(id, compact = false) {
  const theme = facilityThemes[id];
  if (!theme) return null;
  const frames = [], panels = [], lights = [], floor = [], seams = [], services = [], hardware = [];
  const leftFrames = [], leftEquipment = [], leftLights = [];
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
  for (let i = 0; i < theme.bays; i++) {
    const x = -6 + i * 26 / Math.max(1, theme.bays - 1);
    panels.push(box([x, 9, -37.5], [5.6, 12, .25]));
    frames.push(box([x, 15.3, -37.2], [6.1, .3, .5]));
    lights.push(box([x, 14.9, -37.1], [4.6, .07, .06]));
    for (let j = 0; j < (compact ? 3 : 7); j++) hardware.push(box([x, 4 + j * 1.35, -37.25], [4.8, .12, .22]));
  }
  // An open service gallery replaces the single rear slab, with layered bays visible through it.
  const rearBays = Array.from({ length: theme.bays }, (_, i) => theme.bays === 1 ? 7 : -4 + i * 21 / (theme.bays - 1));
  const rearWidth = Math.min(6.6, 21 / theme.bays * .78);
  for (let i = 0; i < rearBays.length; i++) {
    const x = rearBays[i], height = rearBayHeights[id][i];
    panels.push(box([x, height / 2 + 1, -47], [rearWidth, height, .55]));
    frames.push(box([x - rearWidth / 2 - .18, height / 2 + 1, -46.5], [.16, height + .45, .7]));
    frames.push(box([x + rearWidth / 2 + .18, height / 2 + 1, -46.5], [.16, height + .45, .7]));
    frames.push(box([x, height + 1.25, -46.5], [rearWidth + .6, .22, .7]));
    lights.push(box([x, height + .85, -46.1], [rearWidth * .75, .045, .06]));
    for (let row = 0; row < (compact ? 2 : 3); row++) {
      const y = 2.2 + row * 2.1;
      hardware.push(box([x, y, -46.3], [rearWidth - .7, .11, .16]));
      if (row % 2 === i % 2) services.push(box([x + (i % 2 ? 1 : -1) * rearWidth * .28, y + .62, -46.25], [.18, 1.1, .26]));
    }
  }
  for (const x of [-7, 21]) frames.push(box([x, 9, -46.7], [.42, 18, 1.1]));
  frames.push(box([7, 17.8, -46.8], [28.5, .55, 1.1]));
  services.push(box([7, 7.2, -43], [27, .28, 3.4]));
  frames.push(box([7, 7.55, -43], [27, .12, 3.4]));
  const roofXs = [-7, 7, 21];
  for (const x of roofXs) frames.push(box([x, 22.2, -19], [.38, .48, 54]));
  for (const z of [4, -6, -16, -26, -36, -46]) {
    frames.push(box([7, 21.2, z], [29, .42, .7]));
    services.push(box([7, 20.75, z], [25, .16, .22]));
  }
  for (const x of [-.5, 14.5]) for (const z of [-7, -21, -35, -45]) {
    panels.push(box([x, 21.65, z], [12.5, .22, 6.2]));
  }
  for (const x of [-3, 7, 17]) lights.push(box([x, 21.43, -20], [.045, .04, 49]));
  for (const side of [-1, 1]) {
    const x = side < 0 ? -8.3 : 22.3;
    frames.push(box([x, 8, -27], [.5, 16, 43]));
    frames.push(box([x, 13.1, -27], [.8, .22, 43]));
    for (const z of [-10, -21, -32, -43]) {
      panels.push(box([x, 7.6, z], [.48, 7.2, 7.4]));
      frames.push(box([x, 7.6, z - 3.85], [.65, 8, .35]));
      lights.push(box([x + side * -.32, 7.6, z], [.045, 5.6, .045]));
    }
  }
  const sideStations = [3, -8, -20, -32];
  for (let i = 0; i < sideStations.length; i++) {
    const z = sideStations[i];
    leftFrames.push(box([-7.75, 4.4, z], [.32, 7.5, 4.2]));
    leftFrames.push(box([-6.9, 8.3, z], [1.65, .3, 4.6]));
    leftLights.push(box([-6.68, 7.93, z], [1.15, .045, .07]));
    if (id === "profile") {
      leftEquipment.push(box([-6.35, 2.35, z], [1.9, 2.4, 3.3]));
      leftEquipment.push(box([-5.2, 4.65, z], [.22, 2.2, 2.5]));
      for (const y of [1.65, 2.25, 2.85]) leftFrames.push(box([-5.32, y, z], [.12, .07, 2.8]));
    } else if (id === "physiogenie") {
      leftEquipment.push(box([-6.25, 3.6, z], [1.5, 4.1, 2.5]));
      leftEquipment.push(box([-5.1, 5.4, z], [.25, .18, 3.7]));
    } else if (id === "pixelchat") {
      leftEquipment.push(box([-6.25, 4.1, z], [1.55, 6.2, 2.6]));
      leftEquipment.push(box([-5.12, 3.2, z], [.18, 3.7, 2.1]));
    } else if (id === "unravel" || id === "skills") {
      leftEquipment.push(box([-6.3, 3.5, z], [1.7, 4.6, 2.8]));
      leftEquipment.push(box([-5.16, 5.95, z], [.2, .18, 3.5]));
    } else if (id === "ether") {
      leftEquipment.push(box([-6.2, 4.6, z], [1.7, 5.3, 2.7]));
      leftEquipment.push(box([-5.12, 1.55, z], [1.2, .32, 3.5]));
    } else if (id === "contact") {
      leftEquipment.push(box([-6.35, 4.2, z], [.28, 6.4, .28]));
      leftEquipment.push(box([-5.65, 5.5, z], [1.45, .16, 3.6]));
    } else if (id === "about") {
      leftEquipment.push(box([-6.15, 1.65, z], [2.35, .65, 3.5]));
      leftEquipment.push(box([-5.9, 3.9, z], [.3, 4.2, .35]));
    } else {
      leftEquipment.push(box([-6.2, 3.1, z], [1.9, 3.5, 3.1]));
      leftEquipment.push(box([-5.16, 5.3, z], [.18, .14, 3.4]));
    }
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
  return { theme, frames, panels, lights, floor, seams, services, hardware, leftFrames, leftEquipment, leftLights };
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

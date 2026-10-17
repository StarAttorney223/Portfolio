import { projectsData } from "../../../data/projects.js";
const records = new Map(projectsData.map((project) => [project.id, project]));

// IDs bind content, scene, label, ordering, and camera; source-array order is irrelevant.
const settings = {
  ether: { order: 0, route: "/projects", aliases: ["/projects/ether"], environment: "atelier", zone: "ETHER / The Atelier", scale: 1.15, position: [16, 8, 21], target: [7, 5, -3], fov: 40 },
  unravel: { order: 1, route: "/projects/unravel", environment: "compute", zone: "UNRAVEL / Compute Hall", scale: 1.25, position: [17, 9, 22], target: [7, 5, -3], fov: 40 },
  physiogenie: { order: 2, route: "/projects/physiogenie", environment: "motion", zone: "PHYSIOGENIE / Motion Lab", scale: 1.35, position: [17, 8, 23], target: [8, 6, -2], fov: 40 },
  pixelchat: { order: 3, route: "/projects/pixelchat", environment: "exchange", zone: "PIXELCHAT / The Exchange", scale: 1.2, position: [16, 9, 22], target: [7, 4, -3], fov: 42 },
};

export const projectRegistry = Object.fromEntries(Object.entries(settings).filter(([id]) => records.has(id)).map(([id, config]) => [id, { ...config, id, project: records.get(id), mobile: { position: [10, 10, 40], target: config.target, fov: 54 } }]));
export const orderedProjects = Object.values(projectRegistry).sort((a, b) => a.order - b.order);
export const worldProjects = orderedProjects.map((config) => config.project);

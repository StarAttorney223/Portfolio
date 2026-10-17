import { projectsData } from "../../../data/projects.js";
import { experienceData } from "../../../data/experience.js";

const atmosphereEntry = experienceData.find((item) => item.id === "tech-exp-ai-web");
const atmosphereDescription = atmosphereEntry?.details.find((text) => text.includes("AtmosAlert"));

export const worldProjects = [
  ...projectsData,
  ...(atmosphereDescription ? [{
    id: "atmosalert", title: "ATMOSALERT", category: "Weather / AI",
    shortDescription: "AI-driven hyper-local weather nowcasting.",
    overview: atmosphereDescription, techStack: [], links: {},
    keyFeatures: [], architecture: {}, screenshots: [],
  }] : []),
];

const definitions = [
  { id: "home", label: "Home", route: "/", zone: "The Observatory", kind: "home" },
  { id: "profile", label: "Profile", route: "/profile", zone: "The Foundry", kind: "profile" },
  ...worldProjects.map((project, index) => ({ id: project.id, label: project.title, route: index === 0 ? "/projects" : `/projects/${project.id}`, zone: ["The Atelier", "The Compute Hall", "The Motion Lab", "The Exchange", "The Weather Array"][index], kind: project.id, project })),
  { id: "skills", label: "Skills", route: "/skills", zone: "The Neural Works", kind: "skills" },
  { id: "experience", label: "Experience", route: "/experience", zone: "The Chronology", kind: "experience" },
  { id: "about", label: "About", route: "/about", zone: "The Workshop", kind: "about" },
  { id: "contact", label: "Contact", route: "/contact", zone: "The Uplink", kind: "contact" },
];

export const journey = definitions.map((entry, index) => ({ ...entry, index, z: -index * 90, number: String(index + 1).padStart(2, "0") }));
export const mainDestinations = ["home", "profile", "ether", "skills", "experience", "about", "contact"].map((id) => journey.find((entry) => entry.id === id));

export function indexForRoute(pathname) {
  if (pathname === "/projects/ether") return journey.findIndex((entry) => entry.id === "ether");
  return Math.max(0, journey.findIndex((entry) => entry.route === pathname));
}

export function cameraStop(index, compact = false) {
  const stop = journey[index];
  if (index === 0) return { position: compact ? [7, 9, 29] : [12, 9, 20], target: compact ? [0, 7, -23] : [-5, 8, -23] };
  return { position: compact ? [9, 10, stop.z + 32] : [18, 10, stop.z + 27], target: compact ? [5, 6, stop.z - 3] : [0, 6, stop.z - 4] };
}

export function interpolateCamera(progress, compact = false) {
  const clamped = Math.max(0, Math.min(journey.length - 1, progress));
  const index = Math.floor(clamped);
  const fraction = clamped - index;
  const t = fraction * fraction * (3 - 2 * fraction);
  const a = cameraStop(index, compact);
  const b = cameraStop(Math.min(index + 1, journey.length - 1), compact);
  return {
    position: a.position.map((value, i) => value + (b.position[i] - value) * t),
    target: a.target.map((value, i) => value + (b.target[i] - value) * t),
  };
}

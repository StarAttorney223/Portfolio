import { orderedProjects, projectRegistry, worldProjects } from "./projectRegistry.js";
export { projectRegistry, worldProjects };

const sections = {
  home: { zone: "The Observatory", position: [12, 9, 20], target: [-5, 8, -23], fov: 50, mobile: { position: [7, 9, 29], target: [0, 7, -23], fov: 50 } },
  profile: { zone: "The Research Archive", position: [18, 10, 23], target: [7, 5, -3], fov: 42 },
  skills: { zone: "The Technical Nexus", position: [17, 10, 24], target: [7, 5, -3], fov: 42, scale: 1.4 },
  experience: { zone: "The Chronology", position: [18, 11, 22], target: [6, 4, -3], fov: 42, scale: 1.35 },
  about: { zone: "The Fabrication Workshop", position: [19, 9, 22], target: [7, 4, -3], fov: 42 },
  contact: { zone: "The Communications Array", position: [18, 11, 24], target: [7, 5, -3], fov: 42 },
};

const section = (id, label = id) => ({ id, label, route: id === "home" ? "/" : `/${id}`, kind: id, ...sections[id] });
const definitions = [
  section("home", "Home"), section("profile", "Profile"),
  ...orderedProjects.map((config) => ({ ...config, label: config.project.title, kind: config.id })),
  section("skills", "Skills"), section("experience", "Experience"),
  section("about", "About"), section("contact", "Contact"),
];
export const journey = definitions.map((entry, index) => ({ ...entry, index, z: -index * 90, number: String(index + 1).padStart(2, "0") }));
export const mainDestinations = ["home", "profile", "ether", "skills", "experience", "about", "contact"].map((id) => journey.find((entry) => entry.id === id));

export function indexForRoute(pathname) {
  return Math.max(0, journey.findIndex((entry) => entry.route === pathname || entry.aliases?.includes(pathname)));
}
export function cameraStop(index, compact = false) {
  const entry = journey[index];
  const camera = compact ? entry.mobile || { position: [10, 10, 40], target: entry.target, fov: 54 } : entry;
  return { position: camera.position.map((v, i) => i === 2 ? v + entry.z : v), target: camera.target.map((v, i) => i === 2 ? v + entry.z : v), fov: camera.fov };
}
export function interpolateCamera(progress, compact = false) {
  const clamped = Math.max(0, Math.min(journey.length - 1, progress));
  const index = Math.floor(clamped);
  const fraction = clamped - index;
  const t = fraction * fraction * (3 - 2 * fraction);
  const a = cameraStop(index, compact);
  const b = cameraStop(Math.min(index + 1, journey.length - 1), compact);
  return { position: a.position.map((v, i) => v + (b.position[i] - v) * t), target: a.target.map((v, i) => v + (b.target[i] - v) * t), fov: a.fov + (b.fov - a.fov) * t };
}

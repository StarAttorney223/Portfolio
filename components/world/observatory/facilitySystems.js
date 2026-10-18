import { skillsCategories } from "../../../data/skills.js";
import { experienceData } from "../../../data/experience.js";

const clusterPositions = [[-7, 0, -5], [-8, 0, 1], [-3, 0, 6], [4.5, 0, 6], [8, 0, 0], [7, 0, -6]];
export const skillClusters = skillsCategories.map((category, i) => ({ ...category, position: clusterPositions[i] }));

const milestoneLabels = { "edu-cs": "CSE / EDUCATION", "tech-exp-ai-web": "INDEPENDENT WORK", "proj-unravel": "UNRAVEL", "proj-physiogenie": "PHYSIOGENIE" };
export const developmentMilestones = Object.entries(milestoneLabels).map(([id, label]) => ({ ...experienceData.find((item) => item.id === id), label }));

import React from "react";
import { projectsData } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectsDirectory } from "@/components/projects/ProjectsDirectory";

export const metadata = {
  title: "Projects",
  description:
    "Selected projects by Divyansh Chandrakar: Ether Studio, Unravel, PhysioGenie, and PixelChat.",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      <SectionHeader
        number="03"
        title="PROJECTS"
        subtitle="PROJECT ARCHIVE // SELECTED WORK"
        description="Engineered full-stack applications, real-time computer vision systems, and applied machine learning tools."
        badge="TOTAL: 04"
      />

      <ProjectsDirectory initialProjects={projectsData} />
    </div>
  );
}

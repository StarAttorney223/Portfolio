import React from "react";
import type { Metadata } from "next";
import { projectsData } from "@/data/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectsDirectory } from "@/components/projects/ProjectsDirectory";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected engineering projects and system architectures built by Divyansh Chandrakar: Unravel, PhysioGenie, AtmosAlert, and Ether.",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      <SectionHeader
        number="02"
        title="PROJECTS"
        subtitle="PROJECT ARCHIVE // SELECTED WORK"
        description="Engineered full-stack applications, real-time computer vision systems, and applied machine learning tools."
        badge="TOTAL: 04"
      />

      <ProjectsDirectory initialProjects={projectsData} />
    </div>
  );
}

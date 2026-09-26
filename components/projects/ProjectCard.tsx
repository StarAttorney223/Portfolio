import React from "react";
import Link from "next/link";
import { Project } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Terminal } from "lucide-react";
import { CornerBrackets } from "@/components/ui/GeometricDecorations";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group relative bg-[#151515] hover:bg-[#1D1D1D] border border-[#30302D] hover:border-[#F26A21] transition-all duration-200 p-6 flex flex-col justify-between">
      {/* Corner Brackets */}
      <CornerBrackets accentCorner="top-left" />

      {/* Top Header Row */}
      <div>
        <div className="flex items-center justify-between font-mono text-xs mb-4 pb-2 border-b border-[#30302D] group-hover:border-[#F26A21]/30 transition-colors">
          <div className="flex items-center gap-2">
            <span className="text-[#F26A21] font-bold">
              // {project.number}
            </span>
            <span className="text-[#504E4A]">//</span>
            <span className="text-[#89857D] uppercase text-[10px] tracking-wider">
              {project.category}
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#504E4A] group-hover:text-[#F26A21] transition-colors">
            SPEC-SYS
          </span>
        </div>

        {/* Project Title */}
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#E5E2DA] group-hover:text-[#F26A21] transition-colors mb-2.5">
          {project.title}
        </h2>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-[#89857D] leading-relaxed mb-6 group-hover:text-[#E5E2DA]/80 transition-colors line-clamp-3">
          {project.shortDescription}
        </p>
      </div>

      {/* Bottom Area: Tech Stack & CTA */}
      <div className="space-y-5 pt-2">
        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="default" size="sm">
              {tech}
            </Badge>
          ))}
        </div>

        {/* View Project Action */}
        <div className="pt-3 border-t border-[#30302D] flex items-center justify-between">
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#E5E2DA] group-hover:text-[#F26A21] transition-colors focus-visible:outline-2 focus-visible:outline-[#F26A21]"
          >
            <span>VIEW PROJECT</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F26A21] transition-transform duration-200 group-hover:translate-x-1.5" />
          </Link>

          <span className="font-mono text-[10px] text-[#504E4A] uppercase tracking-widest hidden sm:inline">
            ARCHIVE
          </span>
        </div>
      </div>
    </article>
  );
}

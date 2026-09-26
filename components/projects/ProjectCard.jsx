import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";
import { CornerBrackets } from "@/components/ui/GeometricDecorations";

export function ProjectCard({ project, index = 0 }) {
  const isOffset = index % 2 === 1;

  return (
    <article
      className={[
        "group relative overflow-hidden border border-[#30302D] bg-[#151515] p-5 transition-all duration-200 ease-out-expo hover:-translate-y-1 hover:border-[#F26A21] hover:bg-[#1D1D1D] sm:p-6",
        isOffset ? "lg:ml-16" : "lg:mr-16",
      ].join(" ")}
    >
      {/* Corner Brackets */}
      <CornerBrackets accentCorner="top-left" />
      <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-dots-subtle opacity-20 transition-transform duration-300 group-hover:scale-105 md:block" />
      <div className="absolute bottom-0 left-0 h-px w-0 bg-[#F26A21] transition-all duration-300 group-hover:w-full" />

      <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[minmax(180px,0.72fr)_minmax(0,1.28fr)] lg:items-end">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#30302D] pb-2 font-mono text-xs transition-colors group-hover:border-[#F26A21]/30">
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
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#504E4A]">
              PROJECT {project.number}
            </span>
            <h2 className="mt-1 text-3xl font-black uppercase tracking-tight text-[#E5E2DA] transition-colors group-hover:text-[#F26A21] sm:text-4xl">
              {project.title}
            </h2>
          </div>
        </div>

        <div className="space-y-5">
        {/* Short Description */}
        <p className="max-w-2xl text-sm leading-relaxed text-[#89857D] transition-colors group-hover:text-[#E5E2DA]/80">
          {project.shortDescription}
        </p>

      {/* Bottom Area: Tech Stack & CTA */}
      <div className="space-y-5 pt-1">
        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="default" size="sm">
              {tech}
            </Badge>
          ))}
        </div>

        {/* View Project Action */}
        <div className="flex items-center justify-between border-t border-[#30302D] pt-3">
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
        </div>
      </div>
    </article>
  );
}

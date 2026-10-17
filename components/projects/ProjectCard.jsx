"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";
import { CornerBrackets } from "@/components/ui/GeometricDecorations";

export function ProjectCard({ project, index = 0 }) {
  const isOffset = index % 2 === 1;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className={[
        "group relative overflow-hidden border border-[#484844] bg-[#242424] p-5 transition-colors duration-200 ease-out-expo hover:border-[#FF852E] hover:bg-[#303030] sm:p-6",
        isOffset ? "lg:ml-16" : "lg:mr-16",
      ].join(" ")}
    >
      {/* Corner Brackets */}
      <CornerBrackets accentCorner="top-left" />
      <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-dots-subtle opacity-20 transition-transform duration-300 group-hover:scale-105 md:block" />
      <div className="absolute bottom-0 left-0 h-px w-0 bg-[#FF852E] transition-all duration-500 ease-out-expo group-hover:w-full" />

      <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[minmax(180px,0.72fr)_minmax(0,1.28fr)] lg:items-end">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#484844] pb-2 font-mono text-xs transition-colors group-hover:border-[#FF852E]/30">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#B8B5AE] transition-colors group-hover:text-[#FF852E]">
              // {project.number}
            </span>
            <span className="text-[#96928B]">//</span>
            <span className="text-[#B8B5AE] uppercase text-[10px] tracking-wider">
              {project.category}
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#96928B] group-hover:text-[#FF852E] transition-colors">
            SPEC-SYS
          </span>
        </div>

          {/* Project Title */}
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#96928B]">
              PROJECT {project.number}
            </span>
            <h2 className="mt-1 text-3xl font-black uppercase tracking-tight text-[#F5F3EE] transition-colors group-hover:text-[#FF852E] sm:text-4xl">
              {project.title}
            </h2>
          </div>
        </div>

        <div className="space-y-5">
        {/* Short Description */}
        <p className="max-w-2xl text-sm leading-relaxed text-[#B8B5AE] transition-colors group-hover:text-[#F5F3EE]/80">
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
        <div className="flex items-center justify-between border-t border-[#484844] pt-3">
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#F5F3EE] group-hover:text-[#FF852E] transition-colors focus-visible:outline-2 focus-visible:outline-[#FF852E]"
          >
            <span>VIEW PROJECT</span>
            <span className="h-px w-0 bg-[#FF852E] transition-all duration-300 group-hover:w-8" aria-hidden="true" />
            <ArrowRight className="w-3.5 h-3.5 text-[#FF852E] transition-transform duration-200 group-hover:translate-x-1.5" />
          </Link>

          <span className="font-mono text-[10px] text-[#96928B] uppercase tracking-widest hidden sm:inline">
            ARCHIVE
          </span>
        </div>
      </div>
        </div>
      </div>
    </motion.article>
  );
}

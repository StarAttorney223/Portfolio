"use client";

import React, { useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Terminal, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  "ALL",
  "Full-Stack",
  "AI / Vision",
  "AI / ML",
  "Generative AI",
];

export function ProjectsDirectory({ initialProjects }) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filteredProjects =
    selectedCategory === "ALL"
      ? initialProjects
      : initialProjects.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Filter Control Bar */}
      <div className="bg-[#242424] border border-[#484844] p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-xs text-[#B8B5AE] uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5 text-[#FF852E]" />
          <span>FILTER BY SYSTEM DOMAIN:</span>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "font-mono text-xs px-3 py-1 uppercase tracking-wider transition-colors border select-none focus-visible:outline-2 focus-visible:outline-[#FF852E]",
                  isSelected
                    ? "bg-[#303030] text-[#FFA04D] font-bold border-[#FF852E]"
                    : "bg-[#1C1C1C] text-[#B8B5AE] hover:text-[#F5F3EE] border-[#484844] hover:border-[#B8B5AE]"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="space-y-5">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Empty State Guard (if ever filtered to 0) */}
      {filteredProjects.length === 0 && (
        <div className="bg-[#242424] border border-[#484844] p-12 text-center space-y-3 font-mono">
          <Terminal className="w-8 h-8 text-[#B8B5AE] mx-auto" />
          <p className="text-sm text-[#B8B5AE] uppercase tracking-wider">
            NO PROJECTS FOUND MATCHING &quot;{selectedCategory}&quot;
          </p>
          <button
            onClick={() => setSelectedCategory("ALL")}
            className="text-xs text-[#FF852E] underline uppercase tracking-widest hover:text-[#FFA04D]"
          >
            RESET DOMAIN FILTER
          </button>
        </div>
      )}
    </div>
  );
}

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
      <div className="bg-[#151515] border border-[#30302D] p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-xs text-[#89857D] uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5 text-[#F26A21]" />
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
                  "font-mono text-xs px-3 py-1 uppercase tracking-wider transition-colors border select-none focus-visible:outline-2 focus-visible:outline-[#F26A21]",
                  isSelected
                    ? "bg-[#1D1D1D] text-[#FF7A2F] font-bold border-[#F26A21]"
                    : "bg-[#101010] text-[#89857D] hover:text-[#E5E2DA] border-[#30302D] hover:border-[#89857D]"
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
        <div className="bg-[#151515] border border-[#30302D] p-12 text-center space-y-3 font-mono">
          <Terminal className="w-8 h-8 text-[#89857D] mx-auto" />
          <p className="text-sm text-[#89857D] uppercase tracking-wider">
            NO PROJECTS FOUND MATCHING &quot;{selectedCategory}&quot;
          </p>
          <button
            onClick={() => setSelectedCategory("ALL")}
            className="text-xs text-[#F26A21] underline uppercase tracking-widest hover:text-[#FF7A2F]"
          >
            RESET DOMAIN FILTER
          </button>
        </div>
      )}
    </div>
  );
}

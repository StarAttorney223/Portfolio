"use client";

import React, { useState } from "react";
import { skillsCategories, SkillCategory, SkillNode } from "@/data/skills";
import { CornerBrackets } from "@/components/ui/GeometricDecorations";
import { Cpu, Terminal, Layers, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function SkillTree() {
  const [selectedSkill, setSelectedSkill] = useState<SkillNode>(
    skillsCategories[0].skills[0]
  );
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const displayedCategories =
    activeCategory === "all"
      ? skillsCategories
      : skillsCategories.filter((cat) => cat.id === activeCategory);

  return (
    <div className="space-y-8">
      {/* Category Filter Matrix */}
      <div className="bg-[#151515] border border-[#30302D] p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-xs text-[#89857D] uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5 text-[#F26A21]" />
          <span>BRANCH FILTER:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          <button
            onClick={() => setActiveCategory("all")}
            className={cn(
              "px-2.5 py-1 uppercase tracking-wider transition-colors border select-none focus-visible:outline-2 focus-visible:outline-[#F26A21]",
              activeCategory === "all"
                ? "bg-[#F26A21] text-black font-bold border-[#FF7A2F]"
                : "bg-[#101010] text-[#89857D] hover:text-[#E5E2DA] border-[#30302D]"
            )}
          >
            ALL BRANCHES
          </button>
          {skillsCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-2.5 py-1 uppercase tracking-wider transition-colors border select-none focus-visible:outline-2 focus-visible:outline-[#F26A21]",
                activeCategory === cat.id
                  ? "bg-[#F26A21] text-black font-bold border-[#FF7A2F]"
                  : "bg-[#101010] text-[#89857D] hover:text-[#E5E2DA] border-[#30302D]"
              )}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Root System Banner (ASCII / Diagram Header) */}
      <div className="bg-[#101010] border border-[#30302D] p-5 text-center relative overflow-hidden hidden md:block">
        <CornerBrackets accentCorner="all" />
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E5E2DA] bg-[#151515] border border-[#30302D] px-4 py-1.5">
          <Terminal className="w-3.5 h-3.5 text-[#F26A21]" />
          <span>ROOT: SOFTWARE ARCHITECTURE &amp; FULL-STACK ENGINEERING</span>
        </div>

        {/* Stem Lines Downward */}
        <div className="flex flex-col items-center pt-2">
          <div className="w-[1px] h-5 bg-[#F26A21]/60" />
          <div className="w-3/4 max-w-2xl h-[1px] bg-[#30302D] relative">
            <span className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-[#F26A21]" />
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#F26A21]" />
            <span className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-[#F26A21]" />
          </div>
        </div>
      </div>

      {/* Main Grid: Branches + Interactive Node Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Category Branches */}
        <div className="lg:col-span-2 space-y-6">
          {displayedCategories.map((category) => (
            <div
              key={category.id}
              className="bg-[#151515] border border-[#30302D] p-5 sm:p-6 space-y-4 relative group"
            >
              <CornerBrackets accentCorner="top-left" />

              {/* Branch Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#30302D] gap-2">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#F26A21]">
                    <span>// {category.code}</span>
                    <span className="text-[#30302D]">•</span>
                    <span className="text-[#89857D] uppercase tracking-wider text-[11px]">
                      {category.subtitle}
                    </span>
                  </div>
                  <h3 className="text-xl font-black uppercase text-[#E5E2DA] tracking-tight mt-0.5">
                    {category.title}
                  </h3>
                </div>

                <span className="font-mono text-[10px] text-[#504E4A] uppercase tracking-widest">
                  [ {category.skills.length} NODES ]
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-[#89857D] leading-relaxed">
                {category.description}
              </p>

              {/* Skill Nodes Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {category.skills.map((skill) => {
                  const isSelected = selectedSkill.name === skill.name;

                  return (
                    <button
                      key={skill.name}
                      onClick={() => setSelectedSkill(skill)}
                      className={cn(
                        "text-left p-3 border font-mono transition-all duration-150 relative select-none focus-visible:outline-2 focus-visible:outline-[#F26A21]",
                        isSelected
                          ? "bg-[#1D1D1D] text-[#E5E2DA] border-[#F26A21] shadow-sm"
                          : "bg-[#101010] text-[#89857D] hover:text-[#E5E2DA] hover:bg-[#181818] border-[#30302D] hover:border-[#89857D]"
                      )}
                    >
                      {/* Active indicator dot */}
                      {isSelected && (
                        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#F26A21]" />
                      )}

                      <span className="block text-[9px] uppercase tracking-widest text-[#504E4A] mb-1">
                        {skill.category}
                      </span>
                      <span className="block text-xs font-bold text-[#E5E2DA] uppercase tracking-wider">
                        {skill.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right Col: Node Inspector Panel (Solid Physical Telemetry) */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 bg-[#151515] border border-[#30302D] p-5 sm:p-6 space-y-5">
            <CornerBrackets accentCorner="all" />

            <div className="flex items-center justify-between pb-3 border-b border-[#30302D]">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#89857D]">
                <Cpu className="w-3.5 h-3.5 text-[#F26A21]" />
                <span>NODE INSPECTOR</span>
              </div>
              <span className="font-mono text-[10px] text-[#F26A21] animate-pulse">
                SYNCED
              </span>
            </div>

            <div className="space-y-4 font-mono">
              <div className="bg-[#101010] border border-[#30302D] p-4 space-y-1">
                <span className="text-[10px] uppercase text-[#89857D] tracking-widest">
                  SELECTED NODE
                </span>
                <h4 className="text-xl font-black uppercase text-[#E5E2DA] tracking-wider">
                  {selectedSkill.name}
                </h4>
                <span className="text-xs text-[#F26A21] font-semibold uppercase">
                  CLASSIFICATION: {selectedSkill.category}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <span className="text-[10px] uppercase text-[#89857D] tracking-widest block">
                  FOCUS &amp; APPLICATIONS
                </span>
                <div className="bg-[#101010] border border-[#30302D] p-3 text-[#E5E2DA] leading-relaxed">
                  {selectedSkill.focusArea || "General full-stack engineering workflow."}
                </div>
              </div>

              <div className="pt-3 border-t border-[#30302D] space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-[#89857D] text-[11px]">
                  <Info className="w-3.5 h-3.5 text-[#F26A21]" />
                  <span>DESIGN PRINCIPLE</span>
                </div>
                <p className="text-[11px] text-[#89857D] leading-relaxed">
                  Skills are structured as operational engineering branches rather than arbitrary percentage bars or fake statistics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

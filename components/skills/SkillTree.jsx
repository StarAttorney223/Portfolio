"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skillsCategories } from "@/data/skills";
import { projectsData } from "@/data/projects";
import { CornerBrackets } from "@/components/ui/GeometricDecorations";
import { Cpu, Info, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export function SkillTree() {
  const [activeCategoryId, setActiveCategoryId] = useState(skillsCategories[0].id);
  const [activeSkillName, setActiveSkillName] = useState(skillsCategories[0].skills[0].name);
  const activeCategory =
    skillsCategories.find((category) => category.id === activeCategoryId) ??
    skillsCategories[0];

  const activeSkill = useMemo(
    () =>
      activeCategory.skills.find((skill) => skill.name === activeSkillName) ||
      activeCategory.skills[0],
    [activeCategory, activeSkillName]
  );

  const relatedProjects = useMemo(() => {
    const skillName = activeSkill.name.toLowerCase();
    return projectsData.filter((project) =>
      project.techStack.some((tech) => {
        const technology = tech.toLowerCase();
        return technology === skillName || technology.includes(skillName) || skillName.includes(technology);
      })
    );
  }, [activeSkill]);

  const activateCategory = (category) => {
    setActiveCategoryId(category.id);
    setActiveSkillName(category.skills[0].name);
  };

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden border border-[#30302D] bg-[#151515] p-5 sm:p-6 lg:p-8">
        <CornerBrackets accentCorner="all" />
        <div className="absolute inset-0 bg-grid-subtle opacity-10 animate-grid-drift" />

        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <div className="space-y-8">
            <div className="flex flex-col gap-3 border-b border-[#30302D] pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#89857D]">
                <Terminal className="h-3.5 w-3.5 text-[#F26A21]" />
                <span>ROOT: SOFTWARE ARCHITECTURE</span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#504E4A]">
                SELECT DOMAIN TO TRACE CONNECTIONS
              </span>
            </div>

            <div className="relative min-h-[440px]">
              <div className="absolute left-1/2 top-14 hidden h-[330px] w-px -translate-x-1/2 bg-[#30302D] md:block" />
              <div className="absolute left-[16%] right-[16%] top-1/2 hidden h-px bg-[#30302D] md:block" />

              <button
                className="absolute left-1/2 top-0 z-10 -translate-x-1/2 border border-[#F26A21]/70 bg-[#101010] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-[#E5E2DA]"
                type="button"
              >
                CORE SYSTEM
              </button>

              <div className="grid grid-cols-1 gap-3 pt-16 sm:grid-cols-2 md:grid-cols-3">
                {skillsCategories.map((category, index) => {
                  const isActive = category.id === activeCategory.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => activateCategory(category)}
                      onMouseEnter={() => activateCategory(category)}
                      onFocus={() => activateCategory(category)}
                      className={cn(
                        "group relative min-h-[112px] border p-4 text-left transition-all duration-200 ease-out-expo focus-visible:outline-2 focus-visible:outline-[#F26A21]",
                        isActive
                          ? "border-[#F26A21] bg-[#1D1D1D] text-[#E5E2DA]"
                          : "border-[#30302D] bg-[#101010] text-[#89857D] opacity-70 hover:-translate-y-1 hover:border-[#89857D] hover:opacity-100",
                        index % 3 === 1 && "md:translate-y-10",
                        index % 3 === 2 && "md:translate-y-20"
                      )}
                    >
                      <span
                        className={cn(
                          "absolute -top-8 left-1/2 hidden h-8 w-px -translate-x-1/2 bg-[#30302D] md:block",
                          isActive && "bg-[#F26A21]"
                        )}
                        aria-hidden="true"
                      />
                      <span
                        className={cn(
                          "absolute left-3 top-3 h-2 w-2 border",
                          isActive ? "border-[#F26A21] bg-[#F26A21]" : "border-[#504E4A]"
                        )}
                        aria-hidden="true"
                      />
                      <span className="block pl-5 font-mono text-[10px] uppercase tracking-widest text-[#504E4A] group-hover:text-[#F26A21]">
                        {category.code}
                      </span>
                      <span
                        className={cn(
                          "mt-3 block font-mono text-sm font-bold uppercase tracking-wider transition-colors",
                          isActive ? "text-[#FF7A2F]" : "text-[#E5E2DA]"
                        )}
                      >
                        {category.title}
                      </span>
                      <span className="mt-2 block text-xs leading-relaxed text-[#89857D]">
                        {category.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="relative border border-[#30302D] bg-[#101010] p-5">
            <CornerBrackets accentCorner="top-left" />
            <div className="mb-5 flex items-center justify-between border-b border-[#30302D] pb-3">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#89857D]">
                <Cpu className="h-3.5 w-3.5 text-[#F26A21]" />
                <span>ACTIVE DOMAIN</span>
              </div>
              <span className="font-mono text-[10px] text-[#F26A21]">LINKED</span>
            </div>

            <div className="space-y-5">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#504E4A]">
                  {activeCategory.code}
                </span>
                <h3 className="mt-1 text-3xl font-black uppercase tracking-tight text-[#E5E2DA]">
                  {activeCategory.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#89857D]">
                  {activeCategory.description}
                </p>
              </div>

              <div className="space-y-3">
                {activeCategory.skills.map((skill, index) => {
                  const isSelected = skill.name === activeSkill.name;
                  return (
                  <button
                    key={skill.name}
                    type="button"
                    onClick={() => setActiveSkillName(skill.name)}
                    className={cn(
                      "relative w-full border bg-[#151515] p-3 text-left transition-all duration-200 hover:translate-x-1 hover:border-[#F26A21]/70 focus-visible:outline-2 focus-visible:outline-[#F26A21]",
                      isSelected ? "border-[#F26A21]" : "border-[#30302D]"
                    )}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <span className={cn(
                      "absolute -left-5 top-1/2 hidden h-px w-5 md:block",
                      isSelected ? "bg-[#F26A21]" : "bg-[#30302D]"
                    )} />
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#504E4A]">
                          {skill.category}
                        </span>
                        <p className="mt-1 font-mono text-xs font-bold uppercase tracking-wider text-[#E5E2DA]">
                          {skill.name}
                        </p>
                      </div>
                      <span className={cn(
                        "mt-1 h-1.5 w-1.5 border border-[#F26A21]",
                        isSelected && "bg-[#F26A21] animate-system-pulse"
                      )} />
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-[#89857D]">
                      {skill.focusArea || activeSkill.focusArea}
                    </p>
                  </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSkill.name}
                  className="border-t border-[#30302D] pt-4 text-xs text-[#89857D]"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-3 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest">
                    <Info className="h-3.5 w-3.5 text-[#F26A21]" />
                    <span>SELECTED TECHNOLOGY</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 border border-[#30302D] bg-[#151515] p-3 font-mono">
                    <div>
                      <span className="block text-[9px] uppercase tracking-widest text-[#504E4A]">Technology</span>
                      <span className="mt-1 block font-bold uppercase text-[#F26A21]">{activeSkill.name}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase tracking-widest text-[#504E4A]">Category</span>
                      <span className="mt-1 block uppercase text-[#E5E2DA]">{activeCategory.title}</span>
                    </div>
                    <div className="col-span-2 border-t border-[#30302D] pt-3">
                      <span className="block text-[9px] uppercase tracking-widest text-[#504E4A]">Used in</span>
                      <span className="mt-1 block uppercase text-[#E5E2DA]">
                        {relatedProjects.length
                          ? relatedProjects.map((project) => project.title).join(" // ")
                          : "NO DIRECT PROJECT TAG"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

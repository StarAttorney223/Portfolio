import React from "react";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import { SolidButton } from "@/components/ui/SolidButton";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { CornerBrackets } from "@/components/ui/GeometricDecorations";
import { ArrowRight, Code2 } from "lucide-react";

export default function HomePage() {

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* Featured Projects Preview Section */}
      <section className="space-y-6 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#484844]">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#FF852E] uppercase tracking-widest mb-1">
              <span>// 02. SELECTED WORK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#F5F3EE]">
              FEATURED PROJECTS
            </h2>
          </div>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#B8B5AE] hover:text-[#FF852E] transition-colors"
          >
            <span>EXPLORE ALL ARCHIVES</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="space-y-5">
          {projectsData.slice(0, 4).map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* Recruiter Quick Factsheet / Terminal Telemetry */}
      <section className="bg-[#242424] border border-[#484844] p-6 sm:p-8 relative">
        <CornerBrackets accentCorner="all" />
        <div className="flex items-center justify-between pb-3 border-b border-[#484844] mb-6">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#FF852E]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#F5F3EE] font-semibold">
              DEVELOPER SPECIFICATION SUMMARY
            </span>
          </div>
          <span className="font-mono text-xs text-[#FF852E]">CONFIRMED</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-[#B8B5AE] block text-[10px] uppercase tracking-widest">
              ACADEMIC STATUS
            </span>
            <span className="text-[#F5F3EE] font-bold block text-sm">
              CS UNDERGRADUATE
            </span>
            <span className="text-[#96928B] text-[11px] block">
              Graduation: Expected 2026
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[#B8B5AE] block text-[10px] uppercase tracking-widest">
              CORE SPECIALIZATION
            </span>
            <span className="text-[#F5F3EE] font-bold block text-sm">
              FULL-STACK &amp; APPLIED AI
            </span>
            <span className="text-[#96928B] text-[11px] block">
              Web Architecture + CV
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[#B8B5AE] block text-[10px] uppercase tracking-widest">
              PRIMARY STACK
            </span>
            <span className="text-[#F5F3EE] font-bold block text-sm">
              REACT / NEXT.JS / NODE
            </span>
            <span className="text-[#96928B] text-[11px] block">
              TypeScript / MongoDB / TF.js
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[#B8B5AE] block text-[10px] uppercase tracking-widest">
              RECRUITMENT STATUS
            </span>
            <span className="text-[#FF852E] font-bold block text-sm">
              OPEN FOR INTERNSHIPS
            </span>
            <span className="text-[#96928B] text-[11px] block">
              Software Eng &amp; AI Roles
            </span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#484844] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
          <p className="text-[#B8B5AE]">
            Seeking software engineering internships, AI/ML development roles, and research opportunities.
          </p>
          <SolidButton href="/contact" variant="secondary" size="sm" icon="arrow">
            INITIATE CONTACT
          </SolidButton>
        </div>
      </section>
    </div>
  );
}

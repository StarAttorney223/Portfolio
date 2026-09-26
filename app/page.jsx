import React from "react";
import Link from "next/link";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { SolidButton } from "@/components/ui/SolidButton";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { CoordinatePanel } from "@/components/home/CoordinatePanel";
import { CornerBrackets } from "@/components/ui/GeometricDecorations";
import { ArrowRight, Code2 } from "lucide-react";

export default function HomePage() {
  const technicalPillars = [
    "WEB DEVELOPMENT",
    "AI / ML",
    "GAME DEVELOPMENT",
    "3D / INTERACTIVE",
  ];

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-150px)] overflow-hidden pb-8 pt-4 sm:pt-10">
        <div className="absolute inset-0 bg-grid-subtle opacity-20 pointer-events-none -z-10 animate-grid-drift" />
        <div className="absolute right-4 top-8 hidden h-44 w-44 border border-[#30302D] opacity-50 lg:block" />
        <div className="absolute bottom-16 right-10 hidden h-px w-72 rotate-[-18deg] bg-[#F26A21]/25 lg:block" />

        <div className="grid min-h-[calc(100vh-190px)] grid-cols-1 items-end gap-10 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="max-w-4xl space-y-8">
          {/* Top Identifier Tag */}
          <div className="inline-flex translate-y-0 items-center gap-2 border border-[#30302D] bg-[#151515] px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-[#89857D]">
            <span className="h-1.5 w-1.5 bg-[#F26A21] animate-system-pulse" />
            <span>PORTFOLIO SYSTEM // SESSION ACTIVE</span>
          </div>

          {/* Hero Heading */}
          <div className="space-y-3">
            <h1 className="text-5xl font-black uppercase tracking-tight text-[#E5E2DA] leading-[0.9] sm:text-7xl lg:text-8xl">
              {profileData.name.first}
              <br />
              <span className="text-[#89857D]">{profileData.name.last}</span>
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
              <span className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#F26A21]">
                {profileData.headline}
              </span>
              <span className="text-[#30302D] hidden sm:inline">//</span>
              <span className="font-mono text-xs sm:text-sm uppercase tracking-widest text-[#89857D]">
                {profileData.subheadline}
              </span>
            </div>
          </div>

          {/* Short Description */}
          <p className="max-w-2xl text-base font-normal leading-relaxed text-[#E5E2DA]/90 sm:text-xl">
            &ldquo;{profileData.shortBio}&rdquo;
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <SolidButton href="/projects" variant="primary" size="lg" icon="arrow">
              VIEW PROJECTS
            </SolidButton>
            <SolidButton href="/contact" variant="secondary" size="lg">
              CONTACT ME
            </SolidButton>
          </div>

          {/* Technical Pillars */}
          <div className="border-t border-[#30302D] pt-7">
            <div className="mb-4 flex items-center justify-between pb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#89857D]">
                // CORE DISCIPLINES
              </span>
              <span className="font-mono text-[11px] text-[#504E4A]">[ 04 DOMAINS ]</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {technicalPillars.map((pillar) => (
                <span
                  key={pillar}
                  className="border border-[#30302D] bg-[#151515] px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-[#89857D] transition-colors hover:border-[#F26A21]/60 hover:text-[#E5E2DA]"
                >
                  [ {pillar} ]
                </span>
              ))}
            </div>
          </div>
        </div>

          <div className="mb-2 xl:mb-12">
            <CoordinatePanel />
          </div>
        </div>
      </section>

      {/* Featured Projects Preview Section */}
      <section className="space-y-6 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#30302D]">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#F26A21] uppercase tracking-widest mb-1">
              <span>// 02. SELECTED WORK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#E5E2DA]">
              FEATURED PROJECTS
            </h2>
          </div>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#89857D] hover:text-[#F26A21] transition-colors"
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
      <section className="bg-[#151515] border border-[#30302D] p-6 sm:p-8 relative">
        <CornerBrackets accentCorner="all" />
        <div className="flex items-center justify-between pb-3 border-b border-[#30302D] mb-6">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#F26A21]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#E5E2DA] font-semibold">
              DEVELOPER SPECIFICATION SUMMARY
            </span>
          </div>
          <span className="font-mono text-xs text-[#F26A21]">CONFIRMED</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-[#89857D] block text-[10px] uppercase tracking-widest">
              ACADEMIC STATUS
            </span>
            <span className="text-[#E5E2DA] font-bold block text-sm">
              CS UNDERGRADUATE
            </span>
            <span className="text-[#504E4A] text-[11px] block">
              Graduation: Expected 2026
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[#89857D] block text-[10px] uppercase tracking-widest">
              CORE SPECIALIZATION
            </span>
            <span className="text-[#E5E2DA] font-bold block text-sm">
              FULL-STACK &amp; APPLIED AI
            </span>
            <span className="text-[#504E4A] text-[11px] block">
              Web Architecture + CV
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[#89857D] block text-[10px] uppercase tracking-widest">
              PRIMARY STACK
            </span>
            <span className="text-[#E5E2DA] font-bold block text-sm">
              REACT / NEXT.JS / NODE
            </span>
            <span className="text-[#504E4A] text-[11px] block">
              TypeScript / MongoDB / TF.js
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[#89857D] block text-[10px] uppercase tracking-widest">
              RECRUITMENT STATUS
            </span>
            <span className="text-[#F26A21] font-bold block text-sm">
              OPEN FOR INTERNSHIPS
            </span>
            <span className="text-[#504E4A] text-[11px] block">
              Software Eng &amp; AI Roles
            </span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#30302D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
          <p className="text-[#89857D]">
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

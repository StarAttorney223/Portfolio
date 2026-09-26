import React from "react";
import Link from "next/link";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { SolidButton } from "@/components/ui/SolidButton";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { CornerBrackets, Crosshair } from "@/components/ui/GeometricDecorations";
import { ArrowRight, Code2, Cpu, Globe2, Layers, Sparkles } from "lucide-react";

export default function HomePage() {
  const technicalPillars = [
    {
      title: "WEB DEVELOPMENT",
      desc: "Full-stack architectures, high-performance APIs, and reactive interfaces.",
      icon: Globe2,
    },
    {
      title: "AI / ML",
      desc: "Computer vision pipelines, on-device inference, and LLM integrations.",
      icon: Cpu,
    },
    {
      title: "GAME DEVELOPMENT",
      desc: "Interactive mechanics, UI frameworks, and real-time state systems.",
      icon: Layers,
    },
    {
      title: "3D / INTERACTIVE EXPERIENCES",
      desc: "Spatial modeling in Blender and sensory web micro-interactions.",
      icon: Sparkles,
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* Hero Section */}
      <section className="relative pt-2 pb-8 sm:py-6">
        {/* Subtle grid backdrop for visual depth */}
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none -z-10" />

        <div className="max-w-4xl space-y-8">
          {/* Top Identifier Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#151515] border border-[#30302D] font-mono text-[11px] uppercase tracking-wider text-[#89857D]">
            <span className="w-1.5 h-1.5 bg-[#F26A21]" />
            <span>PORTFOLIO SYSTEM // SESSION ACTIVE</span>
          </div>

          {/* Hero Heading */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#E5E2DA] leading-[0.95]">
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
          <p className="text-base sm:text-xl text-[#E5E2DA]/90 font-normal max-w-2xl leading-relaxed">
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

          {/* Technical Pillars (Asymmetric Grid) */}
          <div className="pt-8 border-t border-[#30302D]">
            <div className="flex items-center justify-between pb-3 mb-4">
              <span className="font-mono text-xs text-[#89857D] uppercase tracking-widest">
                // CORE DISCIPLINES
              </span>
              <span className="font-mono text-[11px] text-[#504E4A]">[ 04 DOMAINS ]</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {technicalPillars.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="relative bg-[#151515] border border-[#30302D] p-4 flex items-start gap-3.5 group hover:border-[#F26A21]/40 transition-colors"
                  >
                    <CornerBrackets accentCorner="top-left" color="border-[#262624]" />
                    <div className="p-2 bg-[#1D1D1D] border border-[#30302D] text-[#F26A21] shrink-0">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#E5E2DA] group-hover:text-[#F26A21] transition-colors">
                        {pillar.title}
                      </h2>
                      <p className="text-xs text-[#89857D] leading-relaxed mt-1">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
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

        {/* 2x2 Grid of Solid Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projectsData.slice(0, 4).map((project) => (
            <ProjectCard key={project.id} project={project} />
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

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsData } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { SolidButton } from "@/components/ui/SolidButton";
import { CornerBrackets } from "@/components/ui/GeometricDecorations";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Layers,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Activity,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export async function generateStaticParams() {
  return projectsData.map((p) => ({
    slug: p.id,
  }));
}

export async function generateMetadata({
  params,
}) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.id === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const projectIndex = projectsData.findIndex((p) => p.id === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projectsData[projectIndex];
  const prevProject =
    projectIndex > 0 ? projectsData[projectIndex - 1] : projectsData[projectsData.length - 1];
  const nextProject =
    projectIndex < projectsData.length - 1 ? projectsData[projectIndex + 1] : projectsData[0];

  return (
    <article className="space-y-12 max-w-5xl">
      {/* Back Navigation & Breadcrumb */}
      <div className="flex items-center justify-between font-mono text-xs text-[#89857D] pb-4 border-b border-[#30302D]">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 hover:text-[#F26A21] uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO ARCHIVE</span>
        </Link>
        <span className="text-[#504E4A]">[ CASE STUDY // {project.number} ]</span>
      </div>

      {/* Main Project Header Banner */}
      <header className="interactive-panel relative bg-[#151515] border border-[#30302D] p-6 sm:p-10 space-y-6">
        <CornerBrackets accentCorner="all" />

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold text-[#F26A21] tracking-widest">
            // PROJECT {project.number}
          </span>
          <span className="text-[#30302D]">//</span>
          <span className="font-mono text-xs text-[#89857D] uppercase tracking-wider">
            {project.category}
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#E5E2DA]">
            {project.title}
          </h1>
          <p className="text-base sm:text-lg text-[#E5E2DA]/90 max-w-3xl leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="default" size="md">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Links Bar */}
        <div className="pt-6 border-t border-[#30302D] flex flex-wrap items-center gap-4">
          {project.links.demo && (
            <SolidButton
              href={project.links.demo}
              variant="primary"
              size="md"
              icon="external"
              external
            >
              LIVE DEMO
            </SolidButton>
          )}

          <SolidButton
            href={project.links.github}
            variant="secondary"
            size="md"
            icon="external"
            external
          >
            GITHUB REPOSITORY
          </SolidButton>
        </div>
      </header>

      {/* Specifications Ledger */}
      <section className="bg-[#101010] border border-[#30302D] p-6">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#89857D] pb-3 mb-4 border-b border-[#30302D]">
          <Terminal className="w-3.5 h-3.5 text-[#F26A21]" />
          <span>TECHNICAL SPECIFICATIONS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          {project.specs.map((spec) => (
            <div key={spec.label} className="bg-[#151515] p-3 border border-[#30302D]">
              <span className="text-[#89857D] block text-[10px] uppercase tracking-wider mb-1">
                {spec.label}
              </span>
              <span className="text-[#E5E2DA] font-semibold block">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Overview Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#89857D] pb-2 border-b border-[#30302D]">
          <Layers className="w-3.5 h-3.5 text-[#F26A21]" />
          <span>01 // SYSTEM OVERVIEW</span>
        </div>
        <p className="text-sm sm:text-base text-[#E5E2DA]/90 leading-relaxed max-w-3xl">
          {project.overview}
        </p>
      </section>

      {/* Problem & Solution (Side-by-side or stacked solid cards) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Problem Card */}
        <div className="interactive-panel bg-[#151515] border border-[#30302D] p-6 space-y-3 relative">
          <CornerBrackets accentCorner="top-left" />
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#89857D]">
            <AlertCircle className="w-3.5 h-3.5 text-[#FF7A2F]" />
            <span>02 // THE PROBLEM</span>
          </div>
          <p className="text-xs sm:text-sm text-[#89857D] leading-relaxed">
            {project.problem}
          </p>
        </div>

        {/* Solution Card */}
        <div className="interactive-panel bg-[#151515] border border-[#30302D] p-6 space-y-3 relative">
          <CornerBrackets accentCorner="top-right" />
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#89857D]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#F26A21]" />
            <span>03 // THE ARCHITECTURAL SOLUTION</span>
          </div>
          <p className="text-xs sm:text-sm text-[#E5E2DA]/90 leading-relaxed">
            {project.solution}
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#30302D]">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#89857D]">
            <Cpu className="w-3.5 h-3.5 text-[#F26A21]" />
            <span>04 // KEY SYSTEM CAPABILITIES</span>
          </div>
          <span className="font-mono text-[10px] text-[#504E4A]">[ MATRIX ]</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {project.keyFeatures.map((feature, idx) => (
            <div
              key={feature.title}
              className="interactive-panel bg-[#151515] border border-[#30302D] p-5 space-y-2 group hover:border-[#F26A21]/40 transition-colors"
            >
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#F26A21] font-semibold">
                  0{idx + 1}
                </span>
                {feature.tag && (
                  <span className="text-[#89857D] uppercase border border-[#30302D] px-1.5 py-0.5 bg-[#101010]">
                    {feature.tag}
                  </span>
                )}
              </div>
              <h3 className="font-mono text-sm font-bold uppercase text-[#E5E2DA] group-hover:text-[#F26A21] transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs text-[#89857D] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture & Technology Stack */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#89857D] pb-2 border-b border-[#30302D]">
          <Terminal className="w-3.5 h-3.5 text-[#F26A21]" />
          <span>05 // ARCHITECTURE &amp; SUBSYSTEMS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#151515] border border-[#30302D] p-4 space-y-2">
            <span className="font-mono text-[10px] uppercase text-[#89857D] tracking-widest block">
              FRONTEND TIER
            </span>
            <ul className="space-y-1 font-mono text-xs text-[#E5E2DA]">
              {project.architecture.frontend.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-[#F26A21]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#151515] border border-[#30302D] p-4 space-y-2">
            <span className="font-mono text-[10px] uppercase text-[#89857D] tracking-widest block">
              BACKEND SERVICES
            </span>
            <ul className="space-y-1 font-mono text-xs text-[#E5E2DA]">
              {project.architecture.backend.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-[#F26A21]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.architecture.aiServices && project.architecture.aiServices.length > 0 && (
            <div className="bg-[#151515] border border-[#30302D] p-4 space-y-2">
              <span className="font-mono text-[10px] uppercase text-[#89857D] tracking-widest block">
                AI / INFERENCE
              </span>
              <ul className="space-y-1 font-mono text-xs text-[#E5E2DA]">
                {project.architecture.aiServices.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-[#F26A21]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-[#151515] border border-[#30302D] p-4 space-y-2">
            <span className="font-mono text-[10px] uppercase text-[#89857D] tracking-widest block">
              INFRASTRUCTURE
            </span>
            <ul className="space-y-1 font-mono text-xs text-[#E5E2DA]">
              {project.architecture.infrastructure.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-[#F26A21]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contribution / My Role */}
      <section className="bg-[#151515] border border-[#30302D] p-6 sm:p-8 space-y-4 relative">
        <CornerBrackets accentCorner="all" />

        <div className="flex items-center justify-between pb-3 border-b border-[#30302D]">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#89857D]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F26A21]" />
            <span>06 // ENGINEERING ROLE &amp; CONTRIBUTION</span>
          </div>
          <span className="font-mono text-xs text-[#F26A21] font-semibold">
            {project.role.title}
          </span>
        </div>

        <ul className="space-y-2.5 text-xs sm:text-sm text-[#89857D] leading-relaxed pt-2">
          {project.role.responsibilities.map((resp, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-[#F26A21] font-mono mt-0.5 select-none">▸</span>
              <span className="text-[#E5E2DA]/90">{resp}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Screenshots / Interface Schematics */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#30302D]">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#89857D]">
            <Activity className="w-3.5 h-3.5 text-[#F26A21]" />
            <span>07 // SYSTEM INTERFACE &amp; WORKSPACE SCHEMATICS</span>
          </div>
          <span className="font-mono text-[10px] text-[#504E4A]">[ TELEMETRY ]</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {project.screenshots.map((shot, idx) => (
            <div
              key={shot.title}
              className="interactive-panel bg-[#151515] border border-[#30302D] flex flex-col justify-between p-4 group hover:border-[#F26A21]/50 transition-colors"
            >
              {/* Wireframe Mockup Simulation Window */}
              <div className="bg-[#0A0A0A] border border-[#30302D] aspect-[4/3] p-4 flex flex-col justify-between mb-4 relative overflow-hidden transition-transform duration-300 ease-out-expo group-hover:scale-[1.02] group-hover:border-[#F26A21]/60">
                <CornerBrackets accentCorner="top-left" color="border-[#252522]" />
                
                {/* Simulated game-interface / code telemetry view */}
                <div className="flex items-center justify-between font-mono text-[9px] text-[#89857D] pb-1 border-b border-[#252522]">
                  <span>PNL_{idx + 1}</span>
                  <span className="text-[#F26A21]">ACTIVE</span>
                </div>

                <div className="space-y-2 py-4">
                  <div className="w-3/4 h-2 bg-[#202020] border border-[#30302D]" />
                  <div className="w-1/2 h-2 bg-[#1a1a1a]" />
                  <div className="grid grid-cols-3 gap-1 pt-2">
                    <div className="h-6 bg-[#161616] border border-[#2b2b28] flex items-center justify-center font-mono text-[8px] text-[#555]">
                      IO
                    </div>
                    <div className="h-6 bg-[#161616] border border-[#2b2b28] flex items-center justify-center font-mono text-[8px] text-[#555]">
                      LOG
                    </div>
                    <div className="h-6 bg-[#161616] border border-[#F26A21]/30 flex items-center justify-center font-mono text-[8px] text-[#F26A21]">
                      RUN
                    </div>
                  </div>
                </div>

                <div className="font-mono text-[9px] text-[#504E4A] flex justify-between">
                  <span>SCALE: 100%</span>
                  <span>{shot.category}</span>
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold uppercase text-[#E5E2DA] group-hover:text-[#F26A21] transition-colors">
                  {shot.title}
                </h4>
                <p className="text-[11px] text-[#89857D] leading-relaxed mt-1">
                  {shot.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Result / Outcome */}
      <section className="interactive-panel bg-[#151515] border border-[#30302D] p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#89857D] pb-2 border-b border-[#30302D]">
          <Sparkles className="w-3.5 h-3.5 text-[#F26A21]" />
          <span>08 // RESULT &amp; DELIVERABLE OUTCOME</span>
        </div>

        <p className="text-xs sm:text-sm text-[#E5E2DA] leading-relaxed">
          {project.resultOutcome.summary}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {project.resultOutcome.highlights.map((highlight, idx) => (
            <div
              key={idx}
              className="bg-[#101010] border border-[#30302D] p-3 text-xs text-[#89857D] font-mono leading-relaxed"
            >
              <span className="text-[#F26A21] block font-bold mb-1">
                // 0{idx + 1}
              </span>
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Pagination Between Projects */}
      <div className="pt-8 border-t border-[#30302D] flex items-center justify-between gap-4 font-mono text-xs">
        <Link
          href={`/projects/${prevProject.id}`}
          className="group flex items-center gap-2 text-[#89857D] hover:text-[#E5E2DA] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#F26A21] transition-transform group-hover:-translate-x-1" />
          <div className="text-left">
            <span className="block text-[10px] text-[#504E4A] uppercase">PREV PROJECT</span>
            <span className="font-bold text-[#E5E2DA] group-hover:text-[#F26A21]">
              {prevProject.title}
            </span>
          </div>
        </Link>

        <Link
          href={`/projects/${nextProject.id}`}
          className="group flex items-center gap-2 text-[#89857D] hover:text-[#E5E2DA] transition-colors text-right"
        >
          <div>
            <span className="block text-[10px] text-[#504E4A] uppercase">NEXT PROJECT</span>
            <span className="font-bold text-[#E5E2DA] group-hover:text-[#F26A21]">
              {nextProject.title}
            </span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-[#F26A21] transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

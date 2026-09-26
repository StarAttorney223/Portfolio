import React from "react";
import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CornerBrackets } from "@/components/ui/GeometricDecorations";
import { SolidButton } from "@/components/ui/SolidButton";
import {
  Code,
  Compass,
  Cpu,
  Gamepad2,
  Sparkles,
  Terminal,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Divyansh Chandrakar: Engineering philosophy, technical curiosity, and exploration across web development, AI, and 3D design.",
};

export default function AboutPage() {
  const exploringTopics = [
    {
      title: "APPLIED ARTIFICIAL INTELLIGENCE",
      desc: "Investigating lightweight browser-based inference with TensorFlow.js and multi-modal generative pipelines.",
      icon: Cpu,
    },
    {
      title: "FULL-STACK ARCHITECTURE",
      desc: "Building highly resilient Next.js App Router architectures with robust data integrity and streaming capabilities.",
      icon: Code,
    },
    {
      title: "GAME SYSTEMS & INTERACTIVITY",
      desc: "Studying game loops, physical simulation logic, and tactile UI paradigms that elevate user immersion.",
      icon: Gamepad2,
    },
    {
      title: "3D MODELING / BLENDER",
      desc: "Creating hard-surface geometric 3D assets, procedural materials, and spatial lighting environments.",
      icon: Sparkles,
    },
  ];

  return (
    <div className="space-y-12 max-w-5xl">
      <SectionHeader
        number="05"
        title="ABOUT"
        subtitle="ENGINEERING PHILOSOPHY &amp; PERSPECTIVE"
        description="Behind the code: perspectives on software architecture, visual computing, and building thoughtful digital products."
        badge="PERSPECTIVE"
      />

      {/* Main Statement Banner */}
      <div className="relative bg-[#151515] border border-[#30302D] p-6 sm:p-10 space-y-6">
        <CornerBrackets accentCorner="all" />

        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#F26A21]">
          <span className="w-1.5 h-1.5 bg-[#F26A21]" />
          <span>PERSONAL STATEMENT</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#E5E2DA] leading-snug">
          &ldquo;I&apos;m a Computer Science student interested in building software that sits at the intersection of technology and creativity.&rdquo;
        </h2>

        <div className="space-y-4 text-sm sm:text-base text-[#E5E2DA]/90 leading-relaxed max-w-3xl pt-2">
          <p>
            Ever since I started programming, I have been drawn to projects where rigorous backend architecture meets tangible, high-touch user interfaces. Software should not just work reliably under the hood; it should also feel intentional, responsive, and tactile to use.
          </p>
          <p>
            Whether I am implementing client-side pose estimation with MediaPipe for physiotherapy rehabilitation, orchestrating multi-language code execution containers for algorithmic problem solvers, or experimenting with procedural models in Blender, my approach centers on technical craftsmanship and user empathy.
          </p>
          <p>
            I value clean code, strong typings, solid UI foundations over superficial trends, and an uncompromising curiosity for how complex systems operate from silicon to the screen.
          </p>
        </div>

        <div className="pt-6 border-t border-[#30302D] flex flex-wrap items-center gap-4">
          <SolidButton href="/projects" variant="primary" size="md" icon="arrow">
            VIEW PROJECT ARCHIVE
          </SolidButton>
          <SolidButton href="/contact" variant="secondary" size="md">
            GET IN TOUCH
          </SolidButton>
        </div>
      </div>

      {/* Currently Exploring Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-[#30302D]">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#89857D]">
            <Compass className="w-4 h-4 text-[#F26A21]" />
            <span>01 // CURRENTLY EXPLORING</span>
          </div>
          <span className="font-mono text-[10px] text-[#504E4A]">[ RESEARCH &amp; STUDY ]</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {exploringTopics.map((topic, idx) => {
            const Icon = topic.icon;
            return (
              <div
                key={topic.title}
                className="bg-[#151515] border border-[#30302D] p-5 space-y-3 group hover:border-[#F26A21]/50 transition-colors"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2 text-[#F26A21]">
                    <Icon className="w-4 h-4" />
                    <span>0{idx + 1}</span>
                  </div>
                  <span className="text-[#504E4A] text-[10px] uppercase tracking-wider">
                    EXPLORATION
                  </span>
                </div>

                <h3 className="font-mono text-sm font-bold uppercase text-[#E5E2DA] group-hover:text-[#F26A21] transition-colors">
                  {topic.title}
                </h3>

                <p className="text-xs text-[#89857D] leading-relaxed">
                  {topic.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technical Principles */}
      <div className="bg-[#151515] border border-[#30302D] p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#89857D] pb-2 border-b border-[#30302D]">
          <Terminal className="w-3.5 h-3.5 text-[#F26A21]" />
          <span>02 // ENGINEERING PRINCIPLES</span>
        </div>

        <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-5">
          <div className="space-y-2 border border-[#30302D] bg-[#101010] p-4 font-mono md:col-span-3">
            <span className="text-xs font-bold text-[#F26A21] block">
              01 // SOLID FOUNDATIONS
            </span>
            <p className="text-xs text-[#89857D] leading-relaxed">
              Prioritizing deterministic states, clean component boundaries, and high-contrast readable layouts over ephemeral design gimmicks.
            </p>
          </div>

          <div className="space-y-2 border border-[#30302D] bg-[#101010] p-4 font-mono md:col-span-2 md:translate-y-6">
            <span className="text-xs font-bold text-[#F26A21] block">
              02 // PRAGMATIC INNOVATION
            </span>
            <p className="text-xs text-[#89857D] leading-relaxed">
              Applying AI and computer vision where they demonstrably solve user pain points rather than adding complexity for its own sake.
            </p>
          </div>

          <div className="space-y-2 border border-[#30302D] bg-[#101010] p-4 font-mono md:col-span-4 md:mt-4">
            <span className="text-xs font-bold text-[#F26A21] block">
              03 // CONTINUOUS REFINEMENT
            </span>
            <p className="text-xs text-[#89857D] leading-relaxed">
              Viewing every project as a living architecture to profile, benchmark, optimize, and improve iteratively.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

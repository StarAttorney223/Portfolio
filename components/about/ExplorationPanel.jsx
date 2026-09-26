"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Code, Compass, Cpu, Gamepad2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const topics = [
  {
    title: "APPLIED ARTIFICIAL INTELLIGENCE",
    description: "Investigating lightweight browser-based inference with TensorFlow.js and multi-modal generative pipelines.",
    icon: Cpu,
  },
  {
    title: "FULL-STACK ARCHITECTURE",
    description: "Building highly resilient Next.js App Router architectures with robust data integrity and streaming capabilities.",
    icon: Code,
  },
  {
    title: "GAME SYSTEMS & INTERACTIVITY",
    description: "Studying game loops, physical simulation logic, and tactile UI paradigms that elevate user immersion.",
    icon: Gamepad2,
  },
  {
    title: "3D MODELING / BLENDER",
    description: "Creating hard-surface geometric 3D assets, procedural materials, and spatial lighting environments.",
    icon: Sparkles,
  },
];

export function ExplorationPanel() {
  const [selected, setSelected] = useState(0);
  const activeTopic = topics[selected];
  const ActiveIcon = activeTopic.icon;

  return (
    <div className="space-y-6" data-reveal>
      <div className="flex items-center justify-between border-b border-[#30302D] pb-2">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#89857D]">
          <Compass className="h-4 w-4 text-[#F26A21]" />
          <span>01 // CURRENTLY EXPLORING</span>
        </div>
        <span className="font-mono text-[10px] text-[#504E4A]">[ RESEARCH &amp; STUDY ]</span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.8fr)]">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {topics.map((topic, index) => {
            const Icon = topic.icon;
            const isSelected = selected === index;
            return (
              <button
                key={topic.title}
                type="button"
                onClick={() => setSelected(index)}
                onMouseEnter={() => setSelected(index)}
                onFocus={() => setSelected(index)}
                className={cn(
                  "group min-h-[112px] border bg-[#151515] p-4 text-left transition-all duration-200 ease-out-expo hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-[#F26A21]",
                  isSelected
                    ? "border-[#F26A21] text-[#E5E2DA]"
                    : "border-[#30302D] text-[#89857D] opacity-60 hover:border-[#F26A21]/50 hover:opacity-100"
                )}
                aria-pressed={isSelected}
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <Icon className={cn("h-4 w-4", isSelected ? "text-[#F26A21]" : "text-[#504E4A]")} />
                  <span className={isSelected ? "text-[#F26A21]" : "text-[#504E4A]"}>0{index + 1}</span>
                </div>
                <span className="mt-5 block font-mono text-xs font-bold uppercase tracking-wider">
                  {topic.title}
                </span>
                <span className={cn("mt-3 block h-px bg-[#F26A21] transition-all duration-300", isSelected ? "w-12" : "w-0 group-hover:w-6")} />
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.aside
            key={activeTopic.title}
            className="relative flex min-h-[228px] flex-col justify-between border border-[#30302D] bg-[#101010] p-6"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.24 }}
          >
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#504E4A]">
              <span>ACTIVE RESEARCH NODE</span>
              <span className="text-[#F26A21]">0{selected + 1}</span>
            </div>
            <div className="mt-8">
              <ActiveIcon className="mb-4 h-5 w-5 text-[#F26A21]" />
              <h3 className="font-mono text-base font-bold uppercase text-[#E5E2DA]">{activeTopic.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#89857D]">{activeTopic.description}</p>
            </div>
          </motion.aside>
        </AnimatePresence>
      </div>
    </div>
  );
}

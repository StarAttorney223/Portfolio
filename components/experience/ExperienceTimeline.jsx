"use client";

import React, { useState } from "react";
import Link from "next/link";
import { experienceData, experienceCategories } from "@/data/experience";
import { Badge } from "@/components/ui/Badge";
import { CornerBrackets } from "@/components/ui/GeometricDecorations";
import { ArrowRight, Calendar, Filter, MapPin, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export function ExperienceTimeline() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const filteredItems =
    selectedCategory === "ALL"
      ? experienceData
      : experienceData.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Category Filter Tabs */}
      <div className="bg-[#242424] border border-[#484844] p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-xs text-[#B8B5AE] uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5 text-[#FF852E]" />
          <span>FILTER BY EXPERIENCE TYPE:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          {experienceCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-2.5 py-1 uppercase tracking-wider transition-colors border select-none focus-visible:outline-2 focus-visible:outline-[#FF852E]",
                selectedCategory === cat
                  ? "bg-[#FF852E] text-black font-bold border-[#FFA04D]"
                  : "bg-[#1C1C1C] text-[#B8B5AE] hover:text-[#F5F3EE] border-[#484844]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="relative border-l-2 border-[#484844] ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-8">
        {filteredItems.map((item, index) => (
          <div key={item.id} className="relative group">
            {/* Timeline Orange Node Pip */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-3 h-3 bg-[#242424] border-2 border-[#FF852E] rounded-none rotate-45 group-hover:bg-[#FF852E] transition-colors" />

            {/* Solid Card */}
            <div className="interactive-panel bg-[#242424] border border-[#484844] hover:border-[#FF852E]/50 p-6 space-y-4 relative transition-colors">
              <CornerBrackets accentCorner="top-left" />

              {/* Header: Category + Period */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#484844]">
                <div className="flex items-center gap-2">
                  <Badge variant="dim" size="sm">
                    {item.category}
                  </Badge>
                  <span className="font-mono text-[10px] text-[#96928B]">
                    // 0{index + 1}
                  </span>
                </div>

                <div className="flex items-center gap-4 font-mono text-xs text-[#B8B5AE]">
                  <span className="flex items-center gap-1.5 text-[#F5F3EE]">
                    <Calendar className="w-3.5 h-3.5 text-[#FF852E]" />
                    <span>{item.period}</span>
                  </span>
                  {item.location && (
                    <span className="hidden sm:flex items-center gap-1.5 text-[#B8B5AE]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-xl font-bold uppercase text-[#F5F3EE] group-hover:text-[#FF852E] transition-colors">
                  {item.title}
                </h3>
                <p className="font-mono text-xs text-[#B8B5AE] uppercase tracking-wider mt-1">
                  {item.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#B8B5AE] leading-relaxed">
                {item.description}
              </p>

              {/* Detail Points */}
              <ul className="space-y-2 text-xs text-[#F5F3EE]/90 pt-1">
                {item.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#FF852E] font-mono mt-0.5 select-none">▸</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack & Link */}
              <div className="pt-4 border-t border-[#484844] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {item.techStack && (
                  <div className="flex flex-wrap gap-1.5">
                    {item.techStack.map((tech) => (
                      <Badge key={tech} variant="outline" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}

                {item.link && (
                  <Link
                    href={item.link.url}
                    className="inline-flex items-center gap-1.5 font-mono text-xs uppercase font-bold text-[#FF852E] hover:text-[#FFA04D] transition-colors shrink-0"
                  >
                    <span>{item.link.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

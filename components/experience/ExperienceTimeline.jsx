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
      <div className="bg-[#151515] border border-[#30302D] p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-xs text-[#89857D] uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5 text-[#F26A21]" />
          <span>FILTER BY EXPERIENCE TYPE:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          {experienceCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-2.5 py-1 uppercase tracking-wider transition-colors border select-none focus-visible:outline-2 focus-visible:outline-[#F26A21]",
                selectedCategory === cat
                  ? "bg-[#F26A21] text-black font-bold border-[#FF7A2F]"
                  : "bg-[#101010] text-[#89857D] hover:text-[#E5E2DA] border-[#30302D]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="relative border-l-2 border-[#30302D] ml-3 sm:ml-6 pl-6 sm:pl-10 space-y-8">
        {filteredItems.map((item, index) => (
          <div key={item.id} className="relative group">
            {/* Timeline Orange Node Pip */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-3 h-3 bg-[#151515] border-2 border-[#F26A21] rounded-none rotate-45 group-hover:bg-[#F26A21] transition-colors" />

            {/* Solid Card */}
            <div className="bg-[#151515] border border-[#30302D] hover:border-[#F26A21]/50 p-6 space-y-4 relative transition-colors">
              <CornerBrackets accentCorner="top-left" />

              {/* Header: Category + Period */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#30302D]">
                <div className="flex items-center gap-2">
                  <Badge variant="dim" size="sm">
                    {item.category}
                  </Badge>
                  <span className="font-mono text-[10px] text-[#504E4A]">
                    // 0{index + 1}
                  </span>
                </div>

                <div className="flex items-center gap-4 font-mono text-xs text-[#89857D]">
                  <span className="flex items-center gap-1.5 text-[#E5E2DA]">
                    <Calendar className="w-3.5 h-3.5 text-[#F26A21]" />
                    <span>{item.period}</span>
                  </span>
                  {item.location && (
                    <span className="hidden sm:flex items-center gap-1.5 text-[#89857D]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-xl font-bold uppercase text-[#E5E2DA] group-hover:text-[#F26A21] transition-colors">
                  {item.title}
                </h3>
                <p className="font-mono text-xs text-[#89857D] uppercase tracking-wider mt-1">
                  {item.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#89857D] leading-relaxed">
                {item.description}
              </p>

              {/* Detail Points */}
              <ul className="space-y-2 text-xs text-[#E5E2DA]/90 pt-1">
                {item.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#F26A21] font-mono mt-0.5 select-none">▸</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack & Link */}
              <div className="pt-4 border-t border-[#30302D] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                    className="inline-flex items-center gap-1.5 font-mono text-xs uppercase font-bold text-[#F26A21] hover:text-[#FF7A2F] transition-colors shrink-0"
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

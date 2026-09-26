import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  badge?: string;
}

export function SectionHeader({
  number,
  title,
  subtitle,
  description,
  className,
  badge,
}: SectionHeaderProps) {
  return (
    <div className={cn("space-y-3 mb-8 sm:mb-10", className)}>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs font-semibold text-[#F26A21] tracking-widest">
          // {number}
        </span>
        <div className="h-[1px] w-8 bg-[#F26A21]/40" />
        {badge && (
          <span className="font-mono text-[10px] uppercase text-[#89857D] tracking-widest px-1.5 py-0.5 border border-[#30302D] bg-[#151515]">
            {badge}
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#30302D] pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#E5E2DA]">
            {title}
          </h1>
          {subtitle && (
            <p className="font-mono text-xs text-[#89857D] uppercase tracking-wider mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {description && (
          <p className="max-w-md text-xs sm:text-sm text-[#89857D] sm:text-right leading-relaxed mt-2 sm:mt-0">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

import React from "react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  number,
  title,
  subtitle,
  description,
  className,
  badge,
}) {
  return (
    <div className={cn("space-y-3 mb-8 sm:mb-10", className)}>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs font-semibold text-[#FF852E] tracking-widest">
          // {number}
        </span>
        <div className="section-header-line h-[1px] w-8 origin-left bg-[#FF852E]/40" />
        {badge && (
          <span className="font-mono text-[10px] uppercase text-[#B8B5AE] tracking-widest px-1.5 py-0.5 border border-[#484844] bg-[#242424]">
            {badge}
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#484844] pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-[#F5F3EE]">
            {title}
          </h1>
          {subtitle && (
            <p className="font-mono text-xs text-[#B8B5AE] uppercase tracking-wider mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {description && (
          <p className="max-w-md text-xs sm:text-sm text-[#B8B5AE] sm:text-right leading-relaxed mt-2 sm:mt-0">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Corner bracket accents for solid cards
 */
export function CornerBrackets({
  className,
  color = "border-[#484844]",
  accentCorner = "top-left",
}) {
  return (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 pointer-events-none transition-colors",
          accentCorner === "top-left" || accentCorner === "all"
            ? "border-[#FF852E]"
            : color,
          className
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 pointer-events-none transition-colors",
          accentCorner === "top-right" || accentCorner === "all"
            ? "border-[#FF852E]"
            : color,
          className
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 pointer-events-none transition-colors",
          accentCorner === "bottom-right" || accentCorner === "all"
            ? "border-[#FF852E]"
            : color,
          className
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 pointer-events-none transition-colors",
          accentCorner === "all" ? "border-[#FF852E]" : color,
          className
        )}
      />
    </>
  );
}

/**
 * Crosshair marker '+' for grid intersections
 */
export function Crosshair({ className }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "font-mono text-xs text-[#484844] select-none pointer-events-none",
        className
      )}
    >
      +
    </span>
  );
}

/**
 * Small technical metadata tag box
 */
export function TechMeta({
  label,
  value,
  className,
}) {
  return (
    <div
      className={cn(
        "flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-wider py-1 px-2 bg-[#242424] border border-[#484844]",
        className
      )}
    >
      <span className="text-[#B8B5AE]">{label}</span>
      <span className="text-[#F5F3EE] font-semibold">{value}</span>
    </div>
  );
}

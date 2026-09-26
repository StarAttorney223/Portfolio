import React from "react";
import { cn } from "@/lib/utils";

/**
 * Corner bracket accents for solid cards
 */
export function CornerBrackets({
  className,
  color = "border-[#30302D]",
  accentCorner = "top-left",
}: {
  className?: string;
  color?: string;
  accentCorner?: "top-left" | "top-right" | "bottom-right" | "all";
}) {
  return (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 pointer-events-none transition-colors",
          accentCorner === "top-left" || accentCorner === "all"
            ? "border-[#F26A21]"
            : color,
          className
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 pointer-events-none transition-colors",
          accentCorner === "top-right" || accentCorner === "all"
            ? "border-[#F26A21]"
            : color,
          className
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 pointer-events-none transition-colors",
          accentCorner === "bottom-right" || accentCorner === "all"
            ? "border-[#F26A21]"
            : color,
          className
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 pointer-events-none transition-colors",
          accentCorner === "all" ? "border-[#F26A21]" : color,
          className
        )}
      />
    </>
  );
}

/**
 * Crosshair marker '+' for grid intersections
 */
export function Crosshair({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "font-mono text-xs text-[#30302D] select-none pointer-events-none",
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
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-wider py-1 px-2 bg-[#151515] border border-[#30302D]",
        className
      )}
    >
      <span className="text-[#89857D]">{label}</span>
      <span className="text-[#E5E2DA] font-semibold">{value}</span>
    </div>
  );
}

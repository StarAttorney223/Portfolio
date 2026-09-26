import React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
}) {
  const variantStyles = {
    default: "bg-[#1D1D1D] text-[#E5E2DA] border border-[#30302D]",
    orange: "bg-[#F26A21] text-black font-semibold border border-[#FF7A2F]",
    outline: "bg-transparent text-[#89857D] border border-[#30302D]",
    dim: "bg-[#F26A21]/10 text-[#FF7A2F] border border-[#F26A21]/30",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 tracking-wider",
    md: "text-xs px-2.5 py-1 tracking-wide",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-mono uppercase transition-colors select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}

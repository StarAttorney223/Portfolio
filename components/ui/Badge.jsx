import React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
}) {
  const variantStyles = {
    default: "bg-[#303030] text-[#F5F3EE] border border-[#484844]",
    orange: "bg-[#FF852E] text-black font-semibold border border-[#FFA04D]",
    outline: "bg-transparent text-[#B8B5AE] border border-[#484844]",
    dim: "bg-[#FF852E]/10 text-[#FFA04D] border border-[#FF852E]/30",
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

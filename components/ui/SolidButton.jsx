import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export function SolidButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon = "none",
  className,
  disabled = false,
  type = "button",
  external = false,
}) {
  const baseStyles =
    "group inline-flex items-center justify-center font-mono font-medium tracking-wider uppercase transition-all duration-200 ease-out-expo select-none relative active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F26A21]";

  const variantStyles = {
    primary:
      "bg-[#F26A21] text-black hover:bg-[#FF7A2F] active:bg-[#B94712] border border-[#FF7A2F] shadow-sm",
    secondary:
      "bg-[#151515] text-[#E5E2DA] hover:bg-[#1D1D1D] hover:text-[#FF7A2F] border border-[#30302D] hover:border-[#F26A21]",
    subtle:
      "bg-transparent text-[#89857D] hover:text-[#E5E2DA] hover:bg-[#151515] border border-transparent hover:border-[#30302D]",
  };

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-2",
    md: "text-xs px-4 py-2.5 gap-2.5",
    lg: "text-sm px-6 py-3.5 gap-3",
  };

  const content = (
    <>
      <span>{children}</span>
      {icon === "arrow" && (
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
      )}
      {icon === "external" && (
        <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {content}
    </button>
  );
}

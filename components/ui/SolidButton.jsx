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
    "group inline-flex items-center justify-center font-mono font-medium tracking-wider uppercase transition-all duration-200 ease-out-expo select-none relative active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF852E]";

  const variantStyles = {
    primary:
      "bg-[#FF852E] text-black hover:bg-[#FFA04D] active:bg-[#D9631C] border border-[#FFA04D] shadow-sm",
    secondary:
      "bg-[#242424] text-[#F5F3EE] hover:bg-[#303030] hover:text-[#FFA04D] border border-[#484844] hover:border-[#FF852E]",
    subtle:
      "bg-transparent text-[#B8B5AE] hover:text-[#F5F3EE] hover:bg-[#242424] border border-transparent hover:border-[#484844]",
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

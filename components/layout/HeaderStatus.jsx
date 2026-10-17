import React from "react";
import Link from "next/link";
import { profileData } from "@/data/profile";
import { Terminal, ShieldCheck } from "lucide-react";

export function HeaderStatus() {
  const { systemStatus } = profileData;

  return (
    <header className="shell-header fixed inset-x-0 top-0 z-50 h-[41px] bg-[#161616] border-b border-[#484844] px-4 py-2 select-none">
      <div className="max-w-[1700px] mx-auto flex items-center justify-between font-mono text-[11px] tracking-wider uppercase text-[#B8B5AE]">
        {/* Left: System identifier */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[#F5F3EE] hover:text-[#FF852E] transition-colors font-semibold"
          >
            <Terminal className="w-3.5 h-3.5 text-[#FF852E]" />
            <span>{systemStatus.code}</span>
          </Link>
          <span className="hidden sm:inline text-[#484844]">//</span>
          <span className="hidden sm:flex items-center gap-1.5 text-[#B8B5AE]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF852E] animate-pulse" />
            <span>{systemStatus.label}</span>
          </span>
        </div>

        {/* Center / Right: Availability indicator */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 whitespace-nowrap text-[#F5F3EE] border border-[#484844] bg-[#242424] px-2.5 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-system-pulse" />
            <span className="text-[10px] font-medium tracking-widest text-[#F5F3EE] sm:hidden">
              AVAILABLE
            </span>
            <span className="hidden text-[10px] font-medium tracking-widest text-[#F5F3EE] sm:inline">
              {systemStatus.availability}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[#96928B]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B8B5AE]" />
            <span>{systemStatus.version}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

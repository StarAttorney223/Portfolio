import React from "react";
import Link from "next/link";
import { profileData } from "@/data/profile";
import { Terminal, ShieldCheck } from "lucide-react";

export function HeaderStatus() {
  const { systemStatus } = profileData;

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[41px] bg-[#0A0A0A] border-b border-[#30302D] px-4 py-2 select-none">
      <div className="max-w-[1700px] mx-auto flex items-center justify-between font-mono text-[11px] tracking-wider uppercase text-[#89857D]">
        {/* Left: System identifier */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[#E5E2DA] hover:text-[#F26A21] transition-colors font-semibold"
          >
            <Terminal className="w-3.5 h-3.5 text-[#F26A21]" />
            <span>{systemStatus.code}</span>
          </Link>
          <span className="hidden sm:inline text-[#30302D]">//</span>
          <span className="hidden sm:flex items-center gap-1.5 text-[#89857D]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F26A21] animate-pulse" />
            <span>{systemStatus.label}</span>
          </span>
        </div>

        {/* Center / Right: Availability indicator */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[#E5E2DA] border border-[#30302D] bg-[#151515] px-2.5 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-medium tracking-widest text-[#E5E2DA]">
              {systemStatus.availability}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[#504E4A]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#89857D]" />
            <span>{systemStatus.version}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

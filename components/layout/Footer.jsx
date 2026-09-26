import React from "react";
import Link from "next/link";
import { profileData } from "@/data/profile";

export function Footer() {
  return (
    <footer className="w-full bg-[#0A0A0A] border-t border-[#30302D] py-8 px-6 sm:px-10 mt-20 select-none">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 font-mono text-xs text-[#89857D]">
        {/* Identity */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#F26A21]" />
            <span className="text-[#E5E2DA] font-bold tracking-wider uppercase">
              {profileData.name.full}
            </span>
          </div>
          <p className="text-[11px] text-[#504E4A] uppercase tracking-wider">
            COMPUTER SCIENCE // FULL-STACK DEVELOPER
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-6">
          {profileData.socials.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#89857D] hover:text-[#F26A21] uppercase tracking-wider transition-colors"
            >
              {social.label}
            </a>
          ))}
          <Link
            href="/contact"
            className="text-[#89857D] hover:text-[#F26A21] uppercase tracking-wider transition-colors"
          >
            CONTACT
          </Link>
        </div>

        {/* System & Copyright */}
        <div className="space-y-1 md:text-right text-[11px] text-[#504E4A]">
          <p className="text-[#89857D] tracking-wider uppercase">
            © 2026 {profileData.name.full}
          </p>
          <p className="tracking-widest">
            ENGINEERED WITH NEXT.JS // SOLID UI // VER 1.0
          </p>
        </div>
      </div>
    </footer>
  );
}

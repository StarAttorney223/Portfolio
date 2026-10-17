"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ExternalLink, Terminal } from "lucide-react";
import { profileData } from "@/data/profile";
import { cn } from "@/lib/utils";

import { navigation as navItems } from "@/data/navigation";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="shell-mobile lg:hidden w-full bg-[#161616] border-b border-[#484844] sticky top-[41px] z-40">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Mobile Brand Link */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-black uppercase tracking-tight text-[#F5F3EE]"
        >
          <span className="w-2 h-2 bg-[#FF852E]" />
          <span>
            {profileData.name.first} {profileData.name.last}
          </span>
        </Link>

        {/* Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="flex items-center gap-2 p-2 bg-[#242424] border border-[#484844] text-[#F5F3EE] hover:text-[#FF852E] hover:border-[#FF852E] transition-colors focus-visible:outline-2 focus-visible:outline-[#FF852E]"
        >
          <span className="font-mono text-[10px] uppercase tracking-wider hidden sm:inline">
            {isOpen ? "CLOSE" : "MENU"}
          </span>
          {isOpen ? <X className="w-5 h-5 text-[#FF852E]" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Slide-out / Dropdown Solid Panel */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[102px] bg-[#161616] z-50 flex flex-col justify-between p-6 overflow-y-auto border-t border-[#484844]"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-[#484844]">
              <span className="font-mono text-xs uppercase tracking-widest text-[#B8B5AE]">
                // NAVIGATION MATRIX
              </span>
              <span className="font-mono text-xs text-[#FF852E]">[ ACTIVE ]</span>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/projects"
                    ? pathname.startsWith("/projects")
                    : pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    scroll={false}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-4 p-3 font-mono text-sm uppercase tracking-wider border transition-colors",
                      isActive
                        ? "bg-[#242424] text-[#F5F3EE] border-[#FF852E] font-bold"
                        : "text-[#B8B5AE] hover:text-[#F5F3EE] bg-[#1C1C1C] border-[#484844]"
                    )}
                  >
                    <span className={isActive ? "text-[#FF852E]" : "text-[#96928B]"}>
                      {item.number}
                    </span>
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="ml-auto w-2 h-2 bg-[#FF852E]" aria-hidden="true" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* External Links */}
            <div className="pt-4 border-t border-[#484844]">
              <span className="font-mono text-xs uppercase tracking-widest text-[#B8B5AE] block mb-3">
                CHANNELS
              </span>
              <div className="grid grid-cols-2 gap-2">
                {profileData.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 bg-[#242424] border border-[#484844] font-mono text-xs uppercase tracking-wider text-[#B8B5AE] hover:text-[#FF852E] hover:border-[#FF852E] transition-colors"
                  >
                    <span>{social.label}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Telemetry for Mobile */}
          <div className="pt-6 border-t border-[#484844] mt-6">
            <div className="flex items-center justify-between font-mono text-xs text-[#B8B5AE]">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#FF852E]" />
                <span>DIVYANSH.EXE</span>
              </span>
              <span className="text-[#FF852E]">ONLINE</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

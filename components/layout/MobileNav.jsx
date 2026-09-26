"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ExternalLink, Terminal } from "lucide-react";
import { profileData } from "@/data/profile";
import { cn } from "@/lib/utils";

const navItems = [
  { number: "01", label: "PROFILE", href: "/profile" },
  { number: "02", label: "PROJECTS", href: "/projects" },
  { number: "03", label: "SKILLS", href: "/skills" },
  { number: "04", label: "EXPERIENCE", href: "/experience" },
  { number: "05", label: "ABOUT", href: "/about" },
  { number: "06", label: "CONTACT", href: "/contact" },
];

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
    <div className="shell-mobile lg:hidden w-full bg-[#0A0A0A] border-b border-[#30302D] sticky top-[41px] z-40">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Mobile Brand Link */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-black uppercase tracking-tight text-[#E5E2DA]"
        >
          <span className="w-2 h-2 bg-[#F26A21]" />
          <span>
            {profileData.name.first} {profileData.name.last}
          </span>
        </Link>

        {/* Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="flex items-center gap-2 p-2 bg-[#151515] border border-[#30302D] text-[#E5E2DA] hover:text-[#F26A21] hover:border-[#F26A21] transition-colors focus-visible:outline-2 focus-visible:outline-[#F26A21]"
        >
          <span className="font-mono text-[10px] uppercase tracking-wider hidden sm:inline">
            {isOpen ? "CLOSE" : "MENU"}
          </span>
          {isOpen ? <X className="w-5 h-5 text-[#F26A21]" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Slide-out / Dropdown Solid Panel */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[102px] bg-[#0A0A0A] z-50 flex flex-col justify-between p-6 overflow-y-auto border-t border-[#30302D]"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-[#30302D]">
              <span className="font-mono text-xs uppercase tracking-widest text-[#89857D]">
                // NAVIGATION MATRIX
              </span>
              <span className="font-mono text-xs text-[#F26A21]">[ ACTIVE ]</span>
            </div>

            <nav className="space-y-2">
              <Link
                href="/"
                className={cn(
                  "flex items-center gap-4 p-3 font-mono text-sm uppercase tracking-wider border transition-colors",
                  pathname === "/"
                    ? "bg-[#151515] text-[#F26A21] border-[#F26A21] font-bold"
                    : "text-[#89857D] hover:text-[#E5E2DA] bg-[#101010] border-[#30302D]"
                )}
              >
                <span className="text-[#F26A21]">00</span>
                <span>HOME / MENU</span>
              </Link>

              {navItems.map((item) => {
                const isActive =
                  item.href === "/projects"
                    ? pathname.startsWith("/projects")
                    : pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-4 p-3 font-mono text-sm uppercase tracking-wider border transition-colors",
                      isActive
                        ? "bg-[#151515] text-[#E5E2DA] border-[#F26A21] font-bold"
                        : "text-[#89857D] hover:text-[#E5E2DA] bg-[#101010] border-[#30302D]"
                    )}
                  >
                    <span className={isActive ? "text-[#F26A21]" : "text-[#504E4A]"}>
                      {item.number}
                    </span>
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="ml-auto w-2 h-2 bg-[#F26A21]" aria-hidden="true" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* External Links */}
            <div className="pt-4 border-t border-[#30302D]">
              <span className="font-mono text-xs uppercase tracking-widest text-[#89857D] block mb-3">
                CHANNELS
              </span>
              <div className="grid grid-cols-2 gap-2">
                {profileData.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 bg-[#151515] border border-[#30302D] font-mono text-xs uppercase tracking-wider text-[#89857D] hover:text-[#F26A21] hover:border-[#F26A21] transition-colors"
                  >
                    <span>{social.label}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Telemetry for Mobile */}
          <div className="pt-6 border-t border-[#30302D] mt-6">
            <div className="flex items-center justify-between font-mono text-xs text-[#89857D]">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#F26A21]" />
                <span>DIVYANSH.EXE</span>
              </span>
              <span className="text-[#F26A21]">ONLINE</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

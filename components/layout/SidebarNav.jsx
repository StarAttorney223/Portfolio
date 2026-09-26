"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { profileData } from "@/data/profile";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { number: "01", label: "PROFILE", href: "/profile" },
  { number: "02", label: "PROJECTS", href: "/projects" },
  { number: "03", label: "SKILLS", href: "/skills" },
  { number: "04", label: "EXPERIENCE", href: "/experience" },
  { number: "05", label: "ABOUT", href: "/about" },
  { number: "06", label: "CONTACT", href: "/contact" },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside
      className="shell-sidebar hidden lg:flex flex-col w-64 xl:w-72 h-[calc(100vh-41px)] sticky top-[41px] bg-[#0A0A0A] border-r border-[#30302D] p-6 select-none shrink-0"
      aria-label="Main Navigation"
    >
      <div className="space-y-8">
        {/* Brand Block */}
        <div>
          <Link
            href="/"
            className="group block focus-visible:outline-2 focus-visible:outline-[#F26A21]"
          >
            <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-[#89857D] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 bg-[#F26A21]" />
              <span>DEVELOPER INTERFACE</span>
            </div>
            <h1 className="text-xl xl:text-2xl font-black tracking-tight uppercase text-[#E5E2DA] group-hover:text-[#F26A21] transition-colors leading-none">
              {profileData.name.first}
              <br />
              <span className="text-[#89857D] group-hover:text-[#E5E2DA] transition-colors">
                {profileData.name.last}
              </span>
            </h1>
            <p className="font-mono text-[10px] text-[#89857D] uppercase tracking-wider mt-2 border-l border-[#30302D] pl-2">
              CS STUDENT // FULL-STACK
            </p>
          </Link>
        </div>

        {/* Section Heading */}
        <div>
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#30302D]">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#89857D]">
              MAIN MENU
            </span>
            <span className="font-mono text-[10px] text-[#504E4A]">[ NAV ]</span>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1" role="navigation">
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
                    "group relative flex items-center gap-3 py-2.5 px-3 font-mono text-xs uppercase tracking-wider transition-all duration-200",
                    isActive
                      ? "text-[#E5E2DA] bg-[#151515] font-semibold border border-[#30302D]"
                      : "text-[#89857D] hover:text-[#E5E2DA] hover:bg-[#151515]/60 border border-transparent"
                  )}
                >
                  {/* Active Orange Vertical Indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#F26A21]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                  {!isActive && (
                    <span
                      className="absolute inset-y-2 left-0 w-px origin-center scale-y-0 bg-[#F26A21] transition-transform duration-200 group-hover:scale-y-100"
                      aria-hidden="true"
                    />
                  )}

                  {/* Section Number */}
                  <span
                    className={cn(
                      "transition-colors",
                      isActive
                        ? "text-[#F26A21]"
                        : "text-[#504E4A] group-hover:text-[#F26A21]"
                    )}
                  >
                    {item.number}
                  </span>

                  {/* Section Label */}
                  <span
                    className={cn(
                      "transition-transform duration-200",
                      isActive
                        ? "translate-x-0.5 text-[#E5E2DA]"
                        : "group-hover:translate-x-0.5 text-[#89857D] group-hover:text-[#E5E2DA]"
                    )}
                  >
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      "absolute bottom-1.5 left-11 h-px bg-[#F26A21]/70 transition-all duration-300",
                      isActive ? "w-8" : "w-0 group-hover:w-6"
                    )}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Divider & External Socials */}
        <div className="pt-2">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#30302D]">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#89857D]">
              EXTERNAL CHANNELS
            </span>
            <span className="font-mono text-[10px] text-[#504E4A]">[ EXT ]</span>
          </div>

          <div className="space-y-1 font-mono text-xs">
            {profileData.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-2 px-3 text-[#89857D] hover:text-[#E5E2DA] hover:bg-[#151515] border border-transparent hover:border-[#30302D] transition-colors uppercase tracking-wider"
              >
                <span>{social.label}</span>
                <ExternalLink className="w-3 h-3 text-[#504E4A] group-hover:text-[#F26A21] transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>

    </aside>
  );
}

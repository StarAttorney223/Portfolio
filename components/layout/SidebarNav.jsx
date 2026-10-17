"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { profileData } from "@/data/profile";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

import { navigation as navItems } from "@/data/navigation";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside
      className="shell-sidebar hidden lg:flex flex-col w-64 xl:w-72 h-[calc(100dvh-41px)] overflow-y-auto sticky top-[41px] bg-[#151515] border-r border-[#30302D] p-6 select-none shrink-0 z-20"
      aria-label="Main Navigation"
    >
      <div className="space-y-8">
        {/* Brand Block */}
        <div>
          <Link
            href="/"
            className="group block focus-visible:outline-2 focus-visible:outline-[#FF852E]"
          >
            <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-[#B8B5AE] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 bg-[#FF852E]" />
              <span>DEVELOPER INTERFACE</span>
            </div>
            <h1 className="text-xl xl:text-2xl font-black tracking-tight uppercase text-[#F5F3EE] group-hover:text-[#FF852E] transition-colors leading-none">
              {profileData.name.first}
              <br />
              <span className="text-[#B8B5AE] group-hover:text-[#F5F3EE] transition-colors">
                {profileData.name.last}
              </span>
            </h1>
            <p className="font-mono text-[10px] text-[#B8B5AE] uppercase tracking-wider mt-2 border-l border-[#484844] pl-2">
              CS STUDENT // FULL-STACK
            </p>
          </Link>
        </div>

        {/* Section Heading */}
        <div>
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#484844]">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#B8B5AE]">
              MAIN MENU
            </span>
            <span className="font-mono text-[10px] text-[#96928B]">[ NAV ]</span>
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
                  scroll={false}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group relative flex items-center gap-3 py-2.5 px-3 font-mono text-xs uppercase tracking-wider transition-all duration-200",
                    isActive
                      ? "text-[#F5F3EE] bg-[#242424] font-semibold border border-[#484844]"
                      : "text-[#B8B5AE] hover:text-[#F5F3EE] hover:bg-[#242424]/60 border border-transparent"
                  )}
                >
                  {/* Active Orange Vertical Indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#FF852E]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                  {!isActive && (
                    <span
                      className="absolute inset-y-2 left-0 w-px origin-center scale-y-0 bg-[#FF852E] transition-transform duration-200 group-hover:scale-y-100"
                      aria-hidden="true"
                    />
                  )}

                  {/* Section Number */}
                  <span
                    className={cn(
                      "transition-colors",
                      isActive
                        ? "text-[#FF852E]"
                        : "text-[#96928B] group-hover:text-[#FF852E]"
                    )}
                  >
                    {item.number}
                  </span>

                  {/* Section Label */}
                  <span
                    className={cn(
                      "transition-transform duration-200",
                      isActive
                        ? "translate-x-0.5 text-[#F5F3EE]"
                        : "group-hover:translate-x-0.5 text-[#B8B5AE] group-hover:text-[#F5F3EE]"
                    )}
                  >
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      "absolute bottom-1.5 left-11 h-px bg-[#FF852E]/70 transition-all duration-300",
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
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#484844]">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#B8B5AE]">
              EXTERNAL CHANNELS
            </span>
            <span className="font-mono text-[10px] text-[#96928B]">[ EXT ]</span>
          </div>

          <div className="space-y-1 font-mono text-xs">
            {profileData.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-2 px-3 text-[#B8B5AE] hover:text-[#F5F3EE] hover:bg-[#242424] border border-transparent hover:border-[#484844] transition-colors uppercase tracking-wider"
              >
                <span>{social.label}</span>
                <ExternalLink className="w-3 h-3 text-[#96928B] group-hover:text-[#FF852E] transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>

    </aside>
  );
}

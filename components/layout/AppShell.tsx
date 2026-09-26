import React from "react";
import { HeaderStatus } from "./HeaderStatus";
import { SidebarNav } from "./SidebarNav";
import { MobileNav } from "./MobileNav";
import { Footer } from "./Footer";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E5E2DA] flex flex-col selection:bg-[#F26A21] selection:text-black">
      {/* Skip to Main Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#F26A21] focus:text-black focus:font-mono focus:text-xs font-bold"
      >
        Skip to main content
      </a>

      {/* Top System Status Bar */}
      <HeaderStatus />

      {/* Mobile Top Navigation */}
      <MobileNav />

      {/* Main Layout Container */}
      <div className="flex-1 flex w-full max-w-[1700px] mx-auto">
        {/* Desktop Persistent Left Navigation */}
        <SidebarNav />

        {/* Page Content Viewport */}
        <div className="flex-1 flex flex-col min-w-0">
          <main
            id="main-content"
            className="flex-1 px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12"
          >
            {children}
          </main>

          {/* Understated Minimal Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

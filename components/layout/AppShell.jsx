"use client";

import { usePathname } from "next/navigation";
import { ObservatoryExperience } from "@/components/world/observatory/ObservatoryExperience";

export function AppShell({ children }) {
  const pathname = usePathname();
  const known = /^\/(?:profile|projects(?:\/(?:ether|unravel|physiogenie|pixelchat))?|skills|experience|about|contact)?\/?$/.test(pathname);
  return known ? <ObservatoryExperience /> : children;
}

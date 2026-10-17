"use client";

import { MotionConfig } from "framer-motion";

export function SystemInterface({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="page-motion relative flex min-h-full flex-1 flex-col">
        {children}
      </div>
    </MotionConfig>
  );
}

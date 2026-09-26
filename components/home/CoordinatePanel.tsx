"use client";

import React, { useState } from "react";
import { CornerBrackets } from "@/components/ui/GeometricDecorations";

export function CoordinatePanel() {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100,
    });
  };

  const normalizedX = (position.x - 50) / 50;
  const normalizedY = (position.y - 50) / 50;

  return (
    <div
      onPointerMove={handleMove}
      onPointerLeave={() => setPosition({ x: 50, y: 50 })}
      className="relative overflow-hidden bg-[#151515] border border-[#30302D] p-5 sm:p-6 min-h-[220px] group"
      aria-label="Interactive system coordinate panel"
    >
      <CornerBrackets accentCorner="all" />

      <div className="absolute inset-0 bg-grid-subtle opacity-20 animate-grid-drift" />
      <div
        className="absolute inset-8 border border-[#30302D]/80 transition-transform duration-300 ease-out-expo"
        style={{
          transform: `translate3d(${normalizedX * 5}px, ${normalizedY * 5}px, 0)`,
        }}
      />
      <div className="absolute left-0 right-0 top-1/2 h-px overflow-hidden bg-[#30302D]/70">
        <span className="block h-px w-1/2 bg-[#F26A21]/60 animate-line-scan" />
      </div>
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-[#30302D]/70" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={`M 18 72 L ${position.x} ${position.y} L 82 28`}
          fill="none"
          stroke="#F26A21"
          strokeOpacity="0.58"
          strokeWidth="0.35"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={`M 26 24 L ${100 - position.x} ${position.y} L 74 78`}
          fill="none"
          stroke="#89857D"
          strokeOpacity="0.28"
          strokeWidth="0.25"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {[
        { x: 18, y: 72 },
        { x: 82, y: 28 },
        { x: 26, y: 24 },
        { x: 74, y: 78 },
      ].map((node) => (
        <span
          key={`${node.x}-${node.y}`}
          className="absolute h-2 w-2 border border-[#F26A21] bg-[#080808]"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          aria-hidden="true"
        />
      ))}

      <span
        className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 border border-[#FF7A2F] bg-[#F26A21]"
        style={{ left: `${position.x}%`, top: `${position.y}%` }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full min-h-[172px] flex-col justify-between">
        <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest">
          <span className="text-[#89857D]">SYSTEM // ONLINE</span>
          <span className="flex items-center gap-2 text-[#F26A21]">
            <span className="h-1.5 w-1.5 bg-[#F26A21] animate-system-pulse" />
            LIVE INPUT
          </span>
        </div>

        <div className="max-w-xs space-y-3 self-end text-right">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#89857D]">
            COORDINATE PANEL
          </p>
          <p className="text-sm leading-relaxed text-[#E5E2DA]">
            A quiet interface layer that reacts to cursor position, movement, and focus without distracting from the portfolio content.
          </p>
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#504E4A]">
            X {Math.round(position.x).toString().padStart(2, "0")} // Y{" "}
            {Math.round(position.y).toString().padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
}

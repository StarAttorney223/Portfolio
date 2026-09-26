"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

function SystemBoot() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const visited = sessionStorage.getItem("divyansh-interface-ready");
    if (visited || reduceMotion) {
      setVisible(false);
      return;
    }

    const timer = window.setTimeout(() => {
      sessionStorage.setItem("divyansh-interface-ready", "true");
      setVisible(false);
    }, 1650);

    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080808]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          aria-live="polite"
          aria-label="Initializing portfolio interface"
        >
          <div className="w-[min(82vw,360px)] font-mono uppercase tracking-widest">
            <motion.p
              className="text-sm font-bold text-[#E5E2DA]"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              &gt; DIVYANSH.EXE
            </motion.p>
            <motion.p
              className="mt-3 text-[10px] text-[#89857D]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28 }}
            >
              INITIALIZING INTERFACE...
            </motion.p>
            <div className="mt-4 h-px overflow-hidden bg-[#30302D]">
              <motion.div
                className="h-full bg-[#F26A21]"
                initial={{ scaleX: 0, transformOrigin: "left" }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.18, duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <motion.p
              className="mt-3 text-right text-[10px] text-[#F26A21]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.15 }}
            >
              SYSTEM ONLINE
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AmbientInterface() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const gridX = useSpring(x, { stiffness: 35, damping: 25 });
  const gridY = useSpring(y, { stiffness: 35, damping: 25 });
  const markerX = useSpring(x, { stiffness: 55, damping: 28 });
  const markerY = useSpring(y, { stiffness: 55, damping: 28 });

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;
    let frame;
    const handleMove = (event) => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        x.set(((event.clientX / window.innerWidth) - 0.5) * 2);
        y.set(((event.clientY / window.innerHeight) - 0.5) * 2);
      });
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handleMove);
    };
  }, [reduceMotion, x, y]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden lg:block" aria-hidden="true">
      <motion.div
        className="absolute inset-[-34px] bg-grid-subtle opacity-[0.07]"
        style={{ x: gridX, y: gridY }}
      />
      <motion.div
        className="absolute right-[8%] top-[18%] h-16 w-16 border-r border-t border-[#F26A21]/20"
        style={{ x: markerX, y: markerY }}
      />
      <div className="ambient-scanline absolute inset-x-0 top-0 h-px bg-[#F26A21]/20" />
    </div>
  );
}

function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(-50);
  const y = useMotionValue(-50);
  const springX = useSpring(x, { stiffness: 650, damping: 45, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 650, damping: 45, mass: 0.25 });
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer || reduceMotion) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const handleMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const interactive = event.target.closest(
        "a, button, [role='button'], input, textarea, select"
      );
      setActive(Boolean(interactive));
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", handleMove);
    };
  }, [reduceMotion, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[110]"
      style={{ x: springX, y: springY }}
      aria-hidden="true"
    >
      <motion.span
        className="absolute left-0 top-0 block -translate-x-1/2 -translate-y-1/2 border border-[#F26A21]"
        animate={{ width: active ? 34 : 8, height: active ? 34 : 8, opacity: active ? 0.75 : 1 }}
        transition={{ duration: 0.16 }}
      />
      <AnimatePresence>
        {active && (
          <motion.span
            className="absolute left-5 top-3 whitespace-nowrap font-mono text-[8px] uppercase tracking-widest text-[#F26A21]"
            initial={{ opacity: 0, x: -3 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            SELECT &gt;
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ScrollRevealController({ route }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => {
      const elements = document.querySelectorAll(".page-motion [data-reveal]");

      elements.forEach((element, index) => {
        element.classList.add("reveal-on-scroll");
        element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 55}ms`);
      });

      if (reduceMotion || !("IntersectionObserver" in window)) {
        elements.forEach((element) => element.classList.add("is-visible"));
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -40px" }
      );
      elements.forEach((element) => observer.observe(element));
      return () => observer.disconnect();
    }, 20);

    return () => window.clearTimeout(timer);
  }, [route]);

  return null;
}

export function SystemInterface({ children }) {
  const pathname = usePathname();

  return (
    <MotionConfig reducedMotion="user">
      <SystemBoot />
      <AmbientInterface />
      <CustomCursor />
      <ScrollRevealController route={pathname} />
      <div className="page-motion relative z-10 flex min-h-full flex-1 flex-col">
        {children}
      </div>
    </MotionConfig>
  );
}

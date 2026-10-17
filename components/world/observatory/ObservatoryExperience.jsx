"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Component, useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Box, Gauge, List, Menu, Pause, Play, X } from "lucide-react";
import { profileData } from "@/data/profile";
import { PortfolioContent } from "./PortfolioContent";
import { indexForRoute, journey, mainDestinations } from "./journey";
import styles from "./observatory.module.css";

const Scene = dynamic(() => import("./ObservatoryScene"), { ssr: false });

class Boundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function ObservatoryExperience() {
  const pathname = usePathname();
  const [index, setIndex] = useState(() => indexForRoute(pathname));
  const progress = useRef(index);
  const route = useRef(null);
  const animation = useRef(0);
  const navigating = useRef(false);
  const focusDestination = useRef(null);
  const rail = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [paused, setPaused] = useState(true);
  const [reduced, setReduced] = useState(true);
  const [compact, setCompact] = useState(false);
  const [economy, setEconomy] = useState(false);
  const [standard, setStandard] = useState(false);
  const [visible, setVisible] = useState(true);
  const [menu, setMenu] = useState(false);
  const [skillId, setSkillId] = useState("frontend");
  const [inspected, setInspected] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => setFailed(true), []);
  const onSlow = useCallback(() => setEconomy(true), []);
  const entry = journey[index];
  const using3D = !failed && !standard;

  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const size = matchMedia("(max-width: 767px)");
    const updateMotion = () => { setReduced(motion.matches); setPaused(motion.matches); };
    const updateSize = () => setCompact(size.matches);
    const updateVisibility = () => setVisible(!document.hidden);
    updateMotion(); updateSize();
    motion.addEventListener("change", updateMotion);
    size.addEventListener("change", updateSize);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      motion.removeEventListener("change", updateMotion);
      size.removeEventListener("change", updateSize);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const value = Math.max(0, Math.min(journey.length - 1, scrollY / (innerHeight * 1.2)));
      progress.current = value;
      const next = Math.round(value);
      setIndex((previous) => previous === next ? previous : next);
      const path = journey[next].route;
      if (!navigating.current && route.current !== path) {
        route.current = path;
        window.history.replaceState(null, "", path);
      }
      window.dispatchEvent(new Event("observatory-camera-update"));
    };
    const cancel = () => { cancelAnimationFrame(animation.current); navigating.current = false; };
    const onResize = () => window.scrollTo({ top: progress.current * innerHeight * 1.2, behavior: "instant" });
    const onKey = (event) => { if (event.key === "Escape") setMenu(false); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      cancel();
    };
  }, []);

  useEffect(() => {
    if (pathname === route.current) return;
    const next = indexForRoute(pathname);
    route.current = pathname;
    progress.current = next;
    setIndex(next);
    cancelAnimationFrame(animation.current);
    navigating.current = false;
    const frame = requestAnimationFrame(() => window.scrollTo({ top: next * innerHeight * 1.2, behavior: "instant" }));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    setInspected(false);
    rail.current?.scrollTo({ top: 0, behavior: "instant" });
    if (focusDestination.current === index) {
      rail.current?.focus({ preventScroll: true });
      focusDestination.current = null;
    }
    document.title = entry.kind === "home" ? "Divyansh Chandrakar | Developer" : `${entry.label} | Divyansh Chandrakar`;
  }, [index]);

  const go = useCallback((next) => {
    const destination = Math.max(0, Math.min(journey.length - 1, next));
    focusDestination.current = destination;
    setMenu(false);
    cancelAnimationFrame(animation.current);
    const path = journey[destination].route;
    route.current = path;
    if (location.pathname !== path) window.history.pushState(null, "", path);
    const from = window.scrollY;
    const to = destination * innerHeight * 1.2;
    if (reduced && paused) {
      navigating.current = false;
      window.scrollTo({ top: to, behavior: "instant" });
      return;
    }
    const start = performance.now();
    navigating.current = true;
    const duration = Math.min(2400, Math.max(900, Math.abs(to - from) / innerHeight * 230));
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const ease = t * t * (3 - 2 * t);
      window.scrollTo({ top: from + (to - from) * ease, behavior: "instant" });
      if (t < 1) animation.current = requestAnimationFrame(tick);
      else navigating.current = false;
    };
    animation.current = requestAnimationFrame(tick);
  }, [reduced, paused]);

  const contact = useCallback((label) => {
    const social = profileData.socials.find((item) => item.label === label);
    if (!social) return;
    if (social.external) window.open(social.url, "_blank", "noopener,noreferrer");
    else window.location.href = social.url;
  }, []);

  return <main className={styles.experience} style={{ height: `${(journey.length - 1) * 120 + 100}svh` }} aria-label="Divyansh Chandrakar, immersive developer portfolio">
    <div className={styles.viewport} data-view={using3D ? "3d" : "standard"}>
      {using3D && <div className={styles.canvas} aria-hidden="true"><Boundary onFailure={onFailure}>
        <Scene active={!paused && visible} reduced={reduced && paused} compact={compact} economy={economy} progress={progress} currentIndex={index}
          selection={skillId} onSkill={setSkillId} onInspect={() => setInspected(true)} onContact={contact}
          onReady={onReady} onFailure={onFailure} onSlow={onSlow} />
      </Boundary></div>}
      <header className={styles.header}>
        <a className={styles.identity} href="/" onClick={(e) => { e.preventDefault(); go(0); }} aria-label="Divyansh Chandrakar, return home"><span className={styles.mark}>DC</span><span>DIVYANSH CHANDRAKAR<small>DEVELOPER / THE OBSERVATORY</small></span></a>
        <button className={styles.menuButton} aria-label={menu ? "Close navigation" : "Open navigation"} aria-expanded={menu} aria-controls="world-navigation" onClick={() => setMenu(!menu)}>{menu ? <X size={20} /> : <Menu size={20} />}</button>
        <nav id="world-navigation" className={`${styles.navigation} ${menu ? styles.navigationOpen : ""}`} aria-label="Portfolio sections">
          {mainDestinations.map((item, i) => <a key={item.id} href={item.route} aria-current={(item.id === entry.id || item.id === "ether" && entry.project) ? "page" : undefined} onClick={(e) => { e.preventDefault(); go(item.index); }}><span>{String(i + 1).padStart(2, "0")}</span>{item.id === "ether" ? "Projects" : item.label}</a>)}
        </nav>
      </header>
      <section ref={rail} className={`${styles.contentRail} ${entry.kind === "home" ? styles.homeRail : ""}`} aria-label={entry.project ? `${entry.project.title} project` : `${entry.label} section`} tabIndex={0}>
        <PortfolioContent entry={entry} go={go} skillId={skillId} setSkillId={setSkillId} inspected={inspected} setInspected={setInspected} />
      </section>
      <div className={styles.location} aria-hidden="true"><span>{entry.zone.toUpperCase()}</span><span>{entry.number} / {String(journey.length).padStart(2, "0")}</span></div>
      {using3D && !ready && <div className={styles.loading} role="status"><span className={styles.loaderLine} />Assembling the Observatory</div>}
      {failed && <p className={styles.fallbackNotice} role="status">Standard view / 3D unavailable</p>}
      <footer className={styles.footer}>
        <div className={styles.journeyControls}>
          <button aria-label="Previous destination" title="Previous destination" disabled={index === 0} onClick={() => go(index - 1)}><ArrowUp size={16} /></button>
          <button aria-label="Next destination" title="Next destination" disabled={index === journey.length - 1} onClick={() => go(index + 1)}><ArrowDown size={16} /></button>
          <span>{entry.zone.toUpperCase()}</span>
        </div>
        <div className={styles.controls} aria-label="Environment controls">
          <button onClick={() => setStandard(!standard)} title={standard ? "3D view" : "Standard view"} aria-label={standard ? "Enable 3D view" : "Switch to standard view"}>{standard ? <Box size={18} /> : <List size={18} />}</button>
          <button disabled={!using3D} onClick={() => setPaused(!paused)} title={paused ? "Enable animation" : "Pause animation"} aria-label={paused ? "Enable animation" : "Pause animation"} aria-pressed={!paused}>{paused ? <Play size={18} /> : <Pause size={18} />}</button>
          <button disabled={!using3D} onClick={() => setEconomy(!economy)} title={economy ? "Restore full detail" : "Reduce rendering quality"} aria-label={economy ? "Restore full detail" : "Reduce rendering quality"} aria-pressed={economy}><Gauge size={18} /></button>
        </div>
      </footer>
      <div className={styles.progress}><div style={{ height: `${index / (journey.length - 1) * 100}%` }} /></div>
    </div>
  </main>;
}

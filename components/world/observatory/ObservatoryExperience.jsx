"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Component, useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Box, Gauge, List, Menu, Minus, Plus, RotateCcw, Pause, Play, X } from "lucide-react";
import { profileData } from "@/data/profile";
import { SectionPresentation } from "./SectionPresentation";
import { cameraStop, indexForRoute, journey, mainDestinations } from "./journey";
import styles from "./observatory.module.css";
import { clampZoom, zoomLimits } from "./viewControls";
import { createTravel } from "./travel";

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
  const motion = useRef(null);
  const cameraState = useRef(null);
  const [travelling, setTravelling] = useState(false);
  const [mountedStops, setMountedStops] = useState([index]);
  const focusDestination = useRef(null);
  const rail = useRef(null);
  const canvasRegion = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [paused, setPaused] = useState(false);
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
  const bounds = zoomLimits(entry.id);
  const onArrival = useCallback(() => { setTravelling(false); setMountedStops([Math.round(progress.current)]); }, []);

  useEffect(() => {
    const info = rail.current?.querySelector("details[data-scene-info]");
    if (!using3D) info?.setAttribute("open", "");
    else info?.removeAttribute("open");
  }, [using3D, index]);

  useEffect(() => {
    const region = canvasRegion.current;
    if (!region) return;
    const wheel = (event) => {
      if (event.ctrlKey) return;
      event.preventDefault();
      if (motion.current) return;
      setZoom((value) => clampZoom(value + Math.max(-.18, Math.min(.18, event.deltaY * .0015)), bounds));
    };
    region.addEventListener("wheel", wheel, { passive: false });
    return () => region.removeEventListener("wheel", wheel);
  }, [using3D, entry.id]);

  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const size = matchMedia("(max-width: 767px)");
    const updateMotion = () => setReduced(motion.matches);
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
    const onKey = (event) => { if (event.key === "Escape") setMenu(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setInspected(false);
    setZoom(1);
    rail.current?.scrollTo({ top: 0, behavior: "instant" });
    if (focusDestination.current === index) {
      rail.current?.focus({ preventScroll: true });
      focusDestination.current = null;
    }
    document.title = entry.kind === "home" ? "Divyansh Chandrakar | Developer" : `${entry.label} | Divyansh Chandrakar`;
  }, [index]);

  const go = useCallback((next, history = true) => {
    const destination = Math.max(0, Math.min(journey.length - 1, next));
    focusDestination.current = destination;
    setMenu(false);
    const path = journey[destination].route;
    route.current = path;
    if (history && location.pathname !== path) window.history.pushState(null, "", path);
    const fromIndex = Math.round(progress.current);
    const end = cameraStop(destination, compact);
    const start = cameraState.current || cameraStop(fromIndex, compact);
    // Retarget from the actual rendered camera, never a stale route's preset.
    if (using3D && ready && (destination !== fromIndex || motion.current)) {
      motion.current = { ...createTravel(start, end, compact ? 1350 : reduced ? 1600 : 1850), startedAt: null };
      setMountedStops((previous) => [...new Set([previous[0], fromIndex, destination])]);
      setTravelling(true);
    } else {
      motion.current = null;
      setMountedStops([destination]);
      setTravelling(false);
    }
    progress.current = destination;
    setZoom(1);
    setIndex(destination);
    window.dispatchEvent(new Event("observatory-camera-update"));
  }, [compact, reduced, ready, using3D]);

  useEffect(() => {
    if (pathname === route.current) return;
    if (route.current === null) { route.current = pathname; return; }
    go(indexForRoute(pathname), false);
  }, [pathname, go]);

  const contact = useCallback((label) => {
    const social = profileData.socials.find((item) => item.label === label);
    if (!social) return;
    if (social.external) window.open(social.url, "_blank", "noopener,noreferrer");
    else window.location.href = social.url;
  }, []);

  return <main className={styles.experience} style={{ height: "100svh" }} aria-label="Divyansh Chandrakar, immersive developer portfolio">
    <div className={styles.viewport} data-view={using3D ? "3d" : "standard"} data-section={entry.kind} data-transition={travelling ? "travelling" : "idle"} data-destination={entry.id}>
      {using3D && <div ref={canvasRegion} className={styles.canvas} aria-hidden="true"><Boundary onFailure={onFailure}>
        <Scene active={!paused && visible} reduced={reduced && paused} compact={compact} economy={economy} progress={progress} currentIndex={index}
          selection={skillId} onSkill={setSkillId} onInspect={() => setInspected(true)} onContact={contact}
          zoom={zoom} motion={motion} cameraState={cameraState} mountedStops={mountedStops} onArrival={onArrival} onReady={onReady} onFailure={onFailure} onSlow={onSlow} />
      </Boundary></div>}
      <header className={styles.header}>
        <a className={styles.identity} href="/" onClick={(e) => { e.preventDefault(); go(0); }} aria-label="Divyansh Chandrakar, return home"><span className={styles.mark}>DC</span><span>DIVYANSH CHANDRAKAR<small>DEVELOPER / THE OBSERVATORY</small></span></a>
        <button className={styles.menuButton} aria-label={menu ? "Close navigation" : "Open navigation"} aria-expanded={menu} aria-controls="world-navigation" onClick={() => setMenu(!menu)}>{menu ? <X size={20} /> : <Menu size={20} />}</button>
        <nav id="world-navigation" className={`${styles.navigation} ${menu ? styles.navigationOpen : ""}`} aria-label="Portfolio sections">
          {mainDestinations.map((item, i) => <a key={item.id} href={item.route} aria-current={(item.id === entry.id || item.id === "ether" && entry.project) ? "page" : undefined} onClick={(e) => { e.preventDefault(); go(item.index); }}><span>{String(i + 1).padStart(2, "0")}</span>{item.id === "ether" ? "Projects" : item.label}</a>)}
        </nav>
      </header>
      <section ref={rail} className={`${styles.contentRail} ${entry.kind === "home" ? styles.homeRail : ""}`} aria-label={entry.project ? `${entry.project.title} project` : `${entry.label} section`} tabIndex={0}>
        <SectionPresentation entry={entry} go={go} skillId={skillId} setSkillId={setSkillId} inspected={inspected} setInspected={setInspected} />
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
          <button disabled={!using3D || travelling || zoom <= bounds.min} onClick={() => setZoom((value) => clampZoom(value - bounds.step, bounds))} title="Zoom in" aria-label="Zoom in"><Plus size={18} /></button>
          <button disabled={!using3D || travelling || zoom >= bounds.max} onClick={() => setZoom((value) => clampZoom(value + bounds.step, bounds))} title="Zoom out" aria-label="Zoom out"><Minus size={18} /></button>
          <button disabled={!using3D} onClick={() => { setZoom(1); go(index); window.dispatchEvent(new Event("observatory-camera-update")); }} title="Reset view" aria-label="Reset view"><RotateCcw size={17} /></button>
          <button onClick={() => setStandard(!standard)} title={standard ? "3D view" : "Standard view"} aria-label={standard ? "Enable 3D view" : "Switch to standard view"}>{standard ? <Box size={18} /> : <List size={18} />}</button>
          <button disabled={!using3D} onClick={() => setPaused(!paused)} title={paused ? "Enable animation" : "Pause animation"} aria-label={paused ? "Enable animation" : "Pause animation"} aria-pressed={!paused}>{paused ? <Play size={18} /> : <Pause size={18} />}</button>
          <button disabled={!using3D} onClick={() => setEconomy(!economy)} title={economy ? "Restore full detail" : "Reduce rendering quality"} aria-label={economy ? "Restore full detail" : "Reduce rendering quality"} aria-pressed={economy}><Gauge size={18} /></button>
        </div>
      </footer>
      <div className={styles.progress}><div style={{ height: `${index / (journey.length - 1) * 100}%` }} /></div>
    </div>
  </main>;
}

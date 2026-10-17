"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Component, useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Box, List, Pause, Play, RotateCcw, ExternalLink } from "lucide-react";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { skillsCategories } from "@/data/skills";

const WorldScene = dynamic(() => import("./WorldScene"), {
  ssr: false,
  loading: () => <div className="world-loading" role="status">ENVIRONMENT // LOADING</div>,
});

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

function SkillInspector({ selection }) {
  const category = skillsCategories.find((item) => item.id === selection?.categoryId);
  if (!category) return null;
  const skill = category.skills.find((item) => item.name === selection.skillName) || category.skills[0];
  const projects = projectsData.filter((project) => project.techStack.some((technology) => technology.toLowerCase() === skill.name.toLowerCase()));
  return (
    <div className="world-inspector" aria-live="polite">
      <div><p className="world-eyebrow">{category.title} // SELECTED TECHNOLOGY</p><h3>{skill.name}</h3><p>{skill.focusArea}</p></div>
      <div><p className="world-eyebrow">USED IN</p><div className="world-related">{projects.length ? projects.map((project) => <Link key={project.id} href={`/projects/${project.id}`}>{project.title}<ArrowRight size={14} /></Link>) : <p>No project association listed.</p>}</div></div>
    </div>
  );
}

function ProjectInspector({ project }) {
  return (
    <motion.div key={project.id} className="world-inspector project-inspector" aria-live="polite"
      initial={{ opacity: 0.7 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}>
      <div><p className="world-eyebrow">ARCHIVE {project.number} // {project.category}</p><h3>{project.title}</h3><p>{project.shortDescription}</p><div className="world-tags">{project.techStack.map((tech) => <span key={tech}>{tech}</span>)}</div></div>
      <div className="world-project-actions"><Link className="world-primary" href={`/projects/${project.id}`}>OPEN CASE STUDY <ArrowRight size={16} /></Link>
        {project.links.github && <a href={project.links.github} target="_blank" rel="noopener noreferrer">GITHUB <ExternalLink size={14} /></a>}
        {project.links.demo && <a href={project.links.demo} target="_blank" rel="noopener noreferrer">LIVE DEMO <ExternalLink size={14} /></a>}
      </div>
    </motion.div>
  );
}

export function WorldExperience() {
  const pathname = usePathname();
  const router = useRouter();
  const mode = pathname === "/" ? "home" : pathname.split("/")[1];
  const detailed = pathname.split("/").filter(Boolean).length > 1;
  const reduced = useReducedMotion();
  const root = useRef(null);
  const [supported, setSupported] = useState(null);
  const [compact, setCompact] = useState(false);
  const [visible, setVisible] = useState(true);
  const [enabled, setEnabled] = useState(true);
  const [paused, setPaused] = useState(false);
  const [slow, setSlow] = useState(false);
  const [hovered, setHovered] = useState("");
  const [selection, setSelection] = useState({ projectId: projectsData[0].id, categoryId: skillsCategories[0].id, skillName: skillsCategories[0].skills[0].name });
  const fail = useCallback(() => setSupported(false), []);
  const select = useCallback((next) => {
    setSelection((previous) => ({ ...previous, ...next }));
    if (detailed && next.projectId) router.push(`/projects/${next.projectId}`);
  }, [detailed, router]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener("change", update);
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true });
      setSupported(Boolean(gl));
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
      if (sessionStorage.getItem("portfolio-view") === "2d") setEnabled(false);
    } catch { setSupported(false); }
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let intersecting = true;
    const update = () => setVisible(intersecting && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { intersecting = entry.isIntersecting; update(); });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);

  useEffect(() => {
    setHovered("");
    // Next's route scroll targets the changing page below the persistent scene.
    const frame = requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  const changeView = () => {
    setEnabled((previous) => {
      try { sessionStorage.setItem("portfolio-view", previous ? "2d" : "3d"); } catch { /* Storage may be unavailable in private browsing. */ }
      return !previous;
    });
  };
  const renderScene = enabled && supported && !(compact && mode === "skills");
  const active = visible && !paused && !slow && !reduced;
  const project = projectsData.find((item) => item.id === selection.projectId) || projectsData[0];
  const category = skillsCategories.find((item) => item.id === selection.categoryId) || skillsCategories[0];
  const compactRoute = !["home", "projects", "skills"].includes(mode) || detailed;
  const sceneTitle = mode === "home" ? "THE WORKSHOP" : mode === "projects" ? "PROJECT ARCHIVE" : mode === "skills" ? "TECHNOLOGY NETWORK" : `${mode.toUpperCase()} TERMINAL`;

  return (
    <section ref={root} className={`world-experience ${mode === "home" ? "world-home" : ""} ${mode === "skills" ? "world-skills" : ""} ${compactRoute ? "world-compact" : ""}`} aria-label="Interactive developer environment">
      <div className="world-topline"><span><i />{sceneTitle}</span><span>DC // ENVIRONMENT 01</span></div>
      <div className={`world-stage ${hovered ? "is-selectable" : ""}`}>
        <div className="world-canvas" aria-hidden="true">
          {renderScene ? <SceneBoundary onFailure={fail}><WorldScene mode={mode} compact={compact} reduced={Boolean(reduced) || paused || slow} active={active}
            selection={selection} onSelect={select} onNavigate={(href) => router.push(href, { scroll: false })} onHover={setHovered} onFailure={fail} onSlow={() => setSlow(true)} /></SceneBoundary>
            : <div className="world-fallback"><div className="fallback-cross" /><span>{supported === false ? "STANDARD VIEW" : supported === null ? "ENVIRONMENT // LOADING" : "PORTFOLIO // DIRECT ACCESS"}</span></div>}
        </div>
        {mode === "home" && <div className="world-hero">
          <p className="world-eyebrow">INDEPENDENT THINKING. INTERACTIVE SYSTEMS.</p>
          <h1>{profileData.name.first}<br /><span>{profileData.name.last}</span></h1>
          <p className="world-role">{profileData.headline}<br />{profileData.subheadline}</p>
          <p className="world-bio">{profileData.shortBio}</p>
          <div className="world-hero-actions"><Link className="world-primary" href="/projects">VIEW PROJECTS <ArrowRight size={17} /></Link><Link className="world-secondary" href="/contact">CONTACT ME <ArrowRight size={17} /></Link></div>
        </div>}
        <div className="world-controls">
          <button type="button" onClick={changeView} aria-label={enabled ? "Switch to standard view" : "Enable 3D environment"} title={enabled ? "Standard view" : "3D environment"}>{enabled ? <List size={17} /> : <Box size={17} />}</button>
          {renderScene && <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Resume environment motion" : "Pause environment motion"} title={paused ? "Resume motion" : "Pause motion"} aria-pressed={paused}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>}
          {mode !== "home" && <Link href="/" aria-label="Return home" title="Return home"><RotateCcw size={16} /></Link>}
        </div>
        {!compactRoute && <div className="world-status"><span>{hovered || (renderScene ? "INTERACT // CLICK TO EXPLORE" : "EXPLORE THE SECTIONS BELOW")}</span><span>{renderScene ? (reduced || paused || slow ? "MOTION // STILL" : "SCENE // LIVE") : "VIEW // STANDARD"}</span></div>}
      </div>
      {mode === "home" && <>
        <nav className="world-destinations" aria-label="Environment destinations">{["profile", "projects", "skills", "contact"].map((item, i) => <Link key={item} href={`/${item}`}><span>0{i + 1}</span>{item.toUpperCase()}<ArrowRight size={16} /></Link>)}</nav>
        <div className="world-disciplines">{["WEB DEVELOPMENT", "AI / ML", "GAME DEVELOPMENT", "3D / INTERACTIVE EXPERIENCES"].map((item) => <span key={item}>{item}</span>)}</div>
      </>}
      {mode === "projects" && !detailed && <>
        <div className="world-selectors" aria-label="Select project">{projectsData.map((item) => <button type="button" key={item.id} aria-pressed={project.id === item.id} onClick={() => select({ projectId: item.id })}><span>{item.number}</span>{item.title}</button>)}</div>
        <ProjectInspector project={project} />
      </>}
      {mode === "skills" && <>
        <div className="world-selectors" aria-label="Select skill category">{skillsCategories.map((item) => <button type="button" key={item.id} aria-pressed={category.id === item.id} onClick={() => select({ categoryId: item.id, skillName: item.skills[0].name })}>{item.title}</button>)}</div>
        <div className="world-selectors world-technology" aria-label="Select technology">{category.skills.map((skill) => <button type="button" key={skill.name} aria-pressed={selection.skillName === skill.name} onClick={() => select({ skillName: skill.name })}>{skill.name}</button>)}</div>
        <SkillInspector selection={selection} />
      </>}
    </section>
  );
}

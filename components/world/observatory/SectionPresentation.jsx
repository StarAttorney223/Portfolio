"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, BookOpen, ChevronUp, X } from "lucide-react";
import { profileData } from "@/data/profile";
import { skillsCategories } from "@/data/skills";
import { experienceData } from "@/data/experience";
import { journey, worldProjects } from "./journey";
import { PortfolioContent } from "./PortfolioContent";
import styles from "./observatory.module.css";
import { ObjectChoices, ObjectInformation, useRoomObjects } from "./RoomObjects";

const experiences = experienceData.filter((item) => item.category !== "HACKATHONS" || !/\[Editable\]/i.test(item.subtitle));

export function SectionPresentation({ entry, go, skillId, setSkillId, inspected, setInspected }) {
  const dialog = useRef(null);
  const [interest, setInterest] = useState(0);
  const [experience, setExperience] = useState(0);
  const category = skillsCategories.find((item) => item.id === skillId) || skillsCategories[0];
  const currentExperience = experiences[experience];
  const email = profileData.socials.find((social) => social.label === "EMAIL");
  const project = entry.project;
  const objects = useRoomObjects();

  useEffect(() => {
    if (inspected && !dialog.current.open) dialog.current.showModal();
    if (!inspected && dialog.current.open) dialog.current.close();
    if (!inspected) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = previous; };
  }, [inspected]);

  const detailsButton = (label = "Read more") => <button className={styles.detailButton} onClick={() => setInspected(true)}>{label}<BookOpen size={16} /></button>;
  const heading = (title, subtitle) => <div className={styles.titleBlock}><p className={styles.eyebrow}>{entry.number} / {entry.zone}</p><h1>{title}</h1>{subtitle && <p className={styles.captionText}>{subtitle}</p>}</div>;

  return <>
    {objects.choices.length > 0 && objects.selected ? <ObjectInformation /> : entry.kind === "home" ? <>
      <p className={styles.eyebrow}>DIVYANSH CHANDRAKAR / THE OBSERVATORY</p>
      <h1 className={styles.heroName}>DIVYANSH<br /><span>CHANDRAKAR</span></h1>
      <p className={styles.role}>{profileData.headline}<br />{profileData.subheadline}</p>
      <p className={styles.lead}>{profileData.shortBio}</p>
      <div className={styles.actions}><button className={styles.primary} onClick={() => go(journey.findIndex((item) => item.id === "ether"))}>Explore my work<ArrowDown size={17} /></button><button onClick={() => go(journey.length - 1)}>Get in touch<ArrowUpRight size={17} /></button></div>
      <div className={styles.homeFields}>{profileData.areasOfInterest.map((item) => <span key={item.title}>{item.title}</span>)}</div>
    </> : <details className={styles.sceneInfo} data-scene-info>
      <summary><span><small>{entry.zone}</small>{project?.title || entry.label}</span><ChevronUp size={18} /></summary>
      <div className={styles.presentationGrid}>
        {heading(project?.title || (entry.kind === "experience" ? "EXPERIENCE & EDUCATION" : entry.label.toUpperCase()), project?.category)}
        <div className={styles.summaryBlock}>
          {project && <><p className={styles.lead}>{project.shortDescription}</p><div className={styles.tags}>{project.techStack.map((tech) => <span key={tech}>{tech}</span>)}</div></>}
          {entry.kind === "profile" && <><h2>{profileData.name.full}</h2><p className={styles.lead}>{profileData.introduction[0]}</p><p className={styles.captionText}>{profileData.currentFocus.primary}</p></>}
          {entry.kind === "skills" && <><h2>{category.subtitle}</h2><p className={styles.lead}>{category.description}</p><div className={styles.tags}>{category.skills.map((skill) => <span key={skill.name}>{skill.name}</span>)}</div></>}
          {entry.kind === "experience" && <><p className={styles.eyebrow}>{currentExperience.period}</p><h2>{currentExperience.title}</h2><p className={styles.lead}>{currentExperience.description}</p></>}
          {entry.kind === "about" && <><h2>{profileData.areasOfInterest[interest].title}</h2><p className={styles.lead}>{profileData.areasOfInterest[interest].description}</p><div className={styles.tags}>{profileData.areasOfInterest[interest].tags.map((tag) => <span key={tag}>{tag}</span>)}</div></>}
          {entry.kind === "contact" && <><h2>Have an interesting idea? Let&apos;s build it.</h2><p>Projects, collaboration, and development opportunities.</p><a className={styles.emailAddress} href={email.url}>{email.identifier}<ArrowUpRight size={20} /></a></>}
        </div>
        <div className={styles.presentationActions}>
          {project?.links.github && <a className={styles.primary} href={project.links.github} target="_blank" rel="noopener noreferrer">Repository<ArrowUpRight size={16} /></a>}
          {project?.links.demo && <a href={project.links.demo} target="_blank" rel="noopener noreferrer">Live demo<ArrowUpRight size={16} /></a>}
          {entry.kind === "contact" && profileData.socials.filter((social) => social.external && social.configured !== false).map((social) => <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer">{social.label}<ArrowUpRight size={16} /></a>)}
          {detailsButton(project ? "Project details" : entry.kind === "profile" ? "Background & education" : entry.kind === "skills" ? "Explore technologies" : entry.kind === "contact" ? "Contact options" : "Read more")}
          {objects.choices.length > 0 && <ObjectChoices />}
        </div>
      </div>
      {project && <nav className={styles.projectNav} aria-label="Project destinations">{worldProjects.map((item) => { const destination = journey.find((stop) => stop.id === item.id); return <a key={item.id} href={destination.route} aria-current={item.id === entry.id ? "page" : undefined} onClick={(e) => { e.preventDefault(); go(destination.index); }}>{item.title}</a>; })}</nav>}
      {entry.kind === "skills" && <div className={styles.selectionRow} aria-label="Skill domains">{skillsCategories.map((item) => <button key={item.id} aria-pressed={item.id === skillId} onClick={() => setSkillId(item.id)}>{item.title}</button>)}</div>}
      {entry.kind === "experience" && <div className={styles.selectionRow} aria-label="Experience entries">{experiences.map((item, i) => <button key={item.id} aria-pressed={experience === i} onClick={() => setExperience(i)}>{item.category === "EDUCATION" ? "Education" : item.id === "proj-unravel" ? "Unravel" : item.id === "proj-physiogenie" ? "PhysioGenie" : "Independent work"}</button>)}</div>}
      {entry.kind === "about" && <div className={styles.selectionRow} aria-label="Areas of interest">{profileData.areasOfInterest.map((item, i) => <button key={item.title} aria-pressed={interest === i} onClick={() => setInterest(i)}>{item.title}</button>)}</div>}
      {entry.kind === "profile" && <div className={styles.profileFacts}><span>{profileData.education.degree} / {profileData.education.field}</span><span>{profileData.education.period}</span></div>}
    </details>}
    <dialog ref={dialog} className={styles.detailsDialog} aria-label={project ? `${project.title} details` : `${entry.label} details`} onClose={() => setInspected(false)}>
      <div className={styles.dialogHeader}><span>{entry.zone}</span><button aria-label="Close details" title="Close details" onClick={() => setInspected(false)}><X size={20} /></button></div>
      <div className={styles.dialogBody}><PortfolioContent entry={entry} go={go} skillId={skillId} setSkillId={setSkillId} inspected={true} setInspected={() => {}} /></div>
    </dialog>
  </>;
}

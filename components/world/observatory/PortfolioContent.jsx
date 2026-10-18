"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { profileData } from "@/data/profile";
import { skillsCategories } from "@/data/skills";
import { experienceData } from "@/data/experience";
import { journey, worldProjects } from "./journey";
import styles from "./observatory.module.css";

const clean = (text = "") => text.replace(/\s*\[[^\]]*(?:Editable|University|Institution)[^\]]*\]/gi, "").trim();
const normalize = (text) => text.toLowerCase().replace("html5", "html").replace("css3", "css").replace("express.js", "express");

export function PortfolioContent({ entry, go, skillId, setSkillId, inspected, setInspected }) {
  const [skill, setSkill] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [draft, setDraft] = useState(false);
  const category = skillsCategories.find((item) => item.id === skillId) || skillsCategories[0];
  const selectedSkill = category.skills.find((item) => item.name === skill) || category.skills[0];
  useEffect(() => { setSkill(""); }, [skillId]);
  const related = worldProjects.filter((project) => project.techStack.some((technology) => normalize(technology) === normalize(selectedSkill.name)));
  const project = entry.project;
  const email = profileData.socials.find((social) => social.label === "EMAIL");

  async function copyEmail() {
    try { await navigator.clipboard.writeText(email.identifier); setCopied(true); setCopyError(false); }
    catch { setCopyError(true); }
  }

  return <>
    <p className={styles.eyebrow}>{entry.number} / {entry.zone.toUpperCase()}</p>
    {entry.kind === "home" ? <>
      <h1 className={styles.heroName}>DIVYANSH<br /><span>CHANDRAKAR</span></h1>
      <p className={styles.role}>{profileData.headline}<br />{profileData.subheadline}</p>
      <p className={styles.lead}>{profileData.shortBio}</p>
      <div className={styles.actions}><button className={styles.primary} onClick={() => go(journey.findIndex((item) => item.id === "ether"))}>Explore my work <ArrowDown size={17} /></button><button onClick={() => go(journey.length - 1)}>Get in touch <ArrowUpRight size={17} /></button></div>
      <div className={styles.homeFields}>{profileData.areasOfInterest.map((interest) => <span key={interest.title}>{interest.title}</span>)}</div>
    </> : <h1 className={styles.sectionTitle}>{project ? project.title : entry.label === "Experience" ? "EXPERIENCE & EDUCATION" : entry.label.toUpperCase()}</h1>}

    {entry.kind === "profile" && <>
      <p className={styles.lead}>{profileData.introduction[0]}</p>
      <p>{profileData.introduction[1]}</p>
      <h2>Current focus</h2><p>{profileData.currentFocus.primary}</p>
      <ul>{profileData.currentFocus.details.map((text) => <li key={text}>{text}</li>)}</ul>
      <h2>Education</h2><p>{profileData.education.degree} in {profileData.education.field}</p>
      <p className={styles.muted}>{profileData.education.period} / {profileData.education.status}</p>
      <details><summary>Coursework</summary><ul>{profileData.education.coursework.map((course) => <li key={course}>{course}</li>)}</ul></details>
    </>}

    {project && <>
      <p className={styles.lead}>{project.shortDescription}</p>
      <div className={styles.tags}>{project.techStack.map((technology) => <span key={technology}>{technology}</span>)}</div>
      <div className={styles.actions}>
        {project.links.github && <a className={styles.primary} href={project.links.github} target="_blank" rel="noopener noreferrer">Repository <ArrowUpRight size={16} /></a>}
        {project.links.demo && <a href={project.links.demo} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight size={16} /></a>}
      </div>
      <details className={styles.projectDetails} open={inspected} onToggle={(e) => setInspected(e.currentTarget.open)}>
        <summary>Project details</summary>
        <p>{project.overview}</p>
        {project.problem && <><h2>The problem</h2><p>{project.problem}</p></>}
        {project.solution && <><h2>The solution</h2><p>{project.solution}</p></>}
        {project.keyFeatures?.length > 0 && <><h2>Capabilities</h2>{project.keyFeatures.map((feature) => <div className={styles.feature} key={feature.title}><h3>{feature.title}</h3><p>{feature.description}</p></div>)}</>}
        {Object.entries(project.architecture || {}).filter(([, items]) => items.length).map(([name, technologies]) => <div className={styles.feature} key={name}><h3>{name === "aiServices" ? "AI services" : name}</h3><p>{technologies.join(" / ")}</p></div>)}
        {project.specs?.length > 0 && <><h2>Specifications</h2>{project.specs.map((spec) => <div className={styles.feature} key={spec.label}><h3>{spec.label}</h3><p>{spec.value}</p></div>)}</>}
        {project.role && <><h2>Contribution</h2><p>{project.role.title}</p><ul>{project.role.responsibilities.map((text) => <li key={text}>{text}</li>)}</ul></>}
        {project.resultOutcome && <><h2>Outcome</h2><p>{project.resultOutcome.summary}</p><ul>{project.resultOutcome.highlights.map((text) => <li key={text}>{text}</li>)}</ul></>}
        {project.screenshots?.filter((image) => image.src || image.url).map((image) => <figure key={image.title}><img src={image.src || image.url} alt={image.caption || image.title} loading="lazy" /><figcaption>{image.caption}</figcaption></figure>)}
      </details>
      <nav className={styles.projectNav} aria-label="Project destinations">{worldProjects.map((item) => <a key={item.id} href={journey.find((stop) => stop.id === item.id).route} aria-current={item.id === project.id ? "page" : undefined} onClick={(e) => { e.preventDefault(); go(journey.findIndex((stop) => stop.id === item.id)); }}>{item.title}</a>)}</nav>
    </>}

    {entry.kind === "skills" && <>
      <p className={styles.lead}>Web systems, intelligent tools, and interactive worlds.</p>
      <div className={styles.skillCategories} aria-label="Skill domains">{skillsCategories.map((item) => <button key={item.id} aria-pressed={item.id === category.id} onClick={() => setSkillId(item.id)}>{item.title}</button>)}</div>
      <h2>{category.subtitle}</h2><p>{category.description}</p>
      <div className={styles.skillList} aria-label="Technologies">{category.skills.map((item) => <button key={item.name} aria-pressed={item.name === selectedSkill.name} onClick={() => setSkill(item.name)}>{item.name}</button>)}</div>
      <div className={styles.skillDetail} aria-live="polite"><h3>{selectedSkill.name}</h3><p>{selectedSkill.focusArea}</p>
        {related.length > 0 && <><h2>Project connections</h2>{related.map((item) => <button className={styles.textLink} key={item.id} onClick={() => go(journey.findIndex((stop) => stop.id === item.id))}>{item.title}<ArrowUpRight size={14} /></button>)}</>}
      </div>
    </>}

    {entry.kind === "experience" && <>
      <p className={styles.lead}>Learning through building.</p>
      <ol className={styles.timeline}>{experienceData.filter((item) => item.category !== "HACKATHONS" || !/\[Editable\]/i.test(item.subtitle)).map((item) => <li key={item.id}>
        <p className={styles.eyebrow}>{item.period} / {item.category}</p>
        <h2>{item.title}</h2>{clean(item.subtitle) && <p className={styles.muted}>{clean(item.subtitle)}</p>}
        <p>{item.description}</p><details><summary>Responsibilities & work</summary><ul>{item.details.map((text) => <li key={text}>{text}</li>)}</ul><div className={styles.tags}>{item.techStack.map((tech) => <span key={tech}>{tech}</span>)}</div></details>
      </li>)}</ol>
    </>}

    {entry.kind === "about" && <>
      <p className={styles.lead}>{profileData.introduction[1]}</p>
      {profileData.areasOfInterest.map((interest) => <div key={interest.title} className={styles.interest}><h2>{interest.title}</h2><p>{interest.description}</p><div className={styles.tags}>{interest.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>)}
      <h2>Languages</h2><p>{profileData.metadata.languages.join(" / ")}</p>
    </>}

    {entry.kind === "contact" && <>
      <p className={styles.lead}>Let&apos;s build something.</p><p>Open to engineering opportunities, collaborations, and conversations.</p>
      <div className={styles.contactLinks}>{[email, ...profileData.socials.filter((social) => social.label !== "EMAIL" && social.configured !== false)].map((social) => <a key={social.label} href={social.url} target={social.external ? "_blank" : undefined} rel={social.external ? "noopener noreferrer" : undefined}><span>{social.label}<small>{social.identifier}</small></span><ArrowUpRight size={18} /></a>)}</div>
      {profileData.socials.some((social) => social.configured === false) && <p>LinkedIn is not configured yet.</p>}
      <button className={styles.textLink} onClick={copyEmail}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? "Email copied" : "Copy email address"}</button>
      {copyError && <p role="status">{email.identifier}</p>}
      <details><summary>Write a message</summary><form className={styles.contactForm} onSubmit={(e) => {
        e.preventDefault(); const form = new FormData(e.currentTarget);
        const subject = `Portfolio enquiry from ${form.get("name")}`;
        const body = `From: ${form.get("name")}\nEmail: ${form.get("email")}\n\n${form.get("message")}`;
        window.location.href = `${email.url}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; setDraft(true);
      }}><label>Name<input name="name" autoComplete="name" required maxLength={100} /></label><label>Email<input type="email" name="email" autoComplete="email" required /></label><label>Message<textarea name="message" rows={4} required maxLength={5000} /></label><button className={styles.primary} type="submit">Open email draft <Mail size={16} /></button>{draft && <p role="status">Your email app opens the draft. Finish sending it there.</p>}</form></details>
    </>}
  </>;
}

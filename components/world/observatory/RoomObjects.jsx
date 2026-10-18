"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { ArrowLeft, GraduationCap, UserRound, Wrench, Layers, Route, Mail, Code, Link } from "lucide-react";
import { profileData } from "../../../data/profile.js";
import { experienceData } from "../../../data/experience.js";
import styles from "./observatory.module.css";

export const RoomObjects = createContext(null);
export const useRoomObjects = () => useContext(RoomObjects);
export const roomChoices = {
  profile: [{ id: "profile", label: "DC monogram", icon: UserRound }, { id: "education", label: "education display", icon: GraduationCap }],
  about: [{ id: "journey", label: "My Journey", icon: Route }, { id: "build", label: "What I Build", icon: Layers }, { id: "work", label: "How I Work", icon: Wrench }],
  contact: [{ id: "email", label: "Email", icon: Mail }, { id: "github", label: "GitHub", icon: Code }, { id: "linkedin", label: "LinkedIn", icon: Link }],
};

export function ObjectChoices() {
  const objects = useRoomObjects();
  return <div className={styles.objectChoices} aria-label="Room objects">
    {objects.choices.map(({ id, label, icon: Icon }) => <button key={id} disabled={!objects.enabled} onClick={() => objects.select(id)} aria-label={`Inspect ${label}`} aria-pressed={objects.selected === id}><Icon size={16} />{label}</button>)}
  </div>;
}

export function ObjectInformation() {
  const objects = useRoomObjects();
  const heading = useRef();
  useEffect(() => {
    if (heading.current) { heading.current.parentElement.scrollTop = 0; heading.current.focus({ preventScroll: true }); }
  }, [objects.selected]);
  useEffect(() => {
    const escape = (event) => { if (event.key === "Escape") { event.preventDefault(); objects.close(); } };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [objects.close]);
  const education = objects.selected === "education";
  const institution = profileData.education.institution;
  const selected = objects.choices.find((item) => item.id === objects.selected);
  const contact = roomChoices.contact.some((item) => item.id === objects.selected);
  const about = roomChoices.about.some((item) => item.id === objects.selected);
  const social = contact ? profileData.socials.find((item) => item.label === objects.selected.toUpperCase()) : null;
  return <div className={`${styles.sceneInfo} ${styles.objectInfo}`} data-object-panel={objects.selected}>
    <button className={styles.objectBack} onClick={objects.close}><ArrowLeft size={17} />Back to room</button>
    <h2 ref={heading} tabIndex={-1}>{contact || about ? selected.label : education ? "Education" : profileData.name.full}</h2>
    <ObjectChoices />
    <div key={objects.selected} className={styles.objectBody}>{contact ? <>
      {social?.configured !== false && social?.url ? <><p style={{ overflowWrap: "anywhere" }}>{social.identifier}</p><div className={styles.actions}><a href={social.url} target={social.external ? "_blank" : undefined} rel={social.external ? "noopener noreferrer" : undefined}>{objects.selected === "email" ? "Write an email" : objects.selected === "github" ? "Open GitHub" : "Open LinkedIn"}</a></div></> : <p>LinkedIn is not configured yet.</p>}
      <h3>Have an interesting idea? Let&apos;s build it.</h3>
      <p>Let&apos;s discuss projects, collaboration, or development opportunities.</p>
    </> : about ? <>
      {objects.selected === "journey" ? <><p>{profileData.education.degree} / {profileData.education.field}</p><p>{profileData.education.period}</p>{experienceData.filter((item) => ["proj-unravel", "proj-physiogenie"].includes(item.id)).map((item) => <section key={item.id}><h3>{item.subtitle} / {item.period}</h3><p>{item.description}</p></section>)}</> : objects.selected === "build" ? <><p>{profileData.shortBio}</p>{profileData.areasOfInterest.map((item) => <section key={item.title}><h3>{item.title}</h3><p>{item.description}</p></section>)}</> : <><p>{profileData.introduction[1]}</p><h3>Current practice</h3><ul>{profileData.currentFocus.details.map((item) => <li key={item}>{item}</li>)}</ul></>}
    </> : education ? <>
      <p>{profileData.education.degree}<br />{profileData.education.field}</p>
      {institution && !/editable|\[|placeholder/i.test(institution) && <p>{institution}</p>}
      <p className={styles.captionText}>{profileData.education.period} / {profileData.education.status}</p>
      <h3>Coursework</h3><ul>{profileData.education.coursework.map((course) => <li key={course}>{course}</li>)}</ul>
    </> : <>
      <p className={styles.captionText}>Software Developer / {profileData.headline}</p>
      <p>{profileData.introduction[0]}</p>
      <h3>Current focus</h3><p>{profileData.currentFocus.primary}</p>
      <ul>{profileData.areasOfInterest.map((area) => <li key={area.title}>{area.title}</li>)}</ul>
      <div className={styles.actions}>{profileData.socials.filter((social) => social.label === "GITHUB").map((social) => <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer">{social.label}</a>)}</div>
    </>}</div>
  </div>;
}

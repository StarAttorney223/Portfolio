"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Plus, X } from "lucide-react";
import { projectsData } from "../../../data/projects.js";
import styles from "./observatory.module.css";

const Interaction = createContext(null);

export function ProjectInteractionProvider({ destination, enabled, children }) {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  useEffect(() => { setHovered(null); setSelected(null); }, [destination, enabled]);
  useEffect(() => {
    const previous = document.body.style.cursor;
    if (enabled && hovered) document.body.style.cursor = "pointer";
    return () => { document.body.style.cursor = previous; };
  }, [enabled, hovered]);
  useEffect(() => {
    const escape = (event) => { if (event.key === "Escape") { setSelected(null); setHovered(null); } };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, []);
  const feature = enabled ? selected || hovered : null;
  return <Interaction.Provider value={{ destination, enabled, hovered, selected, setHovered, setSelected }}>
    {children}
    {feature && <aside className={styles.modelDetail} aria-label="Selected model feature" aria-live="polite" data-model-feature={feature.title}>
      <div><span>{feature.projectTitle}</span>{selected && <button title="Close feature" aria-label="Close feature" onClick={() => { setSelected(null); setHovered(null); }}><X size={18} /></button>}</div>
      <h2>{feature.title}</h2><p>{feature.description}</p>
    </aside>}
  </Interaction.Provider>;
}

export function FeatureTarget({ projectId, featureIndex, marker = true, children, ...props }) {
  const interaction = useContext(Interaction);
  const group = useRef();
  const { invalidate } = useThree();
  const project = projectsData.find((item) => item.id === projectId);
  const feature = project.keyFeatures[featureIndex % project.keyFeatures.length];
  const enabled = interaction.enabled && interaction.destination === projectId;
  const key = `${projectId}:${featureIndex}`;
  const highlighted = enabled && (interaction.hovered?.key === key || interaction.selected?.key === key);
  useFrame((_, delta) => {
    const scale = highlighted ? 1.06 : 1;
    group.current.scale.lerp({ x: scale, y: scale, z: scale }, 1 - Math.exp(-12 * Math.min(delta, .05)));
    if (Math.abs(group.current.scale.x - scale) > .001) invalidate();
  });
  const detail = { ...feature, projectTitle: project.title, key };
  const enter = () => { if (enabled) interaction.setHovered(detail); };
  const leave = () => interaction.setHovered((current) => current?.key === key ? null : current);
  const select = () => { if (enabled) interaction.setSelected(detail); };
  return <group {...props}>
    <group ref={group} onPointerOver={(event) => { if (enabled) { event.stopPropagation(); enter(); } }} onPointerOut={leave} onClick={(event) => { if (enabled) { event.stopPropagation(); select(); } }}>
      {children}
    </group>
    {enabled && marker && <Html center zIndexRange={[20, 10]} style={{ pointerEvents: "auto" }}>
      <button className={styles.featureMarker} data-highlighted={highlighted} aria-label={feature.title} title={feature.title} aria-pressed={interaction.selected?.key === key} onPointerEnter={enter} onPointerLeave={leave} onFocus={enter} onBlur={leave} onClick={select}><Plus size={16} /></button>
    </Html>}
  </group>;
}

export function DataFlow({ points, active }) {
  const particles = useRef();
  const time = useRef(0);
  useFrame((_, delta) => {
    if (active) time.current += Math.min(delta, .05);
    particles.current.children.forEach((particle, index) => {
      const t = (time.current * .22 + index / 6) % 1;
      const segment = t * (points.length - 1), start = Math.floor(segment), fraction = segment - start;
      particle.position.set(...points[start].map((value, axis) => value + (points[start + 1][axis] - value) * fraction));
    });
  });
  return <group ref={particles}>{Array.from({ length: 6 }, (_, i) => <mesh key={i}><sphereGeometry args={[.09, 8, 6]} /><meshBasicMaterial color="#ffe2a1" /></mesh>)}</group>;
}

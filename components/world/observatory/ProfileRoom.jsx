"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, useCursor } from "@react-three/drei";
import { CanvasTexture, SRGBColorSpace } from "three";
import { profileData } from "../../../data/profile.js";
import { Beam, RepeatedBeams } from "./IndustrialStructures";
import { createMonogramGeometry, frameTrace } from "./profileMonogram";
import { useRoomObjects } from "./RoomObjects";

function wrapText(context, text, width) {
  const lines = [];
  let line = "";
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (line && context.measureText(next).width > width) { lines.push(line); line = word; }
    else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

function Lettering({ education = false, compact = false, ...props }) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = education ? 768 : 2048;
    canvas.height = education ? 1024 : 432;
    const context = canvas.getContext("2d");
    const left = education ? 64 : 130;
    const width = canvas.width - left * 2;
    const draw = (text, y, size, color = "#edf0e7", weight = 500) => {
      context.fillStyle = color;
      context.font = `${weight} ${size}px Arial, sans-serif`;
      context.fillText(text, left, y);
    };
    if (education) {
      draw("EDUCATION", 115, 45, "#cfb780");
      draw(profileData.education.period.toUpperCase(), 235, 48);
      context.font = "500 60px Arial, sans-serif";
      const degree = wrapText(context, profileData.education.degree, width);
      degree.forEach((line, i) => draw(line, 385 + i * 75, 60));
      context.font = "500 46px Arial, sans-serif";
      wrapText(context, profileData.education.field, width).forEach((line, i) => draw(line, 615 + i * 60, 46, "#bdcfcc"));
      draw(profileData.education.status.toUpperCase(), 900, 38, "#cfb780");
    } else {
      context.font = "600 140px Arial, sans-serif";
      const nameSize = Math.min(140, 140 * width / context.measureText(profileData.name.full).width);
      draw(profileData.name.full, 165, nameSize, "#f0eee4", 600);
      draw("SOFTWARE DEVELOPER", 290, compact ? 110 : 88, "#c7ae79");
      draw(profileData.headline, compact ? 410 : 390, compact ? 104 : 70, "#c4d4d1");
    }
    const map = new CanvasTexture(canvas);
    map.colorSpace = SRGBColorSpace;
    map.anisotropy = 4;
    return map;
  }, [education, compact]);
  useEffect(() => () => texture.dispose(), [texture]);
  return <mesh {...props}><planeGeometry args={education ? [4.5, 6] : [17, 3.6]} /><meshBasicMaterial map={texture} transparent alphaTest={.05} toneMapped={false} depthWrite={false} /></mesh>;
}

export function ProfileRoom({ texture, active }) {
  const objects = useRoomObjects();
  const [hovered, setHovered] = useState(null);
  const enabled = objects.enabled;
  useCursor(Boolean(hovered && enabled));
  const handlers = (id) => ({
    onPointerOver: (event) => { if (enabled) { event.stopPropagation(); setHovered(id); } },
    onPointerOut: () => setHovered(null),
    onClick: (event) => { if (enabled) { event.stopPropagation(); objects.select(id); } },
  });
  const compact = useThree((state) => state.size.width < 768);
  const runner = useRef();
  const light = useRef();
  const monogram = useMemo(createMonogramGeometry, []);
  useEffect(() => () => monogram.forEach((geometry) => geometry.dispose()), [monogram]);
  const time = useRef(0);
  const ceiling = useMemo(() => [-5, -.5, 4, 8.5, 13, 17.5].map((x) => ({ position: [x, 16.4, -4], scale: [3.7, .35, 24] })), []);
  const reveals = useMemo(() => [-13, -7, -1, 5].flatMap((z) => [-7.8, 22.4].map((x) => ({ position: [x, 7, z], scale: [.22, 14, .7] }))), []);
  const shelving = useMemo(() => {
    const items = [];
    for (const x of [-6, -.5]) items.push({ position: [x, 5.6, -11], scale: [.18, 11.2, 1.8] });
    for (let row = 0; row < 5; row++) {
      const y = .6 + row * 2.3;
      items.push({ position: [-3.25, y, -11], scale: [5.5, .14, 1.8] });
      for (let file = 0; file < 4; file++) items.push({ position: [-5.3 + file * 1.05, y + .8, -11.15], scale: [.65, 1.4, 1.25] });
    }
    return items;
  }, []);
  useFrame((_, delta) => {
    if (active) time.current += Math.min(delta, .05);
    runner.current.position.set(...frameTrace(time.current * .045));
    light.current.emissiveIntensity = .65 + Math.sin(time.current * .35) * .08;
  });
  return <group>
    <Beam position={[7, -.65, -2]} scale={[31, 1.2, 30]} color="#192a2e" texture={texture} roughness={.78} />
    <Beam position={[7, -.02, -1]} scale={[24, .06, 22]} color="#304144" roughness={.7} metalness={.25} />
    {[-5, 19].map((x) => <Beam key={x} position={[x, .03, -1]} scale={[.035, .025, 22]} color="#b8a57d" lit />)}
    <RepeatedBeams items={ceiling} texture={texture} color="#202e33" roughness={.7} />
    <RepeatedBeams items={reveals} texture={texture} color="#3e5358" />
    {[-7.8, 22.4].map((x) => <group key={x}>
      <Beam position={[x, 7.5, -6]} scale={[.25, 15, 18]} color="#17272d" texture={texture} roughness={.85} />
      <Beam position={[x, 15.6, -4]} scale={[.8, .6, 25]} color="#66716e" />
    </group>)}
    {[-2.8, 6.2, 15.2].map((x) => <Beam key={x} position={[x, 16.15, -4]} scale={[.09, .06, 22]} color="#d7d6c5" lit />)}
    {[1, 14].map((y) => <Beam key={y} position={[7, y, -15.8]} scale={[30, 2, .7]} color="#15262c" roughness={.8} texture={texture} />)}
    {[-6, 20].map((x) => <Beam key={x} position={[x, 7, -15.8]} scale={[4, 12, .7]} color="#21383e" texture={texture} />)}
    <RepeatedBeams items={shelving} texture={texture} color="#536364" roughness={.65} metalness={.4} />
    {[2, 17].map((x) => <Beam key={x} position={[x, 7, -14.9]} scale={[.18, 14, .45]} color="#586d70" texture={texture} />)}
    <group position={[8, 8.1, -4.5]} rotation={[0, .22, 0]} {...handlers("profile")}>
      <RoundedBox args={[12.6, 9.4, .7]} radius={.2} smoothness={3} castShadow receiveShadow><meshStandardMaterial color="#6d7270" map={texture} metalness={.8} roughness={.35} emissive="#c7ae79" emissiveIntensity={enabled && hovered === "profile" ? .25 : 0} /></RoundedBox>
      <RoundedBox args={[11.8, 8.6, .2]} position={[0, 0, .4]} radius={.12} smoothness={2} receiveShadow><meshStandardMaterial color="#18272d" metalness={.5} roughness={.58} /></RoundedBox>
      {monogram.map((geometry, i) => <mesh key={i} geometry={geometry} position={[-.3, 0, .55]} castShadow receiveShadow><meshStandardMaterial color={i === 0 ? "#c9b791" : "#e4decd"} metalness={.78} roughness={.3} emissive="#d3bd8f" emissiveIntensity={.08} /></mesh>)}
      <mesh position={[0, 4.5, .48]}><boxGeometry args={[12.2, .045, .04]} /><meshStandardMaterial ref={light} color="#bfa778" emissive="#bfa778" emissiveIntensity={.65} /></mesh>
      <Beam position={[0, -4.5, .48]} scale={[12.2, .045, .04]} color="#d6c8a9" lit />
      <group ref={runner}><mesh><sphereGeometry args={[.075, 12, 8]} /><meshBasicMaterial color="#fff0d1" toneMapped={false} /></mesh></group>
      <RoundedBox args={[17.6, 3.8, 1.3]} position={[0, -6.15, -.15]} radius={.1} smoothness={2} castShadow receiveShadow><meshStandardMaterial color="#213238" map={texture} metalness={.45} roughness={.66} /></RoundedBox>
      <Lettering compact={compact} position={[0, -6.15, .52]} />
      {[-5, 5].map((x) => <Beam key={x} position={[x, -4.85, -.15]} scale={[.2, 1.7, .8]} color="#8b938a" texture={texture} />)}
    </group>
    <Beam position={[7, .08, 6]} scale={[22, .025, .035]} color="#687b7d" />
    <group position={[-4.5, 4.1, 1]} rotation={[0, .4, 0]} {...handlers("education")}>
      <Beam position={[0, 0, -.18]} scale={[5.2, 7, .35]} color={enabled && hovered === "education" ? "#53645e" : "#24383e"} texture={texture} roughness={.8} />
      <Lettering education position={[0, 0, .02]} />
      <Beam position={[-2.8, 0, -.1]} scale={[.06, 7, .1]} color="#bda77a" lit />
      <Beam position={[0, -3.8, -.3]} scale={[4, .7, 1.5]} color="#243337" />
    </group>
    <pointLight position={[7, 9, 7]} color="#e7ddc4" intensity={230} distance={38} />
    <pointLight position={[-5, 11, -8]} color="#9bbfc6" intensity={130} distance={30} />
  </group>;
}

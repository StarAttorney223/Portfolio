"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Line, useCursor } from "@react-three/drei";
import { Beam, Stencil, AMBER } from "./IndustrialStructures";
import { DataFlow } from "./ProjectInteractions";
import { skillClusters, developmentMilestones } from "./facilitySystems.js";

export function TechnologyCore({ texture, active, selected, onSkill, interactive }) {
  const compact = useThree((state) => state.size.width < 768);
  const stack = useRef(), time = useRef(0);
  const [hovered, setHovered] = useState(null);
  useCursor(Boolean(hovered && interactive));
  useFrame((_, delta) => {
    if (active) time.current += Math.min(delta, .05);
    stack.current.rotation.y = time.current * .09;
  });
  return <group position={[7, 0, -3]}>
    <Beam position={[0, .2, 0]} scale={[6.4, .4, 5]} texture={texture} color="#40585e" />
    <mesh position={[0, .65, 0]} castShadow><cylinderGeometry args={[.65, .9, 1, 6]} /><meshStandardMaterial color="#55747a" map={texture} metalness={.7} roughness={.35} /></mesh>
    {[-2.7, 2.7].map((x) => <group key={x}>
      <Beam position={[x, 4, -1.5]} scale={[.3, 8, .6]} texture={texture} color="#7f9491" />
      <Beam position={[x, 4, -1.16]} scale={[.055, 6.8, .05]} color="#dfd9b8" lit />
    </group>)}
    <Beam position={[0, 8, -1.5]} scale={[5.8, .45, 1]} texture={texture} color="#728b89" />
    <group ref={stack}>
      {[1.8, 3.4, 5, 6.6].map((y) => <group key={y} position={[0, y, 0]}>
        <mesh castShadow><cylinderGeometry args={[1.9, 1.9, .65, 6]} /><meshStandardMaterial color="#769191" metalness={.8} roughness={.32} map={texture} /></mesh>
        <mesh position={[0, .45, 0]}><cylinderGeometry args={[1.25, 1.25, .18, 6]} /><meshStandardMaterial color="#c2b68d" metalness={.5} roughness={.4} emissive="#d3b577" emissiveIntensity={.25} /></mesh>
        <mesh position={[0, -.65, 0]}><cylinderGeometry args={[.5, .5, 1, 6]} /><meshStandardMaterial color="#c1d9d2" metalness={.5} roughness={.3} /></mesh>
      </group>)}
    </group>
    {skillClusters.map((category) => {
      const x = category.position[0] * (compact ? .72 : 1), z = category.position[2];
      const highlight = selected === category.id || hovered === category.id;
      const points = [[0, .3, 0], [x * .65, .3, z * .65], [x, .3, z]];
      return <group key={category.id}>
        <Line points={points} color={highlight ? AMBER : "#678f95"} lineWidth={highlight ? 2 : 1} />
        <DataFlow points={points} active={active} />
        <group position={[x, 0, z]} onPointerOver={(e) => { if (interactive) { e.stopPropagation(); setHovered(category.id); } }} onPointerOut={() => setHovered(null)} onClick={(e) => { if (interactive) { e.stopPropagation(); onSkill(category.id); } }}>
          <Beam position={[0, .2, 0]} scale={[2.8, .4, 2.8]} texture={texture} color="#4d686c" />
          <mesh position={[0, 1.2, 0]} castShadow><cylinderGeometry args={[.9, 1.15, 1.6, 6]} /><meshStandardMaterial color={highlight ? "#bca477" : "#4e747a"} map={texture} metalness={.65} roughness={.4} emissive={highlight ? "#d2b376" : "#000000"} emissiveIntensity={.13} /></mesh>
          <Beam position={[0, 2.1, 0]} scale={[1.7, .12, 1.7]} color={highlight ? "#e4ca94" : "#9bb7b5"} lit />
          <Beam position={[0, 2.9, .6]} scale={[3.5, .85, .18]} color="#152c32" texture={texture} />
          <Stencil text={category.title} position={[0, 2.9, .71]} scale={[3.2, .55, 1]} />
          <Beam position={[0, 2.45, .35]} scale={[.15, .6, .3]} color="#93a8a2" />
        </group>
      </group>;
    })}
  </group>;
}

export function OperationsCenter({ texture, active }) {
  const runner = useRef(), time = useRef(0);
  useFrame((_, delta) => {
    if (active) time.current += Math.min(delta, .05);
    runner.current.position.x = Math.sin(time.current * .2) * 7;
  });
  return <group position={[6, 0, -2]}>
    {developmentMilestones.map((item, i) => {
      const x = (i - 1.5) * 4, height = .8 + i * .65;
      return <group key={item.id}>
        <Beam position={[x, height / 2, -1]} scale={[3.8, height, 8]} texture={texture} color="#3f585d" />
        <Beam position={[x, height + .03, 2.9]} scale={[3.5, .05, .08]} color="#d5bc8c" lit />
        <Beam position={[x, height + 2.4, -2]} scale={[.25, 4.8, 1]} texture={texture} color="#8b9f99" />
        <Beam position={[x, height + 2.4, -1.5]} scale={[3.3, 4.8, .65]} texture={texture} color="#3e5b61" />
        <Beam position={[x - 1.62, height + 2.4, -1.12]} scale={[.05, 4.8, .05]} color="#c7ae7d" lit />
        <Beam position={[x, height + 4.85, -1.5]} scale={[3.5, .12, .8]} texture={texture} color="#9baaa0" />
        <Beam position={[x, height + 1, -1.12]} scale={[2.9, .06, .05]} color="#8fa8aa" />
        <Stencil text={item.period} position={[x, height + 3.6, -1.1]} scale={[2.9, .7, 1]} />
        <Stencil text={item.label} position={[x, height + 2.25, -1.1]} scale={[2.9, .55, 1]} />
      </group>;
    })}
    <Beam position={[0, .2, 4]} scale={[17, .4, 1.5]} texture={texture} color="#1c333b" />
    <Beam position={[0, .45, 4]} scale={[16, .05, .09]} color="#9fbbba" lit />
    <group ref={runner}><Beam position={[0, .48, 4]} scale={[1.5, .05, .14]} color="#f5dfac" lit /></group>
    <Line points={[[-6, .85, -3], [-2, 1.5, -3], [2, 2.15, -3], [6, 2.8, -3]]} color="#d3bd94" lineWidth={2} />
  </group>;
}

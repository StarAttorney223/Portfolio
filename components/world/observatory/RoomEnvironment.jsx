"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Beam, RepeatedBeams, Stencil, Walkway } from "./IndustrialStructures";
import { DataFlow } from "./ProjectInteractions";
import { facilityLayout } from "./facilityLayout.js";

function ServiceMachine({ position, texture, type, active }) {
  const compute = type === "compute" || type === "skills";
  const signal = type === "contact" || type === "exchange";
  const rackVents = useMemo(() => Array.from({ length: 5 }, (_, i) => ({ position: [0, .95 + i * .75, .47], scale: [.66, .055, .035] })), []);
  const rackIndicators = useMemo(() => [-1, 1].flatMap((side) => [0, 1, 2, 3].map((i) => ({ position: [side * .34, 1.05 + i * .82, .49], scale: [.06, .12, .04] }))), []);
  const packet = useRef(), time = useRef(0);
  useFrame((_, delta) => {
    if (active) time.current += Math.min(delta, .05);
    if (packet.current) packet.current.position.x = Math.sin(time.current * .5) * 1.25;
  });
  if (type === "exchange") return <group position={position}>
    <Beam position={[0, .4, 0]} scale={[5, .8, 5]} texture={texture} color="#37494c" />
    {[-1.35, 0, 1.35].map((x, rack) => <group key={x} position={[x, 0, .4]}>
      <Beam position={[0, 2.7, 0]} scale={[1.04, 5.4, .85]} texture={texture} color="#637777" />
      <Beam position={[0, 2.7, .46]} scale={[.86, 5.12, .08]} color="#132328" roughness={.7} />
      <RepeatedBeams items={rackVents} color="#82908b" roughness={.5} metalness={.35} />
      <RepeatedBeams items={rackIndicators} color={rack === 1 ? "#d6b877" : "#91c9bf"} lit />
    </group>)}
    <Beam position={[0, 5.7, .6]} scale={[4.6, .16, .12]} color="#afc2b7" />
    <Beam position={[0, 5.92, .6]} scale={[3.2, .045, .05]} color="#f0d39a" lit />
    <Beam position={[0, 1, .72]} scale={[4, .045, .05]} color="#7aa49f" lit />
    <group ref={packet}><mesh><sphereGeometry args={[.1, 10, 8]} /><meshBasicMaterial color="#fff0cf" toneMapped={false} /></mesh></group>
    <DataFlow points={[[-1.7, 5.45, .68], [0, 5.45, .68], [1.7, 5.45, .68]]} active={active} />
  </group>;
  return <group position={position}>
    <Beam position={[0, .4, 0]} scale={[5, .8, 5]} texture={texture} color="#37494c" />
    {compute ? [0, 1, 2, 3, 4].map((i) => <Beam key={i} position={[0, 1.2 + i, 0]} scale={[3.6, .55, 3.4]} texture={texture} color="#607d82" />) : <mesh position={[0, 3, 0]} rotation={[0, 0, type === "about" ? Math.PI / 2 : 0]} castShadow><cylinderGeometry args={[signal ? .7 : 1.3, type === "about" ? 1.3 : 1.6, type === "about" ? 4.5 : 5, 8]} /><meshStandardMaterial color="#617b7b" metalness={.7} roughness={.42} map={texture} /></mesh>}
    {signal && [0, 1, 2, 3].map((i) => <Beam key={i} position={[0, 2 + i, 0]} rotation={[0, 0, -.25]} scale={[4 - i * .4, .12, .25]} color="#c2c7b4" />)}
    {type === "motion" && <Beam position={[0, 3, 1.5]} scale={[.07, 4, .07]} color="#b4d8d9" lit />}
    {[-1, 1].map((side) => <group key={side}>
      <Beam position={[side * 1.7, 3, 0]} scale={[.3, 5.3, 2.5]} texture={texture} color="#84948e" />
      <Beam position={[side * 1.85, 3, 1.3]} scale={[.08, 3.5, .05]} color="#c5c6ad" lit />
    </group>)}
    <Beam position={[0, 5.7, 0]} scale={[4.5, .3, 3.6]} color="#89958c" texture={texture} />
  </group>;
}

export function RoomEnvironment({ entry, texture, active, compact }) {
  const layout = useMemo(() => facilityLayout(entry.id, compact), [entry.id, compact]);
  const runner = useRef(), mechanism = useRef(), serviceHead = useRef(), leftScanner = useRef(), time = useRef(0);
  useFrame((_, delta) => {
    if (!runner.current || !mechanism.current || !serviceHead.current || !leftScanner.current) return;
    if (active) time.current += Math.min(delta, .05);
    runner.current.position.x = 7 + Math.sin(time.current * .18) * 13;
    mechanism.current.position.x = Math.sin(time.current * .12) * 4;
    serviceHead.current.position.x = 7 + Math.sin(time.current * .16) * 12;
    leftScanner.current.position.z = -15 + Math.sin(time.current * .1) * 18;
  });
  if (!layout) return null;
  const { theme } = layout;
  const workshop = entry.kind === "about", communication = entry.kind === "contact";
  const gallery = entry.kind === "profile";
  return <group>
    <RepeatedBeams items={layout.frames} texture={texture} color="#465d61" roughness={.56} />
    <RepeatedBeams items={layout.panels} texture={texture} color="#172d34" roughness={.8} metalness={.35} />
    <RepeatedBeams items={layout.floor} texture={texture} color="#283d43" roughness={.72} metalness={.38} />
    <RepeatedBeams items={layout.hardware} texture={texture} color="#6c8182" roughness={.45} />
    <RepeatedBeams items={layout.seams} color="#91a7a5" metalness={.4} />
    <RepeatedBeams items={layout.services} texture={texture} color="#71817c" />
    <RepeatedBeams items={layout.lights} color={theme.accent} lit />
    <RepeatedBeams items={layout.leftFrames} texture={texture} color="#82908a" roughness={.48} />
    <RepeatedBeams items={layout.leftEquipment} texture={texture} color="#536967" roughness={.42} metalness={.68} />
    <RepeatedBeams items={layout.leftLights} color={theme.accent} lit />
    <group ref={leftScanner} position={[-5.05, 6.45, -15]}>
      <Beam scale={[1.45, .1, .1]} color={theme.accent} lit />
      <Beam position={[.58, -.25, 0]} scale={[.12, .55, .2]} color="#d5dfd1" />
    </group>
    <DataFlow points={[[-5.4, 1.1, 3], [-5.4, 1.1, -8], [-5.4, 1.1, -20], [-5.4, 1.1, -32]]} active={active} />
    <Walkway position={[7, theme.level, -24]} length={33} width={3} rotation={Math.PI / 2} texture={texture} opening={{ side: -1, start: -15.7, end: -12.3 }} />
    {[-7, 7, 21].map((x) => <Beam key={x} position={[x, theme.level / 2 - .3, -24]} scale={[.5, theme.level, 1]} texture={texture} />)}
    <group ref={runner}><Beam position={[0, theme.level + .1, -22.8]} scale={[2, .06, .09]} color="#f2e4c6" lit /></group>
    <Beam position={[7, 12.5, -21]} scale={[26, .2, .35]} color="#93a29a" />
    {[-5, 19].map((x) => <group key={x}>
      <Beam position={[x, 15.2, -21]} scale={[.1, 5.5, .1]} color="#8da4a2" />
      <Beam position={[x, 17.9, -21.5]} scale={[.15, .2, 1.2]} texture={texture} color="#78908e" />
    </group>)}
    <group ref={mechanism} position={[0, 12.1, -21]}>
      <Beam position={[7, 1.1, 0]} scale={[workshop ? 4 : 2, .22, 1.2]} texture={texture} color="#9b9b87" />
      <Beam position={[7, .72, 0]} scale={[workshop ? 2.8 : 1.35, .12, .8]} color={theme.accent} lit />
      <Beam position={[7, -.65, 0]} scale={[.08, 2.5, .08]} color="#a6b5ac" />
      <Beam position={[7, -1.95, 0]} scale={[workshop ? 3 : 1.4, .32, .9]} texture={texture} color="#758a88" />
    </group>
    <group ref={serviceHead} position={[7, 13, -37]}>
      <Beam scale={[1.8, .65, .45]} texture={texture} color="#748784" />
      <Beam position={[0, -.36, .05]} scale={[1.2, .06, .08]} color={theme.accent} lit />
    </group>
    {gallery ? <>
      {[-2, 12].map((x) => <group key={x} position={[x, 8, -30]}>
        <Beam scale={[8, 7, .5]} texture={texture} color="#52686c" />
        <mesh position={[0, 0, .3]}><planeGeometry args={[7.4, 6.4]} /><meshStandardMaterial color="#8aacae" metalness={.4} roughness={.18} transparent opacity={.14} depthWrite={false} /></mesh>
        <Stencil text={x < 0 ? "ARCHIVE / CSE" : "RESEARCH / DEVELOPMENT"} position={[0, 0, .35]} scale={[6.8, .7, 1]} />
      </group>)}
    </> : <>
      <ServiceMachine position={[-2, theme.level, -30]} texture={texture} type={entry.environment || entry.kind} active={active} />
      {!compact && <ServiceMachine position={[15, theme.level, -32]} texture={texture} type={entry.environment || entry.kind} active={active} />}
    </>}
    {workshop && <>
      {[-5, 18].map((x) => <group key={x}>
        <Beam position={[x, 2.5, -12]} scale={[4, .35, 5]} texture={texture} color="#8b9891" />
        {[-1.3, 1.3].map((dx) => <Beam key={dx} position={[x + dx, 1.2, -12]} scale={[.3, 2.5, 4]} texture={texture} />)}
        {[0, 1, 2, 3].map((i) => <Beam key={i} position={[x, 4 + i * .8, -13.5]} scale={[3.6, .13, .6]} texture={texture} color="#627b7d" />)}
      </group>)}
    </>}
    {communication && [-5, 19].map((x) => <group key={x} position={[x, 8, -20]}>
      <Beam scale={[.35, 16, .6]} texture={texture} color="#8e9d96" />
      {[0, 1, 2, 3].map((i) => <Beam key={i} position={[0, i * 2 - 2, 0]} rotation={[0, 0, -.35]} scale={[5 - i * .7, .14, .25]} color="#a9c5c4" />)}
      <Beam position={[0, 7.5, .4]} scale={[.1, .4, .1]} color="#eee0b9" lit />
    </group>)}
    <pointLight position={[7, 12, -22]} color="#b6d0cc" intensity={130} distance={36} decay={2} />
    <pointLight position={[-5, 11, -23]} color="#e5c993" intensity={48} distance={24} decay={2} />
    <pointLight position={[19, 11, -28]} color="#9cc9cc" intensity={58} distance={25} decay={2} />
    <pointLight position={[-4.5, 6, -17]} color="#dfc18a" intensity={42} distance={20} decay={2} />
  </group>;
}

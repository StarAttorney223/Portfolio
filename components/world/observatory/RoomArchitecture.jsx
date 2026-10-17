"use client";

import { useMemo } from "react";
import { DoubleSide } from "three";
import { Beam, RepeatedBeams, Stencil, AMBER } from "./IndustrialStructures";

function Vault({ texture, radius = 12, depth = 10, color = "#74796c" }) {
  const arches = useMemo(() => {
    const items = [];
    for (const z of [-depth, 0, depth]) for (let i = 0; i <= 24; i++) {
      const a = i / 24 * Math.PI;
      items.push({ position: [7 + Math.cos(a) * radius, Math.sin(a) * radius, z - 5], scale: [radius * .14, .55, .9], rotation: [0, 0, a + Math.PI / 2] });
    }
    return items;
  }, [radius, depth]);
  return <RepeatedBeams items={arches} color={color} texture={texture} />;
}

function Archive({ texture }) {
  const shelves = useMemo(() => {
    const items = [];
    for (let bay = 0; bay < 9; bay++) {
      const x = -6 + bay * 3.1;
      items.push({ position: [x, 5.8, -13], scale: [.15, 11.6, 2.8] });
      for (let row = 0; row < 5; row++) {
        items.push({ position: [x + 1.4, 1 + row * 2, -13], scale: [2.8, .16, 3] });
        for (let book = 0; book < 5; book++) items.push({ position: [x + .35 + book * .48, 1.7 + row * 2, -12.8], scale: [.28, 1.1, 1.1] });
      }
    }
    return items;
  }, []);
  return <>
    <Vault texture={texture} radius={14} depth={6} />
    <Beam position={[7, 5.8, -15]} scale={[30, 12, 1]} texture={texture} color="#505a52" />
    <RepeatedBeams items={shelves} texture={texture} color="#a1987d" />
    <Stencil text="ARCHIVE / 01" position={[-3, 9, -11.4]} scale={[6, .7, 1]} />
    {[-5, 19].map((x) => <Beam key={x} position={[x, 5, -10]} scale={[.08, 9, .08]} color={AMBER} lit />)}
  </>;
}

function Gallery({ texture }) {
  return <>
    {[-8, 0, 8].map((z) => <group key={z}>
      {[-7, 21].map((x) => <Beam key={x} position={[x, 6.5, z]} scale={[.8, 13, .8]} texture={texture} color="#77796b" />)}
      <Beam position={[7, 13, z]} scale={[29, .6, .8]} texture={texture} />
      <Beam position={[7, 12.5, z]} scale={[20, .05, .16]} color="#ead8aa" lit />
    </group>)}
    <Beam position={[7, 6, -14]} scale={[30, 12, .5]} color="#5e675e" texture={texture} />
    {[-1, 1].map((side) => <Beam key={side} position={[7 + side * 14, 4, -3]} scale={[.7, 8, 20]} texture={texture} color={side < 0 ? "#9c7950" : "#535f59"} />)}
  </>;
}

function ComputeArchitecture({ texture }) {
  const racks = useMemo(() => {
    const items = [];
    for (const x of [-4, 18]) for (const z of [-10, -4, 2]) {
      items.push({ position: [x, 4.5, z], scale: [3.5, 9, 4] });
      for (let i = 0; i < 10; i++) items.push({ position: [x, .8 + i * .75, z + 2.1], scale: [3.1, .16, .15] });
    }
    return items;
  }, []);
  return <>
    <RepeatedBeams items={racks} color="#66746b" texture={texture} />
    <Beam position={[7, 6, -13]} scale={[26, 12, .7]} color="#46534e" texture={texture} />
    {[-5, 19].map((x) => <group key={x}><Beam position={[x, 10, -3]} scale={[1, .5, 26]} color="#a18d62" /><Beam position={[x, 9.7, -3]} scale={[.08, .05, 24]} color={AMBER} lit /></group>)}
    <Beam position={[7, 11, -7]} scale={[27, .5, 1]} texture={texture} />
  </>;
}

function MotionArchitecture({ texture }) {
  return <>
    <Vault texture={texture} radius={10} depth={6} color="#a2aaa0" />
    <mesh position={[7, 5, -14]}><cylinderGeometry args={[14, 14, 12, 32, 1, true, Math.PI / 2, Math.PI]} /><meshStandardMaterial color="#65736d" side={DoubleSide} metalness={.4} roughness={.55} /></mesh>
    {[-4, 18].map((x) => <group key={x}><Beam position={[x, 3, 3]} scale={[1.2, 6, 2]} texture={texture} color="#a8aea0" /><Beam position={[x, 3.3, 4.02]} scale={[.12, 4, .08]} color="#f2d59a" lit /></group>)}
  </>;
}

function ExchangeArchitecture({ texture }) {
  return <>
    {[-10, -3, 4, 11].map((z) => <group key={z}>
      {[-6, 20].map((x) => <Beam key={x} position={[x, z >= 4 ? 8 : 5, z]} scale={[1, z >= 4 ? 16 : 10, 1]} texture={texture} color="#819080" />)}
      <Beam position={[7, z >= 4 ? 16 : 10, z]} scale={[27, 1, 1]} texture={texture} />
      <Beam position={[7, z >= 4 ? 15.45 : 9.45, z]} scale={[21, .05, .08]} color={AMBER} lit />
    </group>)}
    <Beam position={[7, 5, -15]} scale={[30, 10, .8]} color="#515e55" texture={texture} />
  </>;
}

function WeatherArchitecture({ texture }) {
  return <>
    {[-6, 19].map((x) => <group key={x}>
      <Beam position={[x, 4, -10]} scale={[.6, 8, .6]} texture={texture} color="#99a59b" />
      <Beam position={[x, 8, -10]} scale={[3, .3, .5]} color="#bdad86" />
      <Beam position={[x, .5, 0]} scale={[1.1, 1, 24]} texture={texture} />
    </group>)}
    <Beam position={[7, 1, -15]} scale={[30, 2, 2]} texture={texture} color="#7b887d" />
    <mesh position={[7, 6, -32]}><planeGeometry args={[90, 32]} /><meshBasicMaterial color="#394a48" /></mesh>
  </>;
}

function CommunicationsArchitecture({ texture }) {
  return <>
    <Beam position={[7, 4, -15]} scale={[30, 8, .8]} texture={texture} color="#515e55" />
    {[-6, 20].map((x) => <group key={x}>
      <Beam position={[x, 6, -8]} scale={[.8, 12, .8]} texture={texture} />
      <Beam position={[x, 10, -8]} scale={[3, .12, .12]} color={AMBER} lit />
      <Beam position={[x, 7, -8]} scale={[2, .12, .12]} color={AMBER} lit />
    </group>)}
  </>;
}

function NexusArchitecture({ texture }) {
  return <>
    <Vault texture={texture} radius={16} depth={5} />
    <Beam position={[7, 5, -13]} scale={[29, 12, .8]} texture={texture} color="#4f6057" />
    {Array.from({ length: 6 }, (_, i) => { const a = i / 6 * Math.PI * 2, h = 4 + Math.sin(a) * 3.5; return <Beam key={i} position={[7 + Math.cos(a) * 7, h / 2 - .5, -3]} scale={[.25, Math.max(.3, h), .3]} color="#909b87" />; })}
  </>;
}

function ChronologyArchitecture({ texture }) {
  return <>
    {[-10, -6, -2].map((z, i) => <Beam key={z} position={[7, -1.5 - i * .3, z]} scale={[27, 1.3, 3]} texture={texture} color="#596b5d" />)}
    <Vault texture={texture} radius={16} depth={8} />
    <Beam position={[7, 5, -15]} scale={[29, 14, .8]} texture={texture} color="#525e53" />
  </>;
}

function FabricationArchitecture({ texture }) {
  return <>
    <ComputeArchitecture texture={texture} />
    <Beam position={[7, 11, -1]} scale={[26, 1, 2]} texture={texture} color="#ac8b53" />
    {[-5, 19].map((x) => <Beam key={x} position={[x, 4.5, 7]} scale={[1, 9, 2]} texture={texture} color="#8a7c59" />)}
    {[-1, 0, 1].map((i) => <Beam key={i} position={[7 + i * 3, 6, -11]} rotation={[0, 0, i * .25]} scale={[.25, 5, .4]} color="#c6c1a5" />)}
  </>;
}

const rooms = { profile: Archive, atelier: Gallery, compute: ComputeArchitecture, motion: MotionArchitecture, exchange: ExchangeArchitecture, weather: WeatherArchitecture, skills: NexusArchitecture, experience: ChronologyArchitecture, about: FabricationArchitecture, contact: CommunicationsArchitecture };

export function RoomArchitecture({ entry, texture }) {
  const Room = rooms[entry.environment || entry.kind];
  return <>
    {Room && <Room texture={texture} />}
    <pointLight position={[7, 8, 10]} color="#ffe3b4" intensity={320} distance={45} />
    <pointLight position={[-5, 8, -1]} color="#e1e8dd" intensity={210} distance={40} />
    <pointLight position={[18, 10, -8]} color="#ffbd69" intensity={180} distance={35} />
  </>;
}

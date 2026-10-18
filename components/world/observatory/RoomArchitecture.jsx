"use client";

import { useMemo } from "react";
import { DoubleSide } from "three";
import { Beam, RepeatedBeams, AMBER } from "./IndustrialStructures";

function ObservationWall({ texture, z = -14 }) {
  return <group position={[7, 0, z]}>
    <Beam position={[0, 1, 0]} scale={[30, 2, .7]} texture={texture} color="#273e45" />
    <Beam position={[0, 13, 0]} scale={[30, 1.5, .7]} texture={texture} color="#334a50" />
    {[-13, 13].map((x) => <Beam key={x} position={[x, 7, 0]} scale={[3, 12, .7]} texture={texture} color="#344c52" />)}
    {[-11.3, 0, 11.3].map((x) => <Beam key={x} position={[x, 7, .2]} scale={[.16, 10.5, .35]} color="#7c9494" texture={texture} />)}
    <mesh position={[0, 7, 0]}><planeGeometry args={[22.4, 10]} /><meshStandardMaterial color="#8bb3bd" transparent opacity={.085} depthWrite={false} roughness={.22} metalness={.35} /></mesh>
    <Beam position={[0, 12.2, .4]} scale={[22.5, .055, .08]} color="#c7cebf" lit />
  </group>;
}

function Vault({ texture, radius = 12, depth = 10, offset = -5, color = "#74796c" }) {
  const arches = useMemo(() => {
    const items = [];
    for (const z of [-depth, 0, depth]) for (let i = 0; i <= 24; i++) {
      const a = i / 24 * Math.PI;
      items.push({ position: [7 + Math.cos(a) * radius, Math.sin(a) * radius, z + offset], scale: [radius * .14, .55, .9], rotation: [0, 0, a + Math.PI / 2] });
    }
    return items;
  }, [radius, depth, offset]);
  return <RepeatedBeams items={arches} color={color} texture={texture} />;
}

function Gallery({ texture }) {
  return <>
    {[-8, 0, 8].map((z) => <group key={z}>
      {[-7, 21].map((x) => <Beam key={x} position={[x, 6.5, z]} scale={[.8, 13, .8]} texture={texture} color="#77796b" />)}
      <Beam position={[7, 13, z]} scale={[29, .6, .8]} texture={texture} />
      <Beam position={[7, 12.5, z]} scale={[20, .05, .16]} color="#ead8aa" lit />
    </group>)}
    <ObservationWall texture={texture} />
    {[-1, 1].map((side) => <group key={side} position={[7 + side * 14, 0, -3]}>
      <Beam position={[0, 1.5, 0]} scale={[.7, 3, 20]} texture={texture} color="#334b52" />
      {[-8, 0, 8].map((z) => <Beam key={z} position={[0, 5.5, z]} scale={[.4, 5, .4]} texture={texture} color="#728b8e" />)}
      {[3, 8].map((y) => <Beam key={y} position={[0, y, 0]} scale={[.4, .25, 20]} texture={texture} color="#6a8182" />)}
      <mesh position={[0, 5.5, 0]} rotation={[0, Math.PI / 2, 0]}><planeGeometry args={[19, 4.8]} /><meshStandardMaterial color="#88aeb7" side={DoubleSide} transparent opacity={.12} depthWrite={false} metalness={.3} roughness={.25} /></mesh>
    </group>)}
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
    <ObservationWall texture={texture} z={-13} />
    {[-5, 19].map((x) => <group key={x}><Beam position={[x, 10, -3]} scale={[1, .5, 26]} color="#a18d62" /><Beam position={[x, 9.7, -3]} scale={[.08, .05, 24]} color={AMBER} lit /></group>)}
    <Beam position={[7, 11, -7]} scale={[27, .5, 1]} texture={texture} />
  </>;
}

function MotionArchitecture({ texture }) {
  return <>
    <Vault texture={texture} radius={10} depth={4} offset={-13} color="#8eaaa9" />
    <mesh position={[7, 5, -14]}><cylinderGeometry args={[14, 14, 12, 32, 1, true, Math.PI / 2, Math.PI]} /><meshStandardMaterial color="#708f95" side={DoubleSide} metalness={.4} roughness={.25} transparent opacity={.22} depthWrite={false} /></mesh>
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
    <ObservationWall texture={texture} z={-15} />
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
    <ObservationWall texture={texture} z={-13} />
    {[-5, 7, 19].map((x) => <group key={x}>
      <Beam position={[x, 15, -4]} scale={[1.5, .45, 24]} texture={texture} color="#506c72" />
      <Beam position={[x, 14.72, -4]} scale={[.1, .06, 23]} color="#c2d8d5" lit />
    </group>)}
  </>;
}

function ChronologyArchitecture({ texture }) {
  return <>
    <ObservationWall texture={texture} z={-15} />
    {[-7, 21].map((x) => <group key={x}>
      {[-13, -5, 3].map((z) => <Beam key={z} position={[x, 7, z]} scale={[.5, 14, .7]} texture={texture} color="#607e82" />)}
      {[2, 7, 12].map((y) => <Beam key={y} position={[x, y, -5]} scale={[.35, .3, 20]} texture={texture} color="#4c686e" />)}
      <Beam position={[x, 14, -5]} scale={[1.4, .6, 22]} texture={texture} color="#70817d" />
      <Beam position={[x, 13.6, -5]} scale={[.12, .05, 21]} color="#d4c49f" lit />
    </group>)}
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

const rooms = { atelier: Gallery, compute: ComputeArchitecture, motion: MotionArchitecture, exchange: ExchangeArchitecture, skills: NexusArchitecture, experience: ChronologyArchitecture, about: FabricationArchitecture, contact: CommunicationsArchitecture };

export function RoomArchitecture({ entry, texture }) {
  const Room = rooms[entry.environment || entry.kind];
  return <>
    {Room && <Room texture={texture} />}
    <pointLight position={[7, 8, 10]} color="#efe2c5" intensity={240} distance={40} />
    <pointLight position={[-5, 8, -1]} color="#c2d6da" intensity={160} distance={35} />
    <pointLight position={[18, 10, -8]} color="#dcc18b" intensity={110} distance={30} />
  </>;
}

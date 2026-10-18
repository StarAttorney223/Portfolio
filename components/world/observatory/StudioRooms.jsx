"use client";

import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useCursor } from "@react-three/drei";
import { Beam, Stencil, AMBER } from "./IndustrialStructures";
import { useRoomObjects } from "./RoomObjects";
import { aboutDisplays, contactDisplays } from "./studioDisplays.js";
import { ContactMark } from "./ContactMark";
import { openContact } from "./contactMethods.js";

function Access({ id, label, position, size = [5.1, 3.5], active, contact = false, children }) {
  const objects = useRoomObjects();
  const invalidate = useThree((state) => state.invalidate);
  const [hover, setHover] = useState(false);
  const surface = useRef(), sweep = useRef(), time = useRef(0);
  const enabled = objects?.enabled && objects.choices.some((item) => item.id === id);
  useCursor(hover && enabled);
  const selected = (hover && enabled) || objects?.selected === id;
  const dim = Boolean(objects?.selected && objects.selected !== id);
  useFrame((_, delta) => {
    const dt = Math.min(delta, .05);
    if (active) time.current += dt;
    const scale = selected ? 1.035 : 1;
    surface.current.scale.setScalar(surface.current.scale.x + (scale - surface.current.scale.x) * (1 - Math.exp(-12 * dt)));
    if (Math.abs(surface.current.scale.x - scale) > .0001) invalidate();
    surface.current.position.y = contact ? Math.sin(time.current * .65 + position[0]) * .07 : 0;
    sweep.current.position.x = Math.sin(time.current * .45 + position[0]) * (size[0] / 2 - .3);
  });
  return <group position={position} onPointerOver={(e) => { if (enabled) { e.stopPropagation(); setHover(true); } }} onPointerOut={() => setHover(false)} onClick={(e) => { if (enabled) { e.stopPropagation(); objects.select(id); if (contact) openContact(id); } }}>
    <group ref={surface}>
      {typeof children === "function" ? children({ selected, dim }) : children}
      {[-1, 1].map((side) => <Beam key={side} position={[side * (size[0] / 2 + .06), 0, .12]} scale={[.1, size[1] + .15, .28]} color={selected ? "#e6c994" : dim ? "#546260" : "#98aaa3"} />)}
      <Beam position={[0, -size[1] / 2, .28]} scale={[size[0], .06, .08]} color={selected ? "#fff1cf" : dim ? "#7e785e" : AMBER} lit />
      <Stencil text={label} position={[0, contact ? -1.35 : -1, .4]} scale={[size[0] - .6, .62, 1]} />
      <group ref={sweep}><Beam position={[0, size[1] / 2 - .08, .28]} scale={[.45, .04, .05]} color="#fff0cf" lit /></group>
      <mesh><boxGeometry args={[size[0] + .2, size[1] + .2, .9]} /><meshBasicMaterial transparent opacity={0} depthWrite={false} colorWrite={false} /></mesh>
    </group>
  </group>;
}

function Hoop({ radius, tube = .12, color = "#b4b6ad", rotation, position, arc = Math.PI * 2, lit = false }) {
  return <mesh position={position} rotation={rotation} castShadow={!lit}>
    <torusGeometry args={[radius, tube, 8, 64, arc]} />
    <meshStandardMaterial color={color} metalness={.8} roughness={.32} emissive={lit ? color : "#000000"} emissiveIntensity={lit ? .7 : 0} />
  </mesh>;
}

function Foundation({ texture, contact = false }) {
  return <>
    <Beam position={[7, -.6, -3]} scale={[30, 1.2, 28]} color="#25383a" texture={texture} />
    {[-5, 19].map((x) => <group key={x}>
      <Beam position={[x, 6, -9]} scale={[.55, 13, 1]} texture={texture} color="#647777" />
      <Beam position={[x, 12.5, -1]} scale={[.55, .6, 17]} texture={texture} />
      <Beam position={[x, 12.1, -1]} scale={[.12, .06, 16]} color="#e4cfaa" lit />
    </group>)}
    {[-10, -5, 0].map((z) => <Beam key={z} position={[7, 13, z]} scale={[25, .4, .6]} texture={texture} color="#526767" />)}
    {[-3, 17].map((x) => <Beam key={x} position={[x, .04, -3]} scale={[.07, .05, 25]} color={contact ? "#9ac6bd" : AMBER} lit />)}
    <Beam position={[7, .06, -11]} scale={[22, .08, .15]} color="#b7a07b" lit />
    <Stencil text={contact ? "COMMUNICATIONS / ESTABLISH A CONNECTION" : "FABRICATION / SOFTWARE & SYSTEMS"} position={[7, 11.4, -10]} scale={[18, 1, 1]} />
    <pointLight position={[4, 8, 5]} color="#ffe1ad" intensity={150} distance={30} decay={2} />
    <pointLight position={[13, 7, -8]} color="#8ebbb5" intensity={100} distance={25} decay={2} />
  </>;
}

export function AboutRoom({ texture, active }) {
  const rotor = useRef(), carriage = useRef(), sweep = useRef(), time = useRef(0);
  useFrame((_, delta) => {
    if (!active) return;
    time.current += Math.min(delta, .05);
    rotor.current.rotation.z = time.current * .065;
    carriage.current.rotation.z = -.25 - time.current * .09;
    sweep.current.position.x = 7 + Math.sin(time.current * .35) * 7;
  });
  return <>
    <Foundation texture={texture} />
    <Beam position={[7, .6, -4]} scale={[18, 1.1, 7]} texture={texture} color="#455858" />
    {[-.5, 14.5].map((x) => <group key={x}>
      <Beam position={[x, 3.4, -5]} scale={[.8, 6, 1.4]} texture={texture} />
      <Beam position={[x, 6, -3.5]} scale={[2.2, .5, 4]} color="#b3b3a3" texture={texture} />
    </group>)}
    <group position={[7, 6, -4]} rotation={[0, -.12, 0]}>
      <Hoop radius={4.7} tube={.32} color="#607778" />
      <Hoop radius={4.15} tube={.07} color={AMBER} lit />
      <group ref={rotor}>
        {[0, 1, 2, 3, 4, 5].map((i) => <group key={i} rotation={[0, 0, i * Math.PI / 3]}>
          <Beam position={[0, 3.2, 0]} scale={[1.1, 1.7, 1.2]} texture={texture} color="#9fa9a4" />
          <Beam position={[0, 3.2, .65]} scale={[.08, 1.2, .05]} color={AMBER} lit />
          <Beam position={[0, 1.8, 0]} scale={[.3, 2, .5]} texture={texture} color="#a99572" />
        </group>)}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[1.4, 1.4, 2.4, 12]} /><meshStandardMaterial color="#8eaaa5" metalness={.8} roughness={.3} map={texture} /></mesh>
      </group>
      <group ref={carriage} position={[0, 0, 1.4]}>
        <Hoop radius={3.2} tube={.2} arc={Math.PI * 1.45} color="#c3b48e" />
        <Hoop radius={2.9} tube={.045} arc={Math.PI * .7} color="#cde7de" lit />
      </group>
    </group>
    <group ref={sweep}><Beam position={[0, 1.21, -4]} scale={[.12, .05, 6]} color="#ffe4b2" lit /></group>
    {aboutDisplays.map((item) => <group key={item.id}>
      <Beam position={[item.position[0], 1.8, 2.65]} scale={[.25, 3.5, .4]} texture={texture} />
      <Access {...item} active={active}>{({ selected, dim }) => <>
        <Beam scale={[...item.size, .35]} color={selected ? "#63736b" : dim ? "#253b3e" : "#41585a"} texture={texture} />
        <Stencil text={item.title} position={[0, .5, .2]} scale={[4.4, .7, 1]} />
        <Beam position={[0, 1.5, .22]} scale={[4.5, .05, .05]} color="#e6dcc1" lit />
      </>}
      </Access>
    </group>)}
  </>;
}

export function ContactRoom({ texture, active }) {
  const compact = useThree((state) => state.size.width < 768);
  const outer = useRef(), inner = useRef(), pulse = useRef(), time = useRef(0);
  useFrame((_, delta) => {
    if (!active) return;
    time.current += Math.min(delta, .05);
    outer.current.rotation.z = time.current * .07;
    inner.current.rotation.y = time.current * -.11;
    pulse.current.rotation.z = time.current * .35;
  });
  return <>
    <Foundation texture={texture} contact />
    <group position={[7, 6, -5]}>
      <Hoop radius={5} tube={.3} color="#778e8b" />
      <Hoop radius={4.6} tube={.07} color="#d8bc87" lit />
      <group ref={outer} rotation={[0, 0, .3]}><Hoop radius={4.2} tube={.22} arc={Math.PI * 1.65} color="#c6b48e" />
        {[0, Math.PI].map((a) => <group key={a} rotation={[0, 0, a]}><Beam position={[0, 4.2, 0]} scale={[1, .7, 1.1]} color="#d2c5a5" texture={texture} /></group>)}
      </group>
      <group ref={inner}><Hoop radius={3.5} tube={.19} rotation={[0, .8, .5]} color="#91aaa7" />
        <mesh castShadow><cylinderGeometry args={[.8, 1.3, 5, 6]} /><meshStandardMaterial color="#e4d4ad" metalness={.65} roughness={.28} emissive="#d2a968" emissiveIntensity={.22} /></mesh>
        {[-2, -1, 0, 1, 2].map((y) => <Hoop key={y} radius={1.4} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]} tube={.08} color="#d2e3d9" />)}
      </group>
      <group ref={pulse}><Hoop radius={4.6} tube={.11} arc={.4} color="#fff0d2" lit /></group>
      {[-1, 1].map((x) => <Beam key={x} position={[x * 4, 3.1, -.5]} scale={[.16, 7, .2]} rotation={[0, 0, x * -.6]} color="#9aa9a4" texture={texture} />)}
      <Beam position={[0, -5.5, 0]} scale={[11, .6, 4]} color="#4f6666" texture={texture} />
    </group>
    {contactDisplays(compact).map((item) => <group key={item.id}>
      <Beam position={[item.position[0], 2.3, 9]} scale={[.22, 4.6, .35]} color="#b6aa8e" texture={texture} />
      <Access {...item} active={active} contact>{({ selected, dim }) => <>
        <Beam scale={[4.6, 4.8, .5]} color={selected ? "#344b4b" : dim ? "#152628" : "#213638"} texture={texture} roughness={.75} metalness={.45} />
        <Beam position={[0, 0, .27]} scale={[4.2, 4.4, .04]} color="#101d20" roughness={.85} metalness={.25} />
        <ContactMark id={item.id} />
        <Beam position={[0, -.7, .31]} scale={[3.7, .035, .05]} color={selected ? "#ffe1ae" : "#657c77"} />
      </>}
      </Access>
    </group>)}
  </>;
}

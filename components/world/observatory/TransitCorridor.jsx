"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Beam, RepeatedBeams, Stencil } from "./IndustrialStructures";
import { journey } from "./journey";
import { corridorBounds, corridorDetails } from "./corridorLayout";

export function TransitCorridor({ texture, active, compact }) {
  const pulse = useRef();
  const time = useRef(0);
  const { frames, panels, ceiling, inlays, fixtures, services } = useMemo(corridorDetails, []);
  const length = corridorBounds.start - corridorBounds.end;
  const center = (corridorBounds.start + corridorBounds.end) / 2;
  useFrame((_, delta) => {
    if (active) time.current += Math.min(delta, .05);
    pulse.current.position.z = corridorBounds.start - (time.current * 9) % length;
  });
  return <group>
    <Beam position={[32, -1, center]} scale={[13, 1, length]} texture={texture} color="#263638" roughness={.68} />
    <RepeatedBeams items={frames} texture={texture} color="#566767" />
    <RepeatedBeams items={panels} texture={texture} color="#233b3e" roughness={.74} />
    <RepeatedBeams items={ceiling} texture={texture} color="#202b2d" />
    <RepeatedBeams items={services} color="#70827f" />
    <RepeatedBeams items={inlays} color="#889a99" metalness={.35} />
    <RepeatedBeams items={fixtures} color="#e4dcc4" lit />
    {[25.8, 38.2].map((x) => <group key={x}>
      <Beam position={[x, 22.4, center]} scale={[.5, .45, length]} texture={texture} color="#263335" />
      <Beam position={[x, 1.4, center]} scale={[.16, .18, length]} color="#85928e" />
    </group>)}
    {journey.slice(1).map((stop) => <group key={stop.id} position={[38.85, 0, stop.z + 22]}>
      <Beam position={[.08, 8.5, 0]} scale={[.22, 3.4, 8]} color="#182528" texture={texture} />
      <Stencil text={`${stop.number} / ${stop.label.toUpperCase()}`} position={[-.05, 8.5, 0]} rotation={[0, -Math.PI / 2, 0]} scale={[7, 1.2, 1]} />
      <Beam position={[-.1, 6.6, 0]} scale={[.06, .08, 7]} color="#d4b47a" lit />
    </group>)}
    {[27, 37].map((x) => <group key={x}>
      <Beam position={[x, .3, center]} scale={[.075, .06, length]} color="#d2af73" lit />
      <Beam position={[x, 17, center]} scale={[.045, .045, length]} color="#a7c5c7" lit />
    </group>)}
    <group ref={pulse}>
      {[27, 37].map((x) => <Beam key={x} position={[x, .34, 0]} scale={[.09, .035, compact ? 3 : 5]} color="#eee2bf" lit />)}
    </group>
  </group>;
}

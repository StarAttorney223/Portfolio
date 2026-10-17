"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Beam, RepeatedBeams } from "./IndustrialStructures";
import { journey } from "./journey";

export function TransitCorridor({ texture, active, compact }) {
  const pulse = useRef();
  const time = useRef(0);
  const frames = useMemo(() => {
    const items = [];
    for (let z = 36; z > -1000; z -= 12) {
      // Open boarding bays keep the approach paths clear of structural columns.
      if (journey.some((stop) => Math.abs(z - (stop.z + 22)) < 14)) continue;
      items.push({ position: [26, 10, z], scale: [.65, 20, .7] }, { position: [38, 10, z], scale: [.65, 20, .7] }, { position: [32, 20, z], scale: [13, .65, .7] });
    }
    return items;
  }, []);
  const lights = useMemo(() => frames.map((frame) => ({ ...frame, position: frame.position.map((v, i) => i === 2 ? v + .4 : v), scale: frame.scale.map((v) => v < 1 ? .1 : v - .5) })), [frames]);
  useFrame((_, delta) => {
    if (active) time.current += Math.min(delta, .05);
    pulse.current.position.z = 30 - (time.current * 32) % 1030;
  });
  return <group>
    <Beam position={[32, -1, -480]} scale={[13, 1, 1060]} texture={texture} color="#293638" />
    <RepeatedBeams items={frames} texture={texture} color="#65716c" />
    <RepeatedBeams items={lights} color="#c9ab72" />
    {[27, 37].map((x) => <group key={x}>
      <Beam position={[x, .3, -480]} scale={[.12, .12, 1060]} color="#ffbd63" lit />
      <Beam position={[x, 17, -480]} scale={[.12, .12, 1060]} color="#b6d8db" lit />
    </group>)}
    <group ref={pulse}>
      {[27, 37].map((x) => <Beam key={x} position={[x, 1, 0]} scale={[.2, .2, compact ? 8 : 18]} color="#fff0c8" lit />)}
    </group>
  </group>;
}

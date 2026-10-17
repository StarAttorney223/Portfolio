"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CanvasTexture, RepeatWrapping, SRGBColorSpace, Object3D } from "three";

export const AMBER = "#ffb451";

export function usePlateTexture() {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#727877";
    ctx.fillRect(0, 0, 256, 256);
    // Deterministic brushed metal grain; no downloaded texture dependency.
    for (let i = 0; i < 2100; i++) {
      const x = (i * 73) % 256;
      const y = (i * 137) % 256;
      ctx.fillStyle = i % 2 ? "#646b6a" : "#818785";
      ctx.fillRect(x, y, 2 + i % 27, 1);
    }
    ctx.strokeStyle = "#353c3b";
    ctx.lineWidth = 3;
    ctx.strokeRect(2, 2, 252, 252);
    ctx.strokeStyle = "#9ca09a";
    ctx.lineWidth = 1;
    ctx.strokeRect(5, 5, 246, 246);
    for (const x of [12, 244]) for (const y of [12, 244]) {
      ctx.fillStyle = "#272b2b";
      ctx.fillRect(x - 2, y - 2, 4, 4);
    }
    const map = new CanvasTexture(canvas);
    map.wrapS = map.wrapT = RepeatWrapping;
    map.colorSpace = SRGBColorSpace;
    return map;
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}

export function Beam({ position, scale, rotation, color = "#333b3b", texture, lit = false }) {
  return <mesh position={position} scale={scale} rotation={rotation} castShadow={!lit} receiveShadow>
    <boxGeometry />
    <meshStandardMaterial color={color} map={texture} metalness={lit ? 0 : .65} roughness={.42}
      emissive={lit ? color : "#000000"} emissiveIntensity={lit ? 1.6 : 0} />
  </mesh>;
}

export function RepeatedBeams({ items, color = "#424a48", texture }) {
  const ref = useRef();
  useEffect(() => {
    const object = new Object3D();
    items.forEach((item, i) => {
      object.position.set(...item.position);
      object.scale.set(...item.scale);
      object.rotation.set(...(item.rotation || [0, 0, 0]));
      object.updateMatrix();
      ref.current.setMatrixAt(i, object.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
    ref.current.computeBoundingSphere();
  }, [items]);
  return <instancedMesh ref={ref} args={[null, null, items.length]} castShadow receiveShadow>
    <boxGeometry /><meshStandardMaterial color={color} map={texture} roughness={.5} metalness={.65} />
  </instancedMesh>;
}

export function Stencil({ text, position, scale = [8, 2, 1], rotation = [0, 0, 0] }) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024; canvas.height = 256;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#aeb5aa";
    ctx.font = "bold 160px monospace";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(text, 512, 134, 980);
    const map = new CanvasTexture(canvas);
    map.colorSpace = SRGBColorSpace;
    return map;
  }, [text]);
  useEffect(() => () => texture.dispose(), [texture]);
  return <mesh position={position} scale={scale} rotation={rotation}>
    <planeGeometry /><meshStandardMaterial map={texture} transparent roughness={.8} depthWrite={false} />
  </mesh>;
}

export function Turbine({ active, texture }) {
  const rotor = useRef();
  const inner = useRef();
  useFrame((_, delta) => {
    if (!active) return;
    rotor.current.rotation.z += Math.min(delta, .05) * .075;
    inner.current.rotation.z -= Math.min(delta, .05) * .16;
  });
  const fins = useMemo(() => Array.from({ length: 40 }, (_, i) => {
    const a = i / 40 * Math.PI * 2;
    return { position: [Math.cos(a) * 5.3, Math.sin(a) * 5.3, 0], scale: [2.6, .45, .7], rotation: [0, .25, a + .35] };
  }), []);
  const clamps = useMemo(() => Array.from({ length: 12 }, (_, i) => {
    const a = i / 12 * Math.PI * 2;
    return { position: [Math.cos(a) * 8.2, Math.sin(a) * 8.2, .15], scale: [1.4, .65, 1.9], rotation: [0, 0, a] };
  }), []);
  return <group position={[0, 10, -23]}>
    <Beam position={[0, -8, -2]} scale={[11, 5, 5]} texture={texture} />
    {[-1, 1].map((side) => <group key={side}>
      <Beam position={[side * 8.5, -3, -1]} scale={[2.3, 14, 4]} texture={texture} />
      <Beam position={[side * 8.6, -3, 1.1]} scale={[.16, 8, .1]} color={AMBER} lit />
    </group>)}
    {[{ r: 8, tube: .65, z: 0 }, { r: 7.1, tube: .17, z: .85 }, { r: 6.8, tube: .16, z: 1 }, { r: 3.8, tube: .38, z: .45 }].map(({ r, tube, z }, i) =>
      <mesh key={r} position={[0, 0, z]} castShadow>
        <torusGeometry args={[r, tube, 10, 96]} />
        <meshStandardMaterial color={i === 1 ? AMBER : "#6c7770"} metalness={.8} roughness={.28} emissive={i === 1 ? AMBER : "#000000"} emissiveIntensity={2.2} />
      </mesh>)}
    <RepeatedBeams items={clamps} texture={texture} />
    <group ref={rotor}><RepeatedBeams items={fins} color="#7b8277" texture={texture} /></group>
    <group ref={inner}>
      {Array.from({ length: 8 }, (_, i) => <group key={i} rotation={[0, 0, i * Math.PI / 4]}>
        <Beam position={[2.3, 0, .8]} scale={[2.8, .28, .3]} color="#858c81" />
        <Beam position={[3.1, 0, 1]} scale={[.7, .08, .06]} color="#fff1c5" lit />
      </group>)}
    </group>
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, .4]} castShadow>
      <cylinderGeometry args={[1.3, 1.7, 2.2, 32]} />
      <meshStandardMaterial color="#7d8077" metalness={.9} roughness={.25} />
    </mesh>
    <mesh position={[0, 0, 1.55]}><circleGeometry args={[.82, 32]} /><meshStandardMaterial color="#ffe7ab" emissive="#ffcf75" emissiveIntensity={1.8} /></mesh>
    <pointLight position={[0, 0, 4]} color="#ffc477" intensity={130} distance={25} decay={2} />
    <Stencil text="O B S / 0 1" position={[0, -7.7, 1.1]} scale={[7, 1.1, 1]} />
  </group>;
}

export function Walkway({ position, length, width = 5, rotation = 0, texture }) {
  const rails = useMemo(() => {
    const items = [];
    for (const side of [-1, 1]) {
      for (let z = -length / 2; z <= length / 2; z += 2.5) items.push({ position: [side * width / 2, .85, z], scale: [.1, 1.7, .1] });
      items.push({ position: [side * width / 2, 1.7, 0], scale: [.12, .12, length] });
      items.push({ position: [side * width / 2, .7, 0], scale: [.06, .06, length] });
    }
    for (let z = -length / 2; z <= length / 2; z += 1.5) items.push({ position: [0, -.12, z], scale: [width, .12, .07] });
    return items;
  }, [length, width]);
  return <group position={position} rotation={[0, rotation, 0]}>
    <Beam position={[0, -.4, 0]} scale={[width + .3, .6, length]} texture={texture} color="#333b39" />
    <RepeatedBeams items={rails} color="#85877b" />
    {[-1, 1].map((side) => <Beam key={side} position={[side * (width / 2 - .2), -.03, 0]} scale={[.045, .035, length]} color={AMBER} lit />)}
  </group>;
}

export function Architecture({ texture, compact }) {
  const columns = useMemo(() => {
    const items = [];
    for (let i = 0; i < 8; i++) for (const side of [-1, 1]) {
      items.push({ position: [side * 14, 9, 10 - i * 9], scale: [1.2, 30, 1.5] });
      items.push({ position: [side * 17.5, 5, 10 - i * 9], scale: [5, 17, 6] });
      for (let j = 0; j < (compact ? 3 : 8); j++) items.push({ position: [side * 14.9, 1 + j * 1.2, 10 - i * 9 + 2], scale: [.35, .45, 5] });
    }
    return items;
  }, [compact]);
  return <group>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6, -20]} receiveShadow>
      <planeGeometry args={[160, 180]} /><meshStandardMaterial color="#252e2d" metalness={.85} roughness={.25} />
    </mesh>
    <RepeatedBeams items={columns} texture={texture} />
    {[-1, 1].map((side) => <group key={`conduits-${side}`}>
      {[0, 1, 2].map((i) => <mesh key={i} position={[side * (7.3 + i * .7), -2.5, -20]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[.23, .23, 65, 12]} /><meshStandardMaterial color={i === 1 ? "#7a6a4b" : "#4b6061"} metalness={.75} roughness={.3} />
      </mesh>)}
      {[-40, -25, -10, 5].map((z) => <Beam key={z} position={[side * 8, -2.5, z]} scale={[2.5, .7, .2]} texture={texture} />)}
    </group>)}
    {[-1, 1].map((side) => <group key={side}>
      <Walkway position={[side * 10, 1, -14]} length={65} width={5} texture={texture} />
      <Walkway position={[side * 13, 10, -24]} length={55} width={2.4} texture={texture} />
      <Beam position={[side * 5, -4.7, -15]} scale={[.18, .1, 78]} color="#d77b2c" lit />
      {[-45, -30, -12, 6].map((z) => <group key={z}>
        <Beam position={[side * 13.25, 15, z]} scale={[.1, 7, .15]} color="#d5ded3" lit />
        <Beam position={[side * 11, -2.5, z]} scale={[2, 7, 1.5]} texture={texture} />
        <pointLight position={[side * 9, 5, z]} intensity={55} distance={16} color={side === 1 ? "#ffbd77" : "#b6c9cb"} />
      </group>)}
    </group>)}
    <Walkway position={[0, 1, 9]} length={25} width={5} rotation={Math.PI / 2} texture={texture} />
    <Walkway position={[0, 1, -14]} length={24} width={4} rotation={Math.PI / 2} texture={texture} />
    <Walkway position={[0, 11, -39]} length={29} width={2.4} rotation={Math.PI / 2} texture={texture} />
    <Walkway position={[-2, 1, 18]} length={15} width={5} texture={texture} />
    {[-10, -38, -60].map((z) => <group key={z}>
      <Beam position={[0, 23, z]} scale={[31, 1.4, 1.8]} texture={texture} />
      <Beam position={[0, 21.9, z]} scale={[22, .08, .4]} color="#e0cf9f" lit />
      <Beam position={[0, 25, z]} scale={[26, .4, .5]} />
    </group>)}
    <Beam position={[0, 10, -65]} scale={[43, 35, 3]} texture={texture} color="#2e3938" />
    <Stencil text="01" position={[-13.32, 5.5, -8]} rotation={[0, Math.PI / 2, 0]} scale={[5, 4, 1]} />
    {Array.from({ length: compact ? 7 : 15 }, (_, i) => <Beam key={i} position={[(i - 7) * 7, 13 + i % 4 * 3, -82 - i % 3 * 6]} scale={[4, 26 + i % 4 * 6, 7]} color="#39423e" />)}
  </group>;
}

export function Machinery({ active, texture }) {
  const crane = useRef();
  const shuttle = useRef();
  const elapsed = useRef(0);
  useFrame((_, delta) => {
    if (!active) return;
    elapsed.current += Math.min(delta, .05);
    crane.current.position.x = Math.sin(elapsed.current * .13) * 7;
    shuttle.current.position.z = -25 + Math.sin(elapsed.current * .09) * 23;
  });
  return <>
    <group position={[0, 19, -10]}>
      <Beam position={[0, 0, 0]} scale={[28, .35, .4]} color="#8c8871" />
      <group ref={crane}>
        <Beam position={[0, -.5, 0]} scale={[2.8, 1, 2]} texture={texture} />
        {[-1, 1].map((side) => <Beam key={side} position={[side * .8, -3.4, 0]} scale={[.035, 5, .035]} color="#8a938b" />)}
        <Beam position={[0, -6, 0]} scale={[3.4, 1.4, 2.6]} color="#957349" texture={texture} />
        <Beam position={[0, -6, 1.32]} scale={[2.4, .06, .08]} color={AMBER} lit />
      </group>
    </group>
    <group ref={shuttle} position={[10, 2, -25]}>
      <Beam position={[0, 0, 0]} scale={[2.6, 1.2, 4.8]} color="#7b7763" texture={texture} />
      <Beam position={[0, .9, -1]} scale={[2, .8, 1.7]} color="#353d39" />
      {[-1, 1].map((side) => <Beam key={side} position={[side, .3, 2.45]} scale={[.45, .1, .08]} color="#ffecc2" lit />)}
      <pointLight position={[0, .5, 3]} color="#ffcd80" intensity={45} distance={10} />
    </group>
  </>;
}

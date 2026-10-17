"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { PlaneGeometry, DoubleSide } from "three";
import { Beam, RepeatedBeams, Stencil, Walkway, AMBER } from "./IndustrialStructures";
import { journey } from "./journey";
import { skillsCategories } from "@/data/skills";

function Ring({ position, radius, rotation = [0, 0, 0], color = AMBER, lit = true }) {
  return <mesh position={position} rotation={rotation} castShadow>
    <torusGeometry args={[radius, .075, 8, 64]} /><meshStandardMaterial color={color} metalness={.65} roughness={.3} emissive={lit ? color : "#000000"} emissiveIntensity={lit ? 1.3 : 0} />
  </mesh>;
}

function Stage({ entry, texture }) {
  const ribs = useMemo(() => Array.from({ length: 10 }, (_, i) => ({ position: [(i - 4.5) * 2.5, 3, -12], scale: [.18, 12, .6] })), []);
  return <>
    <Beam position={[5, -.6, -2]} scale={[28, 1, 26]} texture={texture} color="#303b38" />
    <RepeatedBeams items={ribs} color="#525c56" texture={texture} />
    <Beam position={[0, 10, -12]} scale={[27, .65, 1]} texture={texture} />
    <Beam position={[0, 9.4, -11.5]} scale={[24, .06, .12]} color="#d2c49f" lit />
    <Stencil text={`${entry.number} / ${entry.zone.toUpperCase()}`} position={[5, 11.7, -12]} scale={[19, 1.3, 1]} />
    {[-1, 1].map((side) => <group key={side}>
      <Beam position={[5 + side * 13, 3, -2]} scale={[.6, 8, 25]} texture={texture} />
      <Beam position={[5 + side * 12.5, 5, -2]} scale={[.07, .05, 23]} color={AMBER} lit />
    </group>)}
    <pointLight position={[9, 9, 9]} color="#ffd09a" intensity={170} distance={34} />
    <pointLight position={[-6, 5, -6]} color="#d9e5dd" intensity={100} distance={30} />
  </>;
}

function Foundry({ texture, active }) {
  const press = useRef();
  const time = useRef(0);
  useFrame((_, delta) => { if (active) { time.current += Math.min(delta, .05); press.current.position.y = 7 + Math.sin(time.current * .3) * .35; } });
  return <group position={[7, 0, -2]}>
    {[-5, -2.5, 0, 2.5, 5].map((x, i) => <group key={x}>
      <Beam position={[x, 3 + i % 2, 0]} scale={[1.5, 6 + i % 2 * 2, 3]} texture={texture} color="#59615b" />
      <Beam position={[x, 3 + i % 2, 1.55]} scale={[.07, 4, .1]} color={i % 2 ? "#edb561" : "#c7d6cb"} lit />
    </group>)}
    <group ref={press}><Beam position={[0, 0, 0]} scale={[13, .8, 5]} texture={texture} /><Beam position={[0, -.5, 2.5]} scale={[11, .08, .1]} color={AMBER} lit /></group>
    <Stencil text="D / C" position={[0, 3, 1.6]} scale={[6, 2, 1]} />
  </group>;
}

function Atelier({ active, onInspect }) {
  const frames = useRef();
  const time = useRef(0);
  const shader = useMemo(() => ({ uniforms: { time: { value: 0 } }, vertexShader: `varying vec2 vUv;uniform float time;void main(){vUv=uv;vec3 p=position;p.z+=sin(p.x*.6+time*.35)*.4+cos(p.y*.8+time*.2)*.3;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`, fragmentShader: `varying vec2 vUv;uniform float time;void main(){float t=time*.08;float field=sin(vUv.x*14.+sin(vUv.y*10.+t)*3.+t);float line=smoothstep(.82,.98,field);vec3 base=mix(vec3(.12,.16,.15),vec3(.83,.38,.12),vUv.y);vec3 c=mix(base,vec3(.94,.86,.65),line);gl_FragColor=vec4(c,1.);}`, side: DoubleSide }), []);
  useFrame((_, delta) => { if (active) { time.current += Math.min(delta, .05); shader.uniforms.time.value = time.current; frames.current.rotation.y = Math.sin(time.current * .12) * .12; } });
  return <group position={[7, 5, -2]} ref={frames} onClick={onInspect}>
    {[-1, 0, 1].map((i) => <group key={i} position={[i * 4, i * .8, -Math.abs(i) * 3]} rotation={[0, i * -.22, 0]}>
      <Beam position={[0, 0, -.2]} scale={[5.8, 8.6, .35]} color="#9b9684" />
      <mesh position={[0, 0, .8]}><planeGeometry args={[5.4, 8.2, 24, 24]} /><shaderMaterial {...shader} /></mesh>
      <Beam position={[0, 4.8, 0]} scale={[.04, 2, .04]} color="#bac1b6" />
    </group>)}
    <Ring position={[0, -4.6, 0]} radius={7} rotation={[-Math.PI / 2, 0, 0]} />
  </group>;
}

function ComputeHall({ active, texture, onInspect }) {
  const pulse = useRef();
  const elapsed = useRef(0);
  const nodes = useMemo(() => Array.from({ length: 15 }, (_, i) => {
    const level = Math.floor(Math.log2(i + 1)); const first = 2 ** level - 1;
    return [((i - first) - (2 ** level - 1) / 2) * (11 / 2 ** level), 8 - level * 2.5, 0];
  }), []);
  useFrame((_, delta) => { if (active) { elapsed.current += Math.min(delta, .05); pulse.current.position.y = -1 + (elapsed.current * 1.5) % 10; } });
  return <group position={[7, 1, -3]} onClick={onInspect}>
    {nodes.map((p, i) => <group key={i}>
      {i > 0 && <Line points={[nodes[Math.floor((i - 1) / 2)], p]} color="#b99d65" lineWidth={1.5} />}
      <mesh position={p} rotation={[0, 0, Math.PI / 4]}><cylinderGeometry args={[.4, .4, .55, 6]} /><meshStandardMaterial color="#c7b88d" metalness={.8} roughness={.25} /></mesh>
    </group>)}
    {[-7, 7].map((x) => <group key={x}><Beam position={[x, 4, -2]} scale={[1.6, 10, 4]} texture={texture} />{[1, 2, 3, 4, 5, 6].map((i) => <Beam key={i} position={[x, i * 1.3, .1]} scale={[1.1, .08, .1]} color={AMBER} lit />)}</group>)}
    <group ref={pulse}><Beam position={[0, 0, .4]} scale={[12, .07, .08]} color="#ffe2a1" lit /></group>
  </group>;
}

function Bone({ a, b }) {
  const points = useMemo(() => [a, b], [a, b]);
  return <Line points={points} color="#e1ded0" lineWidth={5} />;
}

function MotionLab({ active, onInspect }) {
  const arm = useRef(); const scan = useRef(); const time = useRef(0);
  useFrame((_, delta) => { if (active) { time.current += Math.min(delta, .05); arm.current.rotation.z = Math.sin(time.current * .7) * .65; scan.current.position.y = 4 + Math.sin(time.current * .4) * 3.3; } });
  const bones = [[[0, 6, 0], [0, 3, 0]], [[-1.8, 5.6, 0], [1.8, 5.6, 0]], [[0, 3, 0], [-1.1, 1, .3]], [[-1.1, 1, .3], [-1.5, -1, 0]], [[0, 3, 0], [1.1, 1, -.3]], [[1.1, 1, -.3], [1.5, -1, 0]], [[-1.8, 5.6, 0], [-2.3, 3.5, 0]], [[-2.3, 3.5, 0], [-2, 2, .5]]];
  return <group position={[8, 2, -2]} onClick={onInspect}>
    {bones.map(([a, b], i) => <Bone key={i} a={a} b={b} />)}
    <group ref={arm} position={[1.8, 5.6, 0]}><Bone a={[0, 0, 0]} b={[1.6, -1.3, 0]} /><Bone a={[1.6, -1.3, 0]} b={[2.5, .2, 0]} /><mesh position={[1.6, -1.3, 0]}><sphereGeometry args={[.19, 12, 8]} /><meshStandardMaterial color={AMBER} emissive={AMBER} /></mesh></group>
    <mesh position={[0, 7, 0]}><sphereGeometry args={[.65, 16, 12]} /><meshStandardMaterial color="#bbc5b7" metalness={.6} roughness={.35} /></mesh>
    {[-1.1, 1.1, 0].map((x, i) => <mesh key={i} position={[x, i === 2 ? 3 : 1, 0]}><sphereGeometry args={[.17, 12, 8]} /><meshStandardMaterial color={AMBER} emissive={AMBER} /></mesh>)}
    <group ref={scan}><Ring position={[0, 0, 0]} radius={4.5} rotation={[-Math.PI / 2, 0, 0]} color="#c4d9d0" /></group>
    <Ring position={[0, -1.5, 0]} radius={5.5} rotation={[-Math.PI / 2, 0, 0]} />
    {[-5, 5].map((x) => <Beam key={x} position={[x, 3, -1]} scale={[.4, 11, .5]} color="#78908c" />)}
  </group>;
}

function Exchange({ active, onInspect }) {
  const packets = useRef(); const time = useRef(0);
  useFrame((_, delta) => { if (active) { time.current += Math.min(delta, .05); packets.current.position.x = Math.sin(time.current * .5) * 5; } });
  return <group position={[7, 5, -3]} onClick={onInspect}>
    {[-5.5, 5.5].map((x) => <group key={x} position={[x, 0, 0]}>
      <Ring radius={3.4} position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} color="#a4c8b3" />
      <Ring radius={3.6} position={[x > 0 ? 1 : -1, 0, 0]} rotation={[0, Math.PI / 2, 0]} lit={false} color="#b4b9a8" />
      <Beam position={[0, -3.6, 0]} scale={[2, 3, 7]} color="#44554d" />
    </group>)}
    {[-1, 0, 1].map((y) => <Line key={y} points={[[-5.5, y * 1.2, 0], [5.5, y * 1.2, 0]]} color="#839f91" lineWidth={1} />)}
    <group ref={packets}>{[-1, 0, 1].map((y) => <Beam key={y} position={[y * .8, y * 1.2, 0]} scale={[.5, .5, .5]} color={AMBER} lit />)}</group>
    <Stencil text="ROOM / CONNECTED" position={[0, -4.5, 1]} scale={[10, 1, 1]} />
  </group>;
}

function WeatherArray({ active }) {
  const sweep = useRef(); const clouds = useRef(); const rain = useRef(); const time = useRef(0);
  const rainPositions = useMemo(() => {
    const data = new Float32Array(80 * 6);
    for (let i = 0; i < 80; i++) {
      const x = (i * 3.13) % 17 - 8.5, y = 3 + (i * 1.71) % 5, z = (i * 2.19) % 13 - 8;
      data.set([x, y, z, x + .06, y - .35, z], i * 6);
    }
    return data;
  }, []);
  const terrain = useMemo(() => {
    const geo = new PlaneGeometry(22, 19, 32, 28); const vertices = geo.attributes.position;
    for (let i = 0; i < vertices.count; i++) { const x = vertices.getX(i), y = vertices.getY(i); vertices.setZ(i, Math.sin(x * .33) * Math.cos(y * .3) * 1.5 + Math.sin(x * .8 + y * .5) * .35); }
    geo.computeVertexNormals(); return geo;
  }, []);
  useFrame((_, delta) => { if (active) { time.current += Math.min(delta, .05); sweep.current.rotation.y += Math.min(delta, .05) * .25; clouds.current.position.x = Math.sin(time.current * .1) * 1.5; rain.current.position.y = -(time.current * 2) % 2; } });
  return <group position={[6, 1.5, -2]}>
    <mesh geometry={terrain} position={[0, 1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><meshStandardMaterial color="#2b443a" roughness={1} /></mesh>
    {[3, 6, 9].map((r) => <Ring key={r} position={[0, 2.3, 0]} radius={r} rotation={[-Math.PI / 2, 0, 0]} color="#b4c6ae" lit={false} />)}
    <group ref={sweep} position={[0, 2.5, 0]}><Beam position={[4.5, 0, 0]} scale={[9, .04, .08]} color={AMBER} lit /></group>
    <group ref={clouds} position={[0, 8, -3]}>{Array.from({ length: 9 }, (_, i) => <mesh key={i} position={[(i % 3 - 1) * 4.3, Math.floor(i / 3) * .7, Math.floor(i / 3) * 2.8]} scale={[3.8, .9, 2.8]}><sphereGeometry args={[1, 16, 8]} /><meshStandardMaterial color="#8c9f9e" transparent opacity={.48} depthWrite={false} roughness={1} /></mesh>)}</group>
    <lineSegments ref={rain}><bufferGeometry><bufferAttribute attach="attributes-position" args={[rainPositions, 3]} /></bufferGeometry><lineBasicMaterial color="#b0c8bf" transparent opacity={.32} /></lineSegments>
  </group>;
}

function SkillNetwork({ active, selected, onSkill }) {
  const rotor = useRef();
  useFrame((_, delta) => { if (active) rotor.current.rotation.y += Math.min(delta, .05) * .1; });
  return <group position={[7, 4, -3]}>
    <group ref={rotor}><Ring position={[0, 0, 0]} radius={2.5} rotation={[.4, .3, 0]} /><Ring position={[0, 0, 0]} radius={2} rotation={[0, Math.PI / 2, .5]} color="#b4c6ae" /></group>
    {skillsCategories.map((category, i) => {
      const angle = i / 6 * Math.PI * 2; const p = [Math.cos(angle) * 7, Math.sin(angle) * 3.5, 0];
      return <group key={category.id} onClick={(e) => { e.stopPropagation(); onSkill(category.id); }}>
        <Line points={[[0, 0, 0], p]} color={selected === category.id ? AMBER : "#8eaaa0"} lineWidth={selected === category.id ? 2 : 1} />
        <mesh position={p}><cylinderGeometry args={[.7, 1, 1.4, 6]} /><meshStandardMaterial color={selected === category.id ? "#b77b36" : "#73867a"} metalness={.7} roughness={.3} /></mesh>
        <Stencil text={category.title} position={[p[0], p[1] + 1.4, p[2] + .8]} scale={[4, .65, 1]} />
      </group>;
    })}
    <Ring position={[0, -4.2, 0]} radius={9} rotation={[-Math.PI / 2, 0, 0]} lit={false} color="#949e8d" />
  </group>;
}

function Chronology({ texture, active }) {
  const sweep = useRef(); const time = useRef(0);
  useFrame((_, delta) => { if (active) { time.current += Math.min(delta, .05); sweep.current.position.x = Math.sin(time.current * .15) * 6; } });
  return <group position={[6, 0, -2]}>
    {[0, 1, 2, 3, 4].map((i) => <group key={i} position={[(i - 2) * 3, i * .7, 0]}>
      <Beam position={[0, 0, 0]} scale={[2.8, 1, 7]} texture={texture} /><Beam position={[0, .55, 3.4]} scale={[2.6, .06, .08]} color={AMBER} lit />
      <Beam position={[0, 2.4, -2]} scale={[.12, 4, .12]} color="#9ea896" />
      <Stencil text={["2022", "2023", "2024", "BUILD", "LEARN"][i]} position={[0, 4.8, -2]} scale={[2.6, .8, 1]} />
    </group>)}
    <group ref={sweep}><Ring position={[0, 5, 0]} radius={1} rotation={[Math.PI / 2, 0, 0]} /></group>
  </group>;
}

function Workshop({ active, texture }) {
  const spindle = useRef(); const arm = useRef(); const time = useRef(0);
  const teeth = useMemo(() => Array.from({ length: 20 }, (_, i) => {
    const angle = i / 20 * Math.PI * 2;
    return { position: [Math.cos(angle) * 3.8, Math.sin(angle) * 3.8, 0], scale: [.65, .7, .6], rotation: [0, 0, angle] };
  }), []);
  useFrame((_, delta) => {
    if (!active) return;
    time.current += Math.min(delta, .05);
    spindle.current.rotation.z += Math.min(delta, .05) * .12;
    arm.current.rotation.z = Math.sin(time.current * .22) * .2;
  });
  return <group position={[7, 4, -3]}>
    <Beam position={[0, -3.4, 0]} scale={[15, 1.5, 7]} texture={texture} />
    <group ref={spindle}>
      <Ring position={[0, 0, 0]} radius={3.5} color="#a6b5a0" lit={false} />
      <RepeatedBeams items={teeth} color="#9fa48d" texture={texture} />
      {[0, 1, 2].map((i) => <Beam key={i} position={[0, 0, 0]} rotation={[0, 0, i * Math.PI / 3]} scale={[7, .23, .3]} color="#9ca088" />)}
    </group>
    <group ref={arm} position={[-6, -2, 1]}>
      <Beam position={[0, 3, 0]} scale={[.8, 6, 1]} texture={texture} color="#8e7a50" />
      <Beam position={[2.5, 6, 0]} scale={[5.8, .7, 1]} texture={texture} color="#8e7a50" />
      <Beam position={[5, 5.3, 0]} scale={[.4, 1.6, .5]} color="#b9b89e" />
      <Beam position={[5, 4.4, 0]} scale={[.1, .4, .1]} color={AMBER} lit />
    </group>
  </group>;
}

function Uplink({ active, texture, onContact }) {
  const array = useRef(); const time = useRef(0);
  useFrame((_, delta) => { if (active) { time.current += Math.min(delta, .05); array.current.rotation.y = Math.sin(time.current * .15) * .22; } });
  return <group position={[7, 0, -3]}>
    <Beam position={[0, 2, 0]} scale={[2, 5, 2]} texture={texture} />
    <group ref={array} position={[0, 7, 0]} rotation={[.25, 0, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}><sphereGeometry args={[5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color="#93988b" metalness={.8} roughness={.25} side={DoubleSide} /></mesh>
      <Ring position={[0, 0, 0]} radius={5} /><Beam position={[0, 0, 2]} scale={[.15, .15, 5]} color="#bcb7a0" />
      <mesh position={[0, 0, 4.5]}><sphereGeometry args={[.25, 12, 8]} /><meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={2} /></mesh>
    </group>
    {["EMAIL", "GITHUB", "LINKEDIN"].map((label, i) => <group key={label} position={[(i - 1) * 4, .7, 5]} onClick={(e) => { e.stopPropagation(); onContact(label); }}>
      <Beam position={[0, 0, 0]} scale={[3.5, .7, 2]} color="#5b675e" /><Stencil text={label} position={[0, .1, 1.02]} scale={[3.1, .6, 1]} />
    </group>)}
  </group>;
}

export function Destinations({ texture, active, currentIndex, selection, onSkill, onInspect, onContact }) {
  return <>{journey.slice(1).filter((entry) => Math.abs(currentIndex - entry.index) < 2).map((entry) => <group key={entry.id} position={[0, 0, entry.z]}>
    <Stage entry={entry} texture={texture} />
    {entry.kind === "profile" && <Foundry texture={texture} active={active} />}
    {entry.kind === "ether" && <Atelier active={active} onInspect={onInspect} />}
    {entry.kind === "unravel" && <ComputeHall active={active} texture={texture} onInspect={onInspect} />}
    {entry.kind === "physiogenie" && <MotionLab active={active} onInspect={onInspect} />}
    {entry.kind === "pixelchat" && <Exchange active={active} onInspect={onInspect} />}
    {entry.kind === "atmosalert" && <WeatherArray active={active} />}
    {entry.kind === "skills" && <SkillNetwork active={active} selected={selection} onSkill={onSkill} />}
    {entry.kind === "experience" && <Chronology texture={texture} active={active} />}
    {entry.kind === "about" && <Workshop texture={texture} active={active} />}
    {entry.kind === "contact" && <Uplink active={active} texture={texture} onContact={onContact} />}
  </group>)}</>;
}

export function ConnectingSpine({ texture }) {
  const ribs = useMemo(() => Array.from({ length: 51 }, (_, i) => ({ position: [21, 6, 10 - i * 20], scale: [.5, 15, .6] })), []);
  return <>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -8, -470]} receiveShadow><planeGeometry args={[110, 1100]} /><meshStandardMaterial color="#1d2926" metalness={.65} roughness={.45} /></mesh>
    <Walkway position={[18, 0, -470]} length={1000} width={3} texture={texture} />
    <RepeatedBeams items={ribs} color="#454f49" />
    <Beam position={[21, 14, -470]} scale={[.4, .4, 1000]} color="#686d5e" />
  </>;
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Line } from "@react-three/drei";
import { CanvasTexture, SRGBColorSpace, Vector3 } from "three";
import { projectsData } from "@/data/projects";
import { skillsCategories } from "@/data/skills";

function SceneLabel({ text, position, selected = false, width = 2.7 }) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 80;
    const context = canvas.getContext("2d");
    context.fillStyle = "#151515";
    context.fillRect(0, 0, 512, 80);
    context.strokeStyle = selected ? "#F26A21" : "#656760";
    context.lineWidth = 4;
    context.strokeRect(2, 2, 508, 76);
    context.font = "bold 30px monospace";
    context.fillStyle = selected ? "#FF7A2F" : "#E5E2DA";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text.toUpperCase(), 256, 41, 480);
    const map = new CanvasTexture(canvas);
    map.colorSpace = SRGBColorSpace;
    return map;
  }, [text, selected]);
  useEffect(() => () => texture.dispose(), [texture]);
  return <sprite position={position} scale={[width, width * 80 / 512, 1]} raycast={() => null}>
    <spriteMaterial map={texture} depthTest={false} toneMapped={false} />
  </sprite>;
}

const ORANGE = "#F26A21";
const CAMERA = {
  home: { position: [11, 8, 17], target: [0, 1, 0] },
  projects: { position: [0, 6, 16], target: [0, 1, 0] },
  skills: { position: [0, 5, 15], target: [0, 2, 0] },
  profile: { position: [10, 6, 14], target: [-1, 1, 0] },
  contact: { position: [-9, 6, 14], target: [1, 1, 0] },
  about: { position: [10, 9, 16], target: [0, 1, 0] },
  experience: { position: [-10, 8, 16], target: [0, 1, 0] },
};

function CameraRig({ mode, reduced, compact, active }) {
  const { camera, pointer, invalidate } = useThree();
  const target = useRef(new Vector3(0, 1, 0));
  const destination = useMemo(() => new Vector3(), []);
  const look = useMemo(() => new Vector3(), []);
  useEffect(() => { invalidate(); }, [mode, reduced, compact, active, invalidate]);
  useFrame((state, delta) => {
    const preset = CAMERA[mode] || CAMERA.home;
    const distance = compact ? 1.32 : 1;
    destination.set(...preset.position).multiplyScalar(distance);
    if (!reduced && !compact) {
      destination.x += pointer.x * 0.35;
      destination.y += pointer.y * 0.15;
    }
    look.set(...preset.target);
    const alpha = reduced ? 1 : 1 - Math.exp(-5 * Math.min(delta, 0.05));
    camera.position.lerp(destination, alpha);
    target.current.lerp(look, alpha);
    camera.lookAt(target.current);
    if (camera.position.distanceTo(destination) > 0.002 || target.current.distanceTo(look) > 0.002) invalidate();
  });
  return null;
}

function Block({ position, scale, color = "#252728", emissive, ...props }) {
  return (
    <mesh position={position} scale={scale} receiveShadow castShadow {...props}>
      <boxGeometry />
      <meshStandardMaterial color={color} metalness={0.55} roughness={0.68} emissive={emissive || "#000000"} emissiveIntensity={emissive ? 1.5 : 0} />
    </mesh>
  );
}

function Architecture({ compact }) {
  return (
    <group>
      <Block position={[0, -0.6, 0]} scale={[18, 0.8, 13]} color="#252627" />
      <Block position={[0, -1.2, 0]} scale={[19.2, 0.3, 14.2]} color="#111313" />
      <Block position={[0, -0.15, 0]} scale={[13.5, 0.1, 9]} color="#303232" />
      {[-1, 1].map((side) => (
        <group key={side}>
          <Block position={[side * 8.3, 0, 0]} scale={[0.12, 0.08, 11]} color={ORANGE} emissive={ORANGE} />
          <Block position={[side * 6.8, 0, 5]} scale={[3.8, 0.08, 0.13]} color={ORANGE} emissive={ORANGE} />
          {[-4, 2].map((z) => (
            <group key={z}>
              <Block position={[side * 8, 3.3, z]} scale={[0.6, 7, 0.75]} />
              <Block position={[side * 7.65, 3.2, z + 0.4]} scale={[0.055, 4.8, 0.05]} color="#b7b4a8" emissive="#b7b4a8" />
            </group>
          ))}
          <Block position={[side * 6.8, 0.4, -5]} scale={[3.2, 1.2, 1]} />
        </group>
      ))}
      <Block position={[0, 6.8, -4]} scale={[16.5, 0.6, 0.8]} />
      <Block position={[0, 6.45, -3.55]} scale={[12, 0.05, 0.06]} color={ORANGE} emissive={ORANGE} />
      <Block position={[0, 1.8, -5.8]} scale={[10.6, 4, 0.5]} color="#1a1c1c" />
      {Array.from({ length: compact ? 5 : 11 }, (_, i) => (
        <Block key={i} position={[(i - (compact ? 2 : 5)) * 2.8, 2.2 + (i % 3), -11 - (i % 2) * 3]} scale={[1.5, 5 + (i % 3) * 2, 2]} color="#1c2020" />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <Block key={i} position={[0, -0.08, 3.2 + i * 0.25]} scale={[2.4, 0.035, 0.035]} color="#82827a" />
      ))}
      <mesh position={[0, 0.12, 0]} receiveShadow>
        <cylinderGeometry args={[2.8, 3.2, 0.45, 12]} />
        <meshStandardMaterial color="#393c3c" metalness={0.65} roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.4, 2.44, 64]} />
        <meshBasicMaterial color={ORANGE} />
      </mesh>
    </group>
  );
}

function Core({ reduced, active }) {
  const rotor = useRef();
  useFrame((state, delta) => {
    if (rotor.current && !reduced && active) rotor.current.rotation.y += Math.min(delta, 0.05) * 0.12;
  });
  return (
    <group position={[0, 2.5, -0.5]}>
      <group ref={rotor}>
        <mesh castShadow rotation={[0.2, 0, Math.PI / 4]}>
          <octahedronGeometry args={[1.35, 0]} />
          <meshStandardMaterial color="#45494a" metalness={0.72} roughness={0.4} />
          <Edges color="#f5d4b1" threshold={10} />
        </mesh>
        <mesh rotation={[Math.PI / 2.6, 0.2, 0]}>
          <torusGeometry args={[1.9, 0.075, 8, 64]} />
          <meshStandardMaterial color={ORANGE} emissive={ORANGE} emissiveIntensity={1.2} />
        </mesh>
        <mesh rotation={[0.4, Math.PI / 2, 0]}>
          <torusGeometry args={[2.12, 0.13, 6, 48]} />
          <meshStandardMaterial color="#70736c" metalness={0.65} roughness={0.4} />
        </mesh>
      </group>
      <Block position={[0, -1.8, 0]} scale={[0.6, 0.7, 0.6]} color={ORANGE} emissive={ORANGE} />
    </group>
  );
}

function Terminal({ position, title, code, selected, onSelect, onHover, compact }) {
  const [hovered, setHovered] = useState(false);
  const lit = hovered || selected;
  return (
    <group position={position}
      onPointerOver={(event) => { event.stopPropagation(); setHovered(true); onHover(title); }}
      onPointerOut={() => { setHovered(false); onHover(""); }}
      onClick={(event) => { event.stopPropagation(); onSelect(); }}>
      <Block position={[0, 0.45, 0]} scale={[0.45, 1.1, 0.45]} />
      <Block position={[0, 0.05, 0]} scale={[2.2, 0.15, 1.1]} />
      <mesh position={[0, 1.5, 0]} rotation={[-0.12, 0, 0]} castShadow>
        <boxGeometry args={[2.75, 1.8, 0.24]} />
        <meshStandardMaterial color={lit ? "#46413a" : "#262a29"} metalness={0.4} roughness={0.65} />
        <Edges color={lit ? "#FF7A2F" : "#77796f"} />
        <Block position={[0, 0, 0.14]} scale={[2.46, 1.48, 0.04]} color={lit ? "#b95318" : "#30251d"} emissive={lit ? "#762b0d" : "#29180b"} />
        {[-0.4, -0.15, 0.1].map((y, i) => (
          <Block key={y} position={[-0.1, y, 0.18]} scale={[1.7 - i * 0.35, 0.025, 0.02]} color={lit ? "#fff1cc" : "#b58159"} emissive="#5e351a" />
        ))}
        <Block position={[-1, 0.55, 0.18]} scale={[0.12, 0.12, 0.02]} color={ORANGE} emissive={ORANGE} />
      </mesh>
      {!compact && <SceneLabel position={[0, 2.85, 0]} text={`${code} ${title}`} selected={lit} />}
    </group>
  );
}

const NODE_POSITIONS = [[-4.8, 3.8, 0], [0, 4.9, -0.5], [4.8, 3.8, 0], [-4.8, 0.9, 1], [0, -0.2, 1], [4.8, 0.9, 1]];

function TechnologyNetwork({ selection, onSelect, onHover }) {
  const [hover, setHover] = useState(null);
  const activeId = hover || selection?.categoryId;
  const category = skillsCategories.find((item) => item.id === selection?.categoryId);
  return (
    <group position={[0, 1.7, 0]}>
      <mesh position={[0, 2.2, 0]}><icosahedronGeometry args={[0.5, 0]} /><meshStandardMaterial color="#F26A21" emissive="#F26A21" emissiveIntensity={0.6} /><Edges color="#ffe0b2" /></mesh>
      {skillsCategories.map((item, index) => {
        const pos = NODE_POSITIONS[index];
        const lit = item.id === activeId;
        return (
          <group key={item.id}>
            <Line points={[[0, 2.2, 0], pos]} color={lit ? "#FF7A2F" : "#656760"} lineWidth={lit ? 2 : 1} />
            <mesh position={pos}
              onPointerOver={(e) => { e.stopPropagation(); setHover(item.id); onHover(item.title); }}
              onPointerOut={() => { setHover(null); onHover(""); }}
              onClick={(e) => { e.stopPropagation(); onSelect({ categoryId: item.id, skillName: item.skills[0].name }); }}>
              <boxGeometry args={[2.5, 1, 0.4]} />
              <meshStandardMaterial color={lit ? "#654027" : "#353a39"} emissive={lit ? "#5a2508" : "#000000"} />
              <Edges color={lit ? "#FF7A2F" : "#999c91"} />
            </mesh>
            <SceneLabel position={[pos[0], pos[1], pos[2] + 0.3]} text={item.title} selected={lit} />
          </group>
        );
      })}
      {category?.skills.map((skill, index) => {
        const x = (index - (category.skills.length - 1) / 2) * 1.95;
        const pos = [x, -1.5, 3.4];
        const parent = NODE_POSITIONS[skillsCategories.indexOf(category)];
        const selected = skill.name === selection?.skillName;
        return (
          <group key={skill.name}>
            <Line points={[parent, pos]} color={selected ? "#FF7A2F" : "#53564f"} lineWidth={1} />
            <mesh position={pos}
              onPointerOver={(e) => { e.stopPropagation(); onHover(skill.name); }}
              onPointerOut={() => onHover("")}
              onClick={(e) => { e.stopPropagation(); onSelect({ categoryId: category.id, skillName: skill.name }); }}>
              <octahedronGeometry args={[0.3, 0]} /><meshStandardMaterial color={selected ? "#FF7A2F" : "#aaa89b"} />
            </mesh>
            <SceneLabel position={[x, -1.95, 3.4]} text={skill.name} width={1.8} selected={selected} />
          </group>
        );
      })}
    </group>
  );
}

function SceneContents({ mode, reduced, compact, active, selection, onSelect, onNavigate, onHover, onSlow }) {
  const frames = useRef({ count: 0, elapsed: 0, reported: false });
  useFrame((_, delta) => {
    const sample = frames.current;
    if (!active || reduced || sample.reported) return;
    sample.count++;
    sample.elapsed += Math.min(delta, 0.2);
    if (sample.count > 150) {
      sample.reported = true;
      if (sample.elapsed / sample.count > 0.065) onSlow();
    }
  });
  const terminalPositions = [[-4.8, 0, 2], [-1.7, 0, 3], [1.7, 0, 3], [4.8, 0, 2]];
  const destinations = [{ title: "PROFILE", href: "/profile" }, { title: "PROJECTS", href: "/projects" }, { title: "SKILLS", href: "/skills" }, { title: "CONTACT", href: "/contact" }];
  return (
    <>
      <color attach="background" args={["#080a0b"]} />
      <fog attach="fog" args={["#080a0b", 25, 65]} />
      <ambientLight intensity={1.1} />
      <hemisphereLight args={["#ede5d4", "#292c30", 2]} />
      <directionalLight position={[4, 12, 8]} intensity={3.2} color="#fff2d7" castShadow={!compact} shadow-mapSize={[1024, 1024]} shadow-camera-left={-12} shadow-camera-right={12} shadow-camera-top={12} shadow-camera-bottom={-12} shadow-bias={-0.001} />
      <pointLight position={[-5, 4, 4]} color="#ff852e" intensity={32} distance={18} />
      <pointLight position={[3, 6, -2]} color="#e5e2da" intensity={22} distance={18} />
      <CameraRig mode={mode} reduced={reduced} compact={compact} active={active} />
      <Architecture compact={compact} />
      {mode !== "skills" && <Core reduced={reduced} active={active} />}
      {mode === "skills" ? <TechnologyNetwork selection={selection} onSelect={onSelect} onHover={onHover} /> :
        (mode === "projects" ? projectsData : destinations).map((item, i) => (
          <Terminal key={item.id || item.href} title={item.title} code={`0${i + 1}`} position={terminalPositions[i]} compact={compact}
            selected={selection?.projectId === item.id || mode === item.href?.slice(1)}
            onHover={onHover}
            onSelect={() => mode === "projects" ? onSelect({ projectId: item.id }) : onNavigate(item.href)} />
        ))}
    </>
  );
}

function ContextMonitor({ onFailure }) {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", onFailure);
    return () => canvas.removeEventListener("webglcontextlost", onFailure);
  }, [gl, onFailure]);
  return null;
}

export default function WorldScene({ onFailure, ...props }) {
  return (
    <Canvas shadows={props.compact ? false : "basic"} dpr={props.compact ? 1 : [1, 1.5]}
      frameloop={props.active && !props.reduced ? "always" : "demand"}
      camera={{ position: [11, 8, 17], fov: 45, near: 0.1, far: 100 }}
      gl={{ antialias: !props.compact, alpha: false, powerPreference: "low-power" }}>
      <ContextMonitor onFailure={onFailure} />
      <SceneContents {...props} />
    </Canvas>
  );
}

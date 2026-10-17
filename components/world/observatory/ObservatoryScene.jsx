"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { AdditiveBlending, DoubleSide, Vector3 } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { Vector2 } from "three";
import { Architecture, Machinery, Turbine, usePlateTexture } from "./IndustrialStructures";
import { ConnectingSpine, Destinations } from "./Destinations";
import { interpolateCamera } from "./journey";

function Camera({ active, compact, reduced, progress }) {
  const { camera, pointer, invalidate } = useThree();
  const time = useRef(0);
  const first = useRef(true);
  const destination = useMemo(() => new Vector3(), []);
  const target = useMemo(() => new Vector3(), []);
  useEffect(() => { first.current = true; invalidate(); }, [compact, invalidate]);
  useEffect(() => {
    const update = () => invalidate();
    window.addEventListener("observatory-camera-update", update);
    return () => window.removeEventListener("observatory-camera-update", update);
  }, [invalidate]);
  useFrame((_, delta) => {
    if (active) time.current += Math.min(delta, .05);
    const t = time.current;
    const value = reduced ? Math.round(progress.current) : progress.current;
    const frame = interpolateCamera(value, compact);
    destination.set(...frame.position);
    target.set(...frame.target);
    if (!reduced) {
      const arc = Math.sin((value % 1) * Math.PI);
      destination.y += arc * (value < 1 ? 10 : .6);
      destination.x += arc * (value < 1 ? 4 : .4);
    }
    if (active && !compact) {
      destination.x += pointer.x * .6 + Math.sin(t * .055) * .5;
      destination.y += pointer.y * .25 + Math.sin(t * .08) * .2;
    }
    const alpha = reduced || first.current ? 1 : 1 - Math.exp(-5 * Math.min(delta, .05));
    camera.position.lerp(destination, alpha);
    const look = camera.userData.observatoryLook || (camera.userData.observatoryLook = target.clone());
    look.lerp(target, alpha);
    first.current = false;
    camera.lookAt(look);
    if (camera.position.distanceTo(destination) > .005 || look.distanceTo(target) > .005) invalidate();
  });
  return null;
}

function Atmosphere({ active, compact, progress }) {
  const points = useRef();
  const time = useRef(0);
  const positions = useMemo(() => {
    const count = compact ? 45 : 130;
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      data[i * 3] = ((i * 7.919) % 30) - 15;
      data[i * 3 + 1] = ((i * 3.71) % 23);
      data[i * 3 + 2] = -((i * 11.131) % 65);
    }
    return data;
  }, [compact]);
  useFrame((_, delta) => {
    if (active) time.current += Math.min(delta, .05);
    points.current.position.y = Math.sin(time.current * .08) * .7;
    points.current.position.x = Math.sin(time.current * .04) * .5;
    points.current.position.z = -progress.current * 90;
  });
  return <points ref={points}>
    <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
    <pointsMaterial color="#dac599" size={.035} transparent opacity={.4} depthWrite={false} sizeAttenuation />
  </points>;
}

function LightShaft({ position, rotation }) {
  return <mesh position={position} rotation={rotation}>
    <coneGeometry args={[4.5, 26, 32, 1, true]} />
    <shaderMaterial transparent depthWrite={false} side={DoubleSide} blending={AdditiveBlending}
      vertexShader={`varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`}
      fragmentShader={`varying vec2 vUv; void main(){float edge=pow(sin(vUv.x*3.14159265),3.);float fade=pow(vUv.y,2.)*(1.-smoothstep(.85,1.,vUv.y));gl_FragColor=vec4(.68,.64,.48,edge*fade*.045);}`} />
  </mesh>;
}

function RenderPipeline({ economy, onReady }) {
  const { gl, scene, camera, size, invalidate } = useThree();
  const pipeline = useMemo(() => {
    if (economy) return null;
    const composer = new EffectComposer(gl);
    const render = new RenderPass(scene, camera);
    const bloom = new UnrealBloomPass(new Vector2(1, 1), .18, .35, 1.8);
    const output = new OutputPass();
    composer.addPass(render); composer.addPass(bloom); composer.addPass(output);
    return { composer, bloom, output };
  }, [gl, scene, camera, economy]);
  useEffect(() => {
    pipeline?.composer.setSize(size.width, size.height);
    invalidate();
  }, [pipeline, size, invalidate]);
  useEffect(() => () => { pipeline?.bloom.dispose(); pipeline?.output.dispose(); pipeline?.composer.dispose(); }, [pipeline]);
  const frames = useRef(0);
  useFrame((_, delta) => {
    if (pipeline) pipeline.composer.render(delta); else gl.render(scene, camera);
    if (++frames.current === 2) onReady();
    if (frames.current < 3) invalidate();
  }, 1);
  return null;
}

function Scene({ active, compact, economy, reduced, progress, currentIndex, selection, onSkill, onInspect, onContact, onReady, onFailure, onSlow }) {
  const texture = usePlateTexture();
  const { gl, invalidate } = useThree();
  const samples = useRef({ elapsed: 0, count: 0 });
  const sunlight = useRef();
  const keylight = useRef();
  useEffect(() => {
    gl.domElement.addEventListener("webglcontextlost", onFailure);
    return () => gl.domElement.removeEventListener("webglcontextlost", onFailure);
  }, [gl, onFailure]);
  useEffect(() => { invalidate(); }, [active, economy, invalidate]);
  useFrame((_, delta) => {
    const z = -progress.current * 90;
    sunlight.current.position.z = z + 12;
    sunlight.current.target.position.set(5, 3, z - 12);
    sunlight.current.target.updateMatrixWorld();
    keylight.current.position.z = z;
    keylight.current.target.position.set(5, 0, z - 6);
    keylight.current.target.updateMatrixWorld();
    if (!active || economy) return;
    const sample = samples.current;
    sample.count++;
    if (sample.count > 60) sample.elapsed += delta;
    if (sample.count === 240 && sample.elapsed / 180 > .05) onSlow();
  });
  return <>
    <color attach="background" args={["#141c1e"]} />
    <fog attach="fog" args={["#192326", 30, 125]} />
    <ambientLight intensity={.45} />
    <hemisphereLight args={["#c6d5d6", "#1b1712", 1.4]} />
    <directionalLight ref={sunlight} position={[-15, 32, 12]} color="#c5d8d9" intensity={3.2} castShadow={!economy && !compact}
      shadow-mapSize={[1024, 1024]} shadow-camera-left={-30} shadow-camera-right={30} shadow-camera-top={30} shadow-camera-bottom={-30} shadow-camera-far={100} shadow-bias={-.001} />
    <spotLight ref={keylight} position={[3, 25, 0]} angle={.6} penumbra={.7} intensity={650} distance={65} color="#ffcf83" />
    <Environment resolution={128} frames={1}>
      <Lightformer position={[0, 15, -8]} rotation={[Math.PI / 2, 0, 0]} scale={[30, 16, 1]} intensity={2} color="#d6e1de" />
      <Lightformer position={[20, 5, 0]} rotation={[0, -Math.PI / 2, 0]} scale={[8, 25, 1]} intensity={3} color="#ffbd67" />
    </Environment>
    <group visible={currentIndex < 2}>
      <Architecture texture={texture} compact={compact || economy} />
      <Turbine active={active} texture={texture} />
      <Machinery active={active} texture={texture} />
      {!economy && <><LightShaft position={[-8, 12, -23]} rotation={[0, 0, -.22]} /><LightShaft position={[7, 12, -44]} rotation={[0, 0, .2]} /></>}
    </group>
    <ConnectingSpine texture={texture} />
    <Destinations texture={texture} active={active} currentIndex={currentIndex} selection={selection} onSkill={onSkill} onInspect={onInspect} onContact={onContact} />
    <Atmosphere active={active} compact={compact || economy} progress={progress} />
    <Camera active={active} compact={compact} reduced={reduced} progress={progress} />
    <RenderPipeline economy={economy || compact} onReady={onReady} />
  </>;
}

export default function ObservatoryScene(props) {
  return <Canvas dpr={props.compact || props.economy ? 1 : [1, 1.5]} shadows={props.compact || props.economy ? false : "basic"}
    camera={{ fov: 50, near: .2, far: 180, position: [12, 9, 20] }}
    frameloop={props.active ? "always" : "demand"}
    gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}>
    <Scene {...props} />
  </Canvas>;
}

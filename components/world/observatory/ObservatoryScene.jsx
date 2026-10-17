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
import { TransitCorridor } from "./TransitCorridor";
import { ConnectingSpine, Destinations } from "./Destinations";
import { cameraStop, journey } from "./journey";
import { zoomedPosition, zoomLimits } from "./viewControls";
import { sampleTravel, travelParameter } from "./travel";

function Camera({ compact, progress, zoom, motion, cameraState, onArrival }) {
  const { camera, gl, invalidate } = useThree();
  const first = useRef(true);
  const zoomValue = useRef(zoom);
  const destination = useMemo(() => new Vector3(), []);
  const target = useMemo(() => new Vector3(), []);
  const direction = useMemo(() => new Vector3(), []);
  useEffect(() => { invalidate(); }, [compact, invalidate]);
  useEffect(() => { invalidate(); }, [zoom, invalidate]);
  useEffect(() => {
    const update = () => invalidate();
    window.addEventListener("observatory-camera-update", update);
    return () => window.removeEventListener("observatory-camera-update", update);
  }, [invalidate]);
  useFrame((_, delta) => {
    const travel = motion.current;
    let frame;
    let finished = false;
    if (travel) {
      travel.startedAt ??= performance.now();
      const fraction = Math.min(1, (performance.now() - travel.startedAt) / travel.duration);
      frame = sampleTravel(travel, fraction);
      travel.parameter = travelParameter(travel, fraction);
      zoomValue.current = 1;
      finished = fraction === 1;
      invalidate();
    } else {
      const base = cameraStop(Math.round(progress.current), compact);
      zoomValue.current += (zoom - zoomValue.current) * (1 - Math.exp(-10 * Math.min(delta, .05)));
      if (Math.abs(zoomValue.current - zoom) < .0001) zoomValue.current = zoom;
      frame = { ...base, position: zoomedPosition(base.position, base.target, zoomValue.current, zoomLimits(journey[Math.round(progress.current)].id)) };
    }
    destination.set(...frame.position);
    target.set(...frame.target);
    const alpha = travel || first.current ? 1 : 1 - Math.exp(-12 * Math.min(delta, .05));
    camera.position.lerp(destination, alpha);
    camera.fov = frame.fov;
    camera.updateProjectionMatrix();
    camera.lookAt(target);
    cameraState.current = { position: camera.position.toArray(), target: target.toArray(), fov: camera.fov };
    gl.domElement.dataset.cameraPosition = camera.position.toArray().map((v) => v.toFixed(3)).join(",");
    gl.domElement.dataset.cameraDirection = camera.getWorldDirection(direction).toArray().map((v) => v.toFixed(5)).join(",");
    gl.domElement.dataset.travel = travel ? "travelling" : "idle";
    first.current = false;
    if (finished && motion.current === travel) { motion.current = null; onArrival(); }
    if (camera.position.distanceTo(destination) > .0001 || Math.abs(zoomValue.current - zoom) > .0001) invalidate();
  });
  return null;
}

function Atmosphere({ active, compact }) {
  const { camera } = useThree();
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
    points.current.position.z = camera.position.z - 22;
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

function Scene({ active, compact, economy, reduced, progress, currentIndex, selection, onSkill, onInspect, onContact, onReady, onFailure, onSlow, zoom, motion, cameraState, mountedStops, onArrival }) {
  const texture = usePlateTexture();
  const { gl, camera, invalidate } = useThree();
  const samples = useRef({ elapsed: 0, count: 0 });
  const sunlight = useRef();
  const keylight = useRef();
  const homeArchitecture = useRef();
  useEffect(() => {
    gl.domElement.addEventListener("webglcontextlost", onFailure);
    return () => gl.domElement.removeEventListener("webglcontextlost", onFailure);
  }, [gl, onFailure]);
  useEffect(() => { invalidate(); }, [active, economy, invalidate]);
  useFrame((_, delta) => {
    homeArchitecture.current.visible = mountedStops.includes(0) && (currentIndex === 0 || camera.position.x < 27 && camera.position.z > 0);
    const z = camera.position.z - 22;
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
    <color attach="background" args={["#344b51"]} />
    <fog attach="fog" args={["#344b51", 55, 170]} />
    <ambientLight intensity={.7} />
    <hemisphereLight args={["#d9e1dc", "#302c23", 1.8]} />
    <directionalLight ref={sunlight} position={[-15, 32, 12]} color="#c5d8d9" intensity={3.2} castShadow={!economy && !compact}
      shadow-mapSize={[1024, 1024]} shadow-camera-left={-30} shadow-camera-right={30} shadow-camera-top={30} shadow-camera-bottom={-30} shadow-camera-far={100} shadow-bias={-.001} />
    <spotLight ref={keylight} position={[3, 25, 0]} angle={.6} penumbra={.7} intensity={650} distance={65} color="#ffcf83" />
    <Environment resolution={128} frames={1}>
      <Lightformer position={[0, 15, -8]} rotation={[Math.PI / 2, 0, 0]} scale={[30, 16, 1]} intensity={2} color="#d6e1de" />
      <Lightformer position={[20, 5, 0]} rotation={[0, -Math.PI / 2, 0]} scale={[8, 25, 1]} intensity={3} color="#ffbd67" />
    </Environment>
    <group ref={homeArchitecture} visible={mountedStops.includes(0)}>
      <Architecture texture={texture} compact={compact || economy} />
      <Turbine active={active} texture={texture} />
      <Machinery active={active} texture={texture} />
      {!economy && <><LightShaft position={[-8, 12, -23]} rotation={[0, 0, -.22]} /><LightShaft position={[7, 12, -44]} rotation={[0, 0, .2]} /></>}
    </group>
    <ConnectingSpine texture={texture} />
    <TransitCorridor texture={texture} active={active} compact={compact || economy} />
    <WorldEnvelope />
    <Destinations texture={texture} active={active} currentIndex={currentIndex} mountedStops={mountedStops} selection={selection} onSkill={onSkill} onInspect={onInspect} onContact={onContact} />
    <Atmosphere active={active} compact={compact || economy} />
    <Camera compact={compact} progress={progress} zoom={zoom} motion={motion} cameraState={cameraState} onArrival={onArrival} />
    <RenderPipeline economy={economy || compact} onReady={onReady} />
  </>;
}

function WorldEnvelope() {
  const structures = useMemo(() => Array.from({ length: 48 }, (_, i) => ({
    x: i % 2 ? -44 - i % 4 * 5 : 48 + i % 3 * 6,
    z: 25 - Math.floor(i / 2) * 46,
    height: 18 + i * 7 % 24,
  })), []);
  return <group>
    <mesh position={[0, -5, -450]}><boxGeometry args={[180, 2, 1120]} /><meshStandardMaterial color="#364a48" roughness={.8} /></mesh>
    {structures.map((item, i) => <group key={i} position={[item.x, -4, item.z]}>
      <mesh position={[0, item.height / 2, 0]}><boxGeometry args={[10, item.height, 15]} /><meshStandardMaterial color={i % 3 ? "#52686a" : "#78817a"} roughness={.65} metalness={.35} /></mesh>
      <mesh position={[0, item.height - 3, 7.6]}><boxGeometry args={[7, .2, .12]} /><meshBasicMaterial color={i % 2 ? "#b3d9dd" : "#efba75"} /></mesh>
    </group>)}
    {Array.from({ length: 12 }, (_, i) => <mesh key={i} position={[0, 34, 20 - i * 90]}><boxGeometry args={[110, .6, 1]} /><meshStandardMaterial color="#71837f" metalness={.5} roughness={.6} /></mesh>)}
  </group>;
}

export default function ObservatoryScene(props) {
  return <Canvas dpr={props.compact || props.economy ? 1 : [1, 1.5]} shadows={props.compact || props.economy ? false : "basic"}
    camera={{ fov: 50, near: .2, far: 180, position: [12, 9, 20] }}
    frameloop={props.active ? "always" : "demand"}
    gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}>
    <Scene {...props} />
  </Canvas>;
}

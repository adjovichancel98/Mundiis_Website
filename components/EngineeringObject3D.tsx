"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import * as THREE from "three";
import { useMediaQuery } from "@/lib/useMediaQuery";

const NODE_COUNT = 5;

function OrbitNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = useMemo(
    () =>
      Array.from({ length: NODE_COUNT }, (_, i) => ({
        radius: 2.1 + (i % 2) * 0.35,
        speed: 0.25 + i * 0.06,
        offset: (i / NODE_COUNT) * Math.PI * 2,
        tilt: (i % 3) * 0.6,
      })),
    [],
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    nodes.forEach((n, i) => {
      const child = groupRef.current!.children[i];
      const t = state.clock.elapsedTime * n.speed + n.offset;
      child.position.set(Math.cos(t) * n.radius, Math.sin(t) * n.radius * 0.6, Math.sin(t + n.tilt) * n.radius * 0.4);
    });
  });

  return (
    <group ref={groupRef}>
      {nodes.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshStandardMaterial color="#ff5c39" emissive="#ff5c39" emissiveIntensity={1.4} />
        </mesh>
      ))}
    </group>
  );
}

function Core({ interactive, target }: { interactive: boolean; target: React.RefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current || !wireRef.current) return;
    const baseRotation = delta * 0.15;
    meshRef.current.rotation.y += baseRotation;
    meshRef.current.rotation.x += baseRotation * 0.4;
    wireRef.current.rotation.y -= baseRotation * 0.6;

    if (interactive) {
      meshRef.current.rotation.x += target.current.y * 0.02;
      meshRef.current.rotation.y += target.current.x * 0.02;
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial color="#1b1d22" metalness={0.85} roughness={0.25} emissive="#ff5c39" emissiveIntensity={0.05} />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.85, 1]} />
        <meshBasicMaterial color="#ff5c39" wireframe transparent opacity={0.14} />
      </mesh>
    </>
  );
}

function Scene({ interactive, target }: { interactive: boolean; target: React.RefObject<{ x: number; y: number }> }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 2]} intensity={1.1} />
      <pointLight position={[-3, -2, 2]} intensity={6} color="#ff5c39" />
      <Core interactive={interactive} target={target} />
      <OrbitNodes />
    </>
  );
}

export default function EngineeringObject3D() {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const target = useRef({ x: 0, y: 0 });

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    target.current.x = (e.clientX - rect.left) / rect.width - 0.5;
    target.current.y = (e.clientY - rect.top) / rect.height - 0.5;
  }

  return (
    <div
      aria-hidden="true"
      onPointerMove={reduceMotion ? undefined : handlePointerMove}
      className="aspect-square w-full"
    >
      <Canvas camera={{ position: [0, 0, 5.5], fov: 42 }} dpr={[1, 1.5]}>
        <Scene interactive={!reduceMotion} target={target} />
      </Canvas>
    </div>
  );
}

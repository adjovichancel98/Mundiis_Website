"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type ShapeConfig = {
  position: [number, number, number];
  scale: number;
  speed: number;
  phase: number;
  geometry: "icosahedron" | "octahedron" | "tetrahedron";
};

const SHAPES: ShapeConfig[] = [
  { position: [-2.6, 0.6, 0], scale: 0.85, speed: 0.35, phase: 0, geometry: "icosahedron" },
  { position: [2.4, -0.4, -1], scale: 0.55, speed: 0.5, phase: 2.1, geometry: "octahedron" },
  { position: [0.4, 1.1, -0.6], scale: 0.4, speed: 0.6, phase: 4.2, geometry: "tetrahedron" },
];

function Shape({ config }: { config: ShapeConfig }) {
  const ref = useRef<THREE.Mesh>(null);
  const baseY = config.position[1];

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.12;
    ref.current.rotation.y += delta * 0.18;
    ref.current.position.y = baseY + Math.sin(state.clock.elapsedTime * config.speed + config.phase) * 0.25;
  });

  return (
    <mesh ref={ref} position={config.position} scale={config.scale}>
      {config.geometry === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
      {config.geometry === "octahedron" && <octahedronGeometry args={[1, 0]} />}
      {config.geometry === "tetrahedron" && <tetrahedronGeometry args={[1, 0]} />}
      <meshBasicMaterial color="#ff5c39" wireframe transparent opacity={0.5} />
    </mesh>
  );
}

export default function FloatingShapes3D() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <Canvas orthographic camera={{ zoom: 90, position: [0, 0, 100] }} dpr={[1, 1.5]}>
        {SHAPES.map((s, i) => (
          <Shape key={i} config={s} />
        ))}
      </Canvas>
    </div>
  );
}

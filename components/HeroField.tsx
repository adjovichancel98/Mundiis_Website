"use client";

import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import * as THREE from "three";

const GradientFieldMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uInk: new THREE.Color("#111214"),
    uCoral: new THREE.Color("#ff5c39"),
  },
  /* glsl vertex */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* glsl fragment */ `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec3 uInk;
    uniform vec3 uCoral;
    varying vec2 vUv;

    float grain(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    void main() {
      vec2 center = vec2(0.5, 0.45) + uMouse * 0.06;
      float dist = distance(vUv, center);
      float glow = smoothstep(0.9, 0.0, dist);
      vec3 color = mix(uInk, uCoral, glow * 0.35);
      float n = (grain(vUv * 500.0 + uTime * 6.0) - 0.5) * 0.035;
      gl_FragColor = vec4(color + n, 1.0);
    }
  `,
);

extend({ GradientFieldMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    gradientFieldMaterial: {
      ref?: React.Ref<THREE.ShaderMaterial>;
    };
  }
}

function Field({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const materialRef = useRef<THREE.ShaderMaterial & { uniforms: { [key: string]: THREE.IUniform } }>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    const material = materialRef.current;
    if (!material) return;
    material.uniforms.uTime.value = state.clock.elapsedTime;
    (material.uniforms.uMouse.value as THREE.Vector2).set(mouse.current.x, mouse.current.y);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <gradientFieldMaterial ref={materialRef} />
    </mesh>
  );
}

export default function HeroField() {
  const mouse = useRef({ x: 0, y: 0 });

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current.x = (e.clientX - rect.left) / rect.width - 0.5;
    mouse.current.y = -((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <div aria-hidden="true" onPointerMove={handlePointerMove} className="absolute inset-0">
      <Canvas orthographic camera={{ zoom: 100, position: [0, 0, 100] }} dpr={[1, 1.5]}>
        <Field mouse={mouse} />
      </Canvas>
    </div>
  );
}

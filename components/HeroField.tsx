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

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453123);
    }

    void main() {
      vec2 uv = vUv;
      float spacing = 9.0;
      vec2 gridUv = uv * spacing;
      vec2 cellId = floor(gridUv + 0.5);
      vec2 cellPos = gridUv - cellId;
      float distToNode = length(cellPos);

      vec2 gf = fract(gridUv);
      float lx = 1.0 - smoothstep(0.0, 0.015, min(gf.x, 1.0 - gf.x));
      float ly = 1.0 - smoothstep(0.0, 0.015, min(gf.y, 1.0 - gf.y));
      float lines = clamp(lx + ly, 0.0, 1.0);

      float phase = hash(cellId) * 6.2831;
      float pulse = 0.5 + 0.5 * sin(uTime * 0.5 + phase);
      float node = smoothstep(0.07, 0.0, distToNode) * (0.15 + 0.25 * pulse);

      vec2 mouseUv = vec2(0.5, 0.5) + uMouse;
      float distToMouse = distance(uv, mouseUv);
      float mouseGlow = smoothstep(0.28, 0.0, distToMouse);
      node += node * mouseGlow * 2.2;
      lines *= (0.3 + mouseGlow * 1.3);

      float vignette = 1.0 - distance(uv, vec2(0.5)) * 0.55;

      vec3 color = uInk;
      color += uCoral * lines * 0.035;
      color += uCoral * node * 0.45;
      color *= vignette;

      float grain = (hash(uv * 500.0 + fract(uTime)) - 0.5) * 0.012;
      color += grain;

      gl_FragColor = vec4(color, 1.0);
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

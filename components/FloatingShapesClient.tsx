"use client";

import dynamic from "next/dynamic";
import HeroFieldBoundary from "@/components/HeroFieldBoundary";
import { useMediaQuery } from "@/lib/useMediaQuery";

const FloatingShapes3D = dynamic(() => import("@/components/FloatingShapes3D"), { ssr: false });

export default function FloatingShapesClient() {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (reduceMotion) return null;

  return (
    <HeroFieldBoundary fallback={null}>
      <FloatingShapes3D />
    </HeroFieldBoundary>
  );
}

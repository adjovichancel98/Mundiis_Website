"use client";

import dynamic from "next/dynamic";
import HeroFieldBoundary from "@/components/HeroFieldBoundary";

const EngineeringObject3D = dynamic(() => import("@/components/EngineeringObject3D"), { ssr: false });

function StaticObject() {
  return (
    <div
      aria-hidden="true"
      className="aspect-square w-full rounded-full bg-[radial-gradient(circle_at_40%_35%,rgba(255,92,57,0.3),transparent_65%)]"
    />
  );
}

export default function EngineeringObjectClient() {
  return (
    <HeroFieldBoundary fallback={<StaticObject />}>
      <EngineeringObject3D />
    </HeroFieldBoundary>
  );
}

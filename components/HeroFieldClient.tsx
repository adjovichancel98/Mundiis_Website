"use client";

import dynamic from "next/dynamic";
import HeroFieldBoundary from "@/components/HeroFieldBoundary";
import { useMediaQuery } from "@/lib/useMediaQuery";

const HeroField = dynamic(() => import("@/components/HeroField"), { ssr: false });

export function StaticHeroField() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(243,241,236,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(243,241,236,0.5) 1px, transparent 1px)",
          backgroundSize: "110px 110px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,92,57,0.08),transparent_70%)]" />
    </div>
  );
}

export default function HeroFieldClient() {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (reduceMotion) return <StaticHeroField />;

  return (
    <HeroFieldBoundary fallback={<StaticHeroField />}>
      <HeroField />
    </HeroFieldBoundary>
  );
}

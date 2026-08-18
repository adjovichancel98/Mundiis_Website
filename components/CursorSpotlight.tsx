"use client";

import { useRef } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Discrete "flashlight" glow that follows the pointer across a dark section. */
export default function CursorSpotlight({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    ref.current?.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    ref.current?.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={reduceMotion ? undefined : handlePointerMove}
      className={`group relative ${className}`}
    >
      {!reduceMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255,92,57,0.10), transparent 70%)",
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

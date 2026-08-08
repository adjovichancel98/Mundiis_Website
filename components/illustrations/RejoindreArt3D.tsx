"use client";

import { useEffect } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { useMediaQuery } from "@/lib/useMediaQuery";

function useDepthLayer(
  depth: number,
  pointerFine: boolean,
  reduceMotion: boolean,
  floatRange: number,
  floatDuration: number,
  floatDelay: number,
) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 20 });
  const springY = useSpring(y, { stiffness: 120, damping: 20 });

  useEffect(() => {
    if (reduceMotion || pointerFine) return;
    const controls = animate(y, [0, floatRange, 0], {
      duration: floatDuration,
      repeat: Infinity,
      ease: "easeInOut",
      delay: floatDelay,
    });
    return () => controls.stop();
  }, [reduceMotion, pointerFine, y, floatRange, floatDuration, floatDelay]);

  function setFromPointer(nx: number, ny: number) {
    if (reduceMotion || !pointerFine) return;
    x.set(nx * depth);
    y.set(ny * depth);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return { springX, springY, setFromPointer, reset };
}

export default function RejoindreArt3D() {
  const pointerFine = useMediaQuery("(pointer: fine)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const back = useDepthLayer(6, pointerFine, reduceMotion, -4, 8, 0);
  const mid = useDepthLayer(12, pointerFine, reduceMotion, -6, 6.5, 0.3);
  const front = useDepthLayer(20, pointerFine, reduceMotion, -9, 5.5, 0.6);

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    back.setFromPointer(nx, ny);
    mid.setFromPointer(nx, ny);
    front.setFromPointer(nx, ny);
  }

  function handlePointerLeave() {
    back.reset();
    mid.reset();
    front.reset();
  }

  return (
    <div
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative aspect-[4/3] w-full"
    >
      <motion.div
        className="absolute inset-0 opacity-[0.55] blur-[1px]"
        style={{ x: back.springX, y: back.springY }}
      >
        <div className="absolute rounded-full bg-ivory" style={{ left: "45.5%", top: "20.67%", width: "9%", height: "12%" }} />
        <div className="absolute rounded-[10px] bg-ivory" style={{ left: "44%", top: "34.67%", width: "12%", height: "12.67%" }} />
      </motion.div>
      <motion.div className="absolute inset-0" style={{ x: mid.springX, y: mid.springY }}>
        <div
          className="absolute rounded-full bg-ivory"
          style={{ left: "25%", top: "26.67%", width: "15%", height: "20%", boxShadow: "0 14px 28px rgba(243,241,236,0.22)" }}
        />
        <div
          className="absolute rounded-[14px] bg-ivory"
          style={{ left: "22.5%", top: "50%", width: "20%", height: "20%", boxShadow: "0 14px 28px rgba(243,241,236,0.22)" }}
        />
      </motion.div>
      <motion.div className="absolute inset-0" style={{ x: front.springX, y: front.springY }}>
        <div
          className="absolute rounded-full bg-coral"
          style={{ left: "59%", top: "35.33%", width: "12%", height: "16%", boxShadow: "0 18px 36px rgba(255,92,57,0.4)" }}
        />
        <div
          className="absolute rounded-[12px] bg-coral"
          style={{ left: "57%", top: "54%", width: "16%", height: "16.67%", boxShadow: "0 18px 36px rgba(255,92,57,0.4)" }}
        />
      </motion.div>
    </div>
  );
}

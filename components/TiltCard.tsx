"use client";

import { useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/lib/useMediaQuery";

const MAX_TILT = 6;

export default function TiltCard({ title, text }: { title: string; text: string }) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [hovered, setHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 18 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 18 });

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-py * MAX_TILT * 2);
    rotateY.set(px * MAX_TILT * 2);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={handlePointerLeave}
      className="flex items-start gap-3.5 bg-paper px-6 py-6 transition-colors hover:bg-white"
      style={{
        perspective: 800,
        rotateX: reduceMotion ? 0 : springRotateX,
        rotateY: reduceMotion ? 0 : springRotateY,
      }}
      animate={{
        scale: hovered && !reduceMotion ? 1.015 : 1,
        boxShadow:
          hovered && !reduceMotion ? "0 20px 40px rgba(17,18,20,0.14)" : "0 0px 0px rgba(17,18,20,0)",
      }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
    >
      <span className="mt-[7px] h-2 w-2 flex-none rounded-full bg-coral" />
      <div>
        <h3 className="mb-1 text-[15.5px] font-semibold">{title}</h3>
        <p className="text-[13.5px] leading-[1.55] text-muted">{text}</p>
      </div>
    </motion.div>
  );
}

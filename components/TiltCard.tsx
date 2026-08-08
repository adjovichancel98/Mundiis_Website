"use client";

import { useState } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/lib/useMediaQuery";

const MAX_TILT = 6;

export default function TiltCard({ children }: { children: ReactNode }) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const pointerFine = useMediaQuery("(pointer: fine)");
  const interactive = pointerFine && !reduceMotion;
  const [hovered, setHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 18 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 18 });

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!interactive) return;
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
      onPointerEnter={() => interactive && setHovered(true)}
      onPointerLeave={handlePointerLeave}
      className="flex items-start gap-3.5 bg-paper px-6 py-6 transition-colors hover:bg-white"
      style={{
        rotateX: reduceMotion ? 0 : springRotateX,
        rotateY: reduceMotion ? 0 : springRotateY,
      }}
      animate={{
        scale: hovered && interactive ? 1.006 : 1,
        boxShadow:
          hovered && interactive ? "0 20px 40px rgba(17,18,20,0.14)" : "0 0px 0px rgba(17,18,20,0)",
      }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

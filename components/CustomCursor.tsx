"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

export default function CustomCursor() {
  const fine = useMediaQuery("(pointer: fine)");
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = fine && !reduce;

  const [hovering, setHovering] = useState(false);
  const [plain, setPlain] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("has-cursor");

    function move(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }
    function over(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-plain]")) {
        setHovering(false);
        setPlain(true);
        return;
      }
      setPlain(false);
      setHovering(!!target.closest("a, button, .cursor-hover, input, textarea, select"));
    }
    window.addEventListener("mousemove", move);
    document.body.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.removeEventListener("mouseover", over);
      document.body.classList.remove("has-cursor");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
      style={{ x: springX, y: springY, scale: plain ? 0.35 : hovering ? 1.9 : 1 }}
      transition={{ scale: { type: "tween", duration: 0.18 } }}
    >
      {plain ? (
        <span className="h-full w-full rounded-full bg-coral" />
      ) : (
        <span className="h-2 w-2 rounded-full bg-coral" />
      )}
    </motion.div>
  );
}

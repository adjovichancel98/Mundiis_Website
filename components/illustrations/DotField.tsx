"use client";

import { motion } from "framer-motion";

const DOTS = [
  { x: 8, y: 20, size: 5, delay: 0 },
  { x: 22, y: 72, size: 3, delay: 0.6 },
  { x: 40, y: 12, size: 4, delay: 1.2 },
  { x: 58, y: 82, size: 6, delay: 0.3 },
  { x: 76, y: 28, size: 3, delay: 0.9 },
  { x: 92, y: 60, size: 5, delay: 1.5 },
  { x: 15, y: 48, size: 3, delay: 1.8 },
  { x: 66, y: 45, size: 4, delay: 0.45 },
];

/** A quiet field of pulsing dots — decorative, not a metaphor for anything in particular. */
export default function DotField() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {DOTS.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-coral"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
          }}
          initial={{ opacity: 0.15, scale: 0.8 }}
          animate={{ opacity: [0.15, 0.4, 0.15], scale: [0.8, 1.15, 0.8] }}
          transition={{ duration: 4.5, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

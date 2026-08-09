"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode, MouseEvent as ReactMouseEvent } from "react";

const variants = {
  primary: "bg-coral text-ink hover:bg-coral-hover",
  ghost: "border border-white/25 text-ivory hover:border-coral hover:text-coral",
  "ghost-ink": "border border-line text-ink hover:border-coral hover:text-coral",
  ink: "bg-ink text-ivory hover:bg-[#24262c]",
};

type Props = {
  href?: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  type?: "button" | "submit";
};

export default function MagneticButton({
  href,
  children,
  variant = "primary",
  className = "",
  type = "button",
}: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18 });
  const springY = useSpring(y, { stiffness: 260, damping: 18 });

  function handleMove(e: ReactMouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.45);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const cls = `cursor-hover inline-flex items-center gap-2 rounded-lg px-[22px] py-[13px] text-[14.5px] font-semibold transition-colors ${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.div style={{ x: springX, y: springY }} className="inline-block">
        <Link href={href} className={cls} onMouseMove={handleMove} onMouseLeave={handleLeave}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      style={{ x: springX, y: springY }}
      className={cls}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.button>
  );
}

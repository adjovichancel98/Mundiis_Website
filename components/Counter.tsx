"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useMediaQuery } from "@/lib/useMediaQuery";

export default function Counter({ target, className }: { target: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) return;
    let start: number | null = null;
    const duration = 900;
    let raf = 0;
    function step(ts: number) {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setValue(Math.round(p * target));
      if (p < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {reduceMotion && inView ? target : value}
    </span>
  );
}

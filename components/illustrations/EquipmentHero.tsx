"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const RAY_COUNT = 20;

function SunburstRays() {
  const rays = Array.from({ length: RAY_COUNT }, (_, i) => {
    const angle = (i / RAY_COUNT) * Math.PI * 2;
    const inner = 70;
    const outer = i % 2 === 0 ? 205 : 175;
    const cx = 210;
    const cy = 190;
    const x1 = cx + Math.cos(angle) * inner;
    const y1 = cy + Math.sin(angle) * inner;
    const x2 = cx + Math.cos(angle) * outer;
    const y2 = cy + Math.sin(angle) * outer;
    return { x1, y1, x2, y2, key: i };
  });

  return (
    <g strokeLinecap="round">
      {rays.map((r) => (
        <line
          key={r.key}
          x1={r.x1}
          y1={r.y1}
          x2={r.x2}
          y2={r.y2}
          stroke="#FF5C39"
          strokeWidth="1.6"
          opacity="0.22"
        />
      ))}
    </g>
  );
}

/** A premium-equipment hero visual: workstation, server, device — on an obsidian field with a saffron-coral halo. */
export default function EquipmentHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 64]);

  return (
    <motion.div ref={ref} style={{ y }} className="flex flex-col items-center gap-4">
      <svg viewBox="0 0 420 360" className="w-full max-w-[420px]" aria-hidden="true">
        <circle cx="210" cy="190" r="150" fill="url(#haloGlow)" />
        <defs>
          <radialGradient id="haloGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF5C39" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#FF5C39" stopOpacity="0" />
          </radialGradient>
        </defs>
        <SunburstRays />

        {/* server / tower */}
        <rect x="66" y="150" width="52" height="146" rx="8" fill="#F3F1EC" />
        <circle cx="92" cy="168" r="4" fill="#FF5C39" />
        <rect x="78" y="184" width="28" height="4" rx="2" fill="#111214" opacity="0.35" />
        <rect x="78" y="196" width="28" height="4" rx="2" fill="#111214" opacity="0.35" />
        <rect x="78" y="208" width="18" height="4" rx="2" fill="#111214" opacity="0.35" />

        {/* workstation / monitor */}
        <rect x="140" y="240" width="150" height="12" rx="4" fill="#F3F1EC" opacity="0.5" />
        <rect x="196" y="216" width="38" height="26" fill="#F3F1EC" opacity="0.5" />
        <rect x="128" y="96" width="176" height="122" rx="10" fill="#F3F1EC" />
        <rect x="138" y="106" width="156" height="102" rx="4" fill="#111214" />
        <rect x="138" y="106" width="156" height="16" rx="4" fill="#1B1D22" />
        <circle cx="148" cy="114" r="2.6" fill="#FF5C39" />
        <circle cx="158" cy="114" r="2.6" fill="#F3F1EC" opacity="0.4" />
        <circle cx="168" cy="114" r="2.6" fill="#F3F1EC" opacity="0.4" />
        <rect x="148" y="132" width="60" height="42" rx="3" fill="#FF5C39" opacity="0.85" />
        <rect x="214" y="132" width="66" height="19" rx="3" fill="#F3F1EC" opacity="0.16" />
        <rect x="214" y="155" width="66" height="19" rx="3" fill="#F3F1EC" opacity="0.16" />
        <rect x="148" y="184" width="132" height="8" rx="4" fill="#F3F1EC" opacity="0.14" />

        {/* device */}
        <g transform="rotate(-8 356 236)">
          <rect x="326" y="176" width="60" height="120" rx="11" fill="#F3F1EC" />
          <rect x="333" y="188" width="46" height="88" rx="3" fill="#111214" />
          <rect x="340" y="196" width="32" height="20" rx="2" fill="#FF5C39" opacity="0.8" />
          <rect x="340" y="222" width="32" height="5" rx="2.5" fill="#F3F1EC" opacity="0.18" />
          <rect x="340" y="233" width="22" height="5" rx="2.5" fill="#F3F1EC" opacity="0.18" />
        </g>
      </svg>
      <span className="max-w-[30ch] text-center font-mono text-[11px] text-ivory/50">
        Équipement premium, choisi et configuré pour durer
      </span>
    </motion.div>
  );
}

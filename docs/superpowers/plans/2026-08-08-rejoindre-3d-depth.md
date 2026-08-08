# Rejoindre 3D Depth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add tasteful, minimalist 3D depth to the `/rejoindre` page: a parallax-layered hero illustration and pointer-tilt role cards.

**Architecture:** Two new client components (`RejoindreArt3D`, `TiltCard`) built on the existing `framer-motion` dependency, using `useMotionValue` + `useSpring` driven by `pointermove`/`pointerleave` — the same pattern already used in `components/MagneticButton.tsx` and `components/CustomCursor.tsx`. `RejoindreArt3D` replaces `RejoindreArt` in `app/rejoindre/page.tsx`. `TiltCard` is opted into `CoverageGrid.tsx` (shared by six pages) through a new optional `tilt` prop, default `false`, so only `/rejoindre` renders tilting cards and every other caller is unaffected.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, framer-motion 13.

## Global Constraints

- No new dependencies — use only `framer-motion` (already installed) and existing `lib/useMediaQuery.ts`.
- Respect `prefers-reduced-motion: reduce` — both new components must render fully static when this hook returns `true` (no tilt, no parallax, no idle float).
- Reuse the existing `useMediaQuery` hook (`lib/useMediaQuery.ts`) for both `prefers-reduced-motion` and `pointer: fine` checks — do not write a new media-query hook.
- Color tokens: `bg-ivory` (`#F3F1EC`), `bg-coral` (`#FF5C39`), shadow colors keyed to the shape's own color (ink shadows are invisible on the dark hero background) — see `app/globals.css` for the token source of truth.
- This repo has no test runner configured (no `jest`/`vitest` in `package.json`). Verification for every task is: `npm run lint`, `npm run build`, and a manual check in the browser (`npm run dev` → `http://localhost:3000/rejoindre`) — not automated unit tests.
- Every new interactive element attaches `onPointerMove`/`onPointerLeave` (not `onMouseMove`), consistent with `CustomCursor.tsx`'s use of `pointer` events.

---

### Task 1: Hero illustration — `RejoindreArt3D`

**Files:**
- Create: `components/illustrations/RejoindreArt3D.tsx`
- Modify: `app/rejoindre/page.tsx:1-45`

**Interfaces:**
- Produces: `export default function RejoindreArt3D(): JSX.Element` — a self-contained, prop-less client component. Consumed by `app/rejoindre/page.tsx` in place of `RejoindreArt`.

- [ ] **Step 1: Create the depth-layer hook and component**

Create `components/illustrations/RejoindreArt3D.tsx`:

```tsx
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
```

The percentages come from the original `RejoindreArt` SVG's `viewBox="0 0 400 300"` coordinates (e.g. the mid-layer circle was `cx=130 cy=110 r=30`, i.e. box `x=100 y=80 w=60 h=60` → `25%, 26.67%, 15%, 20%`), so the composition matches the illustration it replaces. Back layer = the old faded "third person" (opacity `.55`, now also depth-blurred); mid layer = the solid ivory person; front layer = the solid coral person, closest and most reactive to the pointer (`depth: 20` vs `12` vs `6`).

- [ ] **Step 2: Swap the import and usage in the page**

In `app/rejoindre/page.tsx`, replace:

```tsx
import { RejoindreArt } from "@/components/illustrations/PageArt";
```

with:

```tsx
import RejoindreArt3D from "@/components/illustrations/RejoindreArt3D";
```

and replace:

```tsx
art={<RejoindreArt />}
```

with:

```tsx
art={<RejoindreArt3D />}
```

- [ ] **Step 3: Verify with lint and build**

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: build succeeds (no type errors).

- [ ] **Step 4: Manual browser check**

Run: `npm run dev`, open `http://localhost:3000/rejoindre`.

Expected:
- The hero illustration shows three layered shape-pairs (faded/blurred back pair, solid ivory mid pair, solid coral front pair) in the same relative arrangement as the previous flat illustration.
- Moving the mouse over the hero art shifts the three layers at different speeds (front moves most), and they spring back to rest on `pointerleave`.
- In devtools, emulate `prefers-reduced-motion: reduce` (Rendering tab → Emulate CSS media feature) and confirm the illustration is fully static (no movement on pointer move).
- In devtools, emulate a touch device (or set `(pointer: coarse)` via responsive device toolbar) and confirm the layers gently float on their own instead of tracking the pointer.

- [ ] **Step 5: Commit**

```bash
git add components/illustrations/RejoindreArt3D.tsx app/rejoindre/page.tsx
git commit -m "feat: add layered parallax depth to rejoindre hero art"
```

---

### Task 2: Role cards — `TiltCard`

**Files:**
- Create: `components/TiltCard.tsx`
- Modify: `components/CoverageGrid.tsx:1-40`
- Modify: `app/rejoindre/page.tsx` (the `<CoverageGrid>` call from Task 1)

**Interfaces:**
- Consumes: nothing from Task 1.
- Produces: `export default function TiltCard({ title, text }: { title: string; text: string }): JSX.Element`, consumed by `CoverageGrid.tsx`'s existing `items.map`. `CoverageGrid` gains a new optional prop `tilt?: boolean` (default `false`).

**Scope correction:** `CoverageGrid` is shared by six pages (`app/ia-data`, `app/equipements`, `app/energie`, `app/rejoindre`, `app/conseil`, `app/logiciels` — confirmed via `grep -rln "CoverageGrid" app`), not just `/rejoindre`. The design spec's non-goal says "no changes to other pages' hero art/cards," so `CoverageGrid` cannot unconditionally switch to `TiltCard` — that would tilt all six pages' cards. Instead `CoverageGrid` takes a new `tilt?: boolean` prop (default `false`, preserving today's plain-div behavior everywhere); only `app/rejoindre/page.tsx` passes `tilt`. This keeps the component shared and avoids duplicating the grid markup.

**Note on scope:** the design spec called for a keyboard-focus elevated state, but the current cards are plain, non-interactive `<div>`s with no link/button/`tabIndex` — they aren't part of the tab order today. Adding `tabIndex={0}` purely to attach a focus style would insert 4 no-op stops into the page's tab order, which is worse for keyboard users, not better. `TiltCard` therefore only handles pointer hover/tilt; no focus-visible state is added. Flag this to the user after implementation in case they'd rather make the cards links.

- [ ] **Step 1: Create `TiltCard`**

Create `components/TiltCard.tsx`:

```tsx
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
```

- [ ] **Step 2: Add an opt-in `tilt` prop to `CoverageGrid`**

In `components/CoverageGrid.tsx`, add the import:

```tsx
import TiltCard from "./TiltCard";
```

Change the props type to accept the new optional flag:

```tsx
export default function CoverageGrid({
  eyebrow,
  title,
  items,
  tilt = false,
}: {
  eyebrow: string;
  title: string;
  items: { title: string; text: string }[];
  tilt?: boolean;
}) {
```

Replace the mapped card markup:

```tsx
{items.map((item, i) => (
  <div
    key={i}
    className="flex items-start gap-3.5 bg-paper px-6 py-6 transition-colors hover:bg-white"
  >
    <span className="mt-[7px] h-2 w-2 flex-none rounded-full bg-coral" />
    <div>
      <h3 className="mb-1 text-[15.5px] font-semibold">{item.title}</h3>
      <p className="text-[13.5px] leading-[1.55] text-muted">{item.text}</p>
    </div>
  </div>
))}
```

with:

```tsx
{items.map((item, i) =>
  tilt ? (
    <TiltCard key={i} title={item.title} text={item.text} />
  ) : (
    <div
      key={i}
      className="flex items-start gap-3.5 bg-paper px-6 py-6 transition-colors hover:bg-white"
    >
      <span className="mt-[7px] h-2 w-2 flex-none rounded-full bg-coral" />
      <div>
        <h3 className="mb-1 text-[15.5px] font-semibold">{item.title}</h3>
        <p className="text-[13.5px] leading-[1.55] text-muted">{item.text}</p>
      </div>
    </div>
  ),
)}
```

- [ ] **Step 3: Turn `tilt` on for `/rejoindre` only**

In `app/rejoindre/page.tsx`, change:

```tsx
<CoverageGrid eyebrow="Profils recherchés" title="Les métiers autour desquels Mundiis recrute" items={roles} />
```

to:

```tsx
<CoverageGrid eyebrow="Profils recherchés" title="Les métiers autour desquels Mundiis recrute" items={roles} tilt />
```

Every other caller (`app/ia-data`, `app/equipements`, `app/energie`, `app/conseil`, `app/logiciels`) is left untouched and keeps the plain, non-tilting cards.

- [ ] **Step 4: Verify with lint and build**

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Manual browser check**

With `npm run dev` running, open `http://localhost:3000/rejoindre` and scroll to the "Profils recherchés" grid.

Expected:
- Moving the mouse over a card tilts it a few degrees toward the cursor, lifts it slightly (scale + shadow), and it springs flat again on `pointerleave`.
- The existing `hover:bg-white` background swap still happens alongside the tilt.
- Emulating `prefers-reduced-motion: reduce` in devtools removes the tilt/scale/shadow entirely; only the background-color hover remains.
- Open a second `CoverageGrid` caller, e.g. `http://localhost:3000/energie`, and confirm its cards behave exactly as before (background-color hover only, no tilt) — confirming the `tilt` prop default kept it unchanged.

- [ ] **Step 6: Commit**

```bash
git add components/TiltCard.tsx components/CoverageGrid.tsx app/rejoindre/page.tsx
git commit -m "feat: add pointer tilt to rejoindre role cards"
```

---

### Task 3: Final verification pass

**Files:** none (verification only).

**Interfaces:** none.

- [ ] **Step 1: Full lint and build**

Run: `npm run lint && npm run build`
Expected: both succeed with no errors or warnings introduced by the new files.

- [ ] **Step 2: Full manual pass on `/rejoindre`**

With `npm run dev` running:
- Confirm the hero parallax and card tilt both work together on the same page load.
- Resize the browser to a mobile width (or use devtools device toolbar) and confirm nothing overflows horizontally and the idle-float fallback looks reasonable on a touch-emulated device.
- Re-check `prefers-reduced-motion: reduce` one more time with both features on screen together — page should be fully static.

- [ ] **Step 3: Report the `TiltCard` focus-state scope note to the user**

Summarize (in the final report, not a commit) that keyboard-focus styling was intentionally left out of `TiltCard` because the cards are non-interactive `<div>`s not currently in the tab order — flagged in Task 2 above — and ask whether the user wants the cards turned into real links/buttons if focus styling matters to them.

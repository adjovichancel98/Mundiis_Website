# Cuberto-Inspired Visual/Motion Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give Mundiis a bold, motion-forward "agency" identity — heavy display typography, richer cursor/button interaction, and a generative WebGL hero background on the home page — without changing the light ivory/ink/coral palette or cloning any third-party site's actual assets.

**Architecture:** A new display webfont token rolls out across every shared heading component and page-local heading (mechanical class swap). Three existing motion components (`CustomCursor`, `MagneticButton`, `KineticHeading`) gain small, backward-compatible capability additions. The home page (`app/page.tsx`) is the only page that gets bespoke treatment: wider `KineticHeading`/cursor-label usage, a scroll parallax on the hero, and a new `HeroField` WebGL component (react-three-fiber) as the hero's back layer, with a static-gradient fallback for reduced motion / WebGL failure.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, framer-motion 13, `next/font/google`, three.js + `@react-three/fiber` + `@react-three/drei` (new).

## Global Constraints

- No dark-theme change — ivory/paper backgrounds elsewhere are untouched; only the home hero (already `bg-ink`) gets the WebGL/gradient treatment.
- New font: **Bricolage Grotesque** via `next/font/google` (self-hosted by Next's build, no runtime external request, no new npm dependency for the font itself).
- All new/changed motion must respect `prefers-reduced-motion: reduce`, checked via the existing `lib/useMediaQuery.ts` hook — the same pattern used by every motion component already in this codebase (`CustomCursor.tsx`, `RejoindreArt3D.tsx`, `TiltCard.tsx`).
- The WebGL hero background is client-only (`next/dynamic(..., { ssr: false })`) and must never block the server-rendered hero text/CTA from appearing immediately.
- WebGL failure or `prefers-reduced-motion: reduce` must both fall back to the same static CSS gradient — no blank hero in either case.
- This repo has no test runner configured (no jest/vitest). Verification per task is `npm run lint`, `npm run build`, and a manual browser check — not automated unit tests.
- Out of scope for this plan: bespoke redesign of the 9 non-home pages beyond the shared-component typography/font change, WebGL anywhere outside the home hero, page-transition effects, `RejoindreArt3D.tsx`/`TiltCard.tsx` (unrelated prior work — do not touch).

---

### Task 1: Typography system — Bricolage Grotesque

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css:1-18`
- Modify (mechanical class rename, `font-serif`→`font-display` and paired `font-medium`→`font-extrabold`): `components/PageHero.tsx`, `components/CoverageGrid.tsx`, `components/SubCta.tsx`, `components/Spotlight.tsx`, `components/TechStack.tsx`, `components/Marquee.tsx`, `app/page.tsx`, `app/apropos/page.tsx`, `app/contact/page.tsx`, `app/actualites/page.tsx`
- Modify (heading size bump, part of the same edit): `components/PageHero.tsx`, `app/contact/page.tsx`, `app/actualites/page.tsx` (h1: `md:text-[46px]` → `md:text-[56px]`), `app/page.tsx` (hero `KineticHeading`: `md:text-[52px]` → `md:text-[60px]`)

**Interfaces:**
- Produces: CSS custom property `--font-bricolage` (set by `next/font`'s `variable` option on the `<html>` element) and Tailwind theme token `--font-display` (in `app/globals.css`'s `@theme` block), which auto-generates the `.font-display` utility class. Every other task in this plan that touches heading markup uses `font-display`/`font-extrabold`, not `font-serif`/`font-medium`.

- [ ] **Step 1: Load the font in `app/layout.tsx`**

Replace the full contents of `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mundiis — Entreprise technologique",
  description:
    "Mundiis fournit et livre les équipements informatiques dont les entreprises ont besoin, développe leurs logiciels, intègre l'intelligence artificielle et la donnée, les conseille, et les équipe en énergie solaire.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`h-full ${bricolageGrotesque.variable}`}>
      <body className="flex min-h-full flex-col overflow-x-hidden bg-ivory text-ink antialiased">
        <ScrollProgress />
        <CustomCursor />
        <Nav />
        <Marquee />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Replace the `--font-serif` theme token with `--font-display` in `app/globals.css`**

In `app/globals.css`, the `@theme` block currently has:

```css
  --font-serif: ui-serif, Georgia, "Iowan Old Style", serif;
```

Replace that single line with:

```css
  --font-display: var(--font-bricolage), ui-sans-serif, system-ui, sans-serif;
```

(Leave `--font-sans` and `--font-mono` untouched — only the serif token is replaced.)

- [ ] **Step 3: Rename the `font-serif` class to `font-display` and `font-medium` to `font-extrabold` on every heading that uses them**

Run from the repo root:

```bash
FILES="components/PageHero.tsx components/CoverageGrid.tsx components/SubCta.tsx components/Spotlight.tsx components/TechStack.tsx components/Marquee.tsx app/page.tsx app/apropos/page.tsx app/contact/page.tsx app/actualites/page.tsx"
sed -i '' 's/font-serif/font-display/g' $FILES
sed -i '' 's/font-medium/font-extrabold/g' $FILES
```

This is safe: every `font-medium` occurrence in these 10 files is on the same element as a `font-serif` occurrence (verified — there is no unrelated `font-medium` usage in these specific files). Do not run this `font-medium` replacement against any other file; other files use `font-medium` for non-heading text (buttons, labels) that must stay at its current weight.

- [ ] **Step 4: Bump the largest-breakpoint heading sizes**

In `components/PageHero.tsx`, `app/contact/page.tsx`, and `app/actualites/page.tsx`, each has one `h1` containing `md:text-[46px]`. Change each to `md:text-[56px]`:

```bash
sed -i '' 's/md:text-\[46px\]/md:text-[56px]/' components/PageHero.tsx app/contact/page.tsx app/actualites/page.tsx
```

In `app/page.tsx`, the hero `KineticHeading`'s `className` contains `md:text-[52px]`. Change it to `md:text-[60px]`:

```bash
sed -i '' 's/md:text-\[52px\]/md:text-[60px]/' app/page.tsx
```

- [ ] **Step 5: Verify with lint and build**

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: build succeeds. `next/font/google` requires network access at build time to fetch font metadata the first time — if the build fails specifically on font fetching in a sandboxed/offline environment, report this as a concern rather than working around it silently.

- [ ] **Step 6: Manual browser check**

Run `npm run dev`, open `http://localhost:3000/` and one sub-page (e.g. `/equipements`).

Expected:
- All headings (`h1`/`h2`/`h3` that previously used `font-serif`) now render in Bricolage Grotesque at a heavy weight, not the old system serif.
- No layout shift or visibly broken wrapping from the larger `h1` sizes.
- Body copy, mono eyebrows/labels, and buttons are visually unchanged (still system sans / mono, still their original font-weight).

- [ ] **Step 7: Commit**

```bash
git add app/layout.tsx app/globals.css components/PageHero.tsx components/CoverageGrid.tsx components/SubCta.tsx components/Spotlight.tsx components/TechStack.tsx components/Marquee.tsx app/page.tsx app/apropos/page.tsx app/contact/page.tsx app/actualites/page.tsx
git commit -m "feat: load Bricolage Grotesque display font sitewide"
```

---

### Task 2: Cursor label state + stronger magnetic buttons

**Files:**
- Modify: `components/CustomCursor.tsx`
- Modify: `components/MagneticButton.tsx`

**Interfaces:**
- Produces: any DOM element (or ancestor of the hovered element) carrying `data-cursor-label="Some text"` causes the custom cursor to scale up and display that text while hovered. No component in this task consumes this yet — Task 3 and Task 4 add `data-cursor-label` attributes to actual elements. `MagneticButton`'s public props/API are unchanged (internal spring tuning only).

- [ ] **Step 1: Add label support to `CustomCursor.tsx`**

Replace the full contents of `components/CustomCursor.tsx` with:

```tsx
"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import BrandMark from "./BrandMark";
import { useMediaQuery } from "@/lib/useMediaQuery";

export default function CustomCursor() {
  const fine = useMediaQuery("(pointer: fine)");
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = fine && !reduce;

  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
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
      const labelTarget = target.closest<HTMLElement>("[data-cursor-label]");
      setLabel(labelTarget?.dataset.cursorLabel ?? null);
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
      className={`pointer-events-none fixed left-0 top-0 z-[100] flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${
        label ? "bg-ink" : ""
      }`}
      style={{ x: springX, y: springY, scale: label ? 3.2 : hovering ? 1.9 : 1 }}
      transition={{ scale: { type: "tween", duration: 0.18 } }}
    >
      {label ? (
        <span className="whitespace-nowrap font-mono text-[7px] uppercase tracking-[0.08em] text-ivory">
          {label}
        </span>
      ) : (
        <BrandMark />
      )}
    </motion.div>
  );
}
```

- [ ] **Step 2: Strengthen `MagneticButton.tsx`'s pull**

In `components/MagneticButton.tsx`, change:

```tsx
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  function handleMove(e: ReactMouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  }
```

to:

```tsx
  const springX = useSpring(x, { stiffness: 260, damping: 18 });
  const springY = useSpring(y, { stiffness: 260, damping: 18 });

  function handleMove(e: ReactMouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.45);
  }
```

No other changes to this file — the rest of the component (variants, `href`/`button` branching) is unaffected.

- [ ] **Step 3: Verify with lint and build**

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Manual browser check**

With `npm run dev` running, open `http://localhost:3000/`.

Expected:
- Hovering any existing button (`MagneticButton` instances — hero CTAs, nav, footer) shows a noticeably stronger pull toward the cursor than before, still spring-damped (not jittery).
- The custom cursor's default appearance (small `BrandMark`, scale-up on link/button hover) is unchanged — no element on the current pages has `data-cursor-label` yet, so the new label branch never activates until Task 3/4 add it. Confirm this by hovering existing links/buttons and seeing no label bubble appear.
- `prefers-reduced-motion: reduce` emulation still disables the cursor entirely (unchanged `enabled` logic).

- [ ] **Step 5: Commit**

```bash
git add components/CustomCursor.tsx components/MagneticButton.tsx
git commit -m "feat: add cursor label state and strengthen magnetic button pull"
```

---

### Task 3: Home page — wider KineticHeading, scroll parallax, cursor labels

**Files:**
- Modify: `components/KineticHeading.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `CustomCursor`'s `data-cursor-label` support from Task 2 (already merged).
- Produces: `KineticHeading` gains an optional `inView?: boolean` prop (default `false`, preserving current hero behavior exactly). `app/page.tsx` defines local variables `heroRef`, `reduceMotion`, `fieldY` that Task 4 will reuse when it adds the WebGL layer to the same hero `<header>` — do not rename these without checking Task 4's brief.

**Note:** this task assumes Task 1 has already run, so `app/page.tsx` already uses `font-display`/`font-extrabold` and the hero heading's `md:text-[60px]` size. The snippets below show the post-Task-1 state as their "before".

- [ ] **Step 1: Add an `inView` mode to `KineticHeading.tsx`**

Replace the full contents of `components/KineticHeading.tsx` with:

```tsx
"use client";

import { motion } from "framer-motion";

export default function KineticHeading({
  text,
  className,
  as: Tag = "h1",
  inView = false,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2";
  inView?: boolean;
}) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-top">
          <motion.span
            className="inline-block"
            initial={{ y: "115%" }}
            {...(inView
              ? { whileInView: { y: 0 }, viewport: { once: true, amount: 0.4 } }
              : { animate: { y: 0 } })}
            transition={{
              duration: 0.85,
              ease: [0.19, 1, 0.22, 1],
              delay: i * 0.032,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
```

The hero's existing `<KineticHeading text="..." className="..." />` call in `app/page.tsx` (no `inView` prop passed) is unaffected — it keeps animating immediately on mount, exactly as today.

- [ ] **Step 2: Add scroll parallax to the hero, in `app/page.tsx`**

Change the top of `app/page.tsx` from:

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import KineticHeading from "@/components/KineticHeading";
import HeroMark from "@/components/HeroMark";
import { HeroTriangle } from "@/components/illustrations/PageArt";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import { pillars } from "@/lib/pillars";
import { pillarIcons } from "@/components/icons/PillarIcons";

export default function HomePage() {
  return (
```

to:

```tsx
"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import KineticHeading from "@/components/KineticHeading";
import HeroMark from "@/components/HeroMark";
import { HeroTriangle } from "@/components/illustrations/PageArt";
import MagneticButton from "@/components/MagneticButton";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import { pillars } from "@/lib/pillars";
import { pillarIcons } from "@/components/icons/PillarIcons";
import { useMediaQuery } from "@/lib/useMediaQuery";

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const fieldY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
```

Then change the hero `<header>` from:

```tsx
      <header className="relative overflow-hidden bg-ink py-14 text-ivory sm:py-20 md:py-[116px]">
        <HeroTriangle className="pointer-events-none absolute -right-[6%] -top-[10%] w-[60%] max-w-[520px] rotate-[8deg] opacity-[0.14] max-md:w-[80%] max-md:-right-[20%] max-md:opacity-[0.08]" />
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-8 px-5 sm:px-8 md:grid-cols-[1.15fr_0.85fr] md:gap-14">
```

to:

```tsx
      <header
        ref={heroRef}
        className="relative overflow-hidden bg-ink py-14 text-ivory sm:py-20 md:py-[116px]"
      >
        <HeroTriangle className="pointer-events-none absolute -right-[6%] -top-[10%] w-[60%] max-w-[520px] rotate-[8deg] opacity-[0.14] max-md:w-[80%] max-md:-right-[20%] max-md:opacity-[0.08]" />
        <motion.div
          style={reduceMotion ? undefined : { y: copyY }}
          className="relative z-10 mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-8 px-5 sm:px-8 md:grid-cols-[1.15fr_0.85fr] md:gap-14"
        >
```

and its closing `</div>` (immediately before `</header>`) to `</motion.div>`.

`fieldY` is intentionally unused by this task — Task 4 will read it when it adds `HeroField` as a sibling of this `motion.div` inside the same `<header>`. Leaving it unused here would fail `npm run lint` (`no-unused-vars`); to avoid that until Task 4 lands, reference it as a no-op at the end of the component body (immediately before the final `return` — no, `fieldY` is already inside the component and used nowhere else). Since Task 4 runs immediately after this task in the same plan and will consume `fieldY`, and an unused local `const` does trigger ESLint's `no-unused-vars`: prefix it with an underscore-free but explicitly-voided reference is not idiomatic — instead, add a one-line comment-suppressed marker so lint passes in the interim:

```tsx
  const fieldY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  void fieldY; // consumed by HeroField in the next task
```

Use this `void fieldY;` line right after the `fieldY` declaration for now — Task 4 removes this line when it starts actually using `fieldY`.

- [ ] **Step 3: Use `KineticHeading` for the Pillars and CTA section headings**

In the `PILLARS` section, change:

```tsx
          <Reveal className="mb-9 max-w-[62ch] sm:mb-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">
              Ce que nous faisons
            </p>
            <h2 className="mt-2.5 text-balance font-display text-[26px] font-extrabold tracking-tight sm:text-[32px]">
              Cinq métiers, une seule entreprise
            </h2>
            <p className="mt-3.5 text-[15.5px] leading-[1.65] text-muted">
              Cliquez une activité pour voir en détail ce qu&rsquo;elle couvre.
            </p>
          </Reveal>
```

to:

```tsx
          <Reveal className="mb-9 max-w-[62ch] sm:mb-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-coral">
              Ce que nous faisons
            </p>
            <KineticHeading
              as="h2"
              inView
              text="Cinq métiers, une seule entreprise"
              className="mt-2.5 text-balance font-display text-[26px] font-extrabold tracking-tight sm:text-[32px]"
            />
            <p className="mt-3.5 text-[15.5px] leading-[1.65] text-muted">
              Cliquez une activité pour voir en détail ce qu&rsquo;elle couvre.
            </p>
          </Reveal>
```

In the `CTA` section, change:

```tsx
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">Parlons-en</p>
              <h2 className="mt-2.5 max-w-[16ch] text-balance font-display text-[26px] font-extrabold tracking-tight sm:text-[40px]">
                Un projet à équiper, à digitaliser, ou à alimenter ?
              </h2>
              <p className="mt-3 max-w-[42ch] text-[15px] text-ink/72">
                Décrivez votre besoin — matériel, logiciel, IA, conseil ou énergie solaire.
              </p>
            </div>
```

to:

```tsx
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">Parlons-en</p>
              <KineticHeading
                as="h2"
                inView
                text="Un projet à équiper, à digitaliser, ou à alimenter ?"
                className="mt-2.5 max-w-[16ch] text-balance font-display text-[26px] font-extrabold tracking-tight sm:text-[40px]"
              />
              <p className="mt-3 max-w-[42ch] text-[15px] text-ink/72">
                Décrivez votre besoin — matériel, logiciel, IA, conseil ou énergie solaire.
              </p>
            </div>
```

- [ ] **Step 4: Add cursor labels to the pillar cards**

In the `PILLARS` section's `<Link>`, change:

```tsx
                  <Link
                    href={`/${p.slug}`}
                    className={`group flex h-full cursor-pointer flex-col gap-3.5 p-6 transition-colors sm:p-8 ${
                      lead ? "bg-ink text-ivory hover:bg-[#1B1D22]" : "bg-paper hover:bg-white"
                    }`}
                  >
```

to:

```tsx
                  <Link
                    href={`/${p.slug}`}
                    data-cursor-label="Voir"
                    className={`group flex h-full cursor-pointer flex-col gap-3.5 p-6 transition-colors sm:p-8 ${
                      lead ? "bg-ink text-ivory hover:bg-[#1B1D22]" : "bg-paper hover:bg-white"
                    }`}
                  >
```

- [ ] **Step 5: Verify with lint and build**

Run: `npm run lint`
Expected: no errors (the `void fieldY;` line from Step 2 prevents an unused-variable error).

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 6: Manual browser check**

With `npm run dev` running, open `http://localhost:3000/`.

Expected:
- Scrolling past the hero moves the hero copy column upward slightly faster than the page scroll (parallax) — disabled under emulated `prefers-reduced-motion: reduce`.
- Scrolling the Pillars and CTA section headings into view triggers their own per-word kinetic reveal (not just a plain fade) — this should now look different from before (previously these were static `h2`s inside a `Reveal` fade).
- Hovering a pillar card shows the cursor grow and display "Voir".
- The hero's own headline still animates on page load exactly as before (unaffected by the `inView` addition, since it doesn't pass `inView`).

- [ ] **Step 7: Commit**

```bash
git add components/KineticHeading.tsx app/page.tsx
git commit -m "feat: wider KineticHeading usage, hero parallax, and cursor labels on home"
```

---

### Task 4: WebGL hero background (`HeroField`)

**Files:**
- Create: `components/HeroField.tsx`
- Create: `components/HeroFieldBoundary.tsx`
- Modify: `app/page.tsx`
- Modify: `package.json` / `package-lock.json` (via `npm install`)

**Interfaces:**
- Consumes: `heroRef`, `reduceMotion`, `fieldY` (the `useTransform` motion value), and the `void fieldY;` placeholder line, all defined in `app/page.tsx` by Task 3.
- Produces: `HeroField` (default export, no props) — a full-bleed WebGL canvas meant to be an absolutely-positioned child of a `position: relative` container. `HeroFieldBoundary` (default export) — a React error boundary taking `fallback: ReactNode` and `children: ReactNode`.

**Note:** this task assumes Tasks 1–3 have already run.

**Scope note:** the design spec mentions the cursor label being used on "the home page's pillar cards ... and the WebGL hero." This task does not attach `data-cursor-label` to the hero background — the hero isn't a link or button, and labelling a non-interactive full-bleed background implies clickability that doesn't exist, which would be worse UX than no label. If a hero-area cursor label is wanted later (e.g. on `MagneticButton`/`HeroMark` specifically, which already are interactive), that's a small follow-up, not part of this task.

- [ ] **Step 1: Install the WebGL dependencies**

```bash
npm install three @react-three/fiber @react-three/drei
```

Run `npm run build` immediately after installing, before writing any new code, to confirm the install alone doesn't break the existing build (it shouldn't — these packages are unused until Step 2). If TypeScript reports missing type declarations for `three` (recent `three` releases ship their own types, but confirm), run `npm install -D @types/three` and re-check.

- [ ] **Step 2: Create the shader field component**

Create `components/HeroField.tsx`:

```tsx
"use client";

import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import * as THREE from "three";

const GradientFieldMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uInk: new THREE.Color("#111214"),
    uCoral: new THREE.Color("#ff5c39"),
  },
  /* glsl vertex */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* glsl fragment */ `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec3 uInk;
    uniform vec3 uCoral;
    varying vec2 vUv;

    float grain(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    void main() {
      vec2 center = vec2(0.5, 0.45) + uMouse * 0.06;
      float dist = distance(vUv, center);
      float glow = smoothstep(0.9, 0.0, dist);
      vec3 color = mix(uInk, uCoral, glow * 0.35);
      float n = (grain(vUv * 500.0 + uTime * 6.0) - 0.5) * 0.035;
      gl_FragColor = vec4(color + n, 1.0);
    }
  `,
);

extend({ GradientFieldMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    gradientFieldMaterial: {
      ref?: React.Ref<THREE.ShaderMaterial>;
    };
  }
}

function Field({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const materialRef = useRef<THREE.ShaderMaterial & { uniforms: { [key: string]: THREE.IUniform } }>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    const material = materialRef.current;
    if (!material) return;
    material.uniforms.uTime.value = state.clock.elapsedTime;
    (material.uniforms.uMouse.value as THREE.Vector2).set(mouse.current.x, mouse.current.y);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <gradientFieldMaterial ref={materialRef} />
    </mesh>
  );
}

export default function HeroField() {
  const mouse = useRef({ x: 0, y: 0 });

  function handlePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current.x = (e.clientX - rect.left) / rect.width - 0.5;
    mouse.current.y = -((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <div aria-hidden="true" onPointerMove={handlePointerMove} className="absolute inset-0">
      <Canvas orthographic camera={{ zoom: 100, position: [0, 0, 100] }} dpr={[1, 1.5]}>
        <Field mouse={mouse} />
      </Canvas>
    </div>
  );
}
```

If the `declare module "@react-three/fiber" { interface ThreeElements { ... } }` augmentation doesn't satisfy TypeScript for the installed `@react-three/fiber` version (the exact augmentation interface name has changed across major versions of the library), check the installed version's own type definitions (`node_modules/@react-three/fiber/dist/declarations/src/three-types.d.ts` or similar) for the correct interface to extend, and adjust the `declare module` block accordingly — report what you found as a concern if it required a different interface name than `ThreeElements`.

- [ ] **Step 3: Create the error boundary**

Create `components/HeroFieldBoundary.tsx`:

```tsx
"use client";

import { Component } from "react";
import type { ReactNode } from "react";

export default class HeroFieldBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
```

- [ ] **Step 4: Wire `HeroField` into the home hero**

In `app/page.tsx`, add these imports:

```tsx
import dynamic from "next/dynamic";
import HeroFieldBoundary from "@/components/HeroFieldBoundary";
```

Add, near the top of the file (module scope, outside the `HomePage` function):

```tsx
const HeroField = dynamic(() => import("@/components/HeroField"), { ssr: false });

function StaticHeroField() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(255,92,57,0.22),transparent_70%)]"
    />
  );
}
```

Remove the `void fieldY; // consumed by HeroField in the next task` line added in Task 3, and instead apply `fieldY` to the new background layer. Change the hero `<header>` from:

```tsx
      <header
        ref={heroRef}
        className="relative overflow-hidden bg-ink py-14 text-ivory sm:py-20 md:py-[116px]"
      >
        <HeroTriangle className="pointer-events-none absolute -right-[6%] -top-[10%] w-[60%] max-w-[520px] rotate-[8deg] opacity-[0.14] max-md:w-[80%] max-md:-right-[20%] max-md:opacity-[0.08]" />
        <motion.div
```

to:

```tsx
      <header
        ref={heroRef}
        className="relative overflow-hidden bg-ink py-14 text-ivory sm:py-20 md:py-[116px]"
      >
        <motion.div style={reduceMotion ? undefined : { y: fieldY }} className="absolute inset-0">
          {reduceMotion ? (
            <StaticHeroField />
          ) : (
            <HeroFieldBoundary fallback={<StaticHeroField />}>
              <HeroField />
            </HeroFieldBoundary>
          )}
        </motion.div>
        <HeroTriangle className="pointer-events-none absolute -right-[6%] -top-[10%] w-[60%] max-w-[520px] rotate-[8deg] opacity-[0.14] max-md:w-[80%] max-md:-right-[20%] max-md:opacity-[0.08]" />
        <motion.div
```

(The rest of the hero — the `HeroTriangle`, the copy `motion.div`, `HeroMark` — is unchanged; `HeroField`/`StaticHeroField` render behind it because they come first in DOM order and use `absolute inset-0`, while the copy `motion.div` already has `relative z-10`.)

- [ ] **Step 5: Verify with lint and build**

Run: `npm run lint`
Expected: no errors.

Run: `npm run build`
Expected: build succeeds — this is the step most likely to surface a TypeScript issue with the custom shader material's JSX typing (see the note in Step 2). Iterate on the `declare module` augmentation until this passes; do not suppress the error with a broad `@ts-nocheck` or `any` cast on unrelated code.

- [ ] **Step 6: Manual browser check**

With `npm run dev` running, open `http://localhost:3000/`.

Expected:
- The hero background shows an animated grain/gradient field (ink base, coral glow) instead of the flat `bg-ink` color, with the existing hero text/CTA clearly readable on top of it.
- Moving the mouse over the hero shifts the gradient's glow center slightly.
- Scrolling moves the background at a different rate than the foreground copy (parallax from Task 3, now visibly applied to a real background layer).
- Emulate `prefers-reduced-motion: reduce` in devtools: the canvas should not mount at all — only the static radial-gradient `div` (`StaticHeroField`) shows, and it does not move on scroll or respond to the mouse.
- Confirm no console errors related to WebGL context creation or the shader compiling.
- View source / check the initial server-rendered HTML (`curl http://localhost:3000/ | grep -o 'canvas'` or view-source in the browser before JS runs) to confirm the hero text is present in the initial HTML — i.e. the dynamic WebGL import did not become part of the server render.

- [ ] **Step 7: Commit**

```bash
git add components/HeroField.tsx components/HeroFieldBoundary.tsx app/page.tsx package.json package-lock.json
git commit -m "feat: add WebGL generative background to home hero"
```

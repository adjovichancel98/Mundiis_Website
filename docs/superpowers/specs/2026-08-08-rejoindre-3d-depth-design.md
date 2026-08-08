# Design: Depth / "3D" content on /rejoindre

## Context

The `/rejoindre` page (`app/rejoindre/page.tsx`) is built from three shared sections: `PageHero` (with a flat SVG illustration, `RejoindreArt`), `CoverageGrid` (4 role cards), and `SubCta`. The site's visual language is flat/minimalist: ink (`#111214`), ivory (`#F3F1EC`), paper (`#F8F7F4`), coral (`#FF5C39`) and no existing 3D effects (no `perspective`, `transform-style: preserve-3d`, no WebGL/Three.js). `framer-motion` is already a dependency and is used site-wide for reveal/hover interactions (`components/Reveal.tsx`, `components/MagneticButton.tsx`).

Goal: add tasteful, "presentable" 3D depth to this page without introducing a heavy dependency (Three.js/react-three-fiber) or breaking the minimalist aesthetic.

## Approach

CSS `perspective` + Framer Motion, using only the existing `framer-motion` dependency. Two additions, both scoped to `/rejoindre` only (new components, not edits to the shared `PageArt.tsx`/`CoverageGrid.tsx` files, so other pages are unaffected):

### 1. Hero art — layered parallax depth

New client component `components/illustrations/RejoindreArt3D.tsx`, swapped in for `RejoindreArt` in `app/rejoindre/page.tsx`.

- 4 layered shapes (reusing the existing circle/rounded-rect "people" motif and coral/ivory palette from the current `RejoindreArt`), each rendered as an absolutely-positioned `motion.div`/SVG layer at a different depth.
- Depth is faked via: layer order (z-index), scale (closer = slightly larger), and box-shadow (closer = larger, softer shadow offset) — no real `translateZ`/WebGL.
- Desktop: on `pointermove` within the hero art bounding box, layers translate a few px in the opposite direction of the cursor, with closer layers moving more (parallax). Implemented with a small `useState`/`onPointerMove` handler driving `motion.div` `style={{ x, y }}` per layer, damped with a spring (`useSpring`/`useMotionValue` from framer-motion).
- No pointer / touch devices / `prefers-reduced-motion: reduce`: falls back to a slow, subtle idle float (small looping translate animation, few px, ~6s ease loop) instead of pointer tracking. Reduced motion also disables the idle float, rendering fully static.
- Sizing/viewport and palette stay consistent with the current `RejoindreArt` (400x300 viewBox proportions) so `PageHero` layout is untouched.

### 2. Role cards — tilt-on-hover

Edit `components/CoverageGrid.tsx`: each of the 4 role cards becomes a `motion.div` with pointer-driven tilt.

- On `pointermove` over a card, compute cursor position relative to card center, map to `rotateX`/`rotateY` (max ±6°) via `useMotionValue` + `useTransform`, applied with `style={{ perspective: 800, rotateX, rotateY }}`.
- On `pointerleave`, spring back to `rotateX: 0, rotateY: 0`.
- Hover also gets a slightly larger shadow (`shadow-lg`-equivalent) and `scale: 1.015` for lift, layered on top of the existing `hover:bg-white` background swap (kept as-is).
- Keyboard focus (`:focus-visible`) gets the same elevated shadow + scale but no tilt (no pointer position available) — pure CSS via a focus-visible class, not Framer Motion.
- `prefers-reduced-motion: reduce`: disable tilt and scale transform entirely; keep the background-color hover swap and a static shadow on hover/focus.

## Non-goals

- `PageArt.tsx`'s `RejoindreArt` export is only used by `/rejoindre` today; it's left in place (unused after the swap) rather than deleted, since removing shared illustration exports is out of scope here. No changes to other pages' hero art/cards.
- No WebGL/Three.js/react-three-fiber dependency.
- No changes to `SubCta`.

## Testing

- Manual verification in browser: hover/pointermove behavior on hero art and cards, keyboard focus states on cards, and `prefers-reduced-motion` behavior (via OS/devtools emulation) on both.
- `npm run lint` and `npm run build` must pass.

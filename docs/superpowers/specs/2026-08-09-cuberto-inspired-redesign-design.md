# Design: Cuberto-inspired visual/motion refresh

## Context

The user asked to "reproduce cuberto.com" (a well-known design agency's award-winning site). Cuberto's actual design — its specific typefaces, illustrations, copy, and exact effect implementations — is that studio's copyrighted creative work; cloning it verbatim for Mundiis (a different, unrelated B2B company) is not something to build. Instead this spec targets the same *category* of design language — bold kinetic typography, a custom cursor, magnetic buttons, generative motion, a premium "agency" feel — using original assets (a freely-licensed font, custom shader code, Mundiis's existing ink/ivory/coral palette and content) rather than any of Cuberto's specific proprietary material.

The site (Next.js 16 / React 19 / TypeScript / Tailwind v4 / framer-motion 13) already has agency-style building blocks: `CustomCursor.tsx`, `MagneticButton.tsx`, `KineticHeading.tsx` (per-word scroll-in reveal), `Reveal.tsx` (viewport fade/slide-in), `Marquee.tsx`, `ScrollProgress.tsx`. Typography is currently system fonts only (`--font-serif`/`--font-sans`/`--font-mono` in `app/globals.css` all resolve to OS fonts, no webfont loaded). The palette (`--color-ink #111214`, `--color-ivory #F3F1EC`, `--color-paper #F8F7F4`, `--color-coral #FF5C39`) stays as-is — the user chose to keep the light/ivory background rather than go dark-first.

## Scope & phasing

`CoverageGrid`, `PageHero`, `SubCta`, `Nav`, `Footer`, `MagneticButton`, `KineticHeading`, `Reveal` are shared across all ~10 pages (`app/page.tsx`, `app/equipements`, `app/logiciels`, `app/ia-data`, `app/conseil`, `app/energie`, `app/rejoindre`, `app/apropos`, `app/contact`, `app/actualites`). This spec covers:

1. **Design-system layer** (typography tokens in `app/globals.css`, motion upgrades to the shared components above) — applies automatically to every page that uses these components, which is effectively the whole site's typographic and interactive identity.
2. **Home page (`app/page.tsx`) hero** — the flagship treatment: a WebGL generative background behind the existing hero copy.

Out of scope for this spec (explicitly deferred, not forgotten): bespoke per-page redesign of illustrations/layout on the 9 non-home pages beyond what the shared-component changes already give them, WebGL effects anywhere other than the home hero, and a dark theme.

## Typography

Load **Bricolage Grotesque** (Google Fonts, SIL Open Font License, variable weight 200–800) via `next/font/google` in `app/layout.tsx` — self-hosted by Next's build, no external request at runtime, no new npm dependency. Expose it as a new `--font-display` CSS variable in `app/globals.css` (alongside the existing `--font-serif`/`--font-sans`/`--font-mono`, none of which are removed).

Usage:
- `--font-display` at weight 800–900 replaces `font-serif` on every `h1`/`h2`/kinetic hero heading across the shared components (`PageHero.tsx`'s `h1`, `CoverageGrid.tsx`'s `h2`, `SubCta.tsx`'s `h2`, `app/page.tsx`'s hero `KineticHeading` and section headings) and on each page's local `h2`s that currently use `font-serif`.
- Body copy, card text, and paragraph text keep the current system sans (`--font-sans`) — unchanged.
- Mono eyebrows/labels (`RECRUTEMENT`, `PROFILS RECHERCHÉS`, section tags) keep `--font-mono` — unchanged; this contrast (heavy display headline vs. small mono label vs. plain body) is the "agency" typographic rhythm being targeted.
- Heading sizes increase modestly at the largest breakpoints (e.g. `PageHero`'s `h1` from `46px`→`~56px` at `md`) to use the new font's weight and bounding-box scale better; exact values are decided during implementation planning, not this spec.

`RejoindreArt3D.tsx`, `TiltCard.tsx`, and other non-typographic components from the prior `/rejoindre` work are unaffected.

## Motion

No new motion dependency — everything below extends the existing `framer-motion` usage.

- **`CustomCursor.tsx`**: add a contextual "label" state. Elements that opt in (via a `data-cursor-label="Voir"`-style attribute, matching the existing `.cursor-hover` class-based opt-in pattern already used by `MagneticButton`) cause the cursor to scale up further and show a short word inside it. Used initially on the home page's pillar cards (`app/page.tsx`'s `PILLARS` section) and the WebGL hero.
- **`MagneticButton.tsx`**: increase the pull radius and spring strength (current `stiffness: 300, damping: 20` on a `0.25`/`0.35` displacement factor) — exact tuning during implementation, validated visually, not testable via assertions.
- **`KineticHeading.tsx`**: used more widely — every major section heading on the home page adopts it (currently only the hero `h1` does), not just the top-of-page title. No API change needed; it already takes arbitrary `text`/`className`/`as`.
- **`Reveal.tsx`**: unchanged; applied more consistently across new home-page sections.
- **New: scroll parallax on the home hero.** A small `HeroParallax` wrapper (or inline `useScroll`/`useTransform` in `app/page.tsx`) moves the hero copy and the new WebGL background at slightly different vertical speeds as the user scrolls past the hero. Disabled under `prefers-reduced-motion: reduce` (checked via the existing `lib/useMediaQuery.ts` hook, consistent with every other motion gate in this codebase).

## WebGL hero background

**New dependencies:** `three`, `@react-three/fiber`, `@react-three/drei` (explicit user decision to add WebGL; combined they add roughly 150–200KB gzipped, loaded client-side only on the home route).

**Component:** `components/HeroField.tsx` (new), rendered inside `app/page.tsx`'s hero `<header>`, behind the existing text/CTA content (`position: absolute; inset: 0; z-index: 0`, content stays `z-10`).

- A single full-bleed `<Canvas>` (`@react-three/fiber`) containing one full-screen plane with a custom GLSL shader material (`@react-three/drei`'s `shaderMaterial` helper):
  - A soft gradient blending the existing `--color-ink`/`--color-coral` tokens (the hero already has a dark `bg-ink` background — the shader lives *within* that dark field, e.g. ink base with a subtle coral-tinted glow, not the light ivory tones used elsewhere on the page).
  - A slow-animated grain/noise overlay (simplex noise in the fragment shader, low amplitude) so the field doesn't read as a flat gradient.
  - The gradient's center offsets a few percent toward the pointer position (via a `uMouse` uniform updated on `pointermove`, same normalized-offset pattern already used in `RejoindreArt3D.tsx` and `TiltCard.tsx` — `(clientX - rect.left) / rect.width - 0.5`), spring-damped, not 1:1 tracking.
- **Client-only, lazy-loaded:** imported via `next/dynamic` with `ssr: false`, so the ~150–200KB three.js payload never blocks the initial server-rendered hero (text/CTA render immediately; the canvas mounts after hydration).
- **Fallback (no canvas mounted) when:** `prefers-reduced-motion: reduce` (via `useMediaQuery`, same hook as everywhere else) — renders a static CSS gradient using the same two color tokens instead of the animated shader. Also used if `next/dynamic`'s client component fails to mount (standard React error boundary around the dynamic import, falling back to the same static gradient).
- Does not replace `HeroTriangle` (the existing subtle SVG accent in the hero) or `HeroMark` — those stay as foreground/mid-ground elements; the shader is purely the back-most layer.

## Non-goals

- No dark-theme change to the rest of the site (ivory/paper backgrounds elsewhere are unchanged).
- No WebGL anywhere outside the home hero in this pass.
- No page-transition system (WebGL or otherwise) between routes.
- No bespoke redesign of the 9 non-home pages' content/layout beyond what the shared-component typography and motion changes already give them.
- `RejoindreArt3D.tsx`/`TiltCard.tsx` (prior work) are not touched.

## Testing

This repo has no test runner (no jest/vitest). Verification is `npm run lint`, `npm run build`, and manual browser checks:
- Visual check of the new typography across at least the home page and one sub-page (font loads, weight/size read correctly, no layout shift/FOUT beyond what `next/font`'s automatic `font-display` handling already covers).
- Manual hover/pointer checks for the cursor label state, the strengthened magnetic buttons, and the WebGL hero's mouse-reactive gradient.
- `prefers-reduced-motion: reduce` emulation: confirm the hero falls back to the static gradient (no canvas/animation), and that parallax is disabled.
- A basic no-WebGL/low-end check: throttle or disable WebGL in devtools (or use a browser context without it) and confirm the static-gradient fallback renders instead of a blank hero.

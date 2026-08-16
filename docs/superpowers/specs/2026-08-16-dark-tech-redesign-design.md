# Design: Refonte identité visuelle — "empire d'ingénieurs" dark-tech (Phase 1)

## Context

Mundiis est une entreprise technologique béninoise (matériel informatique,
logiciels, IA/data, conseil, énergie solaire). Le site actuel a déjà reçu une
première passe de refonte "agency premium" (curseur custom, boutons
magnétiques, typographie cinétique, hero WebGL, palette encre/ivoire/corail)
— non committée, encore visible dans `git status`.

Le user demande une refonte complète ("de A à Z"), avec une décision
explicite de repartir sur une identité visuelle neuve plutôt que de
prolonger la direction "agency" existante. Direction choisie : **tech
minimaliste sombre**, inspirée de Linear/Vercel/Stripe — pas l'esthétique
"agence créative bold" (Cuberto/Awwwards) précédemment explorée. Le hero
doit transmettre immédiatement "vous entrez dans un empire d'ingénieurs en
informatique" via un **visuel technique abstrait** (pas un bandeau de
chiffres). Contenu métier encore provisoire ailleurs dans le repo (études de
cas entre crochets) — cette spec peut introduire du contenu de démonstration
qui sera remplacé plus tard par le user.

## Scope & phasing

**Phase 1 (cette spec) :** nouveau socle de design (tokens, typographie) +
composants partagés (`Nav`, `Footer`, `MagneticButton`, cards) + page
d'accueil (`app/page.tsx`) reconstruite de bout en bout comme étalon visuel.

**Phase 2 (hors scope, spec séparée ultérieure) :** application de la
nouvelle identité aux 7 pages restantes (`/services`, `/projets`,
`/creations`, `/rejoindre`, `/actualites`, `/contact`, `/apropos`) — elles
héritent déjà partiellement des changements via les composants partagés,
mais leur contenu/layout propre n'est pas retouché dans cette passe.

Non touché dans cette phase : structure de navigation (les 7 liens de
`Nav.tsx` restent identiques), contenu métier des pillars
(`lib/pillars.ts`), `RejoindreArt3D.tsx`/`TiltCard.tsx` (travail antérieur
sur `/rejoindre`, hors page d'accueil).

## Palette & tokens (`app/globals.css`)

Réutilise et formalise les tokens dark déjà présents plutôt que d'en créer
de nouveaux :

- `--color-ink` (`#111214`) devient le fond sombre principal (`body`,
  `Nav`, `Footer`, hero, sections dark).
- `--color-ink2` (`#0c0d0f`) sert de ton "surface élevée" pour les cards et
  la nav au scroll (légère différenciation de profondeur, pas un vrai
  système d'élévation à plusieurs niveaux).
- `--color-ivory`/`--color-paper` restent les tons clairs, utilisés pour
  1–2 sections de contraste sur la home (dosage ajusté visuellement à
  l'implémentation — pas figé ici).
- `--color-coral` (`#FF5C39`) reste l'unique accent, inchangé. Nouveau
  `--color-coral-glow` (coral à faible opacité, ex. `rgba(255,92,57,0.35)`)
  pour les effets de lueur du hero et les halos au survol — dérivé du même
  token, pas une nouvelle couleur de marque.
- Nouveau `--color-border-dark` : hairline blanc à faible opacité (ex.
  `rgba(243,241,236,0.10)`) pour les séparateurs sur fond sombre —
  `--color-line-dark` existe déjà à une valeur proche (`0.14`), à réutiliser
  ou ajuster plutôt que dupliquer.
- Texte sur fond sombre : `--color-ivory` pour le texte primaire (déjà le
  cas dans le hero actuel), `ivory/70`-ish pour le texte secondaire —
  cohérent avec l'usage existant (`text-ivory/72` dans le hero actuel).

## Typographie

Remplacer **Bricolage Grotesque** (`next/font/google`, chargé dans
`app/layout.tsx`) par **Geist Sans + Geist Mono** (`next/font/google`,
licence SIL/MIT, la police de Vercel — colle directement à la référence
Linear/Vercel choisie) :

- `--font-display` → Geist Sans, poids 700–900, sur tous les titres
  actuellement en `font-display`/`font-serif` (via les composants
  partagés : `PageHero`, `KineticHeading`, `h2` de section).
- `--font-sans` (corps de texte) → Geist Sans poids régulier, remplace la
  pile système actuelle.
- `--font-mono` (eyebrows, labels, tags) → Geist Mono, remplace la pile
  système mono actuelle.
- Si "Geist" n'est pas disponible dans le catalogue `next/font/google` de
  cette version de Next au moment de l'implémentation, fallback vers
  **Inter** (display+sans) + **JetBrains Mono** — décision prise à
  l'implémentation si besoin, pas une branche à coder.

## Hero (`app/page.tsx` + `components/HeroField.tsx`)

Réécriture du shader existant dans `HeroField.tsx` (three.js/
`@react-three/fiber`/`@react-three/drei` déjà installés — dépendances
réutilisées, pas de nouvel ajout) :

- Remplace le glow dégradé actuel (`GradientFieldMaterial`, mix
  ink→coral radial) par une **grille technique animée** : lignes fines
  formant une grille perspective/isométrique subtile, avec des **nœuds
  lumineux** (points d'intersection) qui pulsent doucement et
  s'illuminent davantage près du curseur — évoque un schéma
  d'ingénierie/réseau plutôt qu'un blob abstrait. Discret, pas un champ
  de particules dense type "particles.js".
- Conserve le pattern existant : `uMouse` piloté par `pointermove`,
  normalisation `(clientX - rect.left) / rect.width - 0.5`, uniform
  `uTime` pour l'animation continue.
- Conserve `HeroFieldBoundary` (error boundary) et le fallback
  `prefers-reduced-motion` (`StaticHeroField`, actuellement un gradient
  radial CSS statique) — adapté aux nouvelles couleurs mais même
  mécanisme (pas de nouvelle logique de détection).
- Copy du hero : titre + sous-titre adaptés pour évoquer l'échelle/
  l'expertise technique ("empire d'ingénieurs") — contenu de démonstration
  fourni par moi, à remplacer par le user ensuite. Structure existante
  (eyebrow mono, `KineticHeading` h1, paragraphe, deux `MagneticButton`)
  conservée.

## Composants partagés (Nav, Footer, boutons, cards)

- **`Nav.tsx`** : fond `bg-ink/80` + `backdrop-blur` en sticky (actuellement
  probablement clair ou transparent sur fond clair — à vérifier à
  l'implémentation), liens en ivory, état actif/hover en corail. Les 7
  liens (`Accueil`, `Nos services`, `Nos projets`, `Mundiis Labs`,
  `Rejoindre`, `Actualités`, `Contact`) restent inchangés.
- **`Footer.tsx`** : repassé en fond `ink`/`ink2`, cohérent avec le reste.
- **`MagneticButton.tsx`** : variantes `primary`/`ghost`/`ink` restylées
  pour fonctionner sur fond sombre (le variant `ink` actuel, pensé pour
  fond clair, est réévalué — probablement renommé/ajusté en variant
  adapté au fond sombre).
- **`PillarCard.tsx`** et les cards de la section stats : fond `ink2`,
  bordure `border-dark`, hover avec léger glow corail.

## Nouvelles sections de contenu (home)

Ajout de deux sections entre les pillars et le CTA final, avec du contenu
de démonstration (fourni par moi, à remplacer par le user) :

- **"Notre méthode"** : 3–4 étapes du processus de travail (ex. cadrage du
  besoin → fourniture/déploiement → mise en service → suivi), présentées en
  cards numérotées horizontales, avec `Reveal` en cascade — renforce
  concrètement le positionnement "empire d'ingénieurs" en montrant une
  méthode structurée plutôt qu'une simple promesse.
- **"Pourquoi Mundiis" / crédibilité** : section courte orientée sérieux
  professionnel — 3–4 points de confiance en cards (ex. engagement qualité,
  accompagnement après livraison, ancrage local Bénin, réactivité) plutôt
  que des logos de certification qui n'existent pas encore. Objectif :
  qu'un visiteur perçoive une entreprise structurée et fiable, pas une
  simple vitrine. Contenu concret fourni par moi, à ajuster/étoffer par le
  user avec ses vraies preuves (certifications, chiffres, clients) ensuite.

Ces deux sections réutilisent le même système de card que `PillarCard`
(fond `ink2`, bordure subtile, hover avec glow — voir section Effets
ci-dessous) pour rester cohérentes visuellement, pas un nouveau style de
card par section.

## Effets UI/UX minimalistes (site-wide sur les éléments partagés + home)

Quatre effets, tous subtils et désactivés sous `prefers-reduced-motion:
reduce` (via `lib/useMediaQuery.ts`, cohérent avec le reste du site) :

- **Scroll reveal + hover glow sur les cards** : extension de l'usage
  existant de `Reveal.tsx` (déjà en cascade sur les pillars) à toutes les
  nouvelles cards (méthode, crédibilité) ; au survol, halo corail à faible
  opacité (`--color-coral-glow`) en `box-shadow`/`filter`, pas de
  changement de layout.
- **Bordure animée au survol des cards** : la bordure (`--color-border-dark`)
  s'illumine légèrement ou suit la position du curseur dans la card
  (technique CSS `radial-gradient` positionné via variables CSS mises à
  jour au `pointermove`, pattern déjà utilisé dans `TiltCard.tsx`/
  `RejoindreArt3D.tsx` — réutilisé, pas réinventé).
- **Spotlight curseur sur les sections sombres** : un halo lumineux discret
  (radial-gradient corail à très faible opacité, ~150–200px) suit la souris
  en arrière-plan des sections `ink`/`ink2` de la home — effet "lampe
  torche" façon Linear/Stripe. Un seul composant réutilisable (ex.
  `CursorSpotlight.tsx`), appliqué aux sections concernées, pas par card
  individuellement.
- **Transitions de page douces** : fade/léger slide (`framer-motion`,
  `AnimatePresence` au niveau du layout `app/layout.tsx` ou d'un template
  Next.js dédié) entre les routes — s'applique à tout le site dès cette
  phase puisque c'est un changement au niveau layout, même si le contenu
  des 7 pages secondaires n'est pas retouché.

## Section marquee (nouveau composant)

`components/Marquee.tsx` a été supprimé (visible dans `git status`, non
committé) — il est réintroduit, redessiné pour le thème sombre : bandeau à
défilement infini (CSS `@keyframes` translateX, pas de nouvelle dépendance)
listant des technologies/partenaires. Contenu de démonstration (noms de
technologies génériques ou placeholders `[Partenaire]`) fourni par moi, à
remplacer par le user. Inséré sur la home juste sous le hero ou juste avant
le CTA final (position exacte décidée à l'implémentation selon le rythme
visuel).

## Sections existantes de la home — reconstruction

- **Pillars** (`#pillars`) : grille des 5 métiers, restylée dark, garde sa
  structure (grid `sm:grid-cols-6`, `PillarCard`, `Reveal` en cascade).
- **Stats** : 3 cases (`Counter` pour les valeurs numériques), restylées
  dark ou laissées sur fond clair selon le rythme choisi (voir palette) —
  `DotField.tsx` (illustration de fond) adaptée aux nouvelles couleurs ou
  remplacée par un motif cohérent avec la grille du hero.
- **CTA final** : reste sur fond corail plein (`bg-coral`) — c'est déjà la
  seule rupture chromatique forte du design actuel et elle fonctionne
  aussi bien en contexte dark-first.

## Non-goals

- Pas de refonte des 7 pages secondaires (Phase 2, spec séparée).
- Pas de changement de la structure de navigation ni du contenu métier des
  5 activités (`lib/pillars.ts`).
- Pas de refonte du curseur custom lui-même (`CustomCursor.tsx`) au-delà
  d'un restyle — le nouveau `CursorSpotlight.tsx` (section Effets) est un
  effet de fond additif, pas un remplacement du système de curseur
  existant.
- Pas de CMS/backend pour le marquee ou les stats — contenu statique en
  dur, comme le reste du site actuellement.
- `RejoindreArt3D.tsx`/`TiltCard.tsx` non touchés.

## Testing

Pas de test runner dans ce repo (pas de jest/vitest) — vérification :

- `npm run lint` et `npm run build` sans erreur.
- Contrôle visuel sur le serveur de dev déjà lancé (`localhost:3000`) :
  hero (grille animée + nœuds, réactivité souris), nav/footer en thème
  sombre, marquee en défilement, pillars/stats/CTA cohérents.
- Emulation `prefers-reduced-motion: reduce` : hero retombe sur le
  fallback statique, pas d'animation de grille.
- Vérification rapide d'accessibilité du contraste texte ivory/coral sur
  fond ink (déjà globalement validé par l'usage actuel du hero, à
  reconfirmer sur les nouvelles sections dark).

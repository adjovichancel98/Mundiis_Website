# Vitrine "Nos créations" — redesign plein écran/parallax/WebGL

## Contexte

Demande initiale : redesigner le site en entièreté dans une direction "Web & Interactive,
Luxury, Animation, Big Background Images, Fullscreen, Parallax, Typography, WebGL,
Next.js, Sanity". Vu l'ampleur, le projet a été découpé en sous-projets (voir
[Sous-projets](#sous-projets-décomposition) plus bas). Ce spec couvre uniquement le
premier : la refonte de la page `/creations` ("Nos créations" / Mundiis Labs), qui sert
aussi de fondation au système de design du reste du site.

Décisions prises pendant le cadrage :
- Pas de site de référence précis — direction de style générale.
- Pas d'e-commerce. Priorité explicite du demandeur : "bien présenter mes projets".
- Aucune vraie photo disponible dans le projet (`public/` ne contient que des SVG
  Next.js par défaut) → utilisation de compositions générées (WebGL/gradients), pas de
  placeholders photo à remplacer plus tard par défaut — à réévaluer si de vraies images
  arrivent.
- Identité visuelle actuelle conservée (ivoire `#F3F1EC` / encre `#111214` / corail
  `#FF5C39`, typo Bricolage Grotesque) — le côté "luxe" vient de l'expérience
  (mouvement, échelle, WebGL, plein écran), pas d'un changement de palette.

## Objectif

Remplacer le bloc `CreationsList` actuel (liste groupée classique) par une expérience
plein écran par catégorie, dans l'esprit d'un site vitrine primé (Awwwards-like), tout en
réutilisant l'identité et les mécanismes d'animation déjà en place sur le site.

## Périmètre

- Page concernée : `app/creations/page.tsx` uniquement.
- `PageHero` en haut de page et `SubCta` en bas : inchangés.
- `lib/creations.ts` (données des 11 projets, 3 catégories) : inchangé.
- `CreationsList.tsx` : remplacé par un nouveau composant (voir ci-dessous). Le fichier
  existant peut être supprimé s'il n'est plus utilisé ailleurs après la refonte
  (vérifier avant suppression).

## Design

### Structure de page

```
PageHero (inchangé)
  ↓
Chapitre 01 — Applications mobiles (plein écran)
  ↓
Chapitre 02 — Data & intelligence artificielle (plein écran)
  ↓
Chapitre 03 — Web (plein écran)
  ↓
SubCta (inchangé)
```

### Fond WebGL par chapitre

Réutilisation du moteur de shader existant (`HeroField.tsx` /
`GradientFieldMaterial`) : mix encre/corail réactif à la position de la souris, avec
grain animé. Pas de nouvelle couleur.

Nouveau composant `components/CategoryField.tsx` : variante paramétrable du shader
existant acceptant un `variant: number` (0, 1, 2 — un par catégorie) qui fait varier,
via les uniforms du shader :
- le rayon/l'intensité du glow (`smoothstep` range),
- l'échelle et la vitesse du grain,
- éventuellement une légère distorsion d'onde additionnelle pour le variant 2.

Chaque chapitre doit rester visuellement distinct sans sortir de la palette ink/coral.

### Typographie & layout

Dans chaque chapitre plein écran :
- Un très grand intitulé de catégorie en arrière-plan (ex. `01 — MOBILE`), en
  `font-display`, couleur ivoire à faible opacité (~10–15%), `pointer-events-none`,
  purement décoratif. Taille bornée avec `clamp()` pour rester lisible/contenue sur
  mobile (pas de débordement horizontal).
- Par-dessus, en colonne centrée (`max-w-[1180px]`, cohérent avec le reste du site) :
  la liste des projets de la catégorie, reprenant le format actuel de `CreationsList`
  (nom, description, stack, badge de statut) mais à une échelle plus généreuse, adaptée
  au format plein écran.

### Parallax & animations

- Le grand titre de fond dérive légèrement au scroll (parallax lent) via
  `useScroll`/`useTransform` de Framer Motion, ancré sur la section (pas sur la page
  entière).
- Les lignes de projets apparaissent en fondu/décalage au scroll via le composant
  `Reveal` déjà utilisé partout ailleurs sur le site — pas de nouveau système
  d'animation à maintenir.

### Comportement mobile

- Chaque chapitre utilise `min-h-screen` (pas de hauteur fixe, pas de scroll-snap) pour
  ne jamais couper de contenu si la liste déborde la hauteur d'écran.
- Le shader WebGL est déjà utilisé sur toutes les tailles d'écran via `HeroField`
  ailleurs sur le site (hero de chaque page) ; même traitement ici, pas de fallback
  spécifique nécessaire.

### Composants techniques

- `components/CategoryField.tsx` (nouveau) — fond WebGL paramétrable par variant.
- `components/CreationsShowcase.tsx` (nouveau) — orchestre les 3 chapitres plein écran
  (fond + titre géant + liste de projets), consomme `lib/creations.ts`.
- `app/creations/page.tsx` — remplace `<CreationsList />` par `<CreationsShowcase />`.
- `components/CreationsList.tsx` — à supprimer si plus référencé nulle part après la
  bascule (vérifier avec un grep avant suppression).

## Hors périmètre (sous-projets décomposition)

Rappel du découpage validé — non traité par ce spec :

2. Page d'accueil + hero WebGL/parallax (au-delà du hero déjà existant).
3. ~~Vitrine créations/projets~~ → fusionné dans ce spec (décision prise pendant le
   cadrage : construire le système à travers cette page plutôt que dans l'abstrait).
4. Reste des pages (Services, Rejoindre, Actualités, Contact, Pourquoi Mundiis) —
   propager le système établi ici une fois validé.
5. Intégration Sanity CMS — rendre le contenu éditable. Indépendant du visuel, peut se
   faire en parallèle ou après.
6. Page "Nos projets" (`/projets`, études de cas clients) — non couverte ici, contenu
   encore en placeholder (`lib/pillars.ts`). À traiter séparément une fois du vrai
   contenu disponible.

## Critères de succès

- `/creations` affiche 3 sections plein écran distinctes, une par catégorie, avec fond
  WebGL animé et titre géant en arrière-plan.
- Les 11 projets restent tous listés, groupés par catégorie, avec nom/description/
  stack/statut visibles.
- Aucune régression sur mobile (pas de contenu coupé, pas de débordement horizontal).
- `npx tsc --noEmit` passe sans erreur.
- Le reste du site (nav, autres pages) n'est pas affecté.

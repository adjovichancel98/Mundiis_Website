# Mundiis — site Next.js

Stack : **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion**.

## Démarrer

```bash
npm install
npm run dev
```

Puis ouvrir [http://localhost:3000](http://localhost:3000).

## Build de production

```bash
npm run build
npm run start
```

## Structure

- `app/` — une vraie route par page (`/equipements`, `/logiciels`, `/ia-data`,
  `/conseil`, `/energie`, `/apropos`, `/rejoindre`, `/actualites`, `/contact`),
  chacune server-rendue par Next.js.
- `components/` — composants partagés (nav, footer, curseur personnalisé,
  boutons magnétiques, titre cinétique, compteurs animés, illustrations SVG).
- `lib/pillars.ts` — le contenu des 5 activités, centralisé (une seule source
  de vérité réutilisée par la page d'accueil et les pages dédiées).

## Configuration requise avant mise en ligne

- **Formulaire de contact** (`components/ContactForm.tsx` → `app/api/contact/route.ts`) :
  envoie un email via [Resend](https://resend.com) (plan gratuit disponible).
  Copier `.env.example` vers `.env.local` et renseigner `RESEND_API_KEY`
  (créer un compte Resend, générer une clé). Sans cette variable, la route
  API renvoie une erreur claire au lieu d'échouer silencieusement.
  Pour la production, vérifier votre propre domaine d'envoi dans Resend et
  renseigner `CONTACT_FROM_EMAIL` (sinon l'adresse de test `onboarding@resend.dev`
  est utilisée, limitée en volume).
- La page **Actualités** est une structure vide, prête à recevoir de vrais
  articles (par exemple via un CMS headless ou des fichiers MDX).

## Déploiement

Le moyen le plus direct est [Vercel](https://vercel.com/new) (créateur de
Next.js) : `vercel` en ligne de commande, ou en connectant le dépôt Git.
Netlify et tout hébergeur compatible Node.js fonctionnent aussi.

## Couleurs de la marque

| Nom    | Valeur                                              |
| ------ | ---------------------------------------------------- |
| Encre  | `#111214`                                             |
| Ivoire | `#F3F1EC`                                             |
| Corail | `#FF5C39` (seul accent — ne pas en ajouter d'autre)   |

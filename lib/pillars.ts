export type CaseStudy = {
  client: string;
  result: string;
  text: string;
};

export type Pillar = {
  slug: string;
  tag: string;
  title: string;
  intro: string;
  coverage: { title: string; text: string }[];
  spotlight: { title: string; text: string };
  caseStudies: CaseStudy[];
  subCta: string;
};

export const pillars: Pillar[] = [
  {
    slug: "equipements",
    tag: "01 · Activité principale",
    title: "Équipements informatiques",
    intro:
      "Fourniture et livraison de matériel informatique et technologique. C'est le métier sur lequel Mundiis est né, et celui qui reste au centre de l'entreprise.",
    coverage: [
      {
        title: "Postes de travail & portables",
        text: "Ordinateurs fixes et portables adaptés à l'usage réel de chaque équipe.",
      },
      {
        title: "Serveurs & réseau",
        text: "Infrastructure réseau et serveurs pour faire tourner les outils de l'entreprise.",
      },
      {
        title: "Périphériques & accessoires",
        text: "Écrans, imprimantes, accessoires — tout ce qui entoure le poste de travail.",
      },
      {
        title: "Livraison & mise en service",
        text: "Le matériel livré et prêt à l'usage, pas juste déposé à la réception.",
      },
    ],
    spotlight: {
      title: "Livré ne veut pas dire terminé",
      text: "Le matériel livré est installé, configuré et vérifié avant qu'on considère la mission finie — pas juste déposé à la réception. C'est ce qui distingue une livraison d'un vrai équipement prêt à l'usage.",
    },
    caseStudies: [
      {
        client: "[Client — secteur, ex : banque / assurance]",
        result: "[Ex : XX postes déployés en X semaines]",
        text: "[Contexte du projet : quel besoin de départ, ce qui a été fourni et installé, comment la mise en service s'est passée.]",
      },
      {
        client: "[Client — secteur, ex : PME / industrie]",
        result: "[Ex : parc informatique renouvelé sur X sites]",
        text: "[Contexte du projet : quel besoin de départ, ce qui a été fourni et installé, comment la mise en service s'est passée.]",
      },
    ],
    subCta: "Un besoin en matériel à équiper ?",
  },
  {
    slug: "logiciels",
    tag: "Logiciels & digital",
    title: "Logiciels & solutions digitales",
    intro:
      "Développement de logiciels et de solutions digitales sur mesure, pensés pour les besoins réels de nos clients — pas des outils génériques.",
    coverage: [
      {
        title: "Développement sur mesure",
        text: "Des logiciels pensés pour un besoin précis, pas adaptés d'un modèle générique.",
      },
      {
        title: "Applications web & mobile",
        text: "Des outils accessibles là où vos équipes et vos clients en ont besoin.",
      },
      {
        title: "Intégration à l'existant",
        text: "Des solutions qui s'insèrent dans les outils déjà en place, sans tout casser.",
      },
      {
        title: "Maintenance évolutive",
        text: "Le logiciel continue d'évoluer avec l'entreprise après la livraison.",
      },
    ],
    spotlight: {
      title: "Livré ne veut pas dire terminé",
      text: "Un logiciel vit après sa mise en ligne : correctifs, ajustements, nouvelles fonctionnalités. Mundiis reste impliqué au-delà de la première livraison.",
    },
    caseStudies: [
      {
        client: "[Client — secteur, ex : logistique / distribution]",
        result: "[Ex : outil interne utilisé par X équipes]",
        text: "[Contexte du projet : quel processus manuel ou outil générique a été remplacé, ce qui a été développé, l'impact pour les équipes.]",
      },
      {
        client: "[Client — secteur, ex : services / retail]",
        result: "[Ex : application web/mobile lancée en X mois]",
        text: "[Contexte du projet : quel besoin de départ, ce qui a été construit, comment ça s'intègre à l'existant.]",
      },
    ],
    subCta: "Un logiciel ou un outil digital à construire ?",
  },
  {
    slug: "ia-data",
    tag: "IA & data",
    title: "Intelligence artificielle & donnée",
    intro:
      "Intégration de l'intelligence artificielle et de la donnée dans les outils et les processus de nos clients.",
    coverage: [
      {
        title: "Intégration dans l'existant",
        text: "De l'IA branchée sur les outils que vos équipes utilisent déjà.",
      },
      {
        title: "Valorisation de la donnée",
        text: "Faire parler les données déjà collectées plutôt que d'en accumuler de nouvelles.",
      },
      {
        title: "Automatisation de processus",
        text: "Réduire les tâches répétitives qui ralentissent les équipes.",
      },
      {
        title: "Tableaux de bord & analyse",
        text: "Voir ce qui se passe dans l'activité, pas juste le deviner.",
      },
    ],
    spotlight: {
      title: "Commencer petit, avant de généraliser",
      text: "Un projet IA ou data qui démarre par un cas d'usage précis a plus de chances d'aboutir qu'un projet qui veut tout automatiser d'un coup. Mundiis propose de commencer par un périmètre limité, mesurable, avant d'étendre.",
    },
    caseStudies: [
      {
        client: "[Client — secteur, ex : finance / assurance]",
        result: "[Ex : -X% de temps sur une tâche répétitive]",
        text: "[Contexte du projet : quel processus a été automatisé ou quelle donnée valorisée, ce qui a été mis en place, l'impact mesuré.]",
      },
      {
        client: "[Client — secteur, ex : commerce / services]",
        result: "[Ex : tableau de bord suivi par X équipes]",
        text: "[Contexte du projet : quel besoin de visibilité au départ, ce qui a été livré, comment c'est utilisé au quotidien.]",
      },
    ],
    subCta: "Une donnée à faire parler, un processus à automatiser ?",
  },
  {
    slug: "conseil",
    tag: "Conseil",
    title: "Conseil informatique",
    intro:
      "Accompagnement et conseil en informatique, pour aider nos clients à faire les bons choix technologiques avant d'investir.",
    coverage: [
      {
        title: "Audit de l'existant",
        text: "Comprendre ce qui fonctionne, ce qui coûte cher, et ce qui bloque.",
      },
      {
        title: "Recommandations technologiques",
        text: "Des choix adaptés au budget et à la taille réelle de l'entreprise.",
      },
      {
        title: "Accompagnement de projet",
        text: "Présents du cahier des charges jusqu'à la mise en route.",
      },
      {
        title: "Formation des équipes",
        text: "Un outil n'est utile que si les équipes savent s'en servir.",
      },
    ],
    spotlight: {
      title: "La formation, pas juste la livraison",
      text: "Un outil ou un logiciel n'apporte rien si l'équipe qui doit s'en servir n'est pas à l'aise avec. Le conseil Mundiis inclut la prise en main : on explique, on montre, on reste disponible pour les questions qui arrivent une fois l'outil vraiment en usage.",
    },
    caseStudies: [
      {
        client: "[Client — secteur, ex : entreprise en croissance]",
        result: "[Ex : audit livré en X semaines, X recommandations priorisées]",
        text: "[Contexte du projet : quelle décision technologique était en jeu, ce que l'audit a révélé, les choix qui en ont découlé.]",
      },
      {
        client: "[Client — secteur, ex : PME multi-sites]",
        result: "[Ex : X équipes formées à un nouvel outil]",
        text: "[Contexte du projet : quel accompagnement a été mené du cahier des charges à la mise en route, et la formation associée.]",
      },
    ],
    subCta: "Besoin d'y voir clair avant d'investir ?",
  },
  {
    slug: "energie",
    tag: "Énergie solaire",
    title: "Énergie solaire",
    intro:
      "Fourniture d'équipements d'énergie solaire, pour des entreprises qui veulent plus d'autonomie énergétique.",
    coverage: [
      {
        title: "Fourniture d'équipements",
        text: "Panneaux, batteries et onduleurs adaptés au besoin de l'entreprise.",
      },
      {
        title: "Dimensionnement",
        text: "Une installation calculée pour la consommation réelle, pas surdimensionnée.",
      },
      { title: "Installation", text: "Mise en place de l'équipement chez le client." },
      {
        title: "Autonomie énergétique",
        text: "Moins de dépendance aux coupures et aux variations du réseau.",
      },
    ],
    spotlight: {
      title: "Un dimensionnement, pas un catalogue",
      text: "Une installation solaire surdimensionnée coûte cher pour rien ; sous-dimensionnée, elle déçoit. Mundiis calcule la consommation réelle de l'entreprise avant de proposer un équipement, plutôt que de vendre une taille standard.",
    },
    caseStudies: [
      {
        client: "[Client — secteur, ex : site industriel]",
        result: "[Ex : X kWc installés, coupures réseau absorbées]",
        text: "[Contexte du projet : quelle dépendance au réseau au départ, le dimensionnement retenu, l'équipement installé.]",
      },
      {
        client: "[Client — secteur, ex : bureaux / commerce]",
        result: "[Ex : autonomie partielle sur les heures de pointe]",
        text: "[Contexte du projet : la consommation réelle mesurée, l'équipement proposé et installé, le résultat pour le client.]",
      },
    ],
    subCta: "Un projet d'autonomie énergétique ?",
  },
];

export function getPillar(slug: string) {
  return pillars.find((p) => p.slug === slug);
}

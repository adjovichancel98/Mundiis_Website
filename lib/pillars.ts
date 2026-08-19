export type CaseStudy = {
  client: string;
  problem: string;
  approach: string;
  result: string;
};

export type Pillar = {
  slug: string;
  tag: string;
  title: string;
  intro: string;
  metaDescription: string;
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
    metaDescription:
      "Fourniture, livraison et mise en service d'équipements informatiques — postes de travail, serveurs, réseau — pour entreprises à Cotonou et dans tout le Bénin.",
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
        client: "Banque régionale, Cotonou",
        problem: "Parc informatique vieillissant à renouveler sans interrompre l'activité de l'agence.",
        approach:
          "Renouvellement complet des postes de travail et imprimantes réseau, mise en service sur site échelonnée.",
        result: "Parc entièrement renouvelé, aucune interruption de l'activité.",
      },
      {
        client: "Groupe industriel, multi-sites",
        problem: "Matériel hétérogène entre plusieurs sites de production, support compliqué.",
        approach:
          "Standardisation de la configuration sur tous les sites, livraison échelonnée pour ne pas arrêter la production.",
        result: "Même configuration partout, support simplifié.",
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
    metaDescription:
      "Développement de logiciels et d'applications web sur mesure pour entreprises au Bénin — outils internes, plateformes métier, solutions digitales.",
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
        client: "Entreprise de distribution",
        problem: "Suivi des commandes et des stocks géré sur tableur, source d'erreurs de saisie.",
        approach: "Développement d'une application web sur mesure pour la gestion des commandes et des stocks.",
        result: "Moins d'erreurs de saisie, visibilité en temps réel pour les équipes terrain.",
      },
      {
        client: "Enseigne retail",
        problem: "Pas de programme de fidélité ni de commande en ligne connectés à la caisse existante.",
        approach:
          "Développement d'une application de fidélité et de commande en ligne connectée au système de caisse, pensée pour une prise en main rapide.",
        result: "Application de fidélité et de commande en ligne opérationnelle, sans formation lourde nécessaire.",
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
    metaDescription:
      "Intégration d'intelligence artificielle et de solutions data pour entreprises à Cotonou et au Bénin — automatisation, analyse de données, formation.",
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
        client: "Compagnie d'assurance",
        problem: "Tri et pré-vérification des dossiers clients effectués manuellement, chronophage.",
        approach: "Automatisation du tri et de la pré-vérification à partir des documents reçus.",
        result: "Les équipes se concentrent sur les cas qui demandent un vrai arbitrage.",
      },
      {
        client: "Réseau de commerces",
        problem: "Ventes de plusieurs points de vente suivies via des rapports envoyés manuellement chaque semaine.",
        approach: "Centralisation des données de vente dans un tableau de bord unique.",
        result: "Suivi des ventes en temps réel, fin des rapports manuels hebdomadaires.",
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
    metaDescription:
      "Conseil en stratégie IT et transformation technologique pour entreprises béninoises — audit, feuille de route, accompagnement à Cotonou.",
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
        client: "Entreprise en croissance",
        problem: "Besoin de clarifier l'état de l'infrastructure technologique avant une levée de fonds.",
        approach: "Diagnostic complet de l'infrastructure existante.",
        result: "Points bloquants identifiés, feuille de route technologique priorisée par budget et impact.",
      },
      {
        client: "PME multi-sites",
        problem: "Besoin d'un nouvel ERP, sans repère pour choisir et déployer la bonne solution.",
        approach: "Accompagnement du choix de l'ERP jusqu'à sa mise en route, avec une session de formation dédiée.",
        result: "Équipes autonomes sur le nouvel ERP dès le premier jour.",
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
    metaDescription:
      "Installation de solutions d'énergie solaire — panneaux, stockage batterie — pour entreprises à Cotonou et dans tout le Bénin.",
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
        client: "Site industriel",
        problem: "Dépendance aux coupures du réseau électrique public sur le site industriel.",
        approach: "Installation solaire dimensionnée sur la consommation réelle du site.",
        result: "Production couvrant l'essentiel des besoins en journée, coupures du réseau public amorties.",
      },
      {
        client: "Immeuble de bureaux",
        problem: "Pics de consommation électrique en journée fortement dépendants du réseau.",
        approach: "Équipement solaire couplé à des batteries de stockage.",
        result: "Dépendance au réseau réduite aux heures les plus chargées.",
      },
    ],
    subCta: "Un projet d'autonomie énergétique ?",
  },
];

export function getPillar(slug: string) {
  return pillars.find((p) => p.slug === slug);
}

export type Position = {
  slug: string;
  title: string;
  location: string;
  summary: string;
  sections: { title: string; items: string[] }[];
};

export const positions: Position[] = [
  {
    slug: "technico-commercial",
    title: "Technico-commercial",
    location: "Cotonou, Bénin",
    summary:
      "Développer le portefeuille clients de Mundiis sur les cinq métiers, du premier contact jusqu'à la signature.",
    sections: [
      {
        title: "Missions",
        items: [
          "Identifier et prospecter des entreprises clientes à Cotonou et dans les autres villes du Bénin",
          "Présenter l'offre Mundiis (équipements informatiques, logiciels, IA & data, conseil, énergie solaire) et qualifier les besoins",
          "Élaborer les devis et propositions commerciales en lien avec les équipes techniques",
          "Monter les dossiers de soumission aux marchés publics (appels d'offres) et en assurer le suivi",
          "Négocier et suivre les contrats jusqu'à la signature",
          "Assurer le suivi de la relation client après la vente",
        ],
      },
      {
        title: "Profil recherché",
        items: [
          "Formation commerciale, technique ou informatique",
          "Première expérience en vente B2B, idéalement dans l'informatique ou les équipements techniques",
          "À l'aise pour échanger aussi bien avec des dirigeants qu'avec des équipes techniques",
          "Autonome, organisé, orienté résultats",
          "Mobile à Cotonou",
        ],
      },
      {
        title: "Compétences",
        items: [
          "Techniques de vente et de négociation B2B",
          "Maîtrise du montage de dossiers de soumission aux marchés publics",
          "Maîtrise du Pack Office (Word, Excel, PowerPoint) et d'un outil CRM",
          "Connaissance des produits IT et solaires appréciée — formation possible en interne sur les spécificités Mundiis",
          "Français courant, l'anglais est un plus",
        ],
      },
    ],
  },
];

export function getPosition(slug: string) {
  return positions.find((p) => p.slug === slug);
}

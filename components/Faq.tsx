const faqs = [
  {
    q: "Travaillez-vous avec des entreprises de toutes tailles ?",
    a: "Oui — notre approche s'adapte au besoin, qu'il s'agisse d'un renouvellement de parc informatique ou d'un projet plus large combinant plusieurs métiers.",
  },
  {
    q: "Faut-il forcément passer par les cinq métiers ?",
    a: "Non. Beaucoup de clients commencent par un seul métier — souvent les équipements — puis élargissent selon leurs besoins.",
  },
  {
    q: "Où intervenez-vous ?",
    a: "Mundiis est basée au Bénin et intervient principalement auprès d'entreprises locales. Contactez-nous pour vérifier la faisabilité selon votre localisation.",
  },
  {
    q: "L'accompagnement s'arrête-t-il après la livraison ?",
    a: "Non — le conseil et le support continuent après la mise en service, que ce soit pour du matériel, un logiciel ou une installation solaire.",
  },
  {
    q: "Comment démarrer un projet avec Mundiis ?",
    a: "Contactez-nous en décrivant votre besoin : nous revenons vers vous pour comprendre le contexte avant de proposer quoi que ce soit.",
  },
  {
    q: "Combien coûte un projet ?",
    a: "Chaque projet est chiffré sur devis — le besoin varie fortement d'une entreprise à l'autre, qu'il s'agisse de matériel, de logiciel, d'IA, de conseil ou d'énergie solaire. Décrivez votre projet et nous revenons vers vous avec une estimation.",
  },
  {
    q: "Combien de temps prend un projet ?",
    a: "Cela dépend de la nature et de l'ampleur du projet. Nous donnons une estimation de délai dès le premier échange, une fois le besoin cadré.",
  },
];

export default function Faq() {
  return (
    <div className="flex flex-col border-t border-line">
      {faqs.map((item, i) => (
        <details key={i} className="faqitem border-b border-line py-[18px]">
          <summary className="relative flex cursor-pointer list-none items-center justify-between gap-4 pr-8 text-[15.5px] font-semibold">
            {item.q}
          </summary>
          <p className="max-w-[68ch] pt-3 text-[15.5px] leading-[1.7] text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

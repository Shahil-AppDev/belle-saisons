export type FaqItem = {
  question: string;
  answer: string;
};

export const HOME_FAQ: FaqItem[] = [
  {
    question: "Quels types de biens gérez-vous ?",
    answer:
      "Belle Saisons accompagne les propriétaires de résidences secondaires, d'appartements et de maisons destinés à la location courte et moyenne durée, à Caen et sur la Côte de Nacre.",
  },
  {
    question: "Puis-je continuer à utiliser mon logement pour mes propres séjours ?",
    answer:
      "Oui. Les périodes que vous souhaitez conserver sont bloquées dans le calendrier de réservation, en coordination avec votre conciergerie.",
  },
  {
    question: "Sur quelles plateformes mon bien sera-t-il diffusé ?",
    answer:
      "Votre annonce est diffusée sur Airbnb, Booking.com et les plateformes complémentaires les plus adaptées à votre logement et à sa localisation.",
  },
  {
    question: "Belle Saisons s'occupe-t-elle du ménage et du linge ?",
    answer:
      "Oui, la coordination du ménage professionnel et la gestion du linge de maison entre chaque séjour font partie de la gestion complète proposée par Belle Saisons.",
  },
  {
    question: "Comment se passe la première prise de contact ?",
    answer:
      "Vous nous présentez votre bien et vos objectifs via notre formulaire dédié aux propriétaires. Nous échangeons ensuite avec vous pour définir l'accompagnement le plus adapté.",
  },
];

export const ESTIMATION_FAQ: FaqItem[] = [
  {
    question: "Combien de temps avant la première réservation ?",
    answer:
      "Cela dépend de la saisonnalité et de l'état de préparation du logement. Après notre échange, nous vous donnons une estimation adaptée à votre situation plutôt qu'un délai générique.",
  },
  {
    question: "Dois-je résilier mon annonce actuelle avant de vous contacter ?",
    answer:
      "Non. Si votre bien est déjà en ligne sur Airbnb ou Booking.com, nous étudions la reprise de l'annonce existante avec vous, sans rien précipiter.",
  },
  {
    question: "Quels documents dois-je préparer ?",
    answer:
      "Rien n'est nécessaire pour cette première étude. Les éventuels justificatifs ne sont demandés qu'une fois l'accompagnement engagé avec vous.",
  },
  {
    question: "Mon bien est-il accepté quel que soit son état ?",
    answer:
      "Nous étudions chaque bien individuellement. Si des améliorations sont utiles avant la mise en location, nous vous les indiquons clairement lors de l'échange.",
  },
  {
    question: "Suis-je engagé en remplissant ce formulaire ?",
    answer:
      "Non, ce formulaire déclenche simplement l'étude de votre bien par notre équipe. Rien n'est engagé de votre côté avant un échange direct avec vous.",
  },
];

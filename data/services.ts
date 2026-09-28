export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  points: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "creation-optimisation-annonces",
    title: "Création et optimisation des annonces",
    shortDescription:
      "Une présentation soignée de votre bien sur Airbnb, Booking.com et les plateformes adaptées à votre logement.",
    description:
      "Belle Saisons rédige et met en scène votre annonce pour qu'elle reflète fidèlement la qualité de votre bien : texte descriptif, mise en avant des atouts, sélection des photos et paramétrage des plateformes.",
    points: [
      "Rédaction et structuration de l'annonce",
      "Diffusion multi-plateformes (Airbnb, Booking.com et autres canaux pertinents)",
      "Mise à jour régulière du contenu",
      "Cohérence de marque entre les plateformes",
    ],
  },
  {
    slug: "photographie-valorisation",
    title: "Photographie et valorisation du bien",
    shortDescription:
      "Des visuels qui donnent envie de réserver, à la hauteur du standing de votre propriété.",
    description:
      "La première impression se joue sur les photos. Belle Saisons organise la mise en valeur du logement avant chaque prise de vue pour présenter votre bien sous son meilleur jour.",
    points: [
      "Préparation du logement avant prise de vue",
      "Sélection des angles et de la lumière",
      "Mise en avant des espaces extérieurs et des prestations",
      "Visuels adaptés aux formats des plateformes",
    ],
  },
  {
    slug: "optimisation-tarifaire",
    title: "Optimisation tarifaire et revenue management",
    shortDescription:
      "Une stratégie de prix ajustée à la saisonnalité, aux événements locaux et à la demande.",
    description:
      "Le bon prix n'est jamais figé. Belle Saisons ajuste la tarification de votre logement en fonction du calendrier, de la saisonnalité normande et des périodes de forte demande sur votre secteur.",
    points: [
      "Ajustement tarifaire selon la saison et la demande",
      "Suivi du calendrier événementiel local",
      "Équilibre entre taux d'occupation et revenu",
      "Reporting transparent au propriétaire",
    ],
  },
  {
    slug: "gestion-calendrier",
    title: "Gestion du calendrier",
    shortDescription:
      "Une disponibilité tenue à jour sur l'ensemble des plateformes, sans risque de double réservation.",
    description:
      "Belle Saisons synchronise et administre le calendrier de réservation de votre bien, y compris pour vos propres périodes d'occupation personnelle.",
    points: [
      "Synchronisation multi-plateformes",
      "Blocage des périodes personnelles",
      "Anticipation des périodes creuses",
      "Coordination avec le planning ménage et maintenance",
    ],
  },
  {
    slug: "relation-voyageurs",
    title: "Relation voyageurs",
    shortDescription:
      "Un accompagnement attentif du premier message à la fin du séjour.",
    description:
      "Belle Saisons assure la communication avec les voyageurs : réponses aux demandes, informations pratiques, recommandations locales et gestion des situations particulières.",
    points: [
      "Réponse aux demandes et messages voyageurs",
      "Informations pratiques avant l'arrivée",
      "Recommandations sur la région de Caen et la Côte de Nacre",
      "Disponibilité pendant le séjour",
    ],
  },
  {
    slug: "check-in-check-out",
    title: "Check-in / check-out et gestion des arrivées",
    shortDescription:
      "Un accueil organisé, quels que soient les horaires d'arrivée et de départ.",
    description:
      "L'arrivée conditionne l'expérience du séjour. Belle Saisons organise l'accueil des voyageurs et la remise des clés dans des conditions fluides et rassurantes.",
    points: [
      "Organisation des arrivées et départs",
      "Remise des clés et accueil sur place ou à distance",
      "Vérification du logement avant chaque arrivée",
      "Gestion des imprévus liés aux horaires",
    ],
  },
  {
    slug: "menage-linge",
    title: "Ménage et linge",
    shortDescription:
      "Un logement impeccable à chaque rotation, avec un linge frais et soigné.",
    description:
      "Belle Saisons coordonne le ménage professionnel entre chaque séjour ainsi que la gestion du linge de maison, pour un logement prêt à accueillir à chaque réservation.",
    points: [
      "Ménage professionnel entre chaque séjour",
      "Gestion et renouvellement du linge de maison",
      "Contrôle qualité avant chaque arrivée",
      "Coordination avec le calendrier de réservation",
    ],
  },
  {
    slug: "maintenance-incidents",
    title: "Maintenance et gestion des incidents",
    shortDescription:
      "Une réactivité en cas d'imprévu, pour protéger votre bien et l'expérience voyageur.",
    description:
      "Un logement bien entretenu se remarque. Belle Saisons assure le suivi de l'état du bien et la gestion des interventions nécessaires en cas d'incident.",
    points: [
      "Suivi de l'état général du logement",
      "Coordination des interventions techniques",
      "Gestion des incidents pendant un séjour",
      "Compte-rendu au propriétaire",
    ],
  },
  {
    slug: "suivi-proprietaire",
    title: "Suivi propriétaire",
    shortDescription:
      "Une visibilité claire sur l'activité de votre bien, sans avoir à en gérer le quotidien.",
    description:
      "Belle Saisons tient le propriétaire informé de l'activité de son logement : réservations, remarques voyageurs, état du bien et recommandations d'amélioration.",
    points: [
      "Point régulier sur l'activité du logement",
      "Transparence sur les réservations",
      "Conseils de mise en valeur du bien",
      "Interlocuteur unique et disponible",
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}

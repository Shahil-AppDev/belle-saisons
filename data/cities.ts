import { FaqItem } from "./faq";

export type CityContent = {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  h1: string;
  heroKicker: string;
  intro: string[];
  identity: string;
  ownerChallenges: string[];
  faq: FaqItem[];
  related: string[];
};

export const CITIES: CityContent[] = [
  {
    slug: "conciergerie-caen",
    name: "Caen",
    title: "Conciergerie Airbnb à Caen — Gestion locative haut de gamme",
    metaDescription:
      "Conciergerie premium à Caen pour la gestion complète de votre bien en location courte et moyenne durée : annonces, tarification, accueil voyageurs, ménage et maintenance.",
    h1: "Conciergerie à Caen : une gestion complète pour votre bien",
    heroKicker: "Conciergerie Caen",
    intro: [
      "Préfecture du Calvados, ville universitaire, pôle d'affaires et porte d'entrée vers les plages du Débarquement, Caen attire une clientèle variée : voyageurs d'affaires en semaine, familles et touristes de mémoire le week-end, étudiants et jeunes actifs en recherche de logements meublés temporaires.",
      "Cette diversité de demande est une opportunité pour les propriétaires, mais elle demande une gestion réactive : ajuster la tarification selon les périodes universitaires, les événements locaux ou les saisons touristiques, tout en maintenant un niveau de service constant. Belle Saisons prend en charge cette gestion au quotidien, pour un bien loué dans de bonnes conditions, toute l'année.",
    ],
    identity:
      "À Caen, la demande en location courte durée provient autant des voyageurs d'affaires liés au tissu économique local que des visiteurs venus découvrir le château de Caen, les abbayes ou la mémoire du Débarquement. Le port de Ouistreham, à quelques minutes, ajoute une clientèle de passage vers l'Angleterre.",
    ownerChallenges: [
      "Adapter la tarification entre semaine (clientèle affaires) et week-end (clientèle loisirs)",
      "Maintenir un taux d'occupation stable en dehors des pics touristiques",
      "Répondre rapidement aux voyageurs dans une ville où la concurrence locative est présente",
      "Assurer un accueil fiable pour des arrivées à toute heure, y compris tardives",
    ],
    faq: [
      {
        question: "Quel type de logement fonctionne bien en location courte durée à Caen ?",
        answer:
          "Les appartements proches du centre-ville, de la gare ou des pôles universitaires et d'affaires répondent à une demande régulière, en complément de la clientèle touristique de week-end.",
      },
      {
        question: "Belle Saisons gère-t-elle aussi les séjours de moyenne durée ?",
        answer:
          "Oui. À Caen, la demande inclut des séjours de plusieurs semaines liés à des missions professionnelles ou des besoins temporaires de logement, que Belle Saisons intègre à la stratégie de gestion de votre bien.",
      },
      {
        question: "Le port de Ouistreham a-t-il une influence sur la location à Caen ?",
        answer:
          "Oui, la proximité du terminal ferry vers l'Angleterre génère des flux de voyageurs en transit qui recherchent des logements pratiques à Caen, en complément de la clientèle locale et touristique.",
      },
    ],
    related: ["conciergerie-cote-de-nacre", "conciergerie-ouistreham", "conciergerie-normandie"],
  },
  {
    slug: "conciergerie-cote-de-nacre",
    name: "Côte de Nacre",
    title: "Conciergerie Airbnb Côte de Nacre — Gestion locative saisonnière",
    metaDescription:
      "Belle Saisons accompagne les propriétaires de résidences secondaires sur la Côte de Nacre : gestion complète, optimisation tarifaire saisonnière et accueil des voyageurs.",
    h1: "Conciergerie sur la Côte de Nacre : gérer une résidence secondaire en toute sérénité",
    heroKicker: "Conciergerie Côte de Nacre",
    intro: [
      "La Côte de Nacre regroupe les stations balnéaires situées entre Ouistreham et Courseulles-sur-Mer, sur les plages du Débarquement de Sword Beach et Juno Beach. C'est une zone très prisée des Caennais et des Parisiens pour l'achat de résidences secondaires, avec une forte saisonnalité entre l'été et le reste de l'année.",
      "Gérer un bien sur ce secteur suppose de composer avec des pics de fréquentation marqués (juillet-août, week-ends prolongés) et des périodes plus calmes où il faut savoir maintenir un taux d'occupation correct. Belle Saisons connaît les spécificités de chaque commune du littoral et adapte la stratégie de location en conséquence.",
    ],
    identity:
      "Chaque village du littoral a son propre profil : Ouistreham pour le port et le ferry, Lion-sur-Mer et Hermanville-sur-Mer pour leur calme résidentiel, Luc-sur-Mer pour son animation, Saint-Aubin-sur-Mer pour ses familles, Courseulles-sur-Mer pour son port ostréicole. Belle Saisons ajuste la gestion de chaque bien à cette identité locale.",
    ownerChallenges: [
      "Faire face à une saisonnalité très marquée entre l'été et le reste de l'année",
      "Entretenir un bien souvent inoccupé une grande partie de l'année",
      "Anticiper les réservations sur les week-ends prolongés et vacances scolaires",
      "Gérer un logement à distance lorsque le propriétaire n'habite pas la région",
    ],
    faq: [
      {
        question: "Quelles communes sont couvertes par la conciergerie Côte de Nacre ?",
        answer:
          "Belle Saisons intervient notamment à Ouistreham, Lion-sur-Mer, Luc-sur-Mer, Hermanville-sur-Mer, Saint-Aubin-sur-Mer et Courseulles-sur-Mer, ainsi que sur les communes voisines du littoral.",
      },
      {
        question: "Comment gérer un bien saisonnier occupé aussi par la famille ?",
        answer:
          "Le calendrier de réservation est construit autour de vos propres périodes d'occupation, que Belle Saisons bloque en priorité avant d'organiser les locations.",
      },
      {
        question: "La demande est-elle uniquement estivale sur la Côte de Nacre ?",
        answer:
          "L'été concentre la plus forte demande, mais les week-ends, ponts et vacances scolaires génèrent une activité toute l'année, notamment autour des sites liés au Débarquement.",
      },
    ],
    related: ["conciergerie-caen", "conciergerie-ouistreham", "conciergerie-luc-sur-mer"],
  },
  {
    slug: "conciergerie-ouistreham",
    name: "Ouistreham",
    title: "Conciergerie Airbnb à Ouistreham — Gestion locative port & plage",
    metaDescription:
      "Conciergerie dédiée aux propriétaires de Ouistreham Riva-Bella : gestion locative complète adaptée au flux ferry, à la plage et à la marina.",
    h1: "Conciergerie à Ouistreham : entre port, plage et flux de voyageurs",
    heroKicker: "Conciergerie Ouistreham",
    intro: [
      "Ouistreham Riva-Bella occupe une position particulière sur la Côte de Nacre : ville portuaire avec son terminal ferry vers Portsmouth, sa marina et sa plage, elle attire à la fois des voyageurs en transit, des plaisanciers et des vacanciers venus profiter du front de mer et du casino.",
      "Cette combinaison génère une demande locative variée, avec des séjours courts liés aux traversées et des séjours plus longs pour les vacances. Belle Saisons structure la gestion de votre bien autour de ce double flux, pour maximiser les réservations sans complexifier votre quotidien de propriétaire.",
    ],
    identity:
      "Le terminal ferry, la marina et le front de mer de Riva-Bella font de Ouistreham une commune à la fréquentation régulière toute l'année, renforcée l'été par les vacanciers de la plage et les visiteurs du Grand Bunker et des sites du Débarquement.",
    ownerChallenges: [
      "Absorber les arrivées et départs liés aux horaires des traversées ferry",
      "Valoriser un bien proche du port autant que de la plage",
      "Gérer une clientèle mixte : plaisanciers, familles, voyageurs de mémoire",
      "Optimiser le calendrier entre haute saison balnéaire et flux portuaire toute l'année",
    ],
    faq: [
      {
        question: "Le ferry Ouistreham-Portsmouth génère-t-il de la demande locative ?",
        answer:
          "Oui, les voyageurs en correspondance ou en attente de traversée recherchent régulièrement un hébergement de courte durée proche du terminal, en complément de la clientèle balnéaire.",
      },
      {
        question: "Un bien proche de la marina est-il valorisable en location ?",
        answer:
          "Oui, la proximité de la marina et du front de mer de Riva-Bella est un atout que Belle Saisons met en avant dans l'annonce et la stratégie tarifaire.",
      },
      {
        question: "La demande est-elle limitée à l'été à Ouistreham ?",
        answer:
          "Non, le flux portuaire et les visites liées au Débarquement maintiennent une activité en dehors de la haute saison balnéaire.",
      },
    ],
    related: ["conciergerie-cote-de-nacre", "conciergerie-caen", "conciergerie-lion-sur-mer"],
  },
  {
    slug: "conciergerie-lion-sur-mer",
    name: "Lion-sur-Mer",
    title: "Conciergerie Airbnb à Lion-sur-Mer — Gestion locative résidentielle",
    metaDescription:
      "Belle Saisons gère les locations courte durée à Lion-sur-Mer : village résidentiel calme de la Côte de Nacre, entre plage et golf.",
    h1: "Conciergerie à Lion-sur-Mer : valoriser un bien dans un cadre résidentiel calme",
    heroKicker: "Conciergerie Lion-sur-Mer",
    intro: [
      "Lion-sur-Mer se distingue sur la Côte de Nacre par son caractère résidentiel et paisible. Le village a conservé son charme de station balnéaire familiale, avec sa plage de sable, son bord de mer arboré et un rythme plus tranquille que les communes voisines plus animées.",
      "Cette atmosphère plaît à une clientèle en recherche de calme plutôt que d'animation nocturne : familles, couples, séjours de ressourcement. Belle Saisons adapte la présentation et la tarification de votre bien à cette demande spécifique, différente de celle d'une station plus touristique.",
    ],
    identity:
      "Le caractère résidentiel de Lion-sur-Mer, sa plage familiale et la proximité d'un golf en font une destination recherchée par une clientèle qui privilégie le calme et l'authenticité du littoral normand plutôt que l'animation.",
    ownerChallenges: [
      "Se positionner face à des communes voisines plus animées et plus visibles",
      "Cibler une clientèle en recherche de calme plutôt que d'activités nocturnes",
      "Maintenir l'attractivité du bien en dehors des mois d'été",
      "Valoriser un cadre résidentiel dans l'annonce et les visuels",
    ],
    faq: [
      {
        question: "Lion-sur-Mer convient-il à une clientèle familiale ?",
        answer:
          "Oui, la plage familiale et l'ambiance résidentielle du village en font une destination appréciée des familles recherchant un séjour calme sur la Côte de Nacre.",
      },
      {
        question: "Comment valoriser un bien à Lion-sur-Mer face à des communes plus touristiques ?",
        answer:
          "Belle Saisons met en avant le calme, l'environnement résidentiel et la proximité de la plage et du golf, des arguments qui parlent à une clientèle ciblée plutôt qu'à la masse.",
      },
      {
        question: "Le golf de Lion-sur-Mer influence-t-il la demande locative ?",
        answer:
          "Il élargit la clientèle potentielle à des séjours golfiques, en complément de la demande balnéaire classique.",
      },
    ],
    related: ["conciergerie-ouistreham", "conciergerie-luc-sur-mer", "conciergerie-cote-de-nacre"],
  },
  {
    slug: "conciergerie-luc-sur-mer",
    name: "Luc-sur-Mer",
    title: "Conciergerie Airbnb à Luc-sur-Mer — Gestion locative station balnéaire",
    metaDescription:
      "Conciergerie premium à Luc-sur-Mer pour les propriétaires souhaitant louer leur bien en courte durée dans cette station balnéaire animée de la Côte de Nacre.",
    h1: "Conciergerie à Luc-sur-Mer : gérer un bien dans une station balnéaire vivante",
    heroKicker: "Conciergerie Luc-sur-Mer",
    intro: [
      "Luc-sur-Mer est l'une des stations les plus animées de la Côte de Nacre, connue pour ses planches en bord de mer, son casino, son marché et son fameux squelette de baleine sur le front de mer. C'est une destination familiale et conviviale, avec une vie commerçante active une bonne partie de l'année.",
      "Cette animation attire une clientèle nombreuse en saison, avec une forte concurrence entre logements. Belle Saisons travaille la présentation et la tarification de votre bien pour qu'il se distingue sur un marché où l'offre est dense, tout en gérant l'ensemble du séjour voyageur.",
    ],
    identity:
      "Les planches, le casino, le marché et l'animation commerçante font de Luc-sur-Mer une destination à forte fréquentation estivale, avec une clientèle qui recherche à la fois la plage et les commodités d'un centre-bourg vivant.",
    ownerChallenges: [
      "Se différencier dans une offre locative dense en haute saison",
      "Profiter du marché et de l'animation commerçante dans la présentation du bien",
      "Anticiper les réservations autour des événements locaux et du marché",
      "Maintenir une bonne visibilité malgré la concurrence des communes voisines",
    ],
    faq: [
      {
        question: "Pourquoi la demande locative est-elle forte à Luc-sur-Mer ?",
        answer:
          "L'animation du front de mer, le casino, le marché et la vie commerçante attirent une clientèle nombreuse en saison, ce qui soutient la demande en location courte durée.",
      },
      {
        question: "Comment un bien se démarque-t-il à Luc-sur-Mer ?",
        answer:
          "Belle Saisons met en avant la proximité des planches, des commerces et des animations locales dans l'annonce, avec une tarification ajustée à la forte demande estivale.",
      },
      {
        question: "Le marché de Luc-sur-Mer a-t-il un impact sur les réservations ?",
        answer:
          "Un bien proche du marché et du centre-bourg est un atout à valoriser, notamment pour une clientèle qui recherche la proximité des commerces au quotidien.",
      },
    ],
    related: ["conciergerie-lion-sur-mer", "conciergerie-saint-aubin-sur-mer", "conciergerie-cote-de-nacre"],
  },
  {
    slug: "conciergerie-hermanville-sur-mer",
    name: "Hermanville-sur-Mer",
    title: "Conciergerie Airbnb à Hermanville-sur-Mer — Gestion locative Sword Beach",
    metaDescription:
      "Belle Saisons accompagne les propriétaires d'Hermanville-sur-Mer, village du Débarquement de Sword Beach, dans la gestion locative de leur résidence secondaire.",
    h1: "Conciergerie à Hermanville-sur-Mer : un village entre plage et mémoire",
    heroKicker: "Conciergerie Hermanville-sur-Mer",
    intro: [
      "Hermanville-sur-Mer est un village résidentiel de la Côte de Nacre, connu pour avoir été l'un des points de débarquement de Sword Beach le 6 juin 1944 et pour son cimetière militaire britannique. C'est aujourd'hui une commune calme, appréciée pour sa plage et son ambiance de bord de mer préservée.",
      "La clientèle locative y est double : les visiteurs venus sur les traces du Débarquement, souvent internationaux, et les vacanciers en recherche d'un cadre balnéaire tranquille. Belle Saisons adapte la présentation du bien et l'accueil des voyageurs à cette double demande, y compris pour une clientèle anglophone.",
    ],
    identity:
      "La mémoire de Sword Beach attire à Hermanville-sur-Mer une clientèle internationale spécifique, en complément d'une fréquentation balnéaire plus classique liée à la plage et au calme du village.",
    ownerChallenges: [
      "Accueillir une clientèle internationale liée au tourisme de mémoire",
      "Communiquer efficacement avec des voyageurs non francophones",
      "Valoriser un cadre calme et préservé dans l'annonce",
      "Gérer une activité concentrée sur certaines périodes commémoratives et estivales",
    ],
    faq: [
      {
        question: "Le tourisme de mémoire génère-t-il des réservations à Hermanville-sur-Mer ?",
        answer:
          "Oui, la proximité de Sword Beach et du cimetière militaire britannique attire une clientèle internationale, notamment autour des dates commémoratives du Débarquement.",
      },
      {
        question: "Belle Saisons peut-elle accueillir des voyageurs étrangers ?",
        answer:
          "Oui, la relation voyageurs est assurée y compris pour une clientèle internationale, avec des informations pratiques adaptées à un public non francophone.",
      },
      {
        question: "Hermanville-sur-Mer convient-elle à un séjour calme ?",
        answer:
          "Oui, le village a conservé un caractère résidentiel et paisible, apprécié des voyageurs en recherche de calme sur la Côte de Nacre.",
      },
    ],
    related: ["conciergerie-lion-sur-mer", "conciergerie-ouistreham", "conciergerie-cote-de-nacre"],
  },
  {
    slug: "conciergerie-saint-aubin-sur-mer",
    name: "Saint-Aubin-sur-Mer",
    title: "Conciergerie Airbnb à Saint-Aubin-sur-Mer — Gestion locative familiale",
    metaDescription:
      "Conciergerie à Saint-Aubin-sur-Mer pour les propriétaires de résidences secondaires familiales, entre plage de sable et Juno Beach.",
    h1: "Conciergerie à Saint-Aubin-sur-Mer : la gestion locative d'un village familial",
    heroKicker: "Conciergerie Saint-Aubin-sur-Mer",
    intro: [
      "Saint-Aubin-sur-Mer est une station balnéaire familiale de la Côte de Nacre, réputée pour sa large plage de sable et son ambiance conviviale. Le village est proche du secteur de Juno Beach, l'un des sites majeurs du Débarquement, et attire une clientèle fidèle chaque été.",
      "La demande y est fortement concentrée sur la période estivale et les vacances scolaires, avec une clientèle familiale qui recherche confort et proximité de la plage. Belle Saisons construit une stratégie de gestion adaptée à cette saisonnalité marquée.",
    ],
    identity:
      "La grande plage de sable, l'ambiance familiale et la proximité de Juno Beach font de Saint-Aubin-sur-Mer une destination estivale recherchée, avec une clientèle qui revient d'une année sur l'autre.",
    ownerChallenges: [
      "Optimiser un calendrier fortement concentré sur l'été et les vacances scolaires",
      "Répondre à une clientèle familiale exigeante sur le confort et l'équipement",
      "Anticiper les réservations en amont de la haute saison",
      "Maintenir l'attractivité du bien sur les périodes hors saison",
    ],
    faq: [
      {
        question: "La demande locative est-elle concentrée sur l'été à Saint-Aubin-sur-Mer ?",
        answer:
          "La haute saison estivale et les vacances scolaires concentrent l'essentiel de la demande, ce qui nécessite une stratégie tarifaire anticipée pour ces périodes.",
      },
      {
        question: "Quel type de bien fonctionne bien à Saint-Aubin-sur-Mer ?",
        answer:
          "Les logements familiaux, proches de la plage et bien équipés, répondent le mieux à la demande observée sur cette commune.",
      },
      {
        question: "Juno Beach a-t-elle un lien avec la demande touristique locale ?",
        answer:
          "La proximité de Juno Beach et de son centre d'interprétation ajoute une clientèle de mémoire à la fréquentation balnéaire familiale.",
      },
    ],
    related: ["conciergerie-luc-sur-mer", "conciergerie-courseulles-sur-mer", "conciergerie-cote-de-nacre"],
  },
  {
    slug: "conciergerie-courseulles-sur-mer",
    name: "Courseulles-sur-Mer",
    title: "Conciergerie Airbnb à Courseulles-sur-Mer — Gestion locative port & Juno Beach",
    metaDescription:
      "Belle Saisons gère les biens en location courte durée à Courseulles-sur-Mer, port ostréicole et site de Juno Beach sur la Côte de Nacre.",
    h1: "Conciergerie à Courseulles-sur-Mer : entre port ostréicole et plages du Débarquement",
    heroKicker: "Conciergerie Courseulles-sur-Mer",
    intro: [
      "Courseulles-sur-Mer occupe une place à part sur la Côte de Nacre : port de pêche et d'ostréiculture réputé, marina animée, plage de Juno Beach où ont débarqué les troupes canadiennes le 6 juin 1944. C'est une destination qui combine gastronomie, patrimoine et tourisme balnéaire.",
      "Cette diversité attire une clientèle large : amateurs de fruits de mer, visiteurs du Juno Beach Centre, plaisanciers de la marina et vacanciers de la plage. Belle Saisons structure la gestion de votre bien pour capter cette demande variée tout au long de la saison.",
    ],
    identity:
      "Le port ostréicole, la marina et Juno Beach donnent à Courseulles-sur-Mer une attractivité touristique diversifiée, entre gastronomie locale, patrimoine du Débarquement et plaisance.",
    ownerChallenges: [
      "Valoriser un bien proche du port et de ses attraits gastronomiques",
      "Capter une clientèle internationale liée à Juno Beach et au tourisme canadien",
      "Gérer une activité soutenue par la marina en complément de la plage",
      "Adapter le bien à une clientèle exigeante sur le confort et les prestations",
    ],
    faq: [
      {
        question: "Le port ostréicole influence-t-il la fréquentation de Courseulles-sur-Mer ?",
        answer:
          "Oui, la réputation gastronomique du port attire des visiteurs toute l'année, en complément de la clientèle balnéaire estivale.",
      },
      {
        question: "Juno Beach attire-t-elle une clientèle spécifique ?",
        answer:
          "Le Juno Beach Centre attire une clientèle internationale, notamment canadienne, intéressée par l'histoire du Débarquement.",
      },
      {
        question: "La marina de Courseulles-sur-Mer génère-t-elle de la demande locative ?",
        answer:
          "Oui, les plaisanciers et visiteurs de la marina recherchent régulièrement des hébergements de courte durée à proximité du port.",
      },
    ],
    related: ["conciergerie-saint-aubin-sur-mer", "conciergerie-cote-de-nacre", "conciergerie-caen"],
  },
  {
    slug: "conciergerie-normandie",
    name: "Normandie",
    title: "Conciergerie Airbnb en Normandie — Gestion locative Calvados et littoral",
    metaDescription:
      "Belle Saisons étend sa conciergerie premium à l'échelle de la Normandie, avec une expertise construite autour de Caen et de la Côte de Nacre.",
    h1: "Conciergerie en Normandie : une expertise ancrée à Caen et sur la Côte de Nacre",
    heroKicker: "Conciergerie Normandie",
    intro: [
      "La Normandie attire une clientèle touristique fidèle, entre plages du Débarquement, villes historiques, campagne du bocage et côtes escarpées. Le Calvados, en particulier, concentre une forte proportion de résidences secondaires destinées à la location saisonnière.",
      "Belle Saisons a construit son expertise à Caen et sur la Côte de Nacre, avant d'accompagner progressivement des propriétaires sur d'autres secteurs de la région normande. Cette page présente notre approche de la gestion locative à l'échelle normande, avec la même exigence de service que sur notre zone d'origine.",
    ],
    identity:
      "La Normandie combine tourisme de mémoire, patrimoine historique, côtes littorales et campagne, ce qui crée une demande locative diversifiée selon les secteurs, du littoral aux villes patrimoniales.",
    ownerChallenges: [
      "Adapter la stratégie de gestion aux spécificités de chaque secteur normand",
      "Maintenir un niveau de service homogène sur un territoire plus large",
      "Tenir compte de la saisonnalité propre à chaque type de destination",
      "S'appuyer sur une expertise locale plutôt qu'une gestion standardisée",
    ],
    faq: [
      {
        question: "Belle Saisons intervient-elle sur toute la Normandie ?",
        answer:
          "Notre expertise est construite en priorité autour de Caen et de la Côte de Nacre. Nous étudions les demandes sur d'autres secteurs normands au cas par cas.",
      },
      {
        question: "La gestion locative est-elle différente selon les secteurs de Normandie ?",
        answer:
          "Oui, la stratégie tarifaire et la présentation du bien varient selon qu'il s'agit d'un secteur littoral, d'une ville patrimoniale ou d'un secteur rural.",
      },
      {
        question: "Pourquoi commencer par Caen et la Côte de Nacre ?",
        answer:
          "C'est le territoire que nous connaissons le mieux, ce qui nous permet d'offrir un niveau de service et une réactivité optimale avant d'étendre notre couverture.",
      },
    ],
    related: ["conciergerie-caen", "conciergerie-cote-de-nacre", "conciergerie-courseulles-sur-mer"],
  },
];

export function getCityBySlug(slug: string) {
  return CITIES.find((city) => city.slug === slug);
}

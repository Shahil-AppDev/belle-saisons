export const BLOG_CATEGORIES = [
  { slug: "conseils-proprietaires", label: "Conseils propriétaires" },
  { slug: "location-saisonniere", label: "Location saisonnière" },
  { slug: "caen", label: "Caen" },
  { slug: "cote-de-nacre", label: "Côte de Nacre" },
  { slug: "guides-pratiques", label: "Guides pratiques" },
] as const;

export type BlogCategorySlug = (typeof BLOG_CATEGORIES)[number]["slug"];

export function getCategoryLabel(slug: BlogCategorySlug): string {
  return BLOG_CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

export type BlogPost = {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: BlogCategorySlug;
  author: string;
  content: { heading?: string; paragraphs: string[] }[];
  relatedLinks: { label: string; href: string }[];
};

export const DEFAULT_AUTHOR = "Conciergerie Belle Saisons";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "louer-logement-courte-duree-caen",
    title: "Comment louer son logement en courte durée à Caen",
    metaDescription:
      "Les points clés pour réussir la location courte durée de son bien à Caen : diagnostic du logement, choix des plateformes, tarification et accueil voyageurs.",
    excerpt:
      "Avant de mettre un bien en location courte durée à Caen, plusieurs choix structurent la réussite du projet : présentation, plateformes, tarification et organisation de l'accueil.",
    date: "2026-01-12",
    readTime: "5 min",
    category: "caen",
    author: DEFAULT_AUTHOR,
    content: [
      {
        heading: "Un marché à double visage",
        paragraphs: [
          "À Caen, la location courte durée répond à deux logiques différentes : une demande d'affaires en semaine, portée par le tissu économique et universitaire de la ville, et une demande touristique le week-end, liée notamment aux plages du Débarquement et au patrimoine local. Bien comprendre cette alternance est la première étape pour construire une stratégie de location cohérente.",
        ],
      },
      {
        heading: "Préparer le logement avant la mise en location",
        paragraphs: [
          "Un bien qui se loue bien à Caen est un bien facile à vivre pour des séjours courts : literie de qualité, connexion internet fiable, équipements adaptés au télétravail pour la clientèle d'affaires, et informations pratiques claires pour les voyageurs de passage.",
          "La présentation du logement — photos, description, mise en avant des atouts du quartier — conditionne directement le taux de réservation. C'est un travail à ne pas négliger avant la première mise en ligne.",
        ],
      },
      {
        heading: "Choisir les bonnes plateformes",
        paragraphs: [
          "Airbnb et Booking.com restent les canaux principaux, mais leur pertinence varie selon le profil du bien et la clientèle visée. Un logement proche du centre d'affaires captera davantage sur Booking.com en semaine, tandis qu'un bien atypique ou familial performera souvent mieux sur Airbnb le week-end.",
        ],
      },
      {
        heading: "Anticiper la gestion du quotidien",
        paragraphs: [
          "Ménage entre chaque séjour, gestion du linge, coordination des arrivées et départs, réponses aux voyageurs : la charge de travail liée à la location courte durée est réelle. C'est précisément ce que prend en charge une conciergerie comme Belle Saisons, pour que la gestion ne devienne pas un frein à la rentabilité du bien.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Conciergerie à Caen", href: "/conciergerie-caen" },
      { label: "Nos services", href: "/services" },
      { label: "Confier mon bien", href: "/confier-mon-bien" },
    ],
  },
  {
    slug: "airbnb-caen-optimiser-revenus",
    title: "Airbnb à Caen : comment optimiser ses revenus",
    metaDescription:
      "Les leviers concrets pour optimiser les revenus d'un logement Airbnb à Caen : tarification dynamique, calendrier, qualité de l'annonce et fidélisation.",
    excerpt:
      "Optimiser ses revenus Airbnb à Caen ne se limite pas à fixer un prix : plusieurs leviers combinés permettent d'améliorer durablement la performance d'un bien.",
    date: "2026-01-26",
    readTime: "6 min",
    category: "caen",
    author: DEFAULT_AUTHOR,
    content: [
      {
        heading: "La tarification, un exercice permanent",
        paragraphs: [
          "Un prix fixé une fois pour toutes ne permet pas de capter la valeur réelle de la demande. À Caen, la tarification doit tenir compte des périodes universitaires, des événements locaux, des vacances scolaires et de la saisonnalité touristique liée au littoral voisin. Un ajustement régulier, à la hausse comme à la baisse, protège à la fois le taux d'occupation et le revenu généré.",
        ],
      },
      {
        heading: "La qualité de l'annonce fait la différence",
        paragraphs: [
          "Sur un marché où plusieurs biens comparables coexistent, la qualité des photos, la clarté de la description et la réactivité aux messages influencent directement le classement de l'annonce sur la plateforme, donc sa visibilité et ses réservations.",
        ],
      },
      {
        heading: "Éviter les périodes creuses dans le calendrier",
        paragraphs: [
          "Un calendrier mal anticipé laisse des périodes vacantes qui ne se rattrapent pas. La gestion du calendrier doit intégrer les temps forts locaux — universitaires, professionnels, événementiels — pour limiter les creux d'activité en dehors de l'été.",
        ],
      },
      {
        heading: "L'expérience voyageur, un investissement rentable",
        paragraphs: [
          "Un accueil soigné et une communication fluide avec les voyageurs génèrent des avis positifs, qui eux-mêmes renforcent la position de l'annonce. C'est un cercle vertueux que Belle Saisons entretient au quotidien pour les biens dont elle assure la gestion.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Conciergerie Airbnb", href: "/airbnb" },
      { label: "Conciergerie à Caen", href: "/conciergerie-caen" },
      { label: "Confier mon bien", href: "/confier-mon-bien" },
    ],
  },
  {
    slug: "pourquoi-confier-logement-conciergerie-cote-de-nacre",
    title: "Pourquoi confier son logement à une conciergerie sur la Côte de Nacre",
    metaDescription:
      "Les raisons concrètes de confier la gestion d'une résidence secondaire sur la Côte de Nacre à une conciergerie plutôt que de la gérer soi-même.",
    excerpt:
      "Gérer soi-même une résidence secondaire sur la Côte de Nacre demande du temps et de la disponibilité, surtout à distance. Voici ce que change une conciergerie dédiée.",
    date: "2026-02-09",
    readTime: "5 min",
    category: "cote-de-nacre",
    author: DEFAULT_AUTHOR,
    content: [
      {
        heading: "Une saisonnalité qui demande de la réactivité",
        paragraphs: [
          "Sur la Côte de Nacre, la demande locative se concentre fortement sur l'été et les périodes de vacances scolaires. Cette saisonnalité marquée impose une réactivité que beaucoup de propriétaires, notamment ceux qui n'habitent pas la région, ont du mal à assurer seuls.",
        ],
      },
      {
        heading: "Un bien souvent géré à distance",
        paragraphs: [
          "De nombreux propriétaires de résidences secondaires sur le littoral normand vivent en dehors de la région, parfois à plusieurs heures de route. Cette distance rend complexe la gestion des arrivées, des incidents ou du ménage entre deux séjours.",
        ],
      },
      {
        heading: "Ce que change une conciergerie dédiée",
        paragraphs: [
          "Une conciergerie comme Belle Saisons prend en charge l'ensemble de la chaîne : mise en ligne et optimisation de l'annonce, gestion du calendrier, accueil des voyageurs, ménage, linge, maintenance et suivi régulier. Le propriétaire conserve la visibilité sur son bien sans en assumer la charge opérationnelle.",
          "C'est particulièrement pertinent sur un secteur comme la Côte de Nacre, où chaque commune — Ouistreham, Lion-sur-Mer, Luc-sur-Mer, Hermanville-sur-Mer, Saint-Aubin-sur-Mer, Courseulles-sur-Mer — a ses propres spécificités de clientèle et de saisonnalité.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Conciergerie Côte de Nacre", href: "/conciergerie-cote-de-nacre" },
      { label: "Espace propriétaires", href: "/proprietaires" },
      { label: "Confier mon bien", href: "/confier-mon-bien" },
    ],
  },
  {
    slug: "location-saisonniere-ouistreham-guide",
    title: "Location saisonnière à Ouistreham : guide propriétaire",
    metaDescription:
      "Les spécificités de la location saisonnière à Ouistreham, entre flux ferry, marina et plage, et les points d'attention pour les propriétaires.",
    excerpt:
      "Ouistreham combine un flux touristique classique et une clientèle liée au terminal ferry. Ce guide détaille les points d'attention pour un propriétaire.",
    date: "2026-02-20",
    readTime: "5 min",
    category: "cote-de-nacre",
    author: DEFAULT_AUTHOR,
    content: [
      {
        heading: "Une commune à deux vitesses",
        paragraphs: [
          "Ouistreham Riva-Bella cumule deux profils de demande : les vacanciers venus profiter de la plage et de la marina, et les voyageurs en correspondance liés au terminal ferry vers Portsmouth. Cette double demande permet de lisser une partie de l'activité locative sur l'année, au-delà de la seule haute saison estivale.",
        ],
      },
      {
        heading: "Adapter l'annonce à chaque type de voyageur",
        paragraphs: [
          "Un même bien peut intéresser un vacancier en séjour d'une semaine et un voyageur de passage pour une nuit avant sa traversée. La description de l'annonce et la stratégie tarifaire doivent tenir compte de cette diversité pour ne pas se limiter à une seule clientèle.",
        ],
      },
      {
        heading: "Les points d'attention pour le propriétaire",
        paragraphs: [
          "La gestion des arrivées tardives ou très matinales, liées aux horaires de ferry, demande une organisation rigoureuse. C'est un des aspects que Belle Saisons intègre directement dans son accompagnement des propriétaires à Ouistreham, pour ne laisser aucun créneau d'arrivée sans solution.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Conciergerie à Ouistreham", href: "/conciergerie-ouistreham" },
      { label: "Location courte durée", href: "/location-courte-duree" },
      { label: "Confier mon bien", href: "/confier-mon-bien" },
    ],
  },
  {
    slug: "airbnb-caen-que-deleguer-proprietaire",
    title: "Conciergerie Airbnb à Caen : que peut réellement déléguer un propriétaire ?",
    metaDescription:
      "Ce qu'une conciergerie Airbnb prend réellement en charge à Caen, ce qui reste du ressort du propriétaire, et comment tracer cette limite clairement.",
    excerpt:
      "« Conciergerie » recouvre des réalités très différentes selon les prestataires. Voici, concrètement, ce que Belle Saisons délègue pour vous à Caen — et ce qui reste votre décision.",
    date: "2026-03-06",
    readTime: "6 min",
    category: "conseils-proprietaires",
    author: DEFAULT_AUTHOR,
    content: [
      {
        heading: "Un mot qui recouvre des réalités très différentes",
        paragraphs: [
          "« Conciergerie Airbnb » désigne aussi bien un simple service de ménage entre deux séjours qu'un accompagnement complet de l'exploitation d'un bien. Avant de confier son logement, un propriétaire a intérêt à savoir précisément ce qui est inclus — et ce qui ne l'est pas — plutôt que de le découvrir après coup.",
        ],
      },
      {
        heading: "Ce que Belle Saisons prend en charge pour vous",
        paragraphs: [
          "Concrètement, à Caen, notre accompagnement couvre la création et la mise à jour de l'annonce, la tarification en fonction de la saisonnalité et des événements locaux, la gestion du calendrier, la communication avec les voyageurs du premier message à la fin du séjour, l'organisation des arrivées et départs, le ménage et le linge entre chaque réservation, ainsi que le suivi de l'état du logement et la coordination des interventions de maintenance.",
          "L'objectif est simple : que la gestion quotidienne de votre bien ne dépende plus de votre disponibilité personnelle.",
        ],
      },
      {
        heading: "Ce qui reste votre décision",
        paragraphs: [
          "Certains choix restent délibérément entre vos mains : les périodes que vous souhaitez réserver pour votre usage personnel, les orientations tarifaires majeures (par exemple privilégier le taux d'occupation ou le revenu par nuitée), et toute décision structurante concernant votre bien. Belle Saisons vous propose une stratégie et l'exécute, mais ne se substitue jamais à vous sur ces sujets.",
        ],
      },
      {
        heading: "Une délégation particulièrement utile à Caen",
        paragraphs: [
          "Le marché caennais combine une clientèle d'affaires en semaine et une clientèle touristique le week-end, ce qui demande une gestion réactive du calendrier et de la tarification. C'est précisément le type de tâche récurrente qu'une conciergerie absorbe le mieux, en libérant le propriétaire d'un suivi quasi quotidien.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Conciergerie à Caen", href: "/conciergerie-caen" },
      { label: "Espace propriétaires", href: "/proprietaires" },
      { label: "Confier mon bien", href: "/confier-mon-bien" },
    ],
  },
  {
    slug: "preparer-logement-cote-de-nacre-haute-saison",
    title: "Location saisonnière sur la Côte de Nacre : préparer son logement avant la haute saison",
    metaDescription:
      "Les étapes concrètes pour préparer un logement en location saisonnière sur la Côte de Nacre avant l'été : diagnostic, annonce, calendrier et logistique du ménage.",
    excerpt:
      "La haute saison sur la Côte de Nacre se prépare en amont. Voici les étapes concrètes pour arriver à l'été avec un logement et une annonce prêts à accueillir.",
    date: "2026-03-20",
    readTime: "6 min",
    category: "location-saisonniere",
    author: DEFAULT_AUTHOR,
    content: [
      {
        heading: "Anticiper plutôt que subir la haute saison",
        paragraphs: [
          "Sur la Côte de Nacre, l'essentiel de la demande se concentre sur l'été et les week-ends prolongés. Un logement préparé au dernier moment perd souvent ses premières semaines de réservations les plus rentables. Mieux vaut caler cette préparation plusieurs semaines avant les premiers départs en vacances.",
        ],
      },
      {
        heading: "Faire un diagnostic complet du logement",
        paragraphs: [
          "Avant la remise en location, un tour complet du bien permet de repérer ce qui mérite une réparation, un remplacement ou un simple rafraîchissement : literie, électroménager, équipements extérieurs, connexion internet. Sur le littoral, l'humidité marine peut accélérer l'usure de certains éléments, ce qui justifie une vérification régulière plutôt qu'annuelle.",
        ],
      },
      {
        heading: "Mettre à jour l'annonce et les visuels",
        paragraphs: [
          "Une annonce qui n'a pas évolué depuis la saison précédente perd en visibilité face à des logements récemment actualisés. Revoir la description, actualiser les photos si le logement a changé, et vérifier que les informations pratiques (accès, parking, équipements) sont toujours exactes fait partie de cette préparation.",
        ],
      },
      {
        heading: "Anticiper le calendrier, la tarification et le ménage",
        paragraphs: [
          "La haute saison suppose une rotation plus fréquente des voyageurs, donc une organisation du ménage et du linge capable de suivre le rythme sans faille entre deux réservations. C'est également le moment d'ajuster la tarification aux pics de demande attendus (juillet-août, ponts, événements locaux) plutôt que de la découvrir après coup.",
          "Belle Saisons accompagne les propriétaires de la Côte de Nacre sur l'ensemble de cette préparation, pour arriver à la haute saison avec un logement et un calendrier prêts, sans mobilisation de dernière minute.",
        ],
      },
    ],
    relatedLinks: [
      { label: "Conciergerie Côte de Nacre", href: "/conciergerie-cote-de-nacre" },
      { label: "Nos services", href: "/services" },
      { label: "Confier mon bien", href: "/confier-mon-bien" },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

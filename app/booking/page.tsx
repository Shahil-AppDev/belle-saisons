import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { PlatformContent } from "@/components/sections/PlatformContent";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { buildMetadata } from "@/lib/seo";

const TITLE = "Conciergerie Booking.com à Caen et sur la Côte de Nacre";
const DESCRIPTION =
  "Belle Saisons diffuse et gère votre bien sur Booking.com : une plateforme complémentaire pour capter une clientèle internationale et professionnelle.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/booking",
});

export default function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Conciergerie Booking.com"
        title={TITLE}
        description={DESCRIPTION}
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Booking.com", path: "/booking" },
        ]}
      />

      <PlatformContent
        intro={[
          "Booking.com touche une clientèle différente d'Airbnb : voyageurs internationaux, clientèle professionnelle et réservations de dernière minute. C'est un canal complémentaire pertinent, notamment à Caen et à proximité du port de Ouistreham.",
          "Belle Saisons intègre Booking.com dans une stratégie de diffusion multi-plateformes, avec un calendrier synchronisé pour sécuriser vos réservations.",
        ]}
        points={[
          {
            title: "Diffusion sur Booking.com",
            description:
              "Mise en ligne et paramétrage de votre bien sur la plateforme, en cohérence avec votre présence sur les autres canaux.",
          },
          {
            title: "Clientèle internationale",
            description:
              "Une visibilité adaptée aux voyageurs étrangers, notamment liés au tourisme de mémoire et au port de Ouistreham.",
          },
          {
            title: "Synchronisation des calendriers",
            description:
              "Aucune double réservation entre Booking.com, Airbnb et vos autres canaux de diffusion.",
          },
          {
            title: "Gestion des conditions tarifaires",
            description:
              "Paramétrage des conditions d'annulation et des tarifs en cohérence avec votre stratégie globale.",
          },
        ]}
      />

      <CtaFinal
        title="Diversifiez la diffusion de votre bien"
        description="Belle Saisons ajoute Booking.com à votre stratégie de location, en toute cohérence avec vos autres canaux."
      />
    </>
  );
}

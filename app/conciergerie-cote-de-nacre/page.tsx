import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityPageTemplate } from "@/components/sections/CityPageTemplate";
import { getCityBySlug } from "@/data/cities";
import { buildMetadata } from "@/lib/seo";

const SLUG = "conciergerie-cote-de-nacre";

const HUB_COMMUNES = [
  "conciergerie-ouistreham",
  "conciergerie-hermanville-sur-mer",
  "conciergerie-lion-sur-mer",
  "conciergerie-luc-sur-mer",
  "conciergerie-saint-aubin-sur-mer",
  "conciergerie-courseulles-sur-mer",
];

export function generateMetadata(): Metadata {
  const city = getCityBySlug(SLUG);
  if (!city) return {};
  return buildMetadata({
    title: city.title,
    description: city.metaDescription,
    path: `/${city.slug}`,
  });
}

export default function Page() {
  const city = getCityBySlug(SLUG);
  if (!city) notFound();
  return <CityPageTemplate city={city} hubCommunes={HUB_COMMUNES} />;
}

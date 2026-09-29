import type { Metadata } from "next";
import { siteConfig } from "./site";
import { BUSINESS } from "@/data/business";

export function buildMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? siteConfig.socialImagePath;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: siteConfig.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function localBusinessJsonLd({
  name,
  description,
  path,
  areaServed,
}: {
  name: string;
  description: string;
  path: string;
  areaServed: string[];
}) {
  // L'adresse et le téléphone ne sont ajoutés que si BUSINESS (data/business.ts)
  // les a réellement renseignés : jamais de fausse adresse, de faux
  // téléphone, de fausse note ou de faux avis dans ce schema.
  const address = BUSINESS.address
    ? {
        "@type": "PostalAddress",
        streetAddress: BUSINESS.address.streetAddress,
        postalCode: BUSINESS.address.postalCode,
        addressLocality: BUSINESS.address.addressLocality,
        addressRegion: "Calvados",
        addressCountry: "FR",
      }
    : {
        "@type": "PostalAddress",
        addressRegion: "Calvados",
        addressCountry: "FR",
      };

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    description,
    url: `${siteConfig.url}${path}`,
    image: `${siteConfig.url}${siteConfig.logoPath}`,
    areaServed: areaServed.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    address,
    ...(BUSINESS.phone ? { telephone: BUSINESS.phone } : {}),
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: `${siteConfig.url}${path}`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: siteConfig.areaServed,
  };
}

export function blogPostingJsonLd({
  title,
  description,
  path,
  datePublished,
  authorName,
  image,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  authorName: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: `${siteConfig.url}${path}`,
    datePublished,
    dateModified: datePublished,
    inLanguage: "fr-FR",
    author: {
      "@type": "Organization",
      name: authorName,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.logoPath}`,
      },
    },
    image: image ?? `${siteConfig.url}${siteConfig.socialImagePath}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}${path}`,
    },
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

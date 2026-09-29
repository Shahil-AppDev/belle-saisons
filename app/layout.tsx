import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";
import { PlausibleScript } from "@/components/analytics/PlausibleScript";
import { AttributionCapture } from "@/components/analytics/AttributionCapture";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const DEFAULT_TITLE = `${siteConfig.name} — Conciergerie haut de gamme à Caen et sur la Côte de Nacre`;

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: DEFAULT_TITLE,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "conciergerie Caen",
    "conciergerie Airbnb Caen",
    "gestion location courte durée Caen",
    "conciergerie Côte de Nacre",
    "conciergerie Normandie",
    "conciergerie Calvados",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: DEFAULT_TITLE,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.socialImagePath,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: siteConfig.description,
    images: [siteConfig.socialImagePath],
  },
  icons: {
    icon: [
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
  // Renseignées uniquement si les variables existent : jamais de jeton
  // inventé. Voir .env.example pour GOOGLE_SITE_VERIFICATION / BING_SITE_VERIFICATION.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};

// Pas de `sameAs` : aucun profil social réel n'est encore communiqué
// (voir siteConfig.social) — un tableau vide serait une propriété
// artificielle plutôt qu'une simple absence de donnée.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}${siteConfig.logoPath}`,
  description: siteConfig.description,
  areaServed: siteConfig.areaServed,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivoire text-anthracite">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <PlausibleScript />
        <AttributionCapture />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileStickyCta />
      </body>
    </html>
  );
}

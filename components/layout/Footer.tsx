import Link from "next/link";
import { BrandLogo } from "@/components/brand/BrandLogo";
import {
  FOOTER_LEGAL_LINKS,
  FOOTER_SERVICE_LINKS,
  FOOTER_ZONES_LINKS,
  siteConfig,
} from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-anthracite text-blanc-casse">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <BrandLogo size="lg" wordmarkClassName="text-blanc-casse" />
            <p className="max-w-sm text-sm leading-relaxed text-blanc-casse/70">
              {siteConfig.baseline} — Belle Saisons est une conciergerie
              premium dédiée à la gestion complète de biens en location
              courte et moyenne durée, à Caen et sur la Côte de Nacre.
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-xs uppercase tracking-[0.28em] text-or-doux">
              Nos services
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-blanc-casse/75">
              {FOOTER_SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-blanc-casse transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs uppercase tracking-[0.28em] text-or-doux">
              Zones couvertes
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-blanc-casse/75">
              {FOOTER_ZONES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-blanc-casse transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <h3 className="mb-5 text-xs uppercase tracking-[0.28em] text-or-doux">
                Contact
              </h3>
              <ul className="flex flex-col gap-3 text-sm text-blanc-casse/75">
                <li>
                  <Link href="/contact" className="hover:text-blanc-casse transition-colors">
                    Échanger avec notre équipe
                  </Link>
                </li>
                <li>{siteConfig.region}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bs-divider my-12 opacity-30" />

        <div className="flex flex-col gap-4 text-xs text-blanc-casse/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-blanc-casse transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, PRIMARY_CTA } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [previousPathname, setPreviousPathname] = useState(pathname);
  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
        transparent
          ? "bg-transparent border-b border-transparent"
          : "bg-ivoire/95 backdrop-blur-sm border-b border-anthracite/10 shadow-[0_1px_0_0_rgba(20,17,13,0.02)]"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <BrandLogo
          size="md"
          priority
          className={transparent ? "text-blanc-casse" : "text-anthracite"}
        />

        <nav
          className={`hidden xl:flex items-center gap-5 whitespace-nowrap text-sm tracking-[0.03em] ${
            transparent ? "text-blanc-casse" : "text-anthracite"
          }`}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-1 transition-opacity hover:opacity-70"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden xl:block">
          <Button
            href={PRIMARY_CTA.href}
            size="sm"
            variant={transparent ? "ghost" : "primary"}
            className={transparent ? "text-blanc-casse border-blanc-casse/50 hover:border-blanc-casse" : ""}
            onClick={() => trackEvent("cta_confier_mon_bien", { location: "header-desktop" })}
          >
            {PRIMARY_CTA.label}
          </Button>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className={`flex h-10 w-10 flex-col items-center justify-center gap-[5px] xl:hidden ${
            transparent ? "text-blanc-casse" : "text-anthracite"
          }`}
        >
          <span
            className={`h-px w-6 bg-current transition-transform duration-300 ${
              menuOpen ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-current transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-px w-6 bg-current transition-transform duration-300 ${
              menuOpen ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        // `inert` retire ce panneau de l'ordre de tabulation et des
        // technologies d'assistance tant qu'il est visuellement replié
        // (max-h-0) : sans cela, ses liens restaient atteignables au
        // clavier même invisibles.
        inert={!menuOpen}
        className={`xl:hidden overflow-hidden bg-ivoire transition-[max-height] duration-500 ease-out ${
          menuOpen ? "max-h-[26rem]" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 pb-6 pt-2 text-anthracite">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border-b border-anthracite/10 py-3 text-base tracking-wide"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-5">
            <Button
              href={PRIMARY_CTA.href}
              className="w-full"
              onClick={() => trackEvent("cta_confier_mon_bien", { location: "header-mobile" })}
            >
              {PRIMARY_CTA.label}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

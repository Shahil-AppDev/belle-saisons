"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { PRIMARY_CTA } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

/**
 * Barre de CTA discrète, mobile uniquement, qui n'apparaît qu'après le
 * hero (pour ne jamais concurrencer son propre CTA) et jamais sur la
 * page /confier-mon-bien elle-même (déjà la destination). Volontairement
 * sobre : un seul bouton, pas d'animation agressive.
 */
export function MobileStickyCta() {
  const [pastHero, setPastHero] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const pathname = usePathname();
  const hideOnThisPage = pathname === PRIMARY_CTA.href;

  useEffect(() => {
    if (hideOnThisPage) return;

    const onScroll = () => setPastHero(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hideOnThisPage]);

  useEffect(() => {
    if (hideOnThisPage) return;
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { rootMargin: "0px" }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [hideOnThisPage]);

  const visible = pastHero && !footerVisible;

  if (hideOnThisPage) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-anthracite/10 bg-blanc-casse/95 backdrop-blur-sm px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_16px_rgba(20,17,13,0.06)] transition-transform duration-300 ease-out motion-reduce:transition-none xl:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Button
        href={PRIMARY_CTA.href}
        className="w-full"
        onClick={() => trackEvent("cta_confier_mon_bien", { location: "mobile-sticky" })}
      >
        {PRIMARY_CTA.label}
      </Button>
    </div>
  );
}

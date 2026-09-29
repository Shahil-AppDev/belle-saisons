"use client";

import { Button } from "@/components/ui/Button";
import { PRIMARY_CTA } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

export function HeroCtas() {
  return (
    <div className="flex flex-col gap-4 pt-2 sm:flex-row">
      <Button
        href={PRIMARY_CTA.href}
        variant="primary"
        className="bg-or-doux! border-or-doux! text-noir hover:bg-champagne! hover:border-champagne!"
        onClick={() => trackEvent("cta_confier_mon_bien", { location: "hero" })}
      >
        {PRIMARY_CTA.label}
      </Button>
      <Button
        href="/services"
        variant="ghost"
        className="text-blanc-casse border-blanc-casse/40 hover:border-blanc-casse"
        onClick={() => trackEvent("cta_services", { location: "hero" })}
      >
        Découvrir nos services
      </Button>
    </div>
  );
}

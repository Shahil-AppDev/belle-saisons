import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-anthracite text-blanc-casse">
      {/* Fond éditorial premium : dégradé profond + motif de ligne côtière, en attendant les photographies du bien */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(207,169,106,0.22),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(207,169,106,0.12),_transparent_50%)]" />
        <svg
          className="absolute inset-x-0 bottom-0 h-1/2 w-full opacity-[0.15]"
          viewBox="0 0 1440 400"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 300C240 220 480 340 720 260C960 180 1200 300 1440 220V400H0V300Z"
            fill="url(#coastline)"
          />
          <defs>
            <linearGradient id="coastline" x1="0" y1="0" x2="1440" y2="0">
              <stop offset="0" stopColor="#cfa96a" />
              <stop offset="1" stopColor="#6b5a44" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/70 to-noir/20" />
      </div>

      <Container className="relative z-10 flex flex-col gap-10 pb-20 pt-40 sm:pb-24 lg:pb-28">
        <div className="flex flex-col gap-7 max-w-3xl animate-fade-up">
          <span className="flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-or-doux">
            <span className="h-px w-8 bg-or-doux" />
            Conciergerie haut de gamme — Caen &amp; Côte de Nacre
          </span>
          <h1 className="text-balance font-serif text-4xl leading-[1.1] sm:text-5xl lg:text-[3.4rem]">
            Votre bien, entre de bonnes mains.
          </h1>
          <p className="max-w-xl text-balance text-base leading-relaxed text-blanc-casse/80 sm:text-lg">
            Belle Saisons prend en charge l&apos;intégralité de la gestion de
            votre logement en location courte et moyenne durée : de la
            stratégie tarifaire à l&apos;accueil des voyageurs, à Caen, sur la
            Côte de Nacre et plus largement en Normandie.
          </p>
          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <Button href="/contact" variant="primary" className="bg-or-doux! border-or-doux! text-noir hover:bg-champagne! hover:border-champagne!">
              Confier mon bien
            </Button>
            <Button
              href="/services"
              variant="ghost"
              className="text-blanc-casse border-blanc-casse/40 hover:border-blanc-casse"
            >
              Découvrir nos services
            </Button>
          </div>
        </div>
      </Container>

      <div className="absolute right-8 top-28 z-10 hidden opacity-90 lg:block xl:right-14">
        <span className="relative block h-24 w-24">
          <Image
            src="/brand/logo.png"
            alt=""
            fill
            sizes="96px"
            className="object-contain"
            aria-hidden="true"
          />
        </span>
      </div>
    </section>
  );
}

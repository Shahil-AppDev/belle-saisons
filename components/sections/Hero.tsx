import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { HeroCtas } from "@/components/sections/HeroCtas";

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
            Conciergerie premium — location courte &amp; moyenne durée
          </span>
          <h1 className="text-balance font-serif text-4xl leading-[1.12] sm:text-5xl lg:text-[3.2rem]">
            Conciergerie haut de gamme à Caen et sur la Côte de Nacre
          </h1>
          <p className="max-w-xl text-balance text-base leading-relaxed text-blanc-casse/80 sm:text-lg">
            Belle Saisons accompagne les propriétaires dans l&apos;exploitation
            quotidienne de leur location saisonnière : de la mise en valeur
            du logement à l&apos;accueil des voyageurs, sur le littoral de
            Caen et de la Côte de Nacre.
          </p>
          <HeroCtas />
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

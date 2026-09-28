import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { FOOTER_ZONES_LINKS } from "@/lib/site";

export function AreaCoverage() {
  return (
    <section className="bg-anthracite py-20 text-blanc-casse lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Zone d'intervention"
          title="Une expertise ancrée à Caen et sur la Côte de Nacre"
          description="Belle Saisons construit sa connaissance du terrain autour de Caen, du Calvados et du littoral de la Côte de Nacre, avant d'étendre progressivement sa couverture en Normandie."
          tone="light"
        />

        <Reveal delay={100}>
          <div className="mt-12 flex flex-wrap gap-3">
            {FOOTER_ZONES_LINKS.map((zone) => (
              <Link
                key={zone.href}
                href={zone.href}
                className="rounded-full border border-or-doux/40 px-5 py-2 text-sm text-blanc-casse/85 transition-colors hover:border-or-doux hover:bg-or-doux/10"
              >
                {zone.label}
              </Link>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

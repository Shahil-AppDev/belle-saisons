import { Container } from "@/components/ui/Container";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumbs: Crumb[];
}) {
  return (
    <section className="border-b border-anthracite/10 bg-blanc-casse pb-14 pt-32 lg:pb-16 lg:pt-40">
      <Container className="flex flex-col gap-6">
        <Breadcrumbs items={breadcrumbs} />
        <div className="flex flex-col gap-4 max-w-3xl">
          <span className="text-xs uppercase tracking-[0.3em] text-champagne">
            {eyebrow}
          </span>
          <h1 className="text-balance font-serif text-4xl leading-[1.15] text-anthracite sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="text-balance text-lg leading-relaxed text-brun">
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqJsonLd } from "@/lib/seo";
import type { FaqItem } from "@/data/faq";

export function FaqSection({
  items,
  title = "Questions fréquentes",
  eyebrow = "FAQ",
  withJsonLd = true,
}: {
  items: FaqItem[];
  title?: string;
  eyebrow?: string;
  withJsonLd?: boolean;
}) {
  return (
    <section className="bg-ivoire py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} align="center" />

        <div className="mx-auto mt-12 flex max-w-3xl flex-col divide-y divide-anthracite/10 border-t border-b border-anthracite/10">
          {items.map((item, index) => (
            <Reveal key={item.question} delay={index * 60}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg text-anthracite">
                  {item.question}
                  <span className="shrink-0 text-champagne-ink transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-brun">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
      {withJsonLd && <JsonLd data={faqJsonLd(items)} />}
    </section>
  );
}

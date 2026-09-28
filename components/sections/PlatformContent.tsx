import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function PlatformContent({
  intro,
  points,
}: {
  intro: string[];
  points: { title: string; description: string }[];
}) {
  return (
    <section className="bg-ivoire py-20 lg:py-24">
      <Container className="flex flex-col gap-16">
        <div className="flex max-w-3xl flex-col gap-5">
          {intro.map((paragraph, index) => (
            <Reveal key={index} delay={index * 60}>
              <p className="text-brun leading-relaxed text-lg">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {points.map((point, index) => (
            <Reveal key={point.title} delay={index * 70}>
              <div className="flex flex-col gap-2 border-t border-anthracite/10 pt-5">
                <h2 className="font-serif text-lg text-anthracite">
                  {point.title}
                </h2>
                <p className="text-sm leading-relaxed text-brun">
                  {point.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

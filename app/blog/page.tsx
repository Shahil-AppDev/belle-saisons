import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { BLOG_POSTS, getCategoryLabel } from "@/data/blog";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

const TITLE = "Blog — Conseils propriétaires à Caen et sur la Côte de Nacre";
const DESCRIPTION =
  "Guides et conseils pour les propriétaires souhaitant louer leur bien en courte et moyenne durée à Caen, sur la Côte de Nacre et en Normandie.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={TITLE}
        description={DESCRIPTION}
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />

      <section className="bg-ivoire py-20 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {BLOG_POSTS.map((post, index) => (
              <Reveal key={post.slug} delay={(index % 2) * 90}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col gap-4 rounded-sm border border-anthracite/10 bg-blanc-casse p-8 transition-colors hover:border-champagne"
                >
                  <span className="text-xs uppercase tracking-[0.24em] text-champagne-ink">
                    {getCategoryLabel(post.category)}
                  </span>
                  <h2 className="font-serif text-2xl text-anthracite">
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-brun">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-4 text-xs text-brun">
                    <span>{post.readTime} de lecture</span>
                    <span className="text-champagne-ink transition-transform group-hover:translate-x-1">
                      Lire l&apos;article →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
    </>
  );
}

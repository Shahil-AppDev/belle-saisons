import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { BLOG_POSTS, getPostBySlug } from "@/data/blog";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <article className="bg-ivoire py-16 lg:py-20">
        <Container className="max-w-3xl">
          <div className="mb-10 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-brun/70">
            <span>
              {new Date(post.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime} de lecture</span>
          </div>

          <div className="flex flex-col gap-10">
            {post.content.map((block, index) => (
              <div key={index} className="flex flex-col gap-4">
                {block.heading && (
                  <h2 className="font-serif text-2xl text-anthracite">
                    {block.heading}
                  </h2>
                )}
                {block.paragraphs.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-brun leading-relaxed text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </article>

      <CtaFinal
        title="Prêt à passer à l'action ?"
        description="Belle Saisons vous accompagne dans la mise en location de votre bien, de A à Z."
      />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import Link from "next/link";
import { BLOG_POSTS, getPostBySlug, getCategoryLabel } from "@/data/blog";
import { blogPostingJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

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
        eyebrow={getCategoryLabel(post.category)}
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
          <div className="mb-10 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.2em] text-brun/70">
            <span>{post.author}</span>
            <span aria-hidden="true">·</span>
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

          {post.relatedLinks.length > 0 && (
            <div className="mt-14 flex flex-col gap-4 border-t border-anthracite/10 pt-8">
              <span className="text-xs uppercase tracking-[0.2em] text-champagne-ink">
                Pour aller plus loin
              </span>
              <div className="flex flex-wrap gap-3">
                {post.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-anthracite/20 px-5 py-2 text-sm text-anthracite transition-colors hover:border-champagne hover:text-champagne-ink"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </article>

      <CtaFinal
        title="Prêt à passer à l'action ?"
        description="Belle Saisons vous accompagne dans la mise en location de votre bien, de A à Z."
        trackingEvent="blog_to_owner_cta"
        trackingProps={{ article: post.slug }}
      />

      <JsonLd
        data={blogPostingJsonLd({
          title: post.title,
          description: post.metaDescription,
          path: `/blog/${post.slug}`,
          datePublished: post.date,
          authorName: post.author,
        })}
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

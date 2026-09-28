import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { CITIES } from "@/data/cities";
import { BLOG_POSTS } from "@/data/blog";

const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/conciergerie", priority: 0.9 },
  { path: "/services", priority: 0.9 },
  { path: "/gestion-locative", priority: 0.9 },
  { path: "/location-courte-duree", priority: 0.8 },
  { path: "/airbnb", priority: 0.8 },
  { path: "/booking", priority: 0.8 },
  { path: "/proprietaires", priority: 0.8 },
  { path: "/notre-conciergerie", priority: 0.7 },
  { path: "/a-propos", priority: 0.6 },
  { path: "/contact", priority: 0.7 },
  { path: "/blog", priority: 0.6 },
  { path: "/mentions-legales", priority: 0.2 },
  { path: "/politique-de-confidentialite", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: now,
    priority: route.priority,
  }));

  const cityEntries = CITIES.map((city) => ({
    url: `${siteConfig.url}/${city.slug}`,
    lastModified: now,
    priority: 0.85,
  }));

  const blogEntries = BLOG_POSTS.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.5,
  }));

  return [...staticEntries, ...cityEntries, ...blogEntries];
}

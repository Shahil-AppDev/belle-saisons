import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Routes techniques/internes : jamais destinées à l'indexation.
      // /api/dev/* est de toute façon inaccessible hors développement
      // (voir app/api/dev/test-email/route.ts), mais reste exclue ici par
      // principe de défense en profondeur.
      disallow: ["/api/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}

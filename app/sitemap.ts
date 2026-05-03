import type { MetadataRoute } from "next";

/**
 * Dynamic sitemap generated at build time by Next.js.
 * Exports a valid sitemap.xml at /sitemap.xml for search-engine crawlers.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ??
    "https://election-guide-assistant-is2rul5cxa-el.a.run.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}

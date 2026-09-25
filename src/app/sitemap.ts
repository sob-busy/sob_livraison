import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import type { Pathname } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";

// Public pages listed for Google (private areas are excluded)
const publicPages: Pathname[] = [
  "/",
  "/services",
  "/faq",
  "/contact",
  "/legal-notice",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const absoluteUrl = (locale: (typeof routing.locales)[number], page: Pathname) =>
    siteUrl + getPathname({ locale, href: page });

  return publicPages.flatMap((page) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, page),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((alternate) => [
            alternate,
            absoluteUrl(alternate, page),
          ]),
        ),
      },
    })),
  );
}

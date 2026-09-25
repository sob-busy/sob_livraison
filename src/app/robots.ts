import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import type { Pathname } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";

// Private areas that search engines should not crawl
const privatePages: Pathname[] = ["/account", "/courier", "/admin"];

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    "/api/",
    ...privatePages.flatMap((page) =>
      routing.locales.map((locale) => getPathname({ locale, href: page })),
    ),
  ];

  return {
    rules: { userAgent: "*", allow: "/", disallow },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

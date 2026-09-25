import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { siteName } from "@/lib/site";

export type Pathname = keyof typeof routing.pathnames;

const openGraphLocales: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_US",
};

type PageMetadataOptions = {
  locale: Locale;
  pathname: Pathname;
  title: string;
  description: string;
  // true: use the title as is, without the " | Sob Livraison" suffix
  absoluteTitle?: boolean;
  noIndex?: boolean;
};

// SEO metadata for a page: title, description, canonical URL,
// hreflang alternates (FR/EN) and WhatsApp/Facebook preview
export function pageMetadata({
  locale,
  pathname,
  title,
  description,
  absoluteTitle = false,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = getPathname({ locale, href: pathname });
  const languages: Record<string, string> = {};
  for (const alternate of routing.locales) {
    languages[alternate] = getPathname({ locale: alternate, href: pathname });
  }
  languages["x-default"] = languages[routing.defaultLocale];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: openGraphLocales[locale],
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

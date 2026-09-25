"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

// FR | EN toggle: links to the current page in each language
export function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const currentLocale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("label")}>
      <ul className="flex items-center rounded-xl border border-border p-0.5">
        {routing.locales.map((locale) => {
          const isActive = locale === currentLocale;
          return (
            <li key={locale}>
              <Link
                href={pathname}
                locale={locale}
                hrefLang={locale}
                lang={locale}
                aria-label={t(locale)}
                aria-current={isActive ? "true" : undefined}
                className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg px-2 text-sm font-semibold uppercase transition-colors duration-200 ${
                  isActive
                    ? "bg-primary text-background"
                    : "text-muted hover:text-primary"
                }`}
              >
                {locale}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

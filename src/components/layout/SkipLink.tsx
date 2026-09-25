import { useTranslations } from "next-intl";

// Hidden until focused with the keyboard (Tab key)
export function SkipLink() {
  const t = useTranslations("Navigation");

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-xl focus:bg-accent focus:px-4 focus:py-3 focus:font-semibold focus:text-on-accent"
    >
      {t("skipToContent")}
    </a>
  );
}

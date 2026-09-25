import { use } from "react";
import type { Locale } from "next-intl";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalContent, type LegalSection } from "@/components/legal/LegalContent";
import { PageHeader } from "@/components/ui/PageHeader";
import { contactEmail, formatPhone, whatsappNumber } from "@/lib/contact";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/terms">) {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "Terms" });
  return pageMetadata({
    locale,
    pathname: "/terms",
    title: t("title"),
    description: t("metaDescription"),
  });
}

export default function TermsPage({ params }: PageProps<"/[locale]/terms">) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);

  const t = useTranslations("Terms");

  return (
    <main className="flex flex-1 flex-col">
      <PageHeader title={t("title")} />
      <LegalContent
        updated={t("updated")}
        sections={t.raw("sections") as LegalSection[]}
        values={{ phone: formatPhone(whatsappNumber), email: contactEmail }}
      />
    </main>
  );
}

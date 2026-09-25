import { use } from "react";
import type { Locale } from "next-intl";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ChevronDown } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { PageHeader } from "@/components/ui/PageHeader";
import { whatsappUrl } from "@/lib/contact";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/faq">) {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "FaqPage" });
  return pageMetadata({
    locale,
    pathname: "/faq",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

const questions = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9"] as const;

export default function FaqPage({ params }: PageProps<"/[locale]/faq">) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);

  const t = useTranslations("FaqPage");

  // Structured data so Google can show the questions in search results
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((key) => ({
      "@type": "Question",
      name: t(`${key}.q`),
      acceptedAnswer: { "@type": "Answer", text: t(`${key}.a`) },
    })),
  };

  return (
    <main className="flex flex-1 flex-col">
      <JsonLd data={faqJsonLd} />
      <PageHeader title={t("title")} intro={t("intro")} />

      <section className="mx-auto w-full max-w-3xl px-4 py-14">
        <ul className="flex flex-col gap-3">
          {questions.map((key) => (
            <li key={key}>
              <details className="group rounded-2xl border border-border bg-surface">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {t(`${key}.q`)}
                  <ChevronDown
                    aria-hidden
                    className="size-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                  />
                </summary>
                <p className="px-5 pb-5 text-muted">{t(`${key}.a`)}</p>
              </details>
            </li>
          ))}
        </ul>
      </section>

      <CtaBanner
        title={t("cta.title")}
        text={t("cta.text")}
        buttonLabel={t("cta.button")}
        href={whatsappUrl(t("cta.whatsappMessage"))}
      />
    </main>
  );
}

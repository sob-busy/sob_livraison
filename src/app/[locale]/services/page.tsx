import { use } from "react";
import type { Locale } from "next-intl";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Ban,
  CalendarClock,
  Check,
  Package,
  Phone,
  ShoppingBasket,
  Timer,
  UtensilsCrossed,
} from "lucide-react";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { whatsappUrl } from "@/lib/contact";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/services">) {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "ServicesPage" });
  return pageMetadata({
    locale,
    pathname: "/services",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

const categories = [
  { key: "parcel", icon: Package },
  { key: "meal", icon: UtensilsCrossed },
  { key: "groceries", icon: ShoppingBasket },
] as const;
const categoryExamples = ["ex1", "ex2", "ex3"] as const;
const sizes = ["small", "medium", "large"] as const;
const priceRows = ["base", "perKm", "minimum", "maxDistance"] as const;
const priceExamples = ["ex1", "ex2", "ex3"] as const;
const forbiddenItems = ["i1", "i2", "i3", "i4", "i5"] as const;

export default function ServicesPage({
  params,
}: PageProps<"/[locale]/services">) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);

  const t = useTranslations("ServicesPage");

  return (
    <main className="flex flex-1 flex-col">
      <PageHeader title={t("title")} intro={t("intro")} />

      {/* Categories */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14">
        <h2 className="text-3xl font-bold">{t("categories.title")}</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {categories.map(({ key, icon: Icon }, index) => (
            <li key={key}>
              <Reveal
                delay={index * 0.1}
                className="h-full rounded-2xl border border-border bg-surface p-6 shadow-sm"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-on-accent">
                  <Icon aria-hidden className="size-6" />
                </span>
                <h3 className="mt-4 text-xl font-bold">
                  {t(`categories.${key}.title`)}
                </h3>
                <p className="mt-2 text-muted">{t(`categories.${key}.text`)}</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {categoryExamples.map((example) => (
                    <li key={example} className="flex gap-2">
                      <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-success" />
                      {t(`categories.${key}.${example}`)}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Pricing */}
      <section className="bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-bold">{t("pricing.title")}</h2>
            <p className="mt-3 text-lg text-muted">{t("pricing.intro")}</p>
            <dl className="mt-6 divide-y divide-border rounded-2xl border border-border bg-background">
              {priceRows.map((row) => (
                <div key={row} className="flex justify-between gap-4 px-5 py-4">
                  <dt>{t(`pricing.${row}.label`)}</dt>
                  <dd className="font-semibold whitespace-nowrap">
                    {t(`pricing.${row}.value`)}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-muted">{t("pricing.maxNote")}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="text-2xl font-bold">{t("sizes.title")}</h3>
            <p className="mt-2 text-muted">{t("sizes.intro")}</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {sizes.map((size) => (
                <li
                  key={size}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background px-5 py-4"
                >
                  <div>
                    <p className="font-semibold">{t(`sizes.${size}.title`)}</p>
                    <p className="text-sm text-muted">{t(`sizes.${size}.text`)}</p>
                  </div>
                  <span className="font-semibold whitespace-nowrap">
                    {t(`sizes.${size}.price`)}
                  </span>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-2xl font-bold">
              {t("pricing.examplesTitle")}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {priceExamples.map((example) => (
                <li
                  key={example}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background px-5 py-4"
                >
                  <div>
                    <p className="font-semibold">
                      {t(`pricing.${example}.label`)}
                    </p>
                    <p className="text-sm text-muted">
                      {t(`pricing.${example}.calc`)}
                    </p>
                  </div>
                  <span className="rounded-lg bg-accent px-3 py-1 font-bold whitespace-nowrap text-on-accent">
                    {t(`pricing.${example}.price`)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-muted">{t("pricing.note")}</p>
          </Reveal>
        </div>
      </section>

      {/* Delivery times and rules */}
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 md:grid-cols-2">
        <Reveal>
          <h2 className="text-3xl font-bold">{t("delays.title")}</h2>
          <ul className="mt-6 flex flex-col gap-5">
            <li className="flex gap-4">
              <Timer aria-hidden className="size-7 shrink-0 text-primary" />
              <div>
                <h3 className="text-lg font-bold">{t("delays.immediate.title")}</h3>
                <p className="text-muted">{t("delays.immediate.text")}</p>
              </div>
            </li>
            <li className="flex gap-4">
              <CalendarClock aria-hidden className="size-7 shrink-0 text-primary" />
              <div>
                <h3 className="text-lg font-bold">{t("delays.scheduled.title")}</h3>
                <p className="text-muted">{t("delays.scheduled.text")}</p>
              </div>
            </li>
            <li className="flex gap-4">
              <Phone aria-hidden className="size-7 shrink-0 text-primary" />
              <div>
                <h3 className="text-lg font-bold">{t("delays.reachable.title")}</h3>
                <p className="text-muted">{t("delays.reachable.text")}</p>
              </div>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-3xl font-bold">{t("forbidden.title")}</h2>
          <p className="mt-3 text-muted">{t("forbidden.intro")}</p>
          <ul className="mt-6 flex flex-col gap-3">
            {forbiddenItems.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <Ban aria-hidden className="size-5 shrink-0 text-error" />
                {t(`forbidden.${item}`)}
              </li>
            ))}
          </ul>
        </Reveal>
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

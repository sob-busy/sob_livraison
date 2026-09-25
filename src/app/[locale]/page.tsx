import { use } from "react";
import type { Locale } from "next-intl";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  Banknote,
  CalendarClock,
  Check,
  MapPin,
  Motorbike,
  Package,
  Receipt,
  ShoppingBasket,
  Timer,
  UtensilsCrossed,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { CtaBanner } from "@/components/ui/CtaBanner";
import { Reveal } from "@/components/ui/Reveal";
import { buttonStyles } from "@/components/ui/button-styles";
import { whatsappUrl } from "@/lib/contact";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return pageMetadata({
    locale,
    pathname: "/",
    title: t("title"),
    description: t("description"),
    absoluteTitle: true,
  });
}

const highlights = ["highlight1", "highlight2", "highlight3"] as const;

const services = [
  { key: "parcel", icon: Package },
  { key: "meal", icon: UtensilsCrossed },
  { key: "groceries", icon: ShoppingBasket },
] as const;

const steps = [
  { key: "step1", icon: MapPin },
  { key: "step2", icon: Receipt },
  { key: "step3", icon: Motorbike },
] as const;

const reasons = [
  { key: "fast", icon: Timer },
  { key: "price", icon: Receipt },
  { key: "cash", icon: Banknote },
  { key: "available", icon: CalendarClock },
] as const;

const quoteRows = ["base", "distance", "size"] as const;

export default function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);

  const t = useTranslations("HomePage");
  const tNav = useTranslations("Navigation");
  const orderUrl = whatsappUrl(tNav("orderWhatsappMessage"));

  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
          <div>
            <p className="inline-flex rounded-full border border-border bg-background px-3 py-1 text-sm font-semibold text-primary">
              {t("hero.eyebrow")}
            </p>
            <h1 className="mt-4 text-4xl leading-tight font-bold sm:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="mt-4 text-lg text-muted">{t("hero.subtitle")}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles.primary}
              >
                {t("hero.ctaPrimary")}
                <ArrowRight aria-hidden className="size-5" />
              </a>
              <Link href="/services" className={buttonStyles.secondary}>
                {t("hero.ctaSecondary")}
              </Link>
            </div>
            <ul className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6">
              {highlights.map((key) => (
                <li key={key} className="flex items-center gap-2">
                  <Check aria-hidden className="size-5 shrink-0 text-success" />
                  {t(`hero.${key}`)}
                </li>
              ))}
            </ul>
          </div>

          {/* Example quote: shows how the price is calculated */}
          <div className="rounded-2xl border border-border bg-background p-6 shadow-lg">
            <p className="text-sm font-semibold tracking-wide text-muted uppercase">
              {t("quote.label")}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface text-primary">
                <Package aria-hidden className="size-6" />
              </span>
              <div>
                <p className="font-semibold">{t("quote.item")}</p>
                <p className="text-sm text-muted">{t("quote.details")}</p>
              </div>
            </div>
            <dl className="mt-6 flex flex-col gap-2">
              {quoteRows.map((row) => (
                <div key={row} className="flex justify-between gap-4">
                  <dt className="text-muted">{t(`quote.${row}.label`)}</dt>
                  <dd className="font-medium">{t(`quote.${row}.value`)}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-4">
              <span className="font-semibold">{t("quote.total")}</span>
              <span className="rounded-lg bg-accent px-3 py-1 text-2xl font-bold text-on-accent">
                {t("quote.price")}
              </span>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted">
              <Banknote aria-hidden className="size-5 shrink-0" />
              {t("quote.note")}
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <Reveal>
          <h2 className="text-3xl font-bold">{t("services.title")}</h2>
          <p className="mt-3 max-w-2xl text-lg text-muted">
            {t("services.subtitle")}
          </p>
        </Reveal>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map(({ key, icon: Icon }, index) => (
            <li key={key}>
              <Reveal
                delay={index * 0.1}
                className="h-full rounded-2xl border border-border bg-surface p-6 shadow-sm"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-on-accent">
                  <Icon aria-hidden className="size-6" />
                </span>
                <h3 className="mt-4 text-xl font-bold">
                  {t(`services.${key}.title`)}
                </h3>
                <p className="mt-2 text-muted">{t(`services.${key}.text`)}</p>
              </Reveal>
            </li>
          ))}
        </ul>
        <Link
          href="/services"
          className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-primary hover:underline"
        >
          {t("services.more")}
          <ArrowRight aria-hidden className="size-5" />
        </Link>
      </section>

      {/* How it works */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <Reveal>
            <h2 className="text-3xl font-bold">{t("steps.title")}</h2>
            <p className="mt-3 max-w-2xl text-lg text-muted">
              {t("steps.subtitle")}
            </p>
          </Reveal>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map(({ key, icon: Icon }, index) => (
              <li key={key}>
                <Reveal delay={index * 0.1} className="flex h-full gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-background">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="flex items-center gap-2 text-xl font-bold">
                      {t(`steps.${key}.title`)}
                      <Icon aria-hidden className="size-5 text-muted" />
                    </h3>
                    <p className="mt-2 text-muted">{t(`steps.${key}.text`)}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why choose us */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16">
        <Reveal>
          <h2 className="text-3xl font-bold">{t("why.title")}</h2>
        </Reveal>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ key, icon: Icon }, index) => (
            <li key={key}>
              <Reveal delay={index * 0.08} className="h-full">
                <Icon aria-hidden className="size-8 text-primary" />
                <h3 className="mt-3 text-lg font-bold">{t(`why.${key}.title`)}</h3>
                <p className="mt-1 text-muted">{t(`why.${key}.text`)}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Final call to action */}
      <CtaBanner
        title={t("cta.title")}
        text={t("cta.text")}
        buttonLabel={t("cta.button")}
        href={orderUrl}
      />
    </main>
  );
}

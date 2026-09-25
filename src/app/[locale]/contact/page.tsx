import { use } from "react";
import type { Locale } from "next-intl";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { buttonStyles } from "@/components/ui/button-styles";
import {
  contactEmail,
  formatPhone,
  whatsappNumber,
  whatsappUrl,
} from "@/lib/contact";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">) {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  return pageMetadata({
    locale,
    pathname: "/contact",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);

  const t = useTranslations("ContactPage");
  const phone = formatPhone(whatsappNumber);

  const channels = [
    {
      key: "whatsapp",
      icon: MessageCircle,
      value: phone,
      href: whatsappUrl(t("whatsappMessage")),
      external: true,
      primary: true,
    },
    {
      key: "phone",
      icon: Phone,
      value: phone,
      href: `tel:+${whatsappNumber}`,
      external: false,
      primary: false,
    },
    {
      key: "email",
      icon: Mail,
      value: contactEmail,
      href: `mailto:${contactEmail}`,
      external: false,
      primary: false,
    },
  ] as const;

  return (
    <main className="flex flex-1 flex-col">
      <PageHeader title={t("title")} intro={t("intro")} />

      <section className="mx-auto w-full max-w-6xl px-4 py-14">
        <ul className="grid gap-6 md:grid-cols-3">
          {channels.map(({ key, icon: Icon, value, href, external, primary }, index) => (
            <li key={key}>
              <Reveal
                delay={index * 0.1}
                className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm"
              >
                <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-on-accent">
                  <Icon aria-hidden className="size-6" />
                </span>
                <h2 className="mt-4 text-2xl font-bold">{t(`${key}.title`)}</h2>
                <p className="mt-2 text-muted">{t(`${key}.text`)}</p>
                <p className="mt-3 font-semibold break-all">{value}</p>
                <div className="mt-auto pt-6">
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={`${primary ? buttonStyles.primary : buttonStyles.secondary} w-full`}
                  >
                    {t(`${key}.button`)}
                  </a>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-surface">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2">
          <div className="flex gap-4">
            <MapPin aria-hidden className="size-7 shrink-0 text-primary" />
            <div>
              <h2 className="text-xl font-bold">{t("zone.title")}</h2>
              <p className="mt-1 text-muted">{t("zone.text")}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Clock aria-hidden className="size-7 shrink-0 text-primary" />
            <div>
              <h2 className="text-xl font-bold">{t("hours.title")}</h2>
              <p className="mt-1 text-muted">{t("hours.text")}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

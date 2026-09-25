import { Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  contactEmail,
  formatPhone,
  whatsappNumber,
  whatsappUrl,
} from "@/lib/contact";
import { Logo } from "./Logo";
import { legalItems, navItems } from "./nav-items";

const linkClass =
  "inline-flex min-h-11 items-center text-muted transition-colors duration-200 hover:text-primary";
const titleClass = "font-sans text-sm font-semibold uppercase tracking-wide";

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navigation");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <Logo label={tNav("logoLabel")} className="h-8 w-auto" />
          <p className="text-muted">{t("tagline")}</p>
        </div>

        <nav aria-labelledby="footer-nav-title">
          <h2 id="footer-nav-title" className={titleClass}>
            {t("navTitle")}
          </h2>
          <ul className="mt-2">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className={linkClass}>
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-legal-title">
          <h2 id="footer-legal-title" className={titleClass}>
            {t("legalTitle")}
          </h2>
          <ul className="mt-2">
            {legalItems.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className={linkClass}>
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={titleClass}>{t("contactTitle")}</h2>
          <ul className="mt-2">
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} gap-2`}
              >
                <MessageCircle aria-hidden className="size-5 shrink-0" />
                <span>
                  <span className="sr-only">{t("whatsapp")} </span>
                  {formatPhone(whatsappNumber)}
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${contactEmail}`} className={`${linkClass} gap-2 break-all`}>
                <Mail aria-hidden className="size-5 shrink-0" />
                <span>
                  <span className="sr-only">{t("email")} </span>
                  {contactEmail}
                </span>
              </a>
            </li>
            <li className="flex min-h-11 items-center gap-2 text-muted">
              <MapPin aria-hidden className="size-5 shrink-0" />
              {t("zone")}
            </li>
            <li className="flex min-h-11 items-center gap-2 text-muted">
              <Clock aria-hidden className="size-5 shrink-0" />
              {t("availability")}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-4 text-sm text-muted">
          {t("rights", { year })}
        </p>
      </div>
    </footer>
  );
}

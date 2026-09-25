import { useTranslations } from "next-intl";
import { whatsappUrl } from "@/lib/contact";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLink } from "./NavLink";
import { navItems } from "./nav-items";

export function Header() {
  const t = useTranslations("Navigation");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:gap-4">
        <Logo label={t("logoLabel")} className="h-8 w-auto sm:h-9" />

        <nav aria-label={t("mainNav")} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.key}>
                <NavLink
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-xl px-3 transition-colors duration-200"
                >
                  {t(item.key)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          {/* Phase 1: ordering goes through WhatsApp (order form in Phase 2) */}
          <a
            href={whatsappUrl(t("orderWhatsappMessage"))}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center rounded-xl bg-accent px-5 font-semibold text-on-accent transition-opacity duration-200 hover:opacity-90 sm:inline-flex"
          >
            {t("order")}
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

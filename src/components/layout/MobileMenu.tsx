"use client";

import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { whatsappUrl } from "@/lib/contact";
import { NavLink } from "./NavLink";
import { navItems } from "./nav-items";

// Hamburger button + drop-down panel, shown below the md breakpoint
export function MobileMenu() {
  const t = useTranslations("Navigation");
  const [open, setOpen] = useState(false);
  const panelId = useId();

  // Close with the Escape key
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? t("menuClose") : t("menuOpen")}
        className="inline-flex size-11 items-center justify-center rounded-xl text-primary transition-colors duration-200 hover:bg-surface"
      >
        {open ? (
          <X aria-hidden className="size-6" />
        ) : (
          <Menu aria-hidden className="size-6" />
        )}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-border bg-background shadow-lg"
      >
        <nav aria-label={t("mobileNav")} className="px-4 py-4">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.key}>
                <NavLink
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center rounded-xl px-3 text-lg transition-colors duration-200 hover:bg-surface"
                >
                  {t(item.key)}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex min-h-12 items-center justify-between rounded-xl px-3">
            <span className="text-lg">{t("theme")}</span>
            <ThemeToggle />
          </div>
          <a
            href={whatsappUrl(t("orderWhatsappMessage"))}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-4 flex min-h-12 w-full items-center justify-center rounded-xl bg-accent px-4 text-lg font-semibold text-on-accent transition-opacity duration-200 hover:opacity-90"
          >
            {t("order")}
          </a>
        </nav>
      </div>
    </div>
  );
}

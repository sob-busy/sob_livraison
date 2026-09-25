"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

type ThemeToggleProps = {
  className?: string;
};

// Sun/moon button; icons are swapped with CSS to avoid a hydration mismatch
// className must include the display utility (default: inline-flex)
export function ThemeToggle({ className = "inline-flex" }: ThemeToggleProps) {
  const t = useTranslations("ThemeToggle");
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={t("label")}
      title={t("label")}
      className={`size-11 items-center justify-center rounded-xl text-primary transition-colors duration-200 hover:bg-surface ${className}`}
    >
      <Moon aria-hidden className="size-5 dark:hidden" />
      <Sun aria-hidden className="hidden size-5 dark:block" />
    </button>
  );
}

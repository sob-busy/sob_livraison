import { useTranslations } from "next-intl";
import { Motorbike } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { buttonStyles } from "@/components/ui/button-styles";

// Custom 404 page (Next.js adds a "noindex" tag automatically)
export default function NotFoundPage() {
  const t = useTranslations("NotFound");

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <Motorbike aria-hidden className="size-16 text-accent" />
      <p className="mt-4 font-heading text-7xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-3xl font-bold">{t("title")}</h1>
      <p className="mt-3 text-lg text-muted">{t("text")}</p>
      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Link href="/" className={buttonStyles.primary}>
          {t("home")}
        </Link>
        <Link href="/contact" className={buttonStyles.secondary}>
          {t("contact")}
        </Link>
      </div>
    </main>
  );
}

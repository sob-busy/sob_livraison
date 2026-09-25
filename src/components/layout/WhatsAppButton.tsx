import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { whatsappUrl } from "@/lib/contact";

// Floating WhatsApp button, bottom right of every public page
export function WhatsAppButton() {
  const t = useTranslations("WhatsAppButton");

  return (
    <a
      href={whatsappUrl(t("message"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("label")}
      title={t("label")}
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      <MessageCircle aria-hidden className="size-7" />
    </a>
  );
}

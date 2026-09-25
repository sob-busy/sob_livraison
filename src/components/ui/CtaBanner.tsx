import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { buttonStyles } from "./button-styles";

type CtaBannerProps = {
  title: string;
  text: string;
  buttonLabel: string;
  href: string;
};

// Navy call-to-action band (external link, e.g. WhatsApp)
export function CtaBanner({ title, text, buttonLabel, href }: CtaBannerProps) {
  return (
    <section className="bg-primary">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-14 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-background">{title}</h2>
          <p className="mt-2 text-lg text-background/80">{text}</p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonStyles.primary} w-full shrink-0 sm:w-auto`}
        >
          {buttonLabel}
          <ArrowRight aria-hidden className="size-5" />
        </a>
      </Reveal>
    </section>
  );
}

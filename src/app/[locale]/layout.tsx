import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { SplashScreen, splashScript } from "@/components/loading/SplashScreen";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { siteName, siteUrl } from "@/lib/site";
import "../globals.css";

// Body text: readable on small screens
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Headings: elegant serif
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t("title"), template: `%s | ${siteName}` },
    description: t("description"),
    applicationName: siteName,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Enables static rendering for this locale
  setRequestLocale(locale);

  // Only send to the browser the texts used by client components
  // (keeps pages light on slow connections)
  const messages = await getMessages();
  const clientMessages = {
    Navigation: messages.Navigation,
    LocaleSwitcher: messages.LocaleSwitcher,
    ThemeToggle: messages.ThemeToggle,
  };

  return (
    // suppressHydrationWarning: next-themes sets the theme class before React loads
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: splashScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <SplashScreen />
        <ThemeProvider>
          <NextIntlClientProvider messages={clientMessages}>
            <SkipLink />
            <Header />
            <div
              id="main-content"
              tabIndex={-1}
              className="flex flex-1 flex-col outline-none"
            >
              {children}
            </div>
            <Footer />
            <WhatsAppButton />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  // French by default: visitors are not redirected based on browser language
  localeDetection: false,
  // Folder names are in English; URLs are translated (see docs/ARCHITECTURE.md)
  pathnames: {
    "/": "/",
    "/services": "/services",
    "/contact": "/contact",
    "/faq": "/faq",
    "/legal-notice": {
      fr: "/mentions-legales",
      en: "/legal-notice",
    },
    "/privacy": {
      fr: "/confidentialite",
      en: "/privacy",
    },
    "/terms": {
      fr: "/conditions",
      en: "/terms",
    },
    "/login": {
      fr: "/connexion",
      en: "/login",
    },
    "/signup": {
      fr: "/inscription",
      en: "/signup",
    },
    "/forgot-password": {
      fr: "/mot-de-passe-oublie",
      en: "/forgot-password",
    },
    "/account": {
      fr: "/compte",
      en: "/account",
    },
    "/account/order": {
      fr: "/compte/commander",
      en: "/account/order",
    },
    "/courier": {
      fr: "/livreur",
      en: "/courier",
    },
    "/admin": "/admin",
    "/admin/couriers": {
      fr: "/admin/livreurs",
      en: "/admin/couriers",
    },
    "/admin/pricing": {
      fr: "/admin/tarifs",
      en: "/admin/pricing",
    },
  },
});

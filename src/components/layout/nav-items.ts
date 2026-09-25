// Main navigation links; labels live in messages/*.json under "Navigation"
export const navItems = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/faq", key: "faq" },
  { href: "/contact", key: "contact" },
] as const;

// Legal pages; labels live under "Footer"
export const legalItems = [
  { href: "/legal-notice", key: "legalNotice" },
  { href: "/privacy", key: "privacy" },
  { href: "/terms", key: "terms" },
] as const;

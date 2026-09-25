// Absolute site URL, used for SEO links, sitemap and Open Graph.
// On Vercel, falls back to the production domain if NEXT_PUBLIC_SITE_URL is not set.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const siteName = "Sob Livraison";

// Stops the build if a contact variable is missing, instead of
// publishing a site with empty WhatsApp / email links
function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(
      `Missing environment variable ${name}. Add it to .env.local (locally) or to the Vercel project settings, then rebuild.`,
    );
  }
  return value;
}

// Public contact details, read from environment variables (see .env.example).
// NEXT_PUBLIC_* values are written into the site at build time.
export const whatsappNumber = required(
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  "NEXT_PUBLIC_WHATSAPP_NUMBER",
);
export const contactEmail = required(
  process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  "NEXT_PUBLIC_CONTACT_EMAIL",
);

// wa.me link, optionally with a pre-filled message
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// "22892889112" → "+228 92 88 91 12"
export function formatPhone(number: string): string {
  if (number.startsWith("228") && number.length === 11) {
    const local = number.slice(3).match(/.{2}/g) ?? [];
    return `+228 ${local.join(" ")}`;
  }
  return `+${number}`;
}

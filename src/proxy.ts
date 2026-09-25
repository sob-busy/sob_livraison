import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Adds the locale to URLs (/ → /fr) and resolves translated pathnames.
// Role-based route protection will be added here in Phase 2.
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next.js internals, generated icons and files with an extension
  matcher: "/((?!api|_next|_vercel|apple-icon|.*\\..*).*)",
};

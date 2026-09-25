// Shared button styles (links and buttons): large, rounded, easy to tap
const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 text-base font-semibold transition-colors duration-200";

export const buttonStyles = {
  // Amber call-to-action
  primary: `${base} bg-accent text-on-accent hover:opacity-90`,
  // Outlined, for secondary actions
  secondary: `${base} border border-border bg-background text-primary hover:bg-surface`,
};

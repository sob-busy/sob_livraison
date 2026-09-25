"use client";

import type { ComponentProps } from "react";
import { Link, usePathname } from "@/i18n/navigation";

type NavLinkProps = ComponentProps<typeof Link>;

// Link that highlights itself when it points to the current page
export function NavLink({ href, className = "", ...rest }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = typeof href === "string" && pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`${className} ${
        isActive
          ? "font-semibold text-primary"
          : "text-foreground hover:text-primary"
      }`}
      {...rest}
    />
  );
}

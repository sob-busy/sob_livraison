import Image from "next/image";
import { Link } from "@/i18n/navigation";

type LogoProps = {
  label: string;
  className?: string;
};

// Provisional logo: light and dark versions, swapped by the "dark" class
export function Logo({ label, className = "h-9 w-auto" }: LogoProps) {
  return (
    <Link href="/" aria-label={label} className="shrink-0 rounded-lg">
      <Image
        src="/logo.svg"
        alt=""
        width={250}
        height={48}
        preload
        className={`${className} dark:hidden`}
      />
      <Image
        src="/logo-dark.svg"
        alt=""
        width={250}
        height={48}
        className={`${className} hidden dark:block`}
      />
    </Link>
  );
}

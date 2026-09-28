import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

const SIZES = {
  sm: { box: 44, text: "text-base" },
  md: { box: 60, text: "text-lg" },
  lg: { box: 84, text: "text-xl" },
} as const;

type BrandLogoProps = {
  size?: keyof typeof SIZES;
  withWordmark?: boolean;
  className?: string;
  wordmarkClassName?: string;
  priority?: boolean;
};

/**
 * Affichage officiel du monogramme Belle Saisons.
 * Le fichier source (public/brand/logo.png) ne doit jamais être recadré,
 * redessiné ou recoloré : seule sa taille d'affichage varie ici.
 */
export function BrandLogo({
  size = "md",
  withWordmark = true,
  className = "",
  wordmarkClassName = "",
  priority = false,
}: BrandLogoProps) {
  const { box, text } = SIZES[size];

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — retour à l'accueil`}
      className={`group flex items-center gap-3 ${className}`}
    >
      <span
        className="relative shrink-0"
        style={{ width: box, height: box }}
      >
        <Image
          src="/brand/logo.png"
          alt={`${siteConfig.name} — logo officiel`}
          fill
          priority={priority}
          sizes={`${box}px`}
          className="object-contain"
        />
      </span>
      {withWordmark && (
        <span
          className={`flex flex-col leading-tight font-serif ${text} ${wordmarkClassName}`}
        >
          <span className="tracking-[0.14em] uppercase">Belle Saisons</span>
          <span className="text-[0.62em] tracking-[0.32em] uppercase text-current/60 font-sans">
            Conciergerie
          </span>
        </span>
      )}
    </Link>
  );
}

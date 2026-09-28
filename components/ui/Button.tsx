import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-anthracite text-blanc-casse hover:bg-noir border border-anthracite hover:border-noir",
  secondary:
    "bg-transparent text-anthracite border border-anthracite/30 hover:border-anthracite hover:bg-anthracite/5",
  ghost:
    "bg-transparent text-current border border-current/30 hover:border-current hover:bg-current/5",
};

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
  onClick?: never;
};

type ButtonAsButton = CommonProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "primary", className = "" } = props;
  const base =
    "inline-flex items-center justify-center gap-2 rounded-sm px-7 py-3.5 text-sm tracking-[0.08em] uppercase transition-colors duration-300 ease-out";
  const classes = `${base} ${VARIANT_STYLES[variant]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { onClick, type = "button" } = props as ButtonAsButton;
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

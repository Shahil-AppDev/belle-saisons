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

type ButtonSize = "sm" | "md";

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-7 py-3.5 text-sm",
};

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
  onClick?: () => void;
};

type ButtonAsButton = CommonProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "primary", size = "md", className = "" } = props;
  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm tracking-[0.08em] uppercase transition-colors duration-300 ease-out";
  const classes = `${base} ${SIZE_STYLES[size]} ${VARIANT_STYLES[variant]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} onClick={props.onClick} className={classes}>
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

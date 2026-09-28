"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export function SubmitButton({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={`inline-flex items-center justify-center gap-2 rounded-sm bg-anthracite px-7 py-3.5 text-sm uppercase tracking-[0.08em] text-blanc-casse transition-colors hover:bg-noir disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {pending ? "Envoi en cours…" : children}
    </button>
  );
}

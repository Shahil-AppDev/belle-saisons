export function FormConfirmation({
  title = "Votre demande a bien été transmise.",
  description = "Notre équipe étudie votre bien et revient vers vous personnellement.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-5 rounded-sm border border-champagne/40 bg-blanc-casse p-10 text-center lg:p-14"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-or-doux/60 text-or-doux">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 12.5L9.5 17L19 7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <h2 className="font-serif text-2xl text-anthracite">{title}</h2>
      <p className="max-w-md text-brun leading-relaxed">{description}</p>
    </div>
  );
}

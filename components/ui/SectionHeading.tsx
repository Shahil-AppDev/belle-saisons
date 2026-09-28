type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  as = "h2",
}: SectionHeadingProps) {
  const Heading = as;
  const alignClass = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  const toneClass = tone === "light" ? "text-blanc-casse" : "text-anthracite";
  const subToneClass = tone === "light" ? "text-blanc-casse/75" : "text-brun";

  return (
    <div className={`flex flex-col gap-4 max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <span
          className={`text-xs uppercase tracking-[0.3em] ${
            tone === "light" ? "text-or-doux" : "text-champagne"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <Heading
        className={`text-balance font-serif text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] ${toneClass}`}
      >
        {title}
      </Heading>
      {description && (
        <p className={`text-base sm:text-lg leading-relaxed ${subToneClass}`}>
          {description}
        </p>
      )}
    </div>
  );
}

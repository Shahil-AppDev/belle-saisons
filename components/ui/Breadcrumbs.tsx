import Link from "next/link";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({
  items,
  tone = "dark",
}: {
  items: Crumb[];
  tone?: "dark" | "light";
}) {
  const mutedClass = tone === "light" ? "text-blanc-casse/60" : "text-brun/70";
  const currentClass = tone === "light" ? "text-blanc-casse" : "text-anthracite";
  const hoverClass =
    tone === "light" ? "hover:text-blanc-casse" : "hover:text-anthracite";

  return (
    <nav aria-label="Fil d'Ariane" className={`text-xs ${mutedClass}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center gap-1.5">
            {index > 0 && <span aria-hidden="true">/</span>}
            {index === items.length - 1 ? (
              <span className={currentClass}>{item.name}</span>
            ) : (
              <Link href={item.path} className={`transition-colors ${hoverClass}`}>
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

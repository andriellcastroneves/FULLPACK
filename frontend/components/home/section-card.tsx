import Link from "next/link";

type SectionCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
};

export function SectionCard({
  eyebrow,
  title,
  description,
  href,
  cta,
}: SectionCardProps) {
  return (
    <article className="panel p-6 md:p-7">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent">{eyebrow}</p>
      <h3 className="mt-4 text-2xl font-black tracking-tight">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-foreground/72">{description}</p>
      <Link className="btn-primary mt-6 inline-flex" href={href}>
        {cta}
      </Link>
    </article>
  );
}

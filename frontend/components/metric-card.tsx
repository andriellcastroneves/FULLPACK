type MetricCardProps = {
  title: string;
  value: string;
  description: string;
};

export function MetricCard({ title, value, description }: MetricCardProps) {
  return (
    <article className="rounded-3xl border border-line bg-white/75 p-5">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
        {title}
      </p>
      <h3 className="mt-3 text-2xl font-black tracking-tight">{value}</h3>
      <p className="mt-2 text-sm leading-6 text-foreground/72">{description}</p>
    </article>
  );
}

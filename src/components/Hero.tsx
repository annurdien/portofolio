import Link from "next/link";

type HeroProps = {
  projectCount: number;
  featuredCount: number;
  categoryCount: number;
  yearsActive: number;
  topCategories: string[];
  latestProject: {
    title: string;
    year: number;
    category: string;
    summary: string;
  } | null;
};

export function Hero({
  projectCount,
  featuredCount,
  categoryCount,
  yearsActive,
  topCategories,
  latestProject,
}: HeroProps) {
  const stats = [
    { label: "Shipped Projects", value: projectCount.toString() },
    { label: "Featured Builds", value: featuredCount.toString() },
    { label: "Focus Areas", value: categoryCount.toString() },
    { label: "Years Shipping", value: yearsActive.toString() }
  ];

  return (
    <section className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-16 pt-32 lg:flex-row lg:items-center lg:gap-16">
      <div className="flex-1 space-y-8">
        <p className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary-200">
          Comprehensive project archive
        </p>
        <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
          Every build, launch, and experiment in one living portfolio.
        </h1>
        <p className="max-w-2xl text-lg text-slate-300 md:text-xl">
          I craft product experiences end-to-end — from strategy sprints to production systems. Browse the full record of {projectCount} releases across
          platforms, industries, and ambitious experiments.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-800/60 bg-slate-900/60 px-6 py-5 text-left"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-primary-500/90 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-950 transition hover:bg-primary-400"
          >
            Browse the archive
            <span aria-hidden>↘</span>
          </Link>
          <Link
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-2 rounded-full border border-slate-800 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-200 transition hover:border-primary-400 hover:text-primary-100"
          >
            Book a project call
          </Link>
        </div>
      </div>
      <aside className="flex flex-1 flex-col gap-6">
        <div className="rounded-3xl border border-primary-500/40 bg-gradient-to-br from-primary-500/15 via-slate-900 to-slate-950 p-8 shadow-glow">
          <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-primary-200/90">
            Focus areas
          </h2>
          <ul className="mt-6 space-y-3 text-sm text-slate-200">
            {topCategories.map((category) => (
              <li key={category} className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary-400 shadow-glow" aria-hidden />
                {category}
              </li>
            ))}
          </ul>
        </div>
        {latestProject && (
          <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
              Latest launch · {latestProject.year}
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{latestProject.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{latestProject.summary}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary-200/80">
              {latestProject.category}
            </p>
          </div>
        )}
      </aside>
    </section>
  );
}

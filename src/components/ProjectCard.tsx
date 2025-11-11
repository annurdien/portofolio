import Link from "next/link";

import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-primary-400/60 hover:bg-slate-900/70">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{project.year}</span>
        <span>{project.status}</span>
      </div>
      <h2 className="mt-4 text-xl font-semibold text-white">
        <Link href={`/projects/${project.slug}`} className="focus:outline-none focus:ring-2 focus:ring-primary-400">
          {project.title}
        </Link>
      </h2>
      <p className="mt-2 text-sm text-slate-300">{project.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tech.slice(0, 5).map((item) => (
          <li key={item} className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-slate-300">
            {item}
          </li>
        ))}
      </ul>
      <Link
        href={`/projects/${project.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-200 transition hover:text-primary-100"
      >
        View details
        <span aria-hidden>→</span>
      </Link>
    </article>
  );
}

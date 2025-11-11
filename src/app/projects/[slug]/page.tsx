import { notFound } from "next/navigation";
import Link from "next/link";

import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";

function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({ params }: ProjectPageProps) {
  const project = getProject(params.slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} · Projects`,
    description: project.summary,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Link href="/" className="text-sm text-primary-200 hover:text-primary-100">
        ← Back to all projects
      </Link>
      <header className="mt-6 space-y-3">
        <p className="text-xs text-slate-400">
          {project.year} · {project.status} · {project.category}
        </p>
        <h1 className="text-3xl font-semibold text-white md:text-4xl">{project.title}</h1>
        <p className="text-base text-slate-300 md:text-lg">{project.summary}</p>
      </header>
      <section className="mt-8 space-y-6 text-sm text-slate-300 md:text-base">
        <p>{project.description}</p>
        {project.metrics && (
          <p className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-primary-200">
            {project.metrics}
          </p>
        )}
      </section>
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold text-slate-200">Tech Stack</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <li key={item} className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-slate-300">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-200">Links</h2>
          <ul className="mt-3 space-y-2 text-sm text-primary-200">
            {project.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noreferrer" className="hover:text-primary-100">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {project.tags && project.tags.length > 0 && (
        <section className="mt-10">
          <h2 className="text-sm font-semibold text-slate-200">Tags</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-slate-300">
                {tag}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

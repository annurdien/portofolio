import Image from "next/image";
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

  const imageSrc = project.image ?? "/images/project-placeholder.svg";

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 text-primary-100">
      <div className="border border-primary-400/40 bg-background-900 p-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.3em] text-primary-200 transition duration-150 ease-terminal hover:text-primary-50"
        >
          ← Back to all projects
        </Link>
        <header className="mt-6 space-y-4 border-b border-primary-400/30 pb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-white">
            {project.year} · {project.status} · {project.category}
          </p>
          <h1 className="text-3xl font-semibold uppercase tracking-[0.28em] text-primary-50 md:text-4xl">
            {project.title}
          </h1>
          <p className="text-base text-primary-200/75 md:text-lg">{project.summary}</p>
        </header>
        <div className="mt-8 overflow-hidden border border-primary-400/40 bg-background-900/70">
          <div className="relative h-64 w-full md:h-80">
            <Image
              src={imageSrc}
              alt={`${project.title} screenshot`}
              fill
              sizes="(min-width: 768px) 704px, calc(100vw - 3rem)"
              className="object-cover object-center"
              priority
            />
          </div>
        </div>
        <section className="mt-8 space-y-6 text-sm text-primary-200/80 md:text-base">
          <p>{project.description}</p>
        </section>
        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-white">Tech Stack</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <li
                  key={item}
                  className="border border-primary-400/40 bg-background-900 px-3 py-1 text-[0.7rem] uppercase tracking-[0.24em] text-white"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-white">Links</h2>
            <ul className="mt-3 space-y-2 text-sm text-primary-200">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="border-b border-transparent pb-1 transition duration-150 ease-terminal hover:border-primary-400 hover:text-primary-50"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
        {project.tags && project.tags.length > 0 && (
          <section className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-white">Tags</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-primary-400/40 bg-background-900 px-3 py-1 text-[0.7rem] uppercase tracking-[0.24em] text-white"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

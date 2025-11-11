"use client";

import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/data/projects";

type ProjectGalleryProps = {
  projects: Project[];
};

const sortProjects = (items: Project[]) =>
  [...items].sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return a.title.localeCompare(b.title);
  });

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return sortProjects(projects);
    }

    return sortProjects(projects).filter((project) => {
      const haystack = [
        project.title,
        project.summary,
        project.description,
        project.category,
        project.tags?.join(" ") ?? "",
        project.tech.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedSearch);
    });
  }, [projects, searchTerm]);

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold text-white md:text-4xl">Projects</h1>
        <p className="text-sm text-slate-300 md:text-base">
          Use the search box to quickly filter projects by title, tech, or keywords. Click a card to view full details.
        </p>
        <div className="flex w-full flex-col gap-2 md:w-96">
          <label htmlFor="project-search" className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Search projects
          </label>
          <input
            id="project-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search titles, tech, or tags"
            className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-primary-400/70 focus:ring-2 focus:ring-primary-500/30"
          />
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-slate-800/60 bg-slate-900/60 p-12 text-center text-sm text-slate-400">
          No projects match that search yet.
        </div>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}

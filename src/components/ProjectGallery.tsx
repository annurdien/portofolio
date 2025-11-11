"use client";

import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from "react";

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

const statusIndicator: Record<Project["status"], string> = {
  Shipped: "bg-status-shipped",
  "In Beta": "bg-status-beta",
  Exploration: "bg-status-exploration",
};

const densityOptions = [
  { label: "Compact", value: "compact" as const },
  { label: "Comfortable", value: "comfortable" as const },
  { label: "Large", value: "large" as const },
];

const densityGridMap: Record<(typeof densityOptions)[number]["value"], string> = {
  compact: "md:grid-cols-2 xl:grid-cols-3",
  comfortable: "md:grid-cols-2",
  large: "md:grid-cols-1",
};

const pageSizeOptions = [8, 16, 32, 64] as const;

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeYears, setActiveYears] = useState<string[]>([]);
  const [activeStatuses, setActiveStatuses] = useState<Project["status"][]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [density, setDensity] = useState<(typeof densityOptions)[number]["value"]>("compact");
  const [pageSize, setPageSize] = useState<(typeof pageSizeOptions)[number]>(pageSizeOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);

  const years = useMemo(
    () =>
      Array.from(new Set(projects.map((project) => project.year.toString()))).sort(
        (a, b) => Number(b) - Number(a)
      ),
    [projects]
  );

  const statuses = useMemo(
    () =>
      Array.from<Project["status"]>(
        new Set(projects.map((project) => project.status))
      ),
    [projects]
  );

  const categories = useMemo(
    () =>
      Array.from(new Set(projects.map((project) => project.category))).sort(),
    [projects]
  );

  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach((project) => {
      project.tags?.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [projects]);

  const normalizedSearch = useMemo(() => searchTerm.trim().toLowerCase(), [searchTerm]);

  const toggleSelection = <T extends string>(
    value: T,
    setter: Dispatch<SetStateAction<T[]>>
  ) => {
    setter((previous) =>
      previous.includes(value)
        ? previous.filter((item) => item !== value)
        : [...previous, value]
    );
  };

  const clearFilters = () => {
    setActiveYears([]);
    setActiveStatuses([]);
    setActiveCategories([]);
    setActiveTags([]);
  };

  const hasActiveFilters =
    activeYears.length +
      activeStatuses.length +
      activeCategories.length +
      activeTags.length >
    0;

  const filteredProjects = useMemo(() => {
    return sortProjects(projects).filter((project) => {
      if (normalizedSearch) {
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

        if (!haystack.includes(normalizedSearch)) {
          return false;
        }
      }

      if (activeYears.length && !activeYears.includes(project.year.toString())) {
        return false;
      }

      if (activeStatuses.length && !activeStatuses.includes(project.status)) {
        return false;
      }

      if (activeCategories.length && !activeCategories.includes(project.category)) {
        return false;
      }

      if (activeTags.length) {
        const projectTags = project.tags ?? [];
        const tagHit = projectTags.some((tag) => activeTags.includes(tag));
        if (!tagHit) {
          return false;
        }
      }

      return true;
    });
  }, [
    projects,
    normalizedSearch,
    activeYears,
    activeStatuses,
    activeCategories,
    activeTags,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [normalizedSearch, activeYears, activeStatuses, activeCategories, activeTags, pageSize]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 pb-20">
      <div>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold text-primary-50 md:text-[2.6rem] md:leading-tight">
              Explore my projects
            </h1>
            <p className="max-w-2xl text-sm text-primary-200/75 md:text-base">
              Explore my personal project that I've been building over the years.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-xs uppercase tracking-[0.25em] text-primary-200/60">
            <span>Results · {filteredProjects.length.toString().padStart(2, "0")}/{projects.length.toString().padStart(2, "0")}</span>
            <span>Filters active · {hasActiveFilters ? "Yes" : "No"}</span>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-4 border-t border-primary-400/20 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full flex-col gap-3 lg:max-w-md">
            <label
              htmlFor="project-search"
              className="text-[0.8rem] uppercase tracking-[0.25em] text-white"
            >
              Search projects
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-primary-200/70">
                &gt;
              </span>
              <input
                id="project-search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Type language, tag, or project keyword"
                className="w-full border border-primary-500 bg-background-900 py-3 pl-9 pr-4 text-sm text-primary-50 outline-none transition duration-150 ease-terminal focus:border-primary-400"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 text-[0.75rem] uppercase tracking-[0.2em] text-white lg:flex-row lg:items-center lg:gap-6">
            <div className="flex flex-col gap-2">
              <span>Card density</span>
              <div className="inline-flex border border-primary-400/40 bg-background-900">
                {densityOptions.map((option) => {
                  const isActive = option.value === density;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setDensity(option.value)}
                      className={`px-4 py-2 text-[0.65rem] font-semibold transition duration-200 ease-terminal ${
                        isActive
                          ? "bg-primary-500 text-background-950"
                          : "text-primary-200/70 hover:text-primary-100"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span>Items per page</span>
              <div className="inline-flex border border-primary-400/40 bg-background-900">
                {pageSizeOptions.map((option) => {
                  const isActive = option === pageSize;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setPageSize(option)}
                      className={`px-3 py-2 text-[0.65rem] font-semibold transition duration-200 ease-terminal ${
                        isActive
                          ? "bg-primary-500 text-background-950"
                          : "text-primary-200/70 hover:text-primary-100"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[18rem,1fr]">
        <aside className="space-y-8 border border-primary-500 bg-background-900 p-6">
            <div className="flex items-center justify-between text-[0.8rem] uppercase tracking-[0.1em] text-white">
              <span className="font-semibold">Filters</span>
              <button
                type="button"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className="border border-transparent px-3 py-1 font-semibold text-white underline decoration-white/70 underline-offset-4 transition duration-150 ease-terminal hover:border-primary-400 hover:text-primary-50 disabled:cursor-not-allowed disabled:text-primary-200/40"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-[0.8rem] font-medium uppercase tracking-[0.1em] text-white">Year</p>
              <div className="flex flex-wrap gap-2">
                {years.map((year) => {
                  const active = activeYears.includes(year);
                  return (
                    <button
                      key={year}
                      type="button"
                      onClick={() => toggleSelection(year, setActiveYears)}
                      className={`border px-3 py-1 text-[0.65rem] uppercase tracking-[0.1em] transition duration-150 ease-terminal ${
                        active
                          ? "border-primary-400 bg-primary-500/10 text-primary-100"
                          : "border-primary-400/30 text-primary-200/70 hover:border-primary-400 hover:text-primary-100"
                      }`}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[0.8rem] font-medium uppercase tracking-[0.1em] text-white">Status</p>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => {
                  const active = activeStatuses.includes(status);
                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => toggleSelection(status, setActiveStatuses)}
                      className={`flex items-center gap-2 border px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] transition duration-150 ease-terminal ${
                        active
                          ? "border-primary-400 bg-primary-500/10 text-primary-100"
                          : "border-primary-400/30 text-primary-200/70 hover:border-primary-400 hover:text-primary-100"
                      }`}
                    >
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${statusIndicator[status]}`}
                        aria-hidden
                      />
                      {status}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[0.8rem] font-medium uppercase tracking-[0.1em] text-white">Category</p>
              <div className="flex flex-col gap-2">
                {categories.map((category) => {
                  const active = activeCategories.includes(category);
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => toggleSelection(category, setActiveCategories)}
                      className={`flex items-center justify-between border px-3 py-2 text-[0.65rem] uppercase tracking-[0.2em] transition duration-150 ease-terminal ${
                        active
                          ? "border-primary-400 bg-primary-500/10 text-primary-100"
                          : "border-primary-400/30 text-primary-200/70 hover:border-primary-400 hover:text-primary-100"
                      }`}
                    >
                      {category}
                      <span className="text-[0.55rem] text-primary-200/50">
                        {projects.filter((project) => project.category === category).length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {tags.length > 0 && (
              <div className="space-y-3">
                <p className="text-[0.8rem] font-medium uppercase tracking-[0.1em] text-white">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => {
                    const active = activeTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleSelection(tag, setActiveTags)}
                        className={`border px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] transition duration-150 ease-terminal ${
                          active
                            ? "border-primary-400 bg-primary-500/15 text-primary-50"
                            : "border-primary-400/30 text-primary-200/70 hover:border-primary-400 hover:text-primary-100"
                        }`}
                      >
                        #{tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>

        <div className="space-y-10">
          {filteredProjects.length === 0 ? (
            <div className="border border-primary-400/40 bg-background-900 p-12 text-center text-sm text-primary-200/70">
              No projects match that combination yet.
            </div>
          ) : (
            <div className={`grid gap-6 ${densityGridMap[density]}`}>
              {paginatedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} density={density} />
              ))}
            </div>
          )}
          <div className="flex flex-col gap-4 border-t border-primary-400/40 pt-6 text-[0.65rem] uppercase tracking-[0.2em] text-primary-200/60 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <span className="whitespace-nowrap">
              Showing {filteredProjects.length === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, filteredProjects.length)} of {filteredProjects.length} filtered · {projects.length} total
            </span>
            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={safePage === 1}
                className="border border-primary-400/40 px-3 py-1 uppercase tracking-[0.15em] text-primary-200/70 transition duration-150 ease-terminal hover:border-primary-400 hover:text-primary-100 disabled:cursor-not-allowed disabled:border-primary-400/10 disabled:text-primary-200/30"
              >
                Prev
              </button>
              <span className="px-2 py-1 text-primary-200/70">
                Page {safePage}/{totalPages}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={safePage === totalPages}
                className="border border-primary-400/40 px-3 py-1 uppercase tracking-[0.15em] text-primary-200/70 transition duration-150 ease-terminal hover:border-primary-400 hover:text-primary-100 disabled:cursor-not-allowed disabled:border-primary-400/10 disabled:text-primary-200/30"
              >
                Next
              </button>
            </div>
            <span className="text-primary-200/50">Navigate ↑ ↓ · Enter to open</span>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/data/projects";
import { useProjectFilters } from "@/hooks/useProjectFilters";
import {
  LANGUAGE_COLOR_MAP,
  PROJECT_DENSITY_GRID_MAP,
  PROJECT_DENSITY_OPTIONS,
  PROJECT_FILTER_LANGUAGE_FALLBACK,
  PROJECT_PAGE_SIZES,
} from "@/lib/constants/project";

type ProjectGalleryProps = {
  projects: Project[];
};

const formatCount = (value: number) => value.toString().padStart(2, "0");

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  const {
    state: {
      searchTerm,
      density,
      pageSize,
      activeYears,
      activeLanguages,
      activeCategories,
      activeTags,
    },
  derived: { years, languages, categories, tags, hasActiveFilters, categoryCounts },
    results: { totalProjects, filteredTotal, paginatedProjects },
    pagination: { currentPage, totalPages, startIndex, endIndex, goToPreviousPage, goToNextPage },
    actions: {
      setSearchTerm,
      setDensity,
      setPageSize,
      toggleYear,
      toggleLanguage,
      toggleCategory,
      toggleTag,
      clearFilters,
    },
  } = useProjectFilters(projects);

  const displayStart = filteredTotal === 0 ? 0 : startIndex + 1;
  const displayEnd = filteredTotal === 0 ? 0 : endIndex;

  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 pb-20">
      <div>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold text-primary-50 md:text-[2.6rem] md:leading-tight">
              Explore my projects
            </h1>
            <p className="max-w-2xl text-sm text-primary-200/75 md:text-base">
              Explore my personal project that I&apos;ve been building over the years.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-xs uppercase tracking-[0.25em] text-white">
            <span>
              Results · {formatCount(filteredTotal)}/{formatCount(totalProjects)}
            </span>
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
                {PROJECT_DENSITY_OPTIONS.map((option) => {
                  const isActive = option.value === density;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setDensity(option.value)}
                      className={`px-4 py-2 text-[0.65rem] font-semibold transition duration-200 ease-terminal ${
                        isActive
                          ? "bg-primary-500 text-background-950"
                          : "text-white hover:text-primary-100"
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
                {PROJECT_PAGE_SIZES.map((option) => {
                  const isActive = option === pageSize;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setPageSize(option)}
                      className={`px-3 py-2 text-[0.65rem] font-semibold transition duration-200 ease-terminal ${
                        isActive
                          ? "bg-primary-500 text-background-950"
                          : "text-white hover:text-primary-100"
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
                      onClick={() => toggleYear(year)}
                      className={`border px-3 py-1 text-[0.65rem] uppercase tracking-[0.1em] transition duration-150 ease-terminal ${
                        active
                          ? "border-primary-400 bg-primary-500/10 text-white"
                          : "border-primary-400/30 text-white hover:border-primary-400 hover:text-primary-100"
                      }`}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[0.8rem] font-medium uppercase tracking-[0.1em] text-white">Programming Language</p>
              <div className="flex flex-wrap gap-2">
                {languages.map((language) => {
                  const active = activeLanguages.includes(language);
                  const colorClass = LANGUAGE_COLOR_MAP[language] ?? PROJECT_FILTER_LANGUAGE_FALLBACK;
                  return (
                    <button
                      key={language}
                      type="button"
                      onClick={() => toggleLanguage(language)}
                      className={`border border-white/20 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] transition duration-150 ease-terminal ${colorClass} ${
                        active ? "opacity-100 shadow-[0_0_0_1px_rgba(255,255,255,0.25)]" : "opacity-75 hover:opacity-100"
                      }`}
                    >
                      {language}
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
                      onClick={() => toggleCategory(category)}
                      className={`flex items-center justify-between border px-3 py-2 text-[0.65rem] uppercase tracking-[0.2em] transition duration-150 ease-terminal ${
                        active
                          ? "border-primary-400 bg-primary-500/10 text-white"
                          : "border-primary-400/30 text-white hover:border-primary-400 hover:text-primary-100"
                      }`}
                    >
                      {category}
                      <span className="text-[0.55rem] text-white">
                        {categoryCounts[category] ?? 0}
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
                        onClick={() => toggleTag(tag)}
                        className={`border px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] transition duration-150 ease-terminal ${
                          active
                            ? "border-primary-400 bg-primary-500/15 text-white"
                            : "border-primary-400/30 text-white hover:border-primary-400 hover:text-primary-100"
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
          {filteredTotal === 0 ? (
            <div className="border border-primary-400/40 bg-background-900 p-12 text-center text-sm text-primary-200/70">
              No projects match that combination yet.
            </div>
          ) : (
            <div className={`grid gap-6 ${PROJECT_DENSITY_GRID_MAP[density]}`}>
              {paginatedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} density={density} />
              ))}
            </div>
          )}
          <div className="flex flex-col gap-4 border-t border-primary-400/40 pt-6 text-[0.65rem] uppercase tracking-[0.2em] text-white sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <span className="whitespace-nowrap">
              Showing {displayStart}-{displayEnd} of {filteredTotal} filtered · {totalProjects} total
            </span>
            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <button
                type="button"
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="border border-primary-400/40 px-3 py-1 uppercase tracking-[0.15em] text-primary-200/70 transition duration-150 ease-terminal hover:border-primary-400 hover:text-primary-100 disabled:cursor-not-allowed disabled:border-primary-400/10 disabled:text-primary-200/30"
              >
                Prev
              </button>
              <span className="px-2 py-1 text-primary-200/70">
                Page {currentPage}/{totalPages}
              </span>
              <button
                type="button"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
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

import { useCallback, useEffect, useMemo, useState } from "react";

import type { Project } from "@/data/projects";
import {
  PROJECT_DENSITY_OPTIONS,
  PROJECT_PAGE_SIZES,
  type ProjectCardDensity,
  type ProjectFilterCriteria,
} from "@/lib/constants/project";
import {
  filterProjects,
  getUniqueCategories,
  getUniqueLanguages,
  getUniqueTags,
  getUniqueYears,
  normalizeSearchTerm,
  toggleListValue,
} from "@/lib/utils/projects";

const DEFAULT_DENSITY: ProjectCardDensity = PROJECT_DENSITY_OPTIONS[0].value;
const DEFAULT_PAGE_SIZE = PROJECT_PAGE_SIZES[0];

type UseProjectFiltersResult = {
  state: {
    searchTerm: string;
    density: ProjectCardDensity;
    pageSize: (typeof PROJECT_PAGE_SIZES)[number];
    activeYears: string[];
    activeLanguages: string[];
    activeCategories: string[];
    activeTags: string[];
  };
  derived: {
    years: string[];
    languages: string[];
    categories: string[];
    tags: string[];
    hasActiveFilters: boolean;
    categoryCounts: Record<string, number>;
  };
  results: {
    totalProjects: number;
    filteredTotal: number;
    paginatedProjects: Project[];
  };
  pagination: {
    currentPage: number;
    totalPages: number;
    startIndex: number;
    endIndex: number;
    goToPage: (page: number) => void;
    goToPreviousPage: () => void;
    goToNextPage: () => void;
  };
  actions: {
    setSearchTerm: (value: string) => void;
    setDensity: (value: ProjectCardDensity) => void;
    setPageSize: (value: (typeof PROJECT_PAGE_SIZES)[number]) => void;
    toggleYear: (year: string) => void;
    toggleLanguage: (language: string) => void;
    toggleCategory: (category: string) => void;
    toggleTag: (tag: string) => void;
    clearFilters: () => void;
  };
};

export function useProjectFilters(projects: Project[]): UseProjectFiltersResult {
  const [searchTerm, setSearchTerm] = useState("");
  const [density, setDensity] = useState<ProjectCardDensity>(DEFAULT_DENSITY);
  const [pageSize, setPageSize] = useState<(typeof PROJECT_PAGE_SIZES)[number]>(DEFAULT_PAGE_SIZE);
  const [activeYears, setActiveYears] = useState<string[]>([]);
  const [activeLanguages, setActiveLanguages] = useState<string[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const years = useMemo(() => getUniqueYears(projects), [projects]);
  const languages = useMemo(() => getUniqueLanguages(projects), [projects]);
  const categories = useMemo(() => getUniqueCategories(projects), [projects]);
  const tags = useMemo(() => getUniqueTags(projects), [projects]);
  const categoryCounts = useMemo(() => {
    return projects.reduce<Record<string, number>>((accumulator, project) => {
      accumulator[project.category] = (accumulator[project.category] ?? 0) + 1;
      return accumulator;
    }, {});
  }, [projects]);

  const normalizedSearch = useMemo(() => normalizeSearchTerm(searchTerm), [searchTerm]);

  const criteria: ProjectFilterCriteria = useMemo(
    () => ({
      searchTerm,
      years: activeYears,
      categories: activeCategories,
      languages: activeLanguages,
      tags: activeTags,
    }),
    [searchTerm, activeYears, activeCategories, activeLanguages, activeTags],
  );

  const filteredProjects = useMemo(
    () => filterProjects(projects, criteria),
    [projects, criteria],
  );

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredProjects.length / pageSize)),
    [filteredProjects.length, pageSize],
  );

  const safePage = useMemo(
    () => Math.min(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const startIndex = useMemo(
    () => (safePage - 1) * pageSize,
    [safePage, pageSize],
  );

  const endIndex = useMemo(
    () => startIndex + pageSize,
    [startIndex, pageSize],
  );

  const paginatedProjects = useMemo(
    () => filteredProjects.slice(startIndex, endIndex),
    [filteredProjects, startIndex, endIndex],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [normalizedSearch, activeYears, activeLanguages, activeCategories, activeTags, pageSize]);

  useEffect(() => {
    setCurrentPage((previous) => (previous > totalPages ? totalPages : previous));
  }, [totalPages]);

  const hasActiveFilters = useMemo(
    () =>
      activeYears.length +
        activeLanguages.length +
        activeCategories.length +
        activeTags.length >
      0,
    [activeYears.length, activeLanguages.length, activeCategories.length, activeTags.length],
  );

  const handleSetDensity = useCallback((value: ProjectCardDensity) => {
    setDensity(value);
  }, []);

  const handleSetPageSize = useCallback((value: (typeof PROJECT_PAGE_SIZES)[number]) => {
    setPageSize(value);
  }, []);

  const toggleYear = useCallback((year: string) => {
    setActiveYears((previous) => toggleListValue(previous, year));
  }, []);

  const toggleLanguage = useCallback((language: string) => {
    setActiveLanguages((previous) => toggleListValue(previous, language));
  }, []);

  const toggleCategory = useCallback((category: string) => {
    setActiveCategories((previous) => toggleListValue(previous, category));
  }, []);

  const toggleTag = useCallback((tag: string) => {
    setActiveTags((previous) => toggleListValue(previous, tag));
  }, []);

  const clearFilters = useCallback(() => {
    setActiveYears([]);
    setActiveLanguages([]);
    setActiveCategories([]);
    setActiveTags([]);
  }, []);

  const goToPage = useCallback((page: number) => {
    setCurrentPage((previous) => {
      const nextPage = Math.max(1, Math.min(page, totalPages));
      return previous === nextPage ? previous : nextPage;
    });
  }, [totalPages]);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((previous) => Math.max(1, previous - 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage((previous) => Math.min(totalPages, previous + 1));
  }, [totalPages]);

  return {
    state: {
      searchTerm,
      density,
      pageSize,
      activeYears,
      activeLanguages,
      activeCategories,
      activeTags,
    },
    derived: {
      years,
      languages,
      categories,
      tags,
      hasActiveFilters,
      categoryCounts,
    },
    results: {
      totalProjects: projects.length,
      filteredTotal: filteredProjects.length,
      paginatedProjects,
    },
    pagination: {
      currentPage: safePage,
      totalPages,
      startIndex,
      endIndex: Math.min(endIndex, filteredProjects.length),
      goToPage,
      goToPreviousPage,
      goToNextPage,
    },
    actions: {
      setSearchTerm,
      setDensity: handleSetDensity,
      setPageSize: handleSetPageSize,
      toggleYear,
      toggleLanguage,
      toggleCategory,
      toggleTag,
      clearFilters,
    },
  };
}

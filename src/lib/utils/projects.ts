import type { ProjectRecord } from "@/types/project";
import {
  KNOWN_LANGUAGES,
  LANGUAGE_COLOR_MAP,
  PROJECT_CARD_LANGUAGE_FALLBACK,
  PROJECT_FILTER_LANGUAGE_FALLBACK,
  type ProjectCardDensity,
  PROJECT_DENSITY_CARD_PADDING,
  PROJECT_DENSITY_CARD_PREVIEW,
  PROJECT_DENSITY_GRID_MAP,
  PROJECT_DENSITY_OPTIONS,
  PROJECT_PAGE_SIZES,
  type ProjectFilterCriteria,
} from "@/lib/constants/project";

export {
  KNOWN_LANGUAGES,
  LANGUAGE_COLOR_MAP,
  PROJECT_CARD_LANGUAGE_FALLBACK,
  PROJECT_FILTER_LANGUAGE_FALLBACK,
  PROJECT_DENSITY_CARD_PADDING,
  PROJECT_DENSITY_CARD_PREVIEW,
  PROJECT_DENSITY_GRID_MAP,
  PROJECT_DENSITY_OPTIONS,
  PROJECT_PAGE_SIZES,
  type ProjectCardDensity,
  type ProjectFilterCriteria,
};

export const normalizeSearchTerm = (input: string) => input.trim().toLowerCase();

export const sortProjects = (items: ProjectRecord[]): ProjectRecord[] =>
  [...items].sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year;
    }

    return a.title.localeCompare(b.title);
  });

export const getUniqueYears = (projects: ProjectRecord[]): string[] =>
  Array.from(new Set(projects.map((project) => project.year.toString()))).sort(
    (a, b) => Number(b) - Number(a),
  );

export const getUniqueLanguages = (projects: ProjectRecord[]): string[] => {
  const languageSet = new Set<string>();
  projects.forEach((project) => {
    project.tech.forEach((tech) => languageSet.add(tech));
  });
  return Array.from(languageSet).sort();
};

export const getUniqueCategories = (projects: ProjectRecord[]): string[] =>
  Array.from(new Set(projects.map((project) => project.category))).sort();

export const getUniqueTags = (projects: ProjectRecord[]): string[] => {
  const tagSet = new Set<string>();
  projects.forEach((project) => {
    project.tags?.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
};

const includesAny = (haystack: string[], needles: string[]) =>
  needles.some((needle) => haystack.includes(needle));

export const filterProjects = (
  projects: ProjectRecord[],
  criteria: ProjectFilterCriteria,
): ProjectRecord[] => {
  const normalizedSearch = normalizeSearchTerm(criteria.searchTerm);

  return sortProjects(projects).filter((project) => {
    if (normalizedSearch) {
      const corpus = [
        project.title,
        project.summary,
        project.description,
        project.category,
        project.tags?.join(" ") ?? "",
        project.tech.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      if (!corpus.includes(normalizedSearch)) {
        return false;
      }
    }

    if (criteria.years.length && !criteria.years.includes(project.year.toString())) {
      return false;
    }

    if (criteria.categories.length && !criteria.categories.includes(project.category)) {
      return false;
    }

    if (criteria.languages.length) {
      const languageHit = includesAny(project.tech, criteria.languages);
      if (!languageHit) {
        return false;
      }
    }

    if (criteria.tags.length) {
      const projectTags = project.tags ?? [];
      const tagHit = includesAny(projectTags, criteria.tags);
      if (!tagHit) {
        return false;
      }
    }

    return true;
  });
};

export const toggleListValue = <T extends string>(collection: T[], value: T): T[] =>
  collection.includes(value)
    ? collection.filter((item) => item !== value)
    : [...collection, value];

export const resolveProjectLanguage = (project: ProjectRecord): string => {
  const fromTech = project.tech.find((tech) => KNOWN_LANGUAGES.includes(tech));
  if (fromTech) {
    return fromTech;
  }

  const fromTags = project.tags?.find((tag) => KNOWN_LANGUAGES.includes(tag));
  if (fromTags) {
    return fromTags;
  }

  return project.tech[0] ?? project.category;
};

export const getProjectCounts = (projects: ProjectRecord[]) => ({
  total: projects.length,
  featured: projects.filter((project) => project.featured).length,
  categories: getUniqueCategories(projects).length,
});

export const getLatestProject = (projects: ProjectRecord[]): ProjectRecord | null => {
  const sorted = sortProjects(projects);
  return sorted.length > 0 ? sorted[0] : null;
};

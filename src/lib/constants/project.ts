export const PROJECT_DENSITY_OPTIONS = [
  { label: "Compact", value: "compact" },
  { label: "Comfortable", value: "comfortable" },
  { label: "Large", value: "large" },
] as const;

export type ProjectCardDensity = (typeof PROJECT_DENSITY_OPTIONS)[number]["value"];

export const PROJECT_DENSITY_GRID_MAP: Record<ProjectCardDensity, string> = {
  compact: "md:grid-cols-2 xl:grid-cols-3",
  comfortable: "md:grid-cols-2",
  large: "md:grid-cols-1",
};

export const PROJECT_DENSITY_CARD_PADDING: Record<ProjectCardDensity, string> = {
  compact: "p-4",
  comfortable: "p-6",
  large: "p-7",
};

export const PROJECT_DENSITY_CARD_PREVIEW: Record<ProjectCardDensity, string> = {
  compact: "h-28",
  comfortable: "h-36",
  large: "h-44",
};

export const PROJECT_PAGE_SIZES = [6, 12, 24, 48] as const;

export const KNOWN_LANGUAGES: ReadonlyArray<string> = [
  "Go",
  "Rust",
  "Python",
  "TypeScript",
  "JavaScript",
  "Java",
  "C#",
  "C++",
  "Ruby",
  "PHP",
  "Swift",
  "Kotlin",
  "Elixir",
  "Scala",
  "Flutter",
];

export const LANGUAGE_COLOR_MAP: Record<string, string> = {
  JavaScript: "bg-[#F8E71C] text-background-950",
  TypeScript: "bg-[#58C4F6] text-background-950",
  Python: "bg-[#5B8DEC] text-background-950",
  "C#": "bg-[#9B6CFF] text-background-900",
  "C++": "bg-[#FF5D9D] text-background-900",
  Go: "bg-[#7DE2D1] text-background-950",
  Rust: "bg-[#FF9A57] text-background-900",
  Ruby: "bg-[#FF7CA3] text-background-900",
  PHP: "bg-[#9E8CFF] text-background-900",
  Swift: "bg-[#FFC75F] text-background-950",
  Kotlin: "bg-[#FF8EBB] text-background-900",
  Elixir: "bg-[#C68BFF] text-background-900",
  Scala: "bg-[#FF7F6A] text-background-900",
  Java: "bg-[#FFD966] text-background-950",
  Flutter: "bg-[#7EBDEA] text-background-950",
};

export const PROJECT_CARD_LANGUAGE_FALLBACK = "bg-white/18 text-white/85";
export const PROJECT_FILTER_LANGUAGE_FALLBACK = "bg-white/20 text-white";

export type ProjectFilterCriteria = {
  searchTerm: string;
  years: string[];
  categories: string[];
  languages: string[];
  tags: string[];
};

